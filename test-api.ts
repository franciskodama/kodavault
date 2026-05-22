import { getGlobalData } from './lib/crypto.server';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

async function run() {
  console.log("Key length:", process.env.NEXT_PUBLIC_COINGECKO_KEY?.length);
  const data = await getGlobalData();
  console.log(JSON.stringify(data, null, 2));
}
run();
