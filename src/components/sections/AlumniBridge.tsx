'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { ALUMNI_SITE_URL } from '@/lib/links';

export default function AlumniBridge() {
  const t = useTranslations('alumni');
  const sloganTranslation = t('sloganTranslation');

  return (
    <section id="alumni" className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark py-16 sm:py-20">
      {/* Symmetric decorative stripes */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-1/2 -start-1/4 h-[200%] w-1/3 bg-white/[0.04] rotate-12" />
        <div className="absolute -top-1/2 -end-1/4 h-[200%] w-1/3 bg-white/[0.04] -rotate-12" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <ScrollReveal direction="up">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t('title')}</h2>

          <p className="mt-8 text-2xl font-bold leading-snug text-white sm:text-3xl md:text-4xl !text-center" dir="rtl">
            {t('slogan')}
          </p>
          {sloganTranslation && (
            <p className="mt-3 text-base text-white/70 sm:text-lg !text-center">{sloganTranslation}</p>
          )}

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/85 !text-center">
            {t('text')}
          </p>

          <a
            href={ALUMNI_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2.5 rounded-xl bg-white px-9 py-3.5 text-base font-bold text-primary shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5"
          >
            {t('button')}
            <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
