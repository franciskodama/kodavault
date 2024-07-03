"use strict";
'use client';
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
exports.useAssetsContext = exports.AssetsProvider = exports.AssetsContext = void 0;
const nextjs_1 = require("@clerk/nextjs");
const react_1 = require("react");
const assets_1 = require("@/lib/assets");
exports.AssetsContext = (0, react_1.createContext)(null);
function AssetsProvider({ children }) {
    var _a, _b;
    const [assets, setAssets] = (0, react_1.useState)([]);
    const [assetsByType, setAssetsByType] = (0, react_1.useState)({});
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const { user } = (0, nextjs_1.useUser)();
    const uid = (_b = (_a = user === null || user === void 0 ? void 0 : user.emailAddresses) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.emailAddress;
    const refreshAssets = () => __awaiter(this, void 0, void 0, function* () {
        try {
            if (uid) {
                const unpricedAssets = yield (0, assets_1.fetchAssets)(uid);
                const { assets: _assets, assetsByType: _assetsByType } = yield (0, assets_1.fetchAssetsWithPrices)(unpricedAssets);
                setAssets(_assets);
                setAssetsByType(_assetsByType);
                // -----------------------------------------
                console.log('data refreshed');
                // -----------------------------------------
            }
        }
        catch (error) {
            console.error('Error loading assets:', error);
        }
        finally {
            setIsLoading(false);
        }
    });
    (0, react_1.useEffect)(() => {
        if (uid) {
            setIsLoading(true);
            refreshAssets();
        }
        else {
            setAssets([]);
            setAssetsByType({});
            setIsLoading(false);
        }
    }, [uid]);
    return (<exports.AssetsContext.Provider value={{ isLoading, assets, setAssets, assetsByType, refreshAssets }}>
      <div>{children}</div>
    </exports.AssetsContext.Provider>);
}
exports.AssetsProvider = AssetsProvider;
function useAssetsContext() {
    const context = (0, react_1.useContext)(exports.AssetsContext);
    if (!context) {
        throw new Error('useAssets must be used within a AssetsProvider');
    }
    return context;
}
exports.useAssetsContext = useAssetsContext;
