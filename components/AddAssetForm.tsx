'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { addAsset } from '@/lib/actions';
import { Button } from './ui/button';
import { Inputs } from '@/lib/types';

export function AddAssetForm() {
  const [data, setData] = useState<Inputs>();

  const {
    register,
    handleSubmit,
    watch,
    reset,
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
    },
  });

  const classNameDiv = 'flexn flex-col items-center my-4';
  const classNameLabel = 'font-bold';
  const classNameInput =
    'border border-slate-200 h-10 p-2 rounded-xs w-full mt-1';
  const classNameError = 'text-red-500 font-bold my-2';

  const processForm: SubmitHandler<Inputs> = async (data) => {
    await addAsset(data);
    // if (result) {
    //   console.log('Result: ', result);
    // }

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

          <div className={classNameDiv}>
            <label className={classNameLabel} htmlFor='wallet'>
              Wallet
            </label>
            <input
              className={classNameInput}
              placeholder='Wallet'
              {...register('wallet', { required: "Wallet can't be empty" })}
            />
            {errors.wallet?.message && (
              <p className={classNameError}>{errors.wallet.message}</p>
            )}
          </div>

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

          <Button className='my-4' type='submit'>
            Add Asset
          </Button>
        </div>
      </form>
    </>
  );
}

// https://ui.shadcn.com/docs/components/form
// VERCEL: https://www.youtube.com/watch?v=dDpZfOQBMaU
// indian https://www.youtube.com/watch?v=R_Pj593TH_Q
// Brett: https://www.youtube.com/watch?v=5MRLO-7O2So

// const [state, formAction] = useFormState(addAsset, initialState);

// const addAsset = async (formData: FormData) => {
//   // 'use server';

//   // const assetUid = GET FROM CLERK
//   const assetName = formData.get('asset');
//   const assetQty = formData.get('qty');
//   const assetWallet = formData.get('wallet');
//   const assetType = formData.get('type');
//   const assetSubtype = formData.get('subtype');
//   const assetCurrency = formData.get('currency');
//   const assetExchange = formData.get('exchange');
//   const assetAccount = formData.get('account');

//   // const newAsset = await prisma.asset.create({
//   //   data: {
//   //     name: assetName,
//   // }
//   // })
// };
