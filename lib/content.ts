import { prisma } from './prisma';

type Locale = 'ar' | 'en';

export async function getSiteSettings() {
  return prisma.settings.findFirst();
}

export async function getProjects() {
  return prisma.project.findMany({ include: { images: true }, orderBy: { createdAt: 'desc' } });
}

export async function getProjectById(id: number) {
  return prisma.project.findUnique({ where: { id }, include: { images: true } });
}

export async function getServices() {
  return prisma.service.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function getBlogPosts() {
  return prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function getBlogPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export function pickLocale<T extends Record<string, any>>(obj: T, locale: Locale, keys: { ar: keyof T; en: keyof T }) {
  return locale === 'ar' ? obj[keys.ar] : obj[keys.en];
}
