export const metadata = { title: 'Terms of Use — GSSO', description: 'Terms of use for geostrategicstudies.org.' };

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Libre Franklin', sans-serif", background: '#faf9f6', color: '#3a3a3a' }}>
      <nav className="sticky top-0 z-50 bg-white border-b border-[#d5d0c8]"><div className="max-w-[860px] mx-auto px-8 py-3 flex justify-between items-center"><a href="/" className="flex items-center gap-3"><svg width="36" height="36" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="20" stroke="#0c1220" strokeWidth="1.5"/><ellipse cx="22" cy="22" rx="12" ry="20" stroke="#0c1220" strokeWidth="1" transform="rotate(25 22 22)"/><circle cx="22" cy="22" r="2.5" fill="#b91c1c"/></svg><div><strong className="font-serif text-base text-[#1a1a1a]">Geo-Strategic Studies</strong></div></a><a href="/" className="text-[13px] text-[#3a3a3a] hover:text-[#b91c1c]">&larr; Back</a></div></nav>
      <div className="max-w-[860px] mx-auto px-8 py-16">
        <h1 className="font-serif text-4xl font-bold text-[#1a1a1a] mb-2">Terms of Use</h1>
        <p className="text-[#6b6b6b] text-sm mb-12">Last updated: April 2026</p>
        <div className="prose max-w-none text-[15px] text-[#3a3a3a] leading-relaxed space-y-8">
          <section><h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">1. Acceptance</h2><p className="mt-4">By accessing geostrategicstudies.org, you agree to these terms. If you do not agree, please do not use this website.</p></section>
          <section><h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">2. Intellectual Property</h2><p className="mt-4">Unless otherwise stated, published works are licensed under Creative Commons Attribution 4.0 International (CC BY 4.0). You are free to share and adapt published work provided you give appropriate credit, link to the license, and indicate if changes were made.</p><p>The GSSO name, logo, and website design are the property of the Geo-Strategic Studies Organisation and may not be used without permission.</p></section>
          <section><h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">3. Working Papers Disclaimer</h2><p className="mt-4">Papers published in the GSSO Working Paper Series are pre-prints that have not undergone formal peer review. They are published to stimulate discussion and invite feedback. The views expressed are those of the authors and do not necessarily represent the views of GSSO. Authors retain all rights to working papers and may submit revised versions for formal peer review.</p></section>
          <section><h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">4. User Submissions</h2><p className="mt-4">By submitting a manuscript, application, or contact form through this website, you represent that the information you provide is accurate and that you have the authority to submit it. Manuscript authors retain copyright to their work.</p></section>
          <section><h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">5. Limitation of Liability</h2><p className="mt-4">GSSO provides this website and its content &ldquo;as is&rdquo; without warranties of any kind. GSSO is not liable for any direct, indirect, or consequential damages arising from use of the website or reliance on published content.</p></section>
          <section><h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">6. External Links</h2><p className="mt-4">This website contains links to external resources. GSSO is not responsible for the content, accuracy, or availability of external websites.</p></section>
          <section><h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">7. Changes</h2><p className="mt-4">We reserve the right to modify these terms at any time. Continued use of the website constitutes acceptance of updated terms.</p></section>
          <section><h2 className="font-serif text-2xl font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-2">8. Contact</h2><p className="mt-4">Questions about these terms: info@geostrategicstudies.org</p></section>
        </div>
      </div>
      <footer className="bg-[#080d18] text-white/30 py-8 border-t-[3px] border-[#b91c1c]"><div className="max-w-[860px] mx-auto px-8 text-[11px] text-center">&copy; 2026 Geo-Strategic Studies Organisation.</div></footer>
    </div>
  );
}
