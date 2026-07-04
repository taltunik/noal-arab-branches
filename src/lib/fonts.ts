import { Tajawal, Heebo, Nunito_Sans } from 'next/font/google';

export const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
  display: 'swap',
});

export const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '700', '800', '900'],
  variable: '--font-heebo',
  display: 'swap',
});

export const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
});

export function getFontClass(locale: string): string {
  if (locale === 'ar') return `${tajawal.variable} ${tajawal.className}`;
  if (locale === 'en') return `${nunitoSans.variable} ${nunitoSans.className}`;
  return `${heebo.variable} ${heebo.className}`;
}
