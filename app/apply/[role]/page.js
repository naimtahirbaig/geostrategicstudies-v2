'use client';
import { useState } from 'react';

const roles = {
  'editor-in-chief': {
    title: 'Editor-in-Chief',
    type: 'Senior Editorial Leadership',
    commitment: '8–12 hours per month',
    term: '3-year renewable term',
    honorarium: 'Voluntary / honorary position. Travel support for conferences may be provided subject to funding.',
    deadline: 'Rolling applications — position open until filled',
    description: 'The Editor-in-Chief provides strategic editorial leadership for the GSSO Journal of International Security Studies (ISSN: 2960-0001). This is the senior editorial position responsible for the intellectual direction, quality assurance, and scholarly reputation of the journal.',
    responsibilities: [
      'Set and maintain editorial policy and scholarly standards',
      'Oversee the double-blind peer review process for all submissions',
      'Make final publication decisions based on reviewer recommendations',
      'Recruit, manage, and mentor Associate Editors',
      'Ensure compliance with COPE guidelines and DOAJ standards',
      'Represent the journal to the academic community',
      'Write an annual editorial reflecting on the journal\'s direction',
      'Convene the editorial board for quarterly reviews',
    ],
    qualifications: [
      'Ph.D. in International Relations, Political Science, Security Studies, Strategic Studies, or a cognate discipline',
      'Appointment at the level of Associate Professor or above at a recognised university or research institution',
      'Distinguished publication record in peer-reviewed journals (minimum 10 peer-reviewed articles)',
      'Prior editorial or peer review experience (journal board membership, guest editorship, or equivalent)',
      'Broad knowledge spanning at least two of GSSO\'s core research domains',
      'No concurrent editorship of a competing journal',
    ],
    desirable: [
      'Experience with open-access publishing models',
      'Familiarity with publication ethics frameworks (COPE, DOAJ)',
      'Established international scholarly network',
      'Track record of mentoring early-career researchers',
    ],
  },
  'associate-editor': {
    title: 'Associate Editor',
    type: 'Subject-Area Editorial Leadership',
    commitment: '4–6 hours per month',
    term: '2-year renewable term',
    honorarium: 'Voluntary / honorary position.',
    deadline: 'Rolling applications — 2–3 positions available',
    description: 'Associate Editors manage the peer review process for submissions within their subject area, identify qualified reviewers, and make recommendations to the Editor-in-Chief on publication decisions.',
    responsibilities: [
      'Screen incoming manuscripts for quality and scope within assigned domain',
      'Identify and invite qualified peer reviewers for each submission',
      'Evaluate reviewer reports and prepare editorial recommendations',
      'Communicate decisions and structured feedback to authors',
      'Monitor review timelines and ensure adherence to the 6–8 week target',
      'Advise the Editor-in-Chief on emerging topics and special issues',
      'Contribute to the development of the journal\'s reviewer pool',
    ],
    qualifications: [
      'Ph.D. in a relevant discipline (International Relations, Political Science, Security Studies, or cognate field)',
      'Appointment at the level of Assistant Professor, Associate Professor, Senior Postdoc, or equivalent research position',
      'Active publication record in peer-reviewed journals (minimum 5 peer-reviewed articles)',
      'Demonstrated expertise in at least one of: nuclear strategy & arms control; geopolitics & regional security; technology, climate & emerging threats',
      'Prior peer review experience (having reviewed for at least one peer-reviewed journal)',
    ],
    desirable: [
      'Experience managing peer review workflows',
      'Regional expertise (South Asia, Middle East, Indo-Pacific, Africa, or Europe)',
      'Ability to read and evaluate research in more than one language',
    ],
    areas: ['Nuclear Strategy & Arms Control', 'Geopolitics & Regional Security', 'Technology, Climate & Emerging Threats'],
  },
  'advisory-board': {
    title: 'International Advisory Board Member',
    type: 'Strategic Advisory',
    commitment: '2–4 hours per quarter',
    term: '3-year term',
    honorarium: 'Voluntary / honorary position.',
    deadline: 'Expressions of interest accepted on a rolling basis',
    description: 'Advisory Board members provide strategic counsel on the journal\'s intellectual direction, help expand its international scholarly network, and lend institutional credibility. This is not a day-to-day operational role.',
    responsibilities: [
      'Participate in an annual advisory review (virtual or written)',
      'Advise on the journal\'s strategic direction and research priorities',
      'Recommend potential authors, reviewers, and collaborators',
      'Assist with outreach to institutions and scholarly networks in your region',
      'Provide input on special issues or thematic volumes when consulted',
    ],
    qualifications: [
      'Ph.D. or equivalent professional qualification in a relevant field',
      'Active position at a recognised university, research institution, think-tank, or intergovernmental organisation',
      'Established reputation within your area of expertise',
      'Publication record or significant policy experience in international security or strategic studies',
    ],
    desirable: [
      'Based outside of South Asia (to ensure geographic diversity on the board)',
      'Expertise in under-represented regions or emerging research areas',
      'Experience with journal governance, academic associations, or research councils',
    ],
    areas: ['International Relations & Diplomacy', 'Strategic Studies & Defence', 'Political Economy & Development', 'Regional Specialisation'],
  },
};

export default function ApplyPage({ params }) {
  const role = roles[params.role];
  const [form, setForm] = useState({ name: '', email: '', institution: '', position: '', area: '', cv_url: '', statement: '' });
  const [sent, setSent] = useState(false);

  if (!role) return (
    <div className="min-h-screen flex items-center justify-center" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>
      <div className="text-center"><h1 className="font-serif text-2xl font-bold mb-4">Position Not Found</h1><a href="/#editorial-board" className="text-[#b91c1c] hover:underline">← Back to Editorial Board</a></div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, type: 'board-application', role: params.role })
    });
    setSent(true);
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Libre Franklin', sans-serif", background: '#faf9f6', color: '#3a3a3a' }}>
      <nav className="sticky top-0 z-50 bg-white border-b border-[#d5d0c8]">
        <div className="max-w-[960px] mx-auto px-8 py-3 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3">
            <svg width="36" height="36" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="20" stroke="#0c1220" strokeWidth="1.5"/><ellipse cx="22" cy="22" rx="12" ry="20" stroke="#0c1220" strokeWidth="1" transform="rotate(25 22 22)"/><circle cx="22" cy="22" r="2.5" fill="#b91c1c"/></svg>
            <div><strong className="font-serif text-base text-[#1a1a1a]">GSSO</strong><br/><span className="font-mono text-[8px] tracking-[.22em] text-[#b91c1c] uppercase">Editorial Recruitment</span></div>
          </a>
          <a href="/#editorial-board" className="text-[13px] text-[#3a3a3a] hover:text-[#b91c1c] transition">← Editorial Board</a>
        </div>
      </nav>

      <div className="max-w-[960px] mx-auto px-8 py-12">
        <div className="grid md:grid-cols-[1fr_380px] gap-12">
          {/* Job Description */}
          <div>
            <div className="font-mono text-[11px] tracking-[.2em] text-[#b91c1c] uppercase">{role.type}</div>
            <h1 className="font-serif text-3xl font-bold text-[#1a1a1a] mt-2 mb-2">{role.title}</h1>
            <p className="text-[#6b6b6b] font-light mb-6">GSSO Journal of International Security Studies · ISSN: 2960-0001</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {[['Commitment',role.commitment],['Term',role.term],['Compensation',role.honorarium.split('.')[0]],['Deadline',role.deadline.split('—')[0].trim()]].map(([l,v])=>(
                <div key={l} className="bg-[#f2f0eb] border border-[#d5d0c8] rounded p-3">
                  <div className="font-mono text-[9px] text-[#999] uppercase tracking-wider">{l}</div>
                  <div className="text-[13px] text-[#1a1a1a] font-medium mt-0.5">{v}</div>
                </div>
              ))}
            </div>

            <h2 className="font-serif text-xl font-bold text-[#1a1a1a] mb-3 mt-8">Overview</h2>
            <p className="text-sm text-[#6b6b6b] font-light leading-relaxed mb-6">{role.description}</p>

            <h2 className="font-serif text-xl font-bold text-[#1a1a1a] mb-3">Responsibilities</h2>
            <ul className="text-sm text-[#6b6b6b] font-light leading-relaxed space-y-2 mb-6">
              {role.responsibilities.map((r,i)=><li key={i} className="flex gap-2"><span className="text-[#b91c1c] mt-0.5 shrink-0">—</span>{r}</li>)}
            </ul>

            <h2 className="font-serif text-xl font-bold text-[#1a1a1a] mb-3">Required Qualifications</h2>
            <ul className="text-sm text-[#6b6b6b] font-light leading-relaxed space-y-2 mb-6">
              {role.qualifications.map((q,i)=><li key={i} className="flex gap-2"><span className="text-[#b91c1c] mt-0.5 shrink-0">•</span>{q}</li>)}
            </ul>

            {role.desirable && <>
              <h2 className="font-serif text-xl font-bold text-[#1a1a1a] mb-3">Desirable</h2>
              <ul className="text-sm text-[#6b6b6b] font-light leading-relaxed space-y-2 mb-6">
                {role.desirable.map((d,i)=><li key={i} className="flex gap-2"><span className="text-[#999] mt-0.5 shrink-0">◦</span>{d}</li>)}
              </ul>
            </>}

            <div className="bg-[#f2f0eb] border border-[#d5d0c8] rounded p-5 mt-8">
              <h3 className="font-serif text-lg font-bold text-[#1a1a1a] mb-2">About GSSO</h3>
              <p className="text-sm text-[#6b6b6b] font-light leading-relaxed">The Geo-Strategic Studies Organisation is an independent research institution and publisher of the GSSO Journal of International Security Studies (ISSN: 2960-0001). We are building a peer-reviewed, open-access journal that meets international scholarly standards. This is a founding-stage opportunity to shape the editorial direction of a new publication.</p>
              <p className="text-sm text-[#6b6b6b] font-light leading-relaxed mt-2"><strong className="text-[#1a1a1a]">Contact:</strong> Dr. Naim Tahir Baig, Founding Director — editor@geostrategicstudies.org</p>
              <p className="text-sm text-[#6b6b6b] font-light leading-relaxed mt-1"><strong className="text-[#1a1a1a]">Timeline:</strong> Applications are reviewed on a rolling basis. Shortlisted candidates will be contacted within 2–3 weeks for an informal discussion.</p>
            </div>
          </div>

          {/* Application Form */}
          <div>
            <div className="bg-white border border-[#d5d0c8] rounded p-6 sticky top-20">
              {sent ? (
                <div className="text-center py-8">
                  <div className="text-3xl mb-3">✓</div>
                  <h3 className="font-serif text-xl font-bold text-[#1a1a1a]">Application Received</h3>
                  <p className="text-sm text-[#6b6b6b] mt-2">Thank you for your interest. Dr. Naim Tahir Baig (Founding Director) will review your application and respond within 2–3 weeks.</p>
                  <a href="/" className="inline-block mt-4 text-[#b91c1c] hover:underline text-sm">← Return to GSSO</a>
                </div>
              ) : (
                <>
                  <h3 className="font-serif text-lg font-bold text-[#1a1a1a] mb-1">Apply: {role.title}</h3>
                  <p className="text-[11px] text-[#999] mb-4">All fields marked * are required.</p>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#999] mb-1">Full Name & Title *</label>
                      <input required placeholder="e.g. Dr. Jane Smith" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full border border-[#d5d0c8] rounded px-3 py-2 text-sm focus:border-[#b91c1c] outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#999] mb-1">Institutional Email *</label>
                      <input required type="email" placeholder="jane.smith@university.edu" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full border border-[#d5d0c8] rounded px-3 py-2 text-sm focus:border-[#b91c1c] outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#999] mb-1">Institution & Position *</label>
                      <input required placeholder="e.g. Associate Professor, University of X" value={form.institution} onChange={e=>setForm({...form,institution:e.target.value})} className="w-full border border-[#d5d0c8] rounded px-3 py-2 text-sm focus:border-[#b91c1c] outline-none" />
                    </div>
                    {role.areas && (
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#999] mb-1">Subject Area of Interest</label>
                        <select value={form.area} onChange={e=>setForm({...form,area:e.target.value})} className="w-full border border-[#d5d0c8] rounded px-3 py-2 text-sm focus:border-[#b91c1c] outline-none">
                          <option value="">Select area...</option>
                          {role.areas.map(a=><option key={a} value={a}>{a}</option>)}
                        </select>
                      </div>
                    )}
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#999] mb-1">Link to CV / Google Scholar / ORCID</label>
                      <input placeholder="https://scholar.google.com/..." value={form.cv_url} onChange={e=>setForm({...form,cv_url:e.target.value})} className="w-full border border-[#d5d0c8] rounded px-3 py-2 text-sm focus:border-[#b91c1c] outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-[#999] mb-1">Brief Statement of Interest *</label>
                      <textarea required rows={5} placeholder={"Describe your relevant expertise, editorial experience, and motivation for joining the GSSO editorial team. (200–500 words)"} value={form.statement} onChange={e=>setForm({...form,statement:e.target.value})} className="w-full border border-[#d5d0c8] rounded px-3 py-2 text-sm focus:border-[#b91c1c] outline-none" />
                    </div>
                    <button type="submit" className="w-full bg-[#b91c1c] hover:bg-[#8b1515] text-white py-3 rounded text-sm font-semibold transition">Submit Application →</button>
                    <p className="text-[10px] text-[#999] text-center mt-2">Applications are reviewed by Dr. Naim Tahir Baig, Founding Director. Shortlisted candidates will be contacted within 2–3 weeks.</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#080d18] text-white/30 py-8 border-t-[3px] border-[#b91c1c]">
        <div className="max-w-[960px] mx-auto px-8 text-[11px] text-center">© 2026 Geo-Strategic Studies Organisation. All rights reserved. · ISSN: 2960-0001</div>
      </footer>
    </div>
  );
}
