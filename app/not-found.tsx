'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

function WireframeSphere({ size = 220 }: { size?: number }) {
  const angles = [0, 30, 60, 90, 120, 150];
  return (
    <div style={{ perspective: size * 4, width: size, height: size }}>
      <motion.div
        style={{ width: size, height: size, transformStyle: 'preserve-3d', position: 'relative' }}
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {angles.map((angle) => (
          <div
            key={angle}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1px solid rgba(222,29,141,0.35)',
              transform: `rotateX(${angle}deg)`,
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1.5px solid rgba(222,29,141,0.55)',
          }}
        />
      </motion.div>
    </div>
  );
}

const TERMINAL_LINES = [
  { text: '$ cd /this/page', error: false },
  { text: 'bash: /this/page: No such file or directory', error: true },
  { text: '$ ls routes/', error: false },
  { text: '→  /  ·  /projects  ·  /about  ·  /uses', error: false },
  { text: '$ echo "maybe try one of these?"', error: false },
  { text: 'maybe try one of these?', error: false },
];

function TerminalLine({ text, error, delay }: { text: string; error: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay, ease: 'easeOut' }}
      className={`font-mono text-xs sm:text-sm leading-6 ${
        error ? 'text-rose-400 dark:text-rose-400' : 'text-gray-500 dark:text-gray-400'
      }`}
    >
      {text}
    </motion.div>
  );
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center px-6">
      <div className="flex w-full max-w-3xl flex-col items-center gap-14 lg:flex-row lg:items-center lg:gap-20">
        {/* Left — text content */}
        <div className="flex-1 space-y-8">
          {/* 404 badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-3"
          >
            <span className="inline-block rounded-full border border-[rgba(222,29,141,0.3)] bg-[rgba(222,29,141,0.06)] px-3 py-1 text-xs font-semibold tracking-widest text-[#de1d8d]">
              404
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
              Route not found.
            </h1>
            <p className="text-base text-gray-500 dark:text-gray-400 leading-7">
              This page doesn&apos;t exist — or was moved to a place the filesystem can&apos;t
              reach.
            </p>
          </motion.div>

          {/* Terminal block */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 px-5 py-5 space-y-1"
          >
            <div className="flex items-center gap-1.5 mb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
              <span className="ml-2 text-[11px] text-gray-400 dark:text-gray-600 font-mono">
                terminal — bash
              </span>
            </div>
            {TERMINAL_LINES.map((line, i) => (
              <TerminalLine key={i} text={line.text} error={line.error} delay={0.25 + i * 0.18} />
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 1.4 }}
              className="inline-block h-4 w-1.5 bg-[#de1d8d] rounded-sm mt-1"
            />
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
                  i === 0
                    ? 'bg-gray-900 text-white hover:opacity-80 dark:bg-gray-100 dark:text-gray-900'
                    : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                {link.label}
                {i === 0 && <span aria-hidden>→</span>}
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Right — sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative hidden lg:flex items-center justify-center"
        >
          {/* Glow behind sphere */}
          <div className="absolute h-48 w-48 rounded-full bg-[rgba(222,29,141,0.08)] blur-3xl" />
          <WireframeSphere size={220} />
          {/* Floating label */}
          <motion.div
            animate={{ y: [-4, 4] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[rgba(222,29,141,0.25)] bg-[rgba(222,29,141,0.06)] px-3 py-1 text-[11px] font-medium text-[#de1d8d]"
          >
            lost in the void
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
