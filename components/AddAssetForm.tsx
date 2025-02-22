'use client';

import { useEffect, useRef, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Inputs } from '@/lib/types';
import { Button } from './ui/button';
import { SheetClose } from './ui/sheet';
import { useToast } from './ui/use-toast';
import { addAsset } from '@/lib/actions';
import { category_enum_6c7fcd47 } from '@prisma/client';

import {
  altcoinsCategories,
  categoryOptions,
  cryptoAccounts,
  cryptoWallets,
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

export function AddAssetForm() {
  const { refreshAssets } = useAssetsContext();
  const [data, setData] = useState<Inputs>();
  const { toast } = useToast();
  const { user } = useUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;
  const closeRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
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
    setValue('purpose', 'Investment');
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
    if (altcoinsCategories.find((coin) => coin.symbol === symbolTyped)) {
      const relatedCategory = getCategoryBySymbol(symbolTyped);
      setValue('category', relatedCategory as category_enum_6c7fcd47);
    }
  }, [symbolTyped, setValue]);

  const processForm: SubmitHandler<Inputs> = async (data) => {
    if (!uid) {
      return console.log('User not logged in');
    }

    const result = await addAsset({
      ...data,
      uid: uid,
      type: assetType ? assetType : '',
    });

    if (result) {
      toast({
        title: 'Asset added! 🎉',
        description: 'Your new asset is already available.',
        variant: 'success',
      });
      await refreshAssets();
      closeRef.current?.click();
    } else {
      toast({
        title: '👻 Boho! Error occurred!',
        description: 'Your asset was NOT added.',
        variant: 'destructive',
      });
    }

    reset();
    setData(data);
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

        {assetSubtype && (
          <div className='flex flex-col'>
            {assetSymbol && fixedSymbolsArr.includes(assetSymbol) ? null : (
              <div className={classDiv}>
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

            <div className={classDiv}>
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

            {assetCategory.length > 1 && (
              <div className={classDiv}>
                <h3 className={classTitle}>Category</h3>
                <ul className={classUl}>
                  {categoryOptions.map((categoryOption) => (
                    <li key={categoryOption}>
                      <CustomRadioWithTooltip
                        value={categoryOption}
                        id={categoryOption}
                        register={register('category')}
                        tooltipContent={
                          getCategoryTooltip(categoryOption) || ''
                        }
                        labelClassName={classLabelRadio}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
                        {...register('currency')}
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
              </div>
            )}

            {cryptoWallets.includes(watch('wallet')) ? (
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
                      <label
                        className={classLabelRadio}
                        htmlFor={accountOption}
                      >
                        <span>{accountOption}</span>
                      </label>
                    </li>
                  ))}
                </ul>
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
            {/* 
          We don't need this for now (until we don't pay for an API to get the data
          Today we get in from Google Sheet - Google Finance formula)
          
          {assetExchange.length > 1 && (
            <div className={classDiv}>
              <h3 className={classTitle}>Exchange</h3>
              <ul className={classUl}>
                {assetExchange.map((exchangeOption) => (
                  <li key={exchangeOption}>
                    <input
                      className='hidden peer'
                      type='radio'
                      value={exchangeOption}
                      id={exchangeOption}
                      {...register('exchange')}
                    />
                    <label className={classLabelRadio} htmlFor={exchangeOption}>
                      <span>{exchangeOption}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )} */}

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
