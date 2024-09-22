import Image from 'next/image';
import { AspectRatio } from './ui/aspect-ratio';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { AddAssetForm } from './AddAssetForm';

export type MessageInTable = {
  image: string;
  objectPosition: string;
  alt: string;
  title: string;
  subtitle: string;
  buttonCopy: string;
  hasNoButton?: boolean;
  formTitle: string;
  formSubtitle: string;
};

export default function MessageInTable({
  image,
  objectPosition,
  alt,
  title,
  subtitle,
  buttonCopy,
  hasNoButton,
  formTitle,
  formSubtitle,
}: MessageInTable) {
  return (
    <div className='flex items-center justify-around'>
      <div className='w-[450px] mx-auto my-8'>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={image}
            alt={alt}
            className='object-cover rounded-sm border-primary'
            priority
            fill
            sizes='(max-width: 500px) 100vw'
            style={{ objectPosition: objectPosition }}
          />
        </AspectRatio>
      </div>
      <div className='flex flex-col w-[450px] mx-auto'>
        <p className='text-2xl font-semibold'>{title}</p>
        <p className='text-base my-2'>{subtitle}</p>

        {!hasNoButton && (
          <Sheet>
            <SheetTrigger className='border-2 border-slate-500 h-10 px-4 rounded-[2px] font-semibold my-4 text-sm '>
              {buttonCopy}
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{formTitle}</SheetTitle>
                <SheetDescription>{formSubtitle}</SheetDescription>
              </SheetHeader>
              <AddAssetForm />
            </SheetContent>
          </Sheet>
        )}
      </div>
    </div>
  );
}
