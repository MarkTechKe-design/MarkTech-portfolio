'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function getDeviceType(ua) {
  if (!ua) return 'Unknown';
  const u = ua.toLowerCase();

  if (u.includes('ipad')) return 'Tab';
  if (u.includes('iphone')) return 'iPhone';
  if (u.includes('macintosh') || u.includes('mac os')) return 'Mac';

  if (u.includes('android')) {
    if (u.includes('mobile')) return 'Android';
    return 'Tab';
  }

  if (u.includes('windows') || u.includes('linux') || u.includes('cros')) return 'Laptop / PC';

  return 'Unknown';
}

export default function AnalyticsAdmin() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeUsers, setActiveUsers] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/analytics/stats')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        setStats(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      {loading ? (
        <p className="text-white/40">Loading analytics...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-xs uppercase text-white/40 tracking-widest mb-1">Total Visits</p>
            <p className="text-3xl font-black text-[#ff6b1a]">{stats?.totalVisits || 0}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-xs uppercase text-white/40 tracking-widest mb-1">Unique Visitors</p>
            <p className="text-3xl font-black text-white">{stats?.uniqueVisitors || 0}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-xs uppercase text-white/40 tracking-widest mb-1">Active Now</p>
            <p className="text-3xl font-black text-green-400">{activeUsers}</p>
          </div>
        </div>
      )}
    </div>
  );
}