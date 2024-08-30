import { Asset, Currencies } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { GoalGauge } from '@/app/in/dashboard/charts/gauge';

export const CardGauge = ({
  assets,
  currencyRates,
}: {
  assets: Asset[];
  currencyRates: Currencies;
}) => {
  const total = assets.reduce((sum: number, item: any) => sum + item.total, 0);
  console.log('---  🚀 ---> | total:', total);

  return (
    <Card className='flex-1 h-[240px] w-full'>
      <div className='flex flex-col justify-between'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle className='capitalize flex items-center justify-between'>
              <span>Goal Tracking</span>
              <span className='text-3xl'>🏁</span>
            </CardTitle>
            <CardDescription className='text-xs'>
              Track your Goal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='w-full flex items-center justify-center pr-6'>
              <GoalGauge />
            </div>
          </CardContent>
        </div>
        {/* <CardFooter className='flex justify-between text-sm text-slate-500 font-medium bg-slate-50 m-1 p-2'>
          <h3>Missing</h3>
          100000
          {numberFormatterNoDecimals.format(
            totalArray.reduce((sum: number, item) => sum + item.total, 0)
          )}
        </CardFooter> */}
      </div>
    </Card>
  );
};
