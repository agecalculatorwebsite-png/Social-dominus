import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { PLATFORM_CONFIG } from '../../components/icons/SocialIcons';
import {
  Share2,
  CheckCircle2,
  AlertCircle,
  Plus,
  RefreshCw,
  ExternalLink,
  Shield,
  Layers,
} from 'lucide-react';

export const ChannelsView: React.FC<{ navigate: (path: string) => void }> = () => {
  const { channels, toggleChannelStatus } = useAppStore();
  const [activeTab, setActiveTab] = useState<'all' | 'connected' | 'available'>('all');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleToggle = (chId: string, name: string, isConnected: boolean) => {
    toggleChannelStatus(chId);
    setSuccessToast(
      isConnected
        ? `Disconnected ${name} from active publishing queue.`
        : `Successfully authenticated ${name} into workspace!`
    );
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const connectedCount = channels.filter((c) => c.status === 'connected').length;

  const filteredChannels = channels.filter((c) => {
    if (activeTab === 'connected') return c.status === 'connected';
    if (activeTab === 'available') return c.status !== 'connected';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Share2 className="w-6 h-6 text-violet-500" />
            Social Channels & OAuth Gateways
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Connect, authenticate, and monitor health across 15 official social network integrations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl font-bold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
            {connectedCount} of 15 Networks Active
          </span>
        </div>
      </div>

      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Tabs Filter */}
      <div className="flex items-center gap-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            activeTab === 'all' ? 'bg-violet-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          All Networks (15)
        </button>
        <button
          onClick={() => setActiveTab('connected')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            activeTab === 'connected' ? 'bg-violet-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          Active Connected ({connectedCount})
        </button>
        <button
          onClick={() => setActiveTab('available')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            activeTab === 'available' ? 'bg-violet-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          Available to Connect ({15 - connectedCount})
        </button>
      </div>

      {/* 15 Channel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChannels.map((ch) => {
          const config = PLATFORM_CONFIG[ch.platform] || PLATFORM_CONFIG['twitter'];
          const Icon = config.icon;
          const isConnected = ch.status === 'connected';

          return (
            <div
              key={ch.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                isConnected
                  ? 'border-emerald-500/40 bg-white dark:bg-slate-900 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 opacity-85 hover:opacity-100'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${config.bgColor} border ${config.borderColor}`}>
                      <Icon className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{config.name}</h3>
                      <span className="text-[10px] text-slate-400">{config.category}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                      isConnected
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isConnected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>

                {isConnected ? (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Account:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{ch.accountName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Handle:</span>
                      <span className="font-mono text-[11px] text-violet-500">{ch.accountHandle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Followers:</span>
                      <span className="font-bold">{ch.followers.toLocaleString()}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[48px]">
                    Connect your {config.name} profile or business page to enable automated scheduling, AI variants, and performance analytics.
                  </p>
                )}

                {/* Capabilities matrix */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1 text-[11px]">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Capabilities</span>
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    <span className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Publishing: Yes
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Limit: {config.maxChars} chars
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Media: Img/Video
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleToggle(ch.id, config.name, isConnected)}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                    isConnected
                      ? 'border border-rose-500/30 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20'
                      : 'bg-violet-600 hover:bg-violet-500 text-white shadow-sm'
                  }`}
                >
                  {isConnected ? 'Disconnect Channel' : 'Connect Account (OAuth)'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
