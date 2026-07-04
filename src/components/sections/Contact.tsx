'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import ScrollReveal, { SectionBar } from '@/components/ui/ScrollReveal';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  YOUTUBE_URL,
  MOVEMENT_SITE_URL,
} from '@/lib/links';

const ROLES = ['roleParent', 'roleYouth', 'roleAlumni', 'rolePartner'] as const;

export default function Contact() {
  const t = useTranslations('contact');
  const [form, setForm] = useState({ name: '', town: '', phone: '', role: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name || form.name.trim().length < 2) newErrors.name = t('nameError');
    if (form.phone && !/^0\d{8,9}$/.test(form.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = t('phoneError');
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // [TODO: connect to a real backend/CRM — until then the form opens a
    // pre-filled email to the branch address]
    const roleLabel = form.role ? t(form.role as (typeof ROLES)[number]) : '';
    const body = encodeURIComponent(
      `${t('name')}: ${form.name}\n${t('town')}: ${form.town}\n${t('phone')}: ${form.phone}\n${t('iAm')}: ${roleLabel}\n\n${form.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(form.name)}&body=${body}`;
    toast.success(t('success'));
  }

  const inputClass =
    'w-full rounded-lg border border-border bg-white px-4 py-2.5 text-foreground placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 transition-shadow';

  return (
    <section id="contact" className="bg-white py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <ScrollReveal direction="up">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">{t('title')}</h2>
            <SectionBar className="mt-4" />
            <p className="mt-4 text-muted">{t('subtitle')}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14">
          {/* Form */}
          <ScrollReveal direction="right" className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border-t-4 border-t-primary bg-background p-6 shadow-md sm:p-8"
              noValidate
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-foreground">
                    {t('name')} *
                  </label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="mt-1 text-sm text-accent">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="town" className="mb-1.5 block text-sm font-semibold text-foreground">
                    {t('town')}
                  </label>
                  <input
                    id="town"
                    value={form.town}
                    onChange={(e) => setForm({ ...form, town: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-foreground">
                    {t('phone')}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    dir="ltr"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-accent">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="role" className="mb-1.5 block text-sm font-semibold text-foreground">
                    {t('iAm')}
                  </label>
                  <select
                    id="role"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">---</option>
                    {ROLES.map((role) => (
                      <option key={role} value={role}>
                        {t(role)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-foreground">
                    {t('message')}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t('messagePlaceholder')}
                    className={inputClass}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-accent px-8 py-3.5 text-base font-bold text-white shadow-md transition-all duration-300 hover:bg-accent-dark hover:shadow-lg cursor-pointer"
              >
                {t('submit')}
              </button>
            </form>
          </ScrollReveal>

          {/* Contact details */}
          <ScrollReveal direction="left" className="lg:col-span-2">
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-foreground">{t('detailsTitle')}</h3>

              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <span dir="ltr">{CONTACT_EMAIL}</span>
              </a>

              <a href={`tel:${CONTACT_PHONE.replace(/-/g, '')}`} className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                <span dir="ltr">{CONTACT_PHONE}</span>
              </a>

              <a href={MOVEMENT_SITE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </span>
                <span>{t('movementSite')} — noal.org.il/arabic</span>
              </a>

              <div>
                <h4 className="mb-3 mt-6 text-sm font-bold uppercase tracking-wide text-muted">{t('followUs')}</h4>
                <div className="flex gap-3">
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-accent">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-accent">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-accent">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
                <p className="mt-2 text-sm text-muted" dir="ltr">@noal.arab</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
