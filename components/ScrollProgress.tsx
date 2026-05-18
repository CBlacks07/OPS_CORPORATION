'use client';
import {useScroll, useSpring, motion} from 'framer-motion';

export default function ScrollProgress() {
  const {scrollYProgress} = useScroll();
  const scaleX = useSpring(scrollYProgress, {stiffness: 160, damping: 20});
  return <motion.div style={{scaleX}} className="fixed left-0 right-0 top-0 h-1 origin-left bg-cyan-400/80 z-50" />;
}
