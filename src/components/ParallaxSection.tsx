'use client';

import { useRef, useEffect, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Reduced motion on mobile to prevent glitches
  const mobileSpeed = speed * 0.15;
  const effectiveSpeed = isMobile ? mobileSpeed : speed;

  const y = useTransform(scrollYProgress, [0, 1], [150 * effectiveSpeed, -150 * effectiveSpeed]);
  const opacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.05, 0.95, 1] : [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );

  return (
    <section id={id} ref={ref} className={`relative py-24 md:py-36 ${className}`}>
      <motion.div
        style={isMobile ? { opacity } : { y, opacity }}
      >
        {children}
      </motion.div>
    </section>
  );
}
