import Image from 'next/image';
import Link from 'next/link';
import { Settings } from '@prisma/client';

export function Hero({ locale, settings }: { locale: 'ar' | 'en'; settings: Settings | null }) {
  const title = locale === 'ar' ? settings?.heroTitleAr : settings?.heroTitleEn;
  const subtitle = locale === 'ar' ? settings?.heroSubtitleAr : settings?.heroSubtitleEn;
  const ctaText = locale === 'ar' ? settings?.heroCtaTextAr : settings?.heroCtaTextEn;
  const ctaLink = settings?.heroCtaLink || '/';
  const image = settings?.heroImageUrl || '/placeholders/hero.png';
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <section className="relative h-[70vh] overflow-hidden rounded-3xl mx-auto container mt-8" dir={dir}>
      <Image src={image} alt="Hero" fill className="object-cover" priority />
      <div className="absolute inset-0 gradient-overlay" />
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-2xl space-y-4 text-white">
          <p className="uppercase tracking-[0.3em] text-xs text-gray-200">WAHD OMARANIA</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">{title}</h1>
          <p className="text-lg text-gray-100 max-w-2xl">{subtitle}</p>
          <Link href={ctaLink} className="hero-button">
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
