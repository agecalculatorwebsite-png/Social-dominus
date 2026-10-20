import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { PLATFORM_CONFIG } from '../../components/icons/SocialIcons';
import { CheckCircle2, ArrowRight, ArrowLeft, Building, Target, Clock, Sparkles } from 'lucide-react';

interface OnboardingProps {
  navigate: (path: string) => void;
}

export const OnboardingPage: React.FC<OnboardingProps> = ({ navigate }) => {
  const { createWorkspace, toggleChannelStatus, channels } = useAppStore();
  const [step, setStep] = useState(1);
  const [workspaceName, setWorkspaceName] = useState('My Brand Command');
  const [timezone, setTimezone] = useState('America/New_York (EST)');
  const [businessRole, setBusinessRole] = useState('Marketing Agency');
  const [goals, setGoals] = useState<string[]>(['Growth & Velocity', 'Team Approvals']);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['twitter', 'linkedin', 'instagram']);

  const toggleGoal = (g: string) => {
    setGoals((prev) => (prev.includes(g) ? prev.filter((item) => item !== g) : [...prev, g]));
  };

  const toggleChannel = (p: string) => {
    setSelectedChannels((prev) => (prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p]));
  };

  const handleFinish = () => {
    createWorkspace(workspaceName || 'My Primary Workspace', timezone, businessRole.includes('Agency'));
    selectedChannels.forEach((sc) => {
      const ch = channels.find((c) => c.platform === sc);
      if (ch && ch.status === 'not_connected') {
        toggleChannelStatus(ch.id);
      }
    });
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
            <span>STEP {step} OF 4</span>
            <span className="text-violet-600 dark:text-violet-400 font-extrabold">{step * 25}% COMPLETE</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-violet-600 to-sky-400 h-full transition-all duration-300"
              style={{ width: `${step * 25}%` }}
            />
          </div>
        </div>

        {/* Step 1: Workspace setup */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Name your workspace</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                This groups your social accounts, scheduled posts, and team members.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Workspace Name
                </label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Business Structure
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Solo Creator', 'Brand In-House', 'Marketing Agency', 'Enterprise Multi-Brand'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setBusinessRole(r)}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                        businessRole === r
                          ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-300'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-2 shadow"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Primary Goals */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">What are your primary goals?</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                We will optimize your default dashboard widgets accordingly.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                'Growth & Velocity',
                'Team Approvals',
                'AI Content Production',
                'Community Engagement',
                'Client White-Label Reports',
                'Automated Schedule Queue',
              ].map((g) => {
                const isSelected = goals.includes(g);
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleGoal(g)}
                    className={`p-3.5 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-300'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{g}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-violet-500" />}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-2 shadow"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Preferred Channels */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Select primary social channels</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Select the networks you intend to publish to (you can add or remove anytime).
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-60 overflow-y-auto pr-1">
              {Object.entries(PLATFORM_CONFIG).map(([key, config]) => {
                const Icon = config.icon;
                const isSelected = selectedChannels.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleChannel(key)}
                    className={`p-3 rounded-xl border text-center flex flex-col items-center gap-2 transition-all ${
                      isSelected
                        ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-300'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-[11px] font-bold truncate max-w-full">{config.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-2 shadow"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Timezone & Ready */}
        {step === 4 && (
          <div className="space-y-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-sky-400 text-white flex items-center justify-center mx-auto shadow-lg shadow-violet-500/30">
              <Sparkles className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">You're ready to launch!</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                Your workspace "{workspaceName}" is provisioned with 14 days of full Growth tier privileges.
              </p>
            </div>

            <div className="max-w-xs mx-auto text-left">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Scheduling Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="America/New_York (EST)">America/New_York (EST)</option>
                <option value="America/Los_Angeles (PST)">America/Los_Angeles (PST)</option>
                <option value="America/Chicago (CST)">America/Chicago (CST)</option>
                <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                <option value="Europe/Paris (CET)">Europe/Paris (CET)</option>
                <option value="Asia/Tokyo (JST)">Asia/Tokyo (JST)</option>
                <option value="Asia/Singapore (SGT)">Asia/Singapore (SGT)</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                onClick={handleFinish}
                className="w-full py-3 rounded-xl font-extrabold text-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-xl shadow-violet-600/30 flex items-center justify-center gap-2"
              >
                <span>Enter Social Dominus Command Center</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
