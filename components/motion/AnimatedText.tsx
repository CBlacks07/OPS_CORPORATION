'use client';
import {motion} from 'framer-motion';

export default function AnimatedText({
  text,
  per = 'word',
  delay = 0,
  className = '',
}: {text: string; per?: 'word' | 'char'; delay?: number; className?: string}) {
  const items = per === 'word' ? text.split(' ') : Array.from(text);
  return (
    <span className={`whitespace-pre ${className}`} aria-label={text}>
      {items.map((part, i) => (
        <motion.span
          key={i}
          initial={{opacity: 0, y: '0.25em'}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: delay + i * 0.04, type: 'spring', stiffness: 300, damping: 22}}
          className="inline-block will-change-transform"
        >
          {per === 'char' && part === ' ' ? '\u00A0' : part}
          {per === 'word' && <span className="inline-block w-[0.25ch]" />}
        </motion.span>
      ))}
    </span>
  );
}
