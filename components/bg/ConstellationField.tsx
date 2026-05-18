'use client';
import React, {useEffect, useRef} from 'react';
import usePrefersReducedMotion from '@/components/hooks/usePrefersReducedMotion';

type Dot = {x:number;y:number;vx:number;vy:number;};

export default function ConstellationField({density=0.00012, maxSpeed=0.3, linkDist=110}:{density?:number; maxSpeed?:number; linkDist?:number}){
  const canvasRef = useRef<HTMLCanvasElement|null>(null);
  const prefersReduce = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    let w = 0, h = 0;
    let dots: Dot[] = [];
    const mouse = {x: -9999, y: -9999};

    function resize() {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(40, Math.floor(w * h * density));
      dots = new Array(count).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() * 2 - 1) * maxSpeed,
        vy: (Math.random() * 2 - 1) * maxSpeed
      }));
    }

    function step(){
      ctx.clearRect(0,0,w,h);
      // subtle gradient background glow
      const grad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, Math.max(w,h)/1.2);
      grad.addColorStop(0, 'rgba(34,211,238,0.06)');
      grad.addColorStop(1, 'rgba(14,165,233,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0,0,w,h);

      // update & draw
      for (let i=0;i<dots.length;i++){
        const p = dots[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      // mouse particle influence
      const m = {x: mouse.x, y: mouse.y};
      ctx.lineWidth = 1;
      for (let i=0;i<dots.length;i++){
        const a = dots[i];
        // draw point
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.2, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(226, 248, 255, 0.8)';
        ctx.fill();
        // connect to nearby
        for (let j=i+1;j<dots.length;j++){
          const b = dots[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx*dx + dy*dy;
          if (d2 < linkDist*linkDist){
            const alpha = 1 - (Math.sqrt(d2) / linkDist);
            ctx.strokeStyle = `rgba(34,211,238,${0.18*alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
          }
        }
        // connect to mouse
        const mdx = a.x - m.x, mdy = a.y - m.y;
        const md2 = mdx*mdx + mdy*mdy;
        if (md2 < (linkDist*1.1)*(linkDist*1.1)){
          const alpha = 1 - (Math.sqrt(md2) / (linkDist*1.1));
          ctx.strokeStyle = `rgba(56,189,248,${0.25*alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y); ctx.lineTo(m.x,m.y); ctx.stroke();
        }
      }

      raf = requestAnimationFrame(step);
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    resize();
    if (!prefersReduce) step();
    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [density, maxSpeed, linkDist, prefersReduce]);

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10 w-full h-full" aria-hidden />;
}
