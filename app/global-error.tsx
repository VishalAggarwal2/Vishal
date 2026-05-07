'use client';

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="flex min-h-screen flex-col items-center justify-center bg-white text-black dark:bg-black dark:text-white">
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <button
          onClick={reset}
          className="mt-4 rounded-lg bg-[#de1d8d] px-5 py-2 text-sm font-medium text-white"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
