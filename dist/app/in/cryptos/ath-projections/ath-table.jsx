"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const columns_1 = require("./columns");
const data_table_1 = require("./data-table");
function AthTable({ athAssets, }) {
    return (<div className='mx-auto'>
      {athAssets.length > 0 && <data_table_1.DataTable columns={columns_1.columns} data={athAssets}/>}
    </div>);
}
exports.default = AthTable;
