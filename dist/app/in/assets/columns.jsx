"use strict";
'use client';
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
exports.columns = void 0;
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const sheet_1 = require("@/components/ui/sheet");
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button");
const classes_1 = require("@/lib/classes");
const actions_1 = require("@/lib/actions");
const UpdateAssetForm_1 = require("@/components/UpdateAssetForm");
const image_1 = __importDefault(require("next/image"));
const aspect_ratio_1 = require("@/components/ui/aspect-ratio");
const use_toast_1 = require("@/components/ui/use-toast");
exports.columns = [
    {
        accessorKey: 'wallet',
        header: ({ column }) => {
            return (<button_1.Button className={classes_1.tableHeaderClass} variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Wallet
          <lucide_react_1.ArrowUpDown className='ml-2 h-4 w-4'/>
        </button_1.Button>);
        },
    },
    {
        accessorKey: 'account',
        header: ({ column }) => {
            return (<button_1.Button className={classes_1.tableHeaderClass} variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Account
          <lucide_react_1.ArrowUpDown className='ml-2 h-4 w-4'/>
        </button_1.Button>);
        },
    },
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
        accessorKey: 'total',
        header: ({ column }) => {
            return (<button_1.Button className={classes_1.tableHeaderClass} variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Total
          <lucide_react_1.ArrowUpDown className='ml-2 h-4 w-4'/>
        </button_1.Button>);
        },
    },
    {
        accessorKey: 'subtype',
        header: ({ column }) => {
            return (<button_1.Button className={classes_1.tableHeaderClass} variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Subtype
          <lucide_react_1.ArrowUpDown className='ml-2 h-4 w-4'/>
        </button_1.Button>);
        },
    },
    {
        accessorKey: 'exchange',
        header: ({ column }) => {
            return (<button_1.Button className={classes_1.tableHeaderClass} variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Exchange
          <lucide_react_1.ArrowUpDown className='ml-2 h-4 w-4'/>
        </button_1.Button>);
        },
    },
    {
        accessorKey: 'currency',
        header: ({ column }) => {
            return (<button_1.Button className={classes_1.tableHeaderClass} variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Currency
          <lucide_react_1.ArrowUpDown className='ml-2 h-4 w-4'/>
        </button_1.Button>);
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const asset = row.original;
            const handleDeleteAsset = (id) => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, actions_1.deleteAsset)(id);
                window.location.reload();
            });
            return (<>
          {asset && (<div className='flex items-center text-xl'>
              <sheet_1.Sheet>
                <sheet_1.SheetTrigger className='ml-4 hover:text-base w-12 bg-white border border-slate-300 rounded-[2px] '>
                  ✏️
                </sheet_1.SheetTrigger>
                <sheet_1.SheetContent>
                  <sheet_1.SheetHeader>
                    <sheet_1.SheetTitle>Update Asset</sheet_1.SheetTitle>
                    <sheet_1.SheetDescription>
                      Modify the details of your existing asset.
                    </sheet_1.SheetDescription>
                  </sheet_1.SheetHeader>
                  <UpdateAssetForm_1.UpdateAssetForm asset={asset}/>
                </sheet_1.SheetContent>
              </sheet_1.Sheet>
              <alert_dialog_1.AlertDialog>
                <alert_dialog_1.AlertDialogTrigger className='ml-4 hover:text-base w-12 border border-slate-300 bg-white rounded-[2px]'>
                  💀
                </alert_dialog_1.AlertDialogTrigger>
                <alert_dialog_1.AlertDialogContent>
                  <alert_dialog_1.AlertDialogHeader>
                    <alert_dialog_1.AlertDialogTitle className='text-center text-2xl my-4'>
                      Are you fucking sure?
                      <br />
                      <div className='w-[450px] mt-8 mx-auto'>
                        <aspect_ratio_1.AspectRatio ratio={16 / 16} className='bg-white'>
                          <image_1.default src='/are-you-sure.gif' alt='Britney in doubt' fill className='object-cover rounded-full border-[8px] border-primary' objectPosition='center 25%'/>
                        </aspect_ratio_1.AspectRatio>
                      </div>
                    </alert_dialog_1.AlertDialogTitle>
                    <alert_dialog_1.AlertDialogDescription className='flex flex-col'>
                      <span className='text-base text-center text-slate-600 mb-4'>
                        Prepare for turbulence! 🌪️
                        <br />
                        You are about to delete the Asset below:
                      </span>

                      <div className='flex py-4 px-16 justify-between border-[6px] border-primary text-base text-primary'>
                        <div className='flex flex-col'>
                          <h3 className='text-sm'>Asset:</h3>
                          <span className='font-bold'>{asset.asset}</span>
                        </div>
                        <div className='flex flex-col'>
                          <h3 className='text-sm'> Wallet:</h3>
                          <span className='font-bold'>{asset.wallet}</span>
                        </div>
                        <div className='flex flex-col'>
                          <h3 className='text-sm'> Qty:</h3>
                          <span className='font-bold'>{asset.qty}</span>
                        </div>
                      </div>

                      <span className='text-primary text-center my-4 font-bold text-base'>
                        <span className='font-bold'>
                          This is the point of no return. <br />
                        </span>
                        {`Once done, there's no going back! 💣`}
                      </span>
                    </alert_dialog_1.AlertDialogDescription>
                  </alert_dialog_1.AlertDialogHeader>
                  <alert_dialog_1.AlertDialogFooter>
                    <alert_dialog_1.AlertDialogCancel onClick={() => {
                        (0, use_toast_1.toast)({
                            title: 'Operation Cancelled! ❌',
                            description: `Phew! 😮‍💨 Crisis averted. You successfully cancelled the operation.`,
                            variant: 'destructive',
                        });
                    }}>
                      Cancel
                    </alert_dialog_1.AlertDialogCancel>
                    <alert_dialog_1.AlertDialogAction onClick={() => {
                        if (asset) {
                            handleDeleteAsset(asset.id);
                            (0, use_toast_1.toast)({
                                title: 'Asset gone! 💀',
                                description: `The Asset ${asset.asset} has been successfully deleted from ${asset.wallet}.`,
                                variant: 'dark',
                            });
                        }
                    }}>
                      Continue
                    </alert_dialog_1.AlertDialogAction>
                  </alert_dialog_1.AlertDialogFooter>
                </alert_dialog_1.AlertDialogContent>
              </alert_dialog_1.AlertDialog>
            </div>)}
        </>);
        },
    },
];
