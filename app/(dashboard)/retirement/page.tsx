import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { RetirementTable } from '@/app/(dashboard)/retirement/RetirementTable';
import { fetchAssetsWithoutPrices, fetchAssetsWithPrices } from '@/lib/assets';

export default async function Retirement() {
  const session = await getServerSession(authOptions);
  const uid = session?.user?.email;

  const unpricedAssets = await fetchAssetsWithoutPrices(uid ? uid : '');
  const { assets } = await fetchAssetsWithPrices(unpricedAssets);
  const netWorthTotal =
    assets.reduce((sum, item) => sum + (item?.total || 0), 0) || 0;

  return (
    <div className='flex flex-col w-full mx-auto pb-20 px-4 sm:px-0'>
      <div className='flex flex-col sm:flex-row justify-between items-center mt-10 mb-10 px-4 sm:px-0'>
        <div className='flex items-center gap-4'>
          <div className='w-1 h-10 bg-[#22C55E] rounded-lg' />
          <div className='flex flex-col'>
            <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 leading-none mb-1'>
              Goal Hub
            </p>
            <h1 className='text-xl font-bold text-slate-900 tracking-tight leading-none'>
              Retirement Planning
            </h1>
          </div>
        </div>
      </div>

      <div className='w-full'>
        <RetirementTable netWorthTotal={netWorthTotal} />
      </div>
    </div>
  );
}
