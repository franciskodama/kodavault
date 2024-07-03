"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_table_1 = require("./data-table");
const data_1 = require("../../../../lib/data");
const utils_1 = require("../../../../lib/utils");
const Loading_1 = require("../../../../components/Loading");
function PriceProjections({ assets }) {
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
    return (<>
      {sortedAthAssets.length > 0 && (<div className='w-full'>
          <data_table_1.DataTable athAssets={sortedAthAssets}/>
        </div>)}
    </>);
}
exports.default = PriceProjections;
