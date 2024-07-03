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
exports.groupAssetsByType = exports.fetchAssetsWithPrices = exports.fetchAssets = void 0;
const assets_server_1 = require("./assets.server");
const prices_1 = require("./prices");
const utils_1 = require("./utils");
const fetchAssets = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const assetData = yield (0, assets_server_1.getAssets)(userEmail);
    if (Array.isArray(assetData)) {
        return assetData;
    }
    else {
        console.error(assetData);
        return [];
    }
});
exports.fetchAssets = fetchAssets;
const fetchAssetsWithPrices = (unpricedAssets) => __awaiter(void 0, void 0, void 0, function* () {
    const assetsGroupedByType = (0, exports.groupAssetsByType)(unpricedAssets);
    const [cryptoAssetsWithPrice, cashAssetsWithPrice, stockAssetsWithPrice] = yield Promise.all([
        assetsGroupedByType.Crypto &&
            (0, prices_1.includePriceToCryptoAssets)(assetsGroupedByType.Crypto),
        assetsGroupedByType.Cash &&
            (0, prices_1.includePriceToCashAssets)(assetsGroupedByType.Cash),
        assetsGroupedByType.Stock &&
            (0, prices_1.includePriceToStockAssets)(assetsGroupedByType.Stock),
    ]);
    const cryptoAssets = (cryptoAssetsWithPrice &&
        (0, utils_1.includeNewKeyForCardTitle)(cryptoAssetsWithPrice, 'crypto')) ||
        [];
    const stocksAssets = (stockAssetsWithPrice &&
        (0, utils_1.includeNewKeyForCardTitle)(stockAssetsWithPrice, 'stock')) ||
        [];
    const cashAssets = (cashAssetsWithPrice &&
        (0, utils_1.includeNewKeyForCardTitle)(cashAssetsWithPrice, 'cash')) ||
        [];
    const assets = [...cryptoAssets, ...stocksAssets, ...cashAssets];
    const assetsByType = {
        Crypto: cryptoAssets || [],
        Stock: stocksAssets || [],
        Cash: cashAssets || [],
    };
    const result = {
        assets,
        assetsByType,
    };
    return result;
});
exports.fetchAssetsWithPrices = fetchAssetsWithPrices;
const groupAssetsByType = (assets) => {
    return assets.reduce((groupedAssets, asset) => {
        const type = asset.type;
        if (!groupedAssets[type])
            groupedAssets[type] = [];
        groupedAssets[type].push(asset);
        return groupedAssets;
    }, {});
};
exports.groupAssetsByType = groupAssetsByType;
