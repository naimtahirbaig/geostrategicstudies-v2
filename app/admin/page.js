'use client';
import { useEffect, useState } from 'react';
import { FileText, BookOpen, PenSquare, Mail, FileInput, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ papers: 0, books: 0, blog: 0, contacts: 0, paperSubs: 0 });
  const [recentContacts, setRecentContacts] = useState([]);
  const [recentPaperSubs, setRecentPaperSubs] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/papers').then(r => r.json()),
      fetch('/api/books').then(r => r.json()),
      fetch('/api/blog').then(r => r.json()),
      fetch('/api/submissions?type=contact').then(r => r.json()),
      fetch('/api/submissions?type=paper').then(r => r.json()),
    ]).then(([papers, books, blog, contacts, paperSubs]) => {
      setStats({ papers: papers.length, books: books.length, blog: blog.length, contacts: contacts.length, paperSubs: paperSubs.length });
      setRecentContacts(contacts.slice(0, 5));
      setRecentPaperSubs(paperSubs.slice(0, 5));
    });
  }, []);

  const cards = [
    { label: 'Research Papers', count: stats.papers, icon: FileText, color: 'bg-blue-500', href: '/admin/papers' },
    { label: 'Published Books', count: stats.books, icon: BookOpen, color: 'bg-emerald-500', href: '/admin/books' },
    { label: 'Blog Posts', count: stats.blog, icon: PenSquare, color: 'bg-purple-500', href: '/admin/blog' },
    { label: 'Contact Messages', count: stats.contacts, icon: Mail, color: 'bg-amber-500', href: '/admin/submissions' },
    { label: 'Paper Submissions', count: stats.paperSubs, icon: FileInput, color: 'bg-accent', href: '/admin/submissions' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, Dr. Baig. Here&apos;s your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {cards.map(card => {
          const Icon = card.icon;
          return (
            <a key={card.label} href={card.href} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition group">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center`}>
                  <Icon size={20} className="text-white" />
                </div>
                <TrendingUp size={16} className="text-gray-300 group-hover:text-gray-400 transition" />
              </div>
              <div className="font-serif text-2xl font-bold text-gray-900">{card.count}</div>
              <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mt-1">{card.label}</div>
            </a>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contact Messages */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-serif text-lg font-bold text-gray-900">Recent Contact Messages</h2>
            <a href="/admin/submissions" className="text-accent text-sm hover:underline">View all →</a>
          </div>
          <div className="divide-y divide-gray-50">
            {recentContacts.length === 0 && <div className="p-5 text-gray-400 text-sm">No messages yet.</div>}
            {recentContacts.map(c => (
              <div key={c.id} className="p-4 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{c.name}</div>
                    <div className="text-xs text-gray-400">{c.email}</div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${c.read ? 'bg-gray-100 text-gray-400' : 'bg-accent/10 text-accent'}`}>
                    {c.read ? 'Read' : 'New'}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1 truncate">{c.subject}: {c.message}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Paper Submissions */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-serif text-lg font-bold text-gray-900">Paper Submissions Archive</h2>
            <a href="/admin/submissions" className="text-accent text-sm hover:underline">View all →</a>
          </div>
          <div className="divide-y divide-gray-50">
            {recentPaperSubs.length === 0 && <div className="p-5 text-gray-400 text-sm">No submissions yet.</div>}
            {recentPaperSubs.map(s => (
              <div key={s.id} className="p-4 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{s.title}</div>
                    <div className="text-xs text-gray-400">{s.authorName} — {s.institution}</div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                    s.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                    s.status === 'under_review' ? 'bg-blue-50 text-blue-600' :
                    s.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' :
                    'bg-red-50 text-red-600'
                  }`}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
