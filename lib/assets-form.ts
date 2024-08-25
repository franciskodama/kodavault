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
        'None',
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

// export const getCategoryBySymbol = (symbol: string) => {
//   switch (symbol) {
//     case 'AAVE':
//       return ['DeFi'];

//     default:
//       return ['None'];
//   }
// };

export const getCategoryBySymbol = (symbol: string) => {
  if (altcoinsCategories.includes(symbol)) {
    return altcoinsCategories.find((altcoin) => altcoin.coin === symbol)
      ?.category;
  } else {
    return 'Unknown';
  }
};

const altcoinsCategories = [
  { coin: 'AAVE', category: 'DeFi' },
  { coin: 'THETA', category: 'Infrastructure' },
  { coin: 'EGLD', category: 'Infrastructure' },
  { coin: 'CHZ', category: 'Gaming' },
  { coin: 'TRX', category: 'Infrastructure' },
  { coin: 'CRO', category: 'Exchange' },
  { coin: 'INJ', category: 'DeFi' },
  { coin: 'NEAR', category: 'Infrastructure' },
  { coin: 'ATOM', category: 'Interoperability' },
  { coin: 'TIA', category: 'DeFi' },
  { coin: 'PENDLE', category: 'DeFi' },
  { coin: 'IMX', category: 'NFT' },
  { coin: 'WLD', category: 'AI' },
  { coin: 'MUBI', category: 'Unknown' },
  { coin: 'ROSE', category: 'Privacy' },
  { coin: 'PYTH', category: 'Oracles' },
  { coin: 'TFUEL', category: 'Infrastructure' },
  { coin: 'RSR', category: 'DeFi' },
  { coin: 'STX', category: 'Infrastructure' },
  { coin: 'RUNE', category: 'DeFi' },
  { coin: 'AKT', category: 'Infrastructure' },
  { coin: 'XRD', category: 'Infrastructure' },
  { coin: 'LPT', category: 'Infrastructure' },
  { coin: 'ENJ', category: 'NFT' },
  { coin: 'QETH', category: 'DeFi' },
  { coin: 'BTC', category: 'Store of Value' },
  { coin: 'RNDR', category: 'AI' },
  { coin: 'FIL', category: 'Data' },
  { coin: 'VRA', category: 'Gaming' },
  { coin: 'SNX', category: 'DeFi' },
  { coin: 'MKR', category: 'DeFi' },
  { coin: 'JASMY', category: 'Data' },
  { coin: 'FLOKI', category: 'Meme' },
  { coin: 'PEPE', category: 'Meme' },
  { coin: 'POPCAT', category: 'Meme' },
  { coin: 'BRETT', category: 'Meme' },
  { coin: 'CAKE', category: 'DeFi' },
  { coin: 'TAO', category: 'Infrastructure' },
  { coin: 'PEOPLE', category: 'Unknown' },
];

export const getCategoryTooltip = (category: string) => {
  switch (category) {
    case 'AI':
      return [
        'Cryptocurrencies leveraging artificial intelligence for various applications.',
      ];
    case 'Meme':
      return [
        'Tokens created around internet memes or cultural references, often with a humorous aspect.',
      ];
    case 'DeFi':
      return [
        'Decentralized finance platforms providing financial services without traditional intermediaries.',
      ];
    case 'Oracles':
      return [
        'Protocols that connect smart contracts with real-world data and external APIs.',
      ];
    case 'Stablecoins':
      return [
        'Cryptocurrencies designed to maintain a stable value, often pegged to fiat currencies.',
      ];
    case 'Gaming':
      return [
        'Tokens used in gaming ecosystems for in-game purchases, rewards, and transactions.',
      ];
    case 'Infrastructure':
      return [
        'Cryptocurrencies that provide foundational technology for building and supporting blockchain networks.',
      ];
    case 'Data':
      return [
        'Cryptocurrencies focused on data storage, sharing, and privacy.',
      ];
    case 'Interoperability':
      return [
        'Platforms enabling different blockchain networks to communicate and interact with each other.',
      ];
    case 'Unknown':
      return ['Cryptocurrencies with unclear or unspecified use cases.'];
    case 'Exchange':
      return [
        'Tokens associated with cryptocurrency exchanges, often providing benefits like fee discounts.',
      ];
    case 'None':
      return [
        'Tokens that do not fit into any specific category or lack detailed information.',
      ];
    case 'NFT':
      return [
        'Non-fungible tokens representing unique digital assets like art, collectibles, and real estate.',
      ];
    case 'Safehaven':
      return [
        'Cryptocurrencies perceived as secure investments during market volatility.',
      ];
    case 'Privacy':
      return [
        'Cryptocurrencies designed to enhance transaction privacy and anonymity.',
      ];
    case 'SupplyChain':
      return [
        'Cryptocurrencies focused on improving transparency, traceability, and efficiency in the supply chain industry.',
      ];
    case 'Identity':
      return [
        'Cryptocurrencies that focus on digital identity management and verification.',
      ];
    case 'Media':
      return [
        'Cryptocurrencies related to media, entertainment, and content creation.',
      ];
    case 'RWA':
      return [
        'Tokens that represent real-world assets such as real estate, commodities, or financial instruments.',
      ];
    case 'SmartContract':
      return [
        'Cryptocurrencies that focus on smart contract functionality, enabling decentralized applications and automated agreements.',
      ];
    case 'Sports':
      return [
        'Tokens used in the sports industry for fan engagement, ticketing, and other sports-related activities.',
      ];
    default:
      return null;
  }
};

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
