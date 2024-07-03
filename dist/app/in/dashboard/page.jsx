"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = __importDefault(require("./dashboard"));
const nextjs_1 = require("@clerk/nextjs");
const currency_server_1 = require("@/lib/currency.server");
const assets_1 = require("@/lib/assets");
const actions_1 = require("@/lib/actions");
function DashboardPage() {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, nextjs_1.currentUser)();
        const uid = (_b = (_a = user === null || user === void 0 ? void 0 : user.emailAddresses) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.emailAddress;
        const currencyRates = yield (0, currency_server_1.getCurrency)();
        const unpricedAssets = yield (0, assets_1.fetchAssets)(uid ? uid : '');
        const { assets, assetsByType } = yield (0, assets_1.fetchAssetsWithPrices)(unpricedAssets);
        const total = assets.reduce((sum, item) => sum + item.total, 0);
        const btcPrice = Number((_c = assetsByType.Crypto.find((item) => item.asset === 'BTC')) === null || _c === void 0 ? void 0 : _c.price);
        let chartData = null;
        if (uid && currencyRates.data && btcPrice) {
            chartData = {
                uid,
                usdTotal: total,
                cadTotal: total * currencyRates.data.CAD,
                brlTotal: total * currencyRates.data.BRL,
                btcTotal: total / btcPrice,
            };
            yield (0, actions_1.addNetWorthEvolution)(chartData);
        }
        const netWorthEvolutionArray = yield (0, actions_1.getNetWorthEvolution)(uid ? uid : '');
        console.log('---  🚀 ---> | netWorthEvolutionArray:', netWorthEvolutionArray);
        return (<>
      {currencyRates && assets && assetsByType && (<dashboard_1.default currencyRates={currencyRates} assets={assets} assetsByType={assetsByType} btcPrice={btcPrice}/>)}
    </>);
    });
}
exports.default = DashboardPage;
