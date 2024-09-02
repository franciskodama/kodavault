import { Asset } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { GoalGauge } from '@/app/in/dashboard/charts/goal-gauge';
import { numberFormatterNoDecimals } from '@/lib/utils';
import { Input } from './ui/input';
import { Button } from './ui/button';

export const CardGauge = ({
  assets,
  goal,
}: {
  assets: Asset[];
  goal: number;
}) => {
  const totalSoFar = Math.round(
    assets.reduce((sum: number, item: any) => sum + item.total, 0)
  );

  return (
    <Card className='flex-1 h-[240px] w-full'>
      <div className='flex flex-col justify-between'>
        <div className='flex flex-col'>
          <CardHeader>
            <CardTitle className='capitalize flex items-center justify-between'>
              <span>Goal Progress</span>
              <span className='text-3xl'>🏁</span>
            </CardTitle>
            <CardDescription className='text-xs'>
              Getting closer to that sweet spot!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex items-center'>
              <div className='w-full flex pr-6'>
                <GoalGauge totalSoFar={totalSoFar} goal={goal} />
              </div>

              <div className='flex flex-col items-center w-full gap-1'>
                <h3 className='font-bold text-xs'>Current Goal</h3>
                <Input
                  className='h-8 w-[10ch] placeholder:text-xs'
                  placeholder={numberFormatterNoDecimals.format(goal)}
                />
                <Button
                  variant={'outline'}
                  className='w-[10ch] h-8 border-2 border-slate-500'
                >
                  Update
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};
