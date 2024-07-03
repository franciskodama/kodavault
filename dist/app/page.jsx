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
const Home_1 = __importDefault(require("./../components/Home"));
const navigation_1 = require("next/navigation");
const Header_1 = __importDefault(require("@/components/Header"));
const Footer_1 = __importDefault(require("@/components/Footer"));
function HomePage() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, nextjs_1.currentUser)();
        if (user) {
            (0, navigation_1.redirect)('/in/dashboard');
        }
        return (<main className='flex flex-col'>
      <Header_1.default />
      <div>{!user && <Home_1.default />}</div>
      <Footer_1.default />
    </main>);
    });
}
exports.default = HomePage;
