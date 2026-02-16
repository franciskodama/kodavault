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
    <div className='flex flex-col items-center w-full mx-auto pb-20'>
      <div className='w-full py-12 px-8 flex flex-col items-center justify-center relative overflow-hidden mb-8'>
        <div className='max-w-4xl w-full text-center relative z-10'>
          <div className='flex flex-col items-center justify-center space-y-2'>
            <h1 className='text-3xl md:text-5xl font-serif font-semibold text-slate-800 tracking-tighter'>
              Comfortably Retire
            </h1>
            <div className='flex items-center gap-3'>
              <div className='h-[1.5px] w-8 bg-[#bd554c] opacity-50' />
              <h2 className='text-sm md:text-base font-semibold text-slate-500 uppercase tracking-[0.3em]'>
                In Every Country
              </h2>
              <div className='h-[1.5px] w-8 bg-[#bd554c] opacity-50' />
            </div>
          </div>
        </div>
      </div>

      <div className='w-full px-8'>
        <RetirementTable netWorthTotal={netWorthTotal} />
      </div>
    </div>
  );
}
