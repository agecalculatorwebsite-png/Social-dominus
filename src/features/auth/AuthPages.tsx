import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { SocialDominusLogo } from '../../components/icons/SocialIcons';
import { ShieldCheck, Sparkles, CheckCircle2, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface AuthPageProps {
  mode: 'login' | 'signup' | 'forgot';
  navigate: (path: string) => void;
}

export const AuthPages: React.FC<AuthPageProps> = ({ mode, navigate }) => {
  const { signInWithGoogle, isFirebaseLoading, updateUserProfile } = useAppStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isDemoSubmitting, setIsDemoSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDemoSubmitting(true);

    setTimeout(() => {
      setIsDemoSubmitting(false);
      if (mode === 'forgot') {
        setSuccessMessage('Password reset instructions simulated to your inbox.');
      } else {
        updateUserProfile({
          email: email || 'alex.rivera@example.com',
          displayName: name || email.split('@')[0] || 'Social Dominus Member',
        });
        navigate(mode === 'signup' ? '/onboarding' : '/app/dashboard');
      }
    }, 600);
  };

  const handleGoogleAuth = async () => {
    try {
      await signInWithGoogle();
      navigate('/app/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 rounded-3xl shadow-xl">
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <SocialDominusLogo size={42} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {mode === 'login'
              ? 'Welcome back'
              : mode === 'signup'
              ? 'Start your 14-day free trial'
              : 'Reset your password'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {mode === 'login'
              ? 'Access your unified social media operations center'
              : mode === 'signup'
              ? 'Zero credit card required. Connect all 15 social networks.'
              : 'Enter your email to receive recovery instructions'}
          </p>
        </div>

        {successMessage ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs text-center space-y-3">
            <CheckCircle2 className="w-6 h-6 mx-auto" />
            <p className="font-semibold">{successMessage}</p>
            <button
              onClick={() => navigate('/login')}
              className="text-xs underline font-bold"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Google Sign-In with Firebase Auth */}
            {mode !== 'forgot' && (
              <div>
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={isFirebaseLoading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700/80 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>{isFirebaseLoading ? 'Connecting...' : 'Continue with Google (Firebase)'}</span>
                </button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400">
                    <span className="bg-white dark:bg-slate-900 px-2">or email</span>
                  </div>
                </div>
              </div>
            )}

            {/* Email form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => navigate('/forgot-password')}
                        className="text-[11px] text-violet-600 dark:text-violet-400 hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isDemoSubmitting}
                className="w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-1.5"
              >
                <span>
                  {isDemoSubmitting
                    ? 'Processing...'
                    : mode === 'login'
                    ? 'Sign In to Workspace'
                    : mode === 'signup'
                    ? 'Create Free Account'
                    : 'Send Reset Link'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Login Preset Shortcut */}
            {mode === 'login' && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    updateUserProfile({
                      email: 'agecalculator.website@gmail.com',
                      displayName: 'Alex Rivera (Owner)',
                      role: 'owner',
                    });
                    navigate('/app/dashboard');
                  }}
                  className="w-full py-2 rounded-xl border border-dashed border-violet-400/50 dark:border-violet-500/40 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>One-Click Instant Demo Login</span>
                </button>
              </div>
            )}

            <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2">
              {mode === 'login' ? (
                <p>
                  Don't have an account?{' '}
                  <button onClick={() => navigate('/signup')} className="font-bold text-violet-600 dark:text-violet-400 hover:underline">
                    Start 14-day trial
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button onClick={() => navigate('/login')} className="font-bold text-violet-600 dark:text-violet-400 hover:underline">
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
