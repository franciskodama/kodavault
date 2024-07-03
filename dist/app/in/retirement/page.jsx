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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nextjs_1 = require("@clerk/nextjs");
const image_1 = __importDefault(require("next/image"));
function Retirement() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, nextjs_1.currentUser)();
        return (<>
      <div className='bg-[#a6cae2] flex flex-col items-center w-full text-center mx-auto mb-12 px-8'>
        {user && (<h1 className='uppercase font-extrabold w-full text-[#bd554c] text-2xl bg-white drop-shadow-[7px_7px_rgba(130,173,205,1)] py-2 px-4 my-8'>
            {`${user.firstName}, choose your Goal, work for it, and believe in it!`}{' '}
            <span className='ml-2'>🚩</span>
          </h1>)}

        <image_1.default src='/cost-retirement.png' width={1400} height={800} alt='Study of the Retirement Cost Around the World' className='rounded-md object-cover'/>
      </div>
    </>);
    });
}
exports.default = Retirement;
