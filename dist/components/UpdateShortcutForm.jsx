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
exports.UpdateShortcutForm = void 0;
const react_1 = require("react");
const nextjs_1 = require("@clerk/nextjs");
const react_hook_form_1 = require("react-hook-form");
const actions_1 = require("@/lib/actions");
const button_1 = require("./ui/button");
const sheet_1 = require("./ui/sheet");
const use_toast_1 = require("./ui/use-toast");
const shortcut_1 = require("@/app/in/shortcut/shortcut");
function UpdateShortcutForm({ shortcut }) {
    var _a, _b, _c, _d, _e;
    const [data, setData] = (0, react_1.useState)();
    const { toast } = (0, use_toast_1.useToast)();
    const { user } = (0, nextjs_1.useUser)();
    const uid = (_b = (_a = user === null || user === void 0 ? void 0 : user.emailAddresses) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.emailAddress;
    const { register, watch, handleSubmit, reset, formState: { errors }, } = (0, react_hook_form_1.useForm)({
        defaultValues: {
            uid: uid,
            id: shortcut === null || shortcut === void 0 ? void 0 : shortcut.id,
            name: shortcut === null || shortcut === void 0 ? void 0 : shortcut.name,
            url: shortcut === null || shortcut === void 0 ? void 0 : shortcut.url,
            description: shortcut === null || shortcut === void 0 ? void 0 : shortcut.description,
            category: shortcut === null || shortcut === void 0 ? void 0 : shortcut.category,
            from: shortcut === null || shortcut === void 0 ? void 0 : shortcut.from,
            color: shortcut === null || shortcut === void 0 ? void 0 : shortcut.color,
        },
    });
    const classInput = 'border border-slate-200 h-10 p-2 rounded-xs w-full mt-2';
    const classDiv = 'my-4';
    const classUl = 'flex flex-wrap gap-2';
    const classTitle = 'font-bold mb-2';
    const classError = 'text-red-500 font-bold my-2';
    const classLabelRadio = 'capitalize inline-flex items-center justify-center py-1 w-[8em] h-[2.5em] border-2 rounded-[2px] cursor-pointer text-primary border-gray-200 peer-checked:font-bold peer-checked:border-slate-500 peer-checked:text-primary peer-checked:bg-accent hover:text-slate-600 hover:bg-gray-100';
    const processForm = (data) => __awaiter(this, void 0, void 0, function* () {
        if (!uid) {
            return console.log('User not logged in 🤷🏻‍♂️');
        }
        const result = yield (0, actions_1.updateShortcut)(Object.assign(Object.assign({}, data), { uid: uid }));
        if (result) {
            toast({
                title: 'Shortcut Updated! 🎉',
                description: 'Your Shortcut is already updated.',
                variant: 'success',
            });
        }
        else {
            toast({
                title: '🚨 Uh oh! Something went wrong!',
                description: 'Your Shortcut was NOT Updated.',
                variant: 'destructive',
            });
        }
        reset();
        setData(data);
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    });
    return (<>
      <form onSubmit={handleSubmit(processForm)} className='py-8'>
        <div className='flex flex-col'>
          <div className={classDiv}>
            <label className={classTitle} htmlFor='name'>
              Title
            </label>
            <input className={classInput} placeholder='Name Shortcut' {...register('name', { required: "Name can't be empty" })}/>
            {((_c = errors.name) === null || _c === void 0 ? void 0 : _c.message) && (<p className={classError}>{errors.name.message}</p>)}
          </div>

          <div className={classDiv}>
            <label className={classTitle} htmlFor='from'>
              From
            </label>
            <input className={classInput} placeholder='From where?' {...register('from', {
        required: 'We need to know where it came from',
    })}/>
            {((_d = errors.from) === null || _d === void 0 ? void 0 : _d.message) && (<p className={classError}>{errors.from.message}</p>)}
          </div>

          <div className={classDiv}>
            <label className={classTitle} htmlFor='description'>
              Description
            </label>
            <input className={classInput} placeholder='Description' {...register('description', {
        required: "Description can't be empty",
    })}/>
            {((_e = errors.description) === null || _e === void 0 ? void 0 : _e.message) && (<p className={classError}>{errors.description.message}</p>)}
          </div>

          <div className={classDiv}>
            <h3 className={classTitle}>Category</h3>
            <ul className={classUl}>
              {shortcut_1.allCategories.map((categoriesKey) => (<li key={categoriesKey}>
                  <input className='hidden peer' type='radio' value={categoriesKey} id={categoriesKey} {...register('category')}/>
                  <label className={classLabelRadio} htmlFor={categoriesKey}>
                    <span>{categoriesKey}</span>
                  </label>
                </li>))}
            </ul>
          </div>

          <div className={classDiv}>
            <h3 className={classTitle}>Color</h3>
            <ul className={classUl}>
              {shortcut_1.allColors.map((color) => (<li key={color}>
                  <input className='hidden peer' type='radio' value={color} id={color} {...register('color')}/>
                  <div className='capitalize inline-flex items-center pl-4 py-1 w-[8em] h-[2.5em] border-2 rounded-[2px] cursor-pointer text-primary border-gray-200 peer-checked:font-bold peer-checked:border-slate-500 peer-checked:text-primary peer-checked:bg-accent hover:text-slate-600 hover:bg-gray-100'>
                    <div className={`${(0, shortcut_1.getColor)(color)} flex items-center justify-center w-4 h-4 rounded-full mr-2`}/>
                    <label htmlFor={color}>
                      <span>{color}</span>
                    </label>
                  </div>
                </li>))}
            </ul>
          </div>

          <button_1.Button className='mt-8' type='submit'>
            Update a Shortcut
          </button_1.Button>

          <sheet_1.SheetClose asChild>
            <button_1.Button className='my-4' type='submit' variant={'outline'}>
              Close
            </button_1.Button>
          </sheet_1.SheetClose>
        </div>
      </form>
    </>);
}
exports.UpdateShortcutForm = UpdateShortcutForm;
