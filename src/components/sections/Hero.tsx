'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ALUMNI_SITE_URL } from '@/lib/links';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section id="top" className="relative overflow-hidden bg-primary-dark">
      {/* Background photo */}
      <div className="absolute inset-0">
        <Image
          src="/images/photo-gathering.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/70 via-primary-dark/55 to-primary-dark/80" />
      </div>

      <div className="relative mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-4 py-20 text-center sm:py-28">
        {/* Bilingual slogan */}
        <h1 className="text-4xl font-black leading-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
          {t('sloganPrimary')}
        </h1>
        <p className="mt-3 text-2xl font-bold text-white/85 drop-shadow sm:text-3xl md:text-4xl" dir="auto">
          {t('sloganSecondary')}
        </p>

        {/* Accent bars */}
        <div className="mt-6 flex justify-center gap-3" aria-hidden="true">
          <span className="inline-block h-1.5 w-14 rounded-full bg-accent" />
          <span className="inline-block h-1.5 w-8 rounded-full bg-white/40" />
          <span className="inline-block h-1.5 w-14 rounded-full bg-accent" />
        </div>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
          {t('subtitle')}
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-accent-dark hover:shadow-xl hover:-translate-y-0.5"
          >
            {t('ctaJoin')}
            <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href={ALUMNI_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-white/70 bg-white/10 px-8 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-primary"
          >
            {t('ctaAlumni')}
          </a>
        </div>
      </div>
    </section>
  );
}
