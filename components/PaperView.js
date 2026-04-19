'use client';
import { useState } from 'react';

export default function PaperView({ paper, relatedPapers }) {
  const [copied, setCopied] = useState(false);

  const citation = `${paper.authors} (${paper.year}). "${paper.title}." ${paper.journal || 'GSSO Journal of International Security Studies'}${paper.doi ? `. DOI: ${paper.doi}` : ''}.`;

  const copyCitation = () => {
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = paper.fullText ? paper.fullText.split(/\n(?=#{1,3}\s|(?:\d+\.\s))/) : [];

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Libre Franklin', sans-serif", background: '#faf9f6', color: '#3a3a3a' }}>
      {/* TOPBAR */}
      <div className="bg-[#0c1220] py-1.5 text-[11px] text-white/50 tracking-wide">
        <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center">
          <span>GSSO Journal of International Security Studies · ISSN: 2960-0001</span>
          <a href="/" className="hover:text-white/80 transition">← Back to GSSO</a>
        </div>
      </div>

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#d5d0c8]">
        <div className="max-w-[1200px] mx-auto px-8 py-3 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3">
            <svg width="36" height="36" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="20" stroke="#0c1220" strokeWidth="1.5"/><ellipse cx="22" cy="22" rx="12" ry="20" stroke="#0c1220" strokeWidth="1" transform="rotate(25 22 22)"/><circle cx="22" cy="22" r="2.5" fill="#b91c1c"/></svg>
            <div><strong className="font-serif text-base text-[#1a1a1a]">Geo-Strategic Studies</strong><br/><span className="font-mono text-[8px] tracking-[.22em] text-[#b91c1c] uppercase">Journal · Vol. 1, No. 11</span></div>
          </a>
          <div className="flex items-center gap-3">
            <a href="/#journal" className="text-[13px] font-medium text-[#3a3a3a] px-3 py-2 rounded hover:text-[#b91c1c] hover:bg-red-50 transition">All Papers</a>
            <a href="/#submissions" className="text-[13px] font-medium bg-[#b91c1c] text-white px-4 py-2 rounded hover:bg-[#8b1515] transition">Submit Paper</a>
          </div>
        </div>
      </nav>

      {/* PAPER HEADER */}
      <header className="bg-[#0c1220] text-white pt-16 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-[860px] mx-auto px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className={`font-mono text-[10px] uppercase px-2.5 py-1 rounded ${paper.type === 'paper' ? 'bg-red-500/20 text-red-300' : paper.type === 'brief' ? 'bg-green-500/20 text-green-300' : 'bg-purple-500/20 text-purple-300'}`}>{paper.type === 'paper' ? 'Research Paper' : paper.type === 'brief' ? 'Policy Brief' : 'Thesis'}</span>
            <span className="font-mono text-[10px] text-white/30">|</span>
            <span className="font-mono text-[10px] text-white/40">{paper.journal}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-6">{paper.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
            <span className="text-[#a67c37] font-medium">{paper.authors}</span>
            {paper.year && <span className="font-mono text-[12px]">{paper.year}</span>}
            {paper.doi && <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noreferrer" className="font-mono text-[12px] text-white/40 hover:text-[#a67c37] transition">DOI: {paper.doi}</a>}
          </div>
        </div>
      </header>

      {/* PAPER CONTENT */}
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
          {/* Main Content */}
          <article>
            {/* Abstract */}
            <div className="bg-[#f2f0eb] border border-[#d5d0c8] rounded p-6 mb-8">
              <h2 className="font-mono text-[11px] uppercase tracking-wider text-[#b91c1c] mb-3">Abstract</h2>
              <p className="text-[15px] text-[#3a3a3a] leading-relaxed">{paper.abstract}</p>
            </div>

            {/* Keywords */}
            {paper.tags && (
              <div className="mb-8">
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#999] mb-2">Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {paper.tags.split(',').map(t => (
                    <span key={t} className="font-mono text-[11px] px-3 py-1 bg-[#f2f0eb] border border-[#d5d0c8] rounded text-[#6b6b6b]">{t.trim()}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Full Text */}
            {paper.fullText ? (
              <div className="prose prose-lg max-w-none">
                <div className="text-[15px] text-[#3a3a3a] leading-[1.9] space-y-5" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {paper.fullText.split('\n\n').map((para, i) => {
                    if (para.match(/^#{1,3}\s/) || para.match(/^\d+\.\s/)) {
                      const text = para.replace(/^#{1,3}\s*/, '').replace(/^\*\*|\*\*$/g, '');
                      return <h2 key={i} className="font-serif text-xl font-bold text-[#1a1a1a] mt-10 mb-4 pt-6 border-t border-[#e8e4dc]">{text}</h2>;
                    }
                    if (para.match(/^>\s/)) {
                      return <blockquote key={i} className="border-l-3 border-[#b91c1c] pl-5 italic text-[#6b6b6b] my-6">{para.replace(/^>\s*/, '')}</blockquote>;
                    }
                    return <p key={i}>{para}</p>;
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#d5d0c8] rounded p-12 text-center">
                <div className="text-4xl mb-4">📄</div>
                <h3 className="font-serif text-xl font-bold text-[#1a1a1a] mb-2">Full Text Available</h3>
                <p className="text-sm text-[#6b6b6b] mb-6 max-w-md mx-auto">
                  The complete paper is published in JGSSO Volume 1, Number 11 (April 2026). 
                  Access the full text through our journal or the author's institutional profile.
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  {paper.url && <a href={paper.url} target="_blank" rel="noreferrer" className="bg-[#b91c1c] hover:bg-[#8b1515] text-white px-5 py-2.5 rounded text-sm font-semibold transition">View on ResearchGate →</a>}
                  {paper.doi && <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noreferrer" className="border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white px-5 py-2.5 rounded text-sm font-semibold transition">View via DOI →</a>}
                  <a href="mailto:ceo@geostrategicstudies.org?subject=Request Full Text: ${encodeURIComponent(paper.title)}" className="border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white px-5 py-2.5 rounded text-sm font-semibold transition">Request Full Text</a>
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Paper Info Card */}
            <div className="bg-white border border-[#d5d0c8] rounded p-5 sticky top-20">
              <h3 className="font-mono text-[10px] uppercase tracking-wider text-[#b91c1c] mb-4">Paper Details</h3>
              <div className="space-y-3 text-sm">
                <div><span className="text-[#999] text-[12px] block font-mono">Authors</span><span className="text-[#1a1a1a] font-medium">{paper.authors}</span></div>
                {paper.journal && <div><span className="text-[#999] text-[12px] block font-mono">Published In</span><span className="text-[#1a1a1a]">{paper.journal}</span></div>}
                {paper.year && <div><span className="text-[#999] text-[12px] block font-mono">Year</span><span className="text-[#1a1a1a]">{paper.year}</span></div>}
                {paper.doi && <div><span className="text-[#999] text-[12px] block font-mono">DOI</span><a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noreferrer" className="text-[#b91c1c] hover:underline text-[13px] break-all">{paper.doi}</a></div>}
                <div><span className="text-[#999] text-[12px] block font-mono">Type</span><span className="text-[#1a1a1a] capitalize">{paper.type}</span></div>
                <div><span className="text-[#999] text-[12px] block font-mono">ISSN</span><span className="text-[#1a1a1a]">2960-0001 (Online)</span></div>
              </div>

              {/* Citation */}
              <div className="mt-5 pt-5 border-t border-[#e8e4dc]">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-[#999] mb-2">Cite This Paper</h4>
                <div className="bg-[#f2f0eb] rounded p-3 text-[11px] text-[#3a3a3a] font-mono leading-relaxed mb-2">{citation}</div>
                <button onClick={copyCitation} className={`w-full py-2 rounded text-[12px] font-semibold transition ${copied ? 'bg-emerald-500 text-white' : 'bg-[#1a1a1a] hover:bg-[#333] text-white'}`}>
                  {copied ? '✓ Copied!' : 'Copy Citation'}
                </button>
              </div>

              {/* Share */}
              <div className="mt-5 pt-5 border-t border-[#e8e4dc]">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-[#999] mb-2">Share</h4>
                <div className="flex gap-2">
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(paper.title)}&url=${encodeURIComponent(`https://geostrategicstudies.org/papers/${paper.id}`)}`} target="_blank" rel="noreferrer" className="flex-1 text-center py-2 bg-[#f2f0eb] rounded text-[11px] text-[#3a3a3a] hover:bg-[#e8e4dc] transition font-medium">Twitter/X</a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://geostrategicstudies.org/papers/${paper.id}`)}`} target="_blank" rel="noreferrer" className="flex-1 text-center py-2 bg-[#f2f0eb] rounded text-[11px] text-[#3a3a3a] hover:bg-[#e8e4dc] transition font-medium">LinkedIn</a>
                  <button onClick={() => { navigator.clipboard.writeText(`https://geostrategicstudies.org/papers/${paper.id}`); }} className="flex-1 text-center py-2 bg-[#f2f0eb] rounded text-[11px] text-[#3a3a3a] hover:bg-[#e8e4dc] transition font-medium">Copy Link</button>
                </div>
              </div>
            </div>

            {/* Related Papers */}
            {relatedPapers.length > 0 && (
              <div className="bg-white border border-[#d5d0c8] rounded p-5">
                <h3 className="font-mono text-[10px] uppercase tracking-wider text-[#b91c1c] mb-4">More from This Volume</h3>
                <div className="space-y-3">
                  {relatedPapers.map(rp => (
                    <a key={rp.id} href={`/papers/${rp.id}`} className="block py-2 border-b border-[#f2f0eb] last:border-0 hover:text-[#b91c1c] transition">
                      <div className="font-serif text-[13px] font-semibold text-[#1a1a1a] leading-tight hover:text-[#b91c1c]">{rp.title}</div>
                      <div className="text-[11px] text-[#999] mt-0.5">{rp.authors}</div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#080d18] text-white/30 py-8 border-t-[3px] border-[#b91c1c]">
        <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center flex-wrap gap-4 text-[11px]">
          <span>© 2026 Geo-Strategic Studies Organisation. All rights reserved.</span>
          <span className="font-mono text-[10px] text-white/20">JGSSO · ISSN: 2960-0001 · Policy · Research · Analysis</span>
        </div>
      </footer>
    </div>
  );
}
