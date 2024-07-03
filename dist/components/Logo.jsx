"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logo = void 0;
const image_1 = __importDefault(require("next/image"));
const Logo = () => {
    return (<>
      <image_1.default src='/goat.gif' width={300} height={300} alt='Mari in the middle of a buch of money' className='absolute bottom-0 right-10 rounded-md object-cover opacity-20'/>
    </>);
};
exports.Logo = Logo;
