"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = __importDefault(require("@/app/sign-in/page"));
const image_1 = __importDefault(require("next/image"));
function Home() {
    return (<div className='flex w-full items-center justify-center my-8'>
      <div className='flex justify-center w-1/2'>
        <image_1.default src='/money-pool.gif' width={1000} height={800} alt='Logo Koda Vault' priority={true} className='rounded-md object-cover'/>
      </div>

      <div className='flex justify-center w-1/2'>
        <page_1.default />
      </div>
    </div>);
}
exports.default = Home;
