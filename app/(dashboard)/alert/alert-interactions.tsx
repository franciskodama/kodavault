'use client';

import { useState } from 'react';

import Image from 'next/image';
import { cn, currencyFormatter } from '@/lib/utils';

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
import { AlertType } from '@/lib/types';
import { deleteAlert } from '@/lib/actions/alert';
import {
  CircleOff,
  Mail,
  MailCheck,
  MessageCircle,
  Pencil,
  Slash,
  Trash2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { UpdateAlertForm } from '@/components/forms/UpdateAlertForm';

export function AlertInteractions({ alerts }: { alerts: AlertType[] }) {
  const [filter, setFilter] = useState<'All' | 'Crypto' | 'Stock'>('All');

  const handleDeleteAlert = async (id: string) => {
    await deleteAlert(id);
    window.location.reload();
  };

  const filteredAlerts = alerts.filter(
    (alert) => filter === 'All' || alert.type === filter
  );

  return (
    <div>
      <div className='flex flex-col sm:flex-row items-center justify-start gap-6 mb-6'>
        <div className='flex p-1 bg-slate-100/50 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm'>
          <Button
            variant={filter === 'All' ? 'default' : 'ghost'}
            size='sm'
            className={cn(
              'text-[10px] h-8 px-4 font-bold tracking-wider transition-all duration-300 rounded-lg',
              filter === 'All'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-500 hover:text-slate-900'
            )}
            onClick={() => setFilter('All')}
          >
            ALL
          </Button>
          <Button
            variant={filter === 'Stock' ? 'default' : 'ghost'}
            size='sm'
            className={cn(
              'text-[10px] h-8 px-4 font-bold tracking-wider transition-all duration-300 rounded-lg',
              filter === 'Stock'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-500 hover:text-slate-900'
            )}
            onClick={() => setFilter('Stock')}
          >
            STOCKS
          </Button>
          <Button
            variant={filter === 'Crypto' ? 'default' : 'ghost'}
            size='sm'
            className={cn(
              'text-[10px] h-8 px-4 font-bold tracking-wider transition-all duration-300 rounded-lg',
              filter === 'Crypto'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-500 hover:text-slate-900'
            )}
            onClick={() => setFilter('Crypto')}
          >
            CRYPTO
          </Button>
        </div>
      </div>

      <div className='flex flex-col gap-4 pb-10 order-1 lg:order-2'>
        {filteredAlerts.length === 0 ? (
          <Card className='flex flex-col items-center justify-center py-20'>
            <p className='text-slate-400 font-medium italic'>
              No alerts found for the selected filter.
            </p>
          </Card>
        ) : (
          <Card className='overflow-hidden'>
            <CardContent className='p-0 overflow-x-auto'>
              <div className='min-w-[600px]'>
                <div className='grid grid-cols-[1fr_1fr_1fr_1fr_3fr_150px] bg-slate-50/80 border-b text-[10px] uppercase font-bold text-slate-400 tracking-wider'>
                  <div className='px-6 py-3'>When this Asset</div>
                  <div className='px-6 py-3'>Type</div>
                  <div className='px-6 py-3'>Reaches this price</div>
                  <div className='px-6 py-3'>Send me Alerts By</div>
                  <div className='px-6 py-3'>Note</div>
                  <div className='px-6 py-3'>Actions</div>
                </div>
                <div className='divide-y divide-slate-100 flex flex-col'>
                  {filteredAlerts.map((item) => {
                    return (
                      <div
                        key={`${item.id}`}
                        className='grid grid-cols-[1fr_1fr_1fr_1fr_3fr_150px] hover:bg-slate-50/50 transition-colors items-center'
                      >
                        <div className='px-6 py-4 text-[11px] font-bold text-slate-400 tracking-tight'>
                          {item.asset}
                        </div>
                        <div className='px-6 py-4 text-[11px] font-bold text-slate-400 tracking-tight'>
                          {item.type}
                        </div>
                        <div className='px-6 py-4 font-bold text-sm text-slate-800'>
                          {currencyFormatter(Number(item.price))}
                        </div>
                        <div className='px-6 py-4 text-right text-sm text-slate-500 font-bold'>
                          <div className='flex gap-8'>
                            {item.emailOptin ? <Mail /> : ''}
                            {item.whatsappOptin ? <MessageCircle /> : ''}
                          </div>
                        </div>
                        <div className='px-6 py-4 font-bold text-sm text-slate-800'>
                          {item.note}
                        </div>

                        <div className='flex items-center text-xl mr-4'>
                          <Sheet>
                            <SheetTrigger className='ml-4 h-8 w-8 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-primary/30 text-slate-400 hover:text-primary transition-all flex items-center justify-center shadow-sm'>
                              <Pencil size={14} />
                            </SheetTrigger>
                            <SheetContent className='max-h-screen overflow-y-scroll'>
                              <SheetHeader>
                                <SheetTitle>Update Alert</SheetTitle>
                                <SheetDescription>
                                  Modify the details of your existing alert.
                                </SheetDescription>
                              </SheetHeader>
                              <UpdateAlertForm alert={item} />
                            </SheetContent>
                          </Sheet>
                          <AlertDialog>
                            <AlertDialogTrigger className='ml-4 h-8 w-8 border border-slate-200 bg-white rounded-xl hover:bg-slate-50 hover:border-red-200 text-slate-400 hover:text-red-500 transition-all flex items-center justify-center shadow-sm'>
                              <Trash2 size={14} />
                            </AlertDialogTrigger>
                            <AlertDialogContent className='rounded-2xl border border-slate-100 shadow-2xl max-w-[400px] p-8'>
                              <AlertDialogHeader>
                                <div className='flex flex-col items-center justify-center mb-6'>
                                  <p className='text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 leading-none mb-3'>
                                    Action Required
                                  </p>
                                  <AlertDialogTitle className='text-xl font-bold text-slate-900 tracking-tight leading-none'>
                                    Delete Alert?
                                  </AlertDialogTitle>
                                  <div className='w-8 h-1 bg-[#22C55E] rounded-full mt-4' />
                                </div>

                                <div className='w-48 h-48 mx-auto mb-6'>
                                  <AspectRatio ratio={1 / 1}>
                                    <Image
                                      src='/are-you-sure.gif'
                                      alt='Asset doubt'
                                      fill
                                      className='object-cover rounded-full border-2 border-slate-100 shadow-sm'
                                    />
                                  </AspectRatio>
                                </div>

                                <AlertDialogDescription className='text-sm text-center text-slate-500 font-medium mb-6 py-6'>
                                  You are about to permanently remove
                                  <br />
                                  this alert from your notifications.
                                </AlertDialogDescription>

                                <div className='flex flex-col gap-3 p-4 bg-slate-50/50 border border-slate-100 rounded-xl'>
                                  <div className='flex flex-col'>
                                    <h3 className='text-[9px] uppercase font-bold text-slate-400 tracking-widest leading-none mb-2'>
                                      When this Asset
                                    </h3>
                                    <span className='font-bold text-slate-700 text-sm'>
                                      {item.asset}
                                    </span>
                                  </div>
                                  <div className='flex justify-between'>
                                    <div className='flex flex-col'>
                                      <h3 className='text-[9px] uppercase font-bold text-slate-400 tracking-widest leading-none mb-2'>
                                        Reaches this Price
                                      </h3>
                                      <span className='font-semibold text-slate-500 text-xs'>
                                        {item.price}
                                      </span>
                                    </div>
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
                                    if (item) {
                                      handleDeleteAlert(item.id);
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
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
