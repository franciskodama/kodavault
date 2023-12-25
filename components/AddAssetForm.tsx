import { useForm, SubmitHandler } from 'react-hook-form';

import { addAsset } from '@/lib/actions';
import { Button } from './ui/button';

type Inputs = {
  example: string;
  exampleRequired: string;
};

export function AddAssetForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch('example'));

  return (
    <>
      <form action={addAsset}>
        <div className='flex flex-col'>
          <div className='flex'>
            <label htmlFor='asset'>Asset</label>
            <input
              type='text'
              name='asset'
              required
              className='border-slate-50 rounded-xs'
            />
          </div>

          <div>
            <label htmlFor='qty'>Quantity</label>
            <input
              type='number'
              name='qty'
              required
              defaultValue={0}
              className='border-slate-50 rounded-xs'
            />
          </div>

          <div>
            <label htmlFor='wallet'>Wallet</label>
            <input
              type='text'
              name='wallet'
              required
              className='border-slate-50 rounded-xs'
            />
          </div>

          <div>
            <label htmlFor='type'>Type</label>
            <input
              type='text'
              name='type'
              required
              className='border-slate-50 rounded-xs'
            />
          </div>

          <div>
            <label htmlFor='subtype'>Subtype</label>
            <input
              type='text'
              name='subtype'
              className='border-slate-50 rounded-xs'
            />
          </div>

          <div>
            <label htmlFor='currency'>Currency</label>
            <input
              type='text'
              name='currency'
              required
              className='border-slate-50 rounded-xs'
            />
          </div>

          <div>
            <label htmlFor='account'>Account</label>
            <input
              type='text'
              name='account'
              required
              className='border-slate-50 rounded-xs'
            />
          </div>

          <div>
            <label htmlFor='exchange'>Exchange</label>
            <input
              type='text'
              name='exchange'
              defaultValue='null'
              className='border-slate-50 rounded-xs'
            />
          </div>
          <Button type='submit'>Add Asset</Button>
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
