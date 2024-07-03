"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardStocksBy = void 0;
const card_1 = require("../components/ui/card");
const utils_1 = require("../lib/utils");
const CardStocksBy = ({ assets, customKey, emoji = '', description = '', }) => {
    // Main Card "Total By Stock"
    const totalArray = (0, utils_1.getTotalByKey)(assets, customKey);
    const total = totalArray.reduce((sum, item) => sum + item.total, 0);
    // Other Cards
    const groupedByCustomKey = assets.reduce((acc, item) => {
        const value = item[customKey];
        if (!acc[value]) {
            acc[value] = [];
        }
        acc[value].push(item);
        return acc;
    }, {});
    const sortedArray = (arr) => arr.sort((a, b) => b.total - a.total);
    const accKeys = Object.keys(groupedByCustomKey);
    return (<card_1.Card className='flex-1'>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col'>
          <card_1.CardHeader>
            <card_1.CardTitle className='capitalize flex items-center justify-between'>
              <span>{`Stocks By ${customKey}`}</span>
              <span className='text-3xl'>{emoji}</span>
            </card_1.CardTitle>
            <card_1.CardDescription className='text-xs'>{description}</card_1.CardDescription>
          </card_1.CardHeader>

          <card_1.CardContent>
            {accKeys.map((key) => (<div key={key} className='border rounded-[2px] mb-2 p-2'>
                <h3 className='uppercase font-bold text-md flex justify-between text-primary mt-2 mb-4'>
                  {key}
                </h3>
                {sortedArray(groupedByCustomKey[key]).map((item) => (<div key={item.total} className='flex justify-between'>
                    <h3>{item.asset}</h3>
                    <h3>{item.value}</h3>
                    <div className='flex'>
                      <p className='w-[8ch] text-right mr-4'>{`${utils_1.numberFormatterNoDecimals.format(item.total)}`}</p>
                      <p className={`text-white w-[8ch] px-1 m-1 text-center rounded-[2px] ${(item.total / total) * 100 > 50
                    ? 'bg-red-500'
                    : 'bg-green-500'}`}>{`${utils_1.numberFormatter.format((item.total /
                    (0, utils_1.getTotalByKey)(groupedByCustomKey[key], key).reduce((sum, item) => sum + item.total, 0)) *
                    100)}%`}</p>
                    </div>
                  </div>))}

                <card_1.CardFooter className='flex justify-between text-xs text-slate-500 font-medium bg-slate-50 mt-2 p-2'>
                  <h3>Subtotal</h3>
                  {utils_1.numberFormatterNoDecimals.format((0, utils_1.getTotalByKey)(groupedByCustomKey[key], key).reduce((sum, item) => sum + item.total, 0))}
                </card_1.CardFooter>
              </div>))}
          </card_1.CardContent>
        </div>
      </div>
    </card_1.Card>);
};
exports.CardStocksBy = CardStocksBy;
