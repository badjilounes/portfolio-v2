'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';
import GlassCard from './GlassCard';

const roleKeys = ['tessi', 'globaz', 'agicap', 'lv', 'mygladys', 'icoges', 'ubilab', 'trainme'] as const;

const featuredKeys = new Set(['tessi', 'agicap', 'lv']);

export default function Experience() {
  const t = useTranslations('experience');

  return (
    <ParallaxSection id="experience" speed={0.35}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 gradient-text">
          {t('title')}
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, var(--accent), var(--secondary), var(--accent))' }}
          />

          {roleKeys.map((key, index) => {
            const isFeatured = featuredKeys.has(key);
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
                className={`relative flex flex-col md:flex-row items-start mb-10 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-4 md:left-1/2 -translate-x-1.5 md:-translate-x-1.5 mt-8 rounded-full z-10 ${
                    isFeatured ? 'w-4 h-4' : 'w-3 h-3'
                  }`}
                  style={{
                    background: 'var(--accent)',
                    boxShadow: isFeatured ? '0 0 16px var(--accent-glow), 0 0 32px var(--accent-glow)' : '0 0 8px var(--accent-glow)',
                  }}
                />

                {/* Card */}
                <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <GlassCard delay={index * 0.05}>
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                            {t(`roles.${key}.role`)}
                          </h3>
                          {isFeatured && <span className="featured-badge">Top</span>}
                        </div>
                        <p className="font-semibold" style={{ color: 'var(--accent-light)' }}>
                          {t(`roles.${key}.company`)}
                        </p>
                      </div>
                      <span
                        className="text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap"
                        style={{ background: 'var(--glass-bg)', color: 'var(--text-muted)', border: '1px solid var(--glass-border)' }}
                      >
                        {t(`roles.${key}.period`)}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {t(`roles.${key}.description`)}
                    </p>
                  </GlassCard>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </ParallaxSection>
  );
}
