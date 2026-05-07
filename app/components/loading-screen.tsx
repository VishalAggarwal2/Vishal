'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LETTERS_FIRST = 'Vishal'.split('');
const LETTERS_LAST = 'Aggarwal'.split('');

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const t = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
    }, 2000);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black"
        >
          {/* Initials badge */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#de1d8d]/30 bg-[#de1d8d]/10"
            style={{ boxShadow: '0 0 32px rgba(222,29,141,0.2)' }}
          >
            <span className="text-2xl font-black text-[#de1d8d]">VA</span>
          </motion.div>

          {/* Name — staggered letters */}
          <div className="flex items-baseline gap-3 overflow-hidden">
            <div className="flex">
              {LETTERS_FIRST.map((char, i) => (
                <motion.span
                  key={`f-${i}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.25 + i * 0.055,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <div className="flex">
              {LETTERS_LAST.map((char, i) => (
                <motion.span
                  key={`l-${i}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.55 + i * 0.055,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="text-4xl font-extrabold tracking-tight text-[#de1d8d] sm:text-5xl"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="mt-2 text-sm tracking-widest text-gray-500 uppercase"
          >
            Full Stack Developer
          </motion.p>

          {/* Progress bar */}
          <div className="mt-10 h-[2px] w-40 overflow-hidden rounded-full bg-[#1c1c1c]">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
              className="h-full rounded-full bg-[#de1d8d]"
              style={{ boxShadow: '0 0 10px #de1d8daa' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
