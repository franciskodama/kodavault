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

export const getType = (subtype: string) => {
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

export const getSymbol = (subtype: string) => {
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

export const getWallet = (subtype: string) => {
  switch (subtype) {
    case 'BTC':
      return ['Binance', 'Bybit', 'Gate.io', 'Crypto.com', 'Ledger', 'Trezor'];
    case 'ETH':
      return ['Binance', 'Bybit', 'Gate.io', 'Crypto.com', 'Ledger', 'Trezor'];
    case 'Altcoin':
      return ['Binance', 'Bybit', 'Gate.io', 'Crypto.com', 'Ledger', 'Trezor'];
    case 'Stock-USD':
      return ['Wealthsimple', 'Clear'];
    case 'Stock-CAD':
      return ['Wealthsimple', 'Tangerine', 'Scotiabank'];
    case 'Stock-BRL':
      return ['Clear', 'XP'];
    case 'Cash-USD':
      return ['Binance', 'Bybit', 'Gate.io', 'Crypto.com', 'Ledger', 'Trezor'];
    case 'Cash-CAD':
      return ['Tangerine', 'Scotiabank'];
    case 'Cash-BRL':
      return ['Binance', 'Bybit', 'Nubank', 'Inter'];
    default:
      return [
        'Binance',
        'Bybit',
        'Gate.io',
        'Crypto.com',
        'Wealthsimple',
        'Ledger',
        'Trezor',
        'Tangerine',
      ];
  }
};

export const getCurrency = (subtype: string) => {
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

export const getAccount = (subtype: string) => {
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

export const getExchange = (subtype: string) => {
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
