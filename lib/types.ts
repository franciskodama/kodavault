export type UnpricedAsset = {
  id: string;
  account: string;
  asset: string;
  qty: number;
  wallet: string;
  created_at: string;
  type: string;
  subtype: string;
  currency: string;
  uid: string;
  exchange: string;
};

export type Asset =
  | undefined
  | (UnpricedAsset & {
      price?: number;
      total?: number;
      ath?: number;
    });

export type AssetForAth = {
  id: string;
  account: string;
  asset: string;
  qty: number;
  wallet: string;
  created_at: string;
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
