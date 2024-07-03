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
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
require("module-alias/register.js");
const currency_server_js_1 = require("../lib/currency.server.js");
const actions_jsx_1 = require("@/lib/actions.jsx");
const assets_jsx_1 = require("@/lib/assets.jsx");
(0, dotenv_1.config)();
function dailyTask() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const uid = 'fk@fkodama.com';
        try {
            const currencyRates = yield (0, currency_server_js_1.getCurrency)();
            const unpricedAssets = yield (0, assets_jsx_1.fetchAssets)(uid ? uid : '');
            const { assets, assetsByType } = yield (0, assets_jsx_1.fetchAssetsWithPrices)(unpricedAssets);
            const total = assets.reduce((sum, item) => sum + item.total, 0);
            const btcPrice = Number((_a = assetsByType.Crypto.find((item) => item.asset === 'BTC')) === null || _a === void 0 ? void 0 : _a.price);
            let chartData = null;
            if (uid && currencyRates.data && btcPrice) {
                chartData = {
                    uid,
                    usdTotal: total,
                    cadTotal: total * currencyRates.data.CAD,
                    brlTotal: total * currencyRates.data.BRL,
                    btcTotal: total / btcPrice,
                };
                yield (0, actions_jsx_1.addNetWorthEvolution)(chartData);
            }
            console.log('We arrived here!');
        }
        catch (error) {
            console.log('Error running daily task:', error);
        }
    });
}
exports.default = dailyTask;
console.log('Daily task scheduled!');
// cron.schedule('0 0 * * *', dailyTask);
dailyTask();
