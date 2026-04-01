'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';
import GlassCard from './GlassCard';

const roleKeys = ['tessi', 'globaz', 'agicap', 'lv', 'mygladys', 'icoges', 'ubilab', 'trainme'] as const;

const roleColors: Record<string, string> = {
  tessi: 'from-violet-500/20 to-violet-600/20 border-violet-500/30',
  globaz: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30',
  agicap: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30',
  lv: 'from-amber-500/20 to-amber-600/20 border-amber-500/30',
  mygladys: 'from-rose-500/20 to-rose-600/20 border-rose-500/30',
  icoges: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
  ubilab: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
  trainme: 'from-teal-500/20 to-teal-600/20 border-teal-500/30',
};

export default function Experience() {
  const t = useTranslations('experience');

  return (
    <ParallaxSection id="experience" speed={0.15}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 gradient-text">
          {t('title')}
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500/50 via-cyan-500/50 to-violet-500/50" />

          {roleKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-start mb-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-1.5 md:-translate-x-1.5 mt-8 rounded-full bg-violet-500 shadow-lg shadow-violet-500/50 z-10" />

              {/* Card */}
              <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                <GlassCard className={`bg-gradient-to-br ${roleColors[key]} border`} delay={index * 0.05}>
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {t(`roles.${key}.role`)}
                      </h3>
                      <p className="text-violet-400 font-semibold">
                        {t(`roles.${key}.company`)}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-gray-400 bg-white/5 px-3 py-1 rounded-full whitespace-nowrap">
                      {t(`roles.${key}.period`)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {t(`roles.${key}.description`)}
                  </p>
                </GlassCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
}
