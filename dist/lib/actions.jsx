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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNetWorthEvolution = exports.addNetWorthEvolution = exports.deleteShortcut = exports.updateShortcut = exports.addShortcut = exports.getShortcuts = exports.updateCoinShareGoal = exports.getCryptoGoals = exports.deleteAsset = exports.updateAsset = exports.addAsset = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const cache_1 = require("next/cache");
const uuid_1 = require("uuid");
function addAsset(formData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { asset, qty, wallet, type, subtype, currency, exchange, account, uid, } = formData;
        try {
            yield prisma_1.default.asset.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    created_at: new Date(),
                    asset,
                    qty: Number(qty),
                    wallet,
                    type,
                    uid,
                    subtype,
                    currency,
                    account,
                    exchange,
                },
            });
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    });
}
exports.addAsset = addAsset;
function updateAsset(formData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, asset, qty, wallet, type, subtype, currency, exchange, account, uid, } = formData;
        try {
            yield prisma_1.default.asset.update({
                where: {
                    id,
                },
                data: {
                    id,
                    created_at: new Date(),
                    asset,
                    qty: Number(qty),
                    wallet,
                    type,
                    uid,
                    subtype,
                    currency,
                    account,
                    exchange,
                },
            });
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    });
}
exports.updateAsset = updateAsset;
function deleteAsset(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma_1.default.asset.delete({
                where: {
                    id,
                },
            });
            (0, cache_1.revalidatePath)('/in/assets');
        }
        catch (error) {
            console.log(error);
            throw new Error('🚨 Failed to delete asset');
        }
    });
}
exports.deleteAsset = deleteAsset;
const getCryptoGoals = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cryptoGoals = yield prisma_1.default.coinGoal.findMany({
            where: {
                uid,
            },
        });
        return cryptoGoals;
    }
    catch (error) {
        return { error };
    }
});
exports.getCryptoGoals = getCryptoGoals;
function updateCoinShareGoal(formData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, uid, coin, goal, priority, obs } = formData;
        try {
            const record = yield prisma_1.default.coinGoal.findUnique({
                where: {
                    id,
                },
            });
            if (record) {
                yield prisma_1.default.coinGoal.update({
                    where: {
                        id,
                    },
                    data: {
                        uid,
                        coin,
                        goal: Number(goal),
                        priority,
                        obs,
                    },
                });
            }
            else {
                yield prisma_1.default.coinGoal.create({
                    data: {
                        id: (0, uuid_1.v4)(),
                        uid,
                        created_at: new Date(),
                        coin,
                        goal: Number(goal),
                        priority,
                        obs,
                    },
                });
            }
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    });
}
exports.updateCoinShareGoal = updateCoinShareGoal;
const getShortcuts = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortcuts = yield prisma_1.default.shortcut.findMany({
            where: {
                uid,
            },
        });
        return shortcuts;
    }
    catch (error) {
        return { error };
    }
});
exports.getShortcuts = getShortcuts;
function addShortcut(formData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, uid, url, description, category, from, color } = formData;
        try {
            yield prisma_1.default.shortcut.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    created_at: new Date(),
                    name,
                    uid,
                    url,
                    description,
                    category,
                    from,
                    color,
                },
            });
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    });
}
exports.addShortcut = addShortcut;
function updateShortcut(formData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, name, uid, url, description, category, from, color } = formData;
        try {
            yield prisma_1.default.shortcut.update({
                where: {
                    id,
                },
                data: {
                    id,
                    created_at: new Date(),
                    name,
                    uid,
                    url,
                    description,
                    category,
                    from,
                    color,
                },
            });
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    });
}
exports.updateShortcut = updateShortcut;
function deleteShortcut(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma_1.default.shortcut.delete({
                where: {
                    id,
                },
            });
            (0, cache_1.revalidatePath)('/in/shortcut');
        }
        catch (error) {
            console.log(error);
            throw new Error('🚨 Failed to delete Shortcut');
        }
    });
}
exports.deleteShortcut = deleteShortcut;
function addNetWorthEvolution(chartData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { uid, usdTotal, cadTotal, brlTotal, btcTotal } = chartData;
        try {
            yield prisma_1.default.netWorthEvolution.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    created_at: new Date(),
                    uid,
                    usd_total: usdTotal,
                    cad_total: cadTotal,
                    brl_total: brlTotal,
                    btc_total: btcTotal,
                },
            });
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    });
}
exports.addNetWorthEvolution = addNetWorthEvolution;
const getNetWorthEvolution = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const netWorthEvolution = yield prisma_1.default.netWorthEvolution.findMany({
            where: {
                uid,
            },
        });
        return netWorthEvolution;
    }
    catch (error) {
        return { error };
    }
});
exports.getNetWorthEvolution = getNetWorthEvolution;
// “It's kind of fun to do the impossible.” - Walt Disney
