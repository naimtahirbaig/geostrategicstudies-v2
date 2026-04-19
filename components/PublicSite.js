'use client';
import { useState, useEffect } from 'react';

export default function PublicSite({ data }) {
  const { papers, books, allBooks, blogPosts, content } = data;
  const [filter, setFilter] = useState('all');
  const [contactForm, setContactForm] = useState({ name: '', email: '', organisation: '', subject: 'Research Collaboration', message: '' });
  const [paperForm, setPaperForm] = useState({ authorName: '', authorEmail: '', institution: '', type: 'paper', title: '', abstract: '', keywords: '' });
  const [contactSent, setContactSent] = useState(false);
  const [paperSent, setPaperSent] = useState(false);
  const [reviewerForm, setReviewerForm] = useState({ name: '', email: '', institution: '', expertise: '', scholar_url: '' });
  const [reviewerSent, setReviewerSent] = useState(false);
  const [showBtt, setShowBtt] = useState(false);
  const [expandedPaper, setExpandedPaper] = useState(null);
  const [readerPaper, setReaderPaper] = useState(null);
  const [readerFontSize, setReaderFontSize] = useState(16);
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const h = () => setShowBtt(window.scrollY > 600);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    if (papers.length === 0) return;
    const t = setInterval(() => setHeroSlide(s => (s + 1) % Math.min(papers.length, 6)), 4000);
    return () => clearInterval(t);
  }, [papers.length]);

  const filteredPapers = filter === 'all' ? papers : papers.filter(p => p.type === filter);
  const submitContact = async (e) => { e.preventDefault(); await fetch('/api/submissions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...contactForm, type: 'contact' }) }); setContactSent(true); };
  const submitPaper = async (e) => { e.preventDefault(); await fetch('/api/submissions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...paperForm, type: 'paper' }) }); setPaperSent(true); };

  const submitReviewer = async (e) => { e.preventDefault(); await fetch('/api/submissions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...reviewerForm, type: 'reviewer-registration' }) }); setReviewerSent(true); };

  const tickers = ['International Relations','Nuclear Strategy','Geopolitics','Security Studies','Political Science','Peace & Conflict','Defence Analysis','Arms Control','Maritime Security','AI & Statecraft','Climate Security','Non-Proliferation'];

  const resources = [
    ['JSTOR','Digital Library of Academic Journals','https://www.jstor.org'],
    ['International Security (MIT Press)','Leading Security Studies Journal','https://www.mitpressjournals.org/loi/isec'],
    ['Foreign Affairs','International Relations & Policy','https://www.foreignaffairs.com'],
    ['Google Scholar','Scholarly Literature Search','https://scholar.google.com'],
    ['ResearchGate','Professional Research Network','https://www.researchgate.net'],
    ['International Studies Quarterly','Oxford University Press / ISA','https://academic.oup.com/isq'],
    ['Journal of Peace Research','SAGE / PRIO','https://journals.sagepub.com/home/jpr'],
    ['ScienceDirect','Elsevier Peer-Reviewed Articles','https://www.sciencedirect.com'],
    ['Arms Control Association','Non-Proliferation Research','https://www.armscontrol.org'],
    ['Bulletin of the Atomic Scientists','Nuclear Threat Assessment','https://thebulletin.org'],
    ['United Nations','International Peace & Security','https://www.un.org'],
    ['IAEA','International Atomic Energy Agency','https://www.iaea.org'],
  ];

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Libre Franklin', sans-serif", background: '#faf9f6', color: '#3a3a3a' }}>

      {/* TOPBAR */}
      <div className="bg-[#0c1220] py-1.5 text-[11px] text-white/50 tracking-wide">
        <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center">
          <span>Geo Strategic Studies Organisation — Independent Think-Tank & Research Journal</span>
          <div className="space-x-4 hidden md:block">
            <a href="mailto:info@geostrategicstudies.org" className="hover:text-white/80 transition">info@geostrategicstudies.org</a>
            <a href="#call-for-papers" className="hover:text-white/80 transition">Call for Papers</a>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#d5d0c8]">
        <div className="max-w-[1200px] mx-auto px-8 py-3 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="20" stroke="#0c1220" strokeWidth="1.5"/><ellipse cx="22" cy="22" rx="12" ry="20" stroke="#0c1220" strokeWidth="1" transform="rotate(25 22 22)"/><ellipse cx="22" cy="22" rx="12" ry="20" stroke="#0c1220" strokeWidth="1" transform="rotate(-25 22 22)"/><circle cx="22" cy="22" r="2.5" fill="#b91c1c"/></svg>
            <div><strong className="font-serif text-lg text-[#1a1a1a]">Geo Strategic Studies</strong><br/><span className="font-mono text-[9px] tracking-[.22em] text-[#b91c1c] uppercase">Organisation · Independent Think-Tank</span></div>
          </a>
          <div className="hidden lg:flex items-center gap-1">
            {['About','Journal','Policy Briefs','Editorial Board','Resources','Call for Papers','Contact'].map(i=>(
              <a key={i} href={`#${i.toLowerCase().replace(/ /g,'-')}`} className="text-[13px] font-medium text-[#3a3a3a] px-3 py-2 rounded hover:text-[#b91c1c] hover:bg-red-50 transition">{i}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-[#0c1220] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[.03]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)',backgroundSize:'40px 40px'}}/>
        <div className="max-w-[1200px] mx-auto px-8 relative z-10 grid md:grid-cols-[1fr_400px] gap-12 items-end">
          <div>
            <div className="font-mono text-[10px] tracking-[.3em] text-[#a67c37] mb-6 flex items-center gap-3"><span className="w-10 h-px bg-[#a67c37]"/>POLICY · RESEARCH · ANALYSIS</div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold leading-[1.08] mb-6">Independent <em className="text-[#a67c37] italic">Strategic Research</em> for a Complex World</h1>
            <p className="text-white/50 text-lg max-w-xl mb-8 font-light leading-relaxed">An independent research institute publishing working papers, policy briefs, and building toward a fully peer-reviewed journal in international relations, strategic studies, and geopolitics.</p>
            <div className="flex gap-3 flex-wrap">
              <a href="#journal" className="bg-[#b91c1c] hover:bg-[#8b1515] text-white px-6 py-3 rounded text-sm font-semibold transition">Current Issue →</a>
              <a href="#call-for-papers" className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded text-sm font-semibold transition">Submit Research</a>
              <a href="#editorial-board" className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded text-sm font-semibold transition">Join Our Team</a>
            </div>
          </div>
          <div className="bg-white/[.04] border border-white/[.08] rounded p-6">
            <div className="font-mono text-[9px] tracking-[.2em] text-[#a67c37] mb-4 uppercase flex justify-between items-center">
              <span>Working Paper Series (2026)</span>
              <span className="text-white/30">{heroSlide+1}/{Math.min(papers.length,6)}</span>
            </div>
            <div className="relative overflow-hidden" style={{minHeight:'120px'}}>
              {papers.slice(0,6).map((p,idx)=>(
                <div key={p.id} className={`transition-all duration-500 ${idx===heroSlide?'opacity-100 translate-y-0':'opacity-0 absolute top-0 left-0 right-0 translate-y-4'}`}>
                  <a href="#journal" onClick={(e)=>{e.preventDefault();setExpandedPaper(p.id);document.getElementById('journal')?.scrollIntoView({behavior:'smooth'})}} className="block cursor-pointer group no-underline">
                    <h4 className="font-serif text-[17px] text-white/90 font-semibold leading-tight group-hover:text-[#a67c37] transition">{p.title}</h4>
                    <div className="font-mono text-[11px] text-white/30 mt-1">{p.authors}</div>
                    <div className="font-mono text-[10px] text-[#b91c1c] mt-2 group-hover:text-[#a67c37] transition">Read paper →</div>
                  </a>
                </div>
              ))}
            </div>
            <div className="flex gap-1.5 mt-4">
              {papers.slice(0,6).map((_,idx)=>(
                <button key={idx} onClick={()=>setHeroSlide(idx)} className={`h-1 rounded-full transition-all ${idx===heroSlide?'bg-[#a67c37] w-6':'bg-white/20 w-3 hover:bg-white/40'}`}/>
              ))}
            </div>
            <div className="mt-5 pt-5 border-t border-white/[.06] text-center">
              <div className="font-mono text-[10px] text-white/30 uppercase tracking-wider">ISSN: 2960-0001 (Online)</div>
              <div className="font-mono text-[10px] text-white/20 mt-1">Working Papers · Open Access · Peer Review from Issue 1 (forthcoming)</div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="bg-[#b91c1c] py-2 overflow-hidden whitespace-nowrap">
        <div className="inline-flex" style={{animation:'scroll 40s linear infinite'}}>
          {[...tickers,...tickers].map((t,i)=>(<span key={i} className="font-mono text-[11px] tracking-[.08em] uppercase text-white/85 px-8">{t}</span>))}
        </div>
        <style>{`@keyframes scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-20 border-b border-[#d5d0c8]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="font-mono text-[11px] tracking-[.2em] text-[#b91c1c] uppercase">About the Organisation</div>
          <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mt-2 mb-2">Mission & Mandate</h2>
          <p className="text-[#6b6b6b] max-w-2xl font-light mb-10">{content.about_mission || 'The GSSO is an independent research institution producing working papers and building toward a fully peer-reviewed journal in international relations, strategic studies, and peace.'}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              ['01','Peer-Reviewed Research',content.about_research||'We produce independent research and working papers across international relations, nuclear strategy, regional security, and emerging threats.'],
              ['02','Policy Analysis','Strategic briefs and analyses for decision-makers navigating great-power competition, alliance dynamics, arms control, and regional instability.'],
              ['03','Open-Access Journal',content.about_journal||'The GSSO Journal will publish original, peer-reviewed research papers, policy briefs, and strategic commentaries from its inaugural issue. All journal submissions will undergo double-blind peer review.'],
            ].map(([n,t,d])=>(
              <div key={n} className="pt-6 border-t-2 border-[#1a1a1a]">
                <div className="font-mono text-[11px] text-[#999] mb-3">{n}</div>
                <h3 className="font-serif text-xl text-[#1a1a1a] font-semibold mb-3">{t}</h3>
                <p className="text-sm text-[#6b6b6b] font-light leading-relaxed">{d}</p>
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
              <div className="font-mono text-[11px] tracking-[.2em] text-[#b91c1c] uppercase">GSSO Working Paper Series</div>
              <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mt-2">Working Papers (2026)</h2>
              <p className="text-[13px] text-[#6b6b6b] font-light mt-1">Pre-print research. These papers have not yet undergone formal peer review. <a href="/peer-review-policy" className="text-[#b91c1c] hover:underline">See our Peer Review Policy →</a></p>
            </div>
            <div className="flex gap-1">
              {[['all','All'],['working','Working Papers'],['brief','Policy Briefs']].map(([v,l])=>(
                <button key={v} onClick={()=>setFilter(v)} className={`font-mono text-[11px] tracking-wide px-3 py-2 border rounded transition ${filter===v?'bg-[#1a1a1a] text-white border-[#1a1a1a]':'bg-white text-[#6b6b6b] border-[#d5d0c8] hover:bg-gray-100'}`}>{l}</button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-[#e8e4dc]">
            {filteredPapers.map(p=>(
              <div key={p.id} className="py-5 hover:bg-red-50/30 transition cursor-pointer" onClick={(e)=>{if(e.target.closest("button")||e.target.closest("a"))return;setExpandedPaper(expandedPaper===p.id?null:p.id)}}>
                <div className="grid md:grid-cols-[80px_1fr_160px_80px] gap-4 items-start">
                  <div className="font-mono text-[11px] text-[#999]">{p.year}</div>
                  <div>
                    <h4 className="font-serif text-lg text-[#1a1a1a] font-semibold leading-tight">{p.title}</h4>
                    <div className="text-[13px] text-[#b91c1c] mt-1">{p.authors}</div>
                    {expandedPaper!==p.id&&<p className="text-[13px] text-[#6b6b6b] font-light mt-1 line-clamp-2">{p.abstract}</p>}
                  </div>
                  <div className="font-mono text-[10px] text-[#999]">{p.journal}</div>
                  <div><span className={`font-mono text-[9px] uppercase px-2 py-1 rounded ${p.type==='working'?'bg-amber-50 text-amber-700':p.type==='brief'?'bg-green-50 text-green-700':'bg-red-50 text-[#b91c1c]'}`}>{p.type==='working'?'Working Paper':p.type}</span></div>
                </div>
                {expandedPaper===p.id&&(
                  <div className="mt-4 ml-0 md:ml-[96px] bg-white border border-[#d5d0c8] rounded p-6">
                    <h5 className="font-mono text-[10px] uppercase tracking-wider text-[#999] mb-2">Abstract</h5>
                    <p className="text-sm text-[#3a3a3a] leading-relaxed mb-4">{p.abstract}</p>
                    {p.tags&&<div className="mb-4"><h5 className="font-mono text-[10px] uppercase tracking-wider text-[#999] mb-2">Keywords</h5><div className="flex flex-wrap gap-1">{p.tags.split(',').map(t=><span key={t} className="font-mono text-[10px] px-2 py-0.5 bg-[#f2f0eb] border border-[#d5d0c8] rounded text-[#6b6b6b]">{t.trim()}</span>)}</div></div>}
                    <div className="flex flex-wrap gap-4 text-[12px] text-[#999] font-mono">
                      {p.journal&&<span>Published in: <strong className="text-[#1a1a1a]">{p.journal}</strong></span>}
                      {p.doi&&<span>DOI: <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer" className="text-[#b91c1c] hover:underline" onClick={e=>e.stopPropagation()}>{p.doi}</a></span>}
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#e8e4dc]">
                      <h5 className="font-mono text-[10px] uppercase tracking-wider text-[#999] mb-2">Cite This Paper</h5>
                      <div className="bg-[#f2f0eb] rounded p-3 text-[12px] text-[#3a3a3a] font-mono leading-relaxed">{p.authors} ({p.year}). &ldquo;{p.title}.&rdquo; {p.journal&&<em>{p.journal}</em>}.</div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button onClick={(e)=>{e.stopPropagation();setReaderPaper(p)}} className="bg-[#b91c1c] hover:bg-[#8b1515] text-white px-4 py-2 rounded text-sm font-semibold transition">Read Full Paper →</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POLICY BRIEFS */}
      <section id="policy-briefs" className="py-20 border-b border-[#d5d0c8]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="font-mono text-[11px] tracking-[.2em] text-[#b91c1c] uppercase">Think-Tank Output</div>
          <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mt-2 mb-2">Policy Briefs</h2>
          <p className="text-[#6b6b6b] max-w-2xl font-light mb-8">Concise, policy-oriented analyses translating academic research into actionable recommendations for policymakers, diplomats, and institutional stakeholders.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#d5d0c8] rounded p-6 hover:border-[#b91c1c] transition">
              <div className="font-mono text-[9px] text-[#b91c1c] uppercase tracking-wider mb-2">Accepting Submissions</div>
              <h3 className="font-serif text-lg font-bold text-[#1a1a1a] mb-2">Submit a Policy Brief</h3>
              <p className="text-sm text-[#6b6b6b] font-light leading-relaxed mb-4">GSSO invites policy briefs (2,000–4,000 words) on topics within our research domains. Briefs should include an executive summary, policy context, analysis, and concrete recommendations.</p>
              <a href="#call-for-papers" className="text-[#b91c1c] text-sm font-semibold hover:underline">See submission guidelines →</a>
            </div>
            <div className="bg-white border border-[#d5d0c8] rounded p-6 hover:border-[#b91c1c] transition">
              <div className="font-mono text-[9px] text-[#b91c1c] uppercase tracking-wider mb-2">Format</div>
              <h3 className="font-serif text-lg font-bold text-[#1a1a1a] mb-2">Brief Structure</h3>
              <div className="text-sm text-[#6b6b6b] font-light leading-relaxed space-y-2">
                <p><strong className="text-[#1a1a1a]">Executive Summary</strong> — 200-word overview with key recommendation</p>
                <p><strong className="text-[#1a1a1a]">Policy Context</strong> — Background and current state of the issue</p>
                <p><strong className="text-[#1a1a1a]">Analysis</strong> — Evidence-based assessment with data and sourcing</p>
                <p><strong className="text-[#1a1a1a]">Recommendations</strong> — Specific, actionable policy proposals</p>
                <p><strong className="text-[#1a1a1a]">References</strong> — Chicago Author-Date citation style</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH AREAS */}
      <section className="py-20 bg-[#f2f0eb] border-b border-[#d5d0c8]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="font-mono text-[11px] tracking-[.2em] text-[#b91c1c] uppercase">Research Domains</div>
          <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mt-2 mb-8">Areas of Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 border border-[#d5d0c8]" style={{gap:'1px',background:'#d5d0c8'}}>
            {[['🌐','International Relations','State behaviour, alliance dynamics, and institutional evolution.'],['⚛️','Nuclear Strategy & Arms Control','Deterrence, non-proliferation, and weapons governance.'],['🗺️','Geopolitics & Grand Strategy','Great-power competition, maritime chokepoints, corridors of influence.'],['🛡️','Security & Defence','Security architectures, military strategy, and asymmetric warfare.'],['🏛️','Political Science','Comparative politics, governance, populism, and statecraft.'],['🕊️','Peace & Conflict','Conflict dynamics, reconstruction, and humanitarian law.'],['🤖','Technology & Statecraft','AI, cyber, quantum, and the weaponisation of technology.'],['🌍','Regional Studies','South Asia, Middle East, Indo-Pacific, and the Islamic world.']].map(([i,t,d])=>(
              <div key={t} className="bg-white p-6 hover:bg-red-50 transition"><div className="text-2xl mb-3">{i}</div><h4 className="font-serif text-[15px] text-[#1a1a1a] font-semibold mb-2">{t}</h4><p className="text-[12px] text-[#6b6b6b] font-light leading-relaxed">{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL BOARD & GOVERNANCE */}
      <section id="editorial-board" className="py-20 border-b border-[#d5d0c8]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="font-mono text-[11px] tracking-[.2em] text-[#b91c1c] uppercase">Governance</div>
          <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mt-2 mb-2">Editorial Board</h2>
          <p className="text-[#6b6b6b] max-w-2xl font-light mb-8">The GSSO Journal is governed by an independent editorial board of scholars and practitioners committed to the highest standards of scholarly research.</p>

          {/* Editor-in-Chief */}
          <h3 className="font-serif text-lg text-[#1a1a1a] font-semibold mb-4 pb-2 border-b-2 border-[#1a1a1a]">Editor-in-Chief</h3>
          <div className="bg-white border border-[#d5d0c8] rounded p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-[#f2f0eb] border border-[#d5d0c8] flex items-center justify-center font-serif text-lg text-[#999] shrink-0">EiC</div>
              <div>
                <div className="font-serif text-lg font-bold text-[#1a1a1a]">Position Open — Call for Applications</div>
                <div className="font-mono text-[10px] text-[#b91c1c] uppercase tracking-wider mt-0.5">Editor-in-Chief, GSSO Journal</div>
                <p className="text-sm text-[#6b6b6b] font-light mt-2 leading-relaxed">We seek an established scholar (Associate Professor or above) with a distinguished publication record in international relations, strategic studies, or a cognate field. The Editor-in-Chief oversees editorial policy, manages the peer review process, and ensures the scholarly integrity of the journal.</p>
                <a href="/apply/editor-in-chief" className="inline-block mt-3 bg-[#b91c1c] hover:bg-[#8b1515] text-white px-4 py-2 rounded text-sm font-semibold transition">View Full Description & Apply →</a>
              </div>
            </div>
          </div>

          {/* Associate Editors */}
          <h3 className="font-serif text-lg text-[#1a1a1a] font-semibold mb-4 pb-2 border-b-2 border-[#1a1a1a]">Associate Editors (2–3 Positions)</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              ['Nuclear Strategy & Arms Control','Deterrence theory, non-proliferation, arms control treaties, nuclear governance, and space security.'],
              ['Geopolitics & Regional Security','Great-power competition, alliance dynamics, Middle East security, South Asian stability, and Indo-Pacific strategy.'],
              ['Technology, Climate & Emerging Threats','AI and warfare, cyber operations, climate-security nexus, critical minerals, and disinformation.'],
            ].map(([title,desc])=>(
              <div key={title} className="bg-white border border-[#d5d0c8] rounded p-5 hover:border-[#b91c1c] transition">
                <div className="font-mono text-[9px] text-[#b91c1c] uppercase tracking-wider mb-2">Open Position</div>
                <h4 className="font-serif text-[15px] text-[#1a1a1a] font-semibold mb-2">{title}</h4>
                <p className="text-[12px] text-[#6b6b6b] font-light leading-relaxed mb-3">{desc}</p>
                <p className="text-[11px] text-[#999] mb-2">Seeking: Assistant/Associate Professor or Senior Postdoc with relevant peer-reviewed publications.</p><a href="/apply/associate-editor" className="text-[#b91c1c] text-[12px] font-semibold hover:underline">View Full Description & Apply →</a>
              </div>
            ))}
          </div>

          {/* International Advisory Board */}
          <h3 className="font-serif text-lg text-[#1a1a1a] font-semibold mb-4 pb-2 border-b-2 border-[#1a1a1a]">International Advisory Board (4–6 Positions)</h3>
          <div className="bg-white border border-[#d5d0c8] rounded p-6 mb-8">
            <p className="text-sm text-[#6b6b6b] font-light leading-relaxed mb-4">GSSO is establishing an International Advisory Board comprising mid-career and senior scholars from diverse institutions and geographies. Board members provide strategic guidance, participate in annual reviews, and lend institutional credibility to the journal.</p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {['International Relations & Diplomacy','Strategic Studies & Defence','Political Economy & Development','Regional Specialisation (South Asia, Middle East, Indo-Pacific, Africa)'].map(area=>(
                <div key={area} className="flex items-center gap-2"><div className="w-2 h-2 bg-[#b91c1c] rounded-full shrink-0"/><span className="text-sm text-[#3a3a3a]">{area}</span></div>
              ))}
            </div>
            <p className="text-[11px] text-[#999] mb-3">Seeking: Assistant Professor, Associate Professor, Senior Postdoc, or Policy Researcher at a recognised institution.</p>
            <a href="/apply/advisory-board" className="inline-block bg-[#1a1a1a] hover:bg-[#333] text-white px-4 py-2 rounded text-sm font-semibold transition">View Description & Apply →</a>
          </div>

          {/* Founding Director */}
          <h3 className="font-serif text-lg text-[#1a1a1a] font-semibold mb-4 pb-2 border-b-2 border-[#1a1a1a]">Founding Director</h3>
          <div className="bg-white border border-[#d5d0c8] rounded p-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full border-2 border-[#a67c37] overflow-hidden shrink-0">
                <img src="/ceo-photo.png" alt="Dr. Naim Tahir Baig" className="w-full h-full object-cover"/>
              </div>
              <div>
                <div className="font-serif text-lg font-bold text-[#1a1a1a]">Dr. Naim Tahir Baig</div>
                <div className="font-mono text-[10px] text-[#b91c1c] uppercase tracking-wider mt-0.5">Founding Director, GSSO</div>
                <p className="text-sm text-[#6b6b6b] font-light mt-2 leading-relaxed">Ph.D. in International Relations. Founding director of GSSO, with published research on nuclear deterrence, geopolitics, and South Asian security. Author of independently published works available on Amazon, Barnes & Noble, and other platforms.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* PEER REVIEWER POOL */}
      <section className="py-20 bg-[#f2f0eb] border-b border-[#d5d0c8]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="font-mono text-[11px] tracking-[.2em] text-[#b91c1c] uppercase">Open Registration</div>
          <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mt-2 mb-2">Join Our Peer Reviewer Pool</h2>
          <p className="text-[#6b6b6b] max-w-2xl font-light mb-8">GSSO maintains a register of qualified scholars available for double-blind peer review. Registered reviewers are invited to evaluate manuscripts matching their expertise on a per-submission basis. Active reviewers may be considered for future Advisory Board appointments.</p>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1a1a1a] mb-4">What Reviewers Do</h3>
              <div className="space-y-3 text-sm text-[#6b6b6b] font-light leading-relaxed">
                <div className="flex gap-3"><span className="text-[#b91c1c] shrink-0 mt-0.5">—</span><span>Evaluate 1–3 manuscripts per year (by invitation, not obligation)</span></div>
                <div className="flex gap-3"><span className="text-[#b91c1c] shrink-0 mt-0.5">—</span><span>Provide structured, constructive feedback within 3–4 weeks</span></div>
                <div className="flex gap-3"><span className="text-[#b91c1c] shrink-0 mt-0.5">—</span><span>Maintain confidentiality throughout the review process</span></div>
                <div className="flex gap-3"><span className="text-[#b91c1c] shrink-0 mt-0.5">—</span><span>Decline assignments where a conflict of interest exists</span></div>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1a1a1a] mt-8 mb-4">Who Can Register</h3>
              <div className="space-y-3 text-sm text-[#6b6b6b] font-light leading-relaxed">
                <div className="flex gap-3"><span className="text-[#b91c1c] shrink-0 mt-0.5">•</span><span>Ph.D. holders or advanced doctoral candidates in a relevant discipline</span></div>
                <div className="flex gap-3"><span className="text-[#b91c1c] shrink-0 mt-0.5">•</span><span>Active researchers at recognised universities, think-tanks, or policy institutions</span></div>
                <div className="flex gap-3"><span className="text-[#b91c1c] shrink-0 mt-0.5">•</span><span>At least 2 peer-reviewed publications in your area of expertise</span></div>
                <div className="flex gap-3"><span className="text-[#b91c1c] shrink-0 mt-0.5">•</span><span>Willingness to complete reviews within the agreed timeframe</span></div>
              </div>
              <div className="bg-white border border-[#d5d0c8] rounded p-4 mt-6">
                <p className="text-[12px] text-[#6b6b6b] font-light"><strong className="text-[#1a1a1a]">Note:</strong> Registration does not guarantee assignment. Reviewers are matched to manuscripts based on subject expertise. All review work is voluntary and conducted in accordance with our <a href="/peer-review-policy" className="text-[#b91c1c] hover:underline">Peer Review Policy</a>.</p>
              </div>
            </div>
            <div className="bg-white border border-[#d5d0c8] rounded p-6">
              {reviewerSent?(
                <div className="text-center py-8"><div className="text-3xl mb-3">✓</div><h3 className="font-serif text-xl font-bold text-[#1a1a1a]">Registration Received</h3><p className="text-sm text-[#6b6b6b] mt-2">You have been added to our reviewer pool. We will contact you when a manuscript matching your expertise is received.</p></div>
              ):(
                <><h3 className="font-serif text-lg font-bold text-[#1a1a1a] mb-1">Reviewer Registration</h3><p className="text-[11px] text-[#999] mb-4">Register your interest and expertise. We will contact you when a relevant manuscript is received.</p>
                <form onSubmit={submitReviewer} className="space-y-3">
                  <div><label className="block text-[11px] font-mono uppercase tracking-wider text-[#999] mb-1">Full Name & Title *</label><input required placeholder="e.g. Dr. Jane Smith" value={reviewerForm.name} onChange={e=>setReviewerForm({...reviewerForm,name:e.target.value})} className="w-full border border-[#d5d0c8] rounded px-3 py-2 text-sm focus:border-[#b91c1c] outline-none"/></div>
                  <div><label className="block text-[11px] font-mono uppercase tracking-wider text-[#999] mb-1">Institutional Email *</label><input required type="email" placeholder="jane.smith@university.edu" value={reviewerForm.email} onChange={e=>setReviewerForm({...reviewerForm,email:e.target.value})} className="w-full border border-[#d5d0c8] rounded px-3 py-2 text-sm focus:border-[#b91c1c] outline-none"/></div>
                  <div><label className="block text-[11px] font-mono uppercase tracking-wider text-[#999] mb-1">Institution & Position *</label><input required placeholder="e.g. Postdoc, University of X" value={reviewerForm.institution} onChange={e=>setReviewerForm({...reviewerForm,institution:e.target.value})} className="w-full border border-[#d5d0c8] rounded px-3 py-2 text-sm focus:border-[#b91c1c] outline-none"/></div>
                  <div><label className="block text-[11px] font-mono uppercase tracking-wider text-[#999] mb-1">Areas of Expertise *</label><textarea required rows={3} placeholder="List your research areas, e.g. nuclear deterrence, South Asian security, arms control theory..." value={reviewerForm.expertise} onChange={e=>setReviewerForm({...reviewerForm,expertise:e.target.value})} className="w-full border border-[#d5d0c8] rounded px-3 py-2 text-sm focus:border-[#b91c1c] outline-none"/></div>
                  <div><label className="block text-[11px] font-mono uppercase tracking-wider text-[#999] mb-1">Google Scholar / ORCID / Profile URL</label><input placeholder="https://scholar.google.com/..." value={reviewerForm.scholar_url} onChange={e=>setReviewerForm({...reviewerForm,scholar_url:e.target.value})} className="w-full border border-[#d5d0c8] rounded px-3 py-2 text-sm focus:border-[#b91c1c] outline-none"/></div>
                  <button type="submit" className="w-full bg-[#b91c1c] hover:bg-[#8b1515] text-white py-3 rounded text-sm font-semibold transition">Register as Reviewer →</button>
                </form></>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CALL FOR PAPERS */}
      <section id="call-for-papers" className="py-20 bg-[#0c1220] text-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="font-mono text-[11px] tracking-[.2em] text-[#a67c37] uppercase">Open Call</div>
          <h2 className="font-serif text-3xl font-bold text-white mt-2 mb-2">Call for Papers</h2>
          <p className="text-white/50 max-w-2xl font-light mb-10">The GSSO Journal of International Security Studies (ISSN: 2960-0001) invites original submissions from scholars, analysts, and practitioners worldwide for its upcoming issues.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif text-xl font-bold text-white mb-4">Submission Guidelines</h3>
              <div className="space-y-4 text-sm text-white/50 font-light leading-relaxed">
                <p><strong className="text-white">Research Papers:</strong> 5,000–12,000 words including references. Must include abstract (200–300 words), keywords, and complete bibliography.</p>
                <p><strong className="text-white">Policy Briefs:</strong> 2,000–4,000 words. Executive summary, policy context, evidence-based analysis, and concrete recommendations.</p>
                <p><strong className="text-white">Strategic Commentaries:</strong> 1,500–3,000 words. Timely analysis of emerging strategic developments.</p>
                <p><strong className="text-white">Book Reviews:</strong> 1,000–2,000 words. Critical assessments of recently published works in our subject domains.</p>
                <p><strong className="text-white">Citation Style:</strong> Chicago Manual of Style (Author-Date system).</p>
                <p><strong className="text-white">Review Process:</strong> All research papers and policy briefs undergo double-blind peer review. Initial editorial screening: 7–10 days. Full peer review: 6–8 weeks.</p>
                <p><strong className="text-white">Open Access:</strong> Accepted papers are published open-access on geostrategicstudies.org.</p>
                <p className="mt-4"><a href="/peer-review-policy" className="text-[#a67c37] hover:underline font-medium">Read our full Peer Review Policy →</a></p>
              </div>

              <h3 className="font-serif text-xl font-bold text-white mt-8 mb-4">Topics of Interest</h3>
              <div className="grid grid-cols-2 gap-2">
                {['International Relations Theory','Nuclear Deterrence & Arms Control','Great-Power Competition','Geopolitics & Grand Strategy','Regional Security Architectures','AI & Emerging Technology in Warfare','Climate-Security Nexus','Maritime & Space Security','Political Economy of Defence','Conflict Resolution & Peace Studies','Disinformation & Epistemic Security','Global South & Non-Alignment'].map(t=>(
                  <div key={t} className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#a67c37] rounded-full shrink-0"/><span className="text-[12px] text-white/50">{t}</span></div>
                ))}
              </div>
            </div>

            <div className="bg-white/[.04] border border-white/[.08] rounded p-6">
              {paperSent?(
                <div className="text-center py-8"><div className="text-3xl mb-3">✓</div><h3 className="font-serif text-xl font-bold">Submission Received</h3><p className="text-white/50 text-sm mt-2">Our editorial team will respond within 7–10 days.</p></div>
              ):(
                <>
                  <h3 className="font-serif text-lg font-bold text-white mb-4">Submit Your Manuscript</h3>
                  <form onSubmit={submitPaper} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input required placeholder="Full Name / Title" value={paperForm.authorName} onChange={e=>setPaperForm({...paperForm,authorName:e.target.value})} className="bg-white/[.05] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-[#a67c37] outline-none"/>
                      <input required type="email" placeholder="Institutional Email" value={paperForm.authorEmail} onChange={e=>setPaperForm({...paperForm,authorEmail:e.target.value})} className="bg-white/[.05] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-[#a67c37] outline-none"/>
                    </div>
                    <input placeholder="Institution / Affiliation" value={paperForm.institution} onChange={e=>setPaperForm({...paperForm,institution:e.target.value})} className="w-full bg-white/[.05] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-[#a67c37] outline-none"/>
                    <select value={paperForm.type} onChange={e=>setPaperForm({...paperForm,type:e.target.value})} className="w-full bg-white/[.05] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-[#a67c37] outline-none">
                      <option value="paper" className="bg-[#0c1220]">Research Paper</option>
                      <option value="brief" className="bg-[#0c1220]">Policy Brief</option>
                      <option value="commentary" className="bg-[#0c1220]">Strategic Commentary</option>
                      <option value="review" className="bg-[#0c1220]">Book Review</option>
                    </select>
                    <input required placeholder="Paper Title" value={paperForm.title} onChange={e=>setPaperForm({...paperForm,title:e.target.value})} className="w-full bg-white/[.05] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-[#a67c37] outline-none"/>
                    <textarea required rows={4} placeholder="Abstract (200–300 words)" value={paperForm.abstract} onChange={e=>setPaperForm({...paperForm,abstract:e.target.value})} className="w-full bg-white/[.05] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-[#a67c37] outline-none"/>
                    <input placeholder="Keywords (comma separated)" value={paperForm.keywords} onChange={e=>setPaperForm({...paperForm,keywords:e.target.value})} className="w-full bg-white/[.05] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-[#a67c37] outline-none"/>
                    <button type="submit" className="w-full bg-[#b91c1c] hover:bg-[#8b1515] text-white py-3 rounded text-sm font-semibold transition">Submit for Review →</button>
                    <p className="text-[10px] text-white/30 text-center">By submitting, you confirm this manuscript is original and not under review elsewhere.</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FURTHER READING & RESOURCES */}
      <section id="resources" className="py-20 border-b border-[#d5d0c8]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="font-mono text-[11px] tracking-[.2em] text-[#b91c1c] uppercase">Reference</div>
          <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mt-2 mb-2">Further Reading & Resources</h2>
          <p className="text-[#6b6b6b] max-w-2xl font-light mb-8">Academic journals, databases, and international organisations relevant to strategic studies and international security research.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 border border-[#d5d0c8]" style={{gap:'1px',background:'#d5d0c8'}}>
            {resources.map(([n,d,u])=>(
              <a key={n} href={u} target="_blank" rel="noreferrer" className="bg-white p-4 hover:bg-red-50 transition block no-underline">
                <h4 className="text-[13px] font-semibold text-[#1a1a1a] mb-0.5">{n}</h4>
                <p className="text-[11px] text-[#6b6b6b] font-light">{d}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-[#f2f0eb] border-b border-[#d5d0c8]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="font-mono text-[11px] tracking-[.2em] text-[#b91c1c] uppercase">Contact</div>
          <h2 className="font-serif text-3xl font-bold text-[#1a1a1a] mt-2 mb-8">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-[#6b6b6b] font-light leading-relaxed mb-6">For editorial inquiries, manuscript submissions, board applications, or institutional collaboration.</p>
              {[['✉','General Enquiries','info@geostrategicstudies.org','mailto:info@geostrategicstudies.org'],['✉','Editorial & Submissions','submissions@geostrategicstudies.org','mailto:submissions@geostrategicstudies.org'],['✉','Editor','editor@geostrategicstudies.org','mailto:editor@geostrategicstudies.org'],['🌐','Website','geostrategicstudies.org','https://geostrategicstudies.org']].map(([i,l,v,href])=>(
                <a key={l} href={href} target={href.startsWith('https')?'_blank':undefined} rel={href.startsWith('https')?'noreferrer':undefined} className="flex gap-3 mb-4 items-start p-3 -ml-3 rounded hover:bg-white border border-transparent hover:border-[#d5d0c8] transition cursor-pointer no-underline">
                  <div className="w-9 h-9 border border-[#d5d0c8] rounded flex items-center justify-center shrink-0 text-sm">{i}</div>
                  <div className="text-[14px] text-[#6b6b6b]"><strong className="text-[#1a1a1a] block">{l}</strong>{v}</div>
                </a>
              ))}
            </div>
            <div>
              {contactSent?(
                <div className="text-center py-12"><div className="text-3xl mb-3">✓</div><h3 className="font-serif text-xl font-bold text-[#1a1a1a]">Message Sent</h3><p className="text-[#6b6b6b] text-sm mt-2">We will respond within 48 hours.</p></div>
              ):(
                <form onSubmit={submitContact} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input required placeholder="Full Name" value={contactForm.name} onChange={e=>setContactForm({...contactForm,name:e.target.value})} className="border border-[#d5d0c8] rounded px-3 py-2.5 text-sm focus:border-[#b91c1c] outline-none bg-white"/>
                    <input required type="email" placeholder="Email" value={contactForm.email} onChange={e=>setContactForm({...contactForm,email:e.target.value})} className="border border-[#d5d0c8] rounded px-3 py-2.5 text-sm focus:border-[#b91c1c] outline-none bg-white"/>
                  </div>
                  <input placeholder="Organisation / Institution" value={contactForm.organisation} onChange={e=>setContactForm({...contactForm,organisation:e.target.value})} className="w-full border border-[#d5d0c8] rounded px-3 py-2.5 text-sm focus:border-[#b91c1c] outline-none bg-white"/>
                  <select value={contactForm.subject} onChange={e=>setContactForm({...contactForm,subject:e.target.value})} className="w-full border border-[#d5d0c8] rounded px-3 py-2.5 text-sm focus:border-[#b91c1c] outline-none bg-white">
                    {['Editorial Inquiry','Manuscript Submission','Board Application','Institutional Collaboration','Media Inquiry','General'].map(o=><option key={o} value={o}>{o}</option>)}
                  </select>
                  <textarea required rows={4} placeholder="Your message..." value={contactForm.message} onChange={e=>setContactForm({...contactForm,message:e.target.value})} className="w-full border border-[#d5d0c8] rounded px-3 py-2.5 text-sm focus:border-[#b91c1c] outline-none bg-white"/>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1 max-w-xs">
              <div className="font-serif text-white/70 font-bold">Geo Strategic Studies</div>
              <div className="font-mono text-[9px] tracking-wider text-white/20 uppercase mt-0.5">Organisation · Independent Think-Tank</div>
              <p className="text-sm mt-3 leading-relaxed">Independent research, working papers, and a forthcoming peer-reviewed journal in international relations and strategic studies.</p>
              <div className="font-mono text-[10px] text-white/20 mt-2">ISSN: 2960-0001 (Online)</div>
            </div>
            <div className="text-sm space-y-2">
              <div className="font-mono text-[10px] text-white/50 uppercase tracking-wider mb-3">Journal</div>
              <a href="#journal" className="block hover:text-[#a67c37] transition">Current Issue</a>
              <a href="#policy-briefs" className="block hover:text-[#a67c37] transition">Policy Briefs</a>
              <a href="#call-for-papers" className="block hover:text-[#a67c37] transition">Call for Papers</a>
              <a href="#call-for-papers" className="block hover:text-[#a67c37] transition">Submission Guidelines</a>
              <a href="/peer-review-policy" className="block hover:text-[#a67c37] transition">Peer Review Policy</a>
              <a href="/ethics" className="block hover:text-[#a67c37] transition">Publication Ethics</a>
              <a href="/masthead" className="block hover:text-[#a67c37] transition">Masthead</a>
            </div>
            <div className="text-sm space-y-2">
              <div className="font-mono text-[10px] text-white/50 uppercase tracking-wider mb-3">Organisation</div>
              <a href="#about" className="block hover:text-[#a67c37] transition">About GSSO</a>
              <a href="#editorial-board" className="block hover:text-[#a67c37] transition">Editorial Board</a>
              <a href="#editorial-board" className="block hover:text-[#a67c37] transition">Join Our Team</a>
              <a href="#resources" className="block hover:text-[#a67c37] transition">Resources</a>
            </div>
            <div className="text-sm space-y-2">
              <div className="font-mono text-[10px] text-white/50 uppercase tracking-wider mb-3">Contact</div>
              <a href="mailto:info@geostrategicstudies.org" className="block hover:text-[#a67c37] transition">info@geostrategicstudies.org</a>
              <a href="#contact" className="block hover:text-[#a67c37] transition">Contact Form</a>
              <a href="/privacy" className="block hover:text-[#a67c37] transition">Privacy Policy</a>
              <a href="/terms" className="block hover:text-[#a67c37] transition">Terms of Use</a>
            </div>
          </div>
          <div className="border-t border-white/[.06] pt-6 flex justify-between items-center flex-wrap gap-4 text-[11px]">
            <span>&copy; 2026 Geo Strategic Studies Organisation. All rights reserved.</span>
            <span className="font-mono text-[10px] text-white/20">GSSO · ISSN: 2960-0001 · Working Papers · Open Access</span>
          </div>
        </div>
      </footer>

      {/* READING PANEL */}
      {readerPaper&&(<div className="fixed inset-0 z-[100] flex">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={()=>setReaderPaper(null)}/>
        <div className="relative ml-auto w-full max-w-[900px] bg-[#faf9f6] h-full overflow-y-auto shadow-2xl" style={{animation:'slideIn .3s ease'}}>
          <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>
          <div className="sticky top-0 z-10 bg-[#0c1220] text-white px-8 py-4 flex justify-between items-center">
            <div className="flex-1 min-w-0"><div className="font-mono text-[9px] tracking-wider text-[#a67c37] uppercase">GSSO · ISSN: 2960-0001</div><div className="font-serif text-sm font-semibold truncate mt-0.5">{readerPaper.title}</div></div>
            <div className="flex items-center gap-3 ml-4 shrink-0">
              <button onClick={()=>setReaderFontSize(s=>Math.max(12,s-2))} className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition">A-</button>
              <button onClick={()=>setReaderFontSize(s=>Math.min(24,s+2))} className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition">A+</button>
              <button onClick={()=>setReaderPaper(null)} className="w-8 h-8 rounded bg-white/10 hover:bg-red-500/30 text-white flex items-center justify-center text-lg transition">&times;</button>
            </div>
          </div>
          <div className="px-8 md:px-16 py-10"><div className="max-w-[680px] mx-auto">
            <span className={`font-mono text-[10px] uppercase px-2.5 py-1 rounded ${readerPaper.type==='paper'?'bg-red-50 text-[#b91c1c]':'bg-green-50 text-green-700'}`}>{readerPaper.type==='working'?'Working Paper':readerPaper.type==='brief'?'Policy Brief':'Research Paper'}</span>
            <h1 className="font-serif text-3xl font-bold text-[#1a1a1a] mt-4 mb-3 leading-tight">{readerPaper.title}</h1>
            <div className="text-[#b91c1c] font-medium mb-1">{readerPaper.authors}</div>
            <div className="flex flex-wrap gap-3 text-[12px] text-[#999] font-mono mb-8">{readerPaper.journal&&<span>{readerPaper.journal}</span>}{readerPaper.doi&&<span>DOI: {readerPaper.doi}</span>}</div>
            <div className="bg-[#f2f0eb] border border-[#d5d0c8] rounded p-6 mb-8"><h2 className="font-mono text-[10px] uppercase tracking-wider text-[#b91c1c] mb-2">Abstract</h2><p style={{fontSize:readerFontSize+'px'}} className="text-[#3a3a3a] leading-relaxed font-serif">{readerPaper.abstract}</p></div>
            {readerPaper.tags&&<div className="mb-8"><div className="flex flex-wrap gap-2">{readerPaper.tags.split(',').map(t=><span key={t} className="font-mono text-[11px] px-3 py-1 bg-[#f2f0eb] border border-[#d5d0c8] rounded text-[#6b6b6b]">{t.trim()}</span>)}</div></div>}
            {readerPaper.url&&readerPaper.url.endsWith('.pdf')?(
              <div><div className="flex gap-2 mb-4"><a href={readerPaper.url} target="_blank" rel="noreferrer" className="bg-[#b91c1c] hover:bg-[#8b1515] text-white px-4 py-2 rounded text-[12px] font-semibold transition">Download PDF</a></div><iframe src={readerPaper.url} className="w-full border border-[#d5d0c8] rounded" style={{height:'80vh'}} title={readerPaper.title}/></div>
            ):(
              <div className="bg-white border border-[#d5d0c8] rounded p-10 text-center"><div className="text-4xl mb-4">📄</div><h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-2">Full Text</h3><p className="text-sm text-[#6b6b6b] mb-6">Contact the editorial office to request the full manuscript.</p><a href="mailto:editor@geostrategicstudies.org" className="bg-[#b91c1c] hover:bg-[#8b1515] text-white px-5 py-2.5 rounded text-sm font-semibold transition">Request Full Text</a></div>
            )}
            <div className="mt-10 pt-6 border-t border-[#d5d0c8]"><h3 className="font-mono text-[10px] uppercase tracking-wider text-[#999] mb-2">Cite This Paper</h3><div className="bg-[#f2f0eb] rounded p-4 text-[12px] text-[#3a3a3a] font-mono leading-relaxed">{readerPaper.authors} ({readerPaper.year}). &ldquo;{readerPaper.title}.&rdquo; <em>{readerPaper.journal}</em>{readerPaper.doi&&`. DOI: ${readerPaper.doi}`}.</div></div>
          </div></div>
        </div>
      </div>)}

      {/* BACK TO TOP */}
      {showBtt&&(<button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="fixed bottom-8 right-8 w-11 h-11 bg-[#b91c1c] hover:bg-[#8b1515] text-white rounded-full flex items-center justify-center shadow-lg transition z-50 text-lg">&uarr;</button>)}
    </div>
  );
}
