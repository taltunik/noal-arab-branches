import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { routing } from '@/i18n/routing';
import { getFontClass } from '@/lib/fonts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const RTL_LOCALES = ['he', 'ar'];

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://noal-arab-branches.vercel.app'),
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale === 'ar' ? 'ar_IL' : locale === 'he' ? 'he_IL' : 'en_US',
      images: [{ url: '/images/photo-gathering.jpg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const direction = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';
  const fontClass = getFontClass(locale);

  return (
    <html lang={locale} dir={direction}>
      <body className={`${fontClass} bg-background text-foreground antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Toaster
            position={direction === 'rtl' ? 'top-left' : 'top-right'}
            toastOptions={{
              duration: 4000,
              style: {
                background: '#ffffff',
                color: '#17233A',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              },
            }}
          />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
