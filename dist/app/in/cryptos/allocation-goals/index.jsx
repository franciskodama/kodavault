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
const react_1 = require("react");
const uuid_1 = require("uuid");
const nextjs_1 = require("@clerk/nextjs");
const data_table_1 = require("./data-table");
const utils_1 = require("../../../../lib/utils");
const columns_1 = require("./columns");
const actions_1 = require("@/lib/actions");
const Loading_1 = require("../../../../components/Loading");
function AllocationGoals({ assets }) {
    const [cryptoGoals, setCryptoGoals] = (0, react_1.useState)([]);
    const [totalByCoin, setTotalByCoin] = (0, react_1.useState)([]);
    const { user } = (0, nextjs_1.useUser)();
    let uid = '';
    let sumGoals = 0;
    if (user) {
        uid = user.emailAddresses[0].emailAddress;
    }
    (0, react_1.useEffect)(() => {
        const fetchCryptoGoals = () => __awaiter(this, void 0, void 0, function* () {
            if (user) {
                try {
                    const fetchedGoals = yield (0, actions_1.getCryptoGoals)(user.emailAddresses[0].emailAddress);
                    if ('error' in fetchedGoals) {
                        console.error('Error fetching crypto goals:', fetchedGoals.error);
                        setCryptoGoals([]);
                    }
                    else {
                        setCryptoGoals(fetchedGoals);
                    }
                }
                catch (error) {
                    console.error('Error fetching crypto goals:', error);
                }
            }
        });
        fetchCryptoGoals();
    }, [user]);
    (0, react_1.useEffect)(() => {
        if (assets) {
            const unsortedTotalByCoin = (0, utils_1.getTotalByKey)(assets, 'crypto');
            const sortedTotalByCoin = unsortedTotalByCoin.sort((a, b) => b.total - a.total);
            setTotalByCoin(sortedTotalByCoin);
        }
    }, [assets]);
    let tableTotal = 0;
    if (totalByCoin) {
        tableTotal = totalByCoin.reduce((sum, item) => sum + item.total, 0);
    }
    const completeDataTable = ({ cryptoGoals, totalByCoin, tableTotal, uid, }) => {
        const goalsMap = new Map(cryptoGoals.map((item) => [
            item.coin,
            {
                id: item.id,
                uid: item.uid,
                coin: item.coin,
                goal: item.goal,
                priority: item.priority,
                obs: item.obs,
            },
        ]));
        const totalsMap = new Map(totalByCoin.map((item) => [item.value, item.total]));
        const mergedArray = [];
        totalByCoin.forEach(({ value, total }) => {
            const goalData = goalsMap.get(value);
            // if (goalData?.coin !== 'USDT') {
            //   return;
            // }
            mergedArray.push({
                id: goalData ? goalData.id : (0, uuid_1.v4)(),
                uid,
                coin: value,
                total: utils_1.numberFormatterNoDecimals.format(total),
                share: `${utils_1.numberFormatter.format((total / tableTotal) * 100)} %`,
                goal: goalData ? goalData.goal : 0,
                offset: (0, utils_1.thousandFormatter)(Number(goalData && tableTotal * (goalData.goal / 100) - total)),
                priority: goalData ? goalData.priority : null,
                obs: goalData ? goalData.obs : null,
            });
        });
        cryptoGoals.forEach(({ coin, goal, obs }) => {
            if (!totalsMap.has(coin)) {
                mergedArray.push({
                    id: (0, uuid_1.v4)(),
                    uid,
                    coin,
                    total: 0,
                    goal,
                    offset: 0,
                    obs: obs !== null && obs !== void 0 ? obs : '',
                    share: 0,
                });
            }
        });
        sumGoals = mergedArray.reduce((sum, item) => sum + Number(item.goal), 0);
        return mergedArray;
    };
    const dataTable = completeDataTable({
        cryptoGoals,
        totalByCoin,
        tableTotal,
        uid,
    });
    if (!sumGoals) {
        return (<div className='flex justify-center items-center w-full h-32'>
        <Loading_1.Loading />;
      </div>);
    }
    return (<>
      {sumGoals && (<div className='w-full'>
          <data_table_1.DataTable columns={columns_1.columns} data={dataTable} sumGoals={sumGoals}/>
        </div>)}
    </>);
}
exports.default = AllocationGoals;
