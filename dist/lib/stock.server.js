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
exports.fetchStockPricesFromSheets = void 0;
const fetchStockPricesFromSheets = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tsv = yield fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vTNPEr-A9HW3VBIRr5xPBp7g00TtKXv7iwbBeO_m1eEWiYvK9t6b5JM4-styVPbaBClUbL3r2_FNl88/pub?output=tsv`, {
            method: 'GET',
            headers: {
                'Accept-Encoding': 'deflate',
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
                Expires: '0',
            },
        }).then((res) => res.text());
        const data = tsv
            .split('\n')
            .slice(1)
            .map((row) => {
            const commasRow = row.replace(/\s+/g, ',');
            const [symbol, price, currency] = commasRow.split(',');
            return {
                symbol,
                regularMarketPrice: Number(price),
                currency: currency.slice(0, 3),
            };
        });
        return { body: data };
    }
    catch (error) {
        return { error };
    }
});
exports.fetchStockPricesFromSheets = fetchStockPricesFromSheets;
// ============ FMP API ========================================================================
// https://site.financialmodelingprep.com/developer/docs/batch-quote-quote
// https://rapidapi.com/my-saved-apis
// const apiKeyNew = process.env.NEXT_PUBLIC_FMP_KEY;
// if (!apiKeyNew) {
//   throw new Error('API key is not defined');
// }
// export const fetchStockPricesNew = async (symbols: string) => {
//   try {
//     const response = await fetch(
//       `https://financialmodelingprep.com/api/v3/profile/${symbols}?apikey=${apiKeyNew}`,
//       {
//         method: 'GET',
//       }
//     ).then((res) => res.json());
//     return response;
//   } catch (error) {
//     return { error };
//   }
// };
// export const fetchStockPricesCad = async (symbols: string) => {
//   try {
//     const response = await fetch(
//       `https://financialmodelingprep.com/api/v3/quotes/TSX?apikey=${apiKeyNew}`,
//       {
//         method: 'GET',
//       }
//     ).then((res) => res.json());
//     return response;
//   } catch (error) {
//     return { error };
//   }
// };
// ============ YAHOO ========================================================================
// const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
// if (!apiKey) {
//   throw new Error('API key is not defined');
// }
// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': apiKey,
//     'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com',
//   },
// };
// export const fetchUSStockPrices = async (symbols: string) => {
//   try {
//     const response = await fetch(
//       `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/quote?ticker=${symbols}&type=STOCKS`,
//       options
//     );
//     const result = await response.text();
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// };
// ============ HARDCODED ============================================================
// export const fetchHardcodedStockPrices = async (symbols: string) => {
//   return resultHardcoded;
// };
// const resultHardcoded: any = {
//   body: [
//     { symbol: 'PYPL34.SA', regularMarketPrice: 17.96, currency: 'BRL' },
//     { symbol: 'CSU.TO', regularMarketPrice: 3841.98, currency: 'CAD' },
//     { symbol: 'EU.V', regularMarketPrice: 5.66, currency: 'CAD' },
//     { symbol: 'ATD.TO', regularMarketPrice: 80.14, currency: 'CAD' },
//     { symbol: 'VFV.TO', regularMarketPrice: 130, currency: 'CAD' },
//     { symbol: 'TSND.TO', regularMarketPrice: 2.0, currency: 'CAD' },
//     { symbol: 'T.TO', regularMarketPrice: 22.76, currency: 'CAD' },
//     { symbol: 'DOL.TO', regularMarketPrice: 127.12, currency: 'CAD' },
//     { symbol: 'ATZ.TO', regularMarketPrice: 36.4, currency: 'CAD' },
//     { symbol: 'IVVB11.SA', regularMarketPrice: 317.03, currency: 'BRL' },
//     { symbol: 'GLXY.TO', regularMarketPrice: 16.25, currency: 'CAD' },
//     { symbol: 'HOOD', regularMarketPrice: 22.18, currency: 'USD' },
//     { symbol: 'KLBN11.SA', regularMarketPrice: 20, currency: 'BRL' },
//     { symbol: 'VALE3.SA', regularMarketPrice: 60.41, currency: 'BRL' },
//     { symbol: 'WEED.TO', regularMarketPrice: 9.63, currency: 'CAD' },
//     { symbol: 'PETR4.SA', regularMarketPrice: 36.94, currency: 'BRL' },
//   ],
// };
