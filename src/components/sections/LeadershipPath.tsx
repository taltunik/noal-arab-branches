'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal, { SectionBar } from '@/components/ui/ScrollReveal';

const STAGES = [
  {
    id: 1,
    color: 'bg-leaf',
    ring: 'border-leaf/25',
    // Seedling — young groups
    icon: 'M12 21v-8.25M12 12.75c0-4.5-3.5-6.75-7.5-6.75 0 4.5 3 6.75 7.5 6.75zm0 0c0-4.5 3.5-6.75 7.5-6.75 0 4.5-3 6.75-7.5 6.75z',
  },
  {
    id: 2,
    color: 'bg-primary',
    ring: 'border-primary/25',
    // Megaphone — young counselors
    icon: 'M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46',
  },
  {
    id: 3,
    color: 'bg-accent',
    ring: 'border-accent/25',
    // Flag — national service leading branches
    icon: 'M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5',
  },
  {
    id: 4,
    color: 'bg-primary-dark',
    ring: 'border-primary/25',
    // Star — young adults leading society
    icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
  },
] as const;

export default function LeadershipPath() {
  const t = useTranslations('path');

  return (
    <section id="path" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <ScrollReveal direction="up">
          <div className="mb-14 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">{t('title')}</h2>
            <SectionBar className="mt-4" />
            <p className="mt-4 text-lg text-muted">{t('subtitle')}</p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <ol className="relative space-y-10">
          {STAGES.map((stage, i) => {
            const points = t(`stage${stage.id}Points`).split('|');
            return (
              <li key={stage.id} className="relative">
                {/* Dashed connector to next stage */}
                {i < STAGES.length - 1 && (
                  <span
                    className="dashed-connector absolute start-7 top-16 hidden h-[calc(100%+1rem)] sm:block"
                    aria-hidden="true"
                  />
                )}
                <ScrollReveal direction="up">
                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                    {/* Stage icon */}
                    <div
                      className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${stage.color} text-white shadow-lg`}
                    >
                      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d={stage.icon} />
                      </svg>
                    </div>

                    {/* Stage card */}
                    <div className={`flex-1 rounded-2xl border-2 ${stage.ring} bg-background p-6 shadow-sm transition-shadow duration-300 hover:shadow-md`}>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-xl font-bold text-foreground">
                          {t(`stage${stage.id}Title`)}
                        </h3>
                        <span className={`rounded-full px-3 py-0.5 text-xs font-bold text-white ${stage.color}`}>
                          {t(`stage${stage.id}Ages`)}
                        </span>
                      </div>
                      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                        {points.map((point) => (
                          <li key={point} className="flex items-center gap-1.5 text-muted">
                            <span className={`inline-block h-1.5 w-1.5 rounded-full ${stage.color}`} aria-hidden="true" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
