"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../../../lib/data");
const utils_1 = require("../../../../lib/utils");
const Loading_1 = require("../../../../components/Loading");
const card_1 = require("@/components/ui/card");
const ath_table_1 = __importDefault(require("./ath-table"));
function AthProjections({ assets }) {
    let cryptoAssetsWithAth = [];
    let sumQtyOfSameAssets = [];
    let athAssets = [];
    let sortedAthAssets = [];
    if (!assets) {
        return <Loading_1.Loading />;
    }
    // const onlyCryptoAssets = assets.filter((item: any) => item.type === 'Crypto');
    cryptoAssetsWithAth = assets.map((item) => {
        const existingAsset = data_1.hardcodedAthCoins.find((el) => el.symbol === item.asset);
        return Object.assign(Object.assign({}, item), { ath: (existingAsset === null || existingAsset === void 0 ? void 0 : existingAsset.ath) ? existingAsset.ath : 0 });
    });
    sumQtyOfSameAssets = cryptoAssetsWithAth.reduce((acc, item) => {
        const existingAsset = acc.find((el) => el.asset === item.asset);
        if (existingAsset) {
            existingAsset.qty += item.qty;
            existingAsset.currentTotal += item.total;
        }
        else {
            acc.push(item);
        }
        return acc;
    }, []);
    athAssets = sumQtyOfSameAssets.map((item) => {
        // TODO: If Asset has 0 total value, make the code more resilient so it doesn't crash
        // if (item.qty === 0) {
        //   return {
        //     asset: item.asset,
        //     price: currencyFormatter(item.price),
        //     qty: numberFormatter.format(item.qty),
        //     currentTotal: currencyFormatter(0),
        //     ath: currencyFormatter(item.ath),
        //     athTotalNumber: 0,
        //     athTotalCurrency: currencyFormatter(0),
        //     xPotential: numberFormatter.format(0),
        //     percentagePotential: numberFormatterNoDecimals.format(0),
        //   };
        // }
        // return {
        //   asset: item.asset,
        //   price: currencyFormatter(item.price),
        //   qty: numberFormatter.format(item.qty),
        //   currentTotal: currencyFormatter(item.qty * item.price),
        //   ath: currencyFormatter(item.ath),
        //   athTotalNumber: item.ath * item.qty,
        //   athTotalCurrency: currencyFormatter(item.ath * item.qty),
        //   xPotential: numberFormatter.format(item.ath / item.price),
        //   percentagePotential: numberFormatterNoDecimals.format(
        //     ((item.ath - item.price) / item.price) * 100
        //   ),
        // };
        return {
            asset: item.asset,
            price: (0, utils_1.currencyFormatter)(item.price),
            qty: utils_1.numberFormatter.format(item.qty),
            currentTotal: (0, utils_1.currencyFormatter)(item.qty * item.price),
            ath: (0, utils_1.currencyFormatter)(item.ath),
            athTotalNumber: item.ath * item.qty,
            athTotalCurrency: (0, utils_1.currencyFormatter)(item.ath * item.qty),
            xPotential: utils_1.numberFormatter.format(item.ath / item.price),
            percentagePotential: utils_1.numberFormatterNoDecimals.format(((item.ath - item.price) / item.price) * 100),
        };
    });
    sortedAthAssets = athAssets.sort((a, b) => {
        return Number(b.xPotential) - Number(a.xPotential);
    });
    const athTotal = sortedAthAssets.reduce((sum, item) => {
        const currentAthTotalNumber = Number(item.athTotalNumber);
        return sum + currentAthTotalNumber;
    }, 0);
    return (<>
      {sortedAthAssets.length > 0 && (<div className='w-full'>
          <card_1.Card>
            <div className='flex flex-col justify-between'>
              <div className='flex flex-col'>
                <card_1.CardHeader>
                  <card_1.CardTitle className='capitalize flex items-center justify-between'>
                    <span>Crypto ATH Estimation</span>
                    <span className='text-3xl'>🏅</span>
                  </card_1.CardTitle>
                  <card_1.CardDescription className='text-xs'>
                    All-Time High Estimation
                  </card_1.CardDescription>
                </card_1.CardHeader>
                <card_1.CardContent>
                  {athAssets.length > 0 ? (<div>
                      <ath_table_1.default athAssets={athAssets}/>
                    </div>) : (<div className='my-32'>🙅🏻‍♀️ Not loaded yet</div>)}
                </card_1.CardContent>
              </div>
              <card_1.CardFooter className='flex justify-between text-sm text-slate-500 font-medium bg-slate-50 m-1 p-2'>
                <h3>Total</h3>
                {(0, utils_1.currencyFormatter)(athTotal)}
              </card_1.CardFooter>
            </div>
          </card_1.Card>
        </div>)}
    </>);
}
exports.default = AthProjections;
