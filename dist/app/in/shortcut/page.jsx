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
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("@/lib/actions");
const nextjs_1 = require("@clerk/nextjs");
const shortcut_1 = require("./shortcut");
function ShortcutPage() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, nextjs_1.currentUser)();
        const uid = user && user.emailAddresses[0].emailAddress;
        let shortcuts = [];
        if (uid) {
            const result = yield (0, actions_1.getShortcuts)(uid);
            if (Array.isArray(result)) {
                shortcuts = result;
            }
            else {
                console.error('Failed to load shortcuts:', result);
                shortcuts = [];
            }
        }
        return (<div className='flex flex-col w-full p-4'>
      <shortcut_1.Shortcut shortcuts={shortcuts}/>
    </div>);
    });
}
exports.default = ShortcutPage;
