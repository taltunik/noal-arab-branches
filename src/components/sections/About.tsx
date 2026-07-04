'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ScrollReveal, { SectionBar } from '@/components/ui/ScrollReveal';

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="bg-white py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal direction="up">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">{t('title')}</h2>
            <SectionBar className="mt-4" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <ScrollReveal direction="right">
            <div className="space-y-5 text-lg leading-relaxed text-foreground">
              <p>{t('p1')}</p>
              <p>{t('p2')}</p>
              <p className="font-semibold text-primary">{t('p3')}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <div className="relative">
              {/* Circle photo — infographic visual language */}
              <div className="relative mx-auto aspect-square w-72 overflow-hidden rounded-full border-8 border-primary-light shadow-xl sm:w-96">
                <Image
                  src="/images/photo-branch-activity.jpg"
                  alt={t('imageAlt')}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 288px, 384px"
                />
              </div>
              {/* Decorative accents */}
              <span className="absolute -top-2 start-8 h-16 w-16 rounded-full bg-accent/15 sm:start-16" aria-hidden="true" />
              <span className="absolute bottom-2 end-8 h-10 w-10 rounded-full bg-leaf/20 sm:end-16" aria-hidden="true" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
