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
      return ['Tangerine', 'Scotiabank'];
    case 'Cash-BRL':
      return ['Binance', 'Bybit', 'Nubank', 'Inter'];
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
