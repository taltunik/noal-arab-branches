import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Stats from '@/components/sections/Stats';
import ActivityMap from '@/components/sections/ActivityMap';
import LeadershipPath from '@/components/sections/LeadershipPath';
import YearEvents from '@/components/sections/YearEvents';
import AlumniBridge from '@/components/sections/AlumniBridge';
import Contact from '@/components/sections/Contact';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <About />
      <Stats />
      <ActivityMap />
      <LeadershipPath />
      <YearEvents />
      <AlumniBridge />
      <Contact />
    </>
  );
}
