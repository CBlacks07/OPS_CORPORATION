'use client';
import {motion, Variants} from 'framer-motion';
import React from 'react';

const makeVariants = (y = 20): Variants => ({
  hidden: {opacity: 0, y},
  show: {opacity: 1, y: 0, transition: {duration: 0.6, ease: 'easeOut'}},
});

export default function Reveal({
  as: Tag = 'div',
  children,
  y = 20,
  delay = 0,
  once = true,
  className,
}: {
  as?: any;
  children: React.ReactNode;
  y?: number;
  delay?: number;
  once?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{once, amount: 0.3, margin: '-80px'}}
      variants={{...makeVariants(y), show: {...makeVariants(y).show, transition: {delay}}}}
      className={className}
    >
      {children}
    </motion.div>
  );
}
