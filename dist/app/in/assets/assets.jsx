"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const Loading_1 = require("@/components/Loading");
const columns_1 = require("./columns");
const data_table_1 = require("./data-table");
const AssetsContext_1 = require("@/context/AssetsContext");
const utils_1 = require("@/lib/utils");
function Assets() {
    const { assets, isLoading } = (0, AssetsContext_1.useAssetsContext)();
    const compareByWallet = (a, b) => {
        if (a.wallet < b.wallet)
            return -1;
        if (a.wallet > b.wallet)
            return 1;
        return 0;
    };
    const sortedAssets = [...assets].sort(compareByWallet);
    const formatatedNumbersAssets = sortedAssets.map((asset) => {
        return Object.assign(Object.assign({}, asset), { qty: (0, utils_1.thousandAndDecimalFormatter)(asset.qty), price: (0, utils_1.thousandAndDecimalFormatter)(asset.price), total: (0, utils_1.thousandFormatter)(asset.total) });
    });
    return (<div className='mx-auto'>
      {isLoading ? (<div className='flex justify-center items-center h-[70em]'>
          <Loading_1.Loading />
        </div>) : (<data_table_1.DataTable columns={columns_1.columns} data={formatatedNumbersAssets}/>)}
    </div>);
}
exports.default = Assets;
