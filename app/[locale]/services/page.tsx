import { getServices, pickLocale } from '@/lib/content';

export default async function ServicesPage({
  params,
}: {
  params: { locale: 'ar' | 'en' };
}) {
  const { locale } = params;
  const services = await getServices();

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <section className="container py-12 space-y-6" dir={dir}>
      <h1 className="section-title">
        {locale === 'ar' ? 'الخدمات' : 'Services'}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service) => {
          const name = pickLocale(service, locale, {
            ar: 'nameAr',
            en: 'nameEn',
          });

          const description = pickLocale(service, locale, {
            ar: 'descriptionAr',
            en: 'descriptionEn',
          });

          return (
            <div key={service.id} className="card-surface p-6 space-y-3">
              <div className="text-sm text-brand-orange font-semibold">
                {locale === 'ar' ? 'خدمة' : 'Service'}
              </div>

              <h3 className="text-xl font-semibold">
                {String(name)}
              </h3>

              <p className="text-gray-600">
                {String(description)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
