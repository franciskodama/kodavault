'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { Inputs } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { addAsset } from '@/lib/actions';
import { category_enum_6c7fcd47 } from '@prisma/client';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import {
  altcoinsCategories,
  categoryOptions,
  fixedSymbolsArr,
  getAccounts,
  getCategories,
  getCategoryBySymbol,
  getCategoryTooltip,
  getCurrencies,
  getSymbols,
  getTypes,
  getWallets,
  purposeOptions,
  subtypeOptions,
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

export function AddAssetForm() {
  const { refreshAssets } = useAssetsContext();
  const { addReviewedAsset } = useReviewedAssets();
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
  } = useForm<Inputs>({});

  const symbolTyped = watch('asset');
  const assetSubtype = watch('subtype');
  const assetType = getTypes(assetSubtype);
  const assetSymbol = getSymbols(assetSubtype);
  const assetWallet = getWallets(assetSubtype);
  const assetCategory = getCategories(assetSubtype);
  const assetCurrency: string[] = getCurrencies(assetSubtype);
  const assetAccount = getAccounts(assetSubtype);
  // const assetExchange = getExchanges(assetSubtype);

  useEffect(() => {
    setValue('type', assetType ? assetType : '');
  }, [assetType, setValue]);

  useEffect(() => {
    if (assetSymbol) {
      if (['BTC', 'ETH', 'USDT', 'CAD', 'BRL'].includes(assetSymbol)) {
        setValue('asset', assetSymbol);
      }
    }
  }, [assetSymbol, setValue]);

  useEffect(() => {
    if (assetSubtype) {
      if (
        ['Altcoin', 'Stock-USD', 'Stock-BRL', 'Stock-CAD'].includes(
          assetSubtype
        )
      ) {
        setValue('asset', '');
      }
      if (assetSubtype === 'Stock-USD') {
        setValue('currency', 'USD');
      }

      if (assetSubtype === 'Stock-CAD') {
        setValue('currency', 'CAD');
      }

      if (assetSubtype === 'Stock-BRL') {
        setValue('currency', 'BRL');
      }

      if (assetSubtype === 'Stablecoins') {
        setValue('currency', 'USD');
      }
    }
  }, [assetSubtype, setValue]);

  useEffect(() => {
    if (assetCurrency.length === 1) {
      setValue('currency', assetCurrency[0]);
    }
  }, [assetCurrency, setValue]);

  useEffect(() => {
    if (assetAccount.length === 1) {
      setValue('account', assetAccount[0]);
    }
  }, [assetAccount, setValue]);

  useEffect(() => {
    if (assetCategory.length === 1) {
      setValue('category', assetCategory[0] as category_enum_6c7fcd47);
    }
  }, [assetCategory, setValue]);

  useEffect(() => {
    if (altcoinsCategories.find((coin) => coin.symbol === symbolTyped)) {
      const relatedCategory = getCategoryBySymbol(symbolTyped);
      setValue('category', relatedCategory as category_enum_6c7fcd47);
    }
  }, [symbolTyped, setValue]);

  const processForm: SubmitHandler<Inputs> = async (formData) => {
    if (!uid) {
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to add an asset.',
        variant: 'destructive',
      });
      return;
    }

    const result = await addAsset({
      ...formData,
      uid: uid || '',
      type: assetType ? assetType : '',
      tag: formData.tag?.trim() === '' ? 'No Tag' : formData.tag,
    });

    if (result.success) {
      toast({
        title: 'Asset added! 🎉',
        description: 'Your new asset is already available.',
        variant: 'success',
      });
      await refreshAssets();
      closeRef.current?.click();
      if (formData.reviewed && result.id) {
        addReviewedAsset(result.id);
      }
      reset();
      setData(formData);
    } else {
      toast({
        title: 'Ghost error! 👻',
        description: result.error || 'Your asset was NOT added.',
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

        {assetSubtype && (
          <div className='flex flex-col'>
            <div className='flex gap-4 w-full'>
              {assetSymbol && fixedSymbolsArr.includes(assetSymbol) ? null : (
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
              )}

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

            {(assetWallet.includes(watch('wallet')) ||
              watch('wallet') === 'Wealthsimple') &&
            assetAccount[0] !== '-' ? (
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
            ) : (
              <div>
                <input
                  className='hidden peer'
                  value={'-'}
                  {...register('account')}
                />
              </div>
            )}

            {assetCategory.length > 1 && (
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
                        tooltipContent={
                          getCategoryTooltip(categoryOption) || ''
                        }
                        labelClassName={classLabelRadio}
                      />
                    </li>
                  ))}
                </ul>
                {errors.category?.message && (
                  <p className={classError}>{errors.category.message}</p>
                )}
              </div>
            )}

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
              <input
                className={classInput}
                placeholder='Tag the asset, if needed.'
                {...register('tag')}
              />
            </div>

            {assetCurrency.length > 1 && (
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
                      <label
                        className={classLabelRadio}
                        htmlFor={currencyOption}
                      >
                        <span>{currencyOption}</span>
                      </label>
                    </li>
                  ))}
                </ul>
                {errors.currency?.message && (
                  <p className={classError}>{errors.currency.message}</p>
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
              Add Asset
            </Button>

            <SheetClose asChild>
              <Button ref={closeRef} className='my-4' variant='outline'>
                Close
              </Button>
            </SheetClose>
          </div>
        )}
      </form>
    </>
  );
}
