'use client';
import {motion, useMotionValue, useSpring, useTransform} from 'framer-motion';
import React from 'react';

export default function TiltCard({children, className = ''}: {children: React.ReactNode; className?: string}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [ -60, 60 ], [ 8, -8 ]), {stiffness: 180, damping: 14});
  const ry = useSpring(useTransform(x, [ -60, 60 ], [ -8, 8 ]), {stiffness: 180, damping: 14});

  return (
    <motion.article
      onPointerMove={(e) => {
        const el = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - (el.left + el.width / 2));
        y.set(e.clientY - (el.top + el.height / 2));
      }}
      onPointerLeave={() => {x.set(0); y.set(0);}}
      style={{transform: 'perspective(900px)', rotateX: rx, rotateY: ry}}
      className={`group rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-cyan-500/40 hover:bg-white/10 relative overflow-hidden ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{background: 'radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(34,211,238,0.15), transparent 40%)'}}/>
      {children}
    </motion.article>
  );
}
