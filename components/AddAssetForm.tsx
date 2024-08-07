'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useForm, SubmitHandler } from 'react-hook-form';

import { addAsset } from '@/lib/actions';
import { Button } from './ui/button';
import { Inputs } from '@/lib/types';
import { SheetClose } from './ui/sheet';
import { useToast } from './ui/use-toast';

import {
  categoryOptions,
  fixedSymbolsArr,
  getAccount,
  getCurrency,
  getExchange,
  getSymbol,
  getType,
  getWallet,
  purposeOptions,
  subtypeOptions,
} from '@/lib/assets-form';

export function AddAssetForm() {
  const [data, setData] = useState<Inputs>();
  const { toast } = useToast();
  const { user } = useUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({});

  const assetSubtype = watch('subtype');
  const assetType = getType(assetSubtype);
  const assetSymbol = getSymbol(assetSubtype);
  const assetWallet = getWallet(assetSubtype);
  const assetCurrency: string[] = getCurrency(assetSubtype);
  const assetAccount = getAccount(assetSubtype);
  const assetExchange = getExchange(assetSubtype);

  const classInput = 'border border-slate-200 h-10 p-2 rounded-xs w-full mt-2';
  const classDiv = 'my-4';
  const classUl = 'flex flex-wrap gap-2';
  const classTitle = 'font-bold mb-2';
  const classError = 'text-red-500 font-bold my-2';
  const classLabelRadio =
    'inline-flex items-center justify-center py-1 w-[8em] h-[2.5em] border-2 rounded-[2px] cursor-pointer text-primary border-gray-200 peer-checked:font-bold peer-checked:border-slate-500 peer-checked:text-primary peer-checked:bg-accent hover:text-slate-600 hover:bg-gray-100';

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
    if (assetExchange.length === 1) {
      setValue('exchange', assetExchange[0]);
    }
  }, [assetExchange, setValue]);

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
    } else {
      toast({
        title: '👻 Boho! Error occurred!',
        description: 'Your asset was NOT added.',
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

          <div className={classDiv}>
            <h3 className={classTitle}>Category</h3>
            <ul className={classUl}>
              {categoryOptions.map((categoryOption) => (
                <li key={categoryOption}>
                  <input
                    className='hidden peer'
                    type='radio'
                    value={categoryOption}
                    id={categoryOption}
                    {...register('category')}
                  />
                  <label className={classLabelRadio} htmlFor={categoryOption}>
                    <span>{categoryOption}</span>
                  </label>
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
            <input
              className={classInput}
              placeholder='Tag'
              {...register('tag')}
            />
            {/* {errors.qty?.message && (
              <p className={classError}>{errors.qty.message}</p>
            )} */}
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
                    <label className={classLabelRadio} htmlFor={currencyOption}>
                      <span>{currencyOption}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {assetAccount.length > 1 && (
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
          )}

          <Button className='mt-8' type='submit'>
            Add Asset
          </Button>

          <SheetClose asChild>
            <Button className='my-4' variant='outline'>
              Close
            </Button>
          </SheetClose>
        </div>
      </form>
    </>
  );
}
