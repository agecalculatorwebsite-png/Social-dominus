import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { PLATFORM_CONFIG } from '../../components/icons/SocialIcons';
import {
  Layers,
  Clock,
  Play,
  Pause,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Calendar,
  Share2,
} from 'lucide-react';

interface QueueViewProps {
  navigate: (path: string) => void;
}

export const QueueView: React.FC<QueueViewProps> = ({ navigate }) => {
  const { posts, currentWorkspace, deletePost, createPost } = useAppStore();
  const [isQueuePaused, setIsQueuePaused] = useState(false);
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const [csvRows, setCsvRows] = useState<
    { id: number; content: string; channel: string; time: string; status: 'valid' | 'invalid'; error?: string }[]
  >([
    { id: 1, content: 'Excited to announce our new 2026 SaaS marketing research report!', channel: 'twitter', time: '2026-10-22 10:00', status: 'valid' },
    { id: 2, content: '5 Steps to Scale Client Content Workflows without burnouts.', channel: 'linkedin', time: '2026-10-22 14:00', status: 'valid' },
    { id: 3, content: '', channel: 'instagram', time: '2026-10-23 09:00', status: 'invalid', error: 'Content is empty' },
  ]);

  const queuedPosts = posts.filter((p) => p.status === 'scheduled');

  const defaultSlots = [
    { time: '09:00 AM', label: 'Morning Peak', active: true },
    { time: '01:30 PM', label: 'Midday Lunch Break', active: true },
    { time: '05:45 PM', label: 'Evening Commute', active: true },
    { time: '08:15 PM', label: 'Prime Social Hour', active: false },
  ];

  const handleApplyCsv = async () => {
    const validRows = csvRows.filter((r) => r.status === 'valid');
    for (const row of validRows) {
      await createPost({
        authorId: 'demo-user-1',
        authorName: 'Alex Rivera',
        content: row.content,
        channels: [row.channel],
        status: 'scheduled',
        category: 'Bulk Import',
        scheduledAt: new Date(row.time).toISOString(),
        mediaUrls: [],
      });
    }
    setCsvModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-violet-500" />
            Publishing Queue & Bulk Dispatch
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Automated queue scheduling in {currentWorkspace.timezone}. Items auto-dispatch into reserved time slots.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsQueuePaused(!isQueuePaused)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
              isQueuePaused
                ? 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
            }`}
          >
            {isQueuePaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{isQueuePaused ? 'Resume Dispatch' : 'Pause Queue'}</span>
          </button>

          <button
            onClick={() => setCsvModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Bulk CSV Import</span>
          </button>

          <button
            onClick={() => navigate('/app/compose')}
            className="px-4 py-1.5 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-1.5 shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Queue</span>
          </button>
        </div>
      </div>

      {isQueuePaused && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Queue is currently PAUSED. No scheduled posts will be dispatched until resumed.</span>
        </div>
      )}

      {/* Grid: Reserved Queue Slots vs Scheduled Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (1 col): Smart Time Slots */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Smart Posting Slots</h3>
              <span className="text-[10px] text-violet-500 font-bold uppercase">Optimal Times</span>
            </div>
            <p className="text-xs text-slate-500">
              When you add posts to the queue, they automatically fill these reserved slots in order.
            </p>

            <div className="space-y-2.5">
              {defaultSlots.map((slot, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-violet-500" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">{slot.time}</span>
                      <span className="text-[10px] text-slate-400">{slot.label}</span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      slot.active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {slot.active ? 'Active' : 'Muted'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (2 cols): Queued Items awaiting release */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Queued Posts ({queuedPosts.length})
              </h3>
              <span className="text-xs text-slate-400">Order by scheduled timestamp</span>
            </div>

            {queuedPosts.length === 0 ? (
              <div className="text-center py-12 text-xs text-slate-500 space-y-2">
                <Layers className="w-8 h-8 text-slate-400 mx-auto opacity-50" />
                <p>Your publishing queue is currently empty.</p>
                <button
                  onClick={() => navigate('/app/compose')}
                  className="px-3.5 py-1.5 rounded-lg bg-violet-600 text-white font-bold"
                >
                  Create Queued Content
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {queuedPosts.map((post, idx) => (
                  <div
                    key={post.id}
                    className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:border-violet-500/40 transition-all flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-violet-500">Slot #{idx + 1}</span>
                        <span className="text-slate-400">•</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {post.scheduledAt ? new Date(post.scheduledAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Next Slot'}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/10 text-sky-500 font-bold">
                          {post.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-800 dark:text-slate-200 font-medium whitespace-pre-wrap">
                        {post.content}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex gap-1">
                        {post.channels.map((ch) => {
                          const Icon = PLATFORM_CONFIG[ch]?.icon || Share2;
                          return (
                            <div key={ch} className="p-1 rounded bg-white dark:bg-slate-700 shadow-xs">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                          );
                        })}
                      </div>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20"
                        title="Remove from queue"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSV Import Modal */}
      {csvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-violet-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Bulk CSV Schedule Importer</h3>
              </div>
              <button onClick={() => setCsvModalOpen(false)} className="text-slate-400 hover:text-white text-xs">
                Close
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Pre-validation check for bulk scheduled rows. Invalid rows are identified prior to import to prevent erroneous dispatch.
            </p>

            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-2.5">Row</th>
                    <th className="p-2.5">Post Content</th>
                    <th className="p-2.5">Channel</th>
                    <th className="p-2.5">Time</th>
                    <th className="p-2.5">Validation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {csvRows.map((row) => (
                    <tr key={row.id}>
                      <td className="p-2.5 font-bold">{row.id}</td>
                      <td className="p-2.5 truncate max-w-[200px] text-slate-800 dark:text-slate-200">
                        {row.content || <span className="text-rose-500 italic">Missing Content</span>}
                      </td>
                      <td className="p-2.5 uppercase text-violet-500 font-bold">{row.channel}</td>
                      <td className="p-2.5 font-mono text-[11px]">{row.time}</td>
                      <td className="p-2.5">
                        {row.status === 'valid' ? (
                          <span className="text-emerald-500 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                          </span>
                        ) : (
                          <span className="text-rose-500 font-bold flex items-center gap-1" title={row.error}>
                            <AlertCircle className="w-3.5 h-3.5" /> Error
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400">2 of 3 rows ready for staging</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCsvModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyCsv}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white"
                >
                  Import 2 Valid Posts
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
