import React from 'react';
import { PLATFORM_CONFIG } from '../../components/icons/SocialIcons';
import { Check, X, Shield, ArrowRight } from 'lucide-react';

interface ChannelsPageProps {
  navigate: (path: string) => void;
}

export const ChannelsPage: React.FC<ChannelsPageProps> = ({ navigate }) => {
  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          15 Supported Social Platforms
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
          Connect your brand profiles, company pages, channels, and fediverse accounts seamlessly from one unified dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(PLATFORM_CONFIG).map(([key, config]) => {
          const Icon = config.icon;
          return (
            <div
              key={key}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 hover:border-violet-500/40 transition-all shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${config.bgColor} border ${config.borderColor}`}>
                  <Icon className={`w-6 h-6 ${config.color}`} />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{config.name}</h3>
                  <span className="text-xs text-slate-500">{config.category}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Max Character Limit:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{config.maxChars.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Media Support:</span>
                  <span className="font-bold text-emerald-500">Images & Video</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheduling Engine:</span>
                  <span className="font-bold text-emerald-500">Direct Auto-Publish</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/app/channels')}
                className="w-full mt-2 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Manage Gateway</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
