"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColor = exports.allColors = exports.allCategories = exports.Shortcut = void 0;
const AddShortcutForm_1 = require("@/components/AddShortcutForm");
const shortcut_interactions_1 = require("./shortcut-interactions");
function Shortcut({ shortcuts }) {
    const shortcutByCategory = shortcuts.reduce((acc, shortcut) => {
        if (!acc[shortcut.category]) {
            acc[shortcut.category] = [];
        }
        acc[shortcut.category].push(shortcut);
        return acc;
    }, {});
    const shortcutCategoriesKeys = Object.keys(shortcutByCategory);
    return (<>
      <AddShortcutForm_1.AddShortcutForm />
      <shortcut_interactions_1.ShortcutInteractions shortcutByCategory={shortcutByCategory} shortcutCategoriesKeys={shortcutCategoriesKeys}/>
    </>);
}
exports.Shortcut = Shortcut;
exports.allCategories = [
    'exchange',
    'knowledge',
    'course',
    'analysis',
    'indicator',
    'miscellaneous',
    'platform',
];
exports.allColors = [
    'blue',
    'green',
    'red',
    'orange',
    'pink',
    'black',
    'gray',
];
const getColor = (key) => {
    let color = '';
    switch (key) {
        case 'blue':
            color = 'bg-blue-400';
            break;
        case 'red':
            color = 'bg-red-400';
            break;
        case 'green':
            color = 'bg-green-400';
            break;
        case 'orange':
            color = 'bg-orange-400';
            break;
        case 'black':
            color = 'bg-gray-900';
            break;
        case 'gray':
            color = 'bg-slate-300';
            break;
        case 'pink':
            color = 'bg-pink-400';
            break;
        default:
            break;
    }
    return color;
};
exports.getColor = getColor;
