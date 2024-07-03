"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AssetsContext_1 = require("@/context/AssetsContext");
const tabs_1 = require("@/components/ui/tabs");
const Loading_1 = require("@/components/Loading");
const CardNextPurchases_1 = require("@/components/CardNextPurchases");
const price_projections_1 = __importDefault(require("./price-projections"));
const allocation_goals_1 = __importDefault(require("./allocation-goals"));
const ath_projections_1 = __importDefault(require("./ath-projections"));
function Cryptos() {
    const { assetsByType, isLoading } = (0, AssetsContext_1.useAssetsContext)();
    return (<>
      {isLoading ? (<div className='flex justify-center items-center h-[70em]'>
          <Loading_1.Loading />
        </div>) : (<div className='flex w-full gap-2'>
          <tabs_1.Tabs defaultValue='allocation-goals' className='w-full'>
            <tabs_1.TabsList>
              <tabs_1.TabsTrigger value='allocation-goals'>
                Allocation Goals
              </tabs_1.TabsTrigger>
              <tabs_1.TabsTrigger value='ath'>ATH Estimation</tabs_1.TabsTrigger>
              <tabs_1.TabsTrigger value='price-projections'>
                Price Projections
              </tabs_1.TabsTrigger>
            </tabs_1.TabsList>

            <tabs_1.TabsContent value='allocation-goals' className='flex gap-2 mt-4'>
              <allocation_goals_1.default assets={assetsByType.Crypto}/>
              <CardNextPurchases_1.CardNextPurchases />
            </tabs_1.TabsContent>

            <tabs_1.TabsContent value='ath' className='mt-4'>
              <ath_projections_1.default assets={assetsByType.Crypto}/>
            </tabs_1.TabsContent>

            <tabs_1.TabsContent value='price-projections' className='mt-4'>
              <price_projections_1.default assets={assetsByType.Crypto}/>
            </tabs_1.TabsContent>
          </tabs_1.Tabs>
        </div>)}
    </>);
}
exports.default = Cryptos;
