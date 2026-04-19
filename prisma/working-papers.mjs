import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const papers = await prisma.paper.findMany({ where: { doi: { startsWith: '10.59461/JGSSO' } } });
  for (const p of papers) {
    await prisma.paper.update({
      where: { id: p.id },
      data: { 
        journal: 'GSSO Working Paper Series, 2026',
        type: 'working'
      }
    });
    console.log('Relabelled:', p.title.substring(0, 55));
  }
  console.log('\nAll papers relabelled as Working Papers.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
