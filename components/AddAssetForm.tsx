'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { z } from 'zod';

import { addAsset } from '@/lib/actions';
import { Button } from './ui/button';
import { Inputs } from '@/lib/types';
import { SheetClose } from './ui/sheet';
import { useToast } from './ui/use-toast';

const AssetSchema = z.object({
  account: z.string(),
  asset: z.string().min(1).max(10),
  qty: z.number().min(1).max(10),
  wallet: z.string().min(1).max(15),
  type: z.string(),
  subtype: z.string(),
  currency: z.string(),
  uid: z.string().email(),
  exchange: z.string(),
  price: z.number().optional(),
  total: z.number().optional(),
  ath: z.number().optional(),
});

export function AddAssetForm() {
  const [data, setData] = useState<Inputs>();
  const { toast } = useToast();
  const { user } = useUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const classInput = 'border border-slate-200 h-10 p-2 rounded-xs w-full mt-1';
  const classDiv = 'my-4';
  const classUl = 'flex flex-wrap gap-2';
  const classTitle = 'font-bold mb-1';
  const classError = 'text-red-500 font-bold my-2';
  const classLabelRadio =
    'inline-flex items-center justify-center w-[8em] h-[2.5em] border-2 rounded-[2px] cursor-pointer text-primary border-gray-200 peer-checked:font-bold peer-checked:border-slate-500 peer-checked:text-primary peer-checked:bg-accent hover:text-slate-600 hover:bg-gray-100';

  const processForm: SubmitHandler<Inputs> = async (data) => {
    if (!uid) {
      return console.log('User not logged in');
    }

    const result = await addAsset({ ...data, uid: uid });

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
      <form onSubmit={handleSubmit(processForm)}>
        <div className='flex flex-col mt-6'>
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
              {walletOptions.map((walletOption) => (
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
          {/* 
          <div className={classDiv}>
            <label className={classTitle} htmlFor='type'>
              Type
            </label>
            <input
              className={classInput}
              placeholder='Crypto, Stock, or Cash'
              {...register('type', { required: "Type can't be empty" })}
            />
            {errors.type?.message && (
              <p className={classError}>{errors.type.message}</p>
            )}
          </div> */}

          <div className={classDiv}>
            <h3 className={classTitle}>Type</h3>
            <ul className={classUl}>
              {typeOptions.map((typeOption) => (
                <li key={typeOption}>
                  <input
                    className='hidden peer'
                    type='radio'
                    value={typeOption}
                    id={typeOption}
                    {...register('type')}
                  />
                  <label className={classLabelRadio} htmlFor={typeOption}>
                    <span>{typeOption}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className={classDiv}>
            <h3 className={classTitle}>Subtype</h3>
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

          <div className={classDiv}>
            <h3 className={classTitle}>Currency</h3>
            <ul className={classUl}>
              {currencyOptions.map((currencyOption) => (
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

          <div className={classDiv}>
            <h3 className={classTitle}>Account</h3>
            <ul className={classUl}>
              {accountOptions.map((accountOption) => (
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

          <div className={classDiv}>
            <h3 className={classTitle}>Exchange</h3>
            <ul className={classUl}>
              {exchangeOptions.map((exchangeOption) => (
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

          <Button className='mt-8' type='submit'>
            Add Asset
          </Button>

          <SheetClose asChild>
            <Button className='my-4' type='submit' variant={'outline'}>
              Close
            </Button>
          </SheetClose>
        </div>
      </form>
    </>
  );
}

const walletOptions = [
  'Binance',
  'Bybit',
  'Crypto.com',
  'Wealthsimple',
  'Ledger',
  'Trezor',
  'Nubank',
  'Inter',
  'Tangerine',
];

const subtypeOptions = [
  'Altcoin',
  'BTC',
  'ETH',
  'Stock-USD',
  'Stock-CAD',
  'Stock-BRL',
  'Cash-USD',
  'Cash-CAD',
  'Cash-BRL',
];

const typeOptions = ['Crypto', 'Stock', 'Cash'];
const currencyOptions = ['USD', 'CAD', 'BRL'];
const accountOptions = ['cc', 'Investment', 'cc-TFSA', 'cc-FHSA'];
const exchangeOptions = ['N/A', 'TO', 'V', 'SA', 'NASDAQ'];
