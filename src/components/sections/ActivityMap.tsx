'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ScrollReveal, { SectionBar } from '@/components/ui/ScrollReveal';

type District = 'north' | 'haifa' | 'center' | 'south';

// Data-viz colors for districts (not theme tokens on purpose — map legend colors)
const DISTRICT_COLORS: Record<District, string> = {
  north: '#1D4E9E', // movement blue
  haifa: '#3E9B4F', // wreath green
  center: '#D93636', // lanyard red
  south: '#E39B2D', // desert amber
};

// Approximate geo positions projected to the 340x640 viewBox
const TOWNS: { key: string; district: District; x: number; y: number }[] = [
  { key: 'acre', district: 'north', x: 174, y: 75 },
  { key: 'sheikhDanun', district: 'north', x: 188, y: 64 },
  { key: 'tarshiha', district: 'north', x: 208, y: 56 },
  { key: 'nahf', district: 'north', x: 224, y: 73 },
  { key: 'kamane', district: 'north', x: 236, y: 80 },
  { key: 'tuba', district: 'north', x: 272, y: 72 },
  { key: 'tamra', district: 'north', x: 198, y: 88 },
  { key: 'sakhnin', district: 'north', x: 220, y: 85 },
  { key: 'nazareth', district: 'north', x: 222, y: 110 },
  { key: 'haifa', district: 'haifa', x: 158, y: 96 },
  { key: 'ummAlFahm', district: 'center', x: 190, y: 141 },
  { key: 'kafrQara', district: 'center', x: 170, y: 142 },
  { key: 'baqa', district: 'center', x: 166, y: 157 },
  { key: 'jerusalem', district: 'center', x: 202, y: 259 },
  { key: 'hura', district: 'south', x: 148, y: 336 },
  { key: 'rahat', district: 'south', x: 112, y: 322 },
  { key: 'alFura', district: 'south', x: 170, y: 349 },
];

// Stylized Israel outline (approximate, intentionally simplified)
const ISRAEL_PATH =
  'M180,50 L274,19 L288,112 L274,160 L270,264 L240,360 L200,480 L150,616 L136,568 L70,400 L10,349 L70,277 L108,211 L130,171 L152,93 Z';

const DISTRICTS: District[] = ['north', 'haifa', 'center', 'south'];

export default function ActivityMap() {
  const t = useTranslations('map');
  const [active, setActive] = useState<string | null>(null);

  const districtLabel: Record<District, string> = {
    north: t('districtNorth'),
    haifa: t('districtHaifa'),
    center: t('districtCenter'),
    south: t('districtSouth'),
  };

  return (
    <section id="map" className="bg-background py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal direction="up">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">{t('title')}</h2>
            <SectionBar className="mt-4" />
            <p className="mt-4 text-muted">{t('subtitle')}</p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center lg:gap-16">
          {/* SVG map */}
          <ScrollReveal direction="right" className="shrink-0">
            <div className="relative">
              <svg
                viewBox="0 0 340 640"
                className="h-[420px] w-auto sm:h-[520px]"
                role="img"
                aria-label={t('title')}
              >
                {/* Country silhouette */}
                <path
                  d={ISRAEL_PATH}
                  fill="#E8F0FC"
                  stroke="#1D4E9E"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeDasharray="7 5"
                />
                {/* Town dots */}
                {TOWNS.map((town) => (
                  <g
                    key={town.key}
                    tabIndex={0}
                    role="button"
                    aria-label={t(`towns.${town.key}`)}
                    onMouseEnter={() => setActive(town.key)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(town.key)}
                    onBlur={() => setActive(null)}
                    className="cursor-pointer outline-none"
                  >
                    <title>{t(`towns.${town.key}`)}</title>
                    <circle
                      cx={town.x}
                      cy={town.y}
                      r={active === town.key ? 11 : 7}
                      fill={DISTRICT_COLORS[town.district]}
                      fillOpacity={active === town.key ? 1 : 0.85}
                      stroke="white"
                      strokeWidth="2"
                      style={{ transition: 'r 0.2s ease' }}
                    />
                  </g>
                ))}
              </svg>

              {/* Tooltip */}
              {active && (
                <div
                  className="pointer-events-none absolute z-10 -translate-x-1/2 rounded-lg bg-foreground px-3 py-1.5 text-sm font-bold text-white shadow-lg whitespace-nowrap"
                  style={{
                    left: `${((TOWNS.find((tw) => tw.key === active)?.x ?? 0) / 340) * 100}%`,
                    top: `calc(${((TOWNS.find((tw) => tw.key === active)?.y ?? 0) / 640) * 100}% - 2.4rem)`,
                  }}
                  dir="auto"
                >
                  {t(`towns.${active}`)}
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Legend + town chips by district */}
          <ScrollReveal direction="left" className="w-full max-w-xl">
            <div className="space-y-6">
              {DISTRICTS.map((district) => (
                <div key={district}>
                  <div className="mb-2.5 flex items-center gap-2.5">
                    <span
                      className="inline-block h-4 w-4 rounded-full border-2 border-white shadow"
                      style={{ background: DISTRICT_COLORS[district] }}
                      aria-hidden="true"
                    />
                    <h3 className="text-lg font-bold text-foreground">{districtLabel[district]}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {TOWNS.filter((tw) => tw.district === district).map((tw) => (
                      <button
                        key={tw.key}
                        type="button"
                        onMouseEnter={() => setActive(tw.key)}
                        onMouseLeave={() => setActive(null)}
                        onFocus={() => setActive(tw.key)}
                        onBlur={() => setActive(null)}
                        className={`rounded-full border px-3.5 py-1 text-sm font-medium transition-all duration-200 cursor-default ${
                          active === tw.key
                            ? 'border-primary bg-primary text-white shadow'
                            : 'border-border bg-white text-foreground'
                        }`}
                      >
                        {t(`towns.${tw.key}`)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <p className="text-sm text-muted">{t('note')}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
