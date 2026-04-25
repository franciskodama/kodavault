import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendAlertEmail } from '@/lib/actions/alert';

export async function GET(req: Request) {
  // Simple protection for the cron job (could be a secret header)
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');
  
  if (secret !== process.env.CRON_SECRET && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 1. Fetch all active alerts that haven't been triggered yet
    const activeAlerts = await prisma.alert.findMany({
      where: {
        triggered: false,
        emailOptin: true,
      }
    });

    if (activeAlerts.length === 0) {
      return NextResponse.json({ message: 'No active alerts to check' });
    }

    // 2. Group alerts by asset to minimize API calls
    const assets = Array.from(new Set(activeAlerts.map(a => a.asset.toUpperCase())));
    
    // 3. Fetch current prices (Using Binance for Cryptos as a primary example)
    // For a real app, you'd handle Stocks vs Cryptos differently.
    const priceRes = await fetch('https://api.binance.com/api/v3/ticker/price');
    const allPrices = await priceRes.json();
    
    if (!Array.isArray(allPrices)) {
      throw new Error('Failed to fetch prices from Binance');
    }

    const priceMap = new Map();
    allPrices.forEach((p: any) => {
      // Binance uses SYMBOLUSDT (e.g., BTCUSDT)
      if (p.symbol.endsWith('USDT')) {
        const symbol = p.symbol.replace('USDT', '');
        priceMap.set(symbol, parseFloat(p.price));
      }
    });

    const results = [];

    // 4. Check each alert
    for (const alert of activeAlerts) {
      const currentPrice = priceMap.get(alert.asset.toUpperCase());
      
      if (!currentPrice) continue;

      let isTriggered = false;
      if (alert.type === 'above' && currentPrice >= alert.price) {
        isTriggered = true;
      } else if (alert.type === 'below' && currentPrice <= alert.price) {
        isTriggered = true;
      }

      if (isTriggered) {
        const sent = await sendAlertEmail(alert, currentPrice);
        results.push({
          asset: alert.asset,
          target: alert.price,
          current: currentPrice,
          sent
        });
      }
    }

    return NextResponse.json({ 
      processed: activeAlerts.length, 
      triggered: results.length,
      details: results 
    });

  } catch (error: any) {
    console.error('Cron Alerts Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
