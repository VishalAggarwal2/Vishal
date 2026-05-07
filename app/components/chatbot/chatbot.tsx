'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { MdOutlineSmartToy } from 'react-icons/md';

/* ── data ──────────────────────────────────────────────── */

const QUESTIONS = [
  { label: '👋 Who is Vishal?', key: 'about' },
  { label: '💼 Work Experience', key: 'experience' },
  { label: '🚀 Projects', key: 'projects' },
  { label: '🛠️ Tech Stack', key: 'stack' },
  { label: '📝 Blogs', key: 'blogs' },
  { label: '📬 Contact', key: 'contact' },
] as const;

type Key = (typeof QUESTIONS)[number]['key'];

const ANSWERS: Record<Key, { title: string; body: string }> = {
  about: {
    title: '👋 About Vishal',
    body: 'Vishal Aggarwal is a Software Engineer & Product Manager based in India.\n\n• Currently at Increff (B2B retail SaaS)\n• Expert in Java, Go & distributed systems\n• Product thinker who bridges eng and business\n• Published technical writer — 10+ articles on Medium',
  },
  experience: {
    title: '💼 Work Experience',
    body: '🏢 Increff — Software Engineer (Current)\n    Java · Spring Boot · Microservices\n\n🏥 Bajaj Finserv Health\n    REST → GraphQL · 40% fewer API calls\n\n🛍️ Heydo Tech\n    Apni Mandi (MERN + Spring Boot)\n    Product management & roadmap\n\n🎓 LNMIIT — Phoenix Portal\n    Platform for 10,000+ students',
  },
  projects: {
    title: '🚀 Notable Projects',
    body: '⚡ TaskFlow — taskflow.apnimandi.us\n    Real-time tasks, drag-and-drop, teams\n\n🔧 Go Garbage Collector\n    Mark-and-sweep GC from scratch in Go\n\n🌐 Phoenix Portal — phoenix.lnmiit.ac.in\n    Student platform for 10K+ users\n\n🔄 CI/CD Pipeline\n    Jenkins + ArgoCD + Prometheus/Grafana\n\n🛒 Apni Mandi\n    Full-stack marketplace, JWT auth & RBAC',
  },
  stack: {
    title: '🛠️ Tech Stack',
    body: 'Backend     Java · Spring Boot · Go · Node.js\nFrontend    React · Next.js · TypeScript\nDatabases   PostgreSQL · Redis · MongoDB\nDevOps      Docker · K8s · Jenkins · AWS\nMessaging   Apache Kafka\nMonitoring  Prometheus · Grafana',
  },
  blogs: {
    title: '📝 Technical Blogs',
    body: 'Deep articles published on Medium:\n\n• Multithreading in Java\n• Distributed Systems\n• API Latency 200ms → 20ms\n• Go: Goroutines, Channels & GC\n• Concurrent Control in Dist. Systems\n• Operating System Internals\n• System Design: Chat, Drive, Autocomplete\n\n→ medium.com/@vishalaggar230',
  },
  contact: {
    title: '📬 Get in Touch',
    body: '📧 vishalaggar230@gmail.com\n\n💼 linkedin.com/in/vishal-aggarwal-414730248\n\n🐙 github.com/VishalAggarwal2\n\n✍️ medium.com/@vishalaggar230',
  },
};

/* ── bubble ─────────────────────────────────────────────── */

interface Msg {
  from: 'user' | 'bot';
  text: string;
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.from === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#de1d8d] text-white">
          <MdOutlineSmartToy size={15} />
        </div>
      )}
      <div
        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
          isUser
            ? 'rounded-br-none bg-[#de1d8d] font-medium text-white'
            : 'rounded-bl-none bg-[#1c1c1c] text-gray-200'
        }`}
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {msg.text}
      </div>
    </motion.div>
  );
}

/* ── main ───────────────────────────────────────────────── */

const WELCOME: Msg = {
  from: 'bot',
  text: "Hi! I'm Vishal's portfolio assistant 👋\nTap any question below to learn more about him.",
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const bottomRef = useRef<HTMLDivElement>(null);

  /* auto-scroll to latest message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  function ask(key: Key, label: string) {
    const a = ANSWERS[key];
    setMsgs((prev) => [
      ...prev,
      { from: 'user', text: label },
      { from: 'bot', text: `${a.title}\n\n${a.body}` },
    ]);
  }

  return (
    <>
      {/* ── floating button ─────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* pulse rings */}
        <motion.span
          className="absolute inset-0 rounded-full bg-[#de1d8d]"
          animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.span
          className="absolute inset-0 rounded-full bg-[#de1d8d]"
          animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
        />

        {/* label tooltip */}
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: 1.5 }}
              className="pointer-events-none absolute -top-9 right-0 whitespace-nowrap rounded-full border border-[#de1d8d]/30 bg-black px-3 py-1 text-[11px] font-medium text-[#de1d8d]"
            >
              Ask about Vishal ✦
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen((o) => !o)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#de1d8d] shadow-[0_0_24px_rgba(222,29,141,0.5)]"
          aria-label="Toggle portfolio assistant"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <IoClose size={22} className="text-white" />
              </motion.span>
            ) : (
              <motion.span
                key="bot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MdOutlineSmartToy size={24} className="text-white" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── chat panel ──────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed bottom-[88px] right-4 z-50 flex w-[calc(100vw-2rem)] max-w-[370px] flex-col overflow-hidden rounded-2xl border border-[#de1d8d]/20 bg-[#0d0d0d] shadow-[0_8px_40px_rgba(222,29,141,0.18)] sm:right-6"
            style={{ height: 'min(560px, calc(100vh - 112px))' }}
          >
            {/* header */}
            <div className="flex shrink-0 items-center gap-3 border-b border-[#de1d8d]/15 bg-black px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#de1d8d] shadow-[0_0_12px_rgba(222,29,141,0.6)]">
                <MdOutlineSmartToy size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">Portfolio Assistant</p>
                <p className="flex items-center gap-1.5 text-[11px] text-gray-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#de1d8d]" />
                  Vishal Aggarwal · Always online
                </p>
              </div>
              <button
                onClick={() => setMsgs([WELCOME])}
                className="rounded-lg px-2.5 py-1 text-[11px] font-medium text-gray-500 hover:bg-white/5 hover:text-[#de1d8d]"
              >
                Reset
              </button>
            </div>

            {/* ── messages — this is the ONLY scrollable area ── */}
            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
              {msgs.map((m, i) => (
                <Bubble key={i} msg={m} />
              ))}
              <div ref={bottomRef} />
            </div>

            {/* ── quick questions — OUTSIDE scroll, always visible ── */}
            <div className="shrink-0 border-t border-[#de1d8d]/10 bg-[#0d0d0d] px-3 py-3">
              <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-gray-600">
                Quick questions
              </p>
              <div className="flex flex-wrap gap-1.5">
                {QUESTIONS.map((q) => (
                  <motion.button
                    key={q.key}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => ask(q.key, q.label)}
                    className="rounded-full border border-[#de1d8d]/25 bg-[#de1d8d]/8 px-2.5 py-1 text-[11px] font-medium text-[#de1d8d] transition-colors hover:border-[#de1d8d]/60 hover:bg-[#de1d8d]/15"
                  >
                    {q.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
