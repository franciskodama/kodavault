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
import { useReviewedAssets } from '@/app/(dashboard)/assets/reviewed-context';
import { playUpdateAssetSound } from '@/lib/sound';


export function UpdateAssetForm({
  asset,
  isReviewed,
}: {
  asset: Asset;
  isReviewed?: boolean;
}) {
  const { refreshAssets } = useAssetsContext();
  const { addReviewedAsset, removeReviewedAsset } = useReviewedAssets();
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
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to update an asset.',
        variant: 'destructive',
      });
      return;
    }

    const result = await updateAsset({ ...data, uid: uid || '' });

    if (result.success) {
      playUpdateAssetSound();
      toast({
        title: 'Asset Updated! 🎉',
        description: 'Your Asset is already updated.',
        variant: 'success',
      });
      await refreshAssets();
      closeRef.current?.click();
      if (data.reviewed && data.id) {
        addReviewedAsset(data.id);
      } else if (data.id) {
        removeReviewedAsset(data.id);
      }
      setData(data);
      reset();
    } else {
      toast({
        title: 'Ghost error! 👻',
        description: result.error || 'Your Asset was NOT Updated.',
        variant: 'destructive',
      });
    }
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
                  {...register('subtype', { required: 'Please select a type' })}
                />
                <label className={classLabelRadio} htmlFor={subtypeOption}>
                  <span>{subtypeOption}</span>
                </label>
              </li>
            ))}
          </ul>
          {errors.subtype?.message && (
            <p className={classError}>{errors.subtype.message}</p>
          )}
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
                {...register('qty', {
                  required: "Quantity can't be empty",
                  pattern: {
                    value: /^[0-9]+([.,][0-9]+)?$/,
                    message: 'Please enter a valid number',
                  },
                })}
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
                    {...register('wallet', {
                      required: 'Please select a wallet',
                    })}
                  />
                  <label className={classLabelRadio} htmlFor={walletOption}>
                    <span>{walletOption}</span>
                  </label>
                </li>
              ))}
            </ul>
            {errors.wallet?.message && (
              <p className={classError}>{errors.wallet.message}</p>
            )}
          </div>

          <div className={classDiv}>
            <h3 className={classTitle}>Category</h3>
            <ul className={classUl}>
              {categoryOptions.map((categoryOption) => (
                <li key={categoryOption}>
                  <CustomRadioWithTooltip
                    value={categoryOption}
                    id={categoryOption}
                    register={register('category', {
                      required: 'Please select a category',
                    })}
                    tooltipContent={getCategoryTooltip(categoryOption) || ''}
                    labelClassName={classLabelRadio}
                  />
                </li>
              ))}
            </ul>
            {errors.category?.message && (
              <p className={classError}>{errors.category.message}</p>
            )}
          </div>

          <div className={classDiv}>
            <h3 className={classTitle}>
              Purpose{' '}
              <span className='text-xs font-normal opacity-50'>(optional)</span>
            </h3>
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
            {errors.purpose?.message && (
              <p className={classError}>{errors.purpose.message}</p>
            )}
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
                    {...register('currency', {
                      required: 'Please select a currency',
                    })}
                  />
                  <label className={classLabelRadio} htmlFor={currencyOption}>
                    <span>{currencyOption}</span>
                  </label>
                </li>
              ))}
            </ul>
            {errors.currency?.message && (
              <p className={classError}>{errors.currency.message}</p>
            )}
          </div>

          {assetAccount[0] !== 'Investment' &&
            assetAccount[0] !== 'cc' &&
            assetAccount[0] !== '-' && (
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
                        {...register('account', {
                          required: 'Please select an account',
                        })}
                      />
                      <label
                        className={classLabelRadio}
                        htmlFor={accountOption}
                      >
                        <span>{accountOption}</span>
                      </label>
                    </li>
                  ))}
                </ul>
                {errors.account?.message && (
                  <p className={classError}>{errors.account.message}</p>
                )}
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
