import prisma from '@/lib/prisma';
import PaperView from '@/components/PaperView';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const paper = await prisma.paper.findUnique({ where: { id: params.id } });
  if (!paper) return { title: 'Paper Not Found' };
  return {
    title: `${paper.title} — GSSO Journal`,
    description: paper.abstract?.substring(0, 160),
    openGraph: {
      title: paper.title,
      description: paper.abstract?.substring(0, 160),
      type: 'article',
      authors: [paper.authors],
    },
  };
}

export default async function PaperPage({ params }) {
  const paper = await prisma.paper.findUnique({ where: { id: params.id } });
  if (!paper || !paper.published) notFound();
  
  // Get other papers for "More from this volume"
  const relatedPapers = await prisma.paper.findMany({
    where: { published: true, id: { not: paper.id } },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return <PaperView paper={paper} relatedPapers={relatedPapers} />;
}
