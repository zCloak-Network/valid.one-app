'use client'; // Error components must be Client Components

import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main>
      <section className='bg-white'>
        <div className='flex flex-col min-h-screen text-center text-black layout items-center justify-center'>
          <RiAlarmWarningFill
            size={60}
            className='animate-flicker text-red-500 drop-shadow-glow'
          />
          <h1 className='mt-8 text-4xl md:text-6xl'>
            Oops, something went wrong!
          </h1>
          <button onClick={reset} className='mt-4 btn'>
            Try again
          </button>
        </div>
      </section>
    </main>
  );
}
