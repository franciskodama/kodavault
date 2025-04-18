'use client';

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
import { toast } from '@/components/ui/use-toast';

import { UpdateShortcutForm } from '@/components/UpdateShortcutForm';
import { ShortcutType } from '@/lib/types';
import { deleteShortcut } from '@/lib/actions';
import { getColor } from './shortcut';

type shortcutByCategory = {
  [key: string]: ShortcutType[];
};

export function ShortcutInteractions({
  shortcutByCategory,
  shortcutCategoriesKeys,
}: {
  shortcutByCategory: shortcutByCategory;
  shortcutCategoriesKeys: string[];
}) {
  const handleDeleteShortcut = async (id: string) => {
    await deleteShortcut(id);
    window.location.reload();
  };

  return (
    <>
      <div className='flex flex-col justify-center sm:mt-12 w-full text-sm'>
        {shortcutCategoriesKeys.length > 0 &&
          shortcutCategoriesKeys.map((key: string) => (
            <div key={key}>
              <Accordion type='single' collapsible>
                <AccordionItem value={key}>
                  <AccordionTrigger className='flex items-center'>
                    <div className='flex items-center gap-6 my-4'>
                      <div className='text-2xl'>{getEmoji(key)}</div>
                      <h3 className='text-xl font-semibold capitalize'>
                        {key}
                      </h3>
                    </div>
                  </AccordionTrigger>

                  {shortcutByCategory[key].map((shortcut: ShortcutType) => (
                    <div key={shortcut.id}>
                      <AccordionContent>
                        <ul className='mb-[-0.8em]'>
                          <li className='flex flex-col sm:flex-row justify-between items-center w-full border-b rounded-[2px] border-slate-200 p-2 pl-12'>
                            <div className='flex items-center'>
                              <Link href={shortcut.url} target='_blank'>
                                <p className='text-sm font-semibold capitalize w-[18ch]'>
                                  {shortcut.name}
                                </p>
                              </Link>
                              <div
                                className={`${
                                  shortcut.color && getColor(shortcut.color)
                                } flex items-center justify-center h-[3ch] w-[12ch] rounded-[2px] text-xs text-white text-center`}
                              >
                                {shortcut.from}
                              </div>
                              <div className='flex items-center ml-4 h-[4ch] text-xs'>
                                <p>{shortcut.description}</p>
                              </div>
                            </div>

                            <div className='flex items-center text-xl'>
                              <Sheet>
                                <SheetTrigger className='ml-4 hover:text-base w-12 bg-white border border-slate-300 rounded-[2px] '>
                                  ✏️
                                </SheetTrigger>
                                <SheetContent className='max-h-screen overflow-y-scroll'>
                                  <SheetHeader>
                                    <SheetTitle>Update Shortcut</SheetTitle>
                                    <SheetDescription>
                                      Modify the details of your existing
                                      shortcut.
                                    </SheetDescription>
                                  </SheetHeader>
                                  <UpdateShortcutForm shortcut={shortcut} />
                                </SheetContent>
                              </Sheet>
                              <AlertDialog>
                                <AlertDialogTrigger className='ml-4 hover:text-base w-12 border border-slate-300 bg-white rounded-[2px]'>
                                  💀
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className='text-center text-2xl my-4'>
                                      Are you f... sure?
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
                                    <AlertDialogDescription className='flex flex-col text-base text-center text-slate-600 gap-4'>
                                      You are about to delete the Shortcut
                                      below:
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
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>

                                  <AlertDialogFooter>
                                    {/* <ButtonsActions shortcut={shortcut} /> */}
                                    <AlertDialogCancel
                                      onClick={() => {
                                        toast({
                                          title: 'Operation Cancelled! ❌',
                                          description: `Phew! 😮‍💨 Crisis averted. You successfully cancelled the operation.`,
                                          variant: 'destructive',
                                        });
                                      }}
                                    >
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => {
                                        if (shortcut) {
                                          handleDeleteShortcut(shortcut.id);
                                          console.log('DELETED WAS CLICKED');
                                          toast({
                                            title: 'Shortcut gone! 💀',
                                            description: `The Shortcut ${shortcut.name} has been successfully deleted!`,
                                            variant: 'dark',
                                          });
                                        }
                                      }}
                                    >
                                      Continue
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </li>
                        </ul>
                      </AccordionContent>
                    </div>
                  ))}
                </AccordionItem>
              </Accordion>
            </div>
          ))}
      </div>
    </>
  );
}

const getEmoji = (key: string) => {
  let emoji = '';

  switch (key) {
    case 'Indicator':
      emoji = '🧭';
      break;
    case 'Analysis':
      emoji = '🔬';
      break;
    case 'Miscellaneous':
      emoji = '🧶';
      break;
    case 'Platform':
      emoji = '⚓';
      break;
    case 'Exchange':
      emoji = '🏦';
      break;
    case 'Course':
      emoji = '🧑🏻‍🎓';
      break;
    case 'Knowledge':
      emoji = '🧠';
      break;
    case 'Video':
      emoji = '📺';
      break;
    case 'Friend':
      emoji = '🤷🏻‍♂️';
      break;

    default:
      break;
  }

  return emoji;
};
