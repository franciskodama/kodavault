'use client';

import { Loading } from '@/components/common/Loading';
import { CardTotal } from '@/components/dashboard/CardTotal';
import { CardAssetsBy } from '@/components/dashboard/CardAssetsBy';
import { useAssetsContext } from '@/context/AssetsContext';
import MessageInTable from '@/components/common/MessageInTable';
import {
  Coins,
  Globe,
  Landmark,
  Briefcase,
  TrendingUp,
  LayoutDashboard,
} from 'lucide-react';

export default function Stocks() {
  const { assets, isLoading } = useAssetsContext();
  const stockAssets = assets.filter((asset) => asset?.type === 'Stock');

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center h-[70em]'>
          <Loading />
        </div>
      ) : (
        <div className='flex flex-col gap-1 px-8 sm:p-0'>
          <div className='flex flex-col sm:flex-row justify-between items-end mb-10 px-4 sm:px-0'>
            <div className='flex items-center gap-4 mt-8'>
              <div className='w-1 h-10 bg-[#22C55E] rounded-lg' />
              <div className='flex flex-col'>
                <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 leading-none mb-1'>
                  Market Hub
                </p>
                <h1 className='text-xl font-bold text-slate-900 tracking-tight leading-none'>
                  Stock Portfolio
                </h1>
              </div>
            </div>
          </div>
          {stockAssets.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0 mb-12'>
              <CardTotal
                Icon={TrendingUp}
                description={'Total value grouped by Stocks'}
                assets={stockAssets}
                customKey={'stock'}
              />
              <CardAssetsBy
                assetType={'Stocks'}
                Icon={Coins}
                description={'USD, CAD, and BRL'}
                assets={stockAssets}
                customKey={'currency'}
              />
              <CardAssetsBy
                assetType={'Stocks'}
                Icon={Globe}
                description={'Assets by Country Stocks'}
                assets={stockAssets}
                customKey={'subtype'}
              />
              <CardAssetsBy
                assetType={'Stocks'}
                Icon={Landmark}
                description={'Stocks by Exchange'}
                assets={stockAssets}
                customKey={'wallet'}
              />
              <CardAssetsBy
                assetType={'Stocks'}
                Icon={Briefcase}
                description={'Stocks by Account Type'}
                assets={stockAssets}
                customKey={'account'}
              />
              <CardTotal
                Icon={LayoutDashboard}
                description={'Sector Allocation'}
                assets={stockAssets}
                customKey={'tag'}
              />
            </div>
          ) : (
            <MessageInTable
              image={'/searching.webp'}
              objectPosition={'50% 10%'}
              alt={'I am broke'}
              title={'No stocks in your portfolio yet!'}
              subtitle={
                'Time to start building that empire. Add some stocks and watch your investments take off!'
              }
              buttonCopy={'Add a Stock'}
              hasNoButton={false}
              formTitle={'Add a new Asset'}
              formSubtitle={
                'Add a New Asset and expand your investment portfolio.'
              }
            />
          )}
        </div>
      )}
    </>
  );
}
