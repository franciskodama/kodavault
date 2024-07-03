"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const CardStocksBy_1 = require("@/components/CardStocksBy");
const CardTotal_1 = require("@/components/CardTotal");
const Loading_1 = require("@/components/Loading");
const AssetsContext_1 = require("@/context/AssetsContext");
function StocksPage() {
    const { assets, isLoading } = (0, AssetsContext_1.useAssetsContext)();
    const stocksAssets = assets.filter((asset) => (asset === null || asset === void 0 ? void 0 : asset.type) === 'Stock');
    return (<>
      {isLoading ? (<div className='flex justify-center items-center h-[70em]'>
          <Loading_1.Loading />
        </div>) : (<div>
          {stocksAssets.length > 0 && (<div className='flex flex-wrap gap-2'>
              <CardTotal_1.CardTotal emoji={'🔖'} description={'Total value grouped by Stocks'} assets={stocksAssets} customKey={'stock'}/>
              <CardStocksBy_1.CardStocksBy emoji={'🪙'} description={'USD, CAD, and BRL'} assets={stocksAssets} customKey={'currency'}/>
              <CardStocksBy_1.CardStocksBy emoji={'🌎'} description={'Assets by Country Stocks'} assets={stocksAssets} customKey={'subtype'}/>
              <CardStocksBy_1.CardStocksBy emoji={'🏦'} description={'Stocks by Exchange'} assets={stocksAssets} customKey={'wallet'}/>
              <CardStocksBy_1.CardStocksBy emoji={'🧺'} description={'Stocks by Account Type'} assets={stocksAssets} customKey={'account'}/>
            </div>)}
        </div>)}
    </>);
}
exports.default = StocksPage;
