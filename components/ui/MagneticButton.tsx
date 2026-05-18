'use client';
import {motion, useMotionValue, useSpring, useTransform} from 'framer-motion';
import React from 'react';

type MagneticButtonProps = {
  as?: 'button' | 'a';
  className?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'button'> & React.ComponentPropsWithoutRef<'a'>;

export default function MagneticButton({as = 'button', children, className = '', ...props}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [ -40, 40 ], [ 6, -6 ]), {stiffness: 150, damping: 12});
  const ry = useSpring(useTransform(x, [ -40, 40 ], [ -6, 6 ]), {stiffness: 150, damping: 12});
  const Component = as === 'a' ? motion.a : motion.button;

  return (
    <Component
      onPointerMove={(e) => {
        const el = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - (el.left + el.width / 2));
        y.set(e.clientY - (el.top + el.height / 2));
      }}
      onPointerLeave={() => {x.set(0); y.set(0);}}
      style={{transform: 'perspective(600px)', rotateX: rx, rotateY: ry}}
      className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 font-medium bg-cyan-500/90 hover:bg-cyan-400 text-slate-900 shadow-lg/10 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
