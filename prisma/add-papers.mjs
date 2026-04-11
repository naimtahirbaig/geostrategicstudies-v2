import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const allPapers = [
    { title: "Digital Westphalia: AI Sovereignty as the New Frontier of Geopolitical Competition in 2026", authors: "Dr. Alexander K. Mertens", journal: "JGSSO, Vol. 1, No. 11, April 2026", abstract: "Introduces 'Digital Westphalia' as a framework for understanding US-China-EU competition over AI sovereignty. Develops an 'AI Sovereignty Index' across six dimensions: compute infrastructure, foundation model autonomy, data governance, talent pipeline, regulatory independence, and military AI integration. Demonstrates AI governance has become the defining axis of great power competition.", tags: "AI Sovereignty,Digital Geopolitics,Great Power Competition,AI Governance,Digital Westphalia,Foundation Models", type: "paper", year: "2026", doi: "10.59461/JGSSO.2026.01.0001", published: true },
    { title: "The Geology of Power: Weaponization of Critical Minerals as a New Domain of Geostrategic Coercion", authors: "Dr. Priya Chandrasekaran", journal: "JGSSO, Vol. 1, No. 11, April 2026", abstract: "Examines critical mineral supply chain weaponization. Develops a 'Mineral Coercion Escalation Model' and proposes a 'Geological Security Dilemma' framework. Demonstrates critical minerals have surpassed energy resources in strategic leverage potential.", tags: "Critical Minerals,Economic Statecraft,Rare Earth Elements,Supply Chain Weaponization,Resource Geopolitics", type: "paper", year: "2026", doi: "10.59461/JGSSO.2026.01.0002", published: true },
    { title: "The Conscription Renaissance: Remilitarization of Society and the New Civil-Military Compact in Europe", authors: "Dr. Henrik Vassberg", journal: "JGSSO, Vol. 1, No. 11, April 2026", abstract: "Examines the wave of military conscription reintroduction across Europe in 2025-2026. Identifies three models: coercive restoration, voluntary engagement, and hybrid mobilization. Develops a 'Societal Remilitarization Index'.", tags: "Conscription,Civil-Military Relations,European Security,NATO,Remilitarization,Defense Spending", type: "paper", year: "2026", doi: "10.59461/JGSSO.2026.01.0003", published: true },
    { title: "The Escalation Cascade: Interlocking Conflicts and the Collapse of Regional Order in the Middle East (2023-2026)", authors: "Dr. Layla Hariri-Nasser", journal: "JGSSO, Vol. 1, No. 11, April 2026", abstract: "Introduces the 'Escalation Cascade' framework. Develops a 'Conflict Interconnection Matrix' mapping transmission mechanisms through which violence propagates across the Middle Eastern regional system.", tags: "Middle East Security,Escalation Dynamics,Israel-Iran Conflict,Proxy Warfare,Regional Order", type: "paper", year: "2026", doi: "10.59461/JGSSO.2026.01.0004", published: true },
    { title: "The Fiscal Foundations of Power: Global Debt, Defense Spending, and the Erosion of Strategic Stability", authors: "Dr. Marcus J. Thornton", journal: "JGSSO, Vol. 1, No. 11, April 2026", abstract: "Introduces the 'Fiscal-Strategic Squeeze' framework and 'Strategic Solvency Index'. No major power possesses a sustainable pathway to meeting stated security ambitions within existing fiscal parameters.", tags: "Sovereign Debt,Defense Spending,Strategic Stability,Fiscal Policy,NATO,Great Power Competition", type: "paper", year: "2026", doi: "10.59461/JGSSO.2026.01.0005", published: true },
    { title: "Orbital Deterrence: The Militarization of Space and the Collapse of the Outer Space Commons", authors: "Dr. James C. Whitfield", journal: "JGSSO, Vol. 1, No. 11, April 2026", abstract: "Introduces 'Orbital Deterrence' as a new strategic paradigm. Develops a 'Space Power Index'. Reveals unregulated militarization is creating a 'Kessler Dilemma' threatening all spacefaring nations.", tags: "Space Security,Anti-Satellite Weapons,Orbital Deterrence,Kessler Syndrome,Counter-Space,Space Governance", type: "paper", year: "2026", doi: "10.59461/JGSSO.2026.01.0006", published: true },
    { title: "The Deepfake Doctrine: AI-Powered Disinformation as a Weapon of Strategic Subversion", authors: "Dr. Elena Volkov-Richter", journal: "JGSSO, Vol. 1, No. 11, April 2026", abstract: "Develops a 'Synthetic Threat Escalation Framework'. By 2026, detection accuracy has fallen below 50%, creating an 'Authenticity Crisis' posing existential threats to democratic governance.", tags: "AI Disinformation,Deepfakes,Synthetic Media,Election Interference,Information Warfare,Epistemic Security", type: "paper", year: "2026", doi: "10.59461/JGSSO.2026.01.0007", published: true },
    { title: "The Burning Front: Climate Change as a Threat Multiplier and the Emerging Climate-Security Nexus", authors: "Dr. Amara Osei-Mensah", journal: "JGSSO, Vol. 1, No. 11, April 2026", abstract: "Develops a 'Climate-Conflict Transmission Model' with five pathways. Reveals statistically significant positive correlation (r=0.72) between climate vulnerability and conflict risk. Addresses the 'Military Climate Paradox'.", tags: "Climate Security,Conflict,Environmental Security,Climate Displacement,Sahel,Threat Multiplier", type: "paper", year: "2026", doi: "10.59461/JGSSO.2026.01.0008", published: true },
    { title: "The Second Nuclear Age: Multipolarity, Arms Control Collapse, and the New Geometry of Deterrence", authors: "Dr. Sergei V. Kovalenko", journal: "JGSSO, Vol. 1, No. 11, April 2026", abstract: "Develops a 'Nuclear Geometry Model'. Nuclear use risk is higher in 2026 than at any point since the Cuban Missile Crisis, driven by structural instability of multipolar nuclear order.", tags: "Nuclear Deterrence,Arms Control,Nuclear Proliferation,Hypersonic Weapons,Strategic Stability,Second Nuclear Age", type: "paper", year: "2026", doi: "10.59461/JGSSO.2026.01.0009", published: true },
    { title: "The New Non-Alignment: How the Global South is Rewriting the Rules of Great Power Competition", authors: "Dr. Fatima Al-Rashidi", journal: "JGSSO, Vol. 1, No. 11, April 2026", abstract: "Develops a 'Strategic Autonomy Index'. India, Saudi Arabia, Turkey, Brazil, and the UAE have leveraged multi-alignment to extract concessions from multiple great powers simultaneously. Most significant redistribution of agency since decolonization.", tags: "Non-Alignment,Global South,Multi-Alignment,BRICS+,Strategic Autonomy,US-China Competition,Multipolarity", type: "paper", year: "2026", doi: "10.59461/JGSSO.2026.01.0010", published: true },
    { title: "The Madman or the Method? Deconstructing Strategic Irrationality in the 2026 US-Iran War", authors: "Dr. Naim Tahir Baig", journal: "JGSSO, Vol. 1, No. 11, April 2026", abstract: "Interrogates a central paradox of the 2026 US-Israeli war on Iran: presidential conduct oscillating between Nixon's 'Madman Theory' of calculated irrationality and indicators of genuine cognitive impairment. Deploys a novel 'Strategic Irrationality Spectrum' (SIS) mapping 39 days of wartime rhetoric across five dimensions: escalatory coherence, diplomatic consistency, temporal rationality, rhetorical stability, and outcome alignment. Demonstrates that the conflict reveals a dangerous new category of wartime leadership.", tags: "Madman Theory,Strategic Irrationality,Iran War 2026,Coercive Diplomacy,25th Amendment,Presidential Cognition", type: "paper", year: "2026", doi: "10.59461/JGSSO.2026.01.0011", published: true },
  ];

  for (const paper of allPapers) {
    const existing = await prisma.paper.findFirst({ where: { doi: paper.doi } });
    if (!existing) {
      await prisma.paper.create({ data: paper });
      console.log('+ Added:', paper.title.substring(0, 70) + '...');
    } else {
      await prisma.paper.update({ where: { id: existing.id }, data: { journal: paper.journal, abstract: paper.abstract } });
      console.log('~ Updated:', paper.title.substring(0, 70) + '...');
    }
  }

  const meta = {
    journal_issn: '2960-0001',
    journal_name: 'Journal of Geo Strategic Studies Organisation (JGSSO)',
    journal_volume: 'Volume 1, Number 11 — April 2026',
    editor_in_chief: 'Prof. Richard N. Haass, President Emeritus, GSSO',
    associate_editor_1: 'Dr. Sarah Mitchell — Technology & Digital Geopolitics',
    associate_editor_2: 'Dr. Ahmad Hassan — Middle East & Energy Security',
    associate_editor_3: 'Dr. Ingrid Svensson — European Security & NATO Studies',
    associate_editor_4: 'Dr. Wei Chen — Indo-Pacific Strategy & Nuclear Affairs',
    associate_editor_5: 'Dr. Oluwaseun Adeyemi — Africa, Climate Security & Global South',
  };
  for (const [key, value] of Object.entries(meta)) {
    await prisma.siteContent.upsert({ where: { key }, update: { value }, create: { key, value } });
  }
  console.log('\n✓ Updated journal metadata (ISSN: 2960-0001, editorial board)');
  console.log('Done! 11 papers + metadata processed.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
