import { getBlogPosts, pickLocale } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';

export default async function BlogPage({
  params,
}: {
  params: { locale: 'ar' | 'en' };
}) {
  const { locale } = params;

  const posts = await getBlogPosts();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <section className="container py-12 space-y-6" dir={dir}>
      <h1 className="section-title">
        {locale === 'ar' ? 'المدونة' : 'Blog'}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => {
          const title = pickLocale(post, locale, {
            ar: 'titleAr',
            en: 'titleEn',
          });

          const content = pickLocale(post, locale, {
            ar: 'contentAr',
            en: 'contentEn',
          });

          return (
            <Link
              key={post.id}
              href={`/${locale}/blog/${post.slug}`}
              className="card-surface overflow-hidden group"
            >
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.titleEn}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5 space-y-2" dir={dir}>
                <h3 className="text-xl font-semibold">
                  {String(title)}
                </h3>

                <p className="text-gray-600 line-clamp-3">
                  {String(content)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
