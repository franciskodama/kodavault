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

export default function NoAssets() {
  return (
    <div className='flex flex-col w-full items-center justify-center mt-12 mb-24'>
      <div className='flex flex-col items-center mt-4'>
        <h2 className='text-2xl font-semibold'>Whoa there! 🕵️‍♂️</h2>
        <p className='text-lg'>Your dashboard is feeling a bit empty.</p>
      </div>

      <div className='w-[450px] mx-auto my-8'>
        <AspectRatio
          ratio={16 / 14}
          // className='drop-shadow-[7px_7px_rgba(0,0,0,1)] border-2 border-primary'
        >
          <Image
            src='/no-assets-travolta.gif'
            alt='John Travolta looking at around inside a wallet'
            className='object-cover rounded-sm border-primary'
            objectPosition='center 100%'
            fill
          />
        </AspectRatio>
      </div>
      <p className='text-2xl font-semibold'>
        Spice it up by adding some assets!
      </p>
      <p className='text-base my-2'>{`Let's make your financial playground pop! 🚀`}</p>

      <Sheet>
        <SheetTrigger className='border-2 border-slate-500 h-10 px-4 rounded-[2px] font-semibold my-4 text-sm '>
          Add Your First Asset
        </SheetTrigger>
        <SheetContent className='max-h-screen overflow-y-scroll'>
          <SheetHeader>
            <SheetTitle>Add a new Asset</SheetTitle>
            <SheetDescription>
              Add a New Asset and expand your investment portfolio.
            </SheetDescription>
          </SheetHeader>
          <AddAssetForm />
        </SheetContent>
      </Sheet>
    </div>
  );
}
