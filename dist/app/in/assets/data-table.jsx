"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTable = void 0;
const image_1 = __importDefault(require("next/image"));
const react_1 = require("react");
const react_table_1 = require("@tanstack/react-table");
const table_1 = require("../../../components/ui/table");
const sheet_1 = require("../../../components/ui/sheet");
const aspect_ratio_1 = require("@/components/ui/aspect-ratio");
const AddAssetForm_1 = require("@/components/AddAssetForm");
const input_1 = require("@/components/ui/input");
function DataTable({ columns, data, }) {
    var _a, _b, _c, _d, _e, _f, _g;
    const [sorting, setSorting] = (0, react_1.useState)([]);
    const [columnFilters, setColumnFilters] = (0, react_1.useState)([]);
    const table = (0, react_table_1.useReactTable)({
        data,
        columns,
        getCoreRowModel: (0, react_table_1.getCoreRowModel)(),
        onSortingChange: setSorting,
        getSortedRowModel: (0, react_table_1.getSortedRowModel)(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: (0, react_table_1.getFilteredRowModel)(),
        state: {
            sorting,
            columnFilters,
        },
    });
    return (<div className='rounded-sm border border-slate-200'>
      <div className='flex items-center px-12 py-4'>
        <input_1.Input placeholder='Filter by Asset' value={(_b = (_a = table.getColumn('asset')) === null || _a === void 0 ? void 0 : _a.getFilterValue()) !== null && _b !== void 0 ? _b : ''} onChange={(event) => { var _a; return (_a = table.getColumn('asset')) === null || _a === void 0 ? void 0 : _a.setFilterValue(event.target.value); }} className='max-w-sm w-[16ch]'/>
        <input_1.Input placeholder='Filter by Wallet' value={(_d = (_c = table.getColumn('wallet')) === null || _c === void 0 ? void 0 : _c.getFilterValue()) !== null && _d !== void 0 ? _d : ''} onChange={(event) => { var _a; return (_a = table.getColumn('wallet')) === null || _a === void 0 ? void 0 : _a.setFilterValue(event.target.value); }} className='ml-4 max-w-sm w-[16ch]'/>
        <input_1.Input placeholder='Filter by Currency' value={(_f = (_e = table.getColumn('currency')) === null || _e === void 0 ? void 0 : _e.getFilterValue()) !== null && _f !== void 0 ? _f : ''} onChange={(event) => { var _a; return (_a = table.getColumn('currency')) === null || _a === void 0 ? void 0 : _a.setFilterValue(event.target.value); }} className='ml-4 max-w-sm w-[16ch]'/>
      </div>

      <table_1.Table>
        <table_1.TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (<table_1.TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (<table_1.TableHead key={header.id}>
                    {header.isPlaceholder
                        ? null
                        : (0, react_table_1.flexRender)(header.column.columnDef.header, header.getContext())}
                  </table_1.TableHead>);
            })}
            </table_1.TableRow>))}
        </table_1.TableHeader>
        <table_1.TableBody>
          {((_g = table.getRowModel().rows) === null || _g === void 0 ? void 0 : _g.length) ? (table.getRowModel().rows.map((row) => (<table_1.TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (<table_1.TableCell key={cell.id} className='text-right text-xs text-slate-600 font-light'>
                    {(0, react_table_1.flexRender)(cell.column.columnDef.cell, cell.getContext())}
                  </table_1.TableCell>))}
              </table_1.TableRow>))) : (<table_1.TableRow>
              <table_1.TableCell colSpan={columns.length} className='h-24 text-center'>
                <div className='flex items-center justify-around'>
                  <div className='w-[450px] mx-auto my-8'>
                    <aspect_ratio_1.AspectRatio ratio={16 / 9}>
                      <image_1.default src='/no-assets-poor-boy.webp' alt='John Travolta looking at around inside a wallet' className='object-cover rounded-sm border-primary' objectPosition='center 100%' fill/>
                    </aspect_ratio_1.AspectRatio>
                  </div>
                  <div className='flex flex-col w-[450px] mx-auto'>
                    <p className='text-2xl font-semibold'>
                      Spice it up by adding some assets!
                    </p>
                    <p className='text-base my-2'>{`Let's make your financial playground pop! 🚀`}</p>
                    <sheet_1.Sheet>
                      <sheet_1.SheetTrigger className='border-2 border-slate-500 h-10 px-4 rounded-[2px] font-semibold my-4 text-sm '>
                        Add Your First Asset
                      </sheet_1.SheetTrigger>
                      <sheet_1.SheetContent>
                        <sheet_1.SheetHeader>
                          <sheet_1.SheetTitle>Add a new Asset</sheet_1.SheetTitle>
                          <sheet_1.SheetDescription>
                            Add a New Asset and expand your investment
                            portfolio.
                          </sheet_1.SheetDescription>
                        </sheet_1.SheetHeader>
                        <AddAssetForm_1.AddAssetForm />
                      </sheet_1.SheetContent>
                    </sheet_1.Sheet>
                  </div>
                </div>
              </table_1.TableCell>
            </table_1.TableRow>)}
        </table_1.TableBody>
      </table_1.Table>
    </div>);
}
exports.DataTable = DataTable;
