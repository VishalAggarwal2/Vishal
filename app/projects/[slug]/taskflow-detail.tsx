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

const FEATURES = [
  {
    emoji: '🖱️',
    title: 'Drag-and-Drop Boards',
    desc: 'Kanban boards with smooth drag-and-drop across columns. Optimistic UI updates give instant feedback — the server confirms asynchronously without blocking the interaction.',
  },
  {
    emoji: '⚡',
    title: 'Real-Time Collaboration',
    desc: 'WebSocket-powered live updates. When a teammate moves a card, every board in every open tab reflects it in under 50ms — no polling, no refresh.',
  },
  {
    emoji: '🔐',
    title: 'Role-Based Access Control',
    desc: 'Admin, member, and viewer roles with granular permissions. Each role sees exactly what it should — scoped at both the API and the frontend layer.',
  },
  {
    emoji: '🤖',
    title: 'Workflow Automation',
    desc: 'Rule-based triggers: when a task moves to Done, auto-assign the next one. Reduces manual status updates and keeps the board accurate without team overhead.',
  },
  {
    emoji: '📊',
    title: 'Team Analytics',
    desc: 'Velocity tracking, completion rates, and workload distribution across team members — surfaced directly from the live task graph.',
  },
  {
    emoji: '🌙',
    title: 'Dark Mode + Responsive',
    desc: 'Fully responsive from mobile to desktop. Dark mode with system preference detection and manual toggle — every pixel adapts.',
  },
];

const TECH_GROUPS = [
  {
    label: 'Frontend',
    color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    items: ['React', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    color: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
    items: ['Node.js', 'Express', 'Socket.io'],
  },
  {
    label: 'Database',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    items: ['MongoDB'],
  },
  {
    label: 'Auth & Access',
    color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
    items: ['JWT', 'RBAC'],
  },
];

const SCALE_PILLARS = [
  {
    icon: '📜',
    title: 'Event Sourcing for Board State',
    tag: 'Immutable Event Log',
    desc: 'All board mutations persisted as immutable events — TaskCreated, TaskMoved, StatusChanged, AssigneeUpdated. Current board state is a projection derived from the event log on read, never stored directly. Enables time-travel debugging, full audit trails, and event replay for conflict resolution without distributed locks.',
  },
  {
    icon: '⚡',
    title: 'CQRS for Real-Time Board Rendering',
    tag: 'Read/Write Separation',
    desc: 'Write path: drag-drop commands hit MongoDB primary via command handlers. Read path: board state pre-computed as materialized snapshots in Redis — sub-10ms board loads at any scale. Cache invalidated on every mutation via write-through strategy. Stale-while-revalidate for offline-tolerant clients.',
  },
  {
    icon: '🔀',
    title: 'CRDTs for Concurrent Operations',
    tag: 'Conflict-Free Replication',
    desc: 'Task position modeled as a Last-Write-Wins register with Lamport timestamps — concurrent drag operations from two users converge deterministically without server arbitration or OT algorithms. No pessimistic row locking, no "last save wins" glitches, no extra round-trips to resolve conflicts.',
  },
  {
    icon: '📡',
    title: 'Horizontally Scaled WebSocket Layer',
    tag: 'Redis Pub/Sub Cluster',
    desc: 'Socket.io scaled across N Node.js pods using the Redis adapter. Any pod can serve any client after the pub/sub broadcast — no sticky session requirement. Workspace-scoped rooms enforce tenant isolation at the fanout layer. Redis Streams buffer events during pod restarts for zero message loss.',
  },
  {
    icon: '🏢',
    title: 'Multi-Tenant SaaS with Zero-Trust RLS',
    tag: 'Row-Level Security',
    desc: 'Shared PostgreSQL schema with Row-Level Security policies enforcing workspace boundaries at the DB layer. workspace_id embedded in signed JWTs, verified at both API gateway and DB level — no application-layer misconfiguration can expose cross-tenant data. One cluster serves thousands of isolated workspaces.',
  },
  {
    icon: '📮',
    title: 'Async Job Queue with Dead-Letter Handling',
    tag: 'BullMQ + Redis',
    desc: 'Non-blocking work — email notifications, webhook deliveries, digest emails, integration syncs — processed via BullMQ priority queues. Failed jobs land in dead-letter queues with exponential backoff and configurable retry limits. Idempotency keys on all job payloads prevent duplicate side effects during network partitions.',
  },
  {
    icon: '🔌',
    title: 'Webhook Infrastructure at Scale',
    tag: 'At-Least-Once Delivery',
    desc: 'Outbound webhooks to Slack, GitHub, and Zapier delivered with at-least-once guarantees. Delivery receipts tracked in the event log for SLA auditing. Outbound circuit breakers prevent a slow downstream (e.g. Slack outage) from clogging the delivery queue. Payload signing via HMAC-SHA256 for endpoint authentication.',
  },
  {
    icon: '🔭',
    title: 'Observability + SLO Enforcement',
    tag: 'OpenTelemetry + Grafana',
    desc: 'Distributed traces across all Node.js services via W3C TraceContext. SLOs: WebSocket message delivery p99 < 50ms, board render p95 < 150ms, task mutation durability 99.99%. Grafana dashboards track active WebSocket connections, Redis memory pressure, MongoDB replication lag, and BullMQ queue depth.',
  },
];

export default function TaskFlowDetail({ project }: { project: Project }) {
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
        <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 mb-5">
          {project.role}
        </span>
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl md:text-7xl mb-5">
          TaskFlow
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 font-light max-w-2xl leading-8">
          Real-time task management{' '}
          <em className="not-italic font-medium text-emerald-600 dark:text-emerald-400">
            without the Jira bloat
          </em>{' '}
          — collaborative, fast, and built for small teams who ship.
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
              className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:border-emerald-300 hover:shadow-md dark:hover:border-emerald-700"
            >
              <span className="text-2xl mb-4 block">{f.emoji}</span>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-6">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="border-t border-gray-200 dark:border-gray-700 mb-16" />

      {/* ── What I Built ── */}
      <motion.div {...fadeUp(0.16)} className="mb-16 max-w-3xl">
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
      <motion.div {...fadeUp(0.18)} className="mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-8">
          Tech Stack
        </p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

      <div className="border-t border-gray-200 dark:border-gray-700 mb-16" />

      {/* ── Scale to Product ── */}
      <motion.div {...fadeUp(0.2)} className="mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
          From Prototype to Platform
        </p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          How to Scale This to a Product
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl leading-7 mb-10">
          TaskFlow proves the real-time collaboration thesis. Here&apos;s how you&apos;d evolve it
          from a team tool into a multi-tenant SaaS platform handling thousands of concurrent
          workspace users — with the fault tolerance and observability to match Linear or Notion at
          scale.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SCALE_PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-gray-200 dark:border-gray-700 p-5 transition-all duration-300 hover:border-emerald-300 hover:shadow-sm dark:hover:border-emerald-700"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-xl shrink-0">{pillar.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1.5">
                    {pillar.title}
                  </h3>
                  <span className="rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 text-[10px] font-semibold">
                    {pillar.tag}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-6">{pillar.desc}</p>
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
