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

export default function Welcome({ uid }: { uid: string }) {
  return (
    <div className='relative flex flex-wrap w-full items-center justify-center'>
      {pictures.map((picture) => (
        <div key={picture.id} className='w-[150px]'>
          <AspectRatio ratio={1 / 1}>
            <Image
              src={picture.src}
              alt={picture.alt}
              className='object-cover border'
              fill
              unoptimized
            />
          </AspectRatio>
        </div>
      ))}
      <div className='absolute top-50 -left-50 w-[60em] h-[24em] px-20 py-10 bg-white rounded-md'>
        {/* border-2 border-primary drop-shadow-[3px_3px_#121212] */}
        <div className='flex flex-col w-full items-center justify-center mx-auto'>
          <p className='text-2xl font-semibold mb-4'>
            👋 Welcome aboard, {uid}!
          </p>
          <p className='text-base my-2'>
            You’ve just unlocked a world of investments and financial fun! 🎉
          </p>
          <p className='text-base mt-2'>
            To get started, all you need to do is add your first asset.
          </p>
          <p className='text-base mb-2'>
            Ready to take the plunge? 🚀 Let’s build your financial future
            together!
          </p>
          <Sheet>
            <SheetTrigger className='border-2 border-slate-500 h-10 px-4 rounded-[2px] font-semibold my-4 text-sm capitalize'>
              Add your first asset
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
    </div>
  );
}
const pictures = [
  {
    id: 1,
    src: '/welcome/welcome-1.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 2,
    src: '/welcome/welcome-2.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 3,
    src: '/welcome/welcome-3.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 4,
    src: '/welcome/welcome-4.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 5,
    src: '/welcome/welcome-5.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 6,
    src: '/welcome/welcome-6.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 7,
    src: '/welcome/welcome-7.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 8,
    src: '/welcome/welcome-8.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 9,
    src: '/welcome/welcome-9.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 10,
    src: '/welcome/welcome-10.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 11,
    src: '/welcome/welcome-11.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 12,
    src: '/welcome/welcome-12.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 13,
    src: '/welcome/welcome-13.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 14,
    src: '/welcome/welcome-14.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 15,
    src: '/welcome/welcome-15.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 16,
    src: '/welcome/welcome-16.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 17,
    src: '/welcome/welcome-17.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 18,
    src: '/welcome/welcome-18.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 19,
    src: '/welcome/welcome-19.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 20,
    src: '/welcome/welcome-20.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 21,
    src: '/welcome/welcome-21.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 22,
    src: '/welcome/welcome-22.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 23,
    src: '/welcome/welcome-23.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 24,
    src: '/welcome/welcome-24.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 25,
    src: '/welcome/welcome-25.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 26,
    src: '/welcome/welcome-26.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 27,
    src: '/welcome/welcome-27.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 28,
    src: '/welcome/welcome-28.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 29,
    src: '/welcome/welcome-29.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 30,
    src: '/welcome/welcome-30.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 31,
    src: '/welcome/welcome-31.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 32,
    src: '/welcome/welcome-32.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 33,
    src: '/welcome/welcome-33.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 34,
    src: '/welcome/welcome-34.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 35,
    src: '/welcome/welcome-35.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 36,
    src: '/welcome/welcome-36.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 37,
    src: '/welcome/welcome-37.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 38,
    src: '/welcome/welcome-38.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 39,
    src: '/welcome/welcome-39.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 40,
    src: '/welcome/welcome-40.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 41,
    src: '/welcome/welcome-41.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 42,
    src: '/welcome/welcome-42.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 43,
    src: '/welcome/welcome-43.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 44,
    src: '/welcome/welcome-44.webp',
    alt: '',
    coverPosition: 'center',
  },
  {
    id: 45,
    src: '/welcome/welcome-45.webp',
    alt: '',
    coverPosition: 'center',
  },
];
