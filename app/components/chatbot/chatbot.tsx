'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { MdOutlineSmartToy } from 'react-icons/md';

/* ─── data ──────────────────────────────────────────────────────────── */

const MAIN_QUESTIONS = [
  { label: '👋 Who is Vishal?', key: 'about' },
  { label: '💼 Work Experience', key: 'experience' },
  { label: '🚀 Projects', key: 'projects' },
  { label: '🛠️ Tech Stack', key: 'stack' },
  { label: '📝 Blogs', key: 'blogs' },
  { label: '📬 Contact', key: 'contact' },
  { label: '👔 Open to roles?', key: 'hiring' },
];

const FUN_QUESTIONS = [
  { label: '🎮 Hobbies', key: 'hobbies' },
  { label: '📍 Location', key: 'location' },
  { label: '🎯 What motivates you?', key: 'motivation' },
  { label: '☕ Favourite language?', key: 'fav_lang' },
];

const ANSWERS: Record<string, { title: string; body: string }> = {
  about: {
    title: '👋 About Vishal',
    body: 'Vishal Aggarwal is a Software Engineer & Product Manager based in India.\n\n• Currently at Increff (B2B retail SaaS)\n• Expert in Java, Go & distributed systems\n• Product thinker who bridges eng and business\n• Published technical writer — 10+ articles on Medium',
  },
  experience: {
    title: '💼 Work Experience',
    body: '🏢 Increff — Software Engineer (Current)\n    Java · Spring Boot · Microservices\n\n🏥 Bajaj Finserv Health\n    REST → GraphQL · 40% fewer API calls\n\n🛍️ Heydo Tech\n    Apni Mandi (MERN + Spring Boot)\n\n🎓 LNMIIT — Phoenix Portal\n    Platform for 10,000+ students',
  },
  projects: {
    title: '🚀 Notable Projects',
    body: '⚡ TaskFlow — taskflow.apnimandi.us\n🔧 Go Garbage Collector (from scratch)\n🌐 Phoenix Portal — 10K+ users\n🔄 CI/CD Pipeline (Jenkins + ArgoCD)\n🛒 Apni Mandi — full-stack marketplace',
  },
  stack: {
    title: '🛠️ Tech Stack',
    body: 'Backend     Java · Spring Boot · Go · Node.js\nFrontend    React · Next.js · TypeScript\nDatabases   PostgreSQL · Redis · MongoDB\nDevOps      Docker · K8s · Jenkins · AWS\nInfra       Kafka · Prometheus · Grafana',
  },
  blogs: {
    title: '📝 Technical Blogs',
    body: 'Deep articles on Medium:\n\n• Multithreading in Java\n• Distributed Systems\n• API Latency 200ms → 20ms\n• Go: Goroutines, Channels & GC\n• OS Internals\n• System Design: Chat, Drive, Autocomplete\n\n→ medium.com/@vishalaggar230',
  },
  contact: {
    title: '📬 Get in Touch',
    body: '📧 vishalaggar230@gmail.com\n💼 linkedin.com/in/vishal-aggarwal-414730248\n🐙 github.com/VishalAggarwal2\n✍️  medium.com/@vishalaggar230',
  },
  hiring: {
    title: '👔 Open to Roles?',
    body: 'Yes! Actively looking for:\n\n• Backend / Full-Stack Engineering roles\n• Product Engineering (hybrid PM + SWE)\n• Open to India or remote opportunities\n• Graduating May 2026 (LNMIIT)\n\n📧 vishalaggar230@gmail.com',
  },
  hobbies: {
    title: '🎮 Hobbies',
    body: "When I'm not coding:\n\n• 📚 Reading system design & product books\n• ✍️ Writing technical articles on Medium\n• 🎯 Competitive programming\n• 🏏 Cricket & badminton\n• 🎮 Occasional gaming",
  },
  location: {
    title: '📍 Location',
    body: '📍 Jaipur, India\n🎓 LNMIIT — LNM Institute of Information Technology\n\nOpen to relocating for the right opportunity, and fully comfortable with remote work.',
  },
  motivation: {
    title: '🎯 What Motivates Vishal?',
    body: '"The best products are built by people who can think like a user, reason like an engineer, and communicate like a strategist."\n\nI love the loop: understand the problem → design the system → build it → measure impact. That loop never gets old.',
  },
  fav_lang: {
    title: '☕ Favourite Language?',
    body: 'Java for robustness on large systems — Spring Boot makes backend engineering structured and scalable.\n\nGo for the elegance of concurrency — goroutines + channels are a joy.\n\nHonest answer? Whichever language ships the product fastest without becoming a liability 😄',
  },
  /* follow-up detail answers */
  taskflow: {
    title: '⚡ TaskFlow',
    body: 'Real-time task management built with Go.\n\n• Drag-and-drop kanban boards\n• Real-time updates via WebSockets\n• Team collaboration & RBAC\n• Live at taskflow.apnimandi.us',
  },
  gogc: {
    title: '🔧 Go Garbage Collector',
    body: 'Built a mark-and-sweep GC from scratch in Go.\n\n• Tri-colour marking algorithm\n• Stop-the-world pause minimisation\n• Visual heap traversal simulation\n• github.com/VishalAggarwal2/GarbageCollectorSimulator',
  },
  phoenix: {
    title: '🌐 Phoenix Portal',
    body: 'Student platform at LNMIIT — 10,000+ users.\n\n• Full-stack React + Node.js\n• Multithreaded backend for peak loads\n• Led product scoping & architecture\n• phoenix.lnmiit.ac.in',
  },
  bajaj: {
    title: '🏥 Bajaj Finserv Health',
    body: 'Full-Stack Developer Intern.\n\n• REST → GraphQL migration: −40% API calls\n• CI/CD with Jenkins + ArgoCD\n• Prometheus + Grafana monitoring stack\n• Reduced MTTD for prod incidents',
  },
  heydo: {
    title: '🛍️ Heydo Tech — Apni Mandi',
    body: 'Software Developer Intern (US client).\n\n• MERN stack + Java Spring Boot\n• JWT auth & RBAC from scratch\n• Buyer/seller/admin user journey design\n• Logging: Winston, Morgan, PM2',
  },
};

const FOLLOW_UPS: Record<string, { label: string; key: string }[]> = {
  projects: [
    { label: '⚡ TaskFlow', key: 'taskflow' },
    { label: '🔧 Go GC', key: 'gogc' },
    { label: '🌐 Phoenix Portal', key: 'phoenix' },
  ],
  experience: [
    { label: '🏥 Bajaj Finserv', key: 'bajaj' },
    { label: '🛍️ Heydo Tech', key: 'heydo' },
  ],
  about: [
    { label: '🎯 Motivation', key: 'motivation' },
    { label: '👔 Open to roles?', key: 'hiring' },
  ],
  stack: [{ label: '☕ Fav language?', key: 'fav_lang' }],
  hiring: [{ label: '📬 Contact', key: 'contact' }],
  taskflow: [
    { label: '🔧 Go GC details', key: 'gogc' },
    { label: '🌐 Phoenix Portal', key: 'phoenix' },
  ],
  bajaj: [
    { label: '🛍️ Heydo Tech', key: 'heydo' },
    { label: '🔙 All experience', key: 'experience' },
  ],
};

/* ─── helpers ───────────────────────────────────────────────────────── */

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/* ─── types ─────────────────────────────────────────────────────────── */

interface Msg {
  from: 'user' | 'bot';
  text: string;
  at: Date;
  id: number;
}

/* ─── sub-components ─────────────────────────────────────────────────── */

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.2 }}
      className="flex items-end gap-2"
    >
      <div className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#de1d8d]">
        <MdOutlineSmartToy size={15} className="text-white" />
      </div>
      <div className="rounded-2xl rounded-bl-none bg-gray-100 px-4 py-3 dark:bg-[#1c1c1c]">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-[#de1d8d]"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* animated bot text — lines stagger in */
function BotText({ text, animate }: { text: string; animate: boolean }) {
  const lines = text.split('\n');
  return (
    <div style={{ whiteSpace: 'pre-wrap' }}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          initial={animate ? { opacity: 0, x: -6 } : { opacity: 1 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.18, delay: animate ? i * 0.035 : 0 }}
          style={{ display: 'block', minHeight: line === '' ? '0.6em' : undefined }}
        >
          {line}
        </motion.span>
      ))}
    </div>
  );
}

function Bubble({ msg, isNewest }: { msg: Msg; isNewest: boolean }) {
  const isUser = msg.from === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}
    >
      <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser && (
          <div className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#de1d8d]">
            <MdOutlineSmartToy size={15} className="text-white" />
          </div>
        )}
        <div
          className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
            isUser
              ? 'rounded-br-none bg-[#de1d8d] font-medium text-white'
              : 'rounded-bl-none bg-gray-100 text-gray-800 dark:bg-[#1c1c1c] dark:text-gray-200'
          }`}
        >
          {isUser ? msg.text : <BotText text={msg.text} animate={isNewest} />}
        </div>
      </div>
      <span className={`text-[10px] text-gray-400 dark:text-gray-600 ${isUser ? 'mr-1' : 'ml-9'}`}>
        {formatTime(msg.at)}
      </span>
    </motion.div>
  );
}

/* ─── main ───────────────────────────────────────────────────────────── */

let msgIdCounter = 1;

const makeWelcome = (): Msg => ({
  from: 'bot',
  text: "Hi! I'm Vishal's portfolio assistant 👋\nTap any question below to learn more about him.",
  at: new Date(),
  id: msgIdCounter++,
});

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(() => [makeWelcome()]);
  const [isTyping, setIsTyping] = useState(false);
  const [followUps, setFollowUps] = useState<{ label: string; key: string }[]>([]);
  const [newestId, setNewestId] = useState<number | null>(null);
  const [hasOpened, setHasOpened] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* show unread badge after 2.5s if never opened */
  useEffect(() => {
    if (hasOpened) return;
    const t = setTimeout(() => setShowBadge(true), 2500);
    return () => clearTimeout(t);
  }, [hasOpened]);

  /* auto-scroll to bottom */
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, isTyping]);

  /* prevent page scroll when scrolling inside the chat */
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollTop += e.deltaY;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [open]);

  function handleOpen() {
    setOpen((o) => !o);
    if (!hasOpened) {
      setHasOpened(true);
      setShowBadge(false);
    }
  }

  function ask(key: string, label: string) {
    const a = ANSWERS[key];
    if (!a) return;

    const userMsg: Msg = { from: 'user', text: label, at: new Date(), id: msgIdCounter++ };
    setMsgs((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setFollowUps([]);

    setTimeout(() => {
      const botId = msgIdCounter++;
      const botMsg: Msg = {
        from: 'bot',
        text: `${a.title}\n\n${a.body}`,
        at: new Date(),
        id: botId,
      };
      setIsTyping(false);
      setMsgs((prev) => [...prev, botMsg]);
      setNewestId(botId);
      setFollowUps(FOLLOW_UPS[key] ?? []);
    }, 680);
  }

  function reset() {
    setMsgs([makeWelcome()]);
    setIsTyping(false);
    setFollowUps([]);
    setNewestId(null);
  }

  return (
    <>
      {/* ── floating button ─────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50">
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

        {/* unread badge */}
        <AnimatePresence>
          {showBadge && !open && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -right-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-black text-[#de1d8d]"
            >
              1
            </motion.span>
          )}
        </AnimatePresence>

        {/* tooltip */}
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: 1.5 }}
              className="pointer-events-none absolute -top-9 right-0 whitespace-nowrap rounded-full border border-[#de1d8d]/30 bg-white px-3 py-1 text-[11px] font-medium text-[#de1d8d] shadow-sm dark:bg-black"
            >
              Ask about Vishal ✦
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleOpen}
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

      {/* ── chat panel ──────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed bottom-[88px] right-4 z-50 flex w-[calc(100vw-2rem)] max-w-[370px] flex-col overflow-hidden rounded-2xl border border-[#de1d8d]/20 bg-white shadow-[0_8px_40px_rgba(222,29,141,0.18)] dark:bg-[#0d0d0d] sm:right-6"
            style={{ height: 'min(580px, calc(100vh - 112px))' }}
          >
            {/* header */}
            <div className="flex shrink-0 items-center gap-3 border-b border-[#de1d8d]/15 bg-gray-50 px-4 py-3 dark:bg-black">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#de1d8d] shadow-[0_0_12px_rgba(222,29,141,0.6)]">
                <MdOutlineSmartToy size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  Portfolio Assistant
                </p>
                <p className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#de1d8d]" />
                  Vishal Aggarwal · Always online
                </p>
              </div>
              <button
                onClick={reset}
                className="rounded-lg px-2.5 py-1 text-[11px] font-medium text-gray-500 transition-colors hover:bg-black/5 hover:text-[#de1d8d] dark:hover:bg-white/5"
              >
                Reset
              </button>
            </div>

            {/* messages — relative wrapper + absolute inner for reliable scroll */}
            <div className="relative min-h-0 flex-1">
              <div
                ref={scrollRef}
                className="absolute inset-0 flex flex-col gap-3 overflow-y-auto overscroll-contain px-4 py-4"
              >
                {msgs.map((m) => (
                  <Bubble key={m.id} msg={m} isNewest={m.id === newestId} />
                ))}

                <AnimatePresence>{isTyping && <TypingIndicator key="typing" />}</AnimatePresence>

                <div ref={bottomRef} />
              </div>
            </div>

            {/* follow-up chips */}
            <AnimatePresence>
              {followUps.length > 0 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="shrink-0 border-t border-[#de1d8d]/10 px-3 py-2"
                >
                  <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-600">
                    Follow up
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {followUps.map((f) => (
                      <motion.button
                        key={f.key}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => ask(f.key, f.label)}
                        className="rounded-full border border-[#de1d8d]/40 bg-[#de1d8d]/10 px-2.5 py-1 text-[11px] font-medium text-[#de1d8d] hover:border-[#de1d8d]/70 hover:bg-[#de1d8d]/20"
                      >
                        {f.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* quick questions */}
            <div className="shrink-0 border-t border-[#de1d8d]/10 bg-white px-3 py-3 dark:bg-[#0d0d0d]">
              <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-600">
                Quick questions
              </p>
              <div className="flex flex-wrap gap-1.5">
                {MAIN_QUESTIONS.map((q) => (
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

              <p className="mb-2 mt-2.5 text-[10px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-600">
                Get to know me
              </p>
              <div className="flex flex-wrap gap-1.5">
                {FUN_QUESTIONS.map((q) => (
                  <motion.button
                    key={q.key}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => ask(q.key, q.label)}
                    className="rounded-full border border-black/10 bg-black/5 px-2.5 py-1 text-[11px] font-medium text-gray-500 transition-colors hover:border-black/20 hover:text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-200"
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
