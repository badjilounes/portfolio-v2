'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  speed?: number;
}

export default function ParallaxSection({
  children,
  id,
  className = '',
  speed = 0.5,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [150 * speed, -150 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.95]);

  return (
    <section id={id} ref={ref} className={`relative py-24 md:py-36 ${className}`}>
      <motion.div style={{ y, opacity, scale }}>
        {children}
      </motion.div>
    </section>
  );
}
