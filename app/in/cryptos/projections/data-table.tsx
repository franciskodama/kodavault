import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import { AssetWithAth, AssetWithProjection } from '../../../../lib/types';
import {
  currencyFormatter,
  numberFormatterNoDecimals,
} from '../../../../lib/utils';
import ProjectionsTable from './projections-table';

export const DataTable = ({ assets }: { assets: AssetWithProjection[] }) => {
  // const athTotal = athAssets.reduce(
  //   (sum: number, item: AssetWithAth) => {
  //     const currentAthTotalNumber = Number(item.athTotalNumber);
  //     return sum + currentAthTotalNumber;
  //   },
  //   0
  // );

  return (
    <div>
      <Card>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-col'>
            <CardHeader>
              <CardTitle className='capitalize flex items-center justify-between'>
                <span>Price Projections</span>
                <span className='text-3xl'>🚀</span>
              </CardTitle>
              <CardDescription className='text-xs'>
                Where you see the Price Projection made by YouTubers and others
              </CardDescription>
            </CardHeader>
            <CardContent>
              {assets.length > 0 ? (
                <div>
                  <ProjectionsTable assets={assets} />
                </div>
              ) : (
                <div className='my-32'>🙅🏻‍♀️ Not loaded yet</div>
              )}
            </CardContent>
          </div>
          <CardFooter className='flex justify-between text-sm text-slate-500 font-medium bg-slate-50 m-1 p-2'>
            <h3>Total</h3>
            {/* {currencyFormatter(athTotal)} */}
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};
