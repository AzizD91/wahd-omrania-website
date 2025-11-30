import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_FILE.test(pathname) || pathname.startsWith('/api') || pathname.includes('_next')) {
    return NextResponse.next();
  }

  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0];

  if (!locale || !['ar', 'en'].includes(locale)) {
    const url = req.nextUrl.clone();
    url.pathname = '/ar';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
