import MainLayout from 'app/components/layouts/main-layout';
import Reveal from 'app/components/reveal';
import Projects from 'app/projects/projects';
import { projects } from 'app/projects/constants';

export const metadata = {
  title: 'Projects',
  description: 'My Projects - Vishal Aggarwal',
};

export default function Page() {
  return (
    <MainLayout>
      <div className="relative overflow-hidden">
        <Reveal className="relative pt-6 pb-10">
          <div className="flex items-baseline gap-3 mb-3">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              Projects
            </h1>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              {projects.length}
            </span>
          </div>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Products, systems, and experiments — built from scratch.
          </p>
        </Reveal>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800" />
      <Projects />
    </MainLayout>
  );
}
