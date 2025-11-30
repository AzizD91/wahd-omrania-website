import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export default function ContactPage({ params }: { params: { locale: 'ar' | 'en' } }) {
  const { locale } = params;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  async function submitContact(formData: FormData) {
    'use server';
    await prisma.contactRequest.create({
      data: {
        name: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        phone: String(formData.get('phone') || ''),
        requested: String(formData.get('requested') || ''),
        message: String(formData.get('message') || '')
      }
    });
    revalidatePath(`/${locale}/contact`);
  }

  return (
    <section className="container py-12 space-y-6" dir={dir}>
      <h1 className="section-title">{locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}</h1>
      <form action={submitContact} className="card-surface p-6 space-y-4">
        <div>
          <label className="form-label">{locale === 'ar' ? 'الاسم' : 'Name'}</label>
          <input name="name" className="form-input" required />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">{locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
            <input type="email" name="email" className="form-input" required />
          </div>
          <div>
            <label className="form-label">{locale === 'ar' ? 'الجوال' : 'Phone'}</label>
            <input name="phone" className="form-input" />
          </div>
        </div>
        <div>
          <label className="form-label">{locale === 'ar' ? 'الخدمة المطلوبة' : 'Requested Service'}</label>
          <input name="requested" className="form-input" />
        </div>
        <div>
          <label className="form-label">{locale === 'ar' ? 'الرسالة' : 'Message'}</label>
          <textarea name="message" className="form-input" rows={4}></textarea>
        </div>
        <button type="submit" className="hero-button">
          {locale === 'ar' ? 'إرسال' : 'Send'}
        </button>
      </form>
    </section>
  );
}
