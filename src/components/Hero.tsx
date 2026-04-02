'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function Hero() {
  const t = useTranslations('hero');
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
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 50 : 350]);
  const textOpacity = useTransform(scrollYProgress, [0, isMobile ? 0.6 : 0.4], [1, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 30 : 150]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated grid background with parallax */}
      <motion.div className="absolute inset-0 opacity-[0.04]" style={isMobile ? undefined : { y: gridY }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(var(--accent) 1px, transparent 1px),
              linear-gradient(90deg, var(--accent) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </motion.div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-primary)_70%)]" />

      <motion.div
        style={isMobile ? { opacity: textOpacity } : { y: textY, opacity: textOpacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl font-medium mb-4"
          style={{ color: 'var(--accent-light)' }}
        >
          {t('greeting')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text leading-tight"
        >
          {t('name')}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg md:text-2xl lg:text-3xl font-light mb-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm md:text-lg max-w-2xl mx-auto mb-12"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary cursor-pointer text-base"
          >
            {t('cta')}
          </motion.button>
          <motion.a
            href="/Lounes BADJI.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-glass cursor-pointer text-base inline-flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {t('download')}
          </motion.a>
        </motion.div>

        {/* Scroll indicator - hidden on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden md:block absolute -bottom-16 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full flex items-start justify-center p-1.5"
            style={{ border: '2px solid var(--accent-glow)' }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--accent-light)' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
