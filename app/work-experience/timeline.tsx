'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { experiences } from './constants';

export default function Timeline() {
  const [active, setActive] = useState(0);
  const exp = experiences[active];

  return (
    <div className="pb-20">
      {/* ── Mobile: horizontal tab strip ── */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-1 md:hidden">
        {experiences.map((e, i) => (
          <button
            key={e.id}
            onClick={() => setActive(i)}
            className="shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200"
            style={
              active === i
                ? { borderColor: e.color, color: e.color, backgroundColor: e.color + '15' }
                : { borderColor: '#e5e7eb', color: '#6b7280' }
            }
          >
            {e.company}
          </button>
        ))}
      </div>

      {/* ── Desktop: split panel ── */}
      <div className="hidden md:grid md:grid-cols-[260px_1fr] md:gap-0">
        {/* Left sidebar */}
        <div className="border-r border-gray-100 dark:border-gray-800 pr-8">
          <div className="sticky top-28 space-y-1">
            {experiences.map((e, i) => (
              <button
                key={e.id}
                onClick={() => setActive(i)}
                className="group relative flex w-full flex-col items-start rounded-xl px-4 py-4 text-left transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                {/* Active indicator bar */}
                <motion.div
                  className="absolute left-0 top-2 h-[calc(100%-16px)] w-0.5 rounded-full"
                  animate={{ backgroundColor: active === i ? e.color : 'transparent' }}
                  transition={{ duration: 0.2 }}
                />

                <span
                  className="text-base font-semibold transition-colors duration-200"
                  style={{ color: active === i ? e.color : undefined }}
                >
                  <span className={active === i ? '' : 'text-gray-800 dark:text-gray-200'}>
                    {e.company}
                  </span>
                </span>
                <span className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{e.period}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right content panel — desktop only */}
        <div className="pl-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <DetailPanel exp={exp} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile: content panel ── */}
      <div className="md:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <DetailPanel exp={exp} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function DetailPanel({ exp }: { exp: (typeof experiences)[number] }) {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          {exp.period}
        </span>

        <h2 className="text-4xl font-black tracking-tight md:text-5xl" style={{ color: exp.color }}>
          {exp.company}
        </h2>

        <p className="mt-2 text-base font-medium text-gray-500 dark:text-gray-400">{exp.role}</p>
      </div>

      {/* Divider */}
      <div className="mb-8 h-px w-full bg-gray-100 dark:bg-gray-800" />

      {/* Description */}
      <ul className="mb-8 space-y-4">
        {exp.description.map((point) => (
          <li key={point} className="flex gap-3">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: exp.color }}
              aria-hidden
            />
            <span className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
              {point}
            </span>
          </li>
        ))}
      </ul>

      {/* Tech tags */}
      <div className="mb-8 flex flex-wrap gap-2">
        {exp.tech.map((tag) => (
          <span
            key={tag}
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: exp.color + '15',
              color: exp.color,
              border: `1px solid ${exp.color}30`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Visit link */}
      <a
        href={exp.link}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-80"
        style={{ backgroundColor: exp.color }}
      >
        Visit {exp.company}
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M2 10L10 2M10 2H5M10 2V7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}
