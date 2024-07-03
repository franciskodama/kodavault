"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nextjs_1 = require("@clerk/nextjs");
function SignInPage() {
    return (<>
      <div className='relative'>
        <nextjs_1.SignIn />
        <div className='absolute top-10 -left-2 w-10 h-[20em] bg-[#FAFAFB]'/>
      </div>
    </>);
}
exports.default = SignInPage;
