'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { z } from 'zod';

import { addAsset } from '@/lib/actions';
import { Button } from './ui/button';
import { Inputs } from '@/lib/types';
import { SheetClose } from './ui/sheet';
import { useToast } from './ui/use-toast';

export function AddAssetForm() {
  const [data, setData] = useState<Inputs>();
  const { toast } = useToast();
  const { user } = useUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  const {
    register,
    control,
    watch,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    // defaultValues: {
    //   type: '',
    //   subtype: '',
    //   account: '',
    //   asset: '',
    //   qty: 0,
    //   wallet: '',
    //   exchange: '',
    //   currency: 'USD' as Currency,
    // },
  });

  const assetSubtype = watch('subtype');
  const assetType = getType(assetSubtype);
  const assetWallet = getWallet(assetSubtype);
  const assetCurrency = getCurrency(assetSubtype);
  const assetAccount = getAccount(assetSubtype);
  const assetExchange = getExchange(assetSubtype);

  useEffect(() => {
    setValue('type', assetType ? assetType : '');
  }, [assetType, setValue]);

  // useEffect(() => {
  //   setValue('currency', assetCurrency ? assetCurrency : '');
  // }, [assetType, setValue]);

  // useEffect(() => {
  //   setValue('account', assetType ? assetType : '');
  // }, [assetType, setValue]);

  // useEffect(() => {
  //   setValue('exchange', assetType ? assetType : '');
  // }, [assetType, setValue]);

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
              {getWallet(assetSubtype).map((walletOption) => (
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

const subtypeOptions = [
  'BTC',
  'ETH',
  'Altcoin',
  'Stock-USD',
  'Stock-CAD',
  'Stock-BRL',
  'Cash-USD',
  'Cash-CAD',
  'Cash-BRL',
];

const getType = (subtype: string) => {
  switch (subtype) {
    case 'BTC':
      return 'Crypto';
    case 'ETH':
      return 'Crypto';
    case 'Altcoin':
      return 'Crypto';
    case 'Stock-USD':
      return 'Stock';
    case 'Stock-CAD':
      return 'Stock';
    case 'Stock-BRL':
      return 'Stock';
    case 'Cash-USD':
      return 'Cash';
    case 'Cash-CAD':
      return 'Cash';
    case 'Cash-BRL':
      return 'Cash';
  }
};

const getWallet = (subtype: string) => {
  switch (subtype) {
    case 'BTC':
      return ['Binance', 'Bybit', 'Crypto.com', 'Ledger', 'Trezor'];
    case 'ETH':
      return ['Binance', 'Bybit', 'Crypto.com', 'Ledger', 'Trezor'];
    case 'Altcoin':
      return ['Binance', 'Bybit', 'Crypto.com', 'Ledger', 'Trezor'];
    case 'Stock-USD':
      return ['Wealthsimple', 'Clear'];
    case 'Stock-CAD':
      return ['Wealthsimple'];
    case 'Stock-BRL':
      return ['Clear'];
    case 'Cash-USD':
      return ['Binance', 'Bybit', 'Crypto.com', 'Ledger', 'Trezor'];
    case 'Cash-CAD':
      return ['Tangerine', 'Scotiabank'];
    case 'Cash-BRL':
      return ['Binance', 'Bybit', 'Nubank', 'Inter'];
    default:
      return [
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
  }
};

const getCurrency = (subtype: string) => {
  switch (subtype) {
    case 'BTC':
      return ['USD'];
    case 'ETH':
      return ['USD'];
    case 'Altcoin':
      return ['USD'];
    case 'Stock-USD':
      return ['CAD', 'USD', 'BRL'];
    case 'Stock-CAD':
      return ['CAD'];
    case 'Stock-BRL':
      return ['BRL'];
    case 'Cash-USD':
      return ['USD'];
    case 'Cash-CAD':
      return ['CAD'];
    case 'Cash-BRL':
      return ['BRL'];
    default:
      return ['CAD', 'USD', 'BRL'];
  }
};

const getAccount = (subtype: string) => {
  switch (subtype) {
    case 'BTC':
      return ['Invesment'];
    case 'ETH':
      return ['Invesment'];
    case 'Altcoin':
      return ['Invesment'];
    case 'Stock-USD':
      return ['Invesment', 'cc-TFSA', 'cc-FHSA'];
    case 'Stock-CAD':
      return ['cc-TFSA', 'cc-FHSA'];
    case 'Stock-BRL':
      return ['Invesment'];
    case 'Cash-USD':
      return ['Invesment'];
    case 'Cash-CAD':
      return ['Invesment', 'cc-TFSA', 'cc-FHSA'];
    case 'Cash-BRL':
      return ['Invesment'];
    default:
      return ['Invesment', 'cc-TFSA', 'cc-FHSA'];
  }
};

const getExchange = (subtype: string) => {
  switch (subtype) {
    case 'BTC':
      return ['N/A'];
    case 'ETH':
      return ['N/A'];
    case 'Altcoin':
      return ['N/A'];
    case 'Stock-USD':
      return ['SA', 'NASDAQ'];
    case 'Stock-CAD':
      return ['TO', 'V'];
    case 'Stock-BRL':
      return ['SA'];
    case 'Cash-USD':
      return ['N/A'];
    case 'Cash-CAD':
      return ['N/A'];
    case 'Cash-BRL':
      return ['N/A'];
    default:
      return ['N/A', 'TO', 'V', 'SA', 'NASDAQ'];
  }
};

// const AssetSchema = z.object({
//   account: z.string(),
//   asset: z.string().min(1).max(10),
//   qty: z.number().min(1).max(10),
//   wallet: z.string().min(1).max(15),
//   type: z.string(),
//   subtype: z.string(),
//   currency: z.string(),
//   uid: z.string().email(),
//   exchange: z.string(),
//   price: z.number().optional(),
//   total: z.number().optional(),
//   ath: z.number().optional(),
// });

{
  /* 
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
          </div> */
}

{
  /* {
          <input
            className='hidden peer'
            type='radio'
            value={getType(watch('subtype'))}
            {...register('type')}
          />
        } */
}
{
  /* <div className={classDiv}>
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
          </div> */
}
