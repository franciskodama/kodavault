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
exports.FormAllocationGoal = void 0;
const input_1 = require("@/components/ui/input");
const use_toast_1 = require("@/components/ui/use-toast");
const actions_1 = require("@/lib/actions");
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const label_1 = require("@/components/ui/label");
const textarea_1 = require("@/components/ui/textarea");
const button_1 = require("@/components/ui/button");
const FormAllocationGoal = ({ assetRow, }) => {
    const [data, setData] = (0, react_1.useState)();
    const { toast } = (0, use_toast_1.useToast)();
    const form = (0, react_hook_form_1.useForm)();
    const { setValue, register, handleSubmit, reset, formState: { errors }, } = (0, react_hook_form_1.useForm)({
        defaultValues: {
            id: assetRow.id,
            uid: assetRow.uid,
            goal: assetRow.goal,
            coin: assetRow.coin,
            priority: assetRow.priority,
            obs: assetRow.obs,
        },
    });
    const processForm = (data) => __awaiter(void 0, void 0, void 0, function* () {
        if (!assetRow.uid) {
            return console.log('User not logged in');
        }
        const result = yield (0, actions_1.updateCoinShareGoal)(data);
        if (result) {
            toast({
                title: 'Goal Updated! 🎉',
                description: 'Your new goal is already set.',
                variant: 'success',
            });
        }
        else {
            toast({
                title: '👻 Boho! Error occurred!',
                description: 'Your goal was NOT updated.',
                variant: 'destructive',
            });
        }
        reset();
        setData(data);
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    });
    return (<div>
      <form onSubmit={handleSubmit(processForm)} className='flex items-center'>
        <div className='grid gap-4 py-4'>
          <h3 className='bg-slate-800 px-4 py-2 text-white text-sm'>
            Asset:
            <span className='font-semibold ml-2 text-base'>
              {assetRow.coin}
            </span>
          </h3>

          <div className='flex items-center '>
            <label_1.Label className='text-left text-xs w-1/3'>
              Percentage Allocation Goal
            </label_1.Label>
            <input_1.Input className='w-1/4 text-center' {...register('goal')}/>
            <p className='w-1/4 text-lg text-left ml-4'>%</p>
            {/* <Button
            variant='outline'
            className='w-1/4 border-slate-500'
            onClick={() => {
              setValue('goal', 0, { shouldTouch: false });
            }}
          >
            Clear
          </Button> */}
          </div>

          {/* https://ui.shadcn.com/docs/components/select */}

          <div className='flex items-center gap-4'>
            {/* <FormField
            control={form.control}
            name='priority'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-left text-xs w-1/3'>
                  Priority:
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  // defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Set Priority' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='High'>High</SelectItem>
                    <SelectItem value='Medium'>Medium</SelectItem>
                    <SelectItem value='Low'>Low</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          /> */}

            {/* <Label className='text-left text-xs w-1/3'>Priority:</Label>
          <Select>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Set Priority' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='High'>High</SelectItem>
              <SelectItem value='Medium'>Medium</SelectItem>
              <SelectItem value='Low'>Low</SelectItem>
            </SelectContent>
          </Select> */}
          </div>

          <div className='grid grid-cols-3 items-center gap-4'>
            <label_1.Label className='text-left text-xs'>Observations:</label_1.Label>
            <textarea_1.Textarea className='col-span-3' {...register('obs')}/>
          </div>

          <button_1.Button className='mt-8' type='submit'>
            Save Changes
          </button_1.Button>
        </div>
      </form>
    </div>);
};
exports.FormAllocationGoal = FormAllocationGoal;
