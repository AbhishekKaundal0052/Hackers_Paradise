'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function AuthBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix rain effect
    const matrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0';
      ctx.font = '10pt monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30A0 + Math.random() * 33);
        ctx.fillText(text, drops[i] * 10, i * 10);

        if (drops[i] * 10 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const drops: number[] = [];
    for (let x = 0; x < canvas.width / 10; x++) {
      drops[x] = 1;
    }

    const interval = setInterval(matrix, 35);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none opacity-20"
      />
      
      {/* Floating geometric shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Hexagons */}
        <motion.div
          className="absolute top-20 left-20 w-16 h-16 border-2 border-red-500/30 rotate-45"
          animate={{
            y: [0, -20, 0],
            rotate: [45, 225, 405],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-40 right-32 w-12 h-12 border-2 border-purple-500/30 rotate-45"
          animate={{
            y: [0, 30, 0],
            rotate: [45, 135, 225],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div
          className="absolute bottom-32 left-1/4 w-20 h-20 border-2 border-red-500/20 rotate-45"
          animate={{
            y: [0, -40, 0],
            rotate: [45, 315, 405],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Circles */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-8 h-8 border-2 border-purple-500/40 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-6 h-6 border-2 border-red-500/30 rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        
        {/* Triangles */}
        <motion.div
          className="absolute top-1/2 left-1/3 w-0 h-0 border-l-[12px] border-l-transparent border-b-[20px] border-b-red-500/30 border-r-[12px] border-r-transparent"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-20 w-0 h-0 border-l-[8px] border-l-transparent border-b-[16px] border-b-purple-500/40 border-r-[8px] border-r-transparent"
          animate={{
            y: [0, 25, 0],
            rotate: [0, 120, 240],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        />
        
        {/* Grid patterns */}
        <motion.div
          className="absolute top-1/4 left-1/2 w-24 h-24 border border-red-500/20"
          animate={{
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 left-1/6 w-16 h-16 border border-purple-500/20"
          animate={{
            rotate: [360, 270, 180, 90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
        />
      </div>
      
      {/* Gradient overlays */}
      <div className="fixed inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />
    </>
  );
} 