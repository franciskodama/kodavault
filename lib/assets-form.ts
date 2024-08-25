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
  'None',
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
  }
};

export const getWallets = (subtype: string) => {
  switch (subtype) {
    case 'BTC':
      return [
        'Binance',
        'Bybit',
        'Gate.io',
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
        'Crypto',
        'Ledger',
        'Trezor',
        'Metamask',
      ];
    case 'Stock-USD':
      return ['Wealthsimple', 'Clear'];
    case 'Stock-CAD':
      return ['Wealthsimple', 'Tangerine', 'Scotiabank'];
    case 'Stock-BRL':
      return ['Clear', 'XP'];
    case 'Cash-USD':
      return [
        'Binance',
        'Bybit',
        'Gate.io',
        'Crypto',
        'Ledger',
        'Trezor',
        'Metamask',
      ];
    case 'Cash-CAD':
      return ['Tangerine', 'Scotiabank', 'Neo'];
    case 'Cash-BRL':
      return ['Binance', 'Bybit', 'Nubank', 'Inter', 'Itaú'];
    default:
      return [
        'Binance',
        'Bybit',
        'Gate.io',
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
      return ['Infrastructure'];
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
      return ['None'];
    case 'Stock-CAD':
      return ['None'];
    case 'Stock-BRL':
      return ['None'];
    case 'Cash-USD':
      return ['None'];
    case 'Cash-CAD':
      return ['None'];
    case 'Cash-BRL':
      return ['None'];
    default:
      return ['None'];
  }
};

export const getCategoryBySymbol = (symbolTyped: string) => {
  const altcoin = altcoinsCategories.find(
    (coin) => coin.symbol === symbolTyped
  );
  return altcoin ? altcoin.category : 'Unknown';
};

export const altcoinsCategories = [
  { symbol: 'AAVE', category: 'DeFi' },
  { symbol: 'THETA', category: 'Infrastructure' },
  { symbol: 'EGLD', category: 'Infrastructure' },
  { symbol: 'CHZ', category: 'Sports' },
  { symbol: 'TRX', category: 'Infrastructure' },
  { symbol: 'CRO', category: 'Exchange' },
  { symbol: 'INJ', category: 'DeFi' },
  { symbol: 'NEAR', category: 'Infrastructure' },
  { symbol: 'ATOM', category: 'Interoperability' },
  { symbol: 'TIA', category: 'DeFi' },
  { symbol: 'PENDLE', category: 'DeFi' },
  { symbol: 'IMX', category: 'NFT' },
  { symbol: 'WLD', category: 'Identity' },
  { symbol: 'MUBI', category: 'Interoperability' },
  { symbol: 'ROSE', category: 'Privacy' },
  { symbol: 'PYTH', category: 'Oracles' },
  { symbol: 'TFUEL', category: 'Infrastructure' },
  { symbol: 'RSR', category: 'DeFi' },
  { symbol: 'STX', category: 'Infrastructure' },
  { symbol: 'RUNE', category: 'DeFi' },
  { symbol: 'AKT', category: 'Infrastructure' },
  { symbol: 'XRD', category: 'Infrastructure' },
  { symbol: 'LPT', category: 'Infrastructure' },
  { symbol: 'ENJ', category: 'NFT' },
  { symbol: 'QETH', category: 'DeFi' },
  { symbol: 'RENDER', category: 'AI' },
  { symbol: 'FIL', category: 'Data' },
  { symbol: 'VRA', category: 'Gaming' },
  { symbol: 'SNX', category: 'DeFi' },
  { symbol: 'MKR', category: 'DeFi' },
  { symbol: 'JASMY', category: 'Data' },
  { symbol: 'FLOKI', category: 'Meme' },
  { symbol: 'PEPE', category: 'Meme' },
  { symbol: 'POPCAT', category: 'Meme' },
  { symbol: 'BRETT', category: 'Meme' },
  { symbol: 'CAKE', category: 'DeFi' },
  { symbol: 'TAO', category: 'Infrastructure' },
  { symbol: 'PEOPLE', category: 'Unknown' },
  { symbol: 'HBAR', category: 'Infrastructure' },
  { symbol: 'USDT', category: 'Stablecoins' },
  { symbol: 'ENJ', category: 'NFT' },
  { symbol: 'TFUEL', category: 'Infrastructure' },
  { symbol: 'ROSE', category: 'Privacy' },
  { symbol: 'TIA', category: 'DeFi' },
  { symbol: 'BONK', category: 'Meme' },
  { symbol: 'POPCAT', category: 'Meme' },
  { symbol: 'ETH', category: 'Store of Value' },
  { symbol: 'PEOPLE', category: 'Identity' },
  { symbol: 'BRETT', category: 'Meme' },
  { symbol: 'ICP', category: 'Infrastructure' },
  { symbol: 'GALA', category: 'Gaming' },
  { symbol: 'ASTR', category: 'Infrastructure' },
  { symbol: 'BLUR', category: 'NFT' },
  { symbol: 'HOT', category: 'Exchange' },
  { symbol: 'DOGE', category: 'Meme' },
  { symbol: 'SHIB', category: 'Meme' },
  { symbol: 'SOL', category: 'Infrastructure' },
  { symbol: 'LINK', category: 'Oracles' },
  { symbol: 'ADA', category: 'Smart Contract' },
  { symbol: 'MATIC', category: 'Smart Contract' },
  { symbol: 'RENDER', category: 'AI' },
  { symbol: 'AGIX', category: 'AI' },
  { symbol: 'VET', category: 'Infrastructure' },
  { symbol: 'TOKEN', category: 'RWA' },
  { symbol: 'UNI', category: 'DeFi' },
  { symbol: 'AVAX', category: 'Infrastructure' },
  { symbol: 'APE', category: 'NFT' },
  { symbol: 'DOT', category: 'Interoperability' },
  { symbol: 'OCEAN', category: 'Data' },
  { symbol: 'WIF', category: 'Meme' },
  { symbol: 'FET', category: 'AI' },
  { symbol: 'SAND', category: 'Gaming' },
  { symbol: 'ILV', category: 'NFT' },
  { symbol: 'BNB', category: 'Exchange' },
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

export const getAccounts = (subtype: string) => {
  switch (subtype) {
    case 'BTC':
      return ['Investment'];
    case 'ETH':
      return ['Investment'];
    case 'Altcoin':
      return ['Investment'];
    case 'Stock-USD':
      return ['Investment', 'TFSA', 'FHSA'];
    case 'Stock-CAD':
      return ['TFSA', 'FHSA'];
    case 'Stock-BRL':
      return ['Investment'];
    case 'Cash-USD':
      return ['Investment'];
    case 'Cash-CAD':
      return ['cc', 'TFSA', 'FHSA'];
    case 'Cash-BRL':
      return ['cc'];
    default:
      return ['cc', 'Investment', 'TFSA', 'FHSA'];
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
