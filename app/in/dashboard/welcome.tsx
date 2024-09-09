import { AddAssetForm } from '@/components/AddAssetForm';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';

export default function Welcome() {
  return (
    <div className='flex items-center justify-around'>
      <div className='w-[450px] mx-auto my-8'>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={'/in/are-you-sure.gif'}
            alt={'Are you sure'}
            className='object-cover rounded-sm border-primary'
            // objectPosition={coverPosition}
            fill
          />
        </AspectRatio>
      </div>
      <div className='flex flex-col w-[450px] mx-auto'>
        <p className='text-2xl font-semibold'>title</p>
        <p className='text-base my-2'>subtitle</p>

        <Sheet>
          <SheetTrigger className='border-2 border-slate-500 h-10 px-4 rounded-[2px] font-semibold my-4 text-sm '>
            buttonCopy
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>formTitle</SheetTitle>
              <SheetDescription>formSubtitle</SheetDescription>
            </SheetHeader>
            <AddAssetForm />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
