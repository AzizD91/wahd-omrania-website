import Image from 'next/image';

export function Logo({ locale = 'ar', className = '' }: { locale?: 'ar' | 'en'; className?: string }) {
  const src = locale === 'ar' ? '/branding/logo-ar.svg' : '/branding/logo-en.svg';
  return <Image src={src} alt="WAHD OMARANIA" width={140} height={60} className={className} priority />;
}
