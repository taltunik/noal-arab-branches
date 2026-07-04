'use client';

import { useEffect, useRef, useState } from 'react';

type CountUpProps = {
  end: number;
  duration?: number;
  className?: string;
};

/** Animated number that counts up when scrolled into view. */
export default function CountUp({ end, duration = 1800, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const start = () => {
      if (started.current) return;
      started.current = true;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setValue(end);
        return;
      }
      const t0 = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - t0) / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(end * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      // rAF is throttled in background tabs — guarantee the final value
      setTimeout(() => setValue(end), duration + 200);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={className} dir="ltr">
      {value.toLocaleString('en-US')}
    </span>
  );
}
