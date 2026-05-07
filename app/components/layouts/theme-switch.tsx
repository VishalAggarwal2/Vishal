'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const handleToggle = () => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';

    /* set CSS vars for radial origin */
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      const x = Math.round(r.left + r.width / 2);
      const y = Math.round(r.top + r.height / 2);
      document.documentElement.style.setProperty('--vt-x', `${x}px`);
      document.documentElement.style.setProperty('--vt-y', `${y}px`);
    }

    /* View Transitions API — radial reveal */
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (
        document as Document & { startViewTransition: (cb: () => void) => void }
      ).startViewTransition(() => {
        flushSync(() => setTheme(next));
      });
    } else {
      setTheme(next);
    }
  };

  return (
    <motion.button
      ref={btnRef}
      aria-label="Toggle Dark Mode"
      type="button"
      whileTap={{ scale: 0.7, rotate: 360, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.2 }}
      onClick={handleToggle}
    >
      {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
        <BsSunFill size={24} />
      ) : (
        <BsMoonFill size={24} />
      )}
    </motion.button>
  );
};

export default ThemeSwitch;
