import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1. Update all JGSSO papers to Vol. 1, Issue 1
  const papers = await prisma.paper.findMany({ where: { doi: { startsWith: '10.59461/JGSSO' } } });
  for (const p of papers) {
    await prisma.paper.update({
      where: { id: p.id },
      data: { journal: 'JGSSO, Vol. 1, Issue 1, 2026' }
    });
    console.log('Updated:', p.title.substring(0, 50));
  }

  // 2. Update site content - remove personal branding
  const updates = {
    ceo_name: 'Dr. Naim Tahir Baig',
    ceo_role: 'Founding Director',
    ceo_bio: 'Dr. Naim Tahir Baig is the founding director of the Geo Strategic Studies Organisation. He holds a Ph.D. in International Relations and has published extensively on nuclear deterrence, geopolitics, and South Asian security.',
    ceo_quote: '',
    stats_books: '',
    stats_papers: '',
    stats_platforms: '',
    stats_languages: '',
    about_mission: 'The Geo Strategic Studies Organisation (GSSO) is an independent research institution dedicated to producing rigorous, peer-reviewed scholarship in international relations, strategic studies, nuclear deterrence, geopolitics, and peace. We bridge academic research with policy-relevant analysis.',
    about_research: 'GSSO produces peer-reviewed research across international relations, nuclear strategy, regional security, and emerging threats — free from institutional or governmental bias.',
    about_journal: 'The GSSO Journal publishes original, peer-reviewed research papers, policy briefs, and strategic commentaries. All submissions undergo double-blind peer review.',
  };

  for (const [key, value] of Object.entries(updates)) {
    await prisma.siteContent.upsert({ where: { key }, update: { value }, create: { key, value } });
  }
  console.log('\nSite content updated. Done!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
