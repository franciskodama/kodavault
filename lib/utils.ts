// ---------------------------------------------------------------------------
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Asset, TotalByWallet } from './types';

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

export const dateWithDayFormatter = (dateString: string) => {
  const date = new Date(dateString);
  const dayName = date.toLocaleDateString('en-US', {
    weekday: 'long',
    timeZone: 'UTC',
  });
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = String(date.getUTCFullYear()).slice(-2);

  return `${dayName}, ${day}/${month}/${year}`;
};

// ---------------------------------------------------------------------------
export const isNotEmptyArray = (value: []) => {
  return Array.isArray(value) && value.length > 0;
};

// ---------------------------------------------------------------------------

export const includeNewKeyForCardTitle = (array: any[], newKey: string) => {
  if (!Array.isArray(array)) {
    console.error('Expected an array but received:', array);
    return [];
  }

  return array.map((item: any) => ({
    ...item,
    [newKey]: item.asset,
  }));
};

// ---------------------------------------------------------------------------

export const getTotalByKey = (assets: any[], key: string): TotalByWallet[] => {
  const groupedData: { [key: string]: number } = {};

  assets.reduce((acc, item) => {
    if (!item) return acc;

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

export const getLimitedNumberOfAssets = (assets: Asset[], limit: number) => {
  const someAssets = [];
  if (assets.length > limit) {
    someAssets.push(...assets.slice(0, limit));
  } else {
    someAssets.push(...assets);
  }
  return someAssets;
};

// ---------------------------------------------------------------------------

export const isThisWeek = (dateStr: string) => {
  // Ensure dateStr is parsed as UTC midnight if it's YYYY-MM-DD
  const date = new Date(dateStr);
  const today = new Date();

  // Get current date in UTC to align with the parsed date
  const todayUTC = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
  );

  // Get start of current week (Sunday) in UTC
  const startOfWeek = new Date(todayUTC);
  startOfWeek.setUTCDate(todayUTC.getUTCDate() - todayUTC.getUTCDay());
  startOfWeek.setUTCHours(0, 0, 0, 0);

  // Get end of current week (Saturday) in UTC
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6);
  endOfWeek.setUTCHours(23, 59, 59, 999);

  return date >= startOfWeek && date <= endOfWeek;
};

export const isToday = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();

  return (
    date.getUTCFullYear() === today.getFullYear() &&
    date.getUTCMonth() === today.getMonth() &&
    date.getUTCDate() === today.getDate()
  );
};
