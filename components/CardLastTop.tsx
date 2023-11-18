import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  numberFormatterNoDecimals,
  getTotalByKey,
  numberFormatter,
} from '../app/lib/utils';
import { Asset, AssetForAth } from '../app/lib/types';
import { getAllTimeHighData } from '@/app/lib/crypto.server';

type AssetWithAth = {
  asset: string;
  price: number;
  qty: number;
  total: number;
  ath: number;
  estimationOnTop: number;
};
export const CardLastTop = async ({
  assets,
  emoji = '',
  description = '',
}: {
  assets: Asset[];
  emoji?: string;

  description?: string;
}) => {
  const athCoins = await getAllTimeHighData();

  // Get array that we agrouped by Crypto asset. eg.: MATIC in all wallets
  // Put this array to run here
  // Include columns: Symbol, price, total, and estimation --> growth percentage
  // line-height (style)

  const onlyCryptoAssets = assets.filter((item: any) => item.type === 'Crypto');

  function groupAssetsByAsset(arr: Asset[]) {
    return arr.reduce((acc: AssetWithAth[], asset: any) => {
      const existingAsset = acc.find((a) => a.asset === asset.asset);

      if (existingAsset) {
        // If asset already exists in the result array, update quantities and total
        existingAsset.qty += asset.qtd;
        existingAsset.total += asset.total;
      } else {
        // If asset does not exist in the result array, add a new entry
        acc.push({
          asset: asset.asset,
          price: asset.price,
          qty: asset.qtd,
          total: asset.total,
          ath: 0,
          estimationOnTop: 0,
        });
      }

      return acc;
    }, []);
  }

  const newAssetsArr = groupAssetsByAsset(onlyCryptoAssets);
  console.log('---  🚀 ---> | newAssetsArr:', newAssetsArr);

  // const groupAssetsByType = (assets: Asset[]) => {
  //   return assets.reduce((groupedAssets: any, asset: any) => {
  //     const type = asset.type;
  //     if (!groupedAssets[type]) groupedAssets[type] = [];
  //     groupedAssets[type].push(asset);
  //     return groupedAssets;
  //   }, {});
  // };

  let assetsWithAth = [];
  if (athCoins) {
    assetsWithAth = assets.map((item: any) => {
      const asset =
        athCoins && athCoins.find((el: any) => el.symbol === item.asset);
      return {
        ...item,
        ath: asset ? asset.ath : 0,
        estimationOnTop: asset ? asset.ath * item.qtd : 0,
      };
    });
  } else return;

  return (
    <Card className=''>
      <div className='flex flex-col justify-between'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle className='capitalize flex justify-between'>
              <span>ATH Estimation</span>
              <span>{emoji}</span>
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            {assetsWithAth.map((item) => (
              <div key={item.id} className='flex justify-between'>
                <h3>{item.asset}</h3>
                <div className='flex'>
                  <p className='w-[8ch] text-right mr-4'>{`${numberFormatterNoDecimals.format(
                    item.total
                  )}`}</p>
                  <p className='w-[8ch] text-right mr-4'>{`${numberFormatterNoDecimals.format(
                    item.estimationOnTop
                  )}`}</p>
                  <p
                    className={`text-white w-[8ch] px-1 m-1 text-center rounded-[2px] ${
                      item.total * 100 > 50 ? 'bg-red-500' : 'bg-green-500'
                    }`}
                  >
                    {/* {`${numberFormatter.format(
                    (item.total / total) * 100
                  )}%`}
                   */}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </div>
        {/* <CardFooter className='flex justify-between text-sm text-slate-500 font-medium bg-slate-50 m-1 p-2'> */}
        {/* <h3>Total</h3>
          {numberFormatterNoDecimals.format(
            totalArray.reduce((sum: number, item) => sum + item.total, 0)
          )} */}
        {/* </CardFooter> */}
      </div>
    </Card>
  );
};

// {
//     id: '761959',
//     asset: 'GLXY',
//     qtd: '200.0000',
//     wallet: 'Wealthsimple',
//     created_at: '2023-08-27',
//     type: 'Stock',
//     uid: 'fk@fkodama.com',
//     subtype: 'Stock-CAD',
//     currency: 'CAD',
//     account: 'Investment',
//     exchange: 'TO',
//     price: '7.63',
//     total: '1,526.00'
//   }
