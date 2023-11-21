export type AssetWithoutPrice = {
  id: string;
  account: string;
  asset: string;
  qtd: number;
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
  | (AssetWithoutPrice & {
      price?: number;
      total?: number;
      ath?: number;
    });

export type AssetForAth = {
  id: string;
  account: string;
  asset: string;
  qtd: number;
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
  qtd: number | string;
  currentTotal: number | string;
  ath: number | string;
  athTotalEstimation: number | string;
  xPotential: number | string;
  percentagePotential: number | string;
};
