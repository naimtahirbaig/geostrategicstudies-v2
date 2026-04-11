import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const m = {
  '10.59461/JGSSO.2026.01.0001': '/papers-pdf/paper-0001.pdf',
  '10.59461/JGSSO.2026.01.0002': '/papers-pdf/paper-0002.pdf',
  '10.59461/JGSSO.2026.01.0003': '/papers-pdf/paper-0003.pdf',
  '10.59461/JGSSO.2026.01.0004': '/papers-pdf/paper-0004.pdf',
  '10.59461/JGSSO.2026.01.0005': '/papers-pdf/paper-0005.pdf',
  '10.59461/JGSSO.2026.01.0006': '/papers-pdf/paper-0006.pdf',
  '10.59461/JGSSO.2026.01.0007': '/papers-pdf/paper-0007.pdf',
  '10.59461/JGSSO.2026.01.0008': '/papers-pdf/paper-0008.pdf',
  '10.59461/JGSSO.2026.01.0009': '/papers-pdf/paper-0009.pdf',
  '10.59461/JGSSO.2026.01.0010': '/papers-pdf/paper-0010.pdf',
  '10.59461/JGSSO.2026.01.0011': '/papers-pdf/complete-volume.pdf',
};
async function main() {
  for (const [doi, url] of Object.entries(m)) {
    const p = await prisma.paper.findFirst({ where: { doi } });
    if (p) { await prisma.paper.update({ where: { id: p.id }, data: { url } }); console.log('OK', doi); }
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
