import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { PLATFORM_CONFIG } from '../../components/icons/SocialIcons';
import {
  Send,
  Calendar,
  FileText,
  Clock,
  AlertTriangle,
  Share2,
  TrendingUp,
  Users,
  Plus,
  ArrowRight,
  Sparkles,
  BarChart2,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

interface DashboardViewProps {
  navigate: (path: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ navigate }) => {
  const { userProfile, currentWorkspace, posts, channels, approvals } = useAppStore();
  const [dateRange, setDateRange] = useState('Last 30 Days');

  // Compute metrics
  const publishedPosts = posts.filter((p) => p.status === 'published');
  const scheduledPosts = posts.filter((p) => p.status === 'scheduled');
  const draftPosts = posts.filter((p) => p.status === 'draft');
  const pendingApprovals = posts.filter((p) => p.status === 'needs_review');
  const failedPosts = posts.filter((p) => p.status === 'failed');
  const connectedChannels = channels.filter((c) => c.status === 'connected');

  const totalFollowers = connectedChannels.reduce((sum, c) => sum + c.followers, 0);

  const metrics = [
    { label: 'Published Posts', val: publishedPosts.length, icon: Send, color: 'text-emerald-500', bg: 'bg-emerald-500/10', path: '/app/planner' },
    { label: 'Scheduled Queue', val: scheduledPosts.length, icon: Calendar, color: 'text-violet-500', bg: 'bg-violet-500/10', path: '/app/queue' },
    { label: 'Saved Drafts', val: draftPosts.length, icon: FileText, color: 'text-sky-500', bg: 'bg-sky-500/10', path: '/app/compose' },
    { label: 'Pending Approvals', val: pendingApprovals.length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10', path: '/app/approvals' },
    { label: 'Publishing Alerts', val: failedPosts.length, icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-500/10', path: '/app/channels' },
    { label: 'Active Channels', val: `${connectedChannels.length}/15`, icon: Share2, color: 'text-indigo-500', bg: 'bg-indigo-500/10', path: '/app/channels' },
    { label: 'Total Reach', val: totalFollowers.toLocaleString(), icon: Users, color: 'text-cyan-500', bg: 'bg-cyan-500/10', path: '/app/analytics' },
    { label: 'Avg Engagement', val: '5.8%', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10', path: '/app/analytics' },
  ];

  return (
    <div className="space-y-8">
      {/* Header welcome & quick date filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Good morning, {userProfile.displayName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Operational overview for <span className="font-semibold text-slate-800 dark:text-slate-200">{currentWorkspace.name}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Quarter</option>
            <option>All Time</option>
          </select>

          <button
            onClick={() => navigate('/app/compose')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-1.5 shadow-md shadow-violet-600/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Post</span>
          </button>
        </div>
      </div>

      {/* Summary 8 Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            onClick={() => navigate(m.path)}
            className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 hover:border-violet-500/40 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">{m.label}</span>
              <div className={`p-1.5 rounded-lg ${m.bg}`}>
                <m.icon className={`w-3.5 h-3.5 ${m.color}`} />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              {m.val}
            </div>
          </div>
        ))}
      </div>

      {/* Main Command Center Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Publishing Activity & Trend */}
        <div className="lg:col-span-2 space-y-6">
          {/* Publishing Activity Heatmap & Bar Overview */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  Publishing Cadence & Throughput
                </h3>
                <p className="text-xs text-slate-500">Distribution of scheduled vs published slots over time</p>
              </div>
              <button
                onClick={() => navigate('/app/analytics')}
                className="text-xs text-violet-600 dark:text-violet-400 font-bold hover:underline flex items-center gap-1"
              >
                Detailed Analytics <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Visual SVG Bar representation */}
            <div className="h-44 flex items-end gap-2 pt-6 pb-2 border-b border-slate-100 dark:border-slate-800">
              {[
                { day: 'Mon', pub: 6, sched: 4 },
                { day: 'Tue', pub: 8, sched: 5 },
                { day: 'Wed', pub: 12, sched: 8 },
                { day: 'Thu', pub: 9, sched: 6 },
                { day: 'Fri', pub: 14, sched: 7 },
                { day: 'Sat', pub: 5, sched: 3 },
                { day: 'Sun', pub: 4, sched: 2 },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div className="w-full max-w-[28px] flex flex-col gap-0.5 items-center">
                    <div
                      className="w-full bg-violet-500 rounded-t-sm transition-all group-hover:bg-violet-400"
                      style={{ height: `${bar.pub * 8}px` }}
                      title={`Published: ${bar.pub}`}
                    />
                    <div
                      className="w-full bg-sky-400 rounded-b-sm opacity-80"
                      style={{ height: `${bar.sched * 6}px` }}
                      title={`Scheduled: ${bar.sched}`}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">{bar.day}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-violet-500 inline-block" /> Published Posts
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" /> Queued for Release
                </span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-500">98.4% On-Time Delivery</span>
            </div>
          </div>

          {/* Upcoming Publishing Schedule List */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                Upcoming Scheduled Content
              </h3>
              <button
                onClick={() => navigate('/app/planner')}
                className="text-xs text-violet-600 dark:text-violet-400 font-bold hover:underline"
              >
                View Full Calendar
              </button>
            </div>

            {scheduledPosts.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500 space-y-2">
                <Calendar className="w-8 h-8 text-slate-400 mx-auto opacity-50" />
                <p>No posts currently queued in this workspace.</p>
                <button
                  onClick={() => navigate('/app/compose')}
                  className="px-3 py-1.5 rounded-lg bg-violet-600 text-white font-bold"
                >
                  Schedule First Post
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {scheduledPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => navigate('/app/planner')}
                    className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400">
                          {post.scheduledAt
                            ? new Date(post.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : 'Queue Slot'}
                        </span>
                        <span className="text-[10px] text-slate-400">{post.category}</span>
                      </div>
                      <p className="text-xs text-slate-800 dark:text-slate-200 font-medium truncate">
                        {post.content}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {post.channels.map((ch) => {
                        const Icon = PLATFORM_CONFIG[ch]?.icon || Share2;
                        return (
                          <div key={ch} className="p-1 rounded-md bg-white dark:bg-slate-700 shadow-xs">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 col): Channel Health & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Shortcuts */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Command Shortcuts</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate('/app/compose')}
                className="p-3 rounded-xl border border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/10 text-left transition-all"
              >
                <Plus className="w-4 h-4 text-violet-500 mb-1" />
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Create Post</span>
                <span className="text-[10px] text-slate-500">Draft or schedule</span>
              </button>

              <button
                onClick={() => navigate('/app/ai-studio')}
                className="p-3 rounded-xl border border-sky-500/20 bg-sky-500/5 hover:bg-sky-500/10 text-left transition-all"
              >
                <Sparkles className="w-4 h-4 text-sky-500 mb-1" />
                <span className="text-xs font-bold text-slate-900 dark:text-white block">AI Studio</span>
                <span className="text-[10px] text-slate-500">Generate copy</span>
              </button>

              <button
                onClick={() => navigate('/app/inbox')}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-all"
              >
                <BarChart2 className="w-4 h-4 text-indigo-500 mb-1" />
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Social Inbox</span>
                <span className="text-[10px] text-slate-500">Reply to mentions</span>
              </button>

              <button
                onClick={() => navigate('/app/channels')}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-all"
              >
                <Share2 className="w-4 h-4 text-emerald-500 mb-1" />
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Channels</span>
                <span className="text-[10px] text-slate-500">Manage accounts</span>
              </button>
            </div>
          </div>

          {/* Connected Channels Status */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Network Gateways</h4>
              <button
                onClick={() => navigate('/app/channels')}
                className="text-[11px] text-violet-600 dark:text-violet-400 font-bold hover:underline"
              >
                Connect More
              </button>
            </div>

            <div className="space-y-2.5">
              {channels.slice(0, 6).map((ch) => {
                const Icon = PLATFORM_CONFIG[ch.platform]?.icon || Share2;
                const isConn = ch.status === 'connected';
                return (
                  <div
                    key={ch.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div className="p-1 rounded bg-white dark:bg-slate-700 shadow-xs">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <span className="font-bold block truncate text-slate-900 dark:text-white">{ch.accountName}</span>
                        <span className="text-[10px] text-slate-400">{ch.accountHandle}</span>
                      </div>
                    </div>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider ${
                        isConn
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                      }`}
                    >
                      {isConn ? 'Connected' : 'Offline'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Plan Entitlement summary banner */}
          <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/40 to-slate-900 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-violet-300">
              <span>{userProfile.planId.toUpperCase()} TIER SUBSCRIPTION</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded">Active</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              You are currently utilizing {connectedChannels.length} of 15 social slots and 1 of 3 client workspaces.
            </p>
            <button
              onClick={() => navigate('/app/billing')}
              className="w-full py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white shadow-sm"
            >
              Manage Quotas & Invoices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
