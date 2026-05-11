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
    label: 'Microphone',
    sub: 'Browser MediaRecorder',
    color: 'border-sky-200 dark:border-sky-800 bg-sky-50/70 dark:bg-sky-950/20',
  },
  {
    icon: '🌊',
    label: 'Web Speech API',
    sub: 'Free · <100ms latency',
    color: 'border-blue-200 dark:border-blue-800 bg-blue-50/70 dark:bg-blue-950/20',
  },
  {
    icon: '📝',
    label: 'Live Transcript',
    sub: 'Real-time text stream',
    color: 'border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/20',
  },
  {
    icon: '🧠',
    label: 'Claude API',
    sub: 'STAR scoring + analysis',
    color: 'border-violet-200 dark:border-violet-800 bg-violet-50/70 dark:bg-violet-950/20',
  },
  {
    icon: '📊',
    label: 'Scored Feedback',
    sub: 'JSON + weak topic tags',
    color: 'border-purple-200 dark:border-purple-800 bg-purple-50/70 dark:bg-purple-950/20',
  },
  {
    icon: '🔊',
    label: 'ElevenLabs',
    sub: 'Neural voice synthesis',
    color: 'border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/20',
  },
  {
    icon: '🗣️',
    label: 'AI Voice Out',
    sub: 'Realistic interviewer',
    color: 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/20',
  },
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

const SCALE_PILLARS = [
  {
    icon: '⚡',
    title: 'Event-Driven Scoring Pipeline',
    tag: 'Apache Kafka',
    desc: 'Interview sessions emit events (answer.submitted, session.ended) consumed by independent scoring workers and memory-update consumers via Kafka topics. Zero coupling between ingestion and processing — consumer groups absorb traffic spikes with backpressure handling and horizontal fan-out to analytics.',
  },
  {
    icon: '📊',
    title: 'CQRS + Materialized Projections',
    tag: 'Read/Write Separation',
    desc: 'Command model: answer submissions hit the PostgreSQL write path through command handlers. Query model: heatmaps, weak-area dashboards, and leaderboards served from Redis-backed materialized projections updated asynchronously. Analytics queries never contend with live interview sessions.',
  },
  {
    icon: '🏢',
    title: 'Multi-Tenant B2B Architecture',
    tag: 'Schema-Per-Tenant',
    desc: 'Enterprise mode for universities and bootcamps: schema-per-tenant PostgreSQL isolation, Row-Level Security (RLS) enforced at the DB layer, tenant context propagated via signed JWT claims. Enables white-label deployments with full data isolation and zero application-layer config changes per customer.',
  },
  {
    icon: '🧠',
    title: 'LLM Gateway + Token Budgeting',
    tag: 'AI Cost Control',
    desc: 'All Claude API calls proxied through an internal LLM gateway enforcing per-user token quotas. Prompt caching eliminates redundant context re-tokenization across sessions. Automatic model fallback routing to Haiku on budget exhaustion — zero UX disruption. Per-request cost attribution feeds usage-based Stripe billing.',
  },
  {
    icon: '🛡️',
    title: 'Circuit Breakers + Bulkhead Isolation',
    tag: 'Resilience4J',
    desc: 'Every external AI call wrapped in a Resilience4J circuit breaker with half-open state probing. On Claude API degradation, scoring falls back to cached rubric templates. ElevenLabs voice synthesis isolated in a dedicated bulkhead thread pool — a slow TTS request never starves scoring requests of threads.',
  },
  {
    icon: '📈',
    title: 'Autoscaling on Kafka Consumer Lag',
    tag: 'Kubernetes HPA',
    desc: 'Spring Boot scoring pods scale on Kafka consumer lag — not CPU. When interview submission spikes hit (exam season, morning rushes), custom HPA metrics trigger scale-out before latency degrades. Zero-downtime rolling deploys with readiness probe gating prevent in-flight sessions from being dropped mid-interview.',
  },
  {
    icon: '🌍',
    title: 'Global Voice CDN + Content Caching',
    tag: 'CloudFront Edge',
    desc: 'ElevenLabs TTS responses cached at CloudFront edge nodes keyed by prompt content hash. Identical interview questions served from CDN instead of re-synthesized — cuts TTS API costs ~60% at scale. S3 presigned URLs (15-min expiry) with per-user CloudFront signed cookies scope recording playback access.',
  },
  {
    icon: '🔭',
    title: 'Observability with SLI/SLO Contracts',
    tag: 'OpenTelemetry',
    desc: 'Distributed traces propagated via W3C TraceContext across all services. Custom SLOs: scoring_latency_p99 < 2s, session_completion_rate > 85%, weak_area_injection_accuracy > 70%. PostHog funnels track free→paid conversion; Sentry captures AI parse failures with full session context for replay.',
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

const QUICK_NAV = [
  { label: 'Features', href: '#features' },
  { label: 'Voice Pipeline', href: '#pipeline' },
  { label: 'What I Built', href: '#built' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'At Scale', href: '#scale' },
];

export default function IntervAIDetail({ project }: { project: Project }) {
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
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -left-12 h-80 w-80 rounded-full bg-violet-100/60 dark:bg-violet-900/10 blur-3xl" />
        <div className="pointer-events-none absolute -top-8 right-8 h-56 w-56 rounded-full bg-purple-100/40 dark:bg-purple-900/8 blur-2xl" />

        <div className="relative">
          <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold tracking-wide text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 mb-5">
            {project.role}
          </span>
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl md:text-7xl mb-5">
            IntervAI
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-light max-w-2xl leading-8 mb-7">
            The mock interviewer that{' '}
            <em className="not-italic font-medium text-violet-600 dark:text-violet-400">
              remembers what trips you up
            </em>{' '}
            — and won&apos;t let you ignore it.
          </p>

          {/* feature highlight chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['Memory System', 'STAR Scoring', 'Voice Mode', 'JD Predictor', 'Heatmap'].map(
              (chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/40 px-3 py-1 text-xs font-medium text-violet-600 dark:text-violet-400"
                >
                  {chip}
                </span>
              )
            )}
          </div>

          {/* quick nav */}
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
        <div className="rounded-2xl border border-violet-100 dark:border-violet-900/30 bg-violet-50/30 dark:bg-violet-950/10 px-7 py-6">
          <p className="text-lg leading-9 text-gray-600 dark:text-gray-400">
            {project.description}
          </p>
        </div>
      </motion.div>

      <div className="border-t border-gray-200 dark:border-gray-700 mb-16" />

      {/* ── Feature Cards ── */}
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
              className="group rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 p-6 transition-all duration-300 hover:border-violet-200 hover:bg-violet-50/40 hover:shadow-sm dark:hover:border-violet-800 dark:hover:bg-violet-950/20"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-xl shadow-sm transition-colors group-hover:border-violet-200 dark:border-gray-700 dark:bg-gray-800 dark:group-hover:border-violet-800">
                {f.emoji}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-6">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="border-t border-gray-200 dark:border-gray-700 mb-16" />

      {/* ── Voice AI Pipeline ── */}
      <motion.div {...fadeUp(0.16)} id="pipeline" className="mb-16 scroll-mt-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
          Voice AI Pipeline
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          End-to-end flow from microphone input to AI interviewer voice response
        </p>

        {/* Flow diagram */}
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

        {/* Comparison table */}
        <div className="mt-10">
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
                className="mt-0.5 shrink-0 select-none text-5xl font-extrabold leading-none tabular-nums text-gray-100 transition-colors group-hover:text-violet-100 dark:text-gray-800 dark:group-hover:text-violet-950"
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="border-l-2 border-transparent pl-5 transition-colors group-hover:border-violet-200 dark:group-hover:border-violet-800">
                <p className="pt-2 leading-7 text-gray-600 dark:text-gray-400">{item}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </motion.div>

      <div className="border-t border-gray-200 dark:border-gray-700 mb-16" />

      {/* ── Tech Stack by Category ── */}
      <motion.div {...fadeUp(0.2)} id="tech" className="mb-16 scroll-mt-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-8">
          Tech Stack
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      <div className="border-t border-gray-200 dark:border-gray-700 mb-16" />

      {/* ── Scale to Product ── */}
      <motion.div {...fadeUp(0.22)} id="scale" className="mb-16 scroll-mt-20">
        <div className="rounded-3xl border border-violet-100 dark:border-violet-900/40 bg-gradient-to-b from-violet-50/60 via-violet-50/20 to-transparent dark:from-violet-950/20 dark:via-violet-950/10 dark:to-transparent p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 dark:text-violet-500 mb-3">
            From Prototype to Platform
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            How to Scale This to a Product
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl leading-7 mb-10">
            IntervAI ships as a feature-complete product. Here&apos;s the architecture needed to
            evolve it from a solo platform into a distributed, multi-tenant SaaS serving 100k+
            active users — without changing the interface.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SCALE_PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl border border-white/80 bg-white/70 p-5 backdrop-blur-sm transition-all duration-300 hover:border-violet-200 hover:shadow-sm dark:border-gray-700/60 dark:bg-gray-900/50 dark:hover:border-violet-800"
              >
                <div className="mb-3 flex items-start gap-3">
                  <span className="shrink-0 text-xl">{pillar.icon}</span>
                  <div>
                    <h3 className="mb-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {pillar.title}
                    </h3>
                    <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-semibold text-violet-700 dark:bg-violet-900/40 dark:text-violet-400">
                      {pillar.tag}
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── CTA ── */}
      {(project.website || project.github) && (
        <motion.div
          {...fadeUp(0.24)}
          className="border-t border-gray-200 dark:border-gray-700 pt-12"
        >
          <p className="mb-5 text-sm text-gray-400 dark:text-gray-500">Explore the project</p>
          <div className="flex flex-wrap gap-4">
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-violet-700 hover:shadow-md"
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
