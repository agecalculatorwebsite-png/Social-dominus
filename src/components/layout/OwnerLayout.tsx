import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { SocialDominusLogo } from '../icons/SocialIcons';
import {
  ShieldAlert,
  Users,
  CreditCard,
  Tag,
  Receipt,
  Layers,
  Activity,
  History,
  Settings,
  ArrowLeft,
  Sun,
  Moon,
  Monitor,
  Menu,
  X,
  TrendingUp,
} from 'lucide-react';

interface OwnerLayoutProps {
  currentPath: string;
  navigate: (path: string) => void;
  children: React.ReactNode;
}

export const OwnerLayout: React.FC<OwnerLayoutProps> = ({ currentPath, navigate, children }) => {
  const { theme, setTheme, customers } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  };

  const navItems = [
    { label: 'Executive Metrics', path: '/owner/dashboard', icon: TrendingUp },
    { label: 'Customer Management', path: '/owner/customers', icon: Users },
    { label: 'Plans & Pricing', path: '/owner/plans', icon: CreditCard },
    { label: 'Coupons & Promos', path: '/owner/coupons', icon: Tag },
    { label: 'Payments & Invoices', path: '/owner/payments', icon: Receipt },
    { label: 'Quota & Usage', path: '/owner/usage', icon: Layers },
    { label: 'Integrations & Cloud', path: '/owner/integrations', icon: Activity },
    { label: 'Audit Trail', path: '/owner/audit-log', icon: History },
    { label: 'Owner Settings', path: '/owner/settings', icon: Settings },
  ];

  const totalMrr = customers.reduce((sum, c) => sum + (c.isSuspended ? 0 : c.mrr), 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      {/* Top Banner */}
      <div className="bg-amber-600/90 text-slate-950 font-bold text-xs py-1.5 px-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>SOCIAL DOMINUS OWNER CONTROL CENTER — Superuser Administrative Privileges Active</span>
        </div>
        <button
          onClick={() => navigate('/app/dashboard')}
          className="flex items-center gap-1 hover:underline text-xs shrink-0 font-extrabold"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Customer App
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800 bg-slate-950 shrink-0">
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800">
            <button onClick={() => navigate('/')} className="flex items-center gap-2.5">
              <SocialDominusLogo size={28} />
              <div className="text-left">
                <span className="font-extrabold text-sm tracking-tight text-white">OWNER PORTAL</span>
                <span className="block text-[9px] text-amber-400 font-bold uppercase tracking-wider">
                  Live MRR: ${totalMrr.toLocaleString()}
                </span>
              </div>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={() => navigate('/app/dashboard')}
              className="flex items-center gap-1.5 hover:text-amber-400 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Exit to App
            </button>
            <button
              onClick={cycleTheme}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              {theme === 'dark' ? <Moon className="w-4 h-4 text-sky-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </button>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Header */}
          <header className="h-16 px-4 sm:px-6 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Tenant Isolation: Global Master View
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/owner/plans')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
              >
                Edit Pricing & Tiers
              </button>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-72 bg-slate-950 h-full flex flex-col z-10 p-4 border-r border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="font-extrabold text-sm text-amber-400">OWNER CONTROL CENTER</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium ${
                    currentPath === item.path ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
