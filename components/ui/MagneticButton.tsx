'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React from 'react';

type Props = {
  as?: 'button' | 'a';
  href?: string;
  download?: boolean;
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
};

export default function MagneticButton({ as = 'button', children, className = '', ...props }: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-40, 40], [6, -6]), { stiffness: 150, damping: 12 });
  const ry = useSpring(useTransform(x, [-40, 40], [-6, 6]), { stiffness: 150, damping: 12 });

  const baseClass = `inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 font-semibold bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 text-slate-900 transition-colors ${className}`;

  const motionProps = {
    onPointerMove: (e: React.PointerEvent) => {
      const el = (e.currentTarget as HTMLElement).getBoundingClientRect();
      x.set(e.clientX - (el.left + el.width / 2));
      y.set(e.clientY - (el.top + el.height / 2));
    },
    onPointerLeave: () => { x.set(0); y.set(0); },
    style: { transform: 'perspective(600px)', rotateX: rx, rotateY: ry } as React.CSSProperties,
    className: baseClass,
  };

  if (as === 'a') {
    return (
      <motion.a {...motionProps} href={props.href} download={props.download}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...motionProps} type={props.type ?? 'button'} onClick={props.onClick}>
      {children}
    </motion.button>
  );
}
