'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Project } from '../types';
import ImageLightbox from './image-lightbox';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const PIPELINE_STEPS = [
  { icon: '🎙️', label: 'Microphone', sub: 'Browser MediaRecorder' },
  { icon: '🌊', label: 'Web Speech API', sub: 'Free · <100ms latency' },
  { icon: '📝', label: 'Live Transcript', sub: 'Real-time text stream' },
  { icon: '🧠', label: 'Claude API', sub: 'STAR scoring + analysis' },
  { icon: '📊', label: 'Scored Feedback', sub: 'JSON + weak topic tags' },
  { icon: '🔊', label: 'ElevenLabs', sub: 'Neural voice synthesis' },
  { icon: '🗣️', label: 'AI Voice Out', sub: 'Realistic interviewer' },
];

const WHISPER_COMPARISON = [
  { metric: 'Cost', webSpeech: 'Free (browser)', whisper: '$0.006/min' },
  { metric: 'Latency', webSpeech: '< 100ms', whisper: '~300ms' },
  { metric: 'Offline', webSpeech: '✓ Yes', whisper: '✗ No' },
  { metric: 'Accuracy', webSpeech: 'Good', whisper: 'Excellent' },
  { metric: 'Languages', webSpeech: '~50', whisper: '99+' },
  { metric: 'Custom vocab', webSpeech: '✗ No', whisper: '✓ Yes' },
];

const FEATURES = [
  {
    emoji: '🧠',
    title: 'Memory System',
    desc: "Tracks weak topics across sessions. Next interview injects those gaps into Claude's prompt — 40% of questions target your actual blind spots.",
  },
  {
    emoji: '⭐',
    title: 'STAR Scoring',
    desc: 'Claude grades each answer on Situation, Task, Action, Result (0–2.5 each) with line-by-line feedback on exactly what was missing.',
  },
  {
    emoji: '🎙️',
    title: 'Voice Mode',
    desc: 'Speak your answers. The AI interviewer responds in ElevenLabs voice. No keyboard — full real-interview simulation.',
  },
  {
    emoji: '🏢',
    title: 'Company Mode',
    desc: 'Google L4, Amazon (Leadership Principles), FAANG, or Startup — question style and culture pressure matched per company.',
  },
  {
    emoji: '🔮',
    title: 'JD Predictor',
    desc: 'Paste any job description → Claude predicts the top 10 questions for that specific role and company before you even apply.',
  },
  {
    emoji: '🗓️',
    title: 'Performance Heatmap',
    desc: 'GitHub-style 365-day grid of practice intensity + a topic coverage map that makes your preparation blind spots impossible to ignore.',
  },
];

const TECH_GROUPS = [
  {
    label: 'Frontend',
    color: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
    items: ['Next.js 14', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'shadcn/ui'],
  },
  {
    label: 'Backend',
    color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    items: ['Java Spring Boot', 'Socket.io', 'REST APIs'],
  },
  {
    label: 'AI / Voice',
    color: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300',
    items: ['Claude API', 'ElevenLabs', 'Web Speech API', 'PDF.js'],
  },
  {
    label: 'Database',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    items: ['Supabase', 'PostgreSQL', 'Upstash Redis'],
  },
  {
    label: 'Cloud',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
    items: ['AWS S3', 'AWS CloudFront', 'AWS Lambda'],
  },
  {
    label: 'Platform',
    color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
    items: ['Clerk Auth', 'Stripe', 'PostHog', 'Sentry', 'Vercel', 'Railway'],
  },
];

export default function IntervAIDetail({ project }: { project: Project }) {
  return (
    <div className="pb-20">
      {/* Back */}
      <motion.div {...fadeUp(0)} className="pt-6 pb-2">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <span aria-hidden>←</span>
          <span>Back to Projects</span>
        </Link>
      </motion.div>

      {/* ── Hero ── */}
      <motion.div {...fadeUp(0.05)} className="mt-10 mb-14">
        <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold tracking-wide text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 mb-5">
          {project.role}
        </span>
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl md:text-7xl mb-5">
          IntervAI
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 font-light max-w-2xl leading-8">
          The mock interviewer that{' '}
          <em className="not-italic font-medium text-violet-600 dark:text-violet-400">
            remembers what trips you up
          </em>{' '}
          — and won&apos;t let you ignore it.
        </p>
      </motion.div>

      {/* ── Screenshot Gallery ── */}
      {project.images && project.images.length > 0 && (
        <motion.div {...fadeUp(0.1)} className="mb-16">
          <ImageLightbox images={project.images} title={project.title} />
        </motion.div>
      )}

      {/* ── About ── */}
      <motion.div {...fadeUp(0.12)} className="mb-16 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
          About
        </p>
        <p className="text-lg leading-9 text-gray-600 dark:text-gray-400">{project.description}</p>
      </motion.div>

      <div className="border-t border-gray-200 dark:border-gray-700 mb-16" />

      {/* ── Feature Cards ── */}
      <motion.div {...fadeUp(0.14)} className="mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-8">
          Core Features
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-md transition-all duration-300"
            >
              <span className="text-2xl mb-4 block">{f.emoji}</span>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-6">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="border-t border-gray-200 dark:border-gray-700 mb-16" />

      {/* ── Voice AI Pipeline ── */}
      <motion.div {...fadeUp(0.16)} className="mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
          Voice AI Pipeline
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
          End-to-end flow from microphone input to AI interviewer voice response
        </p>

        {/* Flow diagram */}
        <div className="overflow-x-auto pb-4">
          <div className="flex items-center gap-0 min-w-max">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center gap-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="flex flex-col items-center text-center px-4 py-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm w-[120px] shrink-0 hover:border-violet-300 dark:hover:border-violet-700 transition-colors duration-300"
                >
                  <span className="text-xl mb-2">{step.icon}</span>
                  <span className="text-[11px] font-semibold text-gray-800 dark:text-gray-200 leading-tight mb-1.5">
                    {step.label}
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight">
                    {step.sub}
                  </span>
                </motion.div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: i * 0.08 + 0.15 }}
                    className="px-2 text-gray-300 dark:text-gray-600 text-sm font-light shrink-0"
                  >
                    →
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        <div className="mt-12">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-5">
            Web Speech API vs Whisper — why we chose the browser
          </h3>
          <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/80">
                  <th className="py-3.5 px-5 text-left font-medium text-gray-500 dark:text-gray-400 w-36">
                    Metric
                  </th>
                  <th className="py-3.5 px-5 text-left font-semibold text-violet-700 dark:text-violet-400">
                    Web Speech API
                    <span className="ml-2 text-[10px] font-normal bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 rounded-full px-2 py-0.5">
                      used
                    </span>
                  </th>
                  <th className="py-3.5 px-5 text-left font-medium text-gray-500 dark:text-gray-400">
                    Whisper API
                  </th>
                </tr>
              </thead>
              <tbody>
                {WHISPER_COMPARISON.map((row, i) => (
                  <motion.tr
                    key={row.metric}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className={`border-t border-gray-100 dark:border-gray-800 ${
                      i % 2 !== 0 ? 'bg-gray-50/50 dark:bg-gray-800/20' : ''
                    }`}
                  >
                    <td className="py-3.5 px-5 font-medium text-gray-600 dark:text-gray-400">
                      {row.metric}
                    </td>
                    <td className="py-3.5 px-5 text-violet-700 dark:text-violet-400 font-medium">
                      {row.webSpeech}
                    </td>
                    <td className="py-3.5 px-5 text-gray-500 dark:text-gray-400">{row.whisper}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-gray-400 dark:text-gray-500 leading-5">
            Whisper is planned for Pro tier where transcription accuracy at scale matters. Web
            Speech API handles real-time practice sessions with zero cost and near-zero latency —
            the right tradeoff for free-tier users.
          </p>
        </div>
      </motion.div>

      <div className="border-t border-gray-200 dark:border-gray-700 mb-16" />

      {/* ── What I Built ── */}
      <motion.div {...fadeUp(0.18)} className="mb-16 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-10">
          What I Built
        </p>
        <ol className="space-y-10">
          {project.learnings.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex gap-6"
            >
              <span
                className="mt-0.5 shrink-0 text-5xl font-extrabold leading-none text-gray-100 dark:text-gray-800 select-none tabular-nums"
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="leading-7 text-gray-600 dark:text-gray-400 pt-2">{item}</p>
            </motion.li>
          ))}
        </ol>
      </motion.div>

      <div className="border-t border-gray-200 dark:border-gray-700 mb-16" />

      {/* ── Tech Stack by Category ── */}
      <motion.div {...fadeUp(0.2)} className="mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-8">
          Tech Stack
        </p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: gi * 0.06 }}
            >
              <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${group.color}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── CTA ── */}
      {(project.website || project.github) && (
        <motion.div
          {...fadeUp(0.22)}
          className="flex flex-wrap gap-4 border-t border-gray-200 dark:border-gray-700 pt-12"
        >
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
        </motion.div>
      )}
    </div>
  );
}
