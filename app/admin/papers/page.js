'use client';
import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Eye, EyeOff } from 'lucide-react';

const emptyPaper = { title: '', authors: '', journal: '', abstract: '', tags: '', type: 'paper', year: '', doi: '', url: '', published: true };

export default function PapersAdmin() {
  const [papers, setPapers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyPaper);
  const [showModal, setShowModal] = useState(false);

  const load = () => fetch('/api/papers').then(r => r.json()).then(setPapers);
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(emptyPaper); setEditing(null); setShowModal(true); };
  const openEdit = (p) => { setForm(p); setEditing(p.id); setShowModal(true); };

  const save = async () => {
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { id: editing, ...form } : form;
    await fetch('/api/papers', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setShowModal(false);
    load();
  };

  const del = async (id) => {
    if (!confirm('Delete this paper?')) return;
    await fetch('/api/papers', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">Research Papers</h1>
          <p className="text-gray-500 mt-1">Manage journal articles, policy briefs, and theses.</p>
        </div>
        <button onClick={openNew} className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded text-sm font-semibold flex items-center gap-2 transition"><Plus size={16} /> Add Paper</button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-mono text-xs text-gray-500 uppercase tracking-wider">Title</th>
              <th className="text-left px-4 py-3 font-mono text-xs text-gray-500 uppercase tracking-wider">Authors</th>
              <th className="text-left px-4 py-3 font-mono text-xs text-gray-500 uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3 font-mono text-xs text-gray-500 uppercase tracking-wider">Year</th>
              <th className="text-left px-4 py-3 font-mono text-xs text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 w-24"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {papers.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-medium text-gray-900 max-w-xs truncate">{p.title}</td>
                <td className="px-4 py-3 text-gray-500 max-w-[200px] truncate">{p.authors}</td>
                <td className="px-4 py-3"><span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase ${p.type === 'paper' ? 'bg-red-50 text-accent' : p.type === 'brief' ? 'bg-green-50 text-green-700' : 'bg-purple-50 text-purple-700'}`}>{p.type}</span></td>
                <td className="px-4 py-3 font-mono text-gray-400">{p.year}</td>
                <td className="px-4 py-3">{p.published ? <Eye size={14} className="text-green-500" /> : <EyeOff size={14} className="text-gray-300" />}</td>
                <td className="px-4 py-3 flex gap-2 justify-end">
                  <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-blue-50 rounded transition"><Pencil size={14} className="text-blue-500" /></button>
                  <button onClick={() => del(p.id)} className="p-1.5 hover:bg-red-50 rounded transition"><Trash2 size={14} className="text-red-400" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {papers.length === 0 && <div className="p-8 text-center text-gray-400">No papers yet. Click &quot;Add Paper&quot; to create one.</div>}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="font-serif text-xl font-bold">{editing ? 'Edit Paper' : 'Add New Paper'}</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Title *</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Authors *</label>
                  <input value={form.authors} onChange={e => setForm({...form, authors: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Journal / Publisher</label>
                  <input value={form.journal || ''} onChange={e => setForm({...form, journal: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Abstract *</label>
                <textarea rows={4} value={form.abstract} onChange={e => setForm({...form, abstract: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Type</label>
                  <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none">
                    <option value="paper">Research Paper</option>
                    <option value="brief">Policy Brief</option>
                    <option value="thesis">Thesis</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Year</label>
                  <input value={form.year || ''} onChange={e => setForm({...form, year: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">DOI</label>
                  <input value={form.doi || ''} onChange={e => setForm({...form, doi: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Tags (comma separated)</label>
                <input value={form.tags || ''} onChange={e => setForm({...form, tags: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" placeholder="Nuclear Deterrence, Alliance Formation" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">URL (ResearchGate, etc.)</label>
                <input value={form.url || ''} onChange={e => setForm({...form, url: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} className="accent-accent" />
                <label className="text-sm text-gray-600">Published (visible on website)</label>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded text-sm text-gray-500 hover:bg-gray-50 transition">Cancel</button>
              <button onClick={save} className="px-4 py-2 bg-accent text-white rounded text-sm font-semibold hover:bg-accent-dark transition flex items-center gap-2"><Save size={14} /> {editing ? 'Update' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
