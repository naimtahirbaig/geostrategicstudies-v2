import prisma from '@/lib/prisma';
import PublicSite from '@/components/PublicSite';

export const revalidate = 60; // Revalidate every 60 seconds

async function getData() {
  const [papers, books, blogPosts, siteContent] = await Promise.all([
    prisma.paper.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } }),
    prisma.book.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } }),
    prisma.blogPost.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.siteContent.findMany(),
  ]);
  const content = {};
  siteContent.forEach(c => { content[c.key] = c.value; });
  return { papers, books: books.filter(b => b.featured), allBooks: books, blogPosts, content };
}

export default async function HomePage() {
  const data = await getData();
  return <PublicSite data={data} />;
}
