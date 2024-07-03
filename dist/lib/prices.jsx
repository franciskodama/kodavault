"use strict";
'use server';
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
exports.includePriceToCashAssets = exports.includePriceToStockAssets = exports.includePriceToCryptoAssets = void 0;
const crypto_server_1 = require("./crypto.server");
const currency_server_1 = require("./currency.server");
const stock_server_1 = require("./stock.server");
const includePriceToCryptoAssets = (cryptoAssetsArray) => __awaiter(void 0, void 0, void 0, function* () {
    const transformedAssets = yield Promise.all(cryptoAssetsArray.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const thisCryptoQuote = yield (0, crypto_server_1.fetchCryptoQuote)(item.asset);
        const quote = !((_a = thisCryptoQuote.data) === null || _a === void 0 ? void 0 : _a[item.asset][0].quote)
            ? 0
            : (_b = thisCryptoQuote.data) === null || _b === void 0 ? void 0 : _b[item.asset][0].quote.USD.price;
        const total = quote * item.qty;
        const formattedPrice = quote === 0
            ? 0
            : Math.floor(quote) > 99
                ? Number(quote.toFixed(2))
                : Number(quote.toFixed(4));
        const formattedTotal = Math.floor(total) > 99
            ? Number(total.toFixed(2))
            : Number(total.toFixed(4));
        return Object.assign(Object.assign({}, item), { qty: item.qty, price: formattedPrice, total: formattedTotal });
    })));
    return transformedAssets;
});
exports.includePriceToCryptoAssets = includePriceToCryptoAssets;
// ------------ History of includePriceToStockAssets fuction ------------
// This piece of code was written to use APIs, but they didn't give us for free the symbols we need (Canadian and Brazilian stocks).
// So, as the APIs asks for upgrade, we created a spreadsheet using Google Finance Formulas that needs to be updated manually
// Although we have this solution, the code will maintain the collection of symbols to make a call in the future with an API.
// ----------------------------------------------------------------------
const includePriceToStockAssets = (stockAssetsArray) => __awaiter(void 0, void 0, void 0, function* () {
    const currencyRates = yield (0, currency_server_1.getCurrency)();
    let symbolAndExchange = [];
    stockAssetsArray.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        symbolAndExchange.push(
        // `${item.asset}${item.exchange === null ? '' : `.${item.exchange}`}`
        item.asset);
    }));
    const symbolsToMakeACall = symbolAndExchange.toString();
    const symbolsToCheckResultFromTheCall = symbolsToMakeACall.split(',');
    // const result = await fetchHardcodedStockPrices(symbolsToMakeACall);
    let stockPrices = { body: [] };
    let result = yield (0, stock_server_1.fetchStockPricesFromSheets)();
    if (!result.body) {
        symbolsToCheckResultFromTheCall.map((item) => {
            var _a;
            (_a = stockPrices.body) === null || _a === void 0 ? void 0 : _a.push({
                symbol: item,
                regularMarketPrice: 0,
                currency: 'USD',
            });
        });
        result = stockPrices;
        // console.log('---  🚀 ---> | result:', result);
    }
    const missingSymbols = symbolsToCheckResultFromTheCall.filter((item) => !result.body.find((el) => el.symbol === item));
    // console.log('---  🚀 ---> | missingSymbols:', missingSymbols);
    missingSymbols.map((item) => result.body.push({
        symbol: item,
        regularMarketPrice: 0,
        currency: 'USD',
    }));
    try {
        if (result.body && currencyRates && currencyRates.data) {
            const onlySymbolAndPriceArray = result.body.map((item) => {
                var _a, _b;
                return {
                    asset: item.symbol.split('.')[0],
                    price: item.regularMarketPrice /
                        (item.currency === 'CAD'
                            ? Number((_a = currencyRates.data) === null || _a === void 0 ? void 0 : _a.CAD)
                            : item.currency === 'BRL'
                                ? Number((_b = currencyRates.data) === null || _b === void 0 ? void 0 : _b.BRL)
                                : 1),
                };
            });
            const stockAssetsWithPrices = stockAssetsArray.map((item) => {
                var _a, _b;
                const thisStock = onlySymbolAndPriceArray.find((el) => el.asset === item.asset);
                return Object.assign(Object.assign({}, item), { price: Number((_a = thisStock === null || thisStock === void 0 ? void 0 : thisStock.price) !== null && _a !== void 0 ? _a : 0).toFixed(2), total: Number((Number((_b = thisStock === null || thisStock === void 0 ? void 0 : thisStock.price) !== null && _b !== void 0 ? _b : 0) * item.qty).toFixed(2)) });
            });
            return stockAssetsWithPrices;
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.includePriceToStockAssets = includePriceToStockAssets;
const includePriceToCashAssets = (cashAssetsArray) => __awaiter(void 0, void 0, void 0, function* () {
    const currencyRates = yield (0, currency_server_1.getCurrency)();
    if (!currencyRates.data) {
        return cashAssetsArray.map((item) => (Object.assign(Object.assign({}, item), { price: 1, total: item.qty })));
    }
    const transformedAssets = cashAssetsArray.map((item) => {
        var _a, _b, _c, _d;
        let price = 1;
        let total = item.qty;
        if (item.currency === 'CAD') {
            price = 1 / (((_a = currencyRates.data) === null || _a === void 0 ? void 0 : _a.CAD) || 1);
            total = item.qty / (((_b = currencyRates.data) === null || _b === void 0 ? void 0 : _b.CAD) || 1);
        }
        else if (item.currency === 'BRL') {
            price = 1 / (((_c = currencyRates.data) === null || _c === void 0 ? void 0 : _c.BRL) || 1);
            total = item.qty / (((_d = currencyRates.data) === null || _d === void 0 ? void 0 : _d.BRL) || 1);
        }
        return Object.assign(Object.assign({}, item), { qty: item.qty, price: Number(Number(price).toFixed(2)), total: Number(Number(total).toFixed(2)) });
    });
    return transformedAssets;
});
exports.includePriceToCashAssets = includePriceToCashAssets;
