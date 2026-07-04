'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal, { SectionBar } from '@/components/ui/ScrollReveal';
import CountUp from '@/components/ui/CountUp';

const STATS = [
  { key: 's1', value: 20000, highlight: true },
  { key: 's2', value: 55, highlight: false },
  { key: 's3', value: 4, highlight: false },
  { key: 's4', value: 1200, highlight: false },
  { key: 's5', value: 150, highlight: false },
  { key: 's6', value: 10000, highlight: true },
  { key: 's7', value: 60, highlight: false },
] as const;

export default function Stats() {
  const t = useTranslations('stats');

  return (
    <section id="numbers" className="relative overflow-hidden bg-primary py-16 sm:py-20">
      {/* Dotted pattern */}
      <div className="absolute inset-0 opacity-[0.05]" aria-hidden="true">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <ScrollReveal direction="up">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{t('title')}</h2>
            <SectionBar className="mt-4" />
            <p className="mt-4 text-white/75">{t('subtitle')}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {STATS.map(({ key, value, highlight }) => (
            <div
              key={key}
              className={`flex flex-col items-center justify-center rounded-2xl p-6 text-center transition-transform duration-300 hover:-translate-y-1 ${
                highlight ? 'bg-white text-primary shadow-lg' : 'bg-white/10 text-white'
              }`}
            >
              <CountUp
                end={value}
                className="text-4xl font-black sm:text-5xl"
              />
              <p className={`mt-2 text-sm leading-snug ${highlight ? 'text-muted' : 'text-white/80'}`}>
                {t(key)}
              </p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
