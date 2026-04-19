export const metadata = { title: 'Publication Ethics & Policies — GSSO', description: 'GSSO publication ethics, conflict of interest, AI disclosure, open access, and archiving policies.' };

export default function EthicsPage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Libre Franklin', sans-serif", background: '#faf9f6', color: '#3a3a3a' }}>
      <nav className="sticky top-0 z-50 bg-white border-b border-[#d5d0c8]"><div className="max-w-[860px] mx-auto px-8 py-3 flex justify-between items-center"><a href="/" className="flex items-center gap-3"><svg width="36" height="36" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="20" stroke="#0c1220" strokeWidth="1.5"/><ellipse cx="22" cy="22" rx="12" ry="20" stroke="#0c1220" strokeWidth="1" transform="rotate(25 22 22)"/><circle cx="22" cy="22" r="2.5" fill="#b91c1c"/></svg><div><strong className="font-serif text-base text-[#1a1a1a]">Geo-Strategic Studies</strong></div></a><a href="/" className="text-[13px] text-[#3a3a3a] hover:text-[#b91c1c]">&larr; Back to GSSO</a></div></nav>

      <div className="max-w-[860px] mx-auto px-8 py-16">
        <div className="font-mono text-[11px] tracking-[.2em] text-[#b91c1c] uppercase">Policy Documents</div>
        <h1 className="font-serif text-4xl font-bold text-[#1a1a1a] mt-2 mb-2">Publication Ethics & Policies</h1>
        <p className="text-[#6b6b6b] text-sm mb-4">Geo-Strategic Studies Organisation · ISSN: 2960-0001 · Last updated: April 2026</p>
        <p className="text-sm text-[#6b6b6b] font-light mb-12">GSSO is committed to upholding the highest standards of publication ethics. These policies are aligned with the <a href="https://publicationethics.org" target="_blank" rel="noreferrer" className="text-[#b91c1c] hover:underline">Committee on Publication Ethics (COPE)</a> Core Practices and the <a href="https://doaj.org" target="_blank" rel="noreferrer" className="text-[#b91c1c] hover:underline">Directory of Open Access Journals (DOAJ)</a> criteria.</p>

        <div className="prose max-w-none text-[15px] text-[#3a3a3a] leading-relaxed space-y-10">

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">1. Authorship & Contributorship</h2>
            <p className="mt-4">All listed authors must have made a substantive intellectual contribution to the work — including conception/design, data collection/analysis, or drafting/revision. Authorship should not be granted on the basis of funding, seniority, or courtesy alone.</p>
            <p>The corresponding author is responsible for ensuring that all co-authors have approved the final version and agreed to submission. Any changes to authorship after submission require written consent from all authors and approval from the handling editor.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">2. Plagiarism & Originality</h2>
            <p className="mt-4">All submissions must be original work. Manuscripts are screened for plagiarism prior to review. Plagiarism in any form — including self-plagiarism, paraphrasing without attribution, and data fabrication — is grounds for immediate rejection.</p>
            <p>If plagiarism is detected after publication, the article will be retracted in accordance with COPE retraction guidelines and the author&apos;s institution may be notified.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">3. Conflict of Interest Policy</h2>
            <p className="mt-4">Authors must disclose any financial, institutional, or personal relationships that could be perceived as influencing the objectivity of their research. Disclosures should be included at the end of the manuscript.</p>
            <p>Reviewers must recuse themselves from evaluating manuscripts where a conflict of interest exists — including personal relationships with the author, institutional affiliations, financial interests, or prior collaboration.</p>
            <p>Editors will not handle manuscripts authored by close collaborators, family members, or colleagues at their own institution.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">4. AI Use Disclosure Policy</h2>
            <p className="mt-4">Authors must disclose the use of artificial intelligence tools (including large language models such as ChatGPT, Claude, Gemini, or similar) in any stage of the research or writing process. Disclosure should specify:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Which AI tool(s) were used</li>
              <li>The purpose (e.g. literature search, drafting, editing, data analysis, translation)</li>
              <li>The extent of AI-generated content</li>
            </ul>
            <p className="mt-3">AI tools cannot be listed as authors. The corresponding author takes full responsibility for the accuracy and integrity of all content, including any AI-assisted portions. Undisclosed use of AI constitutes a breach of publication ethics.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">5. Data Integrity</h2>
            <p className="mt-4">Authors are expected to present data accurately and honestly. Fabrication (invention of data), falsification (manipulation of data), and selective reporting (omission of inconvenient findings) are prohibited.</p>
            <p>Where applicable, authors should make underlying data available or explain restrictions on access. GSSO encourages the use of data repositories and supplementary materials.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">6. Open Access & Licensing</h2>
            <p className="mt-4">All work published by GSSO is open access. Published articles are made freely available on geostrategicstudies.org immediately upon publication.</p>
            <p><strong>License:</strong> Unless otherwise stated, all published work is licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer" className="text-[#b91c1c] hover:underline">Creative Commons Attribution 4.0 International (CC BY 4.0)</a>. This permits unrestricted use, distribution, and reproduction in any medium, provided the original work is properly cited.</p>
            <p><strong>Article Processing Charges:</strong> GSSO does not charge article processing charges (APCs) or submission fees. The journal is funded independently. This policy will be reviewed annually and any changes will be communicated with at least 6 months&apos; notice.</p>
            <p><strong>Waiver Policy:</strong> As GSSO currently charges no fees, no waiver policy is required. Should APCs be introduced in future, a fee waiver programme will be established for authors from low- and middle-income countries, unfunded researchers, and students.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">7. Archiving & Preservation</h2>
            <p className="mt-4">GSSO is committed to the long-term preservation and accessibility of published scholarship:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>All published PDFs are stored on GSSO&apos;s servers with redundant backups</li>
              <li>GSSO intends to apply for inclusion in the <a href="https://pkp.sfu.ca/pkp-pn/" target="_blank" rel="noreferrer" className="text-[#b91c1c] hover:underline">PKP Preservation Network</a> upon migration to Open Journal Systems (OJS)</li>
              <li>DOIs are assigned to all published works via the 10.59461/JGSSO prefix</li>
              <li>Authors are encouraged to deposit accepted manuscripts in institutional repositories</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">8. Corrections & Retractions</h2>
            <p className="mt-4"><strong>Corrections (Errata):</strong> If errors are identified after publication that do not affect the integrity of the findings, a correction notice will be published and linked to the original article.</p>
            <p><strong>Retractions:</strong> Articles will be retracted if:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Clear evidence of unreliability due to misconduct (fabrication, falsification) or honest error</li>
              <li>Plagiarism is identified</li>
              <li>The work reports unethical research</li>
              <li>Copyright has been infringed</li>
              <li>Peer review was compromised</li>
            </ul>
            <p className="mt-3">Retractions follow <a href="https://publicationethics.org/retraction-guidelines" target="_blank" rel="noreferrer" className="text-[#b91c1c] hover:underline">COPE Retraction Guidelines</a>. Retracted articles remain accessible with a prominent retraction notice. The retraction notice will state the reason and whether it was initiated by the author(s) or the editor.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">9. Publication Frequency & Timelines</h2>
            <p className="mt-4"><strong>Planned frequency:</strong> 4 issues per year (quarterly), commencing with Issue 1 in late 2026, subject to appointment of editorial board.</p>
            <p><strong>Submission to first decision:</strong> 6–8 weeks (target)</p>
            <p><strong>Submission to publication:</strong> 3–4 months (target, inclusive of revisions)</p>
            <p><strong>Acceptance rate:</strong> Not yet established. GSSO will publish acceptance statistics annually once sufficient data is available (expected from Year 2).</p>
            <p><strong>Reviewer statistics:</strong> Will be published annually, including number of reviewers used, average review turnaround, and geographic distribution of the reviewer pool.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">10. Contact</h2>
            <p className="mt-4">For questions regarding publication ethics or any of these policies:</p>
            <p className="mt-2"><strong>Editorial Office:</strong> ceo@geostrategicstudies.org<br/><strong>Founding Director:</strong> Dr. Naim Tahir Baig<br/><strong>Website:</strong> geostrategicstudies.org</p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-[#d5d0c8]">
          <h3 className="font-mono text-[11px] tracking-[.2em] text-[#999] uppercase mb-3">Related Policies</h3>
          <div className="flex flex-wrap gap-3">
            <a href="/peer-review-policy" className="text-sm px-4 py-2 border border-[#d5d0c8] rounded hover:border-[#b91c1c] hover:text-[#b91c1c] transition">Peer Review Policy</a>
            <a href="/privacy" className="text-sm px-4 py-2 border border-[#d5d0c8] rounded hover:border-[#b91c1c] hover:text-[#b91c1c] transition">Privacy Policy</a>
            <a href="/terms" className="text-sm px-4 py-2 border border-[#d5d0c8] rounded hover:border-[#b91c1c] hover:text-[#b91c1c] transition">Terms of Use</a>
          </div>
        </div>
      </div>

      <footer className="bg-[#080d18] text-white/30 py-8 border-t-[3px] border-[#b91c1c]"><div className="max-w-[860px] mx-auto px-8 text-[11px] text-center">&copy; 2026 Geo-Strategic Studies Organisation. ISSN: 2960-0001</div></footer>
    </div>
  );
}
