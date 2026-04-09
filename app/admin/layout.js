'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { LayoutDashboard, FileText, BookOpen, PenSquare, Mail, FileInput, Settings, LogOut, Globe } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/papers', label: 'Research Papers', icon: FileText },
  { href: '/admin/books', label: 'Books', icon: BookOpen },
  { href: '/admin/blog', label: 'Blog / News', icon: PenSquare },
  { href: '/admin/submissions', label: 'Submissions Archive', icon: FileInput },
  { href: '/admin/about', label: 'Site Content', icon: Settings },
];

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [status, pathname, router]);

  if (pathname === '/admin/login') return children;
  if (status === 'loading') return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-pulse text-gray-400">Loading...</div></div>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex flex-col fixed h-full z-50">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-gold flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="20" stroke="#a67c37" strokeWidth="2"/><circle cx="22" cy="22" r="2.5" fill="#b91c1c"/></svg>
            </div>
            <div>
              <div className="font-serif font-bold text-sm">GSSO Admin</div>
              <div className="text-[10px] font-mono text-gold tracking-wider">CONTROL PANEL</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <a key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm transition ${active ? 'bg-accent text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <Icon size={18} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <a href="/" target="_blank" className="flex items-center gap-3 px-3 py-2 rounded text-sm text-gray-400 hover:bg-white/5 hover:text-white transition">
            <Globe size={18} /> <span>View Website</span>
          </a>
          <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="flex items-center gap-3 px-3 py-2 rounded text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition w-full">
            <LogOut size={18} /> <span>Sign Out</span>
          </button>
          <div className="px-3 pt-2 text-[11px] text-gray-500">
            {session.user?.name}
          </div>
        </div>
      </aside>
      {/* Main content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
