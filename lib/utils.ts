// ---------------------------------------------------------------------------
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// ---------------------------------------------------------------------------

export const currencyFormatter = (number: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

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

export const includeNewKeyForCardTitle = (array: any, newkey: string) =>
  array.map((item: any) => ({
    ...item,
    [newkey]: item.asset,
  }));

// ---------------------------------------------------------------------------

type ResultProps = {
  value: string;
  total: number;
};

export const getTotalByKey = (assets: any[], key: string): ResultProps[] => {
  const groupedData: { [key: string]: number } = {};

  assets.reduce((acc, item) => {
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
