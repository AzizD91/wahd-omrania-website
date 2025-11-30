export default function AboutPage({ params }: { params: { locale: 'ar' | 'en' } }) {
  const { locale } = params;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const headline = locale === 'ar' ? 'عن وهد العمرانية' : 'About WAHD OMARANIA';
  const paragraphs = locale === 'ar'
    ? [
        'شركة تطوير عقاري فاخرة متخصصة في المنتجعات الخاصة والفلل الراقية.',
        'نمزج بين الهوية المعمارية العصرية والراحة الهادئة لنصنع تجارب سكنية راقية.',
        'يعمل فريقنا بخبرة هندسية عالية لضمان جودة التنفيذ والالتزام بالوقت والتفاصيل.'
      ]
    : [
        'A luxury real estate developer focused on private retreats and signature villas.',
        'We blend modern architectural identity with serene comfort to deliver elevated living.',
        'Our multidisciplinary team ensures engineering excellence, timely delivery, and meticulous attention to detail.'
      ];

  return (
    <section className="container py-12 space-y-6" dir={dir}>
      <h1 className="section-title">{headline}</h1>
      <div className="grid md:grid-cols-2 gap-6 text-gray-700 leading-relaxed">
        {paragraphs.map((p, idx) => (
          <p key={idx} className="card-surface p-5">{p}</p>
        ))}
      </div>
    </section>
  );
}
