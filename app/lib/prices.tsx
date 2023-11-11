import { getCryptos } from './crypto.server';
import { getCurrency } from './currency.server';
import { getStock } from './stock.server';
import { Asset, AssetWithoutPrice } from './types';
import { numberFormatter } from './utils';

export const includePriceToCashAssets = async (
  cashAssetsArray: AssetWithoutPrice[]
) => {
  // const currencyRates = await getCurrency();

  const currencyRates = {
    quotes: {
      USDCAD: 1.38,
      USDBRL: 4.91,
    },
  };

  const transformedAssets = cashAssetsArray.map((item: AssetWithoutPrice) => {
    let price = 1;
    let total = +item.qtd;

    if (item.currency === 'CAD') {
      price = 1 / currencyRates.quotes?.USDCAD;
      total = +item.qtd / +currencyRates.quotes?.USDCAD;
    } else if (item.currency === 'BRL') {
      price = 1 / currencyRates.quotes?.USDBRL;
      total = +item.qtd / +currencyRates.quotes?.USDBRL;
    }

    return {
      ...item,
      qtd: numberFormatter.format(+item.qtd),
      price: price,
      total: total,
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
      const total = price * +item.qtd;

      return {
        ...item,
        qtd: numberFormatter.format(+item.qtd),
        price: +price,
        total: total,
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
    return {
      asset: item.symbol.split('.')[0],
      price: item.regularMarketPrice,
    };
  });

  const stockAssetsWithPrices: Asset[] = stockAssetsArray.map((item: any) => {
    const thisStock = onlySymbolAndPriceArray.find(
      (el: any) => el.asset === item.asset
    );

    return {
      ...item,
      price: thisStock.price,
      total: thisStock.price * +item.qtd,
    };
  });

  return stockAssetsWithPrices;
};
