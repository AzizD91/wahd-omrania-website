import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_Arabic, Poppins } from 'next/font/google';

const arabic = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-arabic', weight: ['400', '500', '600', '700'] });
const latin = Poppins({ subsets: ['latin'], variable: '--font-latin', weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'وهد العمرانية | WAHD OMARANIA',
  description: 'شركة تطوير عقاري فاخرة وخدمات بناء وتصميم معماري ومنتجعات واستراحات خاصة ومشاريع فلل راقية.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" className={`${arabic.variable} ${latin.variable}`} suppressHydrationWarning>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
