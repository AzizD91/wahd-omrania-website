import { prisma } from './prisma';
import { compare } from 'bcrypt';
import { Role } from '@prisma/client';

export async function verifyUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  const valid = await compare(password, user.password);
  if (!valid) return null;
  return user;
}

export function isAdmin(role?: Role | null) {
  return role === 'admin';
}

export function isEditor(role?: Role | null) {
  return role === 'editor' || role === 'admin';
}
