import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });
async function run() {
  const apiKey = process.env.NEXT_PUBLIC_COINCAP_KEY;
  const headers = { 'X-CMC_PRO_API_KEY': apiKey || '', 'Accept': 'application/json' };
  const response = await fetch('https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest', { headers });
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}
run();
