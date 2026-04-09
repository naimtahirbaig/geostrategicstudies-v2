'use client';
import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Eye, EyeOff } from 'lucide-react';

const emptyPost = { title: '', content: '', excerpt: '', author: 'Dr. Naim Tahir Baig', category: '', published: false };

export default function BlogAdmin() {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyPost);
  const [showModal, setShowModal] = useState(false);

  const load = () => fetch('/api/blog').then(r => r.json()).then(setPosts);
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(emptyPost); setEditing(null); setShowModal(true); };
  const openEdit = (p) => { setForm(p); setEditing(p.id); setShowModal(true); };

  const save = async () => {
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { id: editing, ...form } : form;
    await fetch('/api/blog', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setShowModal(false);
    load();
  };

  const del = async (id) => {
    if (!confirm('Delete this post?')) return;
    await fetch('/api/blog', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">Blog / News</h1>
          <p className="text-gray-500 mt-1">Publish strategic commentary, news, and analysis.</p>
        </div>
        <button onClick={openNew} className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded text-sm font-semibold flex items-center gap-2 transition"><Plus size={16} /> New Post</button>
      </div>

      <div className="space-y-3">
        {posts.map(p => (
          <div key={p.id} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-sm transition flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {p.published ? <Eye size={14} className="text-green-500" /> : <EyeOff size={14} className="text-gray-300" />}
                <span className="text-[10px] font-mono bg-gray-100 text-gray-500 px-2 py-0.5 rounded uppercase">{p.category || 'Uncategorized'}</span>
                <span className="text-[10px] font-mono text-gray-400">{new Date(p.createdAt).toLocaleDateString()}</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-gray-900 truncate">{p.title}</h3>
              <p className="text-sm text-gray-400 mt-0.5 truncate">{p.excerpt || p.content?.substring(0, 120)}</p>
            </div>
            <div className="flex gap-2 ml-4 shrink-0">
              <button onClick={() => openEdit(p)} className="p-2 hover:bg-blue-50 rounded transition"><Pencil size={14} className="text-blue-500" /></button>
              <button onClick={() => del(p.id)} className="p-2 hover:bg-red-50 rounded transition"><Trash2 size={14} className="text-red-400" /></button>
            </div>
          </div>
        ))}
        {posts.length === 0 && <div className="bg-white border rounded-lg p-8 text-center text-gray-400">No blog posts yet.</div>}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="font-serif text-xl font-bold">{editing ? 'Edit Post' : 'New Blog Post'}</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Title *</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Author</label>
                  <input value={form.author} onChange={e => setForm({...form, author: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Category</label>
                  <input value={form.category || ''} onChange={e => setForm({...form, category: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" placeholder="e.g. Strategic Commentary" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Excerpt (short summary)</label>
                <textarea rows={2} value={form.excerpt || ''} onChange={e => setForm({...form, excerpt: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Content *</label>
                <textarea rows={12} value={form.content} onChange={e => setForm({...form, content: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none font-mono" placeholder="Write your article content here... (Markdown supported)" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} className="accent-accent" />
                <label className="text-sm text-gray-600">Publish immediately</label>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded text-sm text-gray-500 hover:bg-gray-50">Cancel</button>
              <button onClick={save} className="px-4 py-2 bg-accent text-white rounded text-sm font-semibold hover:bg-accent-dark flex items-center gap-2"><Save size={14} /> {editing ? 'Update' : 'Publish'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
