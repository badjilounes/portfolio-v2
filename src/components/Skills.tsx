'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';
import GlassCard from './GlassCard';

const categoryKeys = ['frontend', 'backend', 'architecture', 'tools', 'soft'] as const;

const categoryIcons: Record<string, string> = {
  frontend: '🎨',
  backend: '⚙️',
  architecture: '🏗️',
  tools: '🔧',
  soft: '🤝',
};

export default function Skills() {
  const t = useTranslations('skills');

  return (
    <ParallaxSection id="skills" speed={0.4}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 gradient-text">
          {t('title')}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryKeys.map((key, index) => (
            <GlassCard
              key={key}
              className="relative overflow-hidden"
              delay={index * 0.1}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{categoryIcons[key]}</span>
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                  {t(`categories.${key}`)}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {t(`items.${key}`)
                  .split(', ')
                  .map((skill: string) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.08 }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-default transition-colors"
                      style={{
                        background: 'var(--glass-bg)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--glass-border)',
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
}
