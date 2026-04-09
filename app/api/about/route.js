import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  const content = await prisma.siteContent.findMany();
  const obj = {};
  content.forEach(c => { obj[c.key] = c.value; });
  return NextResponse.json(obj);
}

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await req.json();
  for (const [key, value] of Object.entries(data)) {
    await prisma.siteContent.upsert({ where: { key }, update: { value }, create: { key, value } });
  }
  return NextResponse.json({ success: true });
}
