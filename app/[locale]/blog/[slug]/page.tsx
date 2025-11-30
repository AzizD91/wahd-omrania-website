import { getBlogPostBySlug, pickLocale } from '@/lib/content';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function BlogDetails({ params }: { params: { locale: 'ar' | 'en'; slug: string } }) {
  const { locale, slug } = params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return notFound();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <article className="container py-12 space-y-6" dir={dir}>
      <div className="relative h-80 rounded-3xl overflow-hidden">
        <Image src={post.image} alt={post.titleEn} fill className="object-cover" />
      </div>
      <div className="space-y-4">
        <h1 className="section-title">{pickLocale(post, locale, { ar: 'titleAr', en: 'titleEn' })}</h1>
        <div className="prose prose-lg max-w-none" dir={dir}>
          {pickLocale(post, locale, { ar: 'contentAr', en: 'contentEn' })}
        </div>
      </div>
    </article>
  );
}
