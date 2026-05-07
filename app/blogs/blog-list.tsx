'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from './utils';

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 pb-12">
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link href={`/blogs/${post.slug}`}>
            <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-lg cursor-pointer h-full">
              <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={`/static/images/Blogs/${post.metadata.image}`}
                  alt={post.metadata.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <span className="inline-block w-fit rounded-full bg-primary-100 dark:bg-primary-900 px-3 py-0.5 text-xs font-medium text-primary-700 dark:text-primary-300">
                  {post.metadata.tag}
                </span>
                <h2 className="text-lg font-bold leading-snug text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {post.metadata.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
                  {post.metadata.summary}
                </p>
                <span className="mt-2 text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:underline">
                  Read more →
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
