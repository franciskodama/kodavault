"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Footer_1 = __importDefault(require("@/components/Footer"));
const Header_1 = __importDefault(require("@/components/Header"));
const toaster_1 = require("@/components/ui/toaster");
const AssetsContext_1 = require("@/context/AssetsContext");
function InLayout({ children }) {
    return (
    // <Providers>
    <AssetsContext_1.AssetsProvider>
      <Header_1.default />
      {children}
      <toaster_1.Toaster />
      <Footer_1.default />
    </AssetsContext_1.AssetsProvider>
    // </Providers>
    );
}
exports.default = InLayout;
