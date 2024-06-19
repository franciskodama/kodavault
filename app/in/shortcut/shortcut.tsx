import Link from 'next/link';
import Image from 'next/image';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { UpdateShortcutForm } from '@/components/UpdateShortcutForm';
import { ShortcutType } from '@/lib/types';
import { AddShortcutForm } from '@/components/AddShortcutForm';

export function Shortcut({ shortcuts }: { shortcuts: ShortcutType[] }) {
  const shortcutByCategory = shortcuts.reduce((acc: any, shortcut: any) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {});

  const shortcutCategoriesKeys = Object.keys(shortcutByCategory);

  return (
    <div>
      <AddShortcutForm shortcutCategoriesKeys={shortcutCategoriesKeys} />
      <div className='flex flex-col justify-center mt-12 w-full text-sm'>
        {shortcutCategoriesKeys.length > 0 &&
          shortcutCategoriesKeys.map((key: string) => (
            <Accordion key={key} type='single' collapsible>
              <AccordionItem value={key}>
                <AccordionTrigger className='flex items-center'>
                  <div className='flex items-center gap-6 my-4'>
                    <div className='text-2xl'>{getEmoji(key)}</div>
                    <h3 className='text-xl font-semibold capitalize'>{key}</h3>
                  </div>
                </AccordionTrigger>

                {shortcutByCategory[key].map((shortcut: ShortcutType) => (
                  <AccordionContent key={shortcut.id}>
                    <ul className='mb-[-0.8em]'>
                      <li className='flex  justify-between items-center w-full border-b rounded-[2px] border-slate-200 p-2 pl-12'>
                        <div className='flex'>
                          <Link href={shortcut.url} target='_blank'>
                            <p className='text-sm font-normal capitalize w-[18ch]'>
                              {shortcut.name}
                            </p>
                          </Link>
                          {/* <div
                          className={`${getColor(
                            key
                            )} flex items-center justify-center h-[3ch] w-[12ch] rounded-[2px] text-xs text-white text-center`}
                            > */}

                          {/* <Separator orientation='vertical' /> */}
                          <div className='flex items-center justify-center h-[4ch] w-[20ch] rounded-[2px] uppercase text-light text-xs text-center border border-dashed'>
                            {shortcut.from}
                          </div>
                          <p className='flex items-center ml-4 h-[4ch] text-xs'>
                            {shortcut.description}
                          </p>
                        </div>

                        <div className='flex items-center text-xl'>
                          <Sheet>
                            <SheetTrigger className='ml-4 hover:text-base w-12 bg-white border border-slate-300 rounded-[2px] '>
                              ✏️
                            </SheetTrigger>
                            <SheetContent>
                              <SheetHeader>
                                <SheetTitle>Update Shortcut</SheetTitle>
                                <SheetDescription>
                                  Modify the details of your existing shortcut.
                                </SheetDescription>
                              </SheetHeader>
                              <UpdateShortcutForm
                                shortcut={shortcut}
                                shortcutCategoriesKeys={shortcutCategoriesKeys}
                              />
                            </SheetContent>
                          </Sheet>
                          <AlertDialog>
                            <AlertDialogTrigger className='ml-4 hover:text-base w-12 border border-slate-300 bg-white rounded-[2px]'>
                              💀
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className='text-center text-2xl my-4'>
                                  Are you fucking sure?
                                  <br />
                                  <div className='w-[450px] mt-8 mx-auto'>
                                    <AspectRatio
                                      ratio={16 / 16}
                                      className='bg-white'
                                    >
                                      <Image
                                        src='/are-you-sure-michael.gif'
                                        alt='Michael Scoot crying'
                                        fill
                                        className='object-cover rounded-full border-[8px] border-primary'
                                        objectPosition='center 25%'
                                      />
                                    </AspectRatio>
                                  </div>
                                </AlertDialogTitle>
                                <AlertDialogDescription className='flex flex-col'>
                                  <span className='text-base text-center text-slate-600 mb-4'>
                                    You are about to delete the Shortcut below:
                                  </span>

                                  <div className='flex mb-6 py-4 px-8 justify-between border-[6px] border-primary text-base text-primary'>
                                    <div className='flex flex-col w-1/2'>
                                      <h3 className='text-xs'>Shortcut:</h3>
                                      <span className='font-bold'>
                                        {shortcut.name}
                                      </span>
                                    </div>

                                    <div className='flex flex-col w-1/2'>
                                      <h3 className='text-xs'> Description:</h3>
                                      <span className='font-bold'>
                                        {shortcut.description}
                                      </span>
                                    </div>
                                  </div>
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              {/* AFter we include the delete button, we need to check the margin bottom of the bordered square */}

                              {/* <AlertDialogFooter> */}
                              {/* <AlertDialogCancel
                                  onClick={() => {
                                    console.log('Clicked!');
                                    toast({
                                      title: 'Operation Cancelled! ❌',
                                      description: `Phew! 😮‍💨 Crisis averted. You successfully cancelled the operation.`,
                                      variant: 'destructive',
                                    });
                                  }}
                                >
                                  Cancel
                                </AlertDialogCancel> */}
                              {/* <AlertDialogAction
                                  onClick={() => {
                                    console.log('Clicked!');
                                    if (asset) {
                                      handleDeleteAsset(asset.id);
                                      toast({
                                        title: 'Asset gone! 💀',
                                        description: `The Asset ${asset.asset} has been successfully deleted from ${asset.wallet}.`,
                                        variant: 'dark',
                                      });
                                    }
                                  }}
                                >
                                  Continue
                                </AlertDialogAction> */}
                              {/* </AlertDialogFooter> */}
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </li>
                    </ul>
                  </AccordionContent>
                ))}
              </AccordionItem>
            </Accordion>
          ))}
      </div>
    </div>
  );
}

const getEmoji = (key: string) => {
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
      emoji = '🏦 ';
      break;
    default:
      break;
  }

  return emoji;
};

const getColor = (key: string) => {
  let color = '';

  switch (key) {
    case 'indicator':
      color = 'bg-blue-400';
      break;
    case 'analysis':
      color = 'bg-green-400';
      break;
    case 'miscellaneous':
      color = 'bg-red-400';
      break;
    case 'platform':
      color = 'bg-purple-400';
      break;
    case 'exchange':
      color = 'bg-orange-400';
      break;
    default:
      break;
  }

  return color;
};
