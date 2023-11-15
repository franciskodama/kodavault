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
import { Asset } from '../app/lib/types';
import { getAllTimeHighData } from '@/app/lib/crypto.server';

type AssetWithTop = {
  symbol: string;
  currentPrice: number;
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

  const onlyCryptoAssets = assets.filter((item: any) => item.type === 'Crypto');
  const qtyByAsset = onlyCryptoAssets.reduce((acc: number, item: Asset) => {
    const asset = item.asset;

    return;
  }, 0);

  // Get array that we agrouped by Crypto asset. eg.: MATIC in all wallets
  // Put this array to run here
  // Include columns: Symbol, price, total, and estimation --> growth percentage
  // line-height (style)

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
