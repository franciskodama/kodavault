'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { toast } from 'sonner';

import { addAsset } from '@/lib/actions';
import { Button } from './ui/button';
import { Inputs } from '@/lib/types';
import { SheetClose } from './ui/sheet';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from './ui/use-toast';

export function AddAssetForm() {
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
      wallet: '',
      type: '',
      subtype: '',
      currency: '',
      exchange: '',
      account: '',
      uid: uid,
    },
  });

  const classNameDiv = 'flexn flex-col items-center my-4';
  const classNameLabel = 'font-bold';
  const classNameInput =
    'border border-slate-200 h-10 p-2 rounded-xs w-full mt-1';
  const classNameError = 'text-red-500 font-bold my-2';
  const classNameRadioButton = 'text-red-500 font-bold my-2';

  const processForm: SubmitHandler<Inputs> = async (data) => {
    if (!uid) {
      return console.log('User not logged in');
    }

    const result = await addAsset({ ...data, uid: uid });

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
          <div className={classNameDiv}>
            <label className={classNameLabel} htmlFor='asset'>
              Asset
            </label>
            <input
              className={classNameInput}
              placeholder='Asset Symbol'
              {...register('asset', { required: "Asset can't be empty" })}
            />
            {errors.asset?.message && (
              <p className={classNameError}>{errors.asset.message}</p>
            )}
          </div>

          <div className={classNameDiv}>
            <label className={classNameLabel} htmlFor='qty'>
              Quantity
            </label>
            <input
              className={classNameInput}
              placeholder='Quantity'
              {...register('qty', { required: "Quantity can't be empty" })}
            />
            {errors.qty?.message && (
              <p className={classNameError}>{errors.qty.message}</p>
            )}
          </div>

          {/* ====================== */}
          <div className={classNameDiv}>
            <label className={classNameLabel} htmlFor='wallet'>
              Wallet
            </label>

            {walletOptions.map((wallet) => (
              <div key={wallet}>
                <input
                  type='radio'
                  id={wallet}
                  value={wallet}
                  className={classNameRadioButton}
                  {...register('wallet', { required: "Wallet can't be empty" })}
                />
                <label htmlFor={wallet}>{wallet}</label>
                {errors.wallet?.message && (
                  <p className={classNameError}>{errors.wallet.message}</p>
                )}
              </div>
            ))}

            {/* <input
              className={classNameInput}
              placeholder='Wallet'
              {...register('wallet', { required: "Wallet can't be empty" })}
            />
            {errors.wallet?.message && (
              <p className={classNameError}>{errors.wallet.message}</p>
            )} */}

            {/* <RadioGroup defaultValue={walletOptions[0]}>
              {walletOptions.map((wallet) => (
                <div key={wallet} className='flex items-center space-x-2'>
                  <RadioGroupItem
                  
                    value={wallet}
                    id={wallet}
                    {...register('wallet', {
                      required: "Wallet can't be empty",
                    })}
                  />
                  <Label htmlFor={wallet}>{wallet}</Label>
                  {errors.wallet?.message && (
                    <p className={classNameError}>{errors.wallet.message}</p>
                  )}
                </div>
              ))}
            </RadioGroup> */}
          </div>

          {/* ====================== */}
          <div className={classNameDiv}>
            <label className={classNameLabel} htmlFor='type'>
              Type
            </label>
            <input
              className={classNameInput}
              placeholder='Type (Stock, Altcoin, Crypto)'
              {...register('type', { required: "Type can't be empty" })}
            />
            {errors.type?.message && (
              <p className={classNameError}>{errors.type.message}</p>
            )}
          </div>

          <div className={classNameDiv}>
            <label className={classNameLabel} htmlFor='subtype'>
              Subtype
            </label>
            <input
              className={classNameInput}
              placeholder='Stock-CAD, Stock-USD, Stock-BRL, Altcoin, BTC, ETH'
              {...register('subtype', { required: "Subtype can't be empty" })}
            />
            {errors.subtype?.message && (
              <p className={classNameError}>{errors.subtype.message}</p>
            )}
          </div>

          <div className={classNameDiv}>
            <label className={classNameLabel} htmlFor='currency'>
              Currency
            </label>
            <input
              className={classNameInput}
              placeholder='USD, CAD, BRL'
              {...register('currency', {
                required: "Currency can't be empty",
                minLength: {
                  value: 3,
                  message: 'Currency must be at least 3 characters',
                },
              })}
            />
            {errors.currency?.message && (
              <p className={classNameError}>{errors.currency.message}</p>
            )}
          </div>

          <div className={classNameDiv}>
            <label className={classNameLabel} htmlFor='account'>
              Account
            </label>
            <input
              className={classNameInput}
              placeholder='Investment, cc-TFSA, cc-FHSA'
              {...register('account', { required: "Account can't be empty" })}
            />
            {errors.account?.message && (
              <p className={classNameError}>{errors.account.message}</p>
            )}
          </div>

          <div className={classNameDiv}>
            <label className={classNameLabel} htmlFor='exchange'>
              Exchange
            </label>
            <input
              className={classNameInput}
              placeholder='TO, V, SA, NASDAQ'
              {...register('exchange', { required: false })}
            />
            {errors.exchange?.message && (
              <p className={classNameError}>{errors.exchange.message}</p>
            )}
          </div>
          {/* <SheetClose asChild> */}
          <Button className='my-4' type='submit'>
            Add Asset
          </Button>
          {/* </SheetClose> */}
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
