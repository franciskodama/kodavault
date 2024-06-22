export type UnpricedAsset = {
  id: string;
  account: string;
  asset: string;
  qty: number;
  wallet: string;
  created_at: Date;
  type: string;
  subtype: string;
  currency: string;
  uid: string;
  exchange: string;
  crypto?: string;
  stock?: string;
  cash?: string;
};

export type Asset =
  | undefined
  | (UnpricedAsset & {
      price?: number;
      total?: number;
      ath?: number;
    });

export type AssetsByType = {
  [key: string]: Asset[];
};

export type AssetForAth = {
  id: string;
  account: string;
  asset: string;
  qty: number;
  wallet: string;
  created_at: Date;
  type: string;
  subtype: string;
  currency: string;
  uid: string;
  exchange: string;
  price?: number;
  total?: number;
};

export type AssetReducedWithAth = {
  asset: string;
  price: number | string;
  qty: number | string;
  currentTotal: number | string;
  ath: number | string;
  athTotalNumber: number;
  athTotalCurrency: string;
  xPotential: number | string;
  percentagePotential: number | string;
};

export type Currency = {
  [key: string]: number;
};

export type CurrencyData = {
  data?: Currency;
  error?: unknown;
};

export type Inputs = {
  id?: string;
  uid: string;
  asset: string;
  qty: number;
  wallet: string;
  type: string;
  subtype: string;
  currency: string;
  exchange: string;
  account: string;
};

export type CryptoGoals = {
  id: string;
  uid: string;
  created_at?: Date;
  coin: string;
  goal: number;
  priority?: 'High' | 'Medium' | 'Low' | null;
  obs?: string | null;
};

export type CryptoGoalAllocation = {
  id: string;
  uid: string;
  total?: number;
  goal: number | undefined;
  coin: string;
  priority?: 'High' | 'Medium' | 'Low' | null;
  obs?: string | null;
};

export type ShortcutType = {
  id: string;
  created_at: Date;
  name: string;
  uid: string;
  url: string;
  description: string;
  category: ShortcutCategoryEnum;
  from: string;
  color: ShortcutColorEnum;
};

export enum ShortcutCategoryEnum {
  OPTION_ONE = 'indicator',
  OPTION_TWO = 'analysis',
  OPTION_THREE = 'miscellaneous',
  OPTION_FOUR = 'platform',
  OPTION_FIVE = 'exchange',
}

export enum ShortcutColorEnum {
  OPTION_ONE = 'blue',
  OPTION_TWO = 'red',
  OPTION_THREE = 'green',
  OPTION_FOUR = 'orange',
  OPTION_FIVE = 'black',
  OPTION_SEX = 'gray',
  OPTION_SEVEN = 'pink',
}
