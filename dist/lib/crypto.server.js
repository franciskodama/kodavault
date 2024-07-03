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
exports.getAllTimeHighData = exports.fetchCryptoQuote = exports.fetchCryptoListings = void 0;
const apiKey = process.env.NEXT_PUBLIC_COINCAP_KEY;
if (!apiKey) {
    throw new Error('API key is not defined');
}
const headers = {
    'X-CMC_PRO_API_KEY': apiKey,
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
};
// Not using yet for now, but let's create a page to rank the coins
const fetchCryptoListings = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=1000&sort=market_cap&cryptocurrency_type=all&tag=all      `, {
            method: 'GET',
            headers: headers,
        }).then((res) => res.json());
        return response;
    }
    catch (error) {
        return { error };
    }
});
exports.fetchCryptoListings = fetchCryptoListings;
const fetchCryptoQuote = (symbol) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${symbol}`, {
            method: 'GET',
            headers: headers,
        }).then((res) => res.json());
        return response;
    }
    catch (error) {
        return { error };
    }
});
exports.fetchCryptoQuote = fetchCryptoQuote;
const getAllTimeHighData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets';
        const params = {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 100,
            page: 1,
            sparkline: false,
        };
        // Convert numeric values to strings before creating URLSearchParams
        const queryParams = new URLSearchParams(Object.entries(params).map(([key, value]) => [key, value.toString()]));
        const response = yield fetch(`${url}?${queryParams}`);
        const data = yield response.json();
        const allTimeHighData = data.map((crypto) => ({
            symbol: crypto.symbol.toUpperCase(),
            ath: crypto.ath,
        }));
        return allTimeHighData;
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
});
exports.getAllTimeHighData = getAllTimeHighData;
