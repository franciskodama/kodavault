import { Asset } from './types';

export const numberFormatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// ---------------------------------------------------------------------------

export const numberFormatterNoDecimals = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const isNotEmptyArray = (value: []) => {
  return Array.isArray(value) && value.length > 0;
};

// ---------------------------------------------------------------------------

type ResultProps = {
  value: string;
  total: number;
};

export const getTotalByKey = (assets: any[], key: string): ResultProps[] => {
  const groupedData: { [key: string]: number } = {};

  const result: ResultProps[] = assets.reduce((acc, item) => {
    const keyValue = item[key];

    if (!groupedData[keyValue]) {
      groupedData[keyValue] = 0;
    }

    groupedData[keyValue] += parseFloat(item.total);

    return acc;
  }, [] as ResultProps[]);

  return Object.keys(groupedData).map((item) => ({
    value: item,
    total: groupedData[item],
  }));
};

// export const CryptosAllTimeHigh = [
//   { BTC: 68672 },
//   { ETH: 4860 },
//   { BNB: 688.62 },
//   { XRP: 3.84 },
//   { SOL: 259.62 },
//   { ADA: 3.08 },
//   { DOGE: 0.75 },
//   { TRX: 0.3 },
//   { LINK: 52.82 },
//   { MATIC: 2.91 },
//   { DOT: 54.84 },
//   { AVAX: 145.85 },
//   { LTC: 415.06 },
//   { ATOM: 44.72 },
//   { XLM: 0.938 },
//   { NEAR: 20.49 },
//   { AAVE: 664.01 },
// ];
