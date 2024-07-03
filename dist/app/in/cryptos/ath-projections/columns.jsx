"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.columns = void 0;
const button_1 = require("../../../../components/ui/button");
const lucide_react_1 = require("lucide-react");
const classes_1 = require("../../../../lib/classes");
exports.columns = [
    {
        accessorKey: 'asset',
        header: ({ column }) => {
            return (<button_1.Button className={classes_1.tableHeaderClass} variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Asset
          <lucide_react_1.ArrowUpDown className='ml-2 h-4 w-4'/>
        </button_1.Button>);
        },
    },
    {
        accessorKey: 'qty',
        header: () => <div className={classes_1.tableHeaderClass}>Qty</div>,
    },
    {
        accessorKey: 'price',
        header: () => <div className={classes_1.tableHeaderClass}>Price</div>,
    },
    {
        accessorKey: 'currentTotal',
        header: ({ column }) => {
            return (<button_1.Button className={classes_1.tableHeaderClass} variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Total
          <lucide_react_1.ArrowUpDown className='ml-2 h-4 w-4'/>
        </button_1.Button>);
        },
    },
    {
        accessorKey: 'ath',
        header: () => <div className={classes_1.tableHeaderClass}>ATH</div>,
    },
    {
        accessorKey: 'athTotalCurrency',
        // header: () => (
        //   <div className={tableHeaderClass}>
        //     ATH Total
        //     <span className='text-xs font-medium'>{` (est.)`}</span>
        //   </div>
        // ),
        header: ({ column }) => {
            return (<button_1.Button className={classes_1.tableHeaderClass} variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <div className={classes_1.tableHeaderClass}>
            ATH Total
            <span className='text-xs font-medium'>{` (est.)`}</span>
          </div>
          <lucide_react_1.ArrowUpDown className='ml-2 h-4 w-4'/>
        </button_1.Button>);
        },
    },
    {
        accessorKey: 'percentagePotential',
        header: ({ column }) => {
            return (<button_1.Button className={classes_1.tableHeaderClass} variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Boost (%)
          <lucide_react_1.ArrowUpDown className='ml-2 h-4 w-4'/>
        </button_1.Button>);
        },
    },
    {
        accessorKey: 'xPotential',
        header: ({ column }) => {
            return (<button_1.Button className={classes_1.tableHeaderClass} variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Boost (x)
          <lucide_react_1.ArrowUpDown className='ml-2 h-4 w-4'/>
        </button_1.Button>);
        },
    },
];
