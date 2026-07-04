'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useLocale, useTranslations } from 'next-intl';
import clsx from 'clsx';
import ScrollReveal, { SectionBar } from '@/components/ui/ScrollReveal';

// [TODO: verify photo-to-event pairing with the team — confident matches:
// gathering→Tajamhur, snow→Hermon; the rest are representative movement photos]
const EVENT_IMAGES = [
  '/images/photo-hall-circle.jpg', // e1 social leadership course
  '/images/photo-rafting.jpg', // e2 coordinators course
  '/images/photo-gathering.jpg', // e3 Tajamhur
  '/images/placeholder-group.jpg', // e4 winter trip
  '/images/placeholder-camp.jpg', // e5 Eilat trip
  '/images/photo-hermon-snow.jpg', // e6 Mount Hermon
  '/images/placeholder-activity.jpg', // e7 Ramadan & holidays
  '/images/placeholder-event.jpg', // e8 towards guiding
  '/images/photo-hall-circle.jpg', // e9 Murshid Adel
  '/images/placeholder-camp.jpg', // e10 dream camp
];

const EVENT_KEYS = ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'e10'] as const;

export default function YearEvents() {
  const t = useTranslations('events');
  const locale = useLocale();
  const isRTL = locale === 'he' || locale === 'ar';

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      direction: isRTL ? 'rtl' : 'ltr',
      align: 'start',
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="events" className="bg-background py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal direction="up">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">{t('title')}</h2>
            <SectionBar className="mt-4" />
            <p className="mt-4 text-muted">{t('subtitle')}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {EVENT_KEYS.map((key, i) => (
                <div
                  key={key}
                  className="min-w-0 shrink-0 grow-0 basis-[85%] px-2 sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="group relative h-64 overflow-hidden rounded-2xl shadow-md sm:h-72">
                    <Image
                      src={EVENT_IMAGES[i]}
                      alt={t('imageAlt', { name: t(key) })}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                    <div className="absolute bottom-0 start-0 end-0 p-5">
                      <h3 className="text-lg font-bold leading-snug text-white drop-shadow sm:text-xl">
                        {t(key)}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {EVENT_KEYS.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={clsx(
                  'h-2.5 rounded-full transition-all duration-300 cursor-pointer',
                  selectedIndex === index ? 'w-7 bg-primary' : 'w-2.5 bg-primary/25 hover:bg-primary/50'
                )}
                aria-label={t(EVENT_KEYS[index])}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
