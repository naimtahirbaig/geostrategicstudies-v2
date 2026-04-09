'use client';
import { useEffect, useState } from 'react';
import { Mail, FileInput, Trash2, Eye, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

export default function SubmissionsAdmin() {
  const [tab, setTab] = useState('contact');
  const [contacts, setContacts] = useState([]);
  const [paperSubs, setPaperSubs] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = () => {
    fetch('/api/submissions?type=contact').then(r => r.json()).then(setContacts);
    fetch('/api/submissions?type=paper').then(r => r.json()).then(setPaperSubs);
  };
  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await fetch('/api/submissions', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, type: 'contact', read: true }) });
    load();
  };

  const updatePaperStatus = async (id, status, reviewNotes) => {
    await fetch('/api/submissions', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, type: 'paper', status, reviewNotes }) });
    load();
  };

  const del = async (id, type) => {
    if (!confirm('Delete this submission?')) return;
    await fetch('/api/submissions', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, type }) });
    setSelected(null);
    load();
  };

  const statusColors = { pending: 'text-amber-600 bg-amber-50', under_review: 'text-blue-600 bg-blue-50', accepted: 'text-emerald-600 bg-emerald-50', rejected: 'text-red-600 bg-red-50' };
  const statusIcons = { pending: Clock, under_review: AlertCircle, accepted: CheckCircle, rejected: XCircle };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-gray-900">Submissions Archive</h1>
        <p className="text-gray-500 mt-1">Review contact messages and submitted research papers.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => { setTab('contact'); setSelected(null); }} className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition ${tab === 'contact' ? 'bg-navy text-white' : 'bg-white border text-gray-500 hover:bg-gray-50'}`}>
          <Mail size={16} /> Contact Messages <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded-full ml-1">{contacts.filter(c => !c.read).length}</span>
        </button>
        <button onClick={() => { setTab('paper'); setSelected(null); }} className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition ${tab === 'paper' ? 'bg-navy text-white' : 'bg-white border text-gray-500 hover:bg-gray-50'}`}>
          <FileInput size={16} /> Paper Submissions <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded-full ml-1">{paperSubs.filter(s => s.status === 'pending').length}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-1 space-y-2 max-h-[70vh] overflow-y-auto">
          {tab === 'contact' && contacts.map(c => (
            <div key={c.id} onClick={() => { setSelected({...c, _type: 'contact'}); markRead(c.id); }} className={`bg-white border rounded-lg p-4 cursor-pointer hover:shadow-sm transition ${selected?.id === c.id ? 'border-accent ring-1 ring-accent/20' : ''} ${!c.read ? 'border-l-4 border-l-accent' : ''}`}>
              <div className="flex justify-between items-start">
                <div className="font-medium text-gray-900 text-sm">{c.name}</div>
                <span className="text-[10px] font-mono text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="text-xs text-gray-400">{c.email}</div>
              <div className="text-xs text-gray-500 mt-1 truncate">{c.subject}</div>
            </div>
          ))}
          {tab === 'paper' && paperSubs.map(s => {
            const StatusIcon = statusIcons[s.status] || Clock;
            return (
              <div key={s.id} onClick={() => setSelected({...s, _type: 'paper'})} className={`bg-white border rounded-lg p-4 cursor-pointer hover:shadow-sm transition ${selected?.id === s.id ? 'border-accent ring-1 ring-accent/20' : ''}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase ${statusColors[s.status]}`}>{s.status.replace('_',' ')}</span>
                  <span className="text-[10px] font-mono text-gray-400">{new Date(s.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="font-medium text-gray-900 text-sm truncate">{s.title}</div>
                <div className="text-xs text-gray-400">{s.authorName}</div>
              </div>
            );
          })}
          {((tab === 'contact' && contacts.length === 0) || (tab === 'paper' && paperSubs.length === 0)) && (
            <div className="bg-white border rounded-lg p-6 text-center text-gray-400 text-sm">No submissions yet.</div>
          )}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-2">
          {!selected && <div className="bg-white border rounded-lg p-12 text-center text-gray-400">Select a submission to view details.</div>}
          {selected && selected._type === 'contact' && (
            <div className="bg-white border rounded-lg">
              <div className="p-6 border-b flex justify-between items-start">
                <div>
                  <h2 className="font-serif text-xl font-bold text-gray-900">{selected.subject}</h2>
                  <div className="text-sm text-gray-500 mt-1">From: <strong>{selected.name}</strong> ({selected.email})</div>
                  {selected.organisation && <div className="text-sm text-gray-400">Organisation: {selected.organisation}</div>}
                  <div className="text-xs font-mono text-gray-400 mt-1">{new Date(selected.createdAt).toLocaleString()}</div>
                </div>
                <button onClick={() => del(selected.id, 'contact')} className="p-2 hover:bg-red-50 rounded"><Trash2 size={16} className="text-red-400" /></button>
              </div>
              <div className="p-6">
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">{selected.message}</div>
              </div>
              <div className="p-4 border-t bg-gray-50 flex gap-2">
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="bg-accent text-white px-4 py-2 rounded text-sm font-semibold hover:bg-accent-dark transition">Reply via Email →</a>
              </div>
            </div>
          )}
          {selected && selected._type === 'paper' && (
            <div className="bg-white border rounded-lg">
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase ${statusColors[selected.status]}`}>{selected.status.replace('_',' ')}</span>
                    <h2 className="font-serif text-xl font-bold text-gray-900 mt-2">{selected.title}</h2>
                    <div className="text-sm text-gray-500 mt-1">By: <strong>{selected.authorName}</strong> ({selected.authorEmail})</div>
                    {selected.institution && <div className="text-sm text-gray-400">Institution: {selected.institution}</div>}
                    {selected.keywords && <div className="text-xs text-gray-400 mt-1">Keywords: {selected.keywords}</div>}
                  </div>
                  <button onClick={() => del(selected.id, 'paper')} className="p-2 hover:bg-red-50 rounded"><Trash2 size={16} className="text-red-400" /></button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-2">Abstract</h3>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">{selected.abstract}</div>
              </div>
              <div className="p-6 border-t bg-gray-50">
                <h3 className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-3">Update Status</h3>
                <div className="flex flex-wrap gap-2">
                  {['pending', 'under_review', 'accepted', 'rejected'].map(s => (
                    <button key={s} onClick={() => updatePaperStatus(selected.id, s, selected.reviewNotes)} className={`px-3 py-1.5 rounded text-xs font-mono uppercase transition ${selected.status === s ? statusColors[s] + ' ring-2 ring-current' : 'bg-white border text-gray-400 hover:bg-gray-100'}`}>
                      {s.replace('_', ' ')}
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <textarea placeholder="Review notes (internal only)..." value={selected.reviewNotes || ''} onChange={e => setSelected({...selected, reviewNotes: e.target.value})} onBlur={() => updatePaperStatus(selected.id, selected.status, selected.reviewNotes)} className="w-full border rounded px-3 py-2 text-sm focus:border-accent focus:outline-none" rows={3} />
                </div>
                <a href={`mailto:${selected.authorEmail}?subject=Re: ${selected.title}`} className="inline-block mt-3 bg-accent text-white px-4 py-2 rounded text-sm font-semibold hover:bg-accent-dark transition">Reply to Author →</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
