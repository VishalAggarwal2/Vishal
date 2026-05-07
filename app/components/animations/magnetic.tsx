'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode, useRef } from 'react';

const SPRING = { stiffness: 180, damping: 16, mass: 0.3 };

interface Props {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}

export default function Magnetic({ children, strength = 0.3, radius = 80, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < radius) {
      rawX.set(dx * strength);
      rawY.set(dy * strength);
    }
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-block' }}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}
