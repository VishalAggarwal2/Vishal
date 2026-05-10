'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

// ─── Primitives ────────────────────────────────────────────────────────────

function WireframeSphere({ size = 160 }: { size?: number }) {
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
              border: '1px solid rgba(222,29,141,0.38)',
              transform: `rotateX(${angle}deg)`,
            }}
          />
        ))}
        {/* equator accent */}
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

function WireframeCube({ size = 80 }: { size?: number }) {
  const h = size / 2;
  const faces = [
    `translateZ(${h}px)`,
    `translateZ(-${h}px) rotateY(180deg)`,
    `translateX(-${h}px) rotateY(-90deg)`,
    `translateX(${h}px) rotateY(90deg)`,
    `translateY(-${h}px) rotateX(90deg)`,
    `translateY(${h}px) rotateX(-90deg)`,
  ];
  return (
    <div style={{ perspective: size * 5, width: size, height: size }}>
      <motion.div
        style={{ width: size, height: size, transformStyle: 'preserve-3d', position: 'relative' }}
        animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {faces.map((transform, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              transform,
              border: '1px solid rgba(222,29,141,0.32)',
              background: 'rgba(222,29,141,0.025)',
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

function Ring({
  size = 60,
  duration = 10,
  axis = 'X',
}: {
  size?: number;
  duration?: number;
  axis?: 'X' | 'Y';
}) {
  const animate = axis === 'X' ? { rotateX: [0, 360] } : { rotateY: [0, 360] };
  return (
    <div style={{ perspective: size * 3 }}>
      <motion.div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: '1.5px solid rgba(222,29,141,0.42)',
        }}
        animate={animate}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

function Crystal({ size = 24, delay = 0 }: { size?: number; delay?: number }) {
  return (
    <div style={{ perspective: 200 }}>
      <motion.div
        style={{ width: size, height: size, transformStyle: 'preserve-3d' }}
        animate={{ rotateY: [0, 360], rotateZ: [0, 12, 0, -12, 0] }}
        transition={{
          rotateY: { duration: 7, repeat: Infinity, ease: 'linear', delay },
          rotateZ: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay },
        }}
      >
        <div
          style={{
            width: size,
            height: size,
            transform: 'rotate(45deg)',
            border: '1.5px solid rgba(222,29,141,0.55)',
            background: 'rgba(222,29,141,0.06)',
          }}
        />
      </motion.div>
    </div>
  );
}

function Float({
  children,
  delay = 0,
  amp = 12,
  duration = 4,
}: {
  children: ReactNode;
  delay?: number;
  amp?: number;
  duration?: number;
}) {
  return (
    <motion.div
      animate={{ y: [-amp / 2, amp / 2] }}
      transition={{
        duration: duration + delay * 0.4,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Composition ───────────────────────────────────────────────────────────

export default function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Large sphere — top right */}
      <div className="absolute right-3 top-10 opacity-75 md:right-14 md:top-14 md:opacity-90">
        <Float delay={0} amp={18} duration={5}>
          <WireframeSphere size={190} />
        </Float>
      </div>

      {/* Medium cube — lower left */}
      <div className="absolute bottom-24 left-3 opacity-55 md:bottom-32 md:left-10 md:opacity-70">
        <Float delay={1.4} amp={10} duration={4.5}>
          <WireframeCube size={88} />
        </Float>
      </div>

      {/* Ring — spinning on X, upper left */}
      <div className="absolute left-[7%] top-[18%] hidden opacity-45 lg:block">
        <Float delay={0.6} amp={8} duration={4}>
          <Ring size={72} duration={9} axis="X" />
        </Float>
      </div>

      {/* Ring — spinning on Y, mid right */}
      <div className="absolute right-[14%] top-[58%] hidden opacity-38 lg:block">
        <Float delay={2.1} amp={14} duration={5}>
          <Ring size={52} duration={13} axis="Y" />
        </Float>
      </div>

      {/* Crystal — upper mid */}
      <div className="absolute left-[22%] top-[18%] hidden opacity-65 md:block">
        <Float delay={0.2} amp={9} duration={3.8}>
          <Crystal size={22} delay={0} />
        </Float>
      </div>

      {/* Crystal — top center-right */}
      <div className="absolute right-[28%] top-[12%] hidden opacity-50 lg:block">
        <Float delay={1.1} amp={11} duration={4.2}>
          <Crystal size={16} delay={1} />
        </Float>
      </div>

      {/* Crystal — lower right */}
      <div className="absolute bottom-[22%] right-[6%] opacity-48 md:opacity-58">
        <Float delay={0.8} amp={13} duration={4.6}>
          <Crystal size={30} delay={0.6} />
        </Float>
      </div>

      {/* Small cube — mid left (desktop only) */}
      <div className="absolute left-[4%] top-[45%] hidden opacity-30 xl:block">
        <Float delay={1.8} amp={8} duration={4}>
          <WireframeCube size={48} />
        </Float>
      </div>
    </div>
  );
}
