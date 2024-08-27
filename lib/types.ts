import {
  category_enum_6c7fcd47,
  category_enum_f421eb4b,
  color_enum_bd2ecc46,
  purpose_enum_ceee32b0,
} from '@prisma/client';

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
  purpose?: purpose_enum_ceee32b0;
  category?: category_enum_6c7fcd47;
  tag?: string;
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

export type AssetsAndAssetsByType = {
  assets: Asset[];
  assetsByType: AssetsByType;
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

export type Currencies = {
  data?: Currency | null;
  error?: unknown;
};

export type Inputs = {
  id?: string;
  uid: string;
  asset: string;
  qty: number | string;
  wallet: string;
  type: string;
  subtype: string;
  currency: string;
  exchange: string;
  account: string;
  purpose: purpose_enum_ceee32b0 | null;
  category: category_enum_6c7fcd47 | null;
  tag?: string;
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

// export type netWorthChartData = {
//   id?: string;
//   created_at?: Date | string;
//   uid: string;
//   usdTotal: number;
//   cadTotal: number;
//   brlTotal: number;
//   btcTotal: number;
// };

// {
//   created_at: 2024-08-25T00:00:00.000Z,
//   usd_total: 579794.4974999998,
//   cad_total: 783302.3661224997,
//   brl_total: 3214746.544467921,
//   btc_total: 9.044673396520807,
//   id: '4602cfd0-083c-4681-8054-00a73ec62a81',
//   uid: 'fk@fkodama.com'
// },

export type netWorthChartData = {
  created_at: Date | string;
  usd_total: number;
  cad_total: number;
  brl_total: number;
  btc_total: number;
  id: string;
  uid: string | null;
};

export type AddNetWorthChartData = {
  id?: string;
  created_at?: Date | string;
  uid: string;
  usdTotal: number;
  cadTotal: number;
  brlTotal: number;
  btcTotal: number;
};

export type TotalByWallet = {
  value: string;
  total: number;
};
