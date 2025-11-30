import { AuthProvider } from '@/components/auth-provider';
import { Navbar } from '@/components/navbar';
import { getSiteSettings } from '@/lib/content';
import { ReactNode } from 'react';
import { notFound } from 'next/navigation';

export default async function LocaleLayout({ params, children }: { params: { locale: 'ar' | 'en' }; children: ReactNode }) {
  const { locale } = params;
  if (!['ar', 'en'].includes(locale)) return notFound();
  const settings = await getSiteSettings();

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark" dir={dir}>
      <AuthProvider>
        <Navbar locale={locale} />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-brand-dark text-white py-10 mt-16">
          <div className="container flex flex-col gap-4" dir={dir}>
            <div className="text-xl font-semibold">{locale === 'ar' ? 'وهد العمرانية' : 'WAHD OMARANIA'}</div>
            <p className="max-w-3xl text-sm text-gray-300">{locale === 'ar' ? settings?.footerAr : settings?.footerEn}</p>
            <div className="flex gap-4 text-sm text-gray-300">
              {settings?.socials &&
                Object.entries(settings.socials as Record<string, string>).map(([key, url]) => (
                  <a key={key} href={url} className="hover:text-brand-orange" target="_blank" rel="noreferrer">
                    {key}
                  </a>
                ))}
            </div>
          </div>
        </footer>
      </AuthProvider>
    </div>
  );
}
