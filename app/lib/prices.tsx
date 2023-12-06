import { getCryptos } from './crypto.server';
import { getCurrency } from './currency.server';
import { getStock } from './stock.server';
import { Asset, AssetWithoutPrice } from './types';

export const currencyRates = {
  quotes: {
    USDCAD: 1.36,
    USDBRL: 4.96,
  },
};

export const includePriceToCashAssets = async (
  cashAssetsArray: AssetWithoutPrice[]
) => {
  // const currencyRates = await getCurrency();

  const transformedAssets = cashAssetsArray.map((item: AssetWithoutPrice) => {
    let price = 1;
    let total = item.qty;

    if (item.currency === 'CAD') {
      price = 1 / currencyRates.quotes?.USDCAD;
      total = item.qty / currencyRates.quotes?.USDCAD;
    } else if (item.currency === 'BRL') {
      price = 1 / currencyRates.quotes?.USDBRL;
      total = item.qty / currencyRates.quotes?.USDBRL;
    }

    return {
      ...item,
      qty: item.qty,
      price: Number(Number(price).toFixed(2)),
      total: Number(Number(total).toFixed(2)),
    };
  });

  return transformedAssets;
};

export const includePriceToCryptoAssets = async (
  cryptoAssetsArray: AssetWithoutPrice[]
): Promise<Asset[]> => {
  const transformedAssets = await Promise.all(
    cryptoAssetsArray.map(async (item: AssetWithoutPrice) => {
      const thisCryptoPrice = await getCryptos(item.asset);
      const price = thisCryptoPrice.data[0].priceUsd;
      const total = price * item.qty;

      return {
        ...item,
        qty: item.qty,
        price:
          price.split('.')[0] > 99
            ? Number(Number(price).toFixed(2))
            : Number(Number(price).toFixed(4)),
        total:
          Number(total.toString().split('.')[0]) > 99
            ? Number(Number(total).toFixed(2))
            : Number(Number(total).toFixed(4)),
      };
    })
  );

  return transformedAssets;
};

export const includePriceToStockAssets = async (
  stockAssetsArray: AssetWithoutPrice[]
): Promise<Asset[]> => {
  let symbolAndExchange: string[] = [];
  stockAssetsArray.map(async (item: AssetWithoutPrice) => {
    symbolAndExchange.push(
      `${item.asset}${item.exchange === null ? '' : `.${item.exchange}`}`
    );
  });

  const symbolsToMakeACall = symbolAndExchange.toString();
  const symbolsToCheckResultFromTheCall = symbolsToMakeACall.split(',');
  const result = await getStock(symbolsToMakeACall);
  const missingSymbols = symbolsToCheckResultFromTheCall.filter(
    (item) => !result.body.find((el: any) => el.symbol === item)
  );

  missingSymbols.map((item: any) =>
    result.body.push({
      symbol: item,
      regularMarketPrice: 0,
    })
  );

  const onlySymbolAndPriceArray = result.body.map((item: any) => {
    // const currencyRates = await getCurrency();

    return {
      asset: item.symbol.split('.')[0],
      price:
        item.regularMarketPrice /
        (item.currency === 'CAD'
          ? currencyRates.quotes?.USDCAD
          : item.currency === 'BRL'
          ? currencyRates.quotes?.USDBRL
          : 1),
    };
  });

  const stockAssetsWithPrices: Asset[] = stockAssetsArray.map((item: any) => {
    const thisStock = onlySymbolAndPriceArray.find(
      (el: any) => el.asset === item.asset
    );

    return {
      ...item,
      price: Number(thisStock.price).toFixed(2),
      total: Number(Number(thisStock.price * item.qty).toFixed(2)),
    };
  });

  return stockAssetsWithPrices;
};
