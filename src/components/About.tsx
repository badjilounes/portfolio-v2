'use client';

import { useTranslations } from 'next-intl';
import ParallaxSection from './ParallaxSection';
import GlassCard from './GlassCard';

export default function About() {
  const t = useTranslations('about');

  const stats = [
    { value: t('experience_years'), icon: '💼' },
    { value: t('location'), icon: '📍' },
    { value: t('projects'), icon: '🚀' },
  ];

  return (
    <ParallaxSection id="about" speed={0.2}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 gradient-text">
          {t('title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Profile visual */}
          <GlassCard className="relative overflow-hidden p-8" hover={false}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/30 border-2 border-violet-400/30 flex items-center justify-center text-5xl">
                LB
              </div>
              <div className="grid grid-cols-1 gap-4 mt-6">
                {stats.map((stat, i) => (
                  <GlassCard key={i} className="text-center p-4" delay={i * 0.1}>
                    <span className="text-2xl mb-2 block">{stat.icon}</span>
                    <p className="text-sm text-gray-300 font-medium">{stat.value}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Description */}
          <GlassCard className="p-8" hover={false} delay={0.2}>
            <p className="text-lg text-gray-300 leading-relaxed">
              {t('description')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['React', 'TypeScript', 'Next.js', 'Node.js', 'Java', 'DDD/CQRS'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-violet-500/15 text-violet-300 border border-violet-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </ParallaxSection>
  );
}
