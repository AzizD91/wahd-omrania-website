import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Admin@123', 10);
  const editorPassword = await bcrypt.hash('Editor@123', 10);
  const employeePassword = await bcrypt.hash('Employee@123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@wahd.com' },
    update: {},
    create: { name: 'Admin', email: 'admin@wahd.com', password, role: Role.admin }
  });

  await prisma.user.upsert({
    where: { email: 'editor@wahd.com' },
    update: {},
    create: { name: 'Editor', email: 'editor@wahd.com', password: editorPassword, role: Role.editor }
  });

  const employee = await prisma.user.upsert({
    where: { email: 'employee@wahd.com' },
    update: {},
    create: { name: 'Employee', email: 'employee@wahd.com', password: employeePassword, role: Role.employee }
  });

  const settings = await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      heroTitleAr: 'نبني الفخامة بشغف هندسي',
      heroTitleEn: 'Crafting Quiet Luxury with Architectural Precision',
      heroSubtitleAr: 'وهد العمرانية شركة تطوير عقاري رائدة في إنشاء الفلل الراقية والمنتجعات الخاصة.',
      heroSubtitleEn: 'WAHD OMARANIA delivers bespoke villas, private retreats, and architectural excellence.',
      heroCtaTextAr: 'استكشف مشاريعنا',
      heroCtaTextEn: 'Explore Projects',
      heroCtaLink: '/ar/projects',
      heroImageUrl: '/placeholders/hero.png',
      footerAr: '© 2025 وهد العمرانية. جميع الحقوق محفوظة.',
      footerEn: '© 2025 WAHD OMARANIA. All rights reserved.',
      socials: {
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com'
      }
    }
  });

  const project = await prisma.project.create({
    data: {
      titleAr: 'منتجع واجهة البحر',
      titleEn: 'Seafront Retreat',
      descriptionAr: 'منتجع فاخر بإطلالة بحرية معززة بواجهات زجاجية ومساحات خضراء.',
      descriptionEn: 'A luxury seafront retreat featuring glass facades and lush landscapes.',
      locationAr: 'البحر الأحمر، السعودية',
      locationEn: 'Red Sea, Saudi Arabia',
      type: 'منتجع',
      status: 'قيد الإنشاء',
      areas: '12,500 م²',
      mainImageUrl: '/placeholders/project-main.png',
      images: {
        create: [
          { imageUrl: '/placeholders/project-1.png', captionAr: 'واجهة زجاجية', captionEn: 'Glass facade' },
          { imageUrl: '/placeholders/project-2.png', captionAr: 'مساحات داخلية', captionEn: 'Interior spaces' }
        ]
      }
    }
  });

  await prisma.service.createMany({
    data: [
      {
        nameAr: 'تطوير عقاري فاخر',
        nameEn: 'Luxury Development',
        descriptionAr: 'إدارة وتنفيذ مشاريع تطوير عقاري راقية من التخطيط حتى التسليم.',
        descriptionEn: 'Managing and delivering upscale real estate developments end-to-end.'
      },
      {
        nameAr: 'تصميم معماري متكامل',
        nameEn: 'Integrated Architectural Design',
        descriptionAr: 'حلول تصميم معمارية عصرية تعكس الفخامة والعملية.',
        descriptionEn: 'Contemporary architectural solutions blending luxury and functionality.'
      }
    ]
  });

  await prisma.blogPost.create({
    data: {
      slug: 'quiet-luxury-trends',
      titleAr: 'اتجاهات الفخامة الهادئة في العمارة',
      titleEn: 'Quiet Luxury Trends in Architecture',
      contentAr: 'نستعرض أحدث توجهات الفخامة الهادئة وكيف تطبقها وهد العمرانية في مشاريعها.',
      contentEn: 'Exploring quiet luxury and how WAHD OMARANIA embeds it across projects.',
      image: '/placeholders/blog-1.png'
    }
  });

  await prisma.contactRequest.create({
    data: {
      name: 'ضيف مهتم',
      email: 'guest@example.com',
      phone: '+96650000000',
      requested: 'تطوير فيلا خاصة',
      message: 'أرغب في مناقشة تطوير فيلا خاصة مطلة على البحر.'
    }
  });

  await prisma.employeeTask.create({
    data: {
      title: 'تحديث تقرير التقدم',
      description: 'تحضير تقرير أسبوعي حول تقدم مشروع الواجهة البحرية.',
      status: 'in-progress',
      assignedToId: employee.id
    }
  });

  console.log('Seed completed', { settings: settings.id, project: project.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
