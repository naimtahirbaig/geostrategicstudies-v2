'use client';
import { useEffect, useState } from 'react';
import { Save, Check } from 'lucide-react';

export default function AboutAdmin() {
  const [content, setContent] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetch('/api/about').then(r => r.json()).then(setContent); }, []);

  const save = async () => {
    await fetch('/api/about', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (key, value) => setContent({ ...content, [key]: value });

  const fields = [
    { key: 'ceo_name', label: 'CEO Name', type: 'input' },
    { key: 'ceo_role', label: 'CEO Role / Title', type: 'input' },
    { key: 'ceo_bio', label: 'CEO Biography', type: 'textarea', rows: 6 },
    { key: 'ceo_quote', label: 'CEO Quote', type: 'input' },
    { key: 'about_mission', label: 'Mission Statement', type: 'textarea', rows: 4 },
    { key: 'about_research', label: 'Research Description', type: 'textarea', rows: 4 },
    { key: 'about_journal', label: 'Journal Description', type: 'textarea', rows: 4 },
    { key: 'stats_books', label: 'Total Books Count', type: 'input' },
    { key: 'stats_papers', label: 'Total Research Papers Count', type: 'input' },
    { key: 'stats_platforms', label: 'Platforms Count', type: 'input' },
    { key: 'stats_languages', label: 'Languages Count', type: 'input' },
    { key: 'contact_email_1', label: 'CEO Email', type: 'input' },
    { key: 'contact_email_2', label: 'Direct Email', type: 'input' },
    { key: 'contact_phone', label: 'WhatsApp / Phone', type: 'input' },
    { key: 'website_url', label: 'Personal Website URL', type: 'input' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">Site Content</h1>
          <p className="text-gray-500 mt-1">Edit the CEO biography, about sections, stats, and contact details.</p>
        </div>
        <button onClick={save} className={`px-5 py-2 rounded text-sm font-semibold flex items-center gap-2 transition ${saved ? 'bg-emerald-500 text-white' : 'bg-accent hover:bg-accent-dark text-white'}`}>
          {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Save All Changes</>}
        </button>
      </div>

      <div className="space-y-6">
        {/* Group fields into sections */}
        <div className="bg-white border rounded-lg">
          <div className="p-5 border-b"><h2 className="font-serif text-lg font-bold text-gray-900">CEO / Leadership</h2></div>
          <div className="p-5 space-y-4">
            {fields.filter(f => f.key.startsWith('ceo')).map(f => (
              <div key={f.key}>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea rows={f.rows || 4} value={content[f.key] || ''} onChange={e => update(f.key, e.target.value)} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" />
                ) : (
                  <input value={content[f.key] || ''} onChange={e => update(f.key, e.target.value)} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-lg">
          <div className="p-5 border-b"><h2 className="font-serif text-lg font-bold text-gray-900">About / Mission</h2></div>
          <div className="p-5 space-y-4">
            {fields.filter(f => f.key.startsWith('about')).map(f => (
              <div key={f.key}>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">{f.label}</label>
                <textarea rows={f.rows || 4} value={content[f.key] || ''} onChange={e => update(f.key, e.target.value)} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-lg">
          <div className="p-5 border-b"><h2 className="font-serif text-lg font-bold text-gray-900">Stats & Numbers</h2></div>
          <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {fields.filter(f => f.key.startsWith('stats')).map(f => (
              <div key={f.key}>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">{f.label}</label>
                <input value={content[f.key] || ''} onChange={e => update(f.key, e.target.value)} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-lg">
          <div className="p-5 border-b"><h2 className="font-serif text-lg font-bold text-gray-900">Contact Information</h2></div>
          <div className="p-5 space-y-4">
            {fields.filter(f => f.key.startsWith('contact') || f.key.startsWith('website')).map(f => (
              <div key={f.key}>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">{f.label}</label>
                <input value={content[f.key] || ''} onChange={e => update(f.key, e.target.value)} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
