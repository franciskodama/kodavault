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
exports.AddAssetForm = void 0;
const react_1 = require("react");
const nextjs_1 = require("@clerk/nextjs");
const react_hook_form_1 = require("react-hook-form");
const actions_1 = require("@/lib/actions");
const button_1 = require("./ui/button");
const sheet_1 = require("./ui/sheet");
const use_toast_1 = require("./ui/use-toast");
const assets_form_1 = require("@/lib/assets-form");
function AddAssetForm() {
    var _a, _b, _c, _d;
    const [data, setData] = (0, react_1.useState)();
    const { toast } = (0, use_toast_1.useToast)();
    const { user } = (0, nextjs_1.useUser)();
    const uid = (_b = (_a = user === null || user === void 0 ? void 0 : user.emailAddresses) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.emailAddress;
    const { register, watch, handleSubmit, reset, setValue, formState: { errors }, } = (0, react_hook_form_1.useForm)({});
    const assetSubtype = watch('subtype');
    const assetType = (0, assets_form_1.getType)(assetSubtype);
    const assetSymbol = (0, assets_form_1.getSymbol)(assetSubtype);
    const assetWallet = (0, assets_form_1.getWallet)(assetSubtype);
    const assetCurrency = (0, assets_form_1.getCurrency)(assetSubtype);
    const assetAccount = (0, assets_form_1.getAccount)(assetSubtype);
    const assetExchange = (0, assets_form_1.getExchange)(assetSubtype);
    const classInput = 'border border-slate-200 h-10 p-2 rounded-xs w-full mt-2';
    const classDiv = 'my-4';
    const classUl = 'flex flex-wrap gap-2';
    const classTitle = 'font-bold mb-2';
    const classError = 'text-red-500 font-bold my-2';
    const classLabelRadio = 'inline-flex items-center justify-center py-1 w-[8em] h-[2.5em] border-2 rounded-[2px] cursor-pointer text-primary border-gray-200 peer-checked:font-bold peer-checked:border-slate-500 peer-checked:text-primary peer-checked:bg-accent hover:text-slate-600 hover:bg-gray-100';
    (0, react_1.useEffect)(() => {
        setValue('type', assetType ? assetType : '');
    }, [assetType, setValue]);
    (0, react_1.useEffect)(() => {
        if (assetSymbol) {
            if (['BTC', 'ETH', 'USDT', 'CAD', 'BRL'].includes(assetSymbol)) {
                setValue('asset', assetSymbol);
            }
        }
    }, [assetSymbol, setValue]);
    (0, react_1.useEffect)(() => {
        if (assetCurrency.length === 1) {
            setValue('currency', assetCurrency[0]);
        }
    }, [assetCurrency, setValue]);
    (0, react_1.useEffect)(() => {
        if (assetAccount.length === 1) {
            setValue('account', assetAccount[0]);
        }
    }, [assetAccount, setValue]);
    (0, react_1.useEffect)(() => {
        if (assetExchange.length === 1) {
            setValue('exchange', assetExchange[0]);
        }
    }, [assetExchange, setValue]);
    const processForm = (data) => __awaiter(this, void 0, void 0, function* () {
        if (!uid) {
            return console.log('User not logged in');
        }
        const result = yield (0, actions_1.addAsset)(Object.assign(Object.assign({}, data), { uid: uid, type: assetType ? assetType : '' }));
        if (result) {
            toast({
                title: 'Asset added! 🎉',
                description: 'Your new asset is already available.',
                variant: 'success',
            });
        }
        else {
            toast({
                title: '👻 Boho! Error occurred!',
                description: 'Your asset was NOT added.',
                variant: 'destructive',
            });
        }
        reset();
        setData(data);
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    });
    return (<>
      <form onSubmit={handleSubmit(processForm)} className='py-8'>
        <div className={classDiv}>
          <h3 className={classTitle}>Type</h3>
          <ul className={classUl}>
            {assets_form_1.subtypeOptions.map((subtypeOption) => (<li key={subtypeOption}>
                <input className='hidden peer' type='radio' value={subtypeOption} id={subtypeOption} {...register('subtype')}/>
                <label className={classLabelRadio} htmlFor={subtypeOption}>
                  <span>{subtypeOption}</span>
                </label>
              </li>))}
          </ul>
        </div>
        <div className='flex flex-col'>
          {assetSymbol && assets_form_1.fixedSymbolsArr.includes(assetSymbol) ? null : (<div className={classDiv}>
              <label className={classTitle} htmlFor='asset'>
                Asset
              </label>
              <input className={classInput} placeholder='Asset Symbol' {...register('asset', { required: "Asset can't be empty" })}/>
              {((_c = errors.asset) === null || _c === void 0 ? void 0 : _c.message) && (<p className={classError}>{errors.asset.message}</p>)}
            </div>)}

          <div className={classDiv}>
            <label className={classTitle} htmlFor='qty'>
              Quantity
            </label>
            <input className={classInput} placeholder='Quantity' {...register('qty', { required: "Quantity can't be empty" })}/>
            {((_d = errors.qty) === null || _d === void 0 ? void 0 : _d.message) && (<p className={classError}>{errors.qty.message}</p>)}
          </div>

          <div className={classDiv}>
            <h3 className={classTitle}>Wallet</h3>
            <ul className={classUl}>
              {assetWallet.map((walletOption) => (<li key={walletOption}>
                  <input className='hidden peer' type='radio' value={walletOption} id={walletOption} {...register('wallet')}/>
                  <label className={classLabelRadio} htmlFor={walletOption}>
                    <span>{walletOption}</span>
                  </label>
                </li>))}
            </ul>
          </div>

          {assetCurrency.length > 1 && (<div className={classDiv}>
              <h3 className={classTitle}>Currency</h3>
              <ul className={classUl}>
                {assetCurrency.map((currencyOption) => (<li key={currencyOption}>
                    <input className='hidden peer' type='radio' value={currencyOption} id={currencyOption} {...register('currency')}/>
                    <label className={classLabelRadio} htmlFor={currencyOption}>
                      <span>{currencyOption}</span>
                    </label>
                  </li>))}
              </ul>
            </div>)}

          {assetAccount.length > 1 && (<div className={classDiv}>
              <h3 className={classTitle}>Account</h3>
              <ul className={classUl}>
                {assetAccount.map((accountOption) => (<li key={accountOption}>
                    <input className='hidden peer' type='radio' value={accountOption} id={accountOption} {...register('account')}/>
                    <label className={classLabelRadio} htmlFor={accountOption}>
                      <span>{accountOption}</span>
                    </label>
                  </li>))}
              </ul>
            </div>)}
          {assetExchange.length > 1 && (<div className={classDiv}>
              <h3 className={classTitle}>Exchange</h3>
              <ul className={classUl}>
                {assetExchange.map((exchangeOption) => (<li key={exchangeOption}>
                    <input className='hidden peer' type='radio' value={exchangeOption} id={exchangeOption} {...register('exchange')}/>
                    <label className={classLabelRadio} htmlFor={exchangeOption}>
                      <span>{exchangeOption}</span>
                    </label>
                  </li>))}
              </ul>
            </div>)}

          <button_1.Button className='mt-8' type='submit'>
            Add Asset
          </button_1.Button>

          <sheet_1.SheetClose asChild>
            <button_1.Button className='my-4' type='submit' variant='outline'>
              Close
            </button_1.Button>
          </sheet_1.SheetClose>
        </div>
      </form>
    </>);
}
exports.AddAssetForm = AddAssetForm;
