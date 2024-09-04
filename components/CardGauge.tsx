'use client';

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
import { useEffect, useState } from 'react';
import { addGoal, updateGoal } from '@/lib/actions';

export const CardGauge = ({
  assets,
  goal,
  uid,
}: {
  assets: Asset[];
  goal: number;
  uid: string;
}) => {
  const [goalInput, setGoalInput] = useState<number>(goal);
  const [updated, setUpdated] = useState<boolean>(false);

  const totalSoFar = Math.round(
    assets.reduce((sum: number, item: any) => sum + item.total, 0)
  );

  useEffect(() => {
    setGoalInput(goalInput);

    setTimeout(() => {
      setUpdated(false);
    }, 4000);
  }, [updated, goalInput]);

  const handleSubmitAdd = async () => {
    const success = await addGoal(uid, goalInput);

    if (success) {
      setUpdated(true);
    }
  };

  const handleSubmitUpdate = async () => {
    updateGoal(uid, goalInput);
  };

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

              <div className='flex flex-col items-center w-full gap-2'>
                <h3 className='font-bold text-xs'>Current Goal</h3>
                {updated && <p>✅</p>}

                <Input
                  className='h-8 w-[10ch] text-center text-slate-400 placeholder:text-xs placeholder:text-center placeholder:text-slate-200'
                  placeholder={numberFormatterNoDecimals.format(goalInput)}
                  value={goalInput}
                  onChange={(e) => setGoalInput(Number(e.target.value))}
                />
                {goal === 0 ? (
                  <Button
                    variant={'outline'}
                    className='w-[10ch] h-8 border-2 border-slate-500'
                    onClick={() => {
                      handleSubmitAdd();
                    }}
                  >
                    Add Goal
                    {updated && <p>✅</p>}
                  </Button>
                ) : (
                  <Button
                    variant={'outline'}
                    className='w-[10ch] h-8 border-2 border-slate-500'
                    onClick={() => {
                      handleSubmitUpdate();
                    }}
                  >
                    Update
                    {updated && <p>✅</p>}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};
