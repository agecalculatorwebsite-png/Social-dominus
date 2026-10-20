import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Clock,
  CheckCircle2,
  Lock,
  Globe2,
} from 'lucide-react';

export const SettingsView: React.FC<{ navigate: (path: string) => void }> = () => {
  const { userProfile, updateUserProfile, currentWorkspace, theme, setTheme } = useAppStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'brand'>('profile');

  const [name, setName] = useState(userProfile.displayName);
  const [email] = useState(userProfile.email);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ displayName: name });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-violet-500" />
          Workspace & Account Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure personal credentials, notifications, brand voice directives, and security parameters.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Settings saved successfully and updated in persistent state.</span>
        </div>
      )}

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Tab menu */}
        <div className="lg:col-span-3 space-y-1">
          {[
            { id: 'profile', label: 'Profile & Identity', icon: User },
            { id: 'notifications', label: 'Publishing Alerts', icon: Bell },
            { id: 'security', label: 'Security & Auth', icon: Shield },
            { id: 'brand', label: 'Brand Voice Directives', icon: Palette },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                activeTab === item.id
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content (9 cols) */}
        <div className="lg:col-span-9 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Profile Details</h3>

              <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <img
                  src={userProfile.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={userProfile.displayName}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-violet-500/20"
                />
                <div>
                  <span className="font-bold text-xs text-slate-900 dark:text-white block">{userProfile.displayName}</span>
                  <span className="text-[11px] text-slate-400">Authenticated via Firebase Auth</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Email
                </label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-400 cursor-not-allowed"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Managed via OAuth provider or administrator.
                </span>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white shadow"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Alert Preferences</h3>
              <div className="space-y-3 text-xs">
                {[
                  { label: 'Publishing failure notifications', desc: 'Instant email alert when API token re-auth is needed.' },
                  { label: 'Approval queue requests', desc: 'Notify reviewers when a contributor submits content for sign-off.' },
                  { label: 'Weekly executive performance digest', desc: 'Condensed PDF summary every Monday at 8 AM.' },
                  { label: 'Trial expiration warnings', desc: 'Reminders 3 days prior to subscription renewal.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                    <div>
                      <span className="font-bold block text-slate-900 dark:text-white">{item.label}</span>
                      <span className="text-[11px] text-slate-500">{item.desc}</span>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded text-violet-600 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Security & Access Safeguards</h3>
              <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 space-y-1">
                <span className="font-bold text-violet-600 dark:text-violet-400 block">Firebase Cloud Security Rules Deployed</span>
                <p className="text-slate-600 dark:text-slate-300">
                  Zero-trust attribute-based access control (ABAC) restricts Firestore mutations strictly to verified account holders with `email_verified == true`.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-bold block text-slate-900 dark:text-white">Active Session Token</span>
                <p className="text-slate-400 font-mono text-[11px]">User UID: {userProfile.uid}</p>
                <span className="text-emerald-500 font-bold block">Encrypted & Signed</span>
              </div>
            </div>
          )}

          {activeTab === 'brand' && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Brand Voice Directives</h3>
              <p className="text-xs text-slate-500">
                AI Content Studio enforces these rules across all platform copy generators.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Brand Persona
                </label>
                <input
                  type="text"
                  defaultValue="Social Dominus Tech Lead — Knowledgeable, Confident, Modern"
                  className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Prohibited Vocabulary (Comma Separated)
                </label>
                <input
                  type="text"
                  defaultValue="synergy, game-changer, revolutionized, rockstar"
                  className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
