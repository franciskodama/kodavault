"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error404_1 = __importDefault(require("@/components/Error404"));
function NotFound() {
    return (<div>
      <Error404_1.default />
    </div>);
}
exports.default = NotFound;
