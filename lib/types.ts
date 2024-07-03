import { category_enum_f421eb4b, color_enum_bd2ecc46 } from '@prisma/client';

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
  exchange: string | null;
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
  category: category_enum_f421eb4b | null;
  from: string;
  color: color_enum_bd2ecc46 | null;
};

export type totalArrayProps = {
  currency: string;
  value: number;
  emoji: string;
};

export type ChartData = {
  id?: string;
  uid: string;
  created_at?: Date;
  usdTotal: number;
  cadTotal: number;
  brlTotal: number;
  btcTotal: number;
};
