'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { updateAsset } from '@/lib/actions';
import { Button } from './ui/button';
import { Inputs } from '@/lib/types';
import { SheetClose } from './ui/sheet';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from './ui/use-toast';

export function UpdateAssetForm({ id }: { id: string }) {
  const [data, setData] = useState<Inputs>();
  const { toast } = useToast();
  const { user } = useUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      asset: '',
      qty: 0,
      wallet: walletOptions[0],
      type: '',
      subtype: subtypeOptions[0],
      currency: currencyOptions[0],
      exchange: exchangeOptions[0],
      account: accountOptions[0],
      uid: uid,
    },
  });

  const classDiv = 'flexn flex-col items-center my-4';
  const classLabel = 'font-bold';
  const classInput = 'border border-slate-200 h-10 p-2 rounded-xs w-full mt-1';
  const classError = 'text-red-500 font-bold my-2';
  const classDivRadioGroup =
    'relative flex items-center justify-center w-[8em] h-[2.5em] rounded-[2px] border-2 border-slate-500';
  const classRadioItem =
    'absolute t-0 left-1/2 -translate-x-1/2 w-[8em] h-[2.5em] border-0';
  const classLabelRadio = 'text-xs z-10';

  const processForm: SubmitHandler<Inputs> = async (data) => {
    if (!uid) {
      return console.log('User not logged in');
    }

    const result = await updateAsset({ ...data, uid: uid });

    if (result) {
      toast({
        title: 'Asset added! 🎉',
        description: 'Your new asset is already available.',
      });
    } else {
      toast({
        title: '🚨 Uh oh! Something went wrong!',
        description: 'Your asset was NOT added.',
        variant: 'destructive',
      });
    }

    reset();
    setData(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(processForm)}>
        <div className='flex flex-col mt-6'>
          <div className={classDiv}>
            <label className={classLabel} htmlFor='asset'>
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
            <label className={classLabel} htmlFor='qty'>
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
            <label className={classLabel} htmlFor='wallet'>
              Wallet
            </label>
            <RadioGroup
              className='flex flex-wrap mt-1'
              defaultValue={walletOptions[0]}
            >
              {walletOptions.map((wallet) => (
                <div key={wallet} className={classDivRadioGroup}>
                  <RadioGroupItem
                    className={classRadioItem}
                    value={wallet}
                    id={wallet}
                    {...register('wallet')}
                  />
                  <Label className={classLabelRadio} htmlFor={wallet}>
                    {wallet}
                  </Label>
                  {errors.wallet?.message && (
                    <p className={classError}>{errors.wallet.message}</p>
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className={classDiv}>
            <label className={classLabel} htmlFor='type'>
              Type
            </label>
            <input
              className={classInput}
              placeholder='Type (Stock, Altcoin, Crypto)'
              {...register('type', { required: "Type can't be empty" })}
            />
            {errors.type?.message && (
              <p className={classError}>{errors.type.message}</p>
            )}
          </div>

          <div className={classDiv}>
            <label className={classLabel} htmlFor='subtype'>
              Subtype
            </label>
            <RadioGroup
              className='flex flex-wrap mt-1'
              defaultValue={subtypeOptions[0]}
            >
              {subtypeOptions.map((subtype) => (
                <div key={subtype} className={classDivRadioGroup}>
                  <RadioGroupItem
                    className={classRadioItem}
                    value={subtype}
                    id={subtype}
                    {...register('subtype')}
                  />
                  <Label className={classLabelRadio} htmlFor={subtype}>
                    {subtype}
                  </Label>
                  {errors.subtype?.message && (
                    <p className={classError}>{errors.subtype.message}</p>
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className={classDiv}>
            <label className={classLabel} htmlFor='currency'>
              Currency
            </label>
            <RadioGroup
              className='flex flex-wrap mt-1'
              defaultValue={currencyOptions[0]}
            >
              {currencyOptions.map((currency) => (
                <div key={currency} className={classDivRadioGroup}>
                  <RadioGroupItem
                    className={classRadioItem}
                    value={currency}
                    id={currency}
                    {...register('currency')}
                  />
                  <Label className={classLabelRadio} htmlFor={currency}>
                    {currency}
                  </Label>
                  {errors.currency?.message && (
                    <p className={classError}>{errors.currency.message}</p>
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className={classDiv}>
            <label className={classLabel} htmlFor='account'>
              Account
            </label>
            <RadioGroup
              className='flex flex-wrap mt-1'
              defaultValue={accountOptions[0]}
            >
              {accountOptions.map((account) => (
                <div key={account} className={classDivRadioGroup}>
                  <RadioGroupItem
                    className={classRadioItem}
                    value={account}
                    id={account}
                    {...register('account')}
                  />
                  <Label className={classLabelRadio} htmlFor={account}>
                    {account}
                  </Label>
                  {errors.account?.message && (
                    <p className={classError}>{errors.account.message}</p>
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className={classDiv}>
            <label className={classLabel} htmlFor='exchange'>
              Exchange
            </label>
            <RadioGroup
              className='flex flex-wrap mt-1'
              defaultValue={exchangeOptions[0]}
            >
              {exchangeOptions.map((exchange) => (
                <div key={exchange} className={classDivRadioGroup}>
                  <RadioGroupItem
                    className={classRadioItem}
                    value={exchange}
                    id={exchange}
                    {...register('exchange')}
                  />
                  <Label className={classLabelRadio} htmlFor={exchange}>
                    {exchange}
                  </Label>
                  {errors.exchange?.message && (
                    <p className={classError}>{errors.exchange.message}</p>
                  )}
                </div>
              ))}
            </RadioGroup>
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
  'Tangerine',
];

const subtypeOptions = [
  'Altcoin',
  'BTC',
  'ETH',
  'Stock-CAD',
  'Stock-USD',
  'Stock-BRL',
];

const typeOptions = ['Stock', 'Altcoin', 'Crypto'];
const currencyOptions = ['USD', 'CAD', 'BRL'];
const accountOptions = ['Investment', 'cc-TFSA', 'cc-FHSA'];
const exchangeOptions = ['N/A', 'TO', 'V', 'SA', 'NASDAQ'];
