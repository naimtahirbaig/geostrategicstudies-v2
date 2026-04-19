export const metadata = { title: 'Masthead — GSSO', description: 'GSSO editorial board, governance, and team.' };

export default function MastheadPage() {
  const openRoles = [
    { title: 'Editor-in-Chief', status: 'Open — Accepting Applications', link: '/apply/editor-in-chief', desc: 'Senior editorial leadership. Oversees peer review, editorial policy, and publication decisions.' },
    { title: 'Associate Editor: Nuclear Strategy & Arms Control', status: 'Open — Accepting Applications', link: '/apply/associate-editor', desc: 'Manages peer review for submissions in deterrence, non-proliferation, and arms control.' },
    { title: 'Associate Editor: Geopolitics & Regional Security', status: 'Open — Accepting Applications', link: '/apply/associate-editor', desc: 'Manages peer review for submissions in great-power competition and regional security.' },
    { title: 'Associate Editor: Technology, Climate & Emerging Threats', status: 'Open — Accepting Applications', link: '/apply/associate-editor', desc: 'Manages peer review for submissions in AI, cyber, climate-security, and critical minerals.' },
    { title: 'Advisory Board Member (4–6 positions)', status: 'Open — Expressions of Interest', link: '/apply/advisory-board', desc: 'Strategic advisory role. Provides counsel on journal direction and scholarly network development.' },
  ];

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Libre Franklin', sans-serif", background: '#faf9f6', color: '#3a3a3a' }}>
      <nav className="sticky top-0 z-50 bg-white border-b border-[#d5d0c8]"><div className="max-w-[860px] mx-auto px-8 py-3 flex justify-between items-center"><a href="/" className="flex items-center gap-3"><svg width="36" height="36" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="20" stroke="#0c1220" strokeWidth="1.5"/><ellipse cx="22" cy="22" rx="12" ry="20" stroke="#0c1220" strokeWidth="1" transform="rotate(25 22 22)"/><circle cx="22" cy="22" r="2.5" fill="#b91c1c"/></svg><div><strong className="font-serif text-base text-[#1a1a1a]">Geo-Strategic Studies</strong></div></a><a href="/" className="text-[13px] text-[#3a3a3a] hover:text-[#b91c1c]">&larr; Back to GSSO</a></div></nav>

      <div className="max-w-[860px] mx-auto px-8 py-16">
        <div className="font-mono text-[11px] tracking-[.2em] text-[#b91c1c] uppercase">Governance</div>
        <h1 className="font-serif text-4xl font-bold text-[#1a1a1a] mt-2 mb-2">Masthead</h1>
        <p className="text-[#6b6b6b] text-sm mb-12">GSSO Journal of International Security Studies · ISSN: 2960-0001</p>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2 mb-6">Founding Director</h2>
          <div className="flex items-start gap-4 bg-white border border-[#d5d0c8] rounded p-6">
            <div className="w-16 h-16 rounded-full border-2 border-[#a67c37] overflow-hidden shrink-0"><img src="/ceo-photo.png" alt="Dr. Naim Tahir Baig" className="w-full h-full object-cover"/></div>
            <div>
              <div className="font-serif text-lg font-bold text-[#1a1a1a]">Dr. Naim Tahir Baig</div>
              <div className="font-mono text-[10px] text-[#b91c1c] uppercase tracking-wider mt-0.5">Founding Director & Managing Editor</div>
              <p className="text-sm text-[#6b6b6b] font-light mt-2">Ph.D. International Relations. Responsible for organisational strategy, operational management, and editorial coordination during the founding phase.</p>
              <p className="text-[12px] text-[#999] mt-1">Contact: ceo@geostrategicstudies.org</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2 mb-6">Editorial Board</h2>
          <p className="text-sm text-[#6b6b6b] font-light mb-6">GSSO is actively recruiting its inaugural editorial board. The following positions are open to qualified scholars at recognised institutions worldwide.</p>
          <div className="space-y-4">
            {openRoles.map(r=>(
              <div key={r.title} className="bg-white border border-[#d5d0c8] rounded p-5 hover:border-[#b91c1c] transition">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h3 className="font-serif text-[16px] font-bold text-[#1a1a1a]">{r.title}</h3>
                    <p className="text-[12px] text-[#6b6b6b] font-light mt-1">{r.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-[10px] text-amber-600 bg-amber-50 px-2 py-1 rounded">{r.status}</span>
                    <div className="mt-2"><a href={r.link} className="text-[#b91c1c] text-[12px] font-semibold hover:underline">View Description & Apply &rarr;</a></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2 mb-6">Peer Reviewer Pool</h2>
          <div className="bg-white border border-[#d5d0c8] rounded p-6">
            <p className="text-sm text-[#6b6b6b] font-light mb-3">GSSO maintains a register of qualified scholars available for double-blind peer review. Reviewers are matched to manuscripts based on subject expertise.</p>
            <p className="text-sm text-[#6b6b6b] font-light mb-3"><strong className="text-[#1a1a1a]">Registered reviewers:</strong> Building — <a href="/#peer-reviewer-pool" className="text-[#b91c1c] hover:underline">register here</a></p>
            <p className="text-[12px] text-[#999]">Reviewer statistics will be published annually once the first peer-reviewed issue is released.</p>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2 mb-6">Publication Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[['ISSN','2960-0001 (Online)'],['Publisher','Geo-Strategic Studies Organisation'],['Frequency','Quarterly (4 issues/year) — commencing late 2026'],['APCs','None. No submission fees.'],['License','CC BY 4.0 (Creative Commons Attribution)'],['DOI Prefix','10.59461/JGSSO'],['Review Type','Double-blind peer review'],['Current Status','Working Paper Series (pre-peer-review)']].map(([l,v])=>(
              <div key={l} className="bg-[#f2f0eb] border border-[#d5d0c8] rounded p-4">
                <div className="font-mono text-[9px] text-[#999] uppercase tracking-wider">{l}</div>
                <div className="text-[14px] text-[#1a1a1a] mt-0.5">{v}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="bg-[#080d18] text-white/30 py-8 border-t-[3px] border-[#b91c1c]"><div className="max-w-[860px] mx-auto px-8 text-[11px] text-center">&copy; 2026 Geo-Strategic Studies Organisation. ISSN: 2960-0001</div></footer>
    </div>
  );
}
