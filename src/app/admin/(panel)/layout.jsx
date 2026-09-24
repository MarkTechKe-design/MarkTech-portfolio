'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  HiOutlineViewGrid, 
  HiOutlineFolder, 
  HiOutlineMail, 
  HiOutlineStar, 
  HiOutlineChartBar, 
  HiOutlineLink, 
  HiOutlineCog,
  HiOutlineExternalLink, 
  HiOutlineLogout 
} from 'react-icons/hi';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: HiOutlineViewGrid },
  { label: 'Projects & Systems', href: '/admin/projects', icon: HiOutlineFolder },
  { label: 'Inquiries', href: '/admin/inquiries', icon: HiOutlineMail },
  { label: 'Reviews', href: '/admin/reviews', icon: HiOutlineStar },
  { label: 'Analytics', href: '/admin/analytics', icon: HiOutlineChartBar },
  { label: 'Social & Links', href: '/admin/links', icon: HiOutlineLink },
  { label: 'Settings & Media', href: '/admin/settings', icon: HiOutlineCog },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {}
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex admin-root">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0a0a0a] flex flex-col justify-between p-6 fixed inset-y-0 left-0 z-30">
        <div className="space-y-8">
          <div>
            <Link href="/" className="flex items-center gap-2 group">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b1a] group-hover:scale-125 transition-transform" />
              <span className="font-black text-lg tracking-[0.2em] text-white uppercase font-mono">
                MARK<span className="text-white/40 font-light ml-1">TECH</span>
              </span>
            </Link>
            <p className="text-[10px] text-white/30 uppercase font-mono tracking-widest mt-1">
              Operations Console · Oduor Mark
            </p>
          </div>

          <nav className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-mono font-medium transition-colors ${
                    isActive
                      ? 'bg-[#ff6b1a]/10 text-[#ff6b1a] border border-[#ff6b1a]/20'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/5 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-mono text-white/50 hover:text-white hover:bg-white/5 transition-colors"
          >
            <HiOutlineExternalLink className="w-4 h-4" />
            <span>View Live Site</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-mono text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <HiOutlineLogout className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8 md:p-12 h-screen overflow-y-auto scroll-smooth">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}