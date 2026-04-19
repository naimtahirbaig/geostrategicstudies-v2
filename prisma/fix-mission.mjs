import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const updates = {
    about_mission: 'The Geo-Strategic Studies Organisation (GSSO) is an independent research institution producing working papers and building toward a fully peer-reviewed journal in international relations, strategic studies, nuclear deterrence, geopolitics, and peace. We bridge academic research with policy-relevant analysis.',
    about_research: 'We produce independent research and working papers across international relations, nuclear strategy, regional security, and emerging threats — free from institutional or governmental bias.',
    about_journal: 'The GSSO Journal will publish original, peer-reviewed research papers, policy briefs, and strategic commentaries from its inaugural issue. All journal submissions will undergo double-blind peer review.',
  };
  for (const [key, value] of Object.entries(updates)) {
    await prisma.siteContent.upsert({ where: { key }, update: { value }, create: { key, value } });
  }
  console.log('OK — Mission, research, and journal text updated');
}
main().catch(console.error).finally(() => prisma.$disconnect());
