"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardTotalAllCurrency = void 0;
const utils_1 = require("../lib/utils");
const card_1 = require("../components/ui/card");
const CardTotalAllCurrency = ({ currencyRates, assets, description = '', }) => {
    const total = assets.reduce((sum, item) => sum + item.total, 0);
    const btc = assets.find((item) => item.asset === 'BTC');
    let totalArray = [];
    if (currencyRates.data && (btc === null || btc === void 0 ? void 0 : btc.price)) {
        totalArray = [
            {
                currency: 'USD',
                value: total,
                emoji: '🇺🇸',
            },
            {
                currency: 'CAD',
                value: total * currencyRates.data.CAD,
                emoji: '🇨🇦',
            },
            {
                currency: 'BRL',
                value: total * currencyRates.data.BRL,
                emoji: '🇧🇷',
            },
            {
                currency: 'BTC',
                value: total / btc.price,
                emoji: '🥇',
            },
        ];
    }
    return (<card_1.Card className='bg-slate-600 mb-2'>
      <div className='flex flex-col justify-between'>
        <div className='flex flex-col'>
          <card_1.CardHeader>
            <card_1.CardTitle className='capitalize flex justify-between text-white mb-3'>
              <span>{`Total Vault`}</span>
            </card_1.CardTitle>
            <card_1.CardDescription className='text-white text-xs'>
              {description}
            </card_1.CardDescription>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className='flex flex-col gap-2 '>
              {totalArray.map((item) => (<div key={item.value} className='flex items-center justify-between px-4 bg-slate-500 rounded-[2px] text-white'>
                  <h3 className=' text-lg font-extralight'>{item.currency}</h3>
                  <div className='flex items-center'>
                    <p className='w-[8ch] text-right mr-4'>{`${item.currency === 'BTC'
                ? utils_1.numberFormatter.format(item.value)
                : utils_1.numberFormatterNoDecimals.format(item.value)}`}</p>
                    <span className='text-5xl'>{item.emoji}</span>
                  </div>
                </div>))}
            </div>
          </card_1.CardContent>
        </div>
      </div>
    </card_1.Card>);
};
exports.CardTotalAllCurrency = CardTotalAllCurrency;
