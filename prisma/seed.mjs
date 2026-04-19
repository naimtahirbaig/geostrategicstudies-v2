import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('GSSO@admin2026', 12);
  
  await prisma.user.upsert({
    where: { email: 'ceo@geostrategicstudies.org' },
    update: {},
    create: {
      email: 'ceo@geostrategicstudies.org',
      password: hashedPassword,
      name: 'Dr. Naim Tahir Baig',
      role: 'admin',
    },
  });

  // Seed research papers
  const papers = [
    { title: 'Operation Epic Fury and the Illusion of Decisive Force: America\'s Strategic Miscalculations in the Iran War of 2026', authors: 'Dr. Naim Tahir Baig', journal: 'International Security Studies', abstract: 'Identifies seven categories of strategic error in the coordinated US-Israeli military campaign against Iran.', tags: 'Iran-US War,Strategic Miscalculation,Deterrence Failure,Middle East', type: 'paper', year: '2026' },
    { title: 'CHOKEPOINT AS WEAPON: Iran\'s Strait of Hormuz Blockade Strategy in the February–March 2026 War', authors: 'Dr. Naim Tahir Baig', journal: 'J. Intl. Security Studies, Vol. X, No. 1', abstract: 'Introduces the concept of the insurance-blockade as a distinct instrument of maritime coercion.', tags: 'Maritime Chokepoint,Energy Security,Asymmetric Warfare,IRGC', type: 'paper', year: '2026' },
    { title: 'Nuclear Deterrence and Alliance Formation: The Saudi-Pakistan Strategic Partnership', authors: 'Dr. Naim Tahir Baig', journal: 'ResearchGate', abstract: 'Analyses the September 2025 Strategic Mutual Defense Agreement through extended deterrence theory.', tags: 'Nuclear Deterrence,Alliance Formation,Saudi-Pakistan', type: 'paper', year: '2025' },
    { title: 'The Diminishing Pax-Americana: Can The US Escape Declinism From Hegemonic Triumphalism', authors: 'Dr. Hassan Farooq Mashwani, Shahida Iqbal, Naim Tahir Baig', journal: 'J. Positive School Psychology, Vol. 6, No. 12', abstract: 'Analyses the probability of diminishing American global dominance through the lens of neo-realism.', tags: 'Pax-Americana,Hegemonic Decline,Neo-Realism,World Order', type: 'paper', year: '2022' },
    { title: 'Can India Legally Suspend the Indus Waters Treaty? A Legal Analysis', authors: 'Dr. Naim Tahir Baig', journal: 'ResearchGate', abstract: 'Examines the legal validity of India\'s unilateral suspension of the Indus Waters Treaty.', tags: 'Indus Waters,International Law,India-Pakistan', type: 'brief', year: '2025' },
    { title: 'Abraham Accords and Pakistan: Why Pakistani Masses Will Never Accept Israel Unless Palestine Issue is Resolved', authors: 'Dr. Naim Tahir Baig', journal: 'ResearchGate', abstract: 'Analyses Pakistan\'s absence from the Abraham Accords normalisation wave.', tags: 'Abraham Accords,Pakistan,Palestine,Normalisation', type: 'paper', year: '2025' },
  ];

  for (const p of papers) {
    await prisma.paper.create({ data: { ...p, published: true } });
  }

  // Seed featured books
  const books = [
    { title: 'Operation Rising Lion 2025', category: 'Middle East & Conflict', description: 'Israel\'s Strike on Iran\'s Nuclear Program — 2nd Edition', amazonUrl: 'https://www.amazon.com/dp/B0FFX2YNSP', coverImage: '/covers/operation-rising-lion.jpg', featured: true },
    { title: 'Nuclear Weapons in Space', category: 'Nuclear & Defence', description: 'Strategic Competition Beyond Earth', amazonUrl: 'https://www.amazon.com/dp/B0FMMHFP8J', coverImage: '/covers/nuclear-weapons-space.jpg', featured: true },
    { title: 'Bashar al-Assad\'s Last Stand', category: 'Middle East', description: 'The Syrian Conflict\'s Final 11 Days', amazonUrl: 'https://www.amazon.com/dp/B0DZR3PDDR', coverImage: '/covers/bashar-assad.jpg', featured: true },
    { title: 'Behind The Veil Of Deception', category: 'Intelligence & Espionage', description: 'Catherine Perez-Shakdam', amazonUrl: 'https://www.amazon.com/dp/B0FFG7VGNG', coverImage: '/covers/behind-veil.jpg', featured: true },
    { title: 'Nuclear Orbits', category: 'Nuclear & Space Strategy', description: 'From Soviet Satellites to Russian Space Power', coverImage: '/covers/nuclear-orbits.jpg', featured: true },
    { title: 'The Ice Grab', category: 'Geopolitics', description: 'The 2025-2026 Greenland Crisis', coverImage: '/covers/ice-grab.jpg', featured: true },
    { title: 'IR from a Pakistani Perspective', category: 'Academic Textbook', description: 'A Comprehensive Masters-Level Textbook', coverImage: '/covers/ir-pakistani.jpg', featured: true },
    { title: 'Complexity of Souls', category: 'Fiction & Literature', description: 'Whispers from the Inner Universe', amazonUrl: 'https://www.amazon.com/dp/B0F23D2L2K', coverImage: '/covers/complexity-souls.jpg', featured: true },
  ];

  for (const b of books) {
    await prisma.book.create({ data: { ...b, published: true } });
  }

  // Seed site content
  const content = [
    { key: 'ceo_name', value: 'Dr. Naim Tahir Baig' },
    { key: 'ceo_role', value: 'CEO & Director of Research, GSSO' },
    { key: 'ceo_bio', value: 'Dr. Naim Tahir Baig is a globally recognised international relations scholar, strategic analyst, and one of the most prolific authors in the field of geopolitical scholarship.' },
    { key: 'about_mission', value: 'The Geo-Strategic Studies Organisation (GSSO) produces original research that bridges the gap between academic rigour and policy relevance.' },
  ];

  for (const c of content) {
    await prisma.siteContent.upsert({ where: { key: c.key }, update: { value: c.value }, create: c });
  }

  console.log('Database seeded successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
