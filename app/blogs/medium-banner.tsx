'use client';

import { motion } from 'framer-motion';

/* Medium's canonical "M" SVG path */
function MediumIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1043.63 592.71" className={className} fill="currentColor" aria-hidden="true">
      <path d="M588.67 296.35c0 163.67-131.78 296.35-294.33 296.35S0 460.02 0 296.35 131.78 0 294.34 0s294.33 132.68 294.33 296.35M911.56 296.35c0 154.06-65.89 278.93-147.17 278.93s-147.17-124.87-147.17-278.93 65.88-278.93 147.16-278.93 147.17 124.87 147.17 278.93M1043.63 296.35c0 138.17-23.17 250.28-51.76 250.28s-51.75-112.11-51.75-250.28 23.17-250.28 51.75-250.28 51.76 112.1 51.76 250.28" />
    </svg>
  );
}

export default function MediumBanner() {
  return (
    <motion.a
      href="https://medium.com/@vishalaggar230"
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="group inline-flex shrink-0 items-center gap-2.5 rounded-xl border border-gray-800 bg-black px-4 py-2.5 shadow-sm transition-all hover:border-[#de1d8d] hover:shadow-[0_0_16px_rgba(222,29,141,0.25)] dark:border-gray-700 dark:bg-black"
    >
      <MediumIcon className="h-4 w-4 shrink-0 text-gray-400 transition-colors group-hover:text-[#de1d8d]" />
      <span className="text-sm font-semibold text-gray-300 transition-colors group-hover:text-white">
        Read on Medium
      </span>
      <span className="text-gray-600 transition-colors group-hover:text-[#de1d8d]">→</span>
    </motion.a>
  );
}
