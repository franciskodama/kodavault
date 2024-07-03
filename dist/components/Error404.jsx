"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("next/image"));
function Error404() {
    return (<div className='flex flex-col w-full items-center justify-center'>
      <div className='mt-12 text-2xl'>Not Found. Sifu!</div>
      <div className='my-2 text-sm'>
        Sorry, the page you were looking for could not be found.
      </div>
      <image_1.default src='/goat.gif' width={400} height={400} alt='Goat wearing glasses image' className='rounded-md object-cover'/>
    </div>);
}
exports.default = Error404;
