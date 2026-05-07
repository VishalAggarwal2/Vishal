import MainLayout from 'app/components/layouts/main-layout';
import Reveal from 'app/components/reveal';
import BlogList from './blog-list';
import MediumBanner from './medium-banner';
import { getBlogPosts } from './utils';

export const metadata = {
  title: 'Blogs',
  description:
    'Technical articles by Vishal Aggarwal on system design, backend engineering, and Go.',
};

export default function Page() {
  const posts = getBlogPosts();

  return (
    <MainLayout>
      <Reveal className="space-y-2 pt-6 pb-6 md:space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              Blogs
            </h1>
            <p className="mt-2 text-lg leading-7 text-gray-500 dark:text-gray-400">
              Technical articles on system design, backend engineering, Go, and distributed systems.
            </p>
          </div>
          <MediumBanner />
        </div>
      </Reveal>
      <BlogList posts={posts} />
    </MainLayout>
  );
}
