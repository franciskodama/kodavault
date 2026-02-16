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
import { GoalGauge } from '@/app/(dashboard)/dashboard/charts/goal-gauge';
import { thousandFormatter } from '@/lib/utils';
import { XIcon, Flag } from 'lucide-react';

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
    <Card className='flex-1 h-[250px] w-full border-none shadow-sm'>
      <div className='flex flex-col h-full'>
        <CardHeader>
          <CardTitle className='capitalize flex items-center justify-between'>
            <span className='font-semibold tracking-tight text-slate-900'>
              Goal Progress
            </span>
            <Flag size={24} className='text-slate-400' />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex items-center'>
            <div className='w-full flex pr-6'>
              <GoalGauge totalSoFar={totalSoFar} goal={goalInput} />
            </div>

            <div className='flex flex-col items-center w-full gap-3'>
              <h3 className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>
                Current Goal
              </h3>
              <Input
                className='h-10 w-[14ch] text-center font-semibold text-slate-900 placeholder:text-slate-200'
                value={goalInput === 0 ? '' : thousandFormatter(goalInput)}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, '');
                  setGoalInput(Number(rawValue));
                }}
              />
              <div className='flex gap-2'>
                {goalInput === 0 ? (
                  <Button
                    size='sm'
                    className='w-[10ch]'
                    onClick={() => {
                      handleSubmitAdd();
                    }}
                  >
                    {updated ? 'Added! ✓' : 'Add Goal'}
                  </Button>
                ) : (
                  <Button
                    size='sm'
                    className='w-[10ch]'
                    onClick={() => {
                      handleSubmitUpdate();
                    }}
                  >
                    {!updated ? 'Update' : 'Updated ✓'}
                  </Button>
                )}
                <Button
                  onClick={() => handleClear()}
                  variant='secondary'
                  size='icon'
                  className='h-8 w-8'
                >
                  <XIcon size={14} strokeWidth={3} />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
