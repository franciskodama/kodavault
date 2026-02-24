import { currentUser } from '@clerk/nextjs/server';
import { RetirementTable } from '@/app/(dashboard)/retirement/RetirementTable';
import { fetchAssetsWithoutPrices, fetchAssetsWithPrices } from '@/lib/assets';

export default async function Retirement() {
  const user = await currentUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  const unpricedAssets = await fetchAssetsWithoutPrices(uid ? uid : '');
  const { assets } = await fetchAssetsWithPrices(unpricedAssets);
  const netWorthTotal =
    assets.reduce((sum, item) => sum + (item?.total || 0), 0) || 0;

  return (
    <div className='flex flex-col w-full mx-auto pb-20 px-8'>
      <div className='flex flex-col items-center justify-center mt-12 mb-12'>
        <p className='text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 leading-none mb-3'>
          Goal Hub
        </p>
        <h1 className='text-3xl font-bold text-slate-900 tracking-tight leading-none'>
          Comfortably Retire
        </h1>
        <div className='w-12 h-1.5 bg-[#22C55E] rounded-full mt-6 shadow-sm shadow-green-100' />
      </div>

      <div className='w-full px-8'>
        <RetirementTable netWorthTotal={netWorthTotal} />
      </div>
    </div>
  );
}
