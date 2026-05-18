'use client';
import {motion} from 'framer-motion';

export default function Burger({open}:{open:boolean}){
  return (
    <div aria-hidden className="relative w-6 h-6">
      <motion.span
        className="absolute left-0 top-1 block h-[2px] w-6 bg-current"
        animate={open ? {y: 12, rotate: 45} : {y: 0, rotate: 0}}
        transition={{type:'spring', stiffness: 300, damping: 24}}
      />
      <motion.span
        className="absolute left-0 top-1/2 -mt-[1px] block h-[2px] w-6 bg-current"
        animate={open ? {opacity: 0} : {opacity: 1}}
        transition={{duration: 0.15}}
      />
      <motion.span
        className="absolute left-0 bottom-1 block h-[2px] w-6 bg-current"
        animate={open ? {y: -12, rotate: -45} : {y: 0, rotate: 0}}
        transition={{type:'spring', stiffness: 300, damping: 24}}
      />
    </div>
  );
}
