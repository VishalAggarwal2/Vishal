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
  {
    icon: '🎙️',
    label: 'Audio Input',
    sub: 'Upload or record',
    color: 'border-orange-200 dark:border-orange-800 bg-orange-50/70 dark:bg-orange-950/20',
  },
  {
    icon: '📤',
    label: 'Multipart POST',
    sub: '50 MB limit',
    color: 'border-amber-200 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/20',
  },
  {
    icon: '⚙️',
    label: 'Spring Boot API',
    sub: 'Port 8081',
    color: 'border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/20',
  },
  {
    icon: '📝',
    label: 'Whisper STT',
    sub: '8+ audio formats',
    color: 'border-sky-200 dark:border-sky-800 bg-sky-50/70 dark:bg-sky-950/20',
  },
  {
    icon: '🧠',
    label: 'GPT-4o Analysis',
    sub: 'GENERAL or SALES',
    color: 'border-violet-200 dark:border-violet-800 bg-violet-50/70 dark:bg-violet-950/20',
  },
  {
    icon: '🗃️',
    label: 'H2 Storage',
    sub: 'JSON persisted',
    color: 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/20',
  },
  {
    icon: '📊',
    label: 'Dashboard',
    sub: 'Charts & insights',
    color: 'border-teal-200 dark:border-teal-800 bg-teal-50/70 dark:bg-teal-950/20',
  },
];

const FEATURES = [
  {
    emoji: '🎯',
    title: 'Dual Analysis Modes',
    desc: 'General mode extracts topics, sentiment, and action items. Sales mode goes deep — 8 executive dimensions, conversion probability, buying signals, objections, and talk ratios.',
  },
  {
    emoji: '📝',
    title: 'Whisper Transcription',
    desc: 'OpenAI Whisper handles MP3, WAV, WebM, M4A, OGG, FLAC, AAC, and MP4. Speaker count and language are auto-detected from the audio.',
  },
  {
    emoji: '📈',
    title: 'Conversion Probability',
    desc: 'GPT-4o synthesises executive performance, customer sentiment, and engagement level into a conversion probability score with the key factors that drove it.',
  },
  {
    emoji: '🗣️',
    title: 'Talk Ratio Analytics',
    desc: 'Tracks who spoke when — executive vs customer talk time, silence gaps, interruptions, and the engagement balance across the full call.',
  },
  {
    emoji: '⚡',
    title: 'Key Moment Detection',
    desc: 'Every buying signal, objection, and question is timestamped and surfaced — so sales managers can jump straight to the moments that decided the deal.',
  },
  {
    emoji: '🔴',
    title: 'Real-Time Recorder',
    desc: 'Browser-based audio recording with a live Web Audio API waveform. No external tool needed — record, upload, and get analysis without leaving the app.',
  },
];

const ANALYSIS_DIMENSIONS = [
  {
    label: 'Communication Style',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
  },
  {
    label: 'Tone & Delivery',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  },
  {
    label: 'Active Listening',
    color: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
  },
  {
    label: 'Product Knowledge',
    color: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300',
  },
  {
    label: 'Rapport Building',
    color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  },
  {
    label: 'Objection Handling',
    color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  },
  {
    label: 'Confidence Level',
    color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
  },
  {
    label: 'Closing Skills',
    color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300',
  },
];

const TECH_GROUPS = [
  {
    label: 'Frontend',
    color: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
    items: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recharts'],
  },
  {
    label: 'Backend',
    color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    items: ['Java 21', 'Spring Boot 3.2', 'Spring WebFlux', 'Apache Tomcat', 'Maven'],
  },
  {
    label: 'AI / Voice',
    color: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300',
    items: ['OpenAI Whisper', 'GPT-4o', 'Web Audio API', 'React Dropzone'],
  },
  {
    label: 'Data',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    items: ['H2 Database', 'Spring Data JPA', 'Jackson JSON'],
  },
];

const QUICK_NAV = [
  { label: 'Features', href: '#features' },
  { label: 'Pipeline', href: '#pipeline' },
  { label: 'Sales Analysis', href: '#sales' },
  { label: 'What I Built', href: '#built' },
  { label: 'Tech Stack', href: '#tech' },
];

export default function VoiceAIDetail({ project }: { project: Project }) {
  return (
    <div className="pb-24">
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
      <motion.div {...fadeUp(0.05)} className="relative mt-10 mb-16 overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -left-12 h-80 w-80 rounded-full bg-orange-100/60 dark:bg-orange-900/10 blur-3xl" />
        <div className="pointer-events-none absolute -top-8 right-8 h-56 w-56 rounded-full bg-amber-100/40 dark:bg-amber-900/8 blur-2xl" />

        <div className="relative">
          <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold tracking-wide text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 mb-5">
            {project.role}
          </span>
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl md:text-7xl mb-5">
            VoiceAI
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-light max-w-2xl leading-8 mb-7">
            Every sales call holds a deal or a missed one.{' '}
            <em className="not-italic font-medium text-orange-600 dark:text-orange-400">
              VoiceAI reads the room
            </em>{' '}
            — sentiment, signals, and the moment the pitch broke down.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {['Sales Analysis', 'Whisper STT', 'GPT-4o', 'Conversion Prediction', 'Talk Ratio'].map(
              (chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/40 px-3 py-1 text-xs font-medium text-orange-600 dark:text-orange-400"
                >
                  {chip}
                </span>
              )
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {QUICK_NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full border border-gray-200 dark:border-gray-700 px-3 py-1 text-xs text-gray-500 dark:text-gray-400 transition-colors hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Screenshot Gallery ── */}
      {project.images && project.images.length > 0 && (
        <motion.div {...fadeUp(0.1)} className="mb-16">
          <ImageLightbox images={project.images} title={project.title} />
        </motion.div>
      )}

      {/* ── About ── */}
      <motion.div {...fadeUp(0.12)} className="mb-16 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-5">
          About
        </p>
        <div className="rounded-2xl border border-orange-100 dark:border-orange-900/30 bg-orange-50/30 dark:bg-orange-950/10 px-7 py-6">
          <p className="text-lg leading-9 text-gray-600 dark:text-gray-400">
            {project.description}
          </p>
        </div>
      </motion.div>

      <div className="border-t border-gray-200 dark:border-gray-700 mb-16" />

      {/* ── Features ── */}
      <motion.div {...fadeUp(0.14)} id="features" className="mb-16 scroll-mt-20">
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
              className="group rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 p-6 transition-all duration-300 hover:border-orange-200 hover:bg-orange-50/40 hover:shadow-sm dark:hover:border-orange-800 dark:hover:bg-orange-950/20"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-xl shadow-sm transition-colors group-hover:border-orange-200 dark:border-gray-700 dark:bg-gray-800 dark:group-hover:border-orange-800">
                {f.emoji}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-6">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="border-t border-gray-200 dark:border-gray-700 mb-16" />

      {/* ── Pipeline ── */}
      <motion.div {...fadeUp(0.16)} id="pipeline" className="mb-16 scroll-mt-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
          Voice Analysis Pipeline
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          End-to-end flow from audio input to structured intelligence report
        </p>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/30 p-6">
          <div className="flex items-center min-w-max mx-auto">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className={`flex flex-col items-center text-center px-4 py-4 rounded-xl border ${step.color} w-[118px] shrink-0 transition-all duration-300 hover:scale-105 hover:shadow-sm`}
                >
                  <span className="text-xl mb-2">{step.icon}</span>
                  <span className="text-[11px] font-semibold text-gray-800 dark:text-gray-200 leading-tight mb-1">
                    {step.label}
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight">
                    {step.sub}
                  </span>
                  <span className="mt-2 text-[9px] font-bold tabular-nums text-gray-300 dark:text-gray-700 select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </motion.div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: i * 0.08 + 0.15 }}
                    className="px-1.5 text-gray-300 dark:text-gray-600 text-base shrink-0"
                  >
                    →
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="border-t border-gray-200 dark:border-gray-700 mb-16" />

      {/* ── Sales Analysis Deep Dive ── */}
      <motion.div {...fadeUp(0.17)} id="sales" className="mb-16 scroll-mt-20">
        <div className="rounded-3xl border border-orange-100 dark:border-orange-900/40 bg-gradient-to-b from-orange-50/60 via-orange-50/20 to-transparent dark:from-orange-950/20 dark:via-orange-950/10 dark:to-transparent p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 dark:text-orange-500 mb-3">
            Sales Mode
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            8-Dimension Executive Evaluation
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl leading-7 mb-8">
            A single GPT-4o call with a 3,500-token structured JSON schema evaluates every dimension
            of an executive&apos;s performance — scored and explained, not just labelled.
          </p>
          <div className="flex flex-wrap gap-2 mb-10">
            {ANALYSIS_DIMENSIONS.map((dim, i) => (
              <motion.span
                key={dim.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`rounded-full px-3 py-1.5 text-xs font-medium ${dim.color}`}
              >
                {dim.label}
              </motion.span>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: '📊',
                title: 'Customer Intelligence',
                desc: 'Sentiment trajectory, engagement level, pain points, buying signals, objections, and unmet expectations — from the customer side of the call.',
              },
              {
                icon: '🎯',
                title: 'Conversion Probability',
                desc: 'A confidence-weighted prediction score (0–100%) with the specific factors that pushed it higher or lower in this call.',
              },
              {
                icon: '🗓️',
                title: 'Follow-Up Actions',
                desc: 'GPT-4o generates prioritised next steps, open questions, and re-engagement hooks to act on before the next touchpoint.',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-white/80 bg-white/70 p-5 backdrop-blur-sm dark:border-gray-700/60 dark:bg-gray-900/50"
              >
                <span className="text-2xl mb-3 block">{card.icon}</span>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="border-t border-gray-200 dark:border-gray-700 mb-16" />

      {/* ── What I Built ── */}
      <motion.div {...fadeUp(0.18)} id="built" className="mb-16 max-w-3xl scroll-mt-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-10">
          What I Built
        </p>
        <ol className="space-y-8">
          {project.learnings.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group flex gap-5"
            >
              <span
                className="mt-0.5 shrink-0 select-none text-5xl font-extrabold leading-none tabular-nums text-gray-100 transition-colors group-hover:text-orange-100 dark:text-gray-800 dark:group-hover:text-orange-950"
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="border-l-2 border-transparent pl-5 transition-colors group-hover:border-orange-200 dark:group-hover:border-orange-800">
                <p className="pt-2 leading-7 text-gray-600 dark:text-gray-400">{item}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </motion.div>

      <div className="border-t border-gray-200 dark:border-gray-700 mb-16" />

      {/* ── Tech Stack ── */}
      <motion.div {...fadeUp(0.2)} id="tech" className="mb-16 scroll-mt-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-8">
          Tech Stack
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TECH_GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: gi * 0.06 }}
              className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 px-5 py-4"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
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
          className="border-t border-gray-200 dark:border-gray-700 pt-12"
        >
          <p className="mb-5 text-sm text-gray-400 dark:text-gray-500">Explore the project</p>
          <div className="flex flex-wrap gap-4">
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-orange-600 hover:shadow-md"
              >
                Visit Website <span aria-hidden>→</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all ${
                  project.website
                    ? 'border border-gray-300 text-gray-700 hover:border-gray-500 hover:text-gray-900 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-400 dark:hover:text-gray-100'
                    : 'bg-gray-900 text-white hover:opacity-80 dark:bg-gray-100 dark:text-gray-900'
                }`}
              >
                View on GitHub <span aria-hidden>→</span>
              </a>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
