export function SectionHeading({ title, subtitle, locale }: { title: string; subtitle?: string; locale: 'ar' | 'en' }) {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  return (
    <div className="flex flex-col gap-2" dir={dir}>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="text-gray-600 max-w-2xl">{subtitle}</p>}
    </div>
  );
}
