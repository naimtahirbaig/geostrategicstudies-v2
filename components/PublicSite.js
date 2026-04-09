'use client';
import { useState } from 'react';

export default function PublicSite({ data }) {
  const { papers, books, allBooks, blogPosts, content } = data;
  const [filter, setFilter] = useState('all');
  const [contactForm, setContactForm] = useState({ name: '', email: '', organisation: '', subject: 'Research Collaboration', message: '' });
  const [paperForm, setPaperForm] = useState({ authorName: '', authorEmail: '', institution: '', type: 'paper', title: '', abstract: '', keywords: '' });
  const [contactSent, setContactSent] = useState(false);
  const [paperSent, setPaperSent] = useState(false);

  const filteredPapers = filter === 'all' ? papers : papers.filter(p => p.type === filter);

  const submitContact = async (e) => {
    e.preventDefault();
    await fetch('/api/submissions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...contactForm, type: 'contact' }) });
    setContactSent(true);
  };

  const submitPaper = async (e) => {
    e.preventDefault();
    await fetch('/api/submissions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...paperForm, type: 'paper' }) });
    setPaperSent(true);
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Libre Franklin', sans-serif", background: '#faf9f6', color: '#3a3a3a' }}>
      {/* TOPBAR */}
      <div className="bg-[#0c1220] py-1.5 text-[11px] text-white/50 tracking-wide">
        <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center">
          <span>Geo Strategic Studies Organisation — Independent Think-Tank & Research Journal</span>
          <div className="space-x-4 hidden md:block">
            <a href="mailto:ceo@geostrategicstudies.org" className="hover:text-white/80 transition">ceo@geostrategicstudies.org</a>
            <a href="#submit" className="hover:text-white/80 transition">Submit Paper</a>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#d5d0c8]">
        <div className="max-w-[1200px] mx-auto px-8 py-3 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="20" stroke="#0c1220" strokeWidth="1.5"/><ellipse cx="22" cy="22" rx="12" ry="20" stroke="#0c1220" strokeWidth="1" transform="rotate(25 22 22)"/><ellipse cx="22" cy="22" rx="12" ry="20" stroke="#0c1220" strokeWidth="1" transform="rotate(-25 22 22)"/><circle cx="22" cy="22" r="2.5" fill="#b91c1c"/></svg>
            <div><strong className="font-serif text-lg text-[#1a1a1a]">Geo Strategic Studies</strong><br/><span className="font-mono text-[9px] tracking-[.22em] text-[#b91c1c] uppercase">Organisation · Est. Think-Tank</span></div>
          </a>
          <div className="hidden lg:flex items-center gap-1">
            {['About','Journal','Research Areas','Leadership','Publications','Submissions','Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g,'-')}`} className="text-[13px] font-medium text-[#3a3a3a] px-3 py-2 rounded hover:text-[#b91c1c] hover:bg-red-50 transition">{item}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-[#0c1220] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-[1200px] mx-auto px-8 relative z-10 grid md:grid-cols-[1fr_400px] gap-12 items-end">
          <div>
            <div className="font-mono text-[10px] tracking-[.3em] text-[#a67c37] mb-6 flex items-center gap-3"><span className="w-10 h-px bg-[#a67c37]" />POLICY · RESEARCH · ANALYSIS</div>
            <h1 className="font-serif text-5xl font-bold leading-[1.08] mb-6">Advancing <em className="text-[#a67c37]">Strategic Scholarship</em> for a World in Flux</h1>
            <p className="text-white/50 text-lg max-w-xl mb-8 font-light leading-relaxed">An independent think-tank and online research journal dedicated to rigorous, policy-relevant scholarship in international relations, strategic studies, nuclear deterrence, geopolitics, and peace.</p>
            <div className="flex gap-3 flex-wrap">
              <a href="#journal" className="bg-[#b91c1c] hover:bg-[#8b1515] text-white px-6 py-3 rounded text-sm font-semibold transition">Current Issue →</a>
              <a href="#submit" className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded text-sm font-semibold transition">Submit Research</a>
            </div>
          </div>
          <div className="bg-white/[.04] border border-white/[.08] rounded p-6">
            <div className="font-mono text-[9px] tracking-[.2em] text-[#a67c37] mb-4 uppercase">Latest from the Journal</div>
            {papers.slice(0, 3).map(p => (
              <div key={p.id} className="py-3 border-t border-white/[.06] first:border-0 first:pt-0">
                <h4 className="font-serif text-[15px] text-white/90 font-semibold leading-tight">{p.title}</h4>
                <div className="font-mono text-[11px] text-white/30 mt-1">{p.authors} · {p.year}</div>
              </div>
            ))}
            <div className="grid grid-cols-4 gap-3 mt-5 pt-5 border-t border-white/[.06]">
              {[
                [content.stats_books || '140+', 'Books'],
                [content.stats_papers || '35+', 'Papers'],
                [content.stats_platforms || '20+', 'Platforms'],
                [content.stats_languages || '4', 'Languages'],
              ].map(([num, lbl]) => (
                <div key={lbl} className="text-center"><div className="font-serif text-2xl font-bold text-white">{num}</div><div className="font-mono text-[9px] text-white/30 uppercase tracking-wider mt-1">{lbl}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section id="about" className="py-20 border-b border-[#d5d0c8]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="font-mono text-[11px] tracking-[.2em] text-[#b91c1c] uppercase">About the Organisation</div>
          <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mt-2 mb-2">Our Mission & Mandate</h2>
          <p className="text-[#6b6b6b] max-w-2xl font-light mb-10">{content.about_mission || 'The Geo Strategic Studies Organisation (GSSO) produces original research that bridges the gap between academic rigour and policy relevance.'}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              ['01', 'Independent Research', content.about_research || 'We produce peer-reviewed and independently published research across international relations, nuclear strategy, regional security, and emerging threats.'],
              ['02', 'Policy Analysis', 'Our strategic briefs and analyses inform decision-makers navigating great-power competition, alliance dynamics, arms control, and regional instability.'],
              ['03', 'Online Research Journal', content.about_journal || 'The GSSO Journal of International Security Studies publishes original research papers, book reviews, and policy commentaries.'],
            ].map(([num, title, desc]) => (
              <div key={num} className="pt-6 border-t-2 border-[#1a1a1a]">
                <div className="font-mono text-[11px] text-[#999] mb-3">{num}</div>
                <h3 className="font-serif text-xl text-[#1a1a1a] font-semibold mb-3">{title}</h3>
                <p className="text-sm text-[#6b6b6b] font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNAL */}
      <section id="journal" className="py-20 bg-[#f2f0eb] border-y border-[#d5d0c8]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
            <div>
              <div className="font-mono text-[11px] tracking-[.2em] text-[#b91c1c] uppercase">GSSO Research Journal</div>
              <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mt-2">Published Research & Analysis</h2>
            </div>
            <div className="flex gap-1">
              {[['all','All'],['paper','Papers'],['brief','Briefs'],['thesis','Theses']].map(([val, label]) => (
                <button key={val} onClick={() => setFilter(val)} className={`font-mono text-[11px] tracking-wide px-3 py-2 border rounded transition ${filter === val ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'bg-white text-[#6b6b6b] border-[#d5d0c8] hover:bg-gray-100'}`}>{label}</button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-[#e8e4dc]">
            {filteredPapers.map(p => (
              <div key={p.id} className="py-5 grid md:grid-cols-[80px_1fr_140px_80px] gap-4 items-start hover:bg-red-50/30 transition">
                <div className="font-mono text-[11px] text-[#999]">{p.year}</div>
                <div>
                  <h4 className="font-serif text-lg text-[#1a1a1a] font-semibold leading-tight">{p.title}</h4>
                  <div className="text-[13px] text-[#b91c1c] mt-1">{p.authors}</div>
                  <p className="text-[13px] text-[#6b6b6b] font-light mt-1 line-clamp-2">{p.abstract}</p>
                  {p.tags && <div className="flex flex-wrap gap-1 mt-2">{p.tags.split(',').map(t => <span key={t} className="font-mono text-[9px] px-2 py-0.5 bg-white border border-[#d5d0c8] rounded text-[#6b6b6b]">{t.trim()}</span>)}</div>}
                </div>
                <div className="font-mono text-[10px] text-[#999]">{p.journal}</div>
                <div><span className={`font-mono text-[9px] uppercase px-2 py-1 rounded ${p.type === 'paper' ? 'bg-red-50 text-[#b91c1c]' : p.type === 'brief' ? 'bg-green-50 text-green-700' : 'bg-purple-50 text-purple-700'}`}>{p.type}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESEARCH AREAS */}
      <section id="research-areas" className="py-20 border-b border-[#d5d0c8]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="font-mono text-[11px] tracking-[.2em] text-[#b91c1c] uppercase">Research Domains</div>
          <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mt-2 mb-8">Areas of Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 border border-[#d5d0c8]" style={{ gap: '1px', background: '#d5d0c8' }}>
            {[
              ['🌐','International Relations','State behaviour, alliance dynamics, and the rules-based order.'],
              ['⚛️','Nuclear Strategy','Deterrence stability, non-proliferation, and weapons in space.'],
              ['🗺️','Geopolitics','Great-power competition, maritime chokepoints, and resource geopolitics.'],
              ['🛡️','Security & Defence','Security architectures, military strategy, and asymmetric warfare.'],
              ['🏛️','Political Science','Comparative politics, populism, governance, and statecraft.'],
              ['🕊️','Peace & Conflict','Conflict dynamics, post-conflict reconstruction, and humanitarian law.'],
              ['🤖','Technology & Statecraft','AI in warfare, cyber operations, and digital sovereignty.'],
              ['🌍','Regional Studies','South Asia, the Middle East, the Indo-Pacific, and the Islamic world.'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="bg-white p-6 hover:bg-red-50 transition">
                <div className="text-2xl mb-3">{icon}</div>
                <h4 className="font-serif text-[15px] text-[#1a1a1a] font-semibold mb-2">{title}</h4>
                <p className="text-[12px] text-[#6b6b6b] font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section id="leadership" className="py-20 bg-[#0c1220] text-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="font-mono text-[11px] tracking-[.2em] text-[#a67c37] uppercase">Leadership</div>
          <h2 className="font-serif text-3xl font-bold text-white mt-2 mb-8">Chief Executive Officer</h2>
          <div className="grid md:grid-cols-[320px_1fr] gap-12">
            <div className="text-center">
              <div className="w-44 h-44 rounded-full border-[3px] border-[#a67c37] mx-auto mb-5 overflow-hidden">
                <img src="/ceo-photo.png" alt={content.ceo_name || 'Dr. Naim Tahir Baig'} className="w-full h-full object-cover" />
              </div>
              <div className="font-serif text-xl font-bold">{content.ceo_name || 'Dr. Naim Tahir Baig'}</div>
              <div className="font-mono text-[10px] tracking-[.2em] text-[#a67c37] uppercase mt-1">{content.ceo_role || 'CEO & Director of Research, GSSO'}</div>
              <div className="text-[13px] text-white/40 mt-3 leading-relaxed">Ph.D. International Relations<br/>M.Phil International Relations<br/>PG Diploma TEFL</div>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {[['Website','https://www.naimtahirbaig.com'],['ResearchGate','https://www.researchgate.net/profile/Naim-Tahir-Baig'],['Amazon','https://www.amazon.com/s?k=naim+tahir+baig']].map(([label, url]) => (
                  <a key={label} href={url} target="_blank" rel="noreferrer" className="text-[11px] px-3 py-1.5 border border-white/15 rounded text-white/50 hover:border-[#a67c37] hover:text-[#a67c37] transition">{label}</a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white/50 font-light leading-relaxed mb-4">{content.ceo_bio || 'Dr. Naim Tahir Baig is a globally recognised international relations scholar, strategic analyst, and one of the most prolific authors in the field of geopolitical scholarship.'}</p>
              <blockquote className="border-l-[3px] border-[#a67c37] pl-5 my-6 font-serif text-lg italic text-white/60">&ldquo;{content.ceo_quote || 'Writing is the bridge between scholarship and society — my aim is to make complex realities readable.'}&rdquo;</blockquote>
              <div className="grid grid-cols-4 gap-4 p-5 bg-white/[.03] border border-white/[.06] rounded mt-6">
                {[[content.stats_books || '140+','Books Published'],[content.stats_papers || '35+','Research Papers'],[content.stats_platforms || '20+','Platforms'],['16','Months to 139 Books']].map(([num, lbl]) => (
                  <div key={lbl} className="text-center"><div className="font-serif text-xl font-bold text-[#a67c37]">{num}</div><div className="font-mono text-[9px] text-white/30 uppercase tracking-wider mt-1">{lbl}</div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BOOKS */}
      <section id="publications" className="py-20 border-b border-[#d5d0c8]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="font-mono text-[11px] tracking-[.2em] text-[#b91c1c] uppercase">Book Publications</div>
          <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mt-2 mb-8">Featured from {content.stats_books || '140+'} Published Works</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {books.map(b => (
              <a key={b.id} href={b.amazonUrl || '#'} target="_blank" rel="noreferrer" className="border border-[#d5d0c8] bg-white rounded overflow-hidden hover:shadow-lg hover:-translate-y-1 transition group">
                <div className="h-56 bg-gray-100 bg-cover bg-center" style={b.coverImage ? { backgroundImage: `url(${b.coverImage})` } : { background: 'linear-gradient(135deg,#1a1a2e,#16213e)' }}>
                  {!b.coverImage && <div className="h-full flex items-center justify-center p-4 text-center"><span className="font-serif text-sm text-white font-semibold">{b.title}</span></div>}
                </div>
                <div className="p-3">
                  <div className="font-mono text-[9px] text-[#b91c1c] uppercase tracking-wider">{b.category}</div>
                  <div className="font-serif text-sm font-semibold text-[#1a1a1a] mt-0.5 truncate">{b.title}</div>
                  <div className="text-[11px] text-[#6b6b6b] mt-0.5 truncate">{b.description}</div>
                </div>
              </a>
            ))}
          </div>
          <div className="flex gap-3 justify-center flex-wrap mt-8">
            <a href="https://www.amazon.com/s?k=naim+tahir+baig" target="_blank" rel="noreferrer" className="bg-[#b91c1c] hover:bg-[#8b1515] text-white px-5 py-2.5 rounded text-sm font-semibold transition">Browse on Amazon →</a>
            <a href="https://www.barnesandnoble.com/s/dr%20naim%20tahir%20baig" target="_blank" rel="noreferrer" className="border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white px-5 py-2.5 rounded text-sm font-semibold transition">Barnes & Noble →</a>
            <a href="https://www.naimtahirbaig.com" target="_blank" rel="noreferrer" className="border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white px-5 py-2.5 rounded text-sm font-semibold transition">Full Catalog →</a>
          </div>
        </div>
      </section>

      {/* BLOG / NEWS */}
      {blogPosts.length > 0 && (
        <section className="py-20 bg-[#f2f0eb] border-b border-[#d5d0c8]">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="font-mono text-[11px] tracking-[.2em] text-[#b91c1c] uppercase">Latest</div>
            <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mt-2 mb-8">News & Commentary</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map(p => (
                <article key={p.id} className="bg-white border border-[#d5d0c8] rounded overflow-hidden hover:shadow-md transition">
                  <div className="p-5">
                    <div className="font-mono text-[9px] text-[#b91c1c] uppercase tracking-wider mb-2">{p.category || 'Commentary'}</div>
                    <h3 className="font-serif text-lg font-bold text-[#1a1a1a] leading-tight mb-2">{p.title}</h3>
                    <p className="text-sm text-[#6b6b6b] font-light line-clamp-3">{p.excerpt || p.content?.substring(0, 150)}</p>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#e8e4dc]">
                      <span className="text-[11px] text-[#999]">{p.author}</span>
                      <span className="font-mono text-[10px] text-[#999]">{new Date(p.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SUBMISSION GUIDELINES */}
      <section id="submissions" className="py-20 border-b border-[#d5d0c8]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="font-mono text-[11px] tracking-[.2em] text-[#b91c1c] uppercase">For Authors</div>
          <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mt-2 mb-8">Submit Your Research</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-sm text-[#6b6b6b] font-light leading-relaxed space-y-4">
              <p>The GSSO Journal welcomes original research from scholars, analysts, and practitioners worldwide. We publish peer-reviewed papers, policy briefs, strategic commentaries, and book reviews.</p>
              <p><strong className="text-[#1a1a1a]">Scope:</strong> International Relations, Nuclear Strategy, Geopolitics, Security Studies, Political Science, Peace & Conflict, Technology & Statecraft, Regional Studies.</p>
              <p><strong className="text-[#1a1a1a]">Requirements:</strong> Research papers: 5,000–12,000 words. Policy briefs: 2,000–4,000 words. Include abstract (200–300 words), keywords, and bibliography.</p>
              <p><strong className="text-[#1a1a1a]">Review:</strong> All submissions undergo double-blind peer review. Initial screening: 7–10 days. Full review: 6–8 weeks.</p>
            </div>
            <div className="bg-[#f2f0eb] border border-[#d5d0c8] rounded p-6">
              {paperSent ? (
                <div className="text-center py-8"><div className="text-3xl mb-3">✓</div><h3 className="font-serif text-xl font-bold text-[#1a1a1a]">Submission Received</h3><p className="text-sm text-[#6b6b6b] mt-2">Our editorial team will review your manuscript and respond within 7–10 days.</p></div>
              ) : (
                <>
                  <h3 className="font-serif text-lg font-bold text-[#1a1a1a] mb-4">Submit Manuscript</h3>
                  <form onSubmit={submitPaper} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input required placeholder="Full Name" value={paperForm.authorName} onChange={e => setPaperForm({...paperForm, authorName: e.target.value})} className="border border-[#d5d0c8] rounded px-3 py-2 text-sm bg-white focus:border-[#b91c1c] outline-none" />
                      <input required type="email" placeholder="Email" value={paperForm.authorEmail} onChange={e => setPaperForm({...paperForm, authorEmail: e.target.value})} className="border border-[#d5d0c8] rounded px-3 py-2 text-sm bg-white focus:border-[#b91c1c] outline-none" />
                    </div>
                    <input placeholder="Institution / Affiliation" value={paperForm.institution} onChange={e => setPaperForm({...paperForm, institution: e.target.value})} className="w-full border border-[#d5d0c8] rounded px-3 py-2 text-sm bg-white focus:border-[#b91c1c] outline-none" />
                    <input required placeholder="Paper Title" value={paperForm.title} onChange={e => setPaperForm({...paperForm, title: e.target.value})} className="w-full border border-[#d5d0c8] rounded px-3 py-2 text-sm bg-white focus:border-[#b91c1c] outline-none" />
                    <textarea required rows={4} placeholder="Abstract (200–300 words)" value={paperForm.abstract} onChange={e => setPaperForm({...paperForm, abstract: e.target.value})} className="w-full border border-[#d5d0c8] rounded px-3 py-2 text-sm bg-white focus:border-[#b91c1c] outline-none" />
                    <input placeholder="Keywords (comma separated)" value={paperForm.keywords} onChange={e => setPaperForm({...paperForm, keywords: e.target.value})} className="w-full border border-[#d5d0c8] rounded px-3 py-2 text-sm bg-white focus:border-[#b91c1c] outline-none" />
                    <button type="submit" className="w-full bg-[#b91c1c] hover:bg-[#8b1515] text-white py-3 rounded text-sm font-semibold transition">Submit for Review →</button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-[#0c1220] text-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="font-mono text-[11px] tracking-[.2em] text-[#a67c37] uppercase">Contact</div>
          <h2 className="font-serif text-3xl font-bold text-white mt-2 mb-8">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-white/50 font-light leading-relaxed mb-6">For research collaboration, media inquiries, speaking engagements, or policy consultations.</p>
              {[
                ['✉','CEO Office', content.contact_email_1 || 'ceo@geostrategicstudies.org'],
                ['✉','Direct', content.contact_email_2 || 'drnaimtahirbaig@geostrategicstudies.org'],
                ['📱','WhatsApp', content.contact_phone || '+92 341 700 7400'],
              ].map(([icon, label, val]) => (
                <div key={label} className="flex gap-3 mb-4 items-start">
                  <div className="w-9 h-9 border border-white/10 rounded flex items-center justify-center shrink-0 text-sm">{icon}</div>
                  <div className="text-[14px] text-white/50"><strong className="text-white block">{label}</strong>{val}</div>
                </div>
              ))}
            </div>
            <div>
              {contactSent ? (
                <div className="text-center py-12"><div className="text-3xl mb-3">✓</div><h3 className="font-serif text-xl font-bold">Message Sent</h3><p className="text-white/50 text-sm mt-2">We will respond within 48 hours.</p></div>
              ) : (
                <form onSubmit={submitContact} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input required placeholder="Full Name" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} className="bg-white/[.04] border border-white/10 rounded px-3 py-2.5 text-sm text-white focus:border-[#a67c37] outline-none" />
                    <input required type="email" placeholder="Email" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} className="bg-white/[.04] border border-white/10 rounded px-3 py-2.5 text-sm text-white focus:border-[#a67c37] outline-none" />
                  </div>
                  <input placeholder="Organisation" value={contactForm.organisation} onChange={e => setContactForm({...contactForm, organisation: e.target.value})} className="w-full bg-white/[.04] border border-white/10 rounded px-3 py-2.5 text-sm text-white focus:border-[#a67c37] outline-none" />
                  <select value={contactForm.subject} onChange={e => setContactForm({...contactForm, subject: e.target.value})} className="w-full bg-white/[.04] border border-white/10 rounded px-3 py-2.5 text-sm text-white focus:border-[#a67c37] outline-none">
                    {['Research Collaboration','Media Inquiry','Speaking Engagement','Academic Partnership','Policy Consultation','General Inquiry'].map(o => <option key={o} value={o} className="bg-[#0c1220]">{o}</option>)}
                  </select>
                  <textarea required rows={4} placeholder="Your message..." value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})} className="w-full bg-white/[.04] border border-white/10 rounded px-3 py-2.5 text-sm text-white focus:border-[#a67c37] outline-none" />
                  <button type="submit" className="w-full bg-[#b91c1c] hover:bg-[#8b1515] text-white py-3 rounded text-sm font-semibold transition">Send Message →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#080d18] text-white/30 py-12 border-t-[3px] border-[#b91c1c]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex flex-wrap justify-between gap-8 mb-8">
            <div className="max-w-xs">
              <div className="font-serif text-white/70 font-bold">Geo Strategic Studies</div>
              <div className="font-mono text-[9px] tracking-wider text-white/20 uppercase mt-0.5">Organisation · Think-Tank & Journal</div>
              <p className="text-sm mt-3 leading-relaxed">Independent research advancing strategic thought in international relations, security studies, and global affairs.</p>
            </div>
            <div className="text-sm space-y-2">
              <div className="font-mono text-[10px] text-white/50 uppercase tracking-wider mb-3">Connect</div>
              <a href="mailto:ceo@geostrategicstudies.org" className="block hover:text-[#a67c37] transition">ceo@geostrategicstudies.org</a>
              <a href="https://www.naimtahirbaig.com" target="_blank" rel="noreferrer" className="block hover:text-[#a67c37] transition">naimtahirbaig.com</a>
              <a href="https://www.researchgate.net/profile/Naim-Tahir-Baig" target="_blank" rel="noreferrer" className="block hover:text-[#a67c37] transition">ResearchGate</a>
            </div>
          </div>
          <div className="border-t border-white/[.06] pt-6 flex justify-between items-center flex-wrap gap-4 text-[11px]">
            <span>© 2026 Geo Strategic Studies Organisation. All rights reserved.</span>
            <span className="font-mono text-[10px] text-white/20">Policy · Research · Analysis</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
