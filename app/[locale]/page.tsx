import { Hero } from '@/components/hero';
import { SectionHeading } from '@/components/section-heading';
import {
  getBlogPosts,
  getProjects,
  getServices,
  getSiteSettings,
  pickLocale,
} from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';

export default async function HomePage({
  params,
}: {
  params: { locale: 'ar' | 'en' };
}) {
  const { locale } = params;
  const [settings, services, projects, posts] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getProjects(),
    getBlogPosts(),
  ]);

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="space-y-16 pb-16">
      <Hero locale={locale} settings={settings} />

      {/* قسم الخدمات */}
      <section className="container space-y-8" dir={dir}>
        <SectionHeading
          locale={locale}
          title={locale === 'ar' ? 'رؤيتنا' : 'Our Vision'}
          subtitle={
            locale === 'ar'
              ? 'نصمم ونبني مشاريع تعكس فخامة هادئة وهوية معمارية معاصرة.'
              : 'We craft architecture that blends quiet luxury with modern identity.'
          }
        />
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="card-surface p-6 space-y-3">
              <h3 className="text-xl font-semibold">
                {String(
                  pickLocale(service, locale, {
                    ar: 'nameAr',
                    en: 'nameEn',
                  }),
                )}
              </h3>
              <p className="text-gray-600">
                {String(
                  pickLocale(service, locale, {
                    ar: 'descriptionAr',
                    en: 'descriptionEn',
                  }),
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* قسم المشاريع */}
      <section className="container space-y-8" dir={dir}>
        <SectionHeading
          locale={locale}
          title={locale === 'ar' ? 'مختارات من المشاريع' : 'Signature Projects'}
          subtitle={
            locale === 'ar'
              ? 'منتجعات خاصة وفيلات فاخرة مصممة بأعلى المعايير.'
              : 'Private retreats and luxury villas engineered to perfection.'
          }
        />
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/${locale}/projects/${project.id}`}
              className="card-surface overflow-hidden group"
            >
              <div className="relative h-64">
                <Image
                  src={project.mainImageUrl}
                  alt={project.titleEn}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 space-y-2" dir={dir}>
                <div className="text-sm text-brand-orange font-semibold">
                  {project.type}
                </div>
                <h3 className="text-2xl font-semibold">
                  {String(
                    pickLocale(project, locale, {
                      ar: 'titleAr',
                      en: 'titleEn',
                    }),
                  )}
                </h3>
                <p className="text-gray-600 line-clamp-2">
                  {String(
                    pickLocale(project, locale, {
                      ar: 'descriptionAr',
                      en: 'descriptionEn',
                    }),
                  )}
                </p>
                <div className="text-sm text-gray-500">
                  {String(
                    pickLocale(project, locale, {
                      ar: 'locationAr',
                      en: 'locationEn',
                    }),
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* قسم المدونة */}
      <section className="container space-y-8" dir={dir}>
        <SectionHeading
          locale={locale}
          title={locale === 'ar' ? 'من المدونة' : 'From the blog'}
          subtitle={
            locale === 'ar'
              ? 'أفكار حول الفخامة الهادئة والابتكار المعماري.'
              : 'Insights on quiet luxury and architectural innovation.'
          }
        />
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
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
                  {String(
                    pickLocale(post, locale, {
                      ar: 'titleAr',
                      en: 'titleEn',
                    }),
                  )}
                </h3>
                <p className="text-gray-600 line-clamp-3">
                  {String(
                    pickLocale(post, locale, {
                      ar: 'contentAr',
                      en: 'contentEn',
                    }),
                  )}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
