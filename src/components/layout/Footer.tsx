'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ALUMNI_SITE_URL, MOVEMENT_SITE_URL } from '@/lib/links';

const NAV_KEYS = ['about', 'numbers', 'path', 'events', 'contact'] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="mt-auto">
      <div className="h-1 bg-accent" />
      <div className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3 md:text-start">
            {/* Brand */}
            <div className="flex flex-col items-center gap-4 md:items-start">
              <a href="#top" className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-sm">
                  <Image
                    src="/images/logo.png"
                    alt="HaNoar HaOved VeHaLomed"
                    width={44}
                    height={44}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-lg font-bold leading-tight text-white">{tNav('brandName')}</span>
              </a>
              <p className="text-sm font-semibold text-white/85">{t('slogan')}</p>
            </div>

            {/* Short nav */}
            <nav className="flex flex-col items-center gap-2 md:items-start" aria-label="Footer">
              {NAV_KEYS.map((key) => (
                <a key={key} href={`#${key === 'numbers' ? 'numbers' : key}`} className="text-sm text-white/80 transition-colors hover:text-white">
                  {tNav(key)}
                </a>
              ))}
            </nav>

            {/* Sister sites */}
            <div className="flex flex-col items-center gap-2 md:items-start">
              <a
                href={ALUMNI_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-white/80"
              >
                {t('alumniLink')}
                <svg className="h-3.5 w-3.5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href={MOVEMENT_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
              >
                {t('movementLink')}
                <svg className="h-3.5 w-3.5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-10 border-t border-white/20 pt-6 text-center">
            <p className="text-xs text-white/60">{t('rights')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
