"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const navigation_1 = require("next/navigation");
const image_1 = __importDefault(require("next/image"));
const nextjs_1 = require("@clerk/nextjs");
const NavMenu_1 = __importDefault(require("./NavMenu"));
const link_1 = __importDefault(require("next/link"));
function Header() {
    const pathname = (0, navigation_1.usePathname)();
    return (<div className='flex justify-between my-4 mx-4 p-4'>
      <link_1.default href='/'>
        <image_1.default src='/logo.png' alt='Logo Koda Vault' width={100} height={100} className='h-auto w-auto'/>
      </link_1.default>
      <div className='flex items-center gap-20'>
        {pathname.includes('/in/') && (<>
            <NavMenu_1.default />
          </>)}
        <nextjs_1.UserButton afterSignOutUrl='/'/>
      </div>
    </div>);
}
exports.default = Header;
