import { SignIn } from '@clerk/nextjs';

export default async function SignInPage() {
  return (
    <>
      <div className='relative'>
        <SignIn />
        <div className='absolute top-10 -left-2 w-10 h-[20em] bg-[#FAFAFB]' />
      </div>
    </>
  );
}
