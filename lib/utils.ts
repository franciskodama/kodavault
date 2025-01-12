// ---------------------------------------------------------------------------
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  Asset,
  AssetAllCryptoData,
  TotalByWallet,
  UnpricedAsset,
} from './types';

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

export const thousandAndDecimalFormatter = (number: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);

export const thousandFormatter = (number: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
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

// ---------------------------------------------------------------------------

export const dateFormatter = (dateString: any) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = String(date.getFullYear()).slice(-2);

  return `${day}/${month}/${year}`;
};

// ---------------------------------------------------------------------------
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

export const getTotalByKey = (assets: any[], key: string): TotalByWallet[] => {
  const groupedData: { [key: string]: number } = {};

  assets.reduce((acc, item) => {
    if (!item) return acc; // Skip undefined assets

    const keyValue = item[key] as unknown as string;

    if (!groupedData[keyValue]) {
      groupedData[keyValue] = 0;
    }

    groupedData[keyValue] += parseFloat((item.total ?? 0).toString());

    return acc;
  }, [] as TotalByWallet[]);

  return Object.keys(groupedData).map((item) => ({
    value: item,
    total: groupedData[item],
  }));
};

// ---------------------------------------------------------------------------

export const getQtyOfAssets = (assets: any[]) => {
  const uniqueAssets = new Set(
    assets
      .filter((asset) => asset != undefined && asset.asset != undefined)
      .map((asset) => asset.asset)
  );
  return uniqueAssets.size;
};

// ---------------------------------------------------------------------------

export const groupAssetsBySomething = (assets: Asset[], something: string) => {
  return assets.reduce((groupedAssets: any, asset: any) => {
    const somethingKey = asset[something];
    if (!groupedAssets[somethingKey]) groupedAssets[somethingKey] = [];
    groupedAssets[somethingKey].push(asset);

    return groupedAssets;
  }, {});
};

// ---------------------------------------------------------------------------

export const getFirstThreeAssets = (assets: Asset[]) => {
  const firstThreeAssets = [];
  if (assets.length > 3) {
    firstThreeAssets.push(...assets.slice(0, 3));
  } else {
    firstThreeAssets.push(...assets);
  }
  return firstThreeAssets;
};

// ---------------------------------------------------------------------------
