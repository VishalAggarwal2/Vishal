'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const CATEGORIES = ['Backend', 'Frontend', 'Database', 'DevOps', 'Infrastructure', 'AI'] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_COLOR: Record<Category, string> = {
  Backend: '#de1d8d',
  Frontend: '#a78bfa',
  Database: '#34d399',
  DevOps: '#fb923c',
  Infrastructure: '#60a5fa',
  AI: '#f59e0b',
};

interface Tech {
  name: string;
  category: Category;
  projects: string[];
}

const STACK: Tech[] = [
  { name: 'Java', category: 'Backend', projects: ['Bajaj Finserv', 'Heydo Tech', 'Increff'] },
  { name: 'Spring Boot', category: 'Backend', projects: ['Bajaj Finserv', 'Heydo Tech'] },
  { name: 'Go', category: 'Backend', projects: ['GC Simulator', 'TaskFlow'] },
  { name: 'Node.js', category: 'Backend', projects: ['Apni Mandi', 'Phoenix Portal'] },
  { name: 'GraphQL', category: 'Backend', projects: ['Bajaj Finserv'] },
  { name: 'REST APIs', category: 'Backend', projects: ['Increff', 'Heydo Tech'] },

  { name: 'React', category: 'Frontend', projects: ['Apni Mandi', 'Portfolio'] },
  { name: 'Next.js', category: 'Frontend', projects: ['Portfolio', 'TaskFlow'] },
  { name: 'TypeScript', category: 'Frontend', projects: ['Portfolio'] },
  { name: 'Tailwind', category: 'Frontend', projects: ['Portfolio', 'TaskFlow'] },

  { name: 'PostgreSQL', category: 'Database', projects: ['Increff', 'TaskFlow'] },
  { name: 'Redis', category: 'Database', projects: ['TaskFlow', 'Increff'] },
  { name: 'MongoDB', category: 'Database', projects: ['Apni Mandi'] },
  { name: 'Cassandra', category: 'Database', projects: ['System Design'] },

  { name: 'Docker', category: 'DevOps', projects: ['CI/CD Pipeline', 'Bajaj Finserv'] },
  { name: 'Kubernetes', category: 'DevOps', projects: ['CI/CD Pipeline'] },
  { name: 'Jenkins', category: 'DevOps', projects: ['CI/CD Pipeline', 'Bajaj Finserv'] },
  { name: 'ArgoCD', category: 'DevOps', projects: ['CI/CD Pipeline'] },
  { name: 'AWS', category: 'DevOps', projects: ['Bajaj Finserv', 'Increff'] },

  { name: 'Kafka', category: 'Infrastructure', projects: ['Increff', 'Distributed Systems'] },
  { name: 'Prometheus', category: 'Infrastructure', projects: ['CI/CD Pipeline', 'Bajaj Finserv'] },
  { name: 'Grafana', category: 'Infrastructure', projects: ['CI/CD Pipeline'] },

  { name: 'LLM', category: 'AI', projects: ['VoiceAI', 'AI Projects'] },
  { name: 'RAG', category: 'AI', projects: ['VoiceAI'] },
  { name: 'MCP', category: 'AI', projects: ['AI Tools', 'VoiceAI'] },
  { name: 'Vector DB', category: 'AI', projects: ['VoiceAI'] },
  { name: 'LangChain', category: 'AI', projects: ['VoiceAI', 'AI Projects'] },
  { name: 'Embeddings', category: 'AI', projects: ['VoiceAI'] },
  { name: 'Claude API', category: 'AI', projects: ['VoiceAI', 'AI Tools'] },
  { name: 'Prompt Engineering', category: 'AI', projects: ['VoiceAI', 'AI Projects'] },
  { name: 'AI Agents', category: 'AI', projects: ['AI Tools', 'VoiceAI'] },
  { name: 'OpenAI API', category: 'AI', projects: ['AI Projects'] },
];

function TechBadge({ tech, index }: { tech: Tech; index: number }) {
  const [hovered, setHovered] = useState(false);
  const color = CATEGORY_COLOR[tech.category];

  const floatY = -(5 + (index % 4) * 3);
  const duration = 3 + (index % 5) * 0.6;
  const delay = (index % 7) * 0.25;

  return (
    <motion.div
      className="relative"
      animate={{ y: [0, floatY, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="relative flex cursor-default items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors"
        style={{
          backgroundColor: hovered ? `${color}18` : '#111111',
          borderColor: hovered ? `${color}90` : '#2a2a2a',
          color: hovered ? color : '#d1d5db',
        }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: color, opacity: hovered ? 1 : 0.5 }}
        />
        {tech.name}
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 z-50 mb-3 w-52 -translate-x-1/2 rounded-xl border border-[#2a2a2a] bg-[#0d0d0d] p-3 shadow-2xl"
            style={{ boxShadow: `0 8px 32px ${color}20` }}
          >
            <div className="mb-2">
              <span className="text-xs font-semibold text-white">{tech.name}</span>
            </div>
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-wider text-gray-600">Used in</p>
              <div className="flex flex-wrap gap-1">
                {tech.projects.map((p) => (
                  <span
                    key={p}
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{ backgroundColor: `${color}18`, color }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-sm border-b border-r border-[#2a2a2a] bg-[#0d0d0d]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function TechConstellation() {
  return (
    <section className="mt-12 mb-8">
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-100">Tech Constellation</h2>
        <p className="mt-1 text-sm text-gray-500">Hover any badge to see where it was used</p>
      </motion.div>

      <div className="space-y-6">
        {CATEGORIES.map((cat, catIndex) => {
          const techs = STACK.filter((t) => t.category === cat);
          const color = CATEGORY_COLOR[cat];
          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: catIndex * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color }}>
                  {cat}
                </span>
                <span className="h-px flex-1 bg-[#1a1a1a]" />
              </div>
              <div className="flex flex-wrap gap-2.5">
                {techs.map((tech) => (
                  <TechBadge key={tech.name} tech={tech} index={STACK.indexOf(tech)} />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
