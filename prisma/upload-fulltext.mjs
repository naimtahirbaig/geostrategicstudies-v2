import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';

const prisma = new PrismaClient();

async function main() {
  const papers = JSON.parse(readFileSync('./prisma/papers_fulltext.json', 'utf8'));
  
  for (const paper of papers) {
    const existing = await prisma.paper.findFirst({ where: { doi: paper.doi } });
    if (existing) {
      await prisma.paper.update({
        where: { id: existing.id },
        data: { fullText: paper.text }
      });
      console.log(`✓ Uploaded full text for DOI ${paper.doi} (${paper.chars} chars)`);
    } else {
      console.log(`✗ Paper not found: ${paper.doi}`);
    }
  }
  
  console.log('\nDone! All paper full texts uploaded.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
