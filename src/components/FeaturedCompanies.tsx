'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ParallaxSection from './ParallaxSection';
import GlassCard from './GlassCard';

const featured = [
  {
    key: 'lv',
    logo: '/logos/louis-vuitton.svg',
    name: 'Louis Vuitton',
    gradient: 'from-amber-500 to-yellow-600',
    glow: 'rgba(245, 158, 11, 0.15)',
    border: 'border-amber-500/20',
    logoColor: '#a67c00',
    logoBg: 'rgba(245, 158, 11, 0.1)',
    logoSize: 36,
  },
  {
    key: 'tessi',
    logo: '/logos/tessi.svg',
    name: 'Tessi',
    gradient: 'from-indigo-500 to-violet-600',
    glow: 'rgba(99, 102, 241, 0.15)',
    border: 'border-indigo-500/20',
    logoColor: '#6366f1',
    logoBg: 'transparent',
    logoSize: 56,
  },
  {
    key: 'agicap',
    logo: '/logos/agicap.svg',
    name: 'Agicap',
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'rgba(16, 185, 129, 0.15)',
    border: 'border-emerald-500/20',
    logoColor: '#10b981',
    logoBg: 'rgba(16, 185, 129, 0.1)',
    logoSize: 36,
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
                {/* Company Logo */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 overflow-hidden"
                  style={{ background: company.logoBg, border: `1px solid ${company.logoColor}30` }}
                >
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={company.logoSize}
                    height={company.logoSize}
                    className="object-contain"
                  />
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
