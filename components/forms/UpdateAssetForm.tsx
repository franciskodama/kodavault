'use client';

import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { Asset, Inputs } from '@/lib/types';
import { updateAsset } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import {
  getAccounts,
  getCurrencies,
  getWallets,
  subtypeOptions,
  purposeOptions,
  categoryOptions,
  getCategoryTooltip,
} from '@/lib/assets-form';
import { useAssetsContext } from '@/context/AssetsContext';
import { CustomRadioWithTooltip } from './CustomRadioWithTooltip';
import {
  classDiv,
  classError,
  classInput,
  classLabelRadio,
  classTitle,
  classUl,
} from '@/lib/classes';

export function UpdateAssetForm({
  asset,
  isReviewed,
}: {
  asset: Asset;
  isReviewed?: boolean;
}) {
  const { refreshAssets } = useAssetsContext();
  const [data, setData] = useState<Inputs>();
  const { toast } = useToast();
  const { data: session } = useSession();
  const uid = session?.user?.email;
  const closeRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      uid: uid || '',
      id: asset?.id,
      subtype: asset?.subtype,
      asset: asset?.asset,
      qty: asset?.qty.toString().replace(',', ''),
      wallet: asset?.wallet,
      type: asset?.type,
      currency: asset?.currency,
      exchange: asset?.exchange,
      account: asset?.account,
      purpose: asset?.purpose,
      category: asset?.category,
      tag: asset?.tag,
      reviewed: isReviewed || asset?.reviewed,
    },
  });

  const assetSubtype = watch('subtype');
  const assetWallet = getWallets(assetSubtype);
  const assetCurrency: string[] = getCurrencies(assetSubtype);
  const assetAccount = getAccounts(assetSubtype);
  // const assetExchange = getExchanges(assetSubtype);

  const processForm: SubmitHandler<Inputs> = async (data) => {
    if (!uid) {
      return console.log('User not logged in');
    }

    const result = await updateAsset({ ...data, uid: uid || '' });

    if (result) {
      toast({
        title: 'Asset Updated! 🎉',
        description: 'Your Asset is already updated.',
        variant: 'success',
      });
      await refreshAssets();
      closeRef.current?.click();
    } else {
      toast({
        title: '🚨 Uh oh! Something went wrong!',
        description: 'Your Asset was NOT Updated.',
        variant: 'destructive',
      });
    }

    setData(data);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(processForm)} className='py-8'>
        <div className={classDiv}>
          <h3 className={classTitle}>Type</h3>
          <ul className={classUl}>
            {subtypeOptions.map((subtypeOption) => (
              <li key={subtypeOption}>
                <input
                  className='hidden peer'
                  type='radio'
                  value={subtypeOption}
                  id={subtypeOption}
                  {...register('subtype')}
                />
                <label className={classLabelRadio} htmlFor={subtypeOption}>
                  <span>{subtypeOption}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex flex-col'>
          <div className='flex gap-4 w-full'>
            <div className={cn(classDiv, 'flex-1')}>
              <label className={classTitle} htmlFor='asset'>
                Asset
              </label>
              <input
                className={classInput}
                placeholder='Asset Symbol'
                {...register('asset', { required: "Asset can't be empty" })}
              />
              {errors.asset?.message && (
                <p className={classError}>{errors.asset.message}</p>
              )}
            </div>

            <div className={cn(classDiv, 'flex-1')}>
              <label className={classTitle} htmlFor='qty'>
                Quantity
              </label>
              <input
                className={classInput}
                placeholder='Quantity'
                {...register('qty', { required: "Quantity can't be empty" })}
              />
              {errors.qty?.message && (
                <p className={classError}>{errors.qty.message}</p>
              )}
            </div>
          </div>

          <div className={classDiv}>
            <h3 className={classTitle}>Wallet</h3>
            <ul className={classUl}>
              {assetWallet.map((walletOption) => (
                <li key={walletOption}>
                  <input
                    className='hidden peer'
                    type='radio'
                    value={walletOption}
                    id={walletOption}
                    {...register('wallet')}
                  />
                  <label className={classLabelRadio} htmlFor={walletOption}>
                    <span>{walletOption}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className={classDiv}>
            <h3 className={classTitle}>Category</h3>
            <ul className={classUl}>
              {categoryOptions.map((categoryOption) => (
                <li key={categoryOption}>
                  <CustomRadioWithTooltip
                    value={categoryOption}
                    id={categoryOption}
                    register={register('category')}
                    tooltipContent={getCategoryTooltip(categoryOption) || ''}
                    labelClassName={classLabelRadio}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className={classDiv}>
            <h3 className={classTitle}>Purpose</h3>
            <ul className={classUl}>
              {purposeOptions.map((purposeOption) => (
                <li key={purposeOption}>
                  <input
                    className='hidden peer'
                    type='radio'
                    value={purposeOption}
                    id={purposeOption}
                    {...register('purpose')}
                  />
                  <label className={classLabelRadio} htmlFor={purposeOption}>
                    <span>{purposeOption}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className={classDiv}>
            <label className={classTitle} htmlFor='tag'>
              Tag
            </label>
            <div className='flex items-center gap-2'>
              <input
                className={classInput}
                placeholder='Tag'
                {...register('tag')}
              />
              <Button
                className='mt-2 h-9 border-2'
                type='button'
                variant='outline'
                onClick={() => setValue('tag', '')}
              >
                Clear
              </Button>
            </div>
          </div>
          <div className={classDiv}>
            <h3 className={classTitle}>Currency</h3>
            <ul className={classUl}>
              {assetCurrency.map((currencyOption) => (
                <li key={currencyOption}>
                  <input
                    className='hidden peer'
                    type='radio'
                    value={currencyOption}
                    id={currencyOption}
                    {...register('currency')}
                  />
                  <label className={classLabelRadio} htmlFor={currencyOption}>
                    <span>{currencyOption}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {assetAccount[0] !== 'Investment' && assetAccount[0] !== 'cc' && (
            <div className={classDiv}>
              <h3 className={classTitle}>Account</h3>
              <ul className={classUl}>
                {assetAccount.map((accountOption) => (
                  <li key={accountOption}>
                    <input
                      className='hidden peer'
                      type='radio'
                      value={accountOption}
                      id={accountOption}
                      {...register('account')}
                    />
                    <label className={classLabelRadio} htmlFor={accountOption}>
                      <span>{accountOption}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className='flex items-center gap-2 mt-4 p-2'>
            <Controller
              name='reviewed'
              control={control}
              render={({ field }) => (
                <Checkbox
                  id='reviewed'
                  className='h-6 w-6 border-slate-300 transition-all data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900'
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor='reviewed' className='font-bold'>
              Mark as Reviewed
            </Label>
          </div>

          <Button className='mt-8' type='submit'>
            Update Asset
          </Button>

          <SheetClose asChild>
            <Button ref={closeRef} className='my-4' variant={'outline'}>
              Close
            </Button>
          </SheetClose>
        </div>
      </form>
    </>
  );
}
