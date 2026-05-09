import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { v4 as uuidv4 } from 'uuid';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL is not set in environment variables');
  process.exit(1);
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

const USER_EMAIL = 'fk@fkodama.com'; // Adjust this if needed

const sentimentsToSeed = [
  { "symbol": "1000BONK", "url": "https://coinalyze.net/bonk/usdt/binance/1000bonkusdt_perp/price-chart-live/" },
  { "symbol": "1000FLOKI", "url": "https://coinalyze.net/floki/usdt/binance/1000flokiusdt_perp/price-chart-live/" },
  { "symbol": "1000PEPE", "url": "https://coinalyze.net/pepe/usdt/binance/1000pepeusdt_perp/price-chart-live/" },
  { "symbol": "AAVE", "url": "https://coinalyze.net/aave/usdt/binance/aaveusdt_perp/price-chart-live/" },
  { "symbol": "ADA", "url": "https://coinalyze.net/cardano/usdt/binance/adausdt_perp/price-chart-live/" },
  { "symbol": "ATOM", "url": "https://coinalyze.net/cosmos/usdt/binance/atomusdt_perp/price-chart-live/" },
  { "symbol": "AVAX", "url": "https://coinalyze.net/avalanche/usdt/binance/avaxusdt_perp/price-chart-live/" },
  { "symbol": "BNB", "url": "https://coinalyze.net/binance-coin/usdt/binance/bnbusdt_perp/price-chart-live/" },
  { "symbol": "BRETT", "url": "https://coinalyze.net/brett/usdt/binance/brettusdt_perp/price-chart-live/" },
  { "symbol": "BTC", "url": "https://coinalyze.net/bitcoin/usdt/binance/btcusdt_perp/price-chart-live/" },
  { "symbol": "CHZ", "url": "https://coinalyze.net/chiliz/usdt/binance/chzusdt_perp/price-chart-live/" },
  { "symbol": "DOGE", "url": "https://coinalyze.net/dogecoin/usdt/binance/dogeusdt_perp/price-chart-live/" },
  { "symbol": "DOT", "url": "https://coinalyze.net/polkadot/usdt/binance/dotusdt_perp/price-chart-live/" },
  { "symbol": "ETH", "url": "https://coinalyze.net/ethereum/usdt/binance/ethusdt_perp/price-chart-live/" },
  { "symbol": "FET", "url": "https://coinalyze.net/fetch-ai/usdt/binance/fetusdt_perp/price-chart-live/" },
  { "symbol": "FIL", "url": "https://coinalyze.net/filecoin/usdt/binance/filusdt_perp/price-chart-live/" },
  { "symbol": "HBAR", "url": "https://coinalyze.net/hedera/usdt/binance/hbarusdt_perp/price-chart-live/" },
  { "symbol": "HYPE", "url": "https://coinalyze.net/hyperliquid/usdt/binance/hypeusdt_perp/price-chart-live/" },
  { "symbol": "ICP", "url": "https://coinalyze.net/internet-computer/usdt/binance/icpusdt_perp/price-chart-live/" },
  { "symbol": "IMX", "url": "https://coinalyze.net/immutable-x/usdt/binance/imxusdt_perp/price-chart-live/" },
  { "symbol": "INJ", "url": "https://coinalyze.net/injective/usdt/binance/injusdt_perp/price-chart-live/" },
  { "symbol": "LDO", "url": "https://coinalyze.net/lido-dao/usdt/binance/ldousdt_perp/price-chart-live/" },
  { "symbol": "LINK", "url": "https://coinalyze.net/chainlink/usdt/binance/linkusdt_perp/price-chart-live/" },
  { "symbol": "LTC", "url": "https://coinalyze.net/litecoin/usdt/binance/ltcusdt_perp/price-chart-live/" },
  { "symbol": "NEAR", "url": "https://coinalyze.net/near-protocol/usdt/binance/nearusdt_perp/price-chart-live/" },
  { "symbol": "PENDLE", "url": "https://coinalyze.net/pendle/usdt/binance/pendleusdt_perp/price-chart-live/" },
  { "symbol": "POL", "url": "https://coinalyze.net/polygon/usdt/binance/polusdt_perp/price-chart-live/" },
  { "symbol": "RAY", "url": "https://coinalyze.net/raydium/usdt/binance/rayusdt_perp/price-chart-live/" },
  { "symbol": "RENDER", "url": "https://coinalyze.net/render-token/usdt/binance/renderusdt_perp/price-chart-live/" },
  { "symbol": "ROSE", "url": "https://coinalyze.net/oasis-network/usdt/binance/roseusdt_perp/price-chart-live/" },
  { "symbol": "RUNE", "url": "https://coinalyze.net/thorchain/usdt/binance/runeusdt_perp/price-chart-live/" },
  { "symbol": "SEI", "url": "https://coinalyze.net/sei-network/usdt/binance/seiusdt_perp/price-chart-live/" },
  { "symbol": "SNX", "url": "https://coinalyze.net/synthetix/usdt/binance/snxusdt_perp/price-chart-live/" },
  { "symbol": "SOL", "url": "https://coinalyze.net/solana/usdt/binance/solusdt_perp/price-chart-live/" },
  { "symbol": "STX", "url": "https://coinalyze.net/stacks/usdt/binance/stxusdt_perp/price-chart-live/" },
  { "symbol": "SUI", "url": "https://coinalyze.net/sui/usdt/binance/suiusdt_perp/price-chart-live/" },
  { "symbol": "TAO", "url": "https://coinalyze.net/bittensor/usdt/binance/taousdt_perp/price-chart-live/" },
  { "symbol": "TIA", "url": "https://coinalyze.net/celestia/usdt/binance/tiausdt_perp/price-chart-live/" },
  { "symbol": "TON", "url": "https://coinalyze.net/toncoin/usdt/binance/tonusdt_perp/price-chart-live/" },
  { "symbol": "TRX", "url": "https://coinalyze.net/tron/usdt/binance/trxusdt_perp/price-chart-live/" },
  { "symbol": "UNI", "url": "https://coinalyze.net/uniswap/usdt/binance/uniusdt_perp/price-chart-live/" },
  { "symbol": "VIRTUAL", "url": "https://coinalyze.net/virtual-protocol/usdt/binance/virtualusdt_perp/price-chart-live/" },
  { "symbol": "WIF", "url": "https://coinalyze.net/dogwifhat/usdt/binance/wifusdt_perp/price-chart-live/" },
  { "symbol": "XRP", "url": "https://coinalyze.net/xrp/usdt/binance/xrpusdt_perp/price-chart-live/" }
];

async function seed() {
  console.log('🚀 Starting sentiment seeding...');

  for (const item of sentimentsToSeed) {
    let extractedExchange = 'Unknown';
    let extractedPair = 'Unknown';

    try {
      const urlSegments = item.url.split('/');
      if (urlSegments.length > 4) {
        extractedPair = urlSegments[4].toUpperCase();
      }
      if (urlSegments.length > 5) {
        extractedExchange = urlSegments[5].charAt(0).toUpperCase() + urlSegments[5].slice(1);
      }
    } catch (e) {
      console.error(`Failed to extract data for ${item.symbol}:`, e);
    }

    try {
      // For seeding, we'll just check if it exists by (uid, asset, url)
      const existing = await prisma.sentiment.findFirst({
        where: {
          uid: USER_EMAIL,
          asset: item.symbol,
          url: item.url,
        }
      });

      if (existing) {
        await prisma.sentiment.update({
          where: { id: existing.id },
          data: {
            pair: extractedPair,
            exchange: extractedExchange,
          }
        });
        console.log(`🔄 Updated: ${item.symbol}`);
      } else {
        await prisma.sentiment.create({
          data: {
            id: uuidv4(),
            uid: USER_EMAIL,
            asset: item.symbol,
            pair: extractedPair,
            exchange: extractedExchange,
            url: item.url,
            created_at: new Date(),
          }
        });
        console.log(`✅ Added: ${item.symbol} (${extractedExchange} - ${extractedPair})`);
      }
    } catch (error) {
      console.error(`❌ Failed to seed ${item.symbol}:`, error);
    }
  }

  console.log('✨ Seeding completed!');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
