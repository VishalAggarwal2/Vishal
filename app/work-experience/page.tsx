import MainLayout from 'app/components/layouts/main-layout';
import Reveal from 'app/components/reveal';
import Timeline from './timeline';

export const metadata = {
  title: 'Work Experience',
  description: 'Career timeline of Vishal Aggarwal',
};

export default function Page() {
  return (
    <MainLayout>
      <Reveal className="pt-8 pb-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Career Timeline
        </p>
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
          Work Experience
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-500 dark:text-gray-400">
          From building for 10K+ users at college to shipping production systems at scale — every
          role shaped how I think about engineering and product.
        </p>
      </Reveal>

      <Timeline />
    </MainLayout>
  );
}
