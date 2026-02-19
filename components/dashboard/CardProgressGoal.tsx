'use client';

import { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Asset } from '@/lib/types';
import { addGoal, updateGoal } from '@/lib/actions';
import { Progress } from '@/components/ui/progress';
import { thousandFormatter, numberFormatterNoDecimals } from '@/lib/utils';
import { XIcon, Target, Pencil, Check } from 'lucide-react';

export const CardProgressGoal = ({
  assets,
  goal,
  uid,
}: {
  assets: Asset[];
  goal: number;
  uid: string;
}) => {
  const [goalInput, setGoalInput] = useState<number>(goal);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);

  const totalSoFar = Math.round(
    assets.reduce((sum: number, item: any) => sum + item.total, 0)
  );

  const percentage = goalInput > 0 ? (totalSoFar / goalInput) * 100 : 0;
  const displayPercentage = Math.min(percentage, 100).toFixed(1);

  const handleSave = async () => {
    const success =
      goal === 0
        ? await addGoal(uid, goalInput)
        : await updateGoal(uid, goalInput);

    if (success) {
      setUpdated(true);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setGoalInput(goal);
    setIsEditing(false);
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
    <Card className='flex-1 h-full w-full border-none shadow-sm overflow-hidden'>
      <div className='flex flex-col h-full'>
        <CardHeader>
          <CardTitle className='capitalize flex items-center justify-between'>
            <span className='font-semibold tracking-tight text-slate-900'>
              Goal Progress
            </span>
            <Target size={24} className='text-slate-400' />
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-6 justify-center h-full'>
          <div className='text-center space-y-1'>
            <h3 className='text-4xl font-extrabold text-primary tracking-tighter'>
              {displayPercentage}%
            </h3>
            <p className='text-[10px] font-medium text-slate-400 uppercase tracking-widest'>
              Of Your Target
            </p>
          </div>

          <div className='space-y-2 mt-8'>
            <Progress value={percentage} className='h-2 bg-slate-100' />
            <div className='flex justify-between items-center h-4'>
              <span className='text-[10px] font-medium text-slate-400 uppercase tracking-widest'>
                ${numberFormatterNoDecimals.format(totalSoFar)}
              </span>

              <div className='flex items-center gap-2'>
                {isEditing ? (
                  <div className='flex items-center gap-1'>
                    <Input
                      autoFocus
                      className='h-6 w-[15ch] text-[10px] text-center font-bold bg-slate-50 border-slate-200 rounded-md focus-visible:ring-1'
                      value={
                        goalInput === 0 ? '' : thousandFormatter(goalInput)
                      }
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, '');
                        setGoalInput(Number(rawValue));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSave();
                        if (e.key === 'Escape') handleCancel();
                      }}
                    />
                    <button
                      onClick={handleSave}
                      className='text-emerald-500 hover:text-emerald-700 transition-colors'
                    >
                      <Check size={14} strokeWidth={3} />
                    </button>
                    <button
                      onClick={handleCancel}
                      className='text-slate-400 hover:text-slate-600 transition-colors'
                    >
                      <XIcon size={14} strokeWidth={3} />
                    </button>
                  </div>
                ) : (
                  <div className='flex items-center gap-2 group'>
                    <button
                      onClick={() => setIsEditing(true)}
                      className='opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-900'
                    >
                      <Pencil size={12} />
                    </button>
                    <span className='text-[10px] font-medium text-slate-400 uppercase tracking-widest'>
                      Goal: ${numberFormatterNoDecimals.format(goalInput)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {updated && (
            <p className='text-[10px] text-emerald-600 font-bold text-center uppercase tracking-widest animate-pulse'>
              Saved Successfully!
            </p>
          )}
        </CardContent>
      </div>
    </Card>
  );
};
