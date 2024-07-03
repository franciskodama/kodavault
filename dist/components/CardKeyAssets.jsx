"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardKeyAssets = void 0;
const card_1 = require("./ui/card");
const CardKeyAssets = () => {
    const keyAssets = ['BTC', 'ETH', 'MATIC', 'IVVB11'];
    return (<card_1.Card className='flex-1'>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col'>
          <card_1.CardHeader>
            <card_1.CardTitle className='capitalize flex items-center justify-between'>
              <span>{`Crucial Assets`}</span>
              <span className='text-3xl'>🔑</span>
            </card_1.CardTitle>
            <card_1.CardDescription className='text-xs'>
              Assets to keep an eye on!
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            {keyAssets.map((item) => (<div key={item} className='flex justify-between'>
                <h3>{item}</h3>
                <div className='flex'>
                  {/* <p className='w-[8ch] text-right mr-4'>{`${numberFormatterNoDecimals.format(
              item
            )}`}</p> */}
                  {/* <p
              className={`text-white w-[8ch] px-1 m-1 text-center rounded-[2px] ${
                (item.total / total) * 100 > 50
                  ? 'bg-red-500'
                  : 'bg-green-500'
              }`}
            >{`${numberFormatter.format(
              (item.total / total) * 100
            )}%`}</p> */}
                </div>
              </div>))}
          </card_1.CardContent>
        </div>
        <card_1.CardFooter className='flex justify-between text-sm text-slate-500 font-medium bg-slate-50 m-1 p-2'>
          {/* <h3>Total</h3>
        {numberFormatterNoDecimals.format(
          totalArray.reduce((sum: number, item) => sum + item.total, 0)
        )} */}
        </card_1.CardFooter>
      </div>
    </card_1.Card>);
};
exports.CardKeyAssets = CardKeyAssets;
