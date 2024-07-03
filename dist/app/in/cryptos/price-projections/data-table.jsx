"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTable = void 0;
const card_1 = require("../../../../components/ui/card");
const utils_1 = require("../../../../lib/utils");
const DataTable = ({ athAssets, }) => {
    const athTotal = athAssets.reduce((sum, item) => {
        const currentAthTotalNumber = Number(item.athTotalNumber);
        return sum + currentAthTotalNumber;
    }, 0);
    return (<div>
      <card_1.Card>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-col'>
            <card_1.CardHeader>
              <card_1.CardTitle className='capitalize flex items-center justify-between'>
                <span>Price Projections</span>
                <span className='text-3xl'>🚀</span>
              </card_1.CardTitle>
              <card_1.CardDescription className='text-xs'>
                Where you see the Price Projection made by YouTubers and others
              </card_1.CardDescription>
            </card_1.CardHeader>
            <card_1.CardContent>
              {athAssets.length > 0 ? (<div>{/* <EstimationTable athAssets={athAssets} /> */}</div>) : (<div className='my-32'>🙅🏻‍♀️ Not loaded yet</div>)}
            </card_1.CardContent>
          </div>
          <card_1.CardFooter className='flex justify-between text-sm text-slate-500 font-medium bg-slate-50 m-1 p-2'>
            <h3>Total</h3>
            {(0, utils_1.currencyFormatter)(athTotal)}
          </card_1.CardFooter>
        </div>
      </card_1.Card>
    </div>);
};
exports.DataTable = DataTable;
