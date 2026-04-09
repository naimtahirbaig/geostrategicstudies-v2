import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Contact submissions
export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'contact';
  
  if (type === 'paper') {
    const subs = await prisma.paperSubmission.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(subs);
  }
  const subs = await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(subs);
}

export async function POST(req) {
  const data = await req.json();
  const { type, ...rest } = data;
  
  if (type === 'paper') {
    const sub = await prisma.paperSubmission.create({ data: rest });
    return NextResponse.json(sub);
  }
  const sub = await prisma.contactSubmission.create({ data: rest });
  return NextResponse.json(sub);
}

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, type, ...data } = await req.json();
  
  if (type === 'paper') {
    const sub = await prisma.paperSubmission.update({ where: { id }, data });
    return NextResponse.json(sub);
  }
  const sub = await prisma.contactSubmission.update({ where: { id }, data });
  return NextResponse.json(sub);
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, type } = await req.json();
  
  if (type === 'paper') {
    await prisma.paperSubmission.delete({ where: { id } });
  } else {
    await prisma.contactSubmission.delete({ where: { id } });
  }
  return NextResponse.json({ success: true });
}
