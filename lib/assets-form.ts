export const fixedSymbolsArr = ['BTC', 'ETH', 'USDT', 'CAD', 'BRL'];

export const subtypeOptions = [
  'BTC',
  'ETH',
  'Altcoin',
  'Stock-USD',
  'Stock-CAD',
  'Stock-BRL',
  'Cash-USD',
  'Cash-CAD',
  'Cash-BRL',
];

export const purposeOptions = ['Trade', 'Investment'];
export const categoryOptions = [
  'AI',
  'Meme',
  'DeFi',
  'Oracles',
  'Stablecoins',
  'Gaming',
  'Infrastructure',
  'Data',
  'Interoperability',
  'Unknown',
  'Exchange',
  'Governance',
  'NFT',
  'Safehaven',
  'SmartContract',
  'Sports',
  'Media',
  'Privacy',
  'Identity',
  'SupplyChain',
  'RWA',
];

export const getTypes = (subtype: string) => {
  switch (subtype) {
    case 'BTC':
      return 'Crypto';
    case 'ETH':
      return 'Crypto';
    case 'Altcoin':
      return 'Crypto';
    case 'Stock-USD':
      return 'Stock';
    case 'Stock-CAD':
      return 'Stock';
    case 'Stock-BRL':
      return 'Stock';
    case 'Cash-USD':
      return 'Cash';
    case 'Cash-CAD':
      return 'Cash';
    case 'Cash-BRL':
      return 'Cash';
  }
};

export const getSymbols = (subtype: string) => {
  switch (subtype) {
    case 'BTC':
      return 'BTC';
    case 'ETH':
      return 'ETH';
    case 'Cash-USD':
      return 'USDT';
    case 'Cash-CAD':
      return 'CAD';
    case 'Cash-BRL':
      return 'BRL';
    default:
      return '';
  }
};

export const getWallets = (subtype: string) => {
  switch (subtype) {
    case 'BTC':
      return [
        'Binance',
        'Bybit',
        'Gate.io',
        'BingX',
        'BloFin',
        'Bitget',
        'Crypto',
        'Ledger',
        'Trezor',
        'Metamask',
      ];
    case 'ETH':
      return [
        'Binance',
        'Bybit',
        'Gate.io',
        'BingX',
        'Bitget',
        'BloFin',
        'Crypto',
        'Ledger',
        'Trezor',
        'Metamask',
      ];
    case 'Altcoin':
      return [
        'Binance',
        'Bybit',
        'Gate.io',
        'BingX',
        'Bitget',
        'BloFin',
        'Crypto',
        'Ledger',
        'Trezor',
        'Metamask',
      ];
    case 'Stock-USD':
      return ['Wealthsimple', 'ClearXP'];
    case 'Stock-CAD':
      return ['Wealthsimple', 'Questrade'];
    case 'Stock-BRL':
      return ['ClearXP', 'XP'];
    case 'Cash-USD':
      return [
        'Binance',
        'Bybit',
        'Gate.io',
        'BingX',
        'Bitget',
        'BloFin',
        'Crypto',
        'Ledger',
        'Trezor',
        'Metamask',
      ];
    case 'Cash-CAD':
      return ['Tangerine', 'Scotiabank', 'Wealthsimple', 'Neo'];
    case 'Cash-BRL':
      return ['Binance', 'Bybit', 'Nubank', 'Inter', 'Itaú', 'ClearXP'];
    default:
      return [
        'Binance',
        'Bybit',
        'Gate.io',
        'BingX',
        'Bitget',
        'BloFin',
        'Crypto',
        'Wealthsimple',
        'Ledger',
        'Trezor',
        'Tangerine',
        'Metamask',
      ];
  }
};

export const getCategories = (subtype: string) => {
  switch (subtype) {
    case 'BTC':
      return ['Safehaven'];
    case 'ETH':
      return ['SmartContract'];
    case 'Altcoin':
      return [
        'AI',
        'Data',
        'DeFi',
        'Exchange',
        'Gaming',
        'Identity',
        'Infrastructure',
        'Interoperability',
        'Meme',
        'Media',
        'NFT',
        'Governance',
        'Oracles',
        'Privacy',
        'RWA',
        'Safehaven',
        'SmartContract',
        'Sports',
        'Stablecoins',
        'SupplyChain',
        'Unknown',
      ];
    case 'Stock-USD':
      return ['Unknown'];
    case 'Stock-CAD':
      return ['Unknown'];
    case 'Stock-BRL':
      return ['Unknown'];
    case 'Cash-USD':
      return ['Unknown'];
    case 'Cash-CAD':
      return ['Unknown'];
    case 'Cash-BRL':
      return ['Unknown'];
    default:
      return ['Unknown'];
  }
};

export const getCategoryBySymbol = (symbolTyped: string) => {
  const altcoin = altcoinsCategories.find(
    (coin) => coin.symbol === symbolTyped
  );
  return altcoin ? altcoin.category : 'Unknown';
};

export const altcoinsCategories = [
  { symbol: 'AGIX', category: 'AI' },
  { symbol: 'FET', category: 'AI' },
  { symbol: 'OCEAN', category: 'AI' },
  { symbol: 'RENDER', category: 'AI' },

  { symbol: 'FIL', category: 'Data' },
  { symbol: 'BLZ', category: 'Data' },

  { symbol: 'AAVE', category: 'DeFi' },
  { symbol: 'INJ', category: 'DeFi' },
  { symbol: 'MKR', category: 'DeFi' },
  { symbol: 'PENDLE', category: 'DeFi' },
  { symbol: 'RSR', category: 'DeFi' },
  { symbol: 'RUNE', category: 'DeFi' },
  { symbol: 'SNX', category: 'DeFi' },
  { symbol: 'TIA', category: 'DeFi' },
  { symbol: 'UNI', category: 'DeFi' },
  { symbol: 'SEI', category: 'DeFi' },

  { symbol: 'BNB', category: 'Exchange' },
  { symbol: 'CRO', category: 'Exchange' },
  { symbol: 'CAKE', category: 'Exchange' },

  { symbol: 'GALA', category: 'Gaming' },
  { symbol: 'SAND', category: 'Gaming' },

  { symbol: 'PEOPLE', category: 'Identity' },
  { symbol: 'WLD', category: 'Identity' },

  { symbol: 'AKT', category: 'Infrastructure' },
  { symbol: 'ASTR', category: 'Infrastructure' },
  { symbol: 'AVAX', category: 'Infrastructure' },
  { symbol: 'HBAR', category: 'Infrastructure' },
  { symbol: 'HOT', category: 'Infrastructure' },
  { symbol: 'ICP', category: 'Infrastructure' },
  { symbol: 'NEAR', category: 'Infrastructure' },
  { symbol: 'SOL', category: 'Infrastructure' },
  { symbol: 'TAO', category: 'Infrastructure' },
  { symbol: 'TFUEL', category: 'Infrastructure' },
  { symbol: 'TRX', category: 'Infrastructure' },
  { symbol: 'VET', category: 'Infrastructure' },
  { symbol: 'XRD', category: 'Infrastructure' },
  { symbol: 'TON', category: 'Infrastructure' },
  { symbol: 'CHR', category: 'Infrastructure' },

  { symbol: 'ATOM', category: 'Interoperability' },
  { symbol: 'DOT', category: 'Interoperability' },
  { symbol: 'EGLD', category: 'Interoperability' },
  { symbol: 'MUBI', category: 'Interoperability' },

  { symbol: 'LPT', category: 'Media' },
  { symbol: 'THETA', category: 'Media' },
  { symbol: 'VRA', category: 'Media' },

  { symbol: 'BONK', category: 'Meme' },
  { symbol: 'BRETT', category: 'Meme' },
  { symbol: 'DOGE', category: 'Meme' },
  { symbol: 'FLOKI', category: 'Meme' },
  { symbol: 'PEPE', category: 'Meme' },
  { symbol: 'POPCAT', category: 'Meme' },
  { symbol: 'SHIB', category: 'Meme' },
  { symbol: 'WIF', category: 'Meme' },

  { symbol: 'APE', category: 'NFT' },
  { symbol: 'BLUR', category: 'NFT' },
  { symbol: 'ENJ', category: 'NFT' },
  { symbol: 'ILV', category: 'NFT' },
  { symbol: 'IMX', category: 'NFT' },

  { symbol: 'LINK', category: 'Oracles' },
  { symbol: 'PYTH', category: 'Oracles' },

  { symbol: 'JASMY', category: 'Privacy' },
  { symbol: 'ROSE', category: 'Privacy' },

  { symbol: 'TOKEN', category: 'RWA' },

  { symbol: 'BTC', category: 'Safehaven' },

  { symbol: 'ADA', category: 'SmartContract' },
  { symbol: 'ETH', category: 'SmartContract' },
  { symbol: 'MATIC', category: 'SmartContract' },
  { symbol: 'STX', category: 'SmartContract' },

  { symbol: 'CHZ', category: 'Sports' },

  { symbol: 'USDT', category: 'Stablecoins' },
  { symbol: 'VET', category: 'SupplyChain' },
];

export const getCategoryTooltip = (category: string) => {
  const tooltip = altcoinsCategoriesAndTooltip.find(
    (item) => item.category === category
  )?.tooltip;
  return tooltip;
};

const altcoinsCategoriesAndTooltip = [
  {
    category: 'AI',
    tooltip:
      '🤖 Cryptocurrencies leveraging artificial intelligence for various applications.',
  },
  {
    category: 'Data',
    tooltip:
      '💾 Cryptocurrencies focused on data storage, sharing, and privacy.',
  },
  {
    category: 'DeFi',
    tooltip:
      '💰 Decentralized finance platforms providing financial services without traditional intermediaries.',
  },
  {
    category: 'Exchange',
    tooltip:
      '💱 Tokens associated with cryptocurrency exchanges, often providing benefits like fee discounts.',
  },
  {
    category: 'Gaming',
    tooltip:
      '🕹️ Tokens used in gaming ecosystems for in-game purchases, rewards, and transactions.',
  },
  {
    category: 'Governance',
    tooltip:
      '🗳️ Cryptocurrencies used for community voting and decision-making.',
  },
  {
    category: 'Identity',
    tooltip:
      '👤 Cryptocurrencies that focus on digital identity management and verification.',
  },
  {
    category: 'Infrastructure',
    tooltip:
      '🚧 Cryptocurrencies that provide foundational technology for building and supporting blockchain networks.',
  },
  {
    category: 'Interoperability',
    tooltip:
      '🔗 Platforms enabling different blockchain networks to communicate and interact with each other.',
  },
  {
    category: 'Media',
    tooltip:
      '🎥 Cryptocurrencies related to media, entertainment, and content creation.',
  },
  {
    category: 'Meme',
    tooltip:
      '🐶 Tokens created around internet memes or cultural references, often with a humorous aspect.',
  },
  {
    category: 'NFT',
    tooltip:
      '🖼️ Non-fungible tokens representing unique digital assets like art, collectibles, and real estate.',
  },
  {
    category: 'Oracles',
    tooltip:
      '👁️ Protocols that connect smart contracts with real-world data and external APIs.',
  },
  {
    category: 'Privacy',
    tooltip:
      '🔒 Cryptocurrencies designed to enhance transaction privacy and anonymity.',
  },
  {
    category: 'RWA',
    tooltip:
      '🏠 Tokens that represent real-world assets such as real estate, commodities, or financial instruments.',
  },
  {
    category: 'Safehaven',
    tooltip:
      '🛡️ Cryptocurrencies perceived as secure investments during market volatility.',
  },
  {
    category: 'SmartContract',
    tooltip:
      '📄 Cryptocurrencies that focus on smart contract functionality, enabling decentralized applications and automated agreements.',
  },
  {
    category: 'Sports',
    tooltip:
      '⚽️ Tokens used in the sports industry for fan engagement, ticketing, and other sports-related activities.',
  },
  {
    category: 'Stablecoins',
    tooltip:
      '⚖️ Cryptocurrencies designed to maintain a stable value, often pegged to fiat currencies.',
  },
  {
    category: 'SupplyChain',
    tooltip:
      '📦 Cryptocurrencies focused on improving transparency, traceability, and efficiency in the supply chain industry.',
  },
  {
    category: 'Unknown',
    tooltip: '🤷🏻‍♂️ Cryptocurrencies with unclear or unspecified use cases.',
  },
];

export const getCurrencies = (subtype: string) => {
  switch (subtype) {
    case 'BTC':
      return ['USD'];
    case 'ETH':
      return ['USD'];
    case 'Altcoin':
      return ['USD'];
    case 'Stock-USD':
      return ['CAD', 'USD', 'BRL'];
    case 'Stock-CAD':
      return ['CAD', 'USD'];
    case 'Stock-BRL':
      return ['BRL'];
    case 'Cash-USD':
      return ['USD'];
    case 'Cash-CAD':
      return ['CAD'];
    case 'Cash-BRL':
      return ['BRL'];
    default:
      return ['CAD', 'USD', 'BRL'];
  }
};

export const cryptoWallets = ['Ledger', 'Trezor', 'Metamask'];

export const assetAccount = ['TFSA', 'FHSA', 'Checking', 'Savings'];

// export const cryptoAccounts = [
//   'Solana',
//   'Cardano',
//   'Tron',
//   'Near',
//   'Polkadot',
//   'Stacks',
//   'Dogecoin',
//   'Ethereum',
//   'ICP',
//   'Filecoin',
//   'Astar',
//   'Ton',
//   'Binance BSC',
//   'Bitcoin/Segwit',
//   'Polygon',
// ];

export const getAccounts = (subtype: string) => {
  switch (subtype) {
    case 'BTC':
      return ['Bitcoin/Segwit'];
    case 'ETH':
      // return cryptoAccounts.sort();
      return ['N/A'];
    case 'Altcoin':
      return ['N/A'];
    case 'Stock-USD':
      return ['TFSA', 'FHSA'];
    case 'Stock-CAD':
      return ['TFSA', 'FHSA'];
    case 'Stock-BRL':
      return ['Investment'];
    case 'Cash-USD':
      return ['Checking', 'Investment'];
    case 'Cash-CAD':
      return ['Checking', 'TFSA', 'FHSA'];
    case 'Cash-BRL':
      return ['Checking'];
    default:
      return ['Checking', 'Investment', 'TFSA', 'FHSA'];
  }
};

export const getExchanges = (subtype: string) => {
  switch (subtype) {
    case 'BTC':
      return ['N/A'];
    case 'ETH':
      return ['N/A'];
    case 'Altcoin':
      return ['N/A'];
    case 'Stock-USD':
      return ['SA', 'NASDAQ'];
    case 'Stock-CAD':
      return ['TO', 'V', 'U'];
    case 'Stock-BRL':
      return ['SA'];
    case 'Cash-USD':
      return ['N/A'];
    case 'Cash-CAD':
      return ['N/A'];
    case 'Cash-BRL':
      return ['N/A'];
    default:
      return ['N/A', 'TO', 'V', 'SA', 'NASDAQ'];
  }
};
