import Link from 'next/link';
import { Logo } from './logo';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextauth-options';
import { LocaleToggle } from './locale-toggle';

export async function Navbar({ locale }: { locale: 'ar' | 'en' }) {
  const session = await getServerSession(authOptions);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const t = {
    home: locale === 'ar' ? 'الرئيسية' : 'Home',
    about: locale === 'ar' ? 'عن الشركة' : 'About',
    services: locale === 'ar' ? 'الخدمات' : 'Services',
    projects: locale === 'ar' ? 'المشاريع' : 'Projects',
    blog: locale === 'ar' ? 'المدونة' : 'Blog',
    contact: locale === 'ar' ? 'تواصل معنا' : 'Contact',
    admin: locale === 'ar' ? 'لوحة التحكم' : 'Admin',
    portal: locale === 'ar' ? 'بوابة الموظف' : 'Portal',
    login: locale === 'ar' ? 'تسجيل الدخول' : 'Login'
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
      <div className="container flex items-center justify-between py-4" dir={dir}>
        <div className="flex items-center gap-6">
          <Link href={`/${locale}`} aria-label="WAHD OMARANIA">
            <Logo locale={locale} className="w-auto h-12" />
          </Link>
          <nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-gray-700">
            <Link href={`/${locale}`}>{t.home}</Link>
            <Link href={`/${locale}/about`}>{t.about}</Link>
            <Link href={`/${locale}/services`}>{t.services}</Link>
            <Link href={`/${locale}/projects`}>{t.projects}</Link>
            <Link href={`/${locale}/blog`}>{t.blog}</Link>
            <Link href={`/${locale}/contact`}>{t.contact}</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <LocaleToggle locale={locale} />
          {session ? (
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Link href={`/${locale}/admin`} className="px-3 py-2 rounded-full bg-gray-100">
                {t.admin}
              </Link>
              <Link href={`/${locale}/portal`} className="px-3 py-2 rounded-full bg-gray-100">
                {t.portal}
              </Link>
            </div>
          ) : (
            <Link href={`/${locale}/login`} className="px-4 py-2 rounded-full bg-brand-orange text-white font-semibold">
              {t.login}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
