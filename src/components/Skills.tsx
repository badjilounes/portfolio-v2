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

const categoryGradients: Record<string, string> = {
  frontend: 'from-violet-500/20 to-purple-600/20',
  backend: 'from-cyan-500/20 to-blue-600/20',
  architecture: 'from-amber-500/20 to-orange-600/20',
  tools: 'from-emerald-500/20 to-green-600/20',
  soft: 'from-rose-500/20 to-pink-600/20',
};

export default function Skills() {
  const t = useTranslations('skills');

  return (
    <ParallaxSection id="skills" speed={0.2}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 gradient-text">
          {t('title')}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryKeys.map((key, index) => (
            <GlassCard
              key={key}
              className={`bg-gradient-to-br ${categoryGradients[key]} relative overflow-hidden`}
              delay={index * 0.1}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{categoryIcons[key]}</span>
                <h3 className="text-lg font-bold text-white">
                  {t(`categories.${key}`)}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {t(`items.${key}`)
                  .split(', ')
                  .map((skill: string) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-200 border border-white/10 hover:border-violet-400/30 transition-colors cursor-default"
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
