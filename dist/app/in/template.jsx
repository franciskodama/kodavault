"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
const framer_motion_1 = require("framer-motion");
function Template({ children }) {
    return (<framer_motion_1.motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ease: 'easeInOut', duration: 0.75 }}>
      {children}
    </framer_motion_1.motion.div>);
}
exports.default = Template;
