"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const AssetsContext_1 = require("@/context/AssetsContext");
function Providers({ children }) {
    return (<>
      <AssetsContext_1.AssetsProvider>{children}</AssetsContext_1.AssetsProvider>
    </>);
}
exports.default = Providers;
