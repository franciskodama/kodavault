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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddShortcutForm = void 0;
const react_1 = require("react");
const nextjs_1 = require("@clerk/nextjs");
const react_hook_form_1 = require("react-hook-form");
const actions_1 = require("@/lib/actions");
const button_1 = require("./ui/button");
const use_toast_1 = require("./ui/use-toast");
const command_1 = require("@/components/ui/command");
const popover_1 = require("@/components/ui/popover");
const lucide_react_1 = require("lucide-react");
const utils_1 = require("@/lib/utils");
const shortcut_1 = require("@/app/in/shortcut/shortcut");
function AddShortcutForm() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const [data, setData] = (0, react_1.useState)();
    const { toast } = (0, use_toast_1.useToast)();
    const { user } = (0, nextjs_1.useUser)();
    const uid = (_b = (_a = user === null || user === void 0 ? void 0 : user.emailAddresses) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.emailAddress;
    const [openCategory, setOpenCategory] = (0, react_1.useState)(false);
    const [valueCategory, setValueCategory] = (0, react_1.useState)(null);
    const [openColor, setOpenColor] = (0, react_1.useState)(false);
    const [valueColor, setValueColor] = (0, react_1.useState)(null);
    const { register, handleSubmit, reset, setValue, formState: { errors }, } = (0, react_hook_form_1.useForm)({});
    const classLi = 'flex flex-col';
    const classInput = 'border border-slate-200 h-10 p-2 rounded-xs';
    const classError = 'text-red-500 font-bold my-2 ml-2';
    const processForm = (data) => __awaiter(this, void 0, void 0, function* () {
        if (!uid) {
            return console.log('User not logged in 🤷🏻‍♂️');
        }
        const result = yield (0, actions_1.addShortcut)(Object.assign(Object.assign({}, data), { uid: uid }));
        if (result) {
            toast({
                title: 'Shortcut added! 🎉',
                description: 'Your new shortcut is already available.',
                variant: 'success',
            });
            console.log('Success');
        }
        else {
            toast({
                title: '👻 Boho! Error occurred!',
                description: 'Your shortcut was NOT added.',
                variant: 'destructive',
            });
            console.log('Error updating shortcut');
        }
        reset();
        setData(data);
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    });
    let categories = [];
    shortcut_1.allCategories.map((category) => {
        const categoryObj = {
            value: category,
            label: category,
        };
        categories.push(categoryObj);
    });
    let colors = [];
    shortcut_1.allColors.map((color) => {
        const colorObj = {
            value: color,
            label: color,
        };
        colors.push(colorObj);
    });
    (0, react_1.useEffect)(() => {
        setValue('color', valueColor);
    }, [valueColor, setValue]);
    (0, react_1.useEffect)(() => {
        setValue('category', valueCategory);
    }, [valueCategory, setValue]);
    return (<>
      <form onSubmit={handleSubmit(processForm)}>
        <ul className='flex items-start gap-2'>
          <li className={classLi}>
            <input className={`${classInput} w-[20ch]`} placeholder='Title' {...register('name', { required: "Title can't be empty" })}/>
            {((_c = errors.name) === null || _c === void 0 ? void 0 : _c.message) && (<p className={classError}>{errors.name.message}</p>)}
          </li>

          <li className={classLi}>
            <input className={`${classInput} w-[20ch]`} placeholder='From (ex.: Coinglass)' {...register('from', { required: "From can't be empty" })}/>
            {((_d = errors.from) === null || _d === void 0 ? void 0 : _d.message) && (<p className={classError}>{errors.from.message}</p>)}
          </li>

          <li className={classLi}>
            <input className={`${classInput} w-[20ch]`} placeholder='Url' {...register('url', { required: "Url can't be empty" })}/>
            {((_e = errors.url) === null || _e === void 0 ? void 0 : _e.message) && (<p className={classError}>{errors.url.message}</p>)}
          </li>

          <li className={classLi}>
            <popover_1.Popover open={openCategory} onOpenChange={setOpenCategory}>
              <popover_1.PopoverTrigger asChild>
                <button_1.Button variant='outline' role='combobox' aria-expanded={openCategory} className='w-[125px]'>
                  {valueCategory ? (<span className='text-xs font-normal opacity-60 capitalize'>
                      {(_f = categories.find((category) => category.value === valueCategory)) === null || _f === void 0 ? void 0 : _f.label}
                    </span>) : (<span className='text-xs font-normal opacity-60'>
                      Category
                    </span>)}
                  <lucide_react_1.ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50'/>
                </button_1.Button>
              </popover_1.PopoverTrigger>
              <popover_1.PopoverContent className='w-[125px] p-0'>
                <command_1.Command>
                  <command_1.CommandList>
                    <command_1.CommandGroup>
                      {categories.map((category) => (<command_1.CommandItem key={category.value} value={category.value} onSelect={(currentValue) => {
                setValueCategory(currentValue === valueCategory ? '' : currentValue);
                setOpenCategory(false);
            }}>
                          <lucide_react_1.Check className={(0, utils_1.cn)('mr-2 h-4 w-4', valueCategory === category.value
                ? 'opacity-100'
                : 'opacity-0')}/>
                          <span className='text-xs capitalize'>
                            {category.label}
                          </span>
                        </command_1.CommandItem>))}
                    </command_1.CommandGroup>
                  </command_1.CommandList>
                </command_1.Command>
              </popover_1.PopoverContent>
            </popover_1.Popover>
          </li>

          <li className={classLi}>
            <popover_1.Popover open={openColor} onOpenChange={setOpenColor}>
              <popover_1.PopoverTrigger asChild>
                <button_1.Button variant='outline' role='combobox' aria-expanded={openColor} className='w-[125px]'>
                  <div className={`${valueColor && (0, shortcut_1.getColor)(valueColor)} flex items-center justify-center w-4 h-4 rounded-full mr-2`}/>
                  {valueColor ? (<span className='text-xs font-normal opacity-60 capitalize'>
                      {(_g = colors.find((color) => color.value === valueColor)) === null || _g === void 0 ? void 0 : _g.label}
                    </span>) : (<span className='text-xs font-normal opacity-60'>
                      Color
                    </span>)}
                  <lucide_react_1.ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50'/>
                </button_1.Button>
              </popover_1.PopoverTrigger>
              <popover_1.PopoverContent className='w-[125px] p-0'>
                <command_1.Command>
                  <command_1.CommandList>
                    <command_1.CommandGroup>
                      {colors.map((color) => (<command_1.CommandItem key={color.value} value={color.value} onSelect={(currentValue) => {
                setValueColor(currentValue === valueColor ? '' : currentValue);
                setOpenColor(false);
            }} className='flex w-full text-xs'>
                          <div className={`${(0, shortcut_1.getColor)(color.value)} flex items-center justify-center w-4 h-4 rounded-full mr-2`}>
                            <lucide_react_1.Check className={(0, utils_1.cn)('h-3 w-3 text-white', valueColor === color.value
                ? 'opacity-100'
                : 'opacity-0')}/>
                          </div>
                          {color.label}
                        </command_1.CommandItem>))}
                    </command_1.CommandGroup>
                  </command_1.CommandList>
                </command_1.Command>
              </popover_1.PopoverContent>
            </popover_1.Popover>
          </li>

          <li className={`${classLi} w-full`}>
            <input className={classInput} placeholder='Description' {...register('description', {
        required: "Description can't be empty",
    })}/>
            {((_h = errors.description) === null || _h === void 0 ? void 0 : _h.message) && (<p className={classError}>{errors.description.message}</p>)}
          </li>

          <li>
            <button_1.Button className='' type='submit' variant='darkerOutline'>
              Add Shortcut
            </button_1.Button>
          </li>
        </ul>
      </form>
    </>);
}
exports.AddShortcutForm = AddShortcutForm;
