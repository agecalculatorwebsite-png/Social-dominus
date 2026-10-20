import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { PLATFORM_CONFIG } from '../../components/icons/SocialIcons';
import { SocialPost, PostStatus } from '../../types';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Trash2,
  X,
  Share2,
} from 'lucide-react';

interface PlannerViewProps {
  navigate: (path: string) => void;
}

export const PlannerView: React.FC<PlannerViewProps> = ({ navigate }) => {
  const { posts, currentWorkspace, updatePostStatus, deletePost, createPost } = useAppStore();
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2026, 9, 1)); // Oct 2026

  const filteredPosts = posts.filter((p) => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    return true;
  });

  const getStatusBadge = (status: PostStatus) => {
    switch (status) {
      case 'published':
        return <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-500 font-bold">Published</span>;
      case 'scheduled':
        return <span className="px-1.5 py-0.5 rounded text-[10px] bg-sky-500/10 text-sky-500 font-bold">Scheduled</span>;
      case 'needs_review':
        return <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-500 font-bold">Needs Review</span>;
      case 'failed':
        return <span className="px-1.5 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-500 font-bold">Failed</span>;
      case 'draft':
      default:
        return <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-500/10 text-slate-500 font-bold">Draft</span>;
    }
  };

  // 31 days for Oct 2026
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* Top Planner Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-violet-500" />
            Social Content Planner
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Displaying calendar in workspace timezone:{' '}
            <span className="font-semibold text-slate-700 dark:text-slate-300">{currentWorkspace.timezone}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View switcher */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 rounded-lg transition-all ${
                viewMode === 'month' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-lg transition-all ${
                viewMode === 'week' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded-lg transition-all ${
                viewMode === 'list' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              List
            </button>
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="all">All Statuses ({posts.length})</option>
            <option value="scheduled">Scheduled ({posts.filter(p => p.status === 'scheduled').length})</option>
            <option value="published">Published ({posts.filter(p => p.status === 'published').length})</option>
            <option value="needs_review">Needs Review ({posts.filter(p => p.status === 'needs_review').length})</option>
            <option value="draft">Drafts ({posts.filter(p => p.status === 'draft').length})</option>
            <option value="failed">Failed ({posts.filter(p => p.status === 'failed').length})</option>
          </select>

          <button
            onClick={() => navigate('/app/compose')}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-1.5 shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Post</span>
          </button>
        </div>
      </div>

      {/* Calendar Header with Month Nav */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            October 2026
          </h2>
          <span className="text-xs px-2 py-0.5 rounded bg-violet-500/10 text-violet-500 font-semibold">
            {filteredPosts.length} items scheduled
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentMonth(new Date(2026, 9, 1))}
            className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Today
          </button>
          <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar View: Month Grid */}
      {viewMode === 'month' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          {/* Day of week headers */}
          <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-center text-xs font-bold text-slate-500 py-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Month grid cells */}
          <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-100 dark:divide-slate-800/80">
            {/* Offset for Oct 1 2026 (Thursday -> 4 blank cells) */}
            <div className="min-h-[100px] p-2 bg-slate-50/40 dark:bg-slate-900/40 text-slate-300 text-xs font-bold">27</div>
            <div className="min-h-[100px] p-2 bg-slate-50/40 dark:bg-slate-900/40 text-slate-300 text-xs font-bold">28</div>
            <div className="min-h-[100px] p-2 bg-slate-50/40 dark:bg-slate-900/40 text-slate-300 text-xs font-bold">29</div>
            <div className="min-h-[100px] p-2 bg-slate-50/40 dark:bg-slate-900/40 text-slate-300 text-xs font-bold">30</div>

            {daysInMonth.map((day) => {
              const dayPosts = filteredPosts.filter((p, idx) => (idx % 7) + 14 === day || (day === 20 && idx === 0));
              const isToday = day === 20;

              return (
                <div
                  key={day}
                  onClick={() => navigate('/app/compose')}
                  className={`min-h-[110px] p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30 flex flex-col justify-between cursor-pointer group ${
                    isToday ? 'bg-violet-50/50 dark:bg-violet-950/20' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                        isToday
                          ? 'bg-violet-600 text-white'
                          : 'text-slate-700 dark:text-slate-300 group-hover:text-violet-500'
                      }`}
                    >
                      {day}
                    </span>
                    <Plus className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="space-y-1 overflow-hidden flex-1">
                    {dayPosts.map((post) => (
                      <div
                        key={post.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPost(post);
                        }}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-violet-500 text-[10px] shadow-xs cursor-pointer truncate"
                      >
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="font-bold text-violet-500 uppercase">{post.channels[0]}</span>
                          {getStatusBadge(post.status)}
                        </div>
                        <p className="truncate text-slate-800 dark:text-slate-200 font-medium">
                          {post.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex gap-1 shrink-0">
                  {post.channels.map((ch) => {
                    const Icon = PLATFORM_CONFIG[ch]?.icon || Share2;
                    return (
                      <div key={ch} className="p-1 rounded bg-slate-100 dark:bg-slate-800">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    );
                  })}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{post.category}</span>
                    {getStatusBadge(post.status)}
                    <span className="text-[10px] text-slate-400">
                      {post.scheduledAt
                        ? `Scheduled: ${new Date(post.scheduledAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}`
                        : 'Draft'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 truncate">{post.content}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePost(post.id);
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30"
                  title="Delete post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Week View */}
      {viewMode === 'week' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Active Week Schedule: Oct 19 - Oct 25, 2026</h3>
          <div className="grid grid-cols-7 gap-2">
            {['Mon 19', 'Tue 20 (Today)', 'Wed 21', 'Thu 22', 'Fri 23', 'Sat 24', 'Sun 25'].map((d, i) => (
              <div key={i} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-left min-h-[140px] space-y-2">
                <span className="text-xs font-bold text-violet-500 block">{d}</span>
                {filteredPosts.slice(i, i + 1).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPost(p)}
                    className="p-2 rounded bg-white dark:bg-slate-800 text-[10px] border border-slate-200 dark:border-slate-700 shadow-xs cursor-pointer truncate"
                  >
                    <span className="font-bold block text-slate-900 dark:text-white truncate">{p.content}</span>
                    <span className="text-[9px] text-slate-400">2:30 PM • Approved</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Post Detail Drawer / Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Post Details</span>
                {getStatusBadge(selectedPost.status)}
              </div>
              <button onClick={() => setSelectedPost(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Target Channels</span>
                <div className="flex gap-2 mt-1">
                  {selectedPost.channels.map((ch) => (
                    <span key={ch} className="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      {PLATFORM_CONFIG[ch]?.name || ch}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Author Content</span>
                <p className="mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                  {selectedPost.content}
                </p>
              </div>

              {selectedPost.metrics && selectedPost.status === 'published' && (
                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <span className="text-[10px] text-slate-400 block">Impressions</span>
                    <span className="font-bold text-xs">{selectedPost.metrics.impressions.toLocaleString()}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <span className="text-[10px] text-slate-400 block">Likes</span>
                    <span className="font-bold text-xs">{selectedPost.metrics.likes}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <span className="text-[10px] text-slate-400 block">Comments</span>
                    <span className="font-bold text-xs">{selectedPost.metrics.comments}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <span className="text-[10px] text-slate-400 block">Clicks</span>
                    <span className="font-bold text-xs">{selectedPost.metrics.clicks}</span>
                  </div>
                </div>
              )}

              {selectedPost.failureReason && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-500 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{selectedPost.failureReason}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  deletePost(selectedPost.id);
                  setSelectedPost(null);
                }}
                className="text-xs font-semibold text-rose-500 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>

              <div className="flex gap-2">
                {selectedPost.status !== 'published' && (
                  <button
                    onClick={() => {
                      updatePostStatus(selectedPost.id, 'published');
                      setSelectedPost(null);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white"
                  >
                    Simulate Publish Now
                  </button>
                )}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
