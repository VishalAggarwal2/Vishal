'use client';

import Link from 'next/link';

export default function BlogsError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Something went wrong</h2>
      <p className="text-gray-500 dark:text-gray-400">
        Could not load the blog content. Please try again.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-lg bg-[#de1d8d] px-5 py-2 text-sm font-medium text-white"
        >
          Try again
        </button>
        <Link
          href="/blogs"
          className="rounded-lg border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-300"
        >
          All blogs
        </Link>
      </div>
    </div>
  );
}
