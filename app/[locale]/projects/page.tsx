import { getProjects, pickLocale } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProjectsPage({
  params,
}: {
  params: { locale: 'ar' | 'en' };
}) {
  const { locale } = params;
  const projects = await getProjects();

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <section className="container py-12 space-y-6" dir={dir}>
      <h1 className="section-title">
        {locale === 'ar' ? 'المشاريع' : 'Projects'}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => {
          const title = pickLocale(project, locale, {
            ar: 'titleAr',
            en: 'titleEn',
          });

          const description = pickLocale(project, locale, {
            ar: 'descriptionAr',
            en: 'descriptionEn',
          });

          const location = pickLocale(project, locale, {
            ar: 'locationAr',
            en: 'locationEn',
          });

          return (
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
                  {String(title)}
                </h3>

                <p className="text-gray-600 line-clamp-2">
                  {String(description)}
                </p>

                <div className="text-sm text-gray-500">
                  {String(location)}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
