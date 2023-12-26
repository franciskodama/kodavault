import Image from 'next/image';

export default function Error404() {
  return (
    <div>
      <h1>Not Found. Sifu!</h1>
      <p>Sorry, the page you were looking for could not be found.</p>
      <Image
        src='/goat.gif'
        width={400}
        height={400}
        alt='Goat wearing glasses image'
        className='rounded-md object-cover'
      />
    </div>
  );
}
