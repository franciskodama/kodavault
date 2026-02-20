'use client';

import Link from 'next/link';
import Image from 'next/image';

import { AspectRatio } from '@/components/ui/aspect-ratio';
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

import { UpdateShortcutForm } from '@/components/forms/UpdateShortcutForm';
import { ShortcutType } from '@/lib/types';
import { deleteShortcut } from '@/lib/actions';
import { Pencil, Trash2 } from 'lucide-react';
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
    <div className='w-full mt-12 px-4 sm:px-0 pb-20'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 auto-rows-min'>
        {shortcutCategoriesKeys.length > 0 &&
          shortcutCategoriesKeys.map((key: string) => {
            const shortcutsCount = shortcutByCategory[key].length;
            // Bento logic: Categories with many shortcuts span more columns
            const colSpan =
              shortcutsCount > 4 ? 'lg:col-span-3' : 'lg:col-span-2';

            return (
              <div
                key={key}
                className={`${colSpan} flex flex-col bg-white/40 backdrop-blur-md border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 overflow-hidden group`}
              >
                {/* Card Header */}
                <div className='p-5 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between'>
                  <div className='flex items-center gap-4'>
                    <div className='text-2xl p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-500'>
                      {getEmoji(key)}
                    </div>
                    <div>
                      <h3 className='text-lg font-bold text-slate-800 capitalize leading-tight tracking-tight'>
                        {key}
                      </h3>
                      <p className='text-[10px] text-slate-400 uppercase font-semibold tracking-[0.15em]'>
                        {shortcutsCount}{' '}
                        {shortcutsCount === 1 ? 'Direct Link' : 'Direct Links'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shortcuts List */}
                <div className='flex-1 p-4 flex flex-col gap-2'>
                  {shortcutByCategory[key].map((shortcut: ShortcutType) => (
                    <div
                      key={shortcut.id}
                      className='group/item flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-slate-100 hover:bg-white/80 hover:shadow-sm transition-all duration-300'
                    >
                      <div className='flex flex-col gap-0.5 min-w-0 flex-1'>
                        <div className='flex items-center gap-2'>
                          <Link
                            href={shortcut.url}
                            target='_blank'
                            className='text-sm font-bold text-slate-700 hover:text-primary transition-colors truncate'
                          >
                            {shortcut.name}
                          </Link>
                          {shortcut.color && (
                            <div
                              className={`${getColor(
                                shortcut.color
                              )} h-2 w-2 rounded-full ring-2 ring-white shadow-sm ring-offset-1`}
                            />
                          )}
                        </div>
                        <div className='flex items-center gap-2'>
                          <span className='text-[9px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded-md font-bold uppercase tracking-wider'>
                            {shortcut.from}
                          </span>
                          <p className='text-xs text-slate-400 truncate max-w-[180px] italic font-medium'>
                            {shortcut.description}
                          </p>
                        </div>
                      </div>

                      {/* Actions - Visible on Hover for a cleaner look */}
                      <div className='flex items-center gap-1.5 opacity-0 group-hover/item:opacity-100 transition-all transform translate-x-2 group-hover/item:translate-x-0 ml-2'>
                        <Sheet>
                          <SheetTrigger asChild>
                            <button className='p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 text-slate-400 hover:text-primary shadow-sm transition-all duration-200'>
                              <Pencil size={14} />
                            </button>
                          </SheetTrigger>
                          <SheetContent className='max-h-screen overflow-y-scroll'>
                            <SheetHeader>
                              <SheetTitle>Update Shortcut</SheetTitle>
                              <SheetDescription>
                                Modify the details of your existing shortcut.
                              </SheetDescription>
                            </SheetHeader>
                            <UpdateShortcutForm shortcut={shortcut} />
                          </SheetContent>
                        </Sheet>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className='p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 text-slate-400 hover:text-red-500 shadow-sm transition-all duration-200'>
                              <Trash2 size={14} />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className='border-4 border-primary rounded-3xl'>
                            <AlertDialogHeader>
                              <AlertDialogTitle className='text-center text-3xl font-semibold text-primary my-4 tracking-tighter uppercase'>
                                Are you f... sure?
                                <br />
                                <div className='w-full max-w-[320px] mt-8 mx-auto'>
                                  <AspectRatio
                                    ratio={1 / 1}
                                    className='bg-white'
                                  >
                                    <Image
                                      src='/are-you-sure-michael.gif'
                                      alt='Michael Scott crying'
                                      fill
                                      className='object-cover rounded-full border-[10px] border-primary shadow-2xl'
                                      objectPosition='center 25%'
                                    />
                                  </AspectRatio>
                                </div>
                              </AlertDialogTitle>
                              <AlertDialogDescription className='flex flex-col text-lg text-center text-slate-600 gap-4 font-medium'>
                                You are about to delete the Shortcut below:
                                <div className='flex mb-6 py-5 px-8 justify-between border-2 border-dashed border-primary/30 bg-primary/5 rounded-2xl text-primary text-left'>
                                  <div className='flex flex-col w-1/2'>
                                    <h3 className='text-[10px] uppercase font-semibold text-slate-400 tracking-widest'>
                                      Shortcut
                                    </h3>
                                    <span className='font-semibold text-xl'>
                                      {shortcut.name}
                                    </span>
                                  </div>

                                  <div className='flex flex-col w-1/2'>
                                    <h3 className='text-[10px] uppercase font-semibold text-slate-400 tracking-widest'>
                                      Source
                                    </h3>
                                    <span className='font-bold text-lg'>
                                      {shortcut.from}
                                    </span>
                                  </div>
                                </div>
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter className='flex gap-4 sm:justify-center'>
                              <AlertDialogCancel
                                className='rounded-xl px-10 border-2 font-bold'
                                onClick={() => {
                                  toast({
                                    title: 'Operation Cancelled! ❌',
                                    description: `Phew! 😮‍💨 Crisis averted.`,
                                    variant: 'destructive',
                                  });
                                }}
                              >
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className='rounded-xl px-10 font-bold bg-primary hover:bg-primary/90'
                                onClick={() => {
                                  if (shortcut) {
                                    handleDeleteShortcut(shortcut.id);
                                    toast({
                                      title: 'Shortcut gone! 💀',
                                      description: `The Shortcut ${shortcut.name} has been deleted!`,
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
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
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
      emoji = '🔗';
      break;
  }
  return emoji;
};
