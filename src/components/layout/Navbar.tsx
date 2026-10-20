import React, { useState } from 'react';
import { SocialDominusLogo } from '../icons/SocialIcons';
import { useAppStore } from '../../services/store';
import { Sun, Moon, Monitor, Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const { theme, setTheme, firebaseUser, userProfile } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Product', path: '/' },
    { label: 'Features', path: '/features' },
    { label: 'Channels', path: '/channels' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'About', path: '/about' },
    { label: 'FAQ', path: '/faq' },
  ];

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg p-1"
        >
          <SocialDominusLogo size={34} />
          <div className="text-left">
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-violet-500 via-indigo-500 to-sky-400 bg-clip-text text-transparent">
              SOCIAL DOMINUS
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 -mt-1">
              Enterprise SaaS
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? 'text-violet-600 dark:text-violet-400 font-semibold bg-violet-50 dark:bg-violet-950/40'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={cycleTheme}
            aria-label={`Current theme: ${theme}. Click to switch theme.`}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={`Theme: ${theme}`}
          >
            {theme === 'dark' ? <Moon className="w-4 h-4 text-sky-400" /> : theme === 'light' ? <Sun className="w-4 h-4 text-amber-500" /> : <Monitor className="w-4 h-4" />}
          </button>

          {/* Customer / Owner Gateway */}
          <button
            onClick={() => navigate('/owner/dashboard')}
            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Owner Portal
          </button>

          {firebaseUser ? (
            <button
              onClick={() => navigate('/app/dashboard')}
              className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-600/20 transition-all"
            >
              <span>Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md shadow-violet-600/25 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start Free</span>
              </button>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                navigate(link.path);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                navigate('/owner/dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center px-3 py-2 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20"
            >
              Owner Control Center
            </button>
            <button
              onClick={() => {
                navigate('/app/dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center px-4 py-2.5 rounded-xl font-semibold bg-violet-600 text-white text-sm"
            >
              Open App Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
