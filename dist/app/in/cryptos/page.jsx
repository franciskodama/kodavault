"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cryptos_1 = __importDefault(require("./cryptos"));
function CryptosPage() {
    return (<div className='mx-auto'>
      <cryptos_1.default />
    </div>);
}
exports.default = CryptosPage;
