"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardTotal = void 0;
const card_1 = require("../components/ui/card");
const utils_1 = require("../lib/utils");
const CardTotal = ({ assets, customKey, emoji = '', description = '', }) => {
    const totalArray = (0, utils_1.getTotalByKey)(assets, customKey);
    const sortedArray = totalArray.sort((a, b) => b.total - a.total);
    const total = totalArray.reduce((sum, item) => sum + item.total, 0);
    return (<card_1.Card className='flex-1'>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex flex-col'>
          <card_1.CardHeader>
            <card_1.CardTitle className='capitalize flex items-center justify-between'>
              <span>{`Total By ${customKey}`}</span>
              <span className='text-3xl'>{emoji}</span>
            </card_1.CardTitle>
            <card_1.CardDescription className='text-xs'>{description}</card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            {sortedArray.map((item) => (<div key={item.value} className='flex justify-between'>
                <h3>{item.value}</h3>
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
          {utils_1.numberFormatterNoDecimals.format(totalArray.reduce((sum, item) => sum + item.total, 0))}
        </card_1.CardFooter>
      </div>
    </card_1.Card>);
};
exports.CardTotal = CardTotal;
