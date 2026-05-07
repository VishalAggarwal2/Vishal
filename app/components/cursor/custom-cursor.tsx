'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const SPRING_FAST = { stiffness: 900, damping: 38, mass: 0.4 };
const SPRING_1 = { stiffness: 280, damping: 26, mass: 0.6 };
const SPRING_2 = { stiffness: 160, damping: 22, mass: 0.7 };
const SPRING_3 = { stiffness: 90, damping: 18, mass: 0.8 };
const SPRING_4 = { stiffness: 50, damping: 15, mass: 0.9 };

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  /* each dot springs off the raw motion value — trailing lag increases */
  const x0 = useSpring(mx, SPRING_FAST);
  const y0 = useSpring(my, SPRING_FAST);
  const x1 = useSpring(mx, SPRING_1);
  const y1 = useSpring(my, SPRING_1);
  const x2 = useSpring(mx, SPRING_2);
  const y2 = useSpring(my, SPRING_2);
  const x3 = useSpring(mx, SPRING_3);
  const y3 = useSpring(my, SPRING_3);
  const x4 = useSpring(mx, SPRING_4);
  const y4 = useSpring(my, SPRING_4);

  useEffect(() => {
    /* skip on touch devices */
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.style.cursor = 'none';
    setVisible(true);

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const enter = () => setVisible(true);
    const leave = () => setVisible(false);
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseenter', enter);
    document.addEventListener('mouseleave', leave);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseenter', enter);
      document.removeEventListener('mouseleave', leave);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, [mx, my]);

  if (!visible) return null;

  const DOT = 'pointer-events-none fixed left-0 top-0 z-[9999] rounded-full';
  const center = '-translate-x-1/2 -translate-y-1/2';

  return (
    <>
      {/* trail dots — rendered first (lowest z within cursor layer) */}
      {(
        [
          { xs: x4, ys: y4, size: 4, op: 0.12 },
          { xs: x3, ys: y3, size: 5, op: 0.22 },
          { xs: x2, ys: y2, size: 6, op: 0.35 },
          { xs: x1, ys: y1, size: 8, op: 0.55 },
        ] as const
      ).map(({ xs, ys, size, op }, i) => (
        <motion.span
          key={i}
          className={`${DOT} ${center} bg-[#de1d8d]`}
          style={{
            x: xs,
            y: ys,
            width: size,
            height: size,
            opacity: op,
          }}
        />
      ))}

      {/* main cursor dot */}
      <motion.span
        className={`${DOT} ${center} bg-[#de1d8d]`}
        style={{
          x: x0,
          y: y0,
          width: clicking ? 8 : 11,
          height: clicking ? 8 : 11,
        }}
        animate={{ scale: clicking ? 0.7 : 1 }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
