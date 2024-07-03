"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardNextPurchases = void 0;
const card_1 = require("../components/ui/card");
const utils_1 = require("../lib/utils");
const CardNextPurchases = () => {
    const total = nextPurchases.reduce((sum, item) => sum + item.total, 0);
    return (<card_1.Card className='w-[22.5em]'>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col'>
          <card_1.CardHeader>
            <card_1.CardTitle className='capitalize flex items-center justify-between'>
              <span>Next Purchases</span>
              <span className='text-3xl'>🔥</span>
            </card_1.CardTitle>
            <card_1.CardDescription className='text-xs'>
              {`Let's bet on these bad boys!`}
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            {nextPurchases.map((item) => (<div key={item.asset} className='flex justify-between'>
                <h3>{item.asset}</h3>
                <div className='flex'>
                  <p className='w-[8ch] text-right mr-4'>{`${utils_1.numberFormatterNoDecimals.format(item.total)}`}</p>
                  <p className={`text-white w-[8ch] px-1 m-1 text-center rounded-[2px] ${(item.total / total) * 100 > 50
                ? 'bg-red-500'
                : 'bg-green-500'}`}>{`${utils_1.numberFormatter.format((item.total / total) * 100)}%`}</p>
                </div>
              </div>))}
          </card_1.CardContent>
        </div>
        <card_1.CardFooter className='flex justify-between text-sm text-slate-500 font-medium bg-slate-50 m-1 p-2'>
          <h3>Total</h3>
          {utils_1.numberFormatterNoDecimals.format(nextPurchases.reduce((sum, item) => sum + item.total, 0))}
        </card_1.CardFooter>
      </div>
    </card_1.Card>);
};
exports.CardNextPurchases = CardNextPurchases;
const nextPurchases = [
    {
        asset: 'ETH',
        total: 20000,
    },
    {
        asset: 'ADA',
        total: 10000,
    },
    {
        asset: 'DOT',
        total: 7000,
    },
    {
        asset: 'SOL',
        total: 10000,
    },
    {
        asset: 'AVAX',
        total: 7000,
    },
];
