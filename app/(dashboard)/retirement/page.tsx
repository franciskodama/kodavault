import { currentUser } from '@clerk/nextjs/server';
import { RetirementTable } from '@/components/dashboard/RetirementTable';
import { fetchAssetsWithoutPrices, fetchAssetsWithPrices } from '@/lib/assets';

export default async function Retirement() {
  const user = await currentUser();
  const uid = user?.emailAddresses?.[0]?.emailAddress;

  // Calculate actual current net worth
  const unpricedAssets = await fetchAssetsWithoutPrices(uid ? uid : '');
  const { assets } = await fetchAssetsWithPrices(unpricedAssets);
  const netWorthTotal =
    assets.reduce((sum, item) => sum + (item?.total || 0), 0) || 0;

  return (
    <div className='flex flex-col items-center w-full mx-auto pb-20'>
      <div className='w-full bg-[#a6cae2] py-16 px-8 flex flex-col items-center justify-center relative overflow-hidden mb-12 shadow-inner'>
        <div className='max-w-4xl w-full text-center relative z-10'>
          <h2 className='text-xl md:text-2xl font-black text-slate-800 uppercase tracking-[0.2em] mb-4 drop-shadow-sm'>
            The Cost for an American to
          </h2>
          <div className='flex flex-col md:flex-row items-center justify-center gap-x-6'>
            <h1 className='text-6xl md:text-9xl font-serif font-black text-[#1e293b] leading-tight flex items-center tracking-tighter'>
              Comfortably
            </h1>
          </div>
          <div className='flex flex-col md:flex-row items-baseline justify-center gap-6 mt-[-10px]'>
            <h1 className='text-6xl md:text-9xl font-serif font-black text-[#1e293b] leading-tight tracking-tighter'>
              Retire
            </h1>
            <div className='flex flex-col items-start'>
              <h2 className='text-2xl md:text-4xl font-black text-slate-800 uppercase tracking-tighter leading-none'>
                In Every
              </h2>
              <h2 className='text-2xl md:text-4xl font-black text-slate-800 uppercase tracking-tighter leading-none'>
                Country
              </h2>
            </div>
          </div>
        </div>

        {/* Subtle decorative elements */}
        <div className='absolute top-10 right-10 text-[100px] opacity-10 font-serif font-black select-none text-[#1e293b]'>
          $
        </div>
        <div className='absolute bottom-[-20px] left-[-20px] text-[150px] opacity-10 font-serif font-black select-none text-[#1e293b]'>
          $
        </div>
      </div>

      <div className='w-full px-8'>
        <RetirementTable netWorthTotal={netWorthTotal} />
      </div>
    </div>
  );
}
