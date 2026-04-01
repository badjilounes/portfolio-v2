'use client';

import { useTranslations } from 'next-intl';
import ParallaxSection from './ParallaxSection';
import GlassCard from './GlassCard';

const schoolKeys = ['cpe', 'chartreux', 'saintjust'] as const;

const icons = {
  cpe: '🎓',
  chartreux: '📐',
  saintjust: '📚',
};

export default function Education() {
  const t = useTranslations('education');

  return (
    <ParallaxSection id="education" speed={0.25}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 gradient-text">
          {t('title')}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {schoolKeys.map((key, index) => (
            <GlassCard key={key} className="text-center p-8 relative overflow-hidden" delay={index * 0.15}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-cyan-500 to-violet-500" />
              <div className="text-4xl mb-4">{icons[key]}</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t(`schools.${key}.school`)}
              </h3>
              <p className="text-violet-400 font-semibold mb-1">
                {t(`schools.${key}.degree`)}
              </p>
              <p className="text-sm text-cyan-400 mb-3">
                {t(`schools.${key}.field`)}
              </p>
              <p className="text-sm text-gray-400">
                {t(`schools.${key}.description`)}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
}
