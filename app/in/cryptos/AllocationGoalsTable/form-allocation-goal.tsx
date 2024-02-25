'use client';

import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { updateCoinShareGoal } from '@/lib/actions';
import { useState } from 'react';
import { Form, SubmitHandler, useForm } from 'react-hook-form';
import { MergedArrayItem } from '../cryptos';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CryptoGoalAllocation } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormLabel,
  FormItem,
} from '@/components/ui/form';
export const FormAllocationGoal = ({
  assetRow,
}: {
  assetRow: MergedArrayItem;
}) => {
  const [data, setData] = useState<CryptoGoalAllocation>();
  const { toast } = useToast();
  const form = useForm();

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CryptoGoalAllocation>({
    defaultValues: {
      id: assetRow.id,
      uid: assetRow.uid,
      goal: assetRow.goal,
      coin: assetRow.coin,
      priority: assetRow.priority,
      obs: assetRow.obs,
    },
  });

  const processForm: SubmitHandler<CryptoGoalAllocation> = async (data) => {
    if (!assetRow.uid) {
      return console.log('User not logged in');
    }

    const result = await updateCoinShareGoal(data);

    if (result) {
      toast({
        title: 'Goal Updated! 🎉',
        description: 'Your new goal is already set.',
        variant: 'success',
      });
    } else {
      toast({
        title: '👻 Boho! Error occurred!',
        description: 'Your goal was NOT updated.',
        variant: 'destructive',
      });
    }

    reset();
    setData(data);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(processForm)} className='flex items-center'>
        <div className='grid gap-4 py-4'>
          <h3 className='bg-slate-800 px-4 py-2 text-white text-sm'>
            Asset:
            <span className='font-semibold ml-2 text-base'>
              {assetRow.coin}
            </span>
          </h3>

          <div className='flex items-center '>
            <Label className='text-left text-xs w-1/3'>
              Percentage Allocation Goal
            </Label>
            <Input className='w-1/4 text-center' {...register('goal')} />
            <p className='w-1/4 text-lg text-left ml-4'>%</p>
            {/* <Button
                variant='outline'
                className='w-1/4 border-slate-500'
                onClick={() => {
                  setValue('goal', 0, { shouldTouch: false });
                }}
              >
                Clear
              </Button> */}
          </div>

          {/* https://ui.shadcn.com/docs/components/select */}

          <div className='flex items-center gap-4'>
            {/* <FormField
                control={form.control}
                name='priority'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-left text-xs w-1/3'>
                      Priority:
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      // defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Set Priority' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='High'>High</SelectItem>
                        <SelectItem value='Medium'>Medium</SelectItem>
                        <SelectItem value='Low'>Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              /> */}

            {/* <Label className='text-left text-xs w-1/3'>Priority:</Label>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Set Priority' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='High'>High</SelectItem>
                  <SelectItem value='Medium'>Medium</SelectItem>
                  <SelectItem value='Low'>Low</SelectItem>
                </SelectContent>
              </Select> */}
          </div>

          <div className='grid grid-cols-3 items-center gap-4'>
            <Label className='text-left text-xs'>Observations:</Label>
            <Textarea className='col-span-3' {...register('obs')} />
          </div>

          <Button className='mt-8' type='submit'>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
