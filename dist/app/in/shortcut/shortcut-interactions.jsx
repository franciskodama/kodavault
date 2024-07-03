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
exports.ShortcutInteractions = void 0;
const link_1 = __importDefault(require("next/link"));
const image_1 = __importDefault(require("next/image"));
const aspect_ratio_1 = require("@/components/ui/aspect-ratio");
const accordion_1 = require("@/components/ui/accordion");
const alert_dialog_1 = require("@/components/ui/alert-dialog");
const sheet_1 = require("@/components/ui/sheet");
const use_toast_1 = require("@/components/ui/use-toast");
const UpdateShortcutForm_1 = require("@/components/UpdateShortcutForm");
const actions_1 = require("@/lib/actions");
const shortcut_1 = require("./shortcut");
function ShortcutInteractions({ shortcutByCategory, shortcutCategoriesKeys, }) {
    const handleDeleteShortcut = (id) => __awaiter(this, void 0, void 0, function* () {
        yield (0, actions_1.deleteShortcut)(id);
        window.location.reload();
    });
    return (<>
      <div className='flex flex-col justify-center mt-12 w-full text-sm'>
        {shortcutCategoriesKeys.length > 0 &&
            shortcutCategoriesKeys.map((key) => (<div key={key}>
              <accordion_1.Accordion type='single' collapsible>
                <accordion_1.AccordionItem value={key}>
                  <accordion_1.AccordionTrigger className='flex items-center'>
                    <div className='flex items-center gap-6 my-4'>
                      <div className='text-2xl'>{getEmoji(key)}</div>
                      <h3 className='text-xl font-semibold capitalize'>
                        {key}
                      </h3>
                    </div>
                  </accordion_1.AccordionTrigger>

                  {shortcutByCategory[key].map((shortcut) => (<div key={shortcut.id}>
                      <accordion_1.AccordionContent>
                        <ul className='mb-[-0.8em]'>
                          <li className='flex  justify-between items-center w-full border-b rounded-[2px] border-slate-200 p-2 pl-12'>
                            <div className='flex'>
                              <link_1.default href={shortcut.url} target='_blank'>
                                <p className='text-sm font-normal capitalize w-[18ch]'>
                                  {shortcut.name}
                                </p>
                              </link_1.default>
                              <div className={`${shortcut.color && (0, shortcut_1.getColor)(shortcut.color)} flex items-center justify-center h-[3ch] w-[12ch] rounded-[2px] text-xs text-white text-center`}>
                                {shortcut.from}
                              </div>
                              <p className='flex items-center ml-4 h-[4ch] text-xs'>
                                {shortcut.description}
                              </p>
                            </div>

                            <div className='flex items-center text-xl'>
                              <sheet_1.Sheet>
                                <sheet_1.SheetTrigger className='ml-4 hover:text-base w-12 bg-white border border-slate-300 rounded-[2px] '>
                                  ✏️
                                </sheet_1.SheetTrigger>
                                <sheet_1.SheetContent>
                                  <sheet_1.SheetHeader>
                                    <sheet_1.SheetTitle>Update Shortcut</sheet_1.SheetTitle>
                                    <sheet_1.SheetDescription>
                                      Modify the details of your existing
                                      shortcut.
                                    </sheet_1.SheetDescription>
                                  </sheet_1.SheetHeader>
                                  <UpdateShortcutForm_1.UpdateShortcutForm shortcut={shortcut}/>
                                </sheet_1.SheetContent>
                              </sheet_1.Sheet>
                              <alert_dialog_1.AlertDialog>
                                <alert_dialog_1.AlertDialogTrigger className='ml-4 hover:text-base w-12 border border-slate-300 bg-white rounded-[2px]'>
                                  💀
                                </alert_dialog_1.AlertDialogTrigger>
                                <alert_dialog_1.AlertDialogContent>
                                  <alert_dialog_1.AlertDialogHeader>
                                    <alert_dialog_1.AlertDialogTitle className='text-center text-2xl my-4'>
                                      Are you f... sure?
                                      <br />
                                      <div className='w-[450px] mt-8 mx-auto'>
                                        <aspect_ratio_1.AspectRatio ratio={16 / 16} className='bg-white'>
                                          <image_1.default src='/are-you-sure-michael.gif' alt='Michael Scoot crying' fill className='object-cover rounded-full border-[8px] border-primary' objectPosition='center 25%'/>
                                        </aspect_ratio_1.AspectRatio>
                                      </div>
                                    </alert_dialog_1.AlertDialogTitle>
                                    <alert_dialog_1.AlertDialogDescription className='flex flex-col'>
                                      <span className='text-base text-center text-slate-600 mb-4'>
                                        You are about to delete the Shortcut
                                        below:
                                      </span>

                                      <div className='flex mb-6 py-4 px-8 justify-between border-[6px] border-primary text-base text-primary'>
                                        <div className='flex flex-col w-1/2'>
                                          <h3 className='text-xs'>Shortcut:</h3>
                                          <span className='font-bold'>
                                            {shortcut.name}
                                          </span>
                                        </div>

                                        <div className='flex flex-col w-1/2'>
                                          <h3 className='text-xs'>
                                            {' '}
                                            Description:
                                          </h3>
                                          <span className='font-bold'>
                                            {shortcut.description}
                                          </span>
                                        </div>
                                      </div>
                                    </alert_dialog_1.AlertDialogDescription>
                                  </alert_dialog_1.AlertDialogHeader>

                                  <alert_dialog_1.AlertDialogFooter>
                                    {/* <ButtonsActions shortcut={shortcut} /> */}
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
                        if (shortcut) {
                            handleDeleteShortcut(shortcut.id);
                            console.log('DELETED WAS CLICKED');
                            (0, use_toast_1.toast)({
                                title: 'Shortcut gone! 💀',
                                description: `The Shortcut ${shortcut.name} has been successfully deleted!`,
                                variant: 'dark',
                            });
                        }
                    }}>
                                      Continue
                                    </alert_dialog_1.AlertDialogAction>
                                  </alert_dialog_1.AlertDialogFooter>
                                </alert_dialog_1.AlertDialogContent>
                              </alert_dialog_1.AlertDialog>
                            </div>
                          </li>
                        </ul>
                      </accordion_1.AccordionContent>
                    </div>))}
                </accordion_1.AccordionItem>
              </accordion_1.Accordion>
            </div>))}
      </div>
    </>);
}
exports.ShortcutInteractions = ShortcutInteractions;
const getEmoji = (key) => {
    let emoji = '';
    switch (key) {
        case 'indicator':
            emoji = '🧭';
            break;
        case 'analysis':
            emoji = '🔬';
            break;
        case 'miscellaneous':
            emoji = '🧶';
            break;
        case 'platform':
            emoji = '⚓';
            break;
        case 'exchange':
            emoji = '🏦';
            break;
        case 'course':
            emoji = '🧑🏻‍🎓';
            break;
        case 'knowledge':
            emoji = '🧠';
            break;
        default:
            break;
    }
    return emoji;
};
