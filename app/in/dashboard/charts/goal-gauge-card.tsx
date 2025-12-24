'use client';

import { useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Asset } from '@/lib/types';
import { Button } from '../../../../components/ui/button';
import { addGoal, updateGoal } from '@/lib/actions';
import { GoalGauge } from '@/app/in/dashboard/charts/goal-gauge';
import { thousandFormatter } from '@/lib/utils';
import { XIcon } from 'lucide-react';

export const GoalGaugeCard = ({
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

  const handleSubmitAdd = async () => {
    const success = await addGoal(uid, goalInput);
    if (success) {
      setUpdated(true);
    }
  };

  const handleSubmitUpdate = async () => {
    const success = await updateGoal(uid, goalInput);
    if (success) {
      setUpdated(true);
    }
  };

  const handleClear = () => {
    setGoalInput(0);
  };

  useEffect(() => {
    if (updated) {
      const timer = setTimeout(() => {
        setUpdated(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [updated]);

  return (
    <Card className='flex-1 h-[250px] w-full'>
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
                <GoalGauge totalSoFar={totalSoFar} goal={goalInput} />
              </div>

              <div className='flex flex-col items-center w-full gap-2'>
                <h3 className='font-bold text-xs'>Current Goal</h3>
                <Input
                  className='h-8 w-[13ch] text-center text-slate-400 placeholder:text-xs placeholder:text-center placeholder:text-slate-200'
                  value={goalInput === 0 ? '' : thousandFormatter(goalInput)}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, '');
                    setGoalInput(Number(rawValue));
                  }}
                />
                <div className='flex gap-2'>
                  {goalInput === 0 ? (
                    <Button
                      size='md'
                      variant={'outline'}
                      className='w-[9ch] border-2 border-slate-500'
                      onClick={() => {
                        handleSubmitAdd();
                      }}
                    >
                      {updated ? <p>{`Added! ✓`}</p> : <p>Add Goal</p>}
                    </Button>
                  ) : (
                    <Button
                      size='md'
                      variant={'outline'}
                      className='w-[9ch] border-2 border-slate-500'
                      onClick={() => {
                        handleSubmitUpdate();
                      }}
                    >
                      {!updated && <p>{`Update`}</p>}
                      {updated && <p>{`Updated ✓`}</p>}
                    </Button>
                  )}
                  <Button
                    onClick={() => handleClear()}
                    variant='outline'
                    className='h-8 rounded-[2px] px-1 border-2 border-slate-500'
                  >
                    <XIcon size={16} strokeWidth={2} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};
