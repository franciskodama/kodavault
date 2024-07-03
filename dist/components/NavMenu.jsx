"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const sheet_1 = require("./ui/sheet");
const AddAssetForm_1 = require("./AddAssetForm");
const button_1 = require("./ui/button");
const AssetsContext_1 = require("@/context/AssetsContext");
function NavMenu() {
    const pathname = (0, navigation_1.usePathname)();
    const { refreshAssets } = (0, AssetsContext_1.useAssetsContext)();
    return (<>
      <hr className='my-4'/>
      <ul className='flex items-center text-sm gap-2'>
        <link_1.default href='/in/dashboard'>
          <li>
            <button_1.Button variant={pathname === '/in/dashboard' ? 'default' : 'ghost'} size='md'>
              Dashboard
            </button_1.Button>
          </li>
        </link_1.default>

        <link_1.default href='/in/cryptos'>
          <li>
            <button_1.Button variant={pathname === '/in/cryptos' ? 'default' : 'ghost'} size='md'>
              Cryptos
            </button_1.Button>
          </li>
        </link_1.default>

        <link_1.default href='/in/stocks'>
          <li>
            <button_1.Button variant={pathname === '/in/stocks' ? 'default' : 'ghost'} size='md'>
              Stocks
            </button_1.Button>
          </li>
        </link_1.default>

        <link_1.default href='/in/assets'>
          <li>
            <button_1.Button variant={pathname === '/in/assets' ? 'default' : 'ghost'} size='md'>
              Assets
            </button_1.Button>
          </li>
        </link_1.default>

        <link_1.default href='/in/shortcut'>
          <li>
            <button_1.Button variant={pathname === '/in/shortcut' ? 'default' : 'ghost'} size='md'>
              Shortcut
            </button_1.Button>
          </li>
        </link_1.default>

        <link_1.default href='/in/retirement'>
          <li>
            <button_1.Button variant={pathname === '/in/retirement' ? 'default' : 'ghost'} size='md'>
              Goal
            </button_1.Button>
          </li>
        </link_1.default>

        <li>
          <sheet_1.Sheet>
            <sheet_1.SheetTrigger className='ml-12 border-2 border-slate-500 h-8 px-4 rounded-[2px] font-medium'>
              + Asset
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
        </li>
        <li>
          <button_1.Button size='md' onClick={refreshAssets} variant={'ghost'}>
            Refresh Data
          </button_1.Button>
        </li>
      </ul>
    </>);
}
exports.default = NavMenu;
