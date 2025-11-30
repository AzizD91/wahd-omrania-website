import { getProjectById, pickLocale } from '@/lib/content';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function ProjectDetails({
  params,
}: {
  params: { locale: 'ar' | 'en'; id: string };
}) {
  const { locale, id } = params;

  const project = await getProjectById(Number(id));
  if (!project) return notFound();

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

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
    <section className="container py-12 space-y-8" dir={dir}>
      <div className="relative h-96 rounded-3xl overflow-hidden">
        <Image
          src={project.mainImageUrl}
          alt={project.titleEn}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-4">
        <h1 className="section-title">
          {String(title)}
        </h1>

        <p className="text-gray-700 text-lg max-w-3xl">
          {String(description)}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="card-surface p-4">
          <div className="text-sm text-gray-500">
            {locale === 'ar' ? 'الموقع' : 'Location'}
          </div>
          <div className="font-semibold">
            {String(location)}
          </div>
        </div>

        <div className="card-surface p-4">
          <div className="text-sm text-gray-500">
            {locale === 'ar' ? 'الحالة' : 'Status'}
          </div>
          <div className="font-semibold">
            {String(project.status)}
          </div>
        </div>

        <div className="card-surface p-4">
          <div className="text-sm text-gray-500">
            {locale === 'ar' ? 'المساحة' : 'Areas'}
          </div>
          <div className="font-semibold">
            {String(project.areas)}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {project.images.map((img) => {
          const caption = pickLocale(img, locale, {
            ar: 'captionAr',
            en: 'captionEn',
          });

          return (
            <div
              key={img.id}
              className="relative h-48 rounded-2xl overflow-hidden"
            >
              <Image
                src={img.imageUrl}
                alt={img.captionEn}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 text-white p-3 text-sm flex items-end">
                {String(caption)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
