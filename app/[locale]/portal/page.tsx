import { authOptions } from '@/lib/nextauth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function PortalPage({ params }: { params: { locale: 'ar' | 'en' } }) {
  const session = await getServerSession(authOptions);
  const { locale } = params;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  if (!session) {
    redirect(`/${locale}/login?callbackUrl=/${locale}/portal`);
  }

  const userId = Number((session.user as any).id);
  const tasks = await prisma.employeeTask.findMany({
    where: { assignedToId: Number.isNaN(userId) ? undefined : userId },
    orderBy: { createdAt: 'desc' },
    include: { assignedTo: true }
  });

  async function updateStatus(formData: FormData) {
    'use server';
    const id = Number(formData.get('id'));
    const status = String(formData.get('status'));
    await prisma.employeeTask.update({ where: { id }, data: { status } });
    revalidatePath(`/${locale}/portal`);
  }

  return (
    <section className="container py-12 space-y-6" dir={dir}>
      <h1 className="section-title">{locale === 'ar' ? 'بوابة الموظف' : 'Employee Portal'}</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {tasks.map((task) => (
          <div key={task.id} className="card-surface p-5 space-y-3">
            <div className="text-sm text-gray-500">{task.assignedTo.name}</div>
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p className="text-gray-700">{task.description}</p>
            <form action={updateStatus} className="flex items-center gap-3">
              <input type="hidden" name="id" value={task.id} />
              <select name="status" defaultValue={task.status} className="form-input">
                <option value="pending">{locale === 'ar' ? 'قيد الانتظار' : 'Pending'}</option>
                <option value="in-progress">{locale === 'ar' ? 'قيد التنفيذ' : 'In progress'}</option>
                <option value="done">{locale === 'ar' ? 'منجز' : 'Done'}</option>
              </select>
              <button className="hero-button" type="submit">
                {locale === 'ar' ? 'تحديث' : 'Update'}
              </button>
            </form>
          </div>
        ))}
      </div>
    </section>
  );
}
