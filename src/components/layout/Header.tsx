'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

const NAV_ITEMS = [
  { key: 'about', href: '#about' },
  { key: 'numbers', href: '#numbers' },
  { key: 'map', href: '#map' },
  { key: 'path', href: '#path' },
  { key: 'events', href: '#events' },
  { key: 'alumni', href: '#alumni' },
  { key: 'contact', href: '#contact' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-primary shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-sm">
            <Image
              src="/images/logo.png"
              alt="HaNoar HaOved VeHaLomed"
              width={40}
              height={40}
              className="h-full w-full object-contain"
            />
          </div>
          <span className="hidden sm:block text-base lg:text-lg font-bold text-white leading-tight">
            {t('brandName')}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main">
          {NAV_ITEMS.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-white/80 transition-all duration-200 hover:text-white hover:bg-white/10"
            >
              {t(key)}
            </a>
          ))}
        </nav>

        {/* Language Switcher + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden rounded-lg p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-white/20 bg-primary-dark/50" aria-label="Main mobile">
          <div className="flex flex-col px-4 py-2">
            {NAV_ITEMS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-medium text-white/80 transition-colors duration-200 hover:text-white hover:bg-white/10"
              >
                {t(key)}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
