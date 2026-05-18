'use client';
import {motion, useMotionValue, useSpring, useTransform} from 'framer-motion';

export default function ParallaxGrid() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useSpring(useTransform(mx, [-1, 1], ['-1%', '1%']), {stiffness: 80, damping: 20});
  const ty = useSpring(useTransform(my, [-1, 1], ['-1%', '1%']), {stiffness: 80, damping: 20});

  return (
    <motion.div
      onPointerMove={(e) => {
        const {innerWidth, innerHeight} = window;
        mx.set((e.clientX / innerWidth) * 2 - 1);
        my.set((e.clientY / innerHeight) * 2 - 1);
      }}
      className="absolute inset-0 -z-10"
      style={{x: tx, y: ty}}
      aria-hidden
    >
      <div className="w-full h-full opacity-20 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]" style={{
        backgroundImage: `linear-gradient(to right, rgba(14,165,233,0.15) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(14,165,233,0.15) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }}/>
    </motion.div>
  );
}
