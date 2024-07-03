"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalByKey = exports.includeNewKeyForCardTitle = exports.isNotEmptyArray = exports.numberFormatterNoDecimals = exports.numberFormatter = exports.thousandFormatter = exports.thousandAndDecimalFormatter = exports.currencyFormatter = exports.cn = void 0;
// ---------------------------------------------------------------------------
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
function cn(...inputs) {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
exports.cn = cn;
// ---------------------------------------------------------------------------
const currencyFormatter = (number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}).format(number);
exports.currencyFormatter = currencyFormatter;
const thousandAndDecimalFormatter = (number) => new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}).format(number);
exports.thousandAndDecimalFormatter = thousandAndDecimalFormatter;
const thousandFormatter = (number) => new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
}).format(number);
exports.thousandFormatter = thousandFormatter;
exports.numberFormatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
// ---------------------------------------------------------------------------
exports.numberFormatterNoDecimals = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});
const isNotEmptyArray = (value) => {
    return Array.isArray(value) && value.length > 0;
};
exports.isNotEmptyArray = isNotEmptyArray;
// ---------------------------------------------------------------------------
const includeNewKeyForCardTitle = (array, newkey) => array.map((item) => (Object.assign(Object.assign({}, item), { [newkey]: item.asset })));
exports.includeNewKeyForCardTitle = includeNewKeyForCardTitle;
const getTotalByKey = (assets, key) => {
    const groupedData = {};
    assets.reduce((acc, item) => {
        const keyValue = item[key];
        if (!groupedData[keyValue]) {
            groupedData[keyValue] = 0;
        }
        groupedData[keyValue] += parseFloat(item.total);
        return acc;
    }, []);
    return Object.keys(groupedData).map((item) => ({
        value: item,
        total: groupedData[item],
    }));
};
exports.getTotalByKey = getTotalByKey;
