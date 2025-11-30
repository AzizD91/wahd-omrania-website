import { getBlogPostBySlug, pickLocale } from '@/lib/content';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function BlogDetails({
  params,
}: {
  params: { locale: 'ar' | 'en'; slug: string };
}) {
  const { locale, slug } = params;

  const post = await getBlogPostBySlug(slug);
  if (!post) return notFound();

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const title = pickLocale(post, locale, {
    ar: 'titleAr',
    en: 'titleEn',
  });

  const content = pickLocale(post, locale, {
    ar: 'contentAr',
    en: 'contentEn',
  });

  return (
