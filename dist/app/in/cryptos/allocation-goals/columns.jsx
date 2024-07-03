"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.columns = void 0;
const dialog_1 = require("@/components/ui/dialog");
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button");
const classes_1 = require("@/lib/classes");
const form_allocation_goal_1 = require("./form-allocation-goal");
exports.columns = [
    {
        accessorKey: 'coin',
        header: ({ column }) => {
            return (<button_1.Button className={classes_1.tableHeaderClass} variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Coin
          <lucide_react_1.ArrowUpDown className='ml-2 h-4 w-4'/>
        </button_1.Button>);
        },
    },
    {
        accessorKey: 'total',
        header: ({ column }) => {
            return (<button_1.Button className={classes_1.tableHeaderClass} variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Total
          <lucide_react_1.ArrowUpDown className='ml-2 h-4 w-4'/>
        </button_1.Button>);
        },
    },
    {
        accessorKey: 'share',
        header: ({ column }) => {
            return (<button_1.Button className={classes_1.tableHeaderClass} variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Share
          <lucide_react_1.ArrowUpDown className='ml-2 h-4 w-4'/>
        </button_1.Button>);
        },
    },
    {
        accessorKey: 'goal',
        header: ({ column }) => {
            return (<button_1.Button className={classes_1.tableHeaderClass} variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Goal
          <lucide_react_1.ArrowUpDown className='ml-2 h-4 w-4'/>
        </button_1.Button>);
        },
        id: 'actionGoal',
        cell: ({ row }) => {
            const assetRow = row.original;
            return (<>
          {assetRow && (<div className='flex items-center'>
              <p className='text-center w-[6ch]'>{`${assetRow.goal} %`}</p>
              <p className={`flex items-center justify-center uppercase font-bold h-6 w-[5ch] px-1 m-1 text-center rounded-[2px] ${assetRow.goal === 0
                        ? 'border border-slate-300 bg-slate-300 text-white'
                        : Number(assetRow.share.toString().split('.')[0]) <
                            (assetRow.goal || 0)
                            ? 'bg-white border-2 border-green-500 text-green-500'
                            : 'bg-red-500 text-white'}`}>
                {assetRow.goal === 0
                        ? 'N/A'
                        : Number(assetRow.share.toString().split('.')[0]) <
                            (assetRow.goal || 0)
                            ? 'buy'
                            : 'sell'}
              </p>
            </div>)}
        </>);
        },
    },
    {
        accessorKey: 'offset',
        header: ({ column }) => {
            return (<button_1.Button className={classes_1.tableHeaderClass} variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Offset
          <lucide_react_1.ArrowUpDown className='ml-2 h-4 w-4'/>
        </button_1.Button>);
        },
    },
    {
        accessorKey: 'priority',
        header: ({ column }) => {
            return (<button_1.Button className={classes_1.tableHeaderClass} variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Priority
          <lucide_react_1.ArrowUpDown className='ml-2 h-4 w-4'/>
        </button_1.Button>);
        },
        id: 'actionPriority',
        cell: ({ row }) => {
            const assetRow = row.original;
            return (<>
          {assetRow && (<div className='flex items-center'>
              <div className={`font-bold flex items-center justify-center uppercase text-white h-6 w-[8ch] px-1 m-1 text-center rounded-[2px] 
                ${assetRow.priority === null
                        ? 'border border-slate-300 bg-white'
                        : assetRow.priority === 'High'
                            ? 'bg-red-500'
                            : assetRow.priority === 'Medium'
                                ? 'bg-yellow-500'
                                : assetRow.priority === 'Low'
                                    ? 'bg-slate-300'
                                    : ''}`}>
                <p className={`${assetRow.priority === null && 'text-slate-300 font-normal'}`}>
                  {assetRow.priority === null ? '-' : assetRow.priority}
                </p>
              </div>
            </div>)}
        </>);
        },
    },
    {
        accessorKey: 'obs',
        header: () => (<div className={`px-0 font-semibold text-slate-800 text-left w-[20em]`}>
        Obs
      </div>),
        id: 'actionObs',
        cell: ({ row }) => {
            const assetRow = row.original;
            return (<div className='flex items-center'>
          {assetRow && <p className='w-full text-left'>{assetRow.obs}</p>}
          <dialog_1.Dialog>
            <dialog_1.DialogTrigger asChild>
              <button_1.Button variant='outline' size='sm' className='ml-4'>
                ✏️
              </button_1.Button>
            </dialog_1.DialogTrigger>
            <dialog_1.DialogContent className='sm:max-w-[425px]'>
              <dialog_1.DialogHeader>
                <dialog_1.DialogTitle>Edit Asset Allocation</dialog_1.DialogTitle>
                <dialog_1.DialogDescription>
                  Adjust your target asset allocation to match your investment
                  goals!
                </dialog_1.DialogDescription>
              </dialog_1.DialogHeader>
              <form_allocation_goal_1.FormAllocationGoal assetRow={assetRow}/>
            </dialog_1.DialogContent>
          </dialog_1.Dialog>
        </div>);
        },
    },
];
