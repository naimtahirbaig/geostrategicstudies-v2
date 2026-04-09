'use client';
import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Star, StarOff } from 'lucide-react';

const emptyBook = { title: '', category: '', description: '', amazonUrl: '', coverImage: '', price: '', published: true, featured: false };

export default function BooksAdmin() {
  const [books, setBooks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyBook);
  const [showModal, setShowModal] = useState(false);

  const load = () => fetch('/api/books').then(r => r.json()).then(setBooks);
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(emptyBook); setEditing(null); setShowModal(true); };
  const openEdit = (b) => { setForm(b); setEditing(b.id); setShowModal(true); };

  const save = async () => {
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { id: editing, ...form } : form;
    await fetch('/api/books', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    setShowModal(false);
    load();
  };

  const del = async (id) => {
    if (!confirm('Delete this book?')) return;
    await fetch('/api/books', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">Books</h1>
          <p className="text-gray-500 mt-1">Manage your published books catalog.</p>
        </div>
        <button onClick={openNew} className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded text-sm font-semibold flex items-center gap-2 transition"><Plus size={16} /> Add Book</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {books.map(b => (
          <div key={b.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition group">
            <div className="h-48 bg-gray-100 flex items-center justify-center relative" style={b.coverImage ? { backgroundImage: `url(${b.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
              {!b.coverImage && <span className="text-gray-300 text-xs font-mono">No Cover</span>}
              {b.featured && <span className="absolute top-2 right-2 bg-gold text-white text-[9px] px-2 py-0.5 rounded font-mono">FEATURED</span>}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button onClick={() => openEdit(b)} className="bg-white p-2 rounded-full shadow"><Pencil size={14} className="text-blue-500" /></button>
                <button onClick={() => del(b.id)} className="bg-white p-2 rounded-full shadow"><Trash2 size={14} className="text-red-400" /></button>
              </div>
            </div>
            <div className="p-3">
              <div className="text-[10px] font-mono text-accent uppercase tracking-wider">{b.category}</div>
              <div className="font-serif font-semibold text-gray-900 text-sm mt-0.5 truncate">{b.title}</div>
              <div className="text-xs text-gray-400 mt-0.5 truncate">{b.description}</div>
            </div>
          </div>
        ))}
      </div>
      {books.length === 0 && <div className="bg-white border rounded-lg p-8 text-center text-gray-400">No books yet.</div>}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="font-serif text-xl font-bold">{editing ? 'Edit Book' : 'Add New Book'}</h2>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Title *</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Category</label>
                  <input value={form.category || ''} onChange={e => setForm({...form, category: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" placeholder="e.g. Nuclear & Defence" />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Price</label>
                  <input value={form.price || ''} onChange={e => setForm({...form, price: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" placeholder="$9.99" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Description</label>
                <textarea rows={2} value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Amazon URL</label>
                <input value={form.amazonUrl || ''} onChange={e => setForm({...form, amazonUrl: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">Cover Image Path</label>
                <input value={form.coverImage || ''} onChange={e => setForm({...form, coverImage: e.target.value})} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" placeholder="/covers/my-book.jpg" />
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} className="accent-accent" /> Published
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="accent-gold" /> Featured on Homepage
                </label>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded text-sm text-gray-500 hover:bg-gray-50">Cancel</button>
              <button onClick={save} className="px-4 py-2 bg-accent text-white rounded text-sm font-semibold hover:bg-accent-dark flex items-center gap-2"><Save size={14} /> {editing ? 'Update' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
