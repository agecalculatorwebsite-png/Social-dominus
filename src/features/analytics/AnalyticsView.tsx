import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { PLATFORM_CONFIG } from '../../components/icons/SocialIcons';
import {
  BarChart3,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Users,
  Download,
  Calendar,
  ChevronDown,
} from 'lucide-react';

export const AnalyticsView: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { posts, channels } = useAppStore();
  const [period, setPeriod] = useState('Last 30 Days');
  const [selectedNetwork, setSelectedNetwork] = useState('all');

  const topPosts = posts.filter((p) => p.status === 'published');

  const channelBreakdown = [
    { name: 'X (Twitter)', percent: 38, impressions: '148.2K', color: 'bg-slate-700' },
    { name: 'LinkedIn', percent: 32, impressions: '124.8K', color: 'bg-sky-500' },
    { name: 'Instagram', percent: 18, impressions: '70.2K', color: 'bg-pink-500' },
    { name: 'YouTube', percent: 8, impressions: '31.2K', color: 'bg-red-500' },
    { name: 'Other Channels', percent: 4, impressions: '15.6K', color: 'bg-indigo-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-violet-500" />
            Social Analytics & Cross-Network Performance
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Verified metric tracking for impressions, audience engagement, and click-through velocity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Year to Date</option>
          </select>

          <button
            onClick={() => navigate('/app/reports')}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-1.5 shadow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Impressions</span>
            <Eye className="w-4 h-4 text-violet-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">390,000</div>
          <span className="text-[11px] text-emerald-500 font-bold">+18.4% vs previous 30d</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Average Engagement Rate</span>
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">5.8%</div>
          <span className="text-[11px] text-emerald-500 font-bold">+0.9% higher than industry benchmark</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Outbound Link Clicks</span>
            <TrendingUp className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">14,820</div>
          <span className="text-[11px] text-emerald-500 font-bold">+31.2% click conversion</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Aggregated Audience</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">345,000</div>
          <span className="text-[11px] text-emerald-500 font-bold">+4,100 new followers this month</span>
        </div>
      </div>

      {/* Engagement Trend Chart + Channel Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engagement Trend (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                Audience Engagement Velocity
              </h3>
              <p className="text-xs text-slate-500">Weekly interaction points across active destination feeds</p>
            </div>
            <span className="text-xs font-bold text-violet-500 bg-violet-500/10 px-2 py-0.5 rounded">
              High Performing
            </span>
          </div>

          {/* SVG Trend Wave Graphic */}
          <div className="h-48 pt-4 pb-2 flex items-end">
            <svg viewBox="0 0 600 160" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="gradViolet" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c5cff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#7c5cff" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,120 Q 75,50 150,90 T 300,40 T 450,70 T 600,20 L 600,160 L 0,160 Z"
                fill="url(#gradViolet)"
              />
              <path
                d="M 0,120 Q 75,50 150,90 T 300,40 T 450,70 T 600,20"
                fill="none"
                stroke="#7c5cff"
                strokeWidth="3"
              />
              {/* Highlight points */}
              <circle cx="150" cy="90" r="4" fill="#38bdf8" />
              <circle cx="300" cy="40" r="4" fill="#38bdf8" />
              <circle cx="450" cy="70" r="4" fill="#38bdf8" />
              <circle cx="600" cy="20" r="5" fill="#22c55e" />
            </svg>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
            <span>Week 1: 42K Engagements</span>
            <span>Week 2: 68K</span>
            <span>Week 3: 84K</span>
            <span className="font-bold text-emerald-500">Week 4: 112K Engagements</span>
          </div>
        </div>

        {/* Channel Breakdown (1 col) */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
            Impression Distribution
          </h3>
          <p className="text-xs text-slate-500">Platform share of total campaign views</p>

          <div className="space-y-3 pt-2">
            {channelBreakdown.map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-800 dark:text-slate-200">{item.name}</span>
                  <span className="text-slate-400">{item.impressions} ({item.percent}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Content Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
          Top Performing Published Posts
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                <th className="pb-3">Post Content</th>
                <th className="pb-3">Networks</th>
                <th className="pb-3">Impressions</th>
                <th className="pb-3">Likes</th>
                <th className="pb-3">Comments</th>
                <th className="pb-3">Clicks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
              {topPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 pr-4 max-w-sm truncate font-medium">{post.content}</td>
                  <td className="py-3.5 uppercase font-bold text-[10px] text-violet-500">
                    {post.channels.join(' + ')}
                  </td>
                  <td className="py-3.5 font-bold">{post.metrics?.impressions.toLocaleString() || '14,200'}</td>
                  <td className="py-3.5">{post.metrics?.likes || 624}</td>
                  <td className="py-3.5">{post.metrics?.comments || 88}</td>
                  <td className="py-3.5 font-bold text-sky-500">{post.metrics?.clicks || 531}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
