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
    let activeAlerts;
    try {
      activeAlerts = await prisma.alert.findMany({
        where: {
          triggered: false,
          emailOptin: true,
        }
      });
    } catch (dbError: any) {
      throw new Error(`Database error: ${dbError.message}`);
    }

    if (activeAlerts.length === 0) {
      return NextResponse.json({ message: 'No active alerts to check' });
    }

    // 2. Fetch current prices
    let allPrices;
    try {
      const priceRes = await fetch('https://api.binance.com/api/v3/ticker/price', {
        next: { revalidate: 0 } // Ensure fresh data
      });
      if (!priceRes.ok) throw new Error(`Binance returned ${priceRes.status}`);
      allPrices = await priceRes.json();
    } catch (fetchError: any) {
      throw new Error(`Price fetch error: ${fetchError.message}`);
    }
    
    if (!Array.isArray(allPrices)) {
      throw new Error('Invalid data format from Binance');
    }

    const priceMap = new Map();
    allPrices.forEach((p: any) => {
      if (p.symbol.endsWith('USDT')) {
        const symbol = p.symbol.replace('USDT', '');
        priceMap.set(symbol, parseFloat(p.price));
      }
    });

    const results = [];

    // 3. Check each alert
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
        try {
          const sent = await sendAlertEmail(alert, currentPrice);
          results.push({
            asset: alert.asset,
            target: alert.price,
            current: currentPrice,
            sent: sent || false
          });
        } catch (emailError: any) {
          console.error(`Email error for ${alert.asset}:`, emailError);
          results.push({
            asset: alert.asset,
            error: emailError.message
          });
        }
      }
    }

    return NextResponse.json({ 
      processed: activeAlerts.length, 
      triggered: results.length,
      details: results 
    });

  } catch (error: any) {
    console.error('Cron Alerts Critical Error:', error);
    return NextResponse.json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
    }, { status: 500 });
  }
}
