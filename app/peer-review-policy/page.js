export const metadata = { title: 'Peer Review Policy — GSSO', description: 'GSSO Journal peer review standards, ethics, and procedures.' };

export default function PeerReviewPolicy() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Libre Franklin', sans-serif", background: '#faf9f6', color: '#3a3a3a' }}>
      <nav className="sticky top-0 z-50 bg-white border-b border-[#d5d0c8]">
        <div className="max-w-[860px] mx-auto px-8 py-3 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3">
            <svg width="36" height="36" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="20" stroke="#0c1220" strokeWidth="1.5"/><ellipse cx="22" cy="22" rx="12" ry="20" stroke="#0c1220" strokeWidth="1" transform="rotate(25 22 22)"/><circle cx="22" cy="22" r="2.5" fill="#b91c1c"/></svg>
            <div><strong className="font-serif text-base text-[#1a1a1a]">Geo Strategic Studies</strong><br/><span className="font-mono text-[8px] tracking-[.22em] text-[#b91c1c] uppercase">Organisation</span></div>
          </a>
          <a href="/" className="text-[13px] text-[#3a3a3a] hover:text-[#b91c1c] transition">← Back to GSSO</a>
        </div>
      </nav>

      <div className="max-w-[860px] mx-auto px-8 py-16">
        <div className="font-mono text-[11px] tracking-[.2em] text-[#b91c1c] uppercase">Policy Document</div>
        <h1 className="font-serif text-4xl font-bold text-[#1a1a1a] mt-2 mb-2">Peer Review Policy</h1>
        <p className="text-[#6b6b6b] text-sm mb-12">Geo Strategic Studies Organisation (GSSO) · ISSN: 2960-0001 · Last updated: April 2026</p>

        <div className="prose max-w-none text-[15px] text-[#3a3a3a] leading-relaxed space-y-8">

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">1. Commitment to Scholarly Standards</h2>
            <p className="mt-4">The GSSO Journal of International Security Studies is committed to upholding the highest standards of academic publishing. We adhere to the principles established by the Committee on Publication Ethics (COPE) and aspire to meet the criteria set by the Directory of Open Access Journals (DOAJ).</p>
            <p>All original research papers and policy briefs submitted to the GSSO Journal undergo mandatory peer review before publication. Strategic commentaries and book reviews receive editorial review.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">2. Review Process</h2>
            <h3 className="font-serif text-lg font-semibold text-[#1a1a1a] mt-6">2.1 Initial Screening</h3>
            <p>Upon receipt, manuscripts are screened by the editorial office for scope relevance, completeness, and adherence to submission guidelines. Manuscripts that do not meet basic requirements are returned to authors within 7–10 working days with feedback.</p>
            <h3 className="font-serif text-lg font-semibold text-[#1a1a1a] mt-6">2.2 Double-Blind Peer Review</h3>
            <p>Manuscripts passing initial screening are assigned to two independent reviewers with expertise in the relevant subject area. The review process is double-blind: neither authors nor reviewers are aware of each other&apos;s identities. Reviewers are selected from our pool of qualified academics and subject-matter experts at recognised institutions.</p>
            <h3 className="font-serif text-lg font-semibold text-[#1a1a1a] mt-6">2.3 Review Criteria</h3>
            <p>Reviewers evaluate manuscripts against the following criteria:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Originality and contribution to the field</li>
              <li>Methodological rigour and appropriateness</li>
              <li>Clarity and quality of argumentation</li>
              <li>Adequacy of the literature review</li>
              <li>Soundness of conclusions relative to evidence presented</li>
              <li>Relevance to international security, strategic studies, or cognate disciplines</li>
              <li>Quality of writing and adherence to citation standards</li>
            </ul>
            <h3 className="font-serif text-lg font-semibold text-[#1a1a1a] mt-6">2.4 Decisions</h3>
            <p>Based on reviewer reports, the handling editor makes one of four decisions:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Accept</strong> — manuscript is accepted for publication as submitted</li>
              <li><strong>Minor Revisions</strong> — accepted subject to minor changes (no re-review required)</li>
              <li><strong>Major Revisions</strong> — substantial revisions required; revised manuscript will be re-reviewed</li>
              <li><strong>Reject</strong> — manuscript is not suitable for publication</li>
            </ul>
            <h3 className="font-serif text-lg font-semibold text-[#1a1a1a] mt-6">2.5 Timeline</h3>
            <p>We aim to complete the peer review process within 6–8 weeks of submission. Authors are notified of the editorial decision along with structured reviewer feedback.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">3. Publication Ethics</h2>
            <h3 className="font-serif text-lg font-semibold text-[#1a1a1a] mt-6">3.1 Originality</h3>
            <p>All submissions must be original work not previously published and not under consideration by another journal. Authors must disclose any related prior publications.</p>
            <h3 className="font-serif text-lg font-semibold text-[#1a1a1a] mt-6">3.2 Plagiarism</h3>
            <p>All manuscripts are checked for plagiarism. Any submission found to contain plagiarised material will be rejected and the author&apos;s institution may be notified.</p>
            <h3 className="font-serif text-lg font-semibold text-[#1a1a1a] mt-6">3.3 Conflicts of Interest</h3>
            <p>Authors must declare any financial or personal relationships that could be perceived as influencing their work. Reviewers must recuse themselves from evaluating manuscripts where a conflict of interest exists.</p>
            <h3 className="font-serif text-lg font-semibold text-[#1a1a1a] mt-6">3.4 Corrections and Retractions</h3>
            <p>If errors are identified after publication, the journal will issue a correction notice. In cases of serious ethical violations or irreproducible findings, the journal reserves the right to retract published articles in accordance with COPE retraction guidelines.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">4. Reviewer Guidelines</h2>
            <p className="mt-4">Reviewers are expected to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Provide objective, constructive, and evidence-based feedback</li>
              <li>Complete reviews within the agreed timeframe (typically 3–4 weeks)</li>
              <li>Maintain confidentiality of the manuscript and review process</li>
              <li>Declare any potential conflicts of interest</li>
              <li>Not use unpublished material from reviewed manuscripts for personal benefit</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">5. Open Access Policy</h2>
            <p className="mt-4">The GSSO Journal publishes all accepted work under an open-access model. There are no article processing charges (APCs) for authors. Published articles are freely available at geostrategicstudies.org.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">6. Working Papers</h2>
            <p className="mt-4">GSSO also publishes a Working Paper Series for early-stage research, preliminary findings, and emerging analyses that have not yet undergone formal peer review. Working papers are clearly labelled as such and carry a disclaimer noting their pre-review status. Authors of working papers are encouraged to submit revised versions for formal peer review.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">7. Appeals</h2>
            <p className="mt-4">Authors who wish to appeal an editorial decision may do so by writing to the Editor-in-Chief with a detailed response to reviewer comments and a justification for reconsideration. Appeals are reviewed by the Editor-in-Chief and, if warranted, the manuscript may be sent for additional review.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">8. Contact</h2>
            <p className="mt-4">For questions regarding the peer review process, editorial standards, or publication ethics:</p>
            <p className="mt-2"><strong>Editorial Office:</strong> ceo@geostrategicstudies.org<br/><strong>Website:</strong> geostrategicstudies.org</p>
          </section>

        </div>
      </div>

      <footer className="bg-[#080d18] text-white/30 py-8 border-t-[3px] border-[#b91c1c]">
        <div className="max-w-[860px] mx-auto px-8 text-[11px] text-center">© 2026 Geo Strategic Studies Organisation. All rights reserved. · ISSN: 2960-0001</div>
      </footer>
    </div>
  );
}
