'use client';

import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
];

function burst() {
  const pink = '#de1d8d';
  const white = '#ffffff';
  const shared = { startVelocity: 38, spread: 90, ticks: 80, zIndex: 9999 };

  confetti({
    ...shared,
    particleCount: 80,
    origin: { x: 0.3, y: 0.55 },
    colors: [pink, white, '#f9a8d4'],
  });
  confetti({
    ...shared,
    particleCount: 80,
    origin: { x: 0.7, y: 0.55 },
    colors: [pink, white, '#f9a8d4'],
  });

  setTimeout(() => {
    confetti({
      ...shared,
      particleCount: 40,
      origin: { x: 0.5, y: 0.45 },
      startVelocity: 50,
      spread: 120,
      colors: [pink, '#fce7f3'],
    });
  }, 180);
}

export default function EasterEgg() {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    let sequence: string[] = [];

    const onKey = (e: KeyboardEvent) => {
      sequence = [...sequence, e.key].slice(-KONAMI.length);

      const matched =
        sequence.length === KONAMI.length && sequence.every((k, i) => k === KONAMI[i]);

      if (matched) {
        setTriggered(true);
        burst();
        sequence = [];
        setTimeout(() => setTriggered(false), 4000);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <AnimatePresence>
      {triggered && (
        <motion.div
          key="egg"
          initial={{ opacity: 0, scale: 0.7, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          className="pointer-events-none fixed inset-0 z-[9998] flex items-center justify-center"
        >
          <div className="relative rounded-2xl border border-[#de1d8d]/40 bg-black/90 px-10 py-8 text-center shadow-[0_0_60px_rgba(222,29,141,0.35)] backdrop-blur-md">
            <div className="mb-2 text-5xl">🎉</div>
            <p className="text-2xl font-extrabold tracking-tight text-white">you found me!</p>
            <p className="mt-1 text-sm text-[#de1d8d]">↑↑↓↓←→←→ — the Konami code still works</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
