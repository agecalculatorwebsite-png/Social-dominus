import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { PLATFORM_CONFIG } from '../../components/icons/SocialIcons';
import { CheckSquare, CheckCircle2, XCircle, Clock, Share2, MessageSquare, AlertCircle } from 'lucide-react';

export const ApprovalsView: React.FC<{ navigate: (path: string) => void }> = () => {
  const { approvals, reviewApproval, updatePostStatus } = useAppStore();
  const [commentText, setCommentText] = useState('');
  const [activeApprovalId, setActiveApprovalId] = useState<string | null>(null);

  const handleApprove = (id: string, postId: string) => {
    reviewApproval(id, 'approved', commentText || 'Approved for publication.');
    updatePostStatus(postId, 'approved');
    setActiveApprovalId(null);
    setCommentText('');
  };

  const handleReject = (id: string, postId: string) => {
    reviewApproval(id, 'rejected', commentText || 'Revisions requested by reviewer.');
    updatePostStatus(postId, 'draft');
    setActiveApprovalId(null);
    setCommentText('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-violet-500" />
            Content Approval Queue
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review, suggest revisions, or authorize scheduled post dispatch for contributor and client drafts.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
          {approvals.filter((a) => a.status === 'pending').length} Pending Reviews
        </span>
      </div>

      <div className="space-y-4">
        {approvals.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center text-xs text-slate-400 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <p className="font-bold text-slate-700 dark:text-slate-300">All submissions cleared!</p>
            <p>No content currently awaiting editorial approval.</p>
          </div>
        ) : (
          approvals.map((req) => (
            <div
              key={req.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                      Submitted by {req.authorName}
                    </span>
                    <span className="text-[10px] text-slate-400">({req.authorEmail})</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Timestamp: {new Date(req.submittedAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      req.status === 'pending'
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                        : req.status === 'approved'
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
              </div>

              {/* Target networks */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Destinations:</span>
                <div className="flex gap-1.5">
                  {req.channels.map((ch) => {
                    const Icon = PLATFORM_CONFIG[ch]?.icon || Share2;
                    return (
                      <span
                        key={ch}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1"
                      >
                        <Icon className="w-3 h-3" />
                        <span>{PLATFORM_CONFIG[ch]?.name || ch}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Content body */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                {req.postContent}
              </div>

              {req.reviewerComments && (
                <div className="p-3 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-300 text-xs space-y-0.5">
                  <span className="font-bold block">Reviewer Notes ({req.reviewedBy}):</span>
                  <p>{req.reviewerComments}</p>
                </div>
              )}

              {/* Review Actions */}
              {req.status === 'pending' && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <input
                    type="text"
                    placeholder="Optional feedback or revision request note for the author..."
                    value={activeApprovalId === req.id ? commentText : ''}
                    onFocus={() => setActiveApprovalId(req.id)}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  />

                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleReject(req.id, req.postId)}
                      className="px-4 py-2 rounded-xl text-xs font-bold border border-rose-500/30 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Request Changes</span>
                    </button>
                    <button
                      onClick={() => handleApprove(req.id, req.postId)}
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve for Schedule</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
