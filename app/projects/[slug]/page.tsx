import Link from 'next/link';
import { notFound } from 'next/navigation';
import MainLayout from 'app/components/layouts/main-layout';
import Reveal from 'app/components/reveal';
import { projects } from 'app/projects/constants';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return { title: project.title };
}

// Tag colour palette — cycles through a small set of soft hues
const TAG_COLORS = [
  'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
  'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300',
  'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
  'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
  'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
];

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) notFound();

  return (
    <MainLayout>
      {/* Back link */}
      <Reveal className="pt-6 pb-2">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <span aria-hidden>←</span>
          <span>Back to Projects</span>
        </Link>
      </Reveal>

      {/* Hero */}
      <Reveal delay={0.05} className="mt-6 mb-10 space-y-5">
        {/* Role badge */}
        <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium tracking-wide text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          {project.role}
        </span>

        {/* Title */}
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
          {project.title}
        </h1>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.techStack.map((tech, i) => (
            <span
              key={tech}
              className={`rounded-full px-3 py-1 text-xs font-medium ${TAG_COLORS[i % TAG_COLORS.length]}`}
            >
              {tech}
            </span>
          ))}
        </div>
      </Reveal>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700" />

      {/* About */}
      <Reveal delay={0.1} className="mt-10 mb-10 max-w-3xl space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          About this project
        </h2>
        <p className="leading-8 text-gray-600 dark:text-gray-400">{project.description}</p>
      </Reveal>

      {/* What I built & learned */}
      <Reveal delay={0.15} className="mb-12 max-w-3xl space-y-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          What I built &amp; learned
        </h2>
        <ol className="space-y-6">
          {project.learnings.map((item, i) => (
            <li key={i} className="flex gap-5">
              {/* Large number */}
              <span
                className="mt-0.5 shrink-0 text-4xl font-extrabold leading-none text-gray-100 dark:text-gray-800 select-none"
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="leading-7 text-gray-600 dark:text-gray-400">{item}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* CTA buttons */}
      {(project.website || project.github) && (
        <Reveal
          delay={0.2}
          className="mb-16 flex flex-wrap gap-4 border-t border-gray-200 pt-10 dark:border-gray-700"
        >
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80 dark:bg-gray-100 dark:text-gray-900"
            >
              Visit Website
              <span aria-hidden>→</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-500 hover:text-gray-900 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-400 dark:hover:text-gray-100"
            >
              View on GitHub
              <span aria-hidden>→</span>
            </a>
          )}
        </Reveal>
      )}
    </MainLayout>
  );
}
