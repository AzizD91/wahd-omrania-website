'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage({ params }: { params: { locale: 'ar' | 'en' } }) {
  const { locale } = params;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || `/${locale}/admin`;

  const t = {
    title: locale === 'ar' ? 'تسجيل الدخول' : 'Sign in',
    email: locale === 'ar' ? 'البريد الإلكتروني' : 'Email',
    password: locale === 'ar' ? 'كلمة المرور' : 'Password',
    button: locale === 'ar' ? 'دخول' : 'Login'
  };

  return (
    <section className="container py-12" dir={dir}>
      <div className="max-w-md mx-auto card-surface p-6 space-y-4">
        <h1 className="section-title text-center">{t.title}</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await signIn('credentials', { redirect: false, email, password, callbackUrl });
            if (!res?.error) {
              router.push(callbackUrl);
            }
          }}
          className="space-y-4"
        >
          <div>
            <label className="form-label">{t.email}</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
          </div>
          <div>
            <label className="form-label">{t.password}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
          </div>
          <button type="submit" className="hero-button w-full justify-center">
            {t.button}
          </button>
        </form>
      </div>
    </section>
  );
}
