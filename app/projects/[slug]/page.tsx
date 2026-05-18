import Link from 'next/link';
import { notFound } from 'next/navigation';
import MainLayout from 'app/components/layouts/main-layout';
import Reveal from 'app/components/reveal';
import { projects } from 'app/projects/constants';
import ImageLightbox from './image-lightbox';
import IntervAIDetail from './interv-ai-detail';
import TaskFlowDetail from './taskflow-detail';
import VoiceAIDetail from './voice-ai-detail';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title };
}

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

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  if (project.slug === 'interv-ai') {
    return (
      <MainLayout>
        <IntervAIDetail project={project} />
      </MainLayout>
    );
  }

  if (project.slug === 'taskflow') {
    return (
      <MainLayout>
        <TaskFlowDetail project={project} />
      </MainLayout>
    );
  }

  if (project.slug === 'voice-ai') {
    return (
      <MainLayout>
        <VoiceAIDetail project={project} />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="pb-24">
        {/* Decorative blobs */}
        <div
          className="pointer-events-none fixed -top-40 -left-20 h-[420px] w-[420px] rounded-full blur-3xl opacity-25 dark:opacity-10"
          style={{ backgroundColor: project.color }}
        />
        <div
          className="pointer-events-none fixed top-32 -right-24 h-[300px] w-[300px] rounded-full blur-3xl opacity-20 dark:opacity-8"
          style={{ backgroundColor: project.color }}
        />

        {/* Back */}
        <Reveal className="pt-6 pb-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <span aria-hidden>←</span> Back to Projects
          </Link>
        </Reveal>

        {/* Hero */}
        <Reveal delay={0.05} className="mt-10 mb-14 space-y-5">
          <span className="inline-block rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1 text-xs font-semibold tracking-wide text-gray-600 dark:text-gray-300 shadow-sm">
            {project.role}
          </span>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
            {project.title}
          </h1>

          {/* Tech stack chips */}
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

          {/* Quick section nav */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              project.images?.length ? { label: 'Screenshots', href: '#screenshots' } : null,
              { label: 'About', href: '#about' },
              { label: 'What I Built', href: '#built' },
              project.website || project.github ? { label: 'Links', href: '#links' } : null,
            ]
              .filter(Boolean)
              .map((link) => (
                <a
                  key={link!.href}
                  href={link!.href}
                  className="rounded-full border border-gray-200 dark:border-gray-700 px-3 py-1 text-xs text-gray-500 dark:text-gray-400 transition-colors hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  {link!.label}
                </a>
              ))}
          </div>
        </Reveal>

        {/* Screenshot gallery */}
        {project.images && project.images.length > 0 && (
          <div id="screenshots">
            <Reveal delay={0.08} className="mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-5">
                Screenshots
              </p>
              <ImageLightbox images={project.images} title={project.title} />
            </Reveal>
          </div>
        )}

        <div className="border-t border-gray-200 dark:border-gray-700 mb-14" />

        {/* About */}
        <div id="about">
          <Reveal delay={0.1} className="mb-14 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-5">
              About
            </p>
            <div
              className="rounded-2xl border-l-4 px-7 py-6"
              style={{
                borderLeftColor: project.color === '#ffffff' ? '#e5e7eb' : project.color,
                backgroundColor: `${project.color}33`,
              }}
            >
              <p className="text-lg leading-9 text-gray-600 dark:text-gray-400">
                {project.description}
              </p>
            </div>
          </Reveal>
        </div>

        {/* What I Built */}
        <div id="built">
          <Reveal delay={0.14} className="mb-16 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-10">
              What I Built
            </p>
            <ol className="space-y-10">
              {project.learnings.map((item, i) => (
                <li key={i} className="group flex gap-5">
                  <span
                    className="mt-0.5 shrink-0 select-none text-5xl font-extrabold leading-none tabular-nums text-gray-100 transition-colors group-hover:text-gray-200 dark:text-gray-800 dark:group-hover:text-gray-700"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="border-l-2 border-transparent pl-5 transition-colors group-hover:border-gray-300 dark:group-hover:border-gray-600">
                    <p className="pt-2 leading-7 text-gray-600 dark:text-gray-400">{item}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        {/* CTA */}
        {(project.website || project.github) && (
          <div id="links">
            <Reveal delay={0.18} className="border-t border-gray-200 dark:border-gray-700 pt-12">
              <p className="mb-5 text-sm text-gray-400 dark:text-gray-500">Explore the project</p>
              <div className="flex flex-wrap gap-4">
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80 dark:bg-gray-100 dark:text-gray-900"
                  >
                    Visit Website <span aria-hidden>→</span>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-500 hover:text-gray-900 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-400 dark:hover:text-gray-100"
                  >
                    View on GitHub <span aria-hidden>→</span>
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
