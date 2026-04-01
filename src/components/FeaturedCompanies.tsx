'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import ParallaxSection from './ParallaxSection';
import GlassCard from './GlassCard';

const featured = [
  {
    key: 'lv',
    logo: 'LV',
    gradient: 'from-amber-500 to-yellow-600',
    glow: 'rgba(245, 158, 11, 0.15)',
    border: 'border-amber-500/20',
  },
  {
    key: 'tessi',
    logo: 'T',
    gradient: 'from-indigo-500 to-violet-600',
    glow: 'rgba(99, 102, 241, 0.15)',
    border: 'border-indigo-500/20',
  },
  {
    key: 'agicap',
    logo: 'A',
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'rgba(16, 185, 129, 0.15)',
    border: 'border-emerald-500/20',
  },
] as const;

export default function FeaturedCompanies() {
  const t = useTranslations('featured');

  return (
    <ParallaxSection speed={0.35}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm font-semibold uppercase tracking-[0.2em] mb-12"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('title')}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((company, index) => (
            <GlassCard
              key={company.key}
              className={`relative overflow-hidden p-8 ${company.border} border`}
              delay={index * 0.15}
            >
              {/* Glow effect */}
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-50"
                style={{ background: company.glow }}
              />

              <div className="relative">
                {/* Logo */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${company.gradient} flex items-center justify-center text-white font-bold text-xl mb-5 shadow-lg`}>
                  {company.logo}
                </div>

                <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {t(`${company.key}.company`)}
                </h3>
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--accent-light)' }}>
                  {t(`${company.key}.role`)}
                </p>
                <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                  {t(`${company.key}.period`)}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {t(`${company.key}.description`)}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
}
