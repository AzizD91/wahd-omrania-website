import { authOptions } from '@/lib/nextauth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getProjects, getServices, getBlogPosts, getSiteSettings } from '@/lib/content';

export default async function AdminPage({ params }: { params: { locale: 'ar' | 'en' } }) {
  const session = await getServerSession(authOptions);
  const { locale } = params;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  if (!session || !['admin', 'editor'].includes((session.user as any)?.role)) {
    redirect(`/${locale}/login?callbackUrl=/${locale}/admin`);
  }

  const [services, projects, posts, settings] = await Promise.all([
    getServices(),
    getProjects(),
    getBlogPosts(),
    getSiteSettings()
  ]);

  async function createService(formData: FormData) {
    'use server';
    await prisma.service.create({
      data: {
        nameAr: String(formData.get('nameAr') || ''),
        nameEn: String(formData.get('nameEn') || ''),
        descriptionAr: String(formData.get('descriptionAr') || ''),
        descriptionEn: String(formData.get('descriptionEn') || '')
      }
    });
    revalidatePath(`/${locale}/services`);
    revalidatePath(`/${locale}/admin`);
  }

  async function createBlog(formData: FormData) {
    'use server';
    await prisma.blogPost.create({
      data: {
        slug: String(formData.get('slug') || ''),
        titleAr: String(formData.get('titleAr') || ''),
        titleEn: String(formData.get('titleEn') || ''),
        contentAr: String(formData.get('contentAr') || ''),
        contentEn: String(formData.get('contentEn') || ''),
        image: String(formData.get('image') || '/placeholders/blog-1.png')
      }
    });
    revalidatePath(`/${locale}/blog`);
    revalidatePath(`/${locale}/admin`);
  }

  async function createProject(formData: FormData) {
    'use server';
    await prisma.project.create({
      data: {
        titleAr: String(formData.get('titleAr') || ''),
        titleEn: String(formData.get('titleEn') || ''),
        descriptionAr: String(formData.get('descriptionAr') || ''),
        descriptionEn: String(formData.get('descriptionEn') || ''),
        locationAr: String(formData.get('locationAr') || ''),
        locationEn: String(formData.get('locationEn') || ''),
        type: String(formData.get('type') || ''),
        status: String(formData.get('status') || ''),
        areas: String(formData.get('areas') || ''),
        mainImageUrl: String(formData.get('mainImageUrl') || '/placeholders/project-main.png')
      }
    });
    revalidatePath(`/${locale}/projects`);
    revalidatePath(`/${locale}/admin`);
  }

  async function updateHero(formData: FormData) {
    'use server';
    await prisma.settings.upsert({
      where: { id: settings?.id || 1 },
      create: {
        heroTitleAr: String(formData.get('heroTitleAr') || ''),
        heroTitleEn: String(formData.get('heroTitleEn') || ''),
        heroSubtitleAr: String(formData.get('heroSubtitleAr') || ''),
        heroSubtitleEn: String(formData.get('heroSubtitleEn') || ''),
        heroCtaTextAr: String(formData.get('heroCtaTextAr') || ''),
        heroCtaTextEn: String(formData.get('heroCtaTextEn') || ''),
        heroCtaLink: String(formData.get('heroCtaLink') || ''),
        heroImageUrl: String(formData.get('heroImageUrl') || '/placeholders/hero.png'),
        footerAr: settings?.footerAr || '',
        footerEn: settings?.footerEn || '',
        socials: settings?.socials || {}
      },
      update: {
        heroTitleAr: String(formData.get('heroTitleAr') || ''),
        heroTitleEn: String(formData.get('heroTitleEn') || ''),
        heroSubtitleAr: String(formData.get('heroSubtitleAr') || ''),
        heroSubtitleEn: String(formData.get('heroSubtitleEn') || ''),
        heroCtaTextAr: String(formData.get('heroCtaTextAr') || ''),
        heroCtaTextEn: String(formData.get('heroCtaTextEn') || ''),
        heroCtaLink: String(formData.get('heroCtaLink') || ''),
        heroImageUrl: String(formData.get('heroImageUrl') || '/placeholders/hero.png')
      }
    });
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/admin`);
  }

  return (
    <section className="container py-12 space-y-10" dir={dir}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{session.user?.email}</p>
          <h1 className="section-title">{locale === 'ar' ? 'لوحة التحكم' : 'Admin Dashboard'}</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <form action={updateHero} className="card-surface p-6 space-y-3">
          <h2 className="text-xl font-semibold">{locale === 'ar' ? 'إعدادات الهيرو' : 'Hero Settings'}</h2>
          <input name="heroTitleAr" placeholder="العنوان (ع)" defaultValue={settings?.heroTitleAr} className="form-input" />
          <input name="heroTitleEn" placeholder="Title (En)" defaultValue={settings?.heroTitleEn} className="form-input" />
          <textarea name="heroSubtitleAr" placeholder="الوصف (ع)" defaultValue={settings?.heroSubtitleAr} className="form-input" />
          <textarea name="heroSubtitleEn" placeholder="Subtitle (En)" defaultValue={settings?.heroSubtitleEn} className="form-input" />
          <input name="heroCtaTextAr" placeholder="نص الزر (ع)" defaultValue={settings?.heroCtaTextAr} className="form-input" />
          <input name="heroCtaTextEn" placeholder="CTA text (En)" defaultValue={settings?.heroCtaTextEn} className="form-input" />
          <input name="heroCtaLink" placeholder="الرابط" defaultValue={settings?.heroCtaLink} className="form-input" />
          <input name="heroImageUrl" placeholder="رابط الصورة" defaultValue={settings?.heroImageUrl} className="form-input" />
          <button className="hero-button" type="submit">{locale === 'ar' ? 'حفظ' : 'Save'}</button>
        </form>

        <form action={createService} className="card-surface p-6 space-y-3">
          <h2 className="text-xl font-semibold">{locale === 'ar' ? 'إضافة خدمة' : 'Add Service'}</h2>
          <input name="nameAr" placeholder="الاسم بالعربية" className="form-input" required />
          <input name="nameEn" placeholder="Name in English" className="form-input" required />
          <textarea name="descriptionAr" placeholder="الوصف بالعربية" className="form-input" />
          <textarea name="descriptionEn" placeholder="Description in English" className="form-input" />
          <button className="hero-button" type="submit">{locale === 'ar' ? 'إضافة' : 'Add'}</button>
          <div className="text-sm text-gray-500">{locale === 'ar' ? 'الخدمات الحالية' : 'Current services'}: {services.length}</div>
        </form>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <form action={createProject} className="card-surface p-6 space-y-3">
          <h2 className="text-xl font-semibold">{locale === 'ar' ? 'إضافة مشروع' : 'Add Project'}</h2>
          <input name="titleAr" placeholder="عنوان عربي" className="form-input" required />
          <input name="titleEn" placeholder="Title English" className="form-input" required />
          <textarea name="descriptionAr" placeholder="الوصف العربي" className="form-input" />
          <textarea name="descriptionEn" placeholder="English description" className="form-input" />
          <input name="locationAr" placeholder="الموقع عربي" className="form-input" />
          <input name="locationEn" placeholder="Location EN" className="form-input" />
          <input name="type" placeholder="النوع" className="form-input" />
          <input name="status" placeholder="الحالة" className="form-input" />
          <input name="areas" placeholder="المساحات" className="form-input" />
          <input name="mainImageUrl" placeholder="صورة رئيسية" className="form-input" />
          <button className="hero-button" type="submit">{locale === 'ar' ? 'حفظ' : 'Save'}</button>
          <div className="text-sm text-gray-500">{locale === 'ar' ? 'عدد المشاريع' : 'Projects count'}: {projects.length}</div>
        </form>

        <form action={createBlog} className="card-surface p-6 space-y-3">
          <h2 className="text-xl font-semibold">{locale === 'ar' ? 'مقال جديد' : 'New Blog Post'}</h2>
          <input name="slug" placeholder="slug" className="form-input" required />
          <input name="titleAr" placeholder="عنوان عربي" className="form-input" required />
          <input name="titleEn" placeholder="Title English" className="form-input" required />
          <textarea name="contentAr" placeholder="المحتوى العربي" className="form-input" />
          <textarea name="contentEn" placeholder="English content" className="form-input" />
          <input name="image" placeholder="رابط الصورة" className="form-input" />
          <button className="hero-button" type="submit">{locale === 'ar' ? 'نشر' : 'Publish'}</button>
          <div className="text-sm text-gray-500">{locale === 'ar' ? 'عدد المقالات' : 'Posts'}: {posts.length}</div>
        </form>
      </div>
    </section>
  );
}
