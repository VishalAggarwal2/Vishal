import Link from 'next/link';
import { ProjectModal } from './types';

interface ProjectProps {
  index: number;
  title: string;
  slug: string;
  role: string;
  techStack: string[];
  setModal: (modal: ProjectModal) => void;
}

export default function ProjectItem({
  index,
  title,
  slug,
  role,
  techStack,
  setModal,
}: ProjectProps) {
  const displayTech = techStack.slice(0, 3);
  const numLabel = String(index + 1).padStart(2, '0');

  return (
    <Link
      href={`/projects/${slug}`}
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      className="group flex w-full items-start gap-4 border-b border-gray-200 px-4 py-8 transition-colors hover:bg-gray-50/80 dark:border-gray-800 dark:hover:bg-gray-900/40 sm:gap-8 sm:px-10 sm:py-12"
    >
      <span className="mt-2 hidden shrink-0 select-none text-xs font-semibold tabular-nums text-gray-300 dark:text-gray-700 sm:mt-3.5 sm:block">
        {numLabel}
      </span>

      <div className="flex-1 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900 transition-transform group-hover:translate-x-1 dark:text-gray-100 sm:text-5xl">
            {title}
          </h2>
          <div className="flex shrink-0 items-center gap-3">
            <p className="hidden text-sm font-light text-gray-400 transition-transform group-hover:-translate-x-1 dark:text-gray-500 sm:block sm:text-base">
              {role}
            </p>
            <span
              className="text-xl text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-gray-600 dark:text-gray-700 dark:group-hover:text-gray-400"
              aria-hidden
            >
              →
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs text-gray-400 dark:text-gray-500 sm:hidden">{role}</p>
          {displayTech.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800/80 dark:text-gray-400"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 3 && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              +{techStack.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
