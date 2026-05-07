import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">404</h2>
      <p className="text-lg text-gray-500 dark:text-gray-400">Blog post not found.</p>
      <Link
        href="/blogs"
        className="rounded-lg bg-[#de1d8d] px-5 py-2 text-sm font-medium text-white"
      >
        Back to all blogs
      </Link>
    </div>
  );
}
