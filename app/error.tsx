'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Something went wrong</h2>
      <button
        onClick={reset}
        className="mt-4 rounded-lg bg-[#de1d8d] px-5 py-2 text-sm font-medium text-white"
      >
        Try again
      </button>
    </div>
  );
}
