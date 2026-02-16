'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Asset } from '@/lib/types';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Plane,
  Infinity as InfinityIcon,
  Pencil,
  Check,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { updateMonthlyBurn } from '@/lib/actions/settings';
import { useToast } from '@/components/ui/use-toast';

export const CardFreedomRunway = ({
  netWorth,
  monthlyBurn: initialBurn = 4000,
  uid,
}: {
  netWorth: number;
  monthlyBurn: number;
  uid: string;
}) => {
  const [monthlyBurn, setMonthlyBurn] = useState(initialBurn);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    const result = await updateMonthlyBurn(uid, monthlyBurn);
    setIsLoading(false);

    if (result.success) {
      setIsEditing(false);
      toast({
        title: 'Settings Updated',
        description: 'Your monthly burn rate has been saved.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save settings.',
      });
    }
  };

  const runway = useMemo(() => {
    if (monthlyBurn <= 0) return 0;
    return netWorth / (monthlyBurn * 12);
  }, [netWorth, monthlyBurn]);

  const runwayLabel = useMemo(() => {
    if (runway > 50) return 'Forever (FIRE)';
    if (runway < 0.1) return 'Less than a month';
    return `${runway.toFixed(1)} Years`;
  }, [runway]);

  // Safe withdrawal rate check (4% rule)
  // If Annual Spend (Monthly * 12) is < 4% of Net Worth, you are theoretically free forever.
  const isFire = (monthlyBurn * 12) / netWorth < 0.04;

  return (
    <Card className='h-full relative overflow-hidden border-none shadow-sm'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span className='font-semibold tracking-tight text-slate-900'>
            Freedom Runway
          </span>
          <Plane size={24} className='text-slate-400' />
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-6 relative z-10'>
        <div className='text-center space-y-2 mt-2'>
          <h3 className='text-4xl font-extrabold text-primary tracking-tight flex items-center justify-center gap-2'>
            {isFire ? <InfinityIcon size={32} /> : runwayLabel}
          </h3>
          <p className='text-xs text-slate-500 font-medium uppercase tracking-wide'>
            Runway Remaining
          </p>
        </div>

        <div className='space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100'>
          <div className='flex justify-between items-center text-sm'>
            <Label htmlFor='burn-rate' className='text-slate-600 font-semibold'>
              Monthly Burn Rate
            </Label>
            <div className='flex items-center gap-2'>
              {!isEditing && (
                <>
                  <span className='text-slate-900 font-mono'>
                    ${monthlyBurn.toLocaleString()}
                  </span>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-6 w-6'
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil size={12} />
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className='flex items-center gap-2'>
            {isEditing ? (
              <div className='flex w-full gap-2'>
                <Input
                  type='number'
                  value={monthlyBurn}
                  onChange={(e) => setMonthlyBurn(Number(e.target.value))}
                  className='h-8'
                />
                <Button
                  size='sm'
                  onClick={handleSave}
                  disabled={isLoading}
                  className='h-8 bg-green-600 hover:bg-green-700'
                >
                  <Check size={14} />
                </Button>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => setIsEditing(false)}
                  disabled={isLoading}
                  className='h-8'
                >
                  <X size={14} />
                </Button>
              </div>
            ) : (
              <Input
                id='burn-rate'
                type='range'
                min='1000'
                max='20000'
                step='500'
                value={monthlyBurn}
                onChange={(e) => setMonthlyBurn(Number(e.target.value))}
                className='cursor-pointer accent-primary'
              />
            )}
          </div>
          {!isEditing && (
            <div className='flex justify-between text-[10px] text-slate-400'>
              <span>$1k</span>
              <span>$20k</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
