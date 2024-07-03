"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CardTotal_1 = require("@/components/CardTotal");
const CardAllCurrencies_1 = require("@/components/CardAllCurrencies");
const notifications_1 = __importDefault(require("./notifications/notifications"));
const utils_1 = require("@/lib/utils");
const CardAssetsOnTheRise_1 = require("@/components/CardAssetsOnTheRise");
function Dashboard({ currencyRates, assets, assetsByType, btcPrice, }) {
    return (<>
      {assets.length > 0 && assetsByType && (<div className='flex flex-col gap-2'>
          {/* -------- Legend --------------------------------------------------------------------------------------- */}
          <div className='flex justify-end items-center'>
            <div className='flex items-center mr-8'>
              <div className='mr-4'>
                <a target='_blank' href='https://ca.finance.yahoo.com/quote/BTC-USD?p=BTC-USD'>
                  <span>🪙</span>
                </a>
                {btcPrice && ` BTC/USD: ${(0, utils_1.currencyFormatter)(btcPrice)}`}
              </div>
              <div>
                <a target='_blank' href='https://ca.finance.yahoo.com/quote/USDCAD=X/'>
                  <span>🇨🇦</span>
                </a>

                {currencyRates.data &&
                ` CAD: ${(0, utils_1.currencyFormatter)(currencyRates.data.CAD)}`}
              </div>
              <div className='ml-4'>
                <a target='_blank' href='https://ca.finance.yahoo.com/quote/USDBRL=X/'>
                  <span>🇧🇷</span>
                </a>
                {currencyRates.data &&
                ` BRL: ${(0, utils_1.currencyFormatter)(currencyRates.data.BRL)}`}
              </div>
            </div>
            <div className='flex justify-end items-center gap-2 mr-8'>
              <p>Legend:</p>
              <div className='h-[10px] w-4 bg-green-500'/>
              <div>{`> 50%,`}</div>
              <div className='h-[10px] w-4 bg-red-500'/>
              <div>{`< 50%`}</div>
            </div>
          </div>

          {/* -------- 1st Row Cards --------------------------------------------------------------------------------------- */}

          <div className='flex gap-2'>
            <div className='flex flex-col basis-4/5 gap-2'>
              <div className='flex flex-wrap gap-2'>
                {/* <CardKeyAssets /> */}
                <CardTotal_1.CardTotal emoji={'🧺'} description={`Assets' Location Breakdown`} assets={assets} customKey={'wallet'}/>
                <CardTotal_1.CardTotal emoji={'💵'} description={`Assets' Origin Breakdown`} assets={assets} customKey={'currency'}/>
                <CardTotal_1.CardTotal emoji={'💰'} description={'Total value grouped by type'} assets={assets} customKey={'type'}/>
                <CardTotal_1.CardTotal emoji={'🤑'} description={'Total value grouped by currency'} assets={assetsByType.Cash} customKey={'cash'}/>
              </div>
              {/* <Transactions /> */}
              <div className='flex'>
                {/* <NetWorthEvolutionChart chartData={chartData} /> */}
              </div>
            </div>

            {/* -------- Right Panel  --------------------------------------------------------------------------------------- */}
            <div className='flex flex-col basis-1/5'>
              <CardAllCurrencies_1.CardTotalAllCurrency currencyRates={currencyRates} assets={assets} description={'Total Vault in USD, CAD, BRL.'}/>

              <div className='mb-2'>
                {/* <CardNextPurchases /> */}
                <CardAssetsOnTheRise_1.CardAssetsOnTheRise />
              </div>

              <notifications_1.default />
            </div>
          </div>

          {/* -------- 1st Row - After Chart --------------------------------------------------------------------------------------- */}
          <div className='flex flex-wrap gap-2'>
            {/* <div className='w-1/3 bg-slate-600 border-2' /> */}
            <CardTotal_1.CardTotal emoji={'🧺'} description={'Total value grouped by wallet'} assets={assets} customKey={'wallet'}/>
            <CardTotal_1.CardTotal emoji={'🗂️'} description={'Total value grouped by subtype'} assets={assets} customKey={'subtype'}/>
          </div>
        </div>)}
    </>);
}
exports.default = Dashboard;
