"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("next/image"));
const aspect_ratio_1 = require("./ui/aspect-ratio");
const sheet_1 = require("./ui/sheet");
const AddAssetForm_1 = require("./AddAssetForm");
function NoAssets() {
    return (<div className='flex flex-col w-full items-center justify-center mt-12 mb-24'>
      <div className='flex flex-col items-center mt-4'>
        <h2 className='text-2xl font-semibold'>Whoa there! 🕵️‍♂️</h2>
        <p className='text-lg'>Your dashboard is feeling a bit empty.</p>
      </div>

      <div className='w-[450px] mx-auto my-8'>
        <aspect_ratio_1.AspectRatio ratio={16 / 14}>
          <image_1.default src='/no-assets-travolta.gif' alt='John Travolta looking at around inside a wallet' className='object-cover rounded-sm border-primary' objectPosition='center 100%' fill/>
        </aspect_ratio_1.AspectRatio>
      </div>
      <p className='text-2xl font-semibold'>
        Spice it up by adding some assets!
      </p>
      <p className='text-base my-2'>{`Let's make your financial playground pop! 🚀`}</p>

      <sheet_1.Sheet>
        <sheet_1.SheetTrigger className='border-2 border-slate-500 h-10 px-4 rounded-[2px] font-semibold my-4 text-sm '>
          Add Your First Asset
        </sheet_1.SheetTrigger>
        <sheet_1.SheetContent>
          <sheet_1.SheetHeader>
            <sheet_1.SheetTitle>Add a new Asset</sheet_1.SheetTitle>
            <sheet_1.SheetDescription>
              Add a New Asset and expand your investment portfolio.
            </sheet_1.SheetDescription>
          </sheet_1.SheetHeader>
          <AddAssetForm_1.AddAssetForm />
        </sheet_1.SheetContent>
      </sheet_1.Sheet>
    </div>);
}
exports.default = NoAssets;
