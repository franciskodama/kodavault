import cron from 'node-cron';
import { config } from 'dotenv';
import 'module-alias/register.js';
import { getCurrency } from '../lib/currency.server.js';
import { addNetWorthEvolution } from '@/lib/actions.jsx';
import { fetchAssets, fetchAssetsWithPrices } from '@/lib/assets.jsx';

config();

export default async function dailyTask() {
  const uid = 'fk@fkodama.com';

  try {
    const currencyRates = await getCurrency();
    const unpricedAssets = await fetchAssets(uid ? uid : '');
    const { assets, assetsByType } = await fetchAssetsWithPrices(
      unpricedAssets
    );

    const total = assets.reduce(
      (sum: number, item: any) => sum + item.total,
      0
    );
    const btcPrice = Number(
      assetsByType.Crypto.find((item: any) => item.asset === 'BTC')?.price
    );

    let chartData = null;
    if (uid && currencyRates.data && btcPrice) {
      chartData = {
        uid,
        usdTotal: total,
        cadTotal: total * currencyRates.data.CAD,
        brlTotal: total * currencyRates.data.BRL,
        btcTotal: total / btcPrice,
      };
      await addNetWorthEvolution(chartData);
    }
    console.log('We arrived here!');
  } catch (error) {
    console.log('Error running daily task:', error);
  }
}

// cron.schedule('0 0 * * *', dailyTask);

dailyTask();
