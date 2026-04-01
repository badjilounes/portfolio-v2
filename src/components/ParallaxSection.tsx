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
  speed = 0.3,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id={id} ref={ref} className={`relative py-20 md:py-32 ${className}`}>
      <motion.div style={{ y, opacity }}>
        {children}
      </motion.div>
    </section>
  );
}
