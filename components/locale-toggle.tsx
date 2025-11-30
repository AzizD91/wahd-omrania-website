'use client';

import { usePathname, useRouter } from 'next/navigation';

export function LocaleToggle({ locale }: { locale: 'ar' | 'en' }) {
  const pathname = usePathname();
  const router = useRouter();

  const toggle = () => {
    const segments = pathname.split('/').filter(Boolean);
    segments[0] = locale === 'ar' ? 'en' : 'ar';
    router.push('/' + segments.join('/'));
  };

  return (
    <button
      onClick={toggle}
      className="px-3 py-2 rounded-full border border-gray-200 bg-white font-semibold text-sm"
      aria-label="Toggle language"
    >
      {locale === 'ar' ? 'EN' : 'AR'}
    </button>
  );
}
