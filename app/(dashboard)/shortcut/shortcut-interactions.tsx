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
import {
  Pencil,
  Trash2,
  Compass,
  Microscope,
  Layers,
  Anchor,
  Building2,
  GraduationCap,
  Brain,
  PlayCircle,
  Users,
  Link2,
} from 'lucide-react';
import { getColor, categoryDisplayMap } from './shortcut';

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
            const colSpan =
              shortcutsCount > 4 ? 'lg:col-span-3' : 'lg:col-span-2';
            const CategoryIcon = getIcon(key);

            return (
              <div
                key={key}
                className={`${colSpan} flex flex-col bg-white/40 backdrop-blur-md border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 overflow-hidden group`}
              >
                <div className='p-5 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between'>
                  <div className='flex items-center gap-8'>
                    <div className='group-hover:scale-110 transition-transform duration-500 text-slate-400'>
                      <CategoryIcon size={28} strokeWidth={1.2} />
                    </div>
                    <div>
                      <h3 className='text-lg font-bold text-slate-900 leading-tight tracking-tight'>
                        {categoryDisplayMap[key] || key}
                      </h3>
                      <p className='text-xs text-slate-400 uppercase font-bold tracking-[0.1em] mt-0.5'>
                        {shortcutsCount}{' '}
                        {shortcutsCount === 1 ? 'Direct Link' : 'Direct Links'}
                      </p>
                    </div>
                  </div>
                </div>

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
                            className='text-sm font-bold text-slate-800 hover:text-primary transition-colors truncate'
                          >
                            {shortcut.name}
                          </Link>
                          {shortcut.color && (
                            <div
                              className={`${getColor(
                                shortcut.color
                              )} h-3 w-3 rounded-full ring-2 ring-white shadow-sm ring-offset-2`}
                            />
                          )}
                        </div>
                        <div className='flex items-center gap-2'>
                          <span className='text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md font-bold uppercase tracking-wider'>
                            {shortcut.from}
                          </span>
                          <p className='text-sm text-slate-400 truncate max-w-[200px] italic font-medium'>
                            {shortcut.description}
                          </p>
                        </div>
                      </div>

                      <div className='flex items-center gap-1.5 opacity-0 group-hover/item:opacity-100 transition-all transform translate-x-2 group-hover/item:translate-x-0 ml-2'>
                        <Sheet>
                          <SheetTrigger asChild>
                            <button className='p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 text-slate-400 hover:text-primary shadow-sm transition-all duration-200'>
                              <Pencil size={14} />
                            </button>
                          </SheetTrigger>
                          <SheetContent className='max-h-screen overflow-y-auto'>
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
                          <AlertDialogContent className='rounded-2xl border border-slate-100 shadow-2xl max-w-[400px] p-8'>
                            <AlertDialogHeader>
                              <div className='flex flex-col items-center justify-center mb-6'>
                                <p className='text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 leading-none mb-3'>
                                  Action Required
                                </p>
                                <AlertDialogTitle className='text-xl font-bold text-slate-900 tracking-tight leading-none'>
                                  Delete Shortcut?
                                </AlertDialogTitle>
                                <div className='w-8 h-1 bg-[#22C55E] rounded-full mt-4' />
                              </div>

                              <div className='w-48 h-48 mx-auto mb-6'>
                                <AspectRatio ratio={1 / 1}>
                                  <Image
                                    src='/are-you-sure-michael.gif'
                                    alt='Michael Scott'
                                    fill
                                    className='object-cover rounded-full border-2 border-slate-100 shadow-sm'
                                  />
                                </AspectRatio>
                              </div>

                              <AlertDialogDescription className='text-sm text-center text-slate-500 font-medium mb-6 py-6'>
                                You are about to permanently remove
                                <br />
                                this shortcut from your collection.
                              </AlertDialogDescription>

                              <div className='flex flex-col gap-3 p-4 bg-slate-50/50 border border-slate-100 rounded-xl'>
                                <div className='flex flex-col'>
                                  <h3 className='text-[9px] uppercase font-bold text-slate-400 tracking-widest leading-none mb-2'>
                                    Shortcut Name
                                  </h3>
                                  <span className='font-bold text-slate-700 text-sm'>
                                    {shortcut.name}
                                  </span>
                                </div>
                                <div className='flex flex-col'>
                                  <h3 className='text-[9px] uppercase font-bold text-slate-400 tracking-widest leading-none mb-2'>
                                    Source
                                  </h3>
                                  <span className='font-semibold text-slate-500 text-xs'>
                                    {shortcut.from}
                                  </span>
                                </div>
                              </div>
                            </AlertDialogHeader>

                            <AlertDialogFooter className='flex gap-3 sm:justify-center mt-6'>
                              <AlertDialogCancel
                                className='rounded-lg flex-1 border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-all'
                                onClick={() => {
                                  toast({
                                    title: 'Operation Cancelled!',
                                    description: `Phew! Crisis averted.`,
                                  });
                                }}
                              >
                                Keep it
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className='rounded-lg flex-1 font-bold bg-red-500 hover:bg-red-600 transition-all shadow-md shadow-red-100'
                                onClick={() => {
                                  if (shortcut) {
                                    handleDeleteShortcut(shortcut.id);
                                    toast({
                                      title: 'Shortcut removed',
                                      description: `The shortcut has been deleted.`,
                                    });
                                  }
                                }}
                              >
                                Delete
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

const getIcon = (key: string) => {
  switch (key) {
    case 'Indicator':
      return Compass;
    case 'Analysis':
      return Microscope;
    case 'Miscellaneous':
      return Layers;
    case 'Platform':
      return Anchor;
    case 'Exchange':
      return Building2;
    case 'Course':
      return GraduationCap;
    case 'Knowledge':
      return Brain;
    case 'Video':
      return PlayCircle;
    case 'Friend':
      return Users;
    default:
      return Link2;
  }
};
