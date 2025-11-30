# wahd-omrania-website
# وهد العمرانية | WAHD OMARANIA

موقع ثنائي اللغة (عربي/إنجليزي) مبني بـ Next.js (App Router) مع TailwindCSS وPrisma وPostgreSQL وNextAuth. يتضمن واجهة عامة فاخرة، لوحة تحكم لإدارة المحتوى، وبوابة موظفين لمتابعة المهام.

## المتطلبات
- Node.js 18+
- قاعدة PostgreSQL متاحة

## الإعداد السريع
1. انسخ ملف البيئة:
```bash
cp .env.example .env
```
2. حدث متغير `DATABASE_URL` و`NEXTAUTH_SECRET` بقيمك.
3. ثبّت الحزم (في حال توفر الإنترنت):
```bash
npm install
```
4. حدث قاعدة البيانات وشغّل التوليد:
```bash
npm run prisma:generate
npm run db:push
```
5. أضف بيانات تجريبية:
```bash
npm run db:seed
```
6. شغّل الخادم المحلي:
```bash
npm run dev
```

## الحسابات التجريبية
- Admin: `admin@wahd.com` / `Admin@123`
- Editor: `editor@wahd.com` / `Editor@123`
- Employee: `employee@wahd.com` / `Employee@123`

## البنية
- `app/[locale]/*`: الصفحات العامة (ar/en) تشمل الرئيسية، الخدمات، المشاريع، المدونة، تواصل، إلخ.
- `app/[locale]/admin`: لوحة التحكم لإدارة الهيرو، الخدمات، المشاريع، والمقالات (صلاحيات Admin/Editor).
- `app/[locale]/portal`: بوابة الموظفين لتحديث حالة المهام.
- `prisma/schema.prisma`: نماذج القاعدة (User, Project, ProjectImage, Service, BlogPost, ContactRequest, Settings, EmployeeTask).
- `prisma/seed.ts`: بيانات تجريبية عربية/إنجليزية مع كلمات مرور مشفرة.
- `public/branding`: شعارات الهوية.
- `public/placeholders`: صور افتراضية لمختلف الأقسام.

## النشر على Vercel
1. أنشئ مشروع جديد في Vercel واربط المستودع.
2. أضف متغيرات البيئة في لوحة Vercel (`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`).
3. فعّل بناء Next.js الافتراضي. لا توجد إعدادات مخصصة إضافية.
4. اربط الدومين من تبويب Domains في Vercel.

## ملاحظات تقنية
- الهوية البصرية تعتمد الألوان: برتقالي `#F28C38`, أسود `#111111`, خلفيات `#F7F7F7`.
- الاتجاه الافتراضي عربي (RTL) مع زر تبديل لغة في الهيدر.
- جميع النصوص تأتي من قاعدة البيانات (Settings, Services, Projects, Blog).
- صور Next/Image تستخدم `object-cover` للحفاظ على التناسب.
