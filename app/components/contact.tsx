'use client';

import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { IoCopyOutline, IoCheckmarkOutline } from 'react-icons/io5';

const ContactOrb = dynamic(() => import('./contact-orb'), { ssr: false, loading: () => null });

const EMAIL = 'vishalaggar230@gmail.com';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* fallback for non-secure contexts */
      const el = document.createElement('textarea');
      el.value = EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section className="relative h-screen w-screen py-10 px-12 md:px-32 xl:px-36 dark:bg-black dark:text-white bg-white text-black">
      <ContactOrb />
      <div className="flex flex-col justify-evenly h-5/6">
        <span className="text-3xl md:text-6xl xl:text-8xl">
          Let&apos;s make something <br /> great together
        </span>

        <motion.button
          onClick={copy}
          className="group flex flex-wrap items-center justify-end gap-3 text-3xl md:text-6xl xl:text-8xl"
          whileHover={{ x: -6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          aria-label="Copy email address"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                className="flex items-center gap-2 text-[#de1d8d]"
              >
                <IoCheckmarkOutline className="shrink-0 text-3xl md:text-5xl" />
                <span className="text-2xl md:text-5xl">Copied!</span>
              </motion.span>
            ) : (
              <motion.span
                key="email"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-w-0 flex-wrap items-center gap-3"
              >
                <span className="opacity-40 group-hover:opacity-100 transition-opacity shrink-0">
                  hi@
                </span>
                <span className="min-w-0 break-all underline decoration-[#de1d8d] underline-offset-4 decoration-2 group-hover:text-[#de1d8d] transition-colors">
                  {EMAIL}
                </span>
                <IoCopyOutline className="shrink-0 text-2xl md:text-4xl opacity-0 group-hover:opacity-60 transition-opacity" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </section>
  );
}
