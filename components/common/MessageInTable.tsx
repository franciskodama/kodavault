import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { AddAssetForm } from '@/components/forms/AddAssetForm';

import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export type MessageInTableProps = {
  image: string;
  objectPosition: string;
  alt: string;
  title: string;
  icon?: LucideIcon;
  subtitle: string;
  buttonCopy: string;
  hasNoButton?: boolean;
  formTitle: string;
  formSubtitle: string;
  form?: ReactNode;
};

export default function MessageInTable({
  image,
  objectPosition,
  alt,
  title,
  icon: Icon,
  subtitle,
  buttonCopy,
  hasNoButton,
  formTitle,
  formSubtitle,
  form,
}: MessageInTableProps) {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-around px-8 sm:px-0'>
      <div className='w-full sm:w-[450px] mx-auto my-8'>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={image}
            alt={alt}
            className='object-cover rounded-2xl border border-slate-100'
            priority
            unoptimized
            fill
            sizes='(max-width: 500px) 100vw'
            style={{ objectPosition: objectPosition }}
          />
        </AspectRatio>
      </div>
      <div className='flex flex-col sm:w-[450px] mx-auto px-2 sm:px-8'>
        <div className='flex items-center gap-2'>
          <p className='text-xl font-bold text-slate-900 tracking-tight'>
            {title}
          </p>
          {Icon && <Icon className='h-5 w-5 text-slate-400' />}
        </div>
        <p className='text-sm text-slate-500 font-medium leading-relaxed my-3'>
          {subtitle}
        </p>

        {!hasNoButton && (
          <Sheet>
            <SheetTrigger className='border-2 border-slate-900 h-10 px-4 rounded-xl font-semibold my-4 text-sm hover:bg-slate-900 hover:text-white transition-all'>
              {buttonCopy}
            </SheetTrigger>
            <SheetContent className='max-h-screen overflow-y-auto'>
              <SheetHeader>
                <SheetTitle>{formTitle}</SheetTitle>
                <SheetDescription>{formSubtitle}</SheetDescription>
              </SheetHeader>
              {form || <AddAssetForm />}
            </SheetContent>
          </Sheet>
        )}
      </div>
    </div>
  );
}
