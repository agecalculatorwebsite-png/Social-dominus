import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { PLATFORM_CONFIG } from '../../components/icons/SocialIcons';
import {
  Inbox as InboxIcon,
  Search,
  CheckCircle2,
  Clock,
  Send,
  User,
  Share2,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';

interface Conversation {
  id: string;
  senderName: string;
  senderHandle: string;
  senderAvatar: string;
  channel: string;
  snippet: string;
  fullMessage: string;
  timestamp: string;
  unread: boolean;
  replied: boolean;
}

export const InboxView: React.FC<{ navigate: (path: string) => void }> = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'conv-1',
      senderName: 'Michael Hayes',
      senderHandle: '@mhayes_tech',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      channel: 'twitter',
      snippet: 'Is your multi-client workspace feature available on the Growth plan?',
      fullMessage: 'Hey Social Dominus team! We run an agency with 4 active brand clients. Is your multi-client workspace isolation feature available on the Growth plan, or do we need the Agency tier right away? Thanks!',
      timestamp: '14m ago',
      unread: true,
      replied: false,
    },
    {
      id: 'conv-2',
      senderName: 'Claire Dupont',
      senderHandle: 'claire-dupont-agency',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      channel: 'linkedin',
      snippet: 'Loved your 2026 SaaS Growth Playbook post! Shared with our leadership.',
      fullMessage: 'Loved your 2026 SaaS Growth Playbook post on LinkedIn! We shared it with our leadership team. Are you accepting guest contributions on your marketing masterclass channel?',
      timestamp: '2h ago',
      unread: false,
      replied: true,
    },
    {
      id: 'conv-3',
      senderName: 'David K.',
      senderHandle: '@davidk_creates',
      senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      channel: 'instagram',
      snippet: 'Can I schedule Instagram Reels directly from the calendar?',
      fullMessage: 'Can I schedule Instagram Reels directly from the calendar queue without manual phone pushes? Loving the dark mode UI so far!',
      timestamp: '5h ago',
      unread: false,
      replied: false,
    },
  ]);

  const [activeConvId, setActiveConvId] = useState<string>('conv-1');
  const [replyText, setReplyText] = useState('');
  const [channelFilter, setChannelFilter] = useState('all');

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? { ...c, replied: true, unread: false, snippet: `You: ${replyText}` }
          : c
      )
    );
    setReplyText('');
  };

  const filtered = conversations.filter((c) => {
    if (channelFilter !== 'all' && c.channel !== channelFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <InboxIcon className="w-6 h-6 text-violet-500" />
            Unified Community Inbox
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Consolidated comments, inquiries, and customer mentions across all 15 connected networks.
          </p>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">
            Simulated Webhook Feed
          </span>
        </div>
      </div>

      {/* Inbox Split Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm min-h-[550px]">
        {/* Left Column (5 cols): Conversation List */}
        <div className="lg:col-span-5 border-r border-slate-200 dark:border-slate-800 flex flex-col">
          {/* Filter Bar */}
          <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="px-2.5 py-1 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="all">All Channels</option>
              <option value="twitter">X (Twitter)</option>
              <option value="linkedin">LinkedIn</option>
              <option value="instagram">Instagram</option>
            </select>
            <span className="text-[11px] text-slate-400 font-semibold">{filtered.length} Threads</span>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((conv) => {
              const Icon = PLATFORM_CONFIG[conv.channel]?.icon || Share2;
              const isSelected = conv.id === activeConvId;

              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`p-4 transition-colors cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-violet-50/60 dark:bg-violet-950/30'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <img src={conv.senderAvatar} alt={conv.senderName} className="w-7 h-7 rounded-full object-cover" />
                      <div className="truncate">
                        <span className="font-bold text-xs text-slate-900 dark:text-white block truncate">
                          {conv.senderName}
                        </span>
                        <span className="text-[10px] text-slate-400">{conv.senderHandle}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="p-1 rounded bg-slate-100 dark:bg-slate-800">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] text-slate-400">{conv.timestamp}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 truncate font-medium">
                    {conv.snippet}
                  </p>

                  <div className="flex items-center gap-2 pt-1 text-[10px]">
                    {conv.unread && (
                      <span className="px-1.5 py-0.2 rounded bg-violet-600 text-white font-bold">Unread</span>
                    )}
                    {conv.replied && (
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-500 font-bold">Replied</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (7 cols): Thread Details & Reply Composer */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          {activeConv ? (
            <>
              {/* Thread header */}
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
                <div className="flex items-center gap-3">
                  <img src={activeConv.senderAvatar} alt={activeConv.senderName} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white block">
                      {activeConv.senderName}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Channel: {PLATFORM_CONFIG[activeConv.channel]?.name || activeConv.channel}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-400">
                  Status: <span className="text-emerald-500 font-bold">Active Thread</span>
                </div>
              </div>

              {/* Message history */}
              <div className="p-6 space-y-4 flex-1 overflow-y-auto">
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 max-w-lg space-y-1">
                  <span className="text-[10px] font-bold text-violet-500 block">{activeConv.senderName}</span>
                  <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                    {activeConv.fullMessage}
                  </p>
                  <span className="text-[9px] text-slate-400 block text-right">{activeConv.timestamp}</span>
                </div>

                {activeConv.replied && (
                  <div className="ml-auto p-4 rounded-2xl bg-violet-600 text-white max-w-lg space-y-1">
                    <span className="text-[10px] font-bold text-violet-200 block">Social Dominus Dispatch</span>
                    <p className="text-xs leading-relaxed">
                      Thank you for contacting us! Yes, the Growth tier gives you up to 3 isolated client workspaces, while Agency tier scales to 10 workspaces.
                    </p>
                    <span className="text-[9px] text-violet-200 block text-right">Just now • Sent</span>
                  </div>
                )}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="relative">
                  <textarea
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Reply to ${activeConv.senderName} on ${PLATFORM_CONFIG[activeConv.channel]?.name}...`}
                    className="w-full p-3 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 pr-12"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 bottom-3 p-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white shadow-sm"
                    title="Send reply"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Demo Mode — Direct message reply simulated to customer channel.</span>
                  <span>Internal audit logged</span>
                </div>
              </form>
            </>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400">Select a conversation thread to inspect.</div>
          )}
        </div>
      </div>
    </div>
  );
};
