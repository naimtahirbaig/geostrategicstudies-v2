import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const fixes = {
  '10.59461/JGSSO.2026.01.0001': 'JGSSO, Vol. 1, No. 1, April 2026',
  '10.59461/JGSSO.2026.01.0002': 'JGSSO, Vol. 1, No. 2, April 2026',
  '10.59461/JGSSO.2026.01.0003': 'JGSSO, Vol. 1, No. 3, April 2026',
  '10.59461/JGSSO.2026.01.0004': 'JGSSO, Vol. 1, No. 4, April 2026',
  '10.59461/JGSSO.2026.01.0005': 'JGSSO, Vol. 1, No. 5, April 2026',
  '10.59461/JGSSO.2026.01.0006': 'JGSSO, Vol. 1, No. 6, April 2026',
  '10.59461/JGSSO.2026.01.0007': 'JGSSO, Vol. 1, No. 7, April 2026',
  '10.59461/JGSSO.2026.01.0008': 'JGSSO, Vol. 1, No. 8, April 2026',
  '10.59461/JGSSO.2026.01.0009': 'JGSSO, Vol. 1, No. 9, April 2026',
  '10.59461/JGSSO.2026.01.0010': 'JGSSO, Vol. 1, No. 10, April 2026',
  '10.59461/JGSSO.2026.01.0011': 'JGSSO, Vol. 1, No. 11, April 2026',
};
async function main() {
  for (const [doi, journal] of Object.entries(fixes)) {
    const p = await prisma.paper.findFirst({ where: { doi } });
    if (p) { await prisma.paper.update({ where: { id: p.id }, data: { journal } }); console.log('OK', journal); }
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
