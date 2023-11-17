type Decimal = number;

export type AssetWithoutPrice = {
  id: string;
  account: string;
  asset: string;
  qtd: Decimal;
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
    });

export type AssetForAth = {
  id: string;
  account: string;
  asset: string;
  qtd: Decimal;
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
