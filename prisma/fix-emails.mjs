import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const updates = {
    contact_email_1: 'info@geostrategicstudies.org',
    contact_email_2: 'editor@geostrategicstudies.org',
  };
  for (const [key, value] of Object.entries(updates)) {
    await prisma.siteContent.upsert({ where: { key }, update: { value }, create: { key, value } });
  }
  console.log('OK — Contact emails updated in database');
}
main().catch(console.error).finally(() => prisma.$disconnect());
