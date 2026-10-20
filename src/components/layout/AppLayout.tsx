import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { SocialDominusLogo } from '../icons/SocialIcons';
import {
  LayoutDashboard,
  Calendar,
  Layers,
  PenSquare,
  Sparkles,
  FolderOpen,
  Inbox,
  BarChart3,
  FileSpreadsheet,
  Share2,
  Users,
  CheckSquare,
  Building2,
  CreditCard,
  Settings,
  ShieldAlert,
  Sun,
  Moon,
  Monitor,
  LogOut,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Plus,
} from 'lucide-react';

interface AppLayoutProps {
  currentPath: string;
  navigate: (path: string) => void;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ currentPath, navigate, children }) => {
  const {
    theme,
    setTheme,
    userProfile,
    firebaseUser,
    signOut,
    workspaces,
    currentWorkspace,
    setCurrentWorkspaceId,
    createWorkspace,
  } = useAppStore();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [newWsModalOpen, setNewWsModalOpen] = useState(false);
  const [newWsName, setNewWsName] = useState('');
  const [newWsIsClient, setNewWsIsClient] = useState(false);

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  };

  const navGroups = [
    {
      title: 'Workspace',
      items: [
        { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
        { label: 'Planner & Calendar', path: '/app/planner', icon: Calendar },
        { label: 'Publishing Queue', path: '/app/queue', icon: Layers },
        { label: 'Create Post', path: '/app/compose', icon: PenSquare, highlight: true },
      ],
    },
    {
      title: 'Content & AI',
      items: [
        { label: 'AI Content Studio', path: '/app/ai-studio', icon: Sparkles },
        { label: 'Content Library', path: '/app/library', icon: FolderOpen },
      ],
    },
    {
      title: 'Community',
      items: [
        { label: 'Unified Inbox', path: '/app/inbox', icon: Inbox },
      ],
    },
    {
      title: 'Insights',
      items: [
        { label: 'Analytics', path: '/app/analytics', icon: BarChart3 },
        { label: 'Reports', path: '/app/reports', icon: FileSpreadsheet },
      ],
    },
    {
      title: 'Manage',
      items: [
        { label: 'Social Channels', path: '/app/channels', icon: Share2 },
        { label: 'Team & Clients', path: '/app/team', icon: Users },
        { label: 'Approvals Queue', path: '/app/approvals', icon: CheckSquare },
        { label: 'Workspaces', path: '/app/workspaces', icon: Building2 },
      ],
    },
    {
      title: 'Account',
      items: [
        { label: 'Billing & Plan', path: '/app/billing', icon: CreditCard },
        { label: 'Settings', path: '/app/settings', icon: Settings },
      ],
    },
  ];

  const handleCreateWs = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWsName.trim()) {
      createWorkspace(newWsName.trim(), 'America/New_York (EST)', newWsIsClient);
      setNewWsName('');
      setNewWsIsClient(false);
      setNewWsModalOpen(false);
      setWorkspaceMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Demo Notification Banner */}
      <div className="bg-gradient-to-r from-violet-950 via-slate-900 to-indigo-950 text-white text-[11px] sm:text-xs py-1.5 px-4 border-b border-violet-800/40 flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <span className="px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 font-bold uppercase tracking-wider text-[9px] border border-violet-500/30">
            {firebaseUser ? 'Firebase Cloud Connected' : 'Demo Mode Active'}
          </span>
          <span className="truncate text-slate-300">
            {firebaseUser
              ? `Signed in as ${firebaseUser.email} • Cloud Firestore database active.`
              : 'Interactive prototype with full realistic data persistence. No live posts will be published.'}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-slate-400">
          <button
            onClick={() => navigate('/owner/dashboard')}
            className="hover:text-amber-400 font-medium transition-colors hidden sm:inline-flex items-center gap-1"
          >
            Owner Control Center <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/90 shrink-0">
          {/* Brand header */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 focus:outline-none"
            >
              <SocialDominusLogo size={28} />
              <div className="text-left">
                <span className="font-extrabold text-sm tracking-tight bg-gradient-to-r from-violet-500 to-sky-400 bg-clip-text text-transparent">
                  SOCIAL DOMINUS
                </span>
                <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  Command Center
                </span>
              </div>
            </button>
          </div>

          {/* Workspace Switcher dropdown */}
          <div className="p-3 border-b border-slate-200 dark:border-slate-800/60 relative">
            <button
              onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}
              className="w-full flex items-center justify-between p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors text-xs font-semibold"
            >
              <div className="truncate">
                <span className="text-[10px] text-slate-400 block font-normal">Active Workspace</span>
                <span className="truncate block text-slate-900 dark:text-white font-bold">{currentWorkspace.name}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
            </button>

            {workspaceMenuOpen && (
              <div className="absolute top-full left-3 right-3 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-30 p-1.5 space-y-1">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Switch Workspace
                </div>
                {workspaces.map((ws) => (
                  <button
                    key={ws.id}
                    onClick={() => {
                      setCurrentWorkspaceId(ws.id);
                      setWorkspaceMenuOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                      ws.id === currentWorkspace.id
                        ? 'bg-violet-600 text-white'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span className="truncate">{ws.name}</span>
                    {ws.isClientWorkspace && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-sky-500/20 text-sky-300">Client</span>
                    )}
                  </button>
                ))}
                <div className="pt-1 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => {
                      setNewWsModalOpen(true);
                      setWorkspaceMenuOpen(false);
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/40 flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    New Workspace...
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links Scrollable */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
            {navGroups.map((group) => (
              <div key={group.title}>
                <div className="px-2 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {group.title}
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive = currentPath === item.path;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-violet-600 text-white font-semibold shadow-sm shadow-violet-600/30'
                            : item.highlight
                            ? 'bg-gradient-to-r from-violet-500/10 to-indigo-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 font-semibold'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.highlight ? 'text-violet-500' : 'text-slate-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* User profile footer */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 relative">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 truncate">
                <img
                  src={userProfile.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt={userProfile.displayName}
                  className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-violet-500/30"
                />
                <div className="truncate text-left text-xs">
                  <span className="font-semibold block truncate text-slate-800 dark:text-slate-200">
                    {userProfile.displayName}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-medium">
                    {userProfile.planId} Tier
                  </span>
                </div>
              </div>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                aria-label="User account menu"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {userMenuOpen && (
              <div className="absolute bottom-full left-3 right-3 mb-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-30 p-1.5 space-y-1">
                <button
                  onClick={() => {
                    navigate('/app/settings');
                    setUserMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Account Settings
                </button>
                <button
                  onClick={() => {
                    navigate('/app/billing');
                    setUserMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  Subscription Billing
                </button>
                <button
                  onClick={() => {
                    navigate('/owner/dashboard');
                    setUserMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-amber-500 hover:bg-amber-500/10 flex items-center gap-2"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Owner Control Center
                </button>
                <div className="pt-1 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => {
                      signOut();
                      setUserMenuOpen(false);
                      navigate('/');
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Header Bar */}
          <header className="h-16 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Open sidebar menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {currentWorkspace.name}
                </span>
                <span className="hidden sm:inline-block text-xs text-slate-400">•</span>
                <span className="hidden sm:inline-block text-xs text-slate-500 dark:text-slate-400">
                  {currentWorkspace.timezone}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme toggle */}
              <button
                onClick={cycleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {theme === 'dark' ? <Moon className="w-4 h-4 text-sky-400" /> : theme === 'light' ? <Sun className="w-4 h-4 text-amber-500" /> : <Monitor className="w-4 h-4" />}
              </button>

              {/* Create Post CTA */}
              <button
                onClick={() => navigate('/app/compose')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md shadow-violet-600/20 transition-all"
              >
                <PenSquare className="w-3.5 h-3.5" />
                <span>Create Post</span>
              </button>
            </div>
          </header>

          {/* Page Content View */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-20 lg:pb-8">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav aria-label="Mobile navigation" className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around z-30 px-2">
        <button
          onClick={() => navigate('/app/dashboard')}
          aria-label="Dashboard"
          className={`flex flex-col items-center gap-1 text-[10px] font-medium ${
            currentPath === '/app/dashboard' ? 'text-violet-600 dark:text-violet-400 font-bold' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => navigate('/app/planner')}
          aria-label="Planner"
          className={`flex flex-col items-center gap-1 text-[10px] font-medium ${
            currentPath === '/app/planner' ? 'text-violet-600 dark:text-violet-400 font-bold' : 'text-slate-500'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>Planner</span>
        </button>
        <button
          onClick={() => navigate('/app/compose')}
          aria-label="Create Post"
          className="flex flex-col items-center -mt-5"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-violet-600/30">
            <PenSquare className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 mt-0.5">Create</span>
        </button>
        <button
          onClick={() => navigate('/app/inbox')}
          aria-label="Inbox"
          className={`flex flex-col items-center gap-1 text-[10px] font-medium ${
            currentPath === '/app/inbox' ? 'text-violet-600 dark:text-violet-400 font-bold' : 'text-slate-500'
          }`}
        >
          <Inbox className="w-5 h-5" />
          <span>Inbox</span>
        </button>
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="More navigation options"
          className="flex flex-col items-center gap-1 text-[10px] font-medium text-slate-500"
        >
          <Menu className="w-5 h-5" />
          <span>More</span>
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 max-w-[80vw] bg-white dark:bg-slate-900 h-full flex flex-col z-10 p-4 border-r border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <SocialDominusLogo size={28} />
                <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white">
                  SOCIAL DOMINUS
                </span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {navGroups.map((group) => (
                <div key={group.title}>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                    {group.title}
                  </div>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => {
                          navigate(item.path);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium ${
                          currentPath === item.path
                            ? 'bg-violet-600 text-white font-semibold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  navigate('/owner/dashboard');
                  setSidebarOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20"
              >
                Owner Control Center
              </button>
              <button
                onClick={() => {
                  signOut();
                  setSidebarOpen(false);
                  navigate('/');
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-rose-500"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Workspace Modal */}
      {newWsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Create New Workspace</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Isolate social accounts, team members, publishing queues, and analytics per brand or agency client.
            </p>
            <form onSubmit={handleCreateWs} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Workspace Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Media or Client Alpha"
                  value={newWsName}
                  onChange={(e) => setNewWsName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="clientCheck"
                  checked={newWsIsClient}
                  onChange={(e) => setNewWsIsClient(e.target.checked)}
                  className="rounded text-violet-600 focus:ring-violet-500"
                />
                <label htmlFor="clientCheck" className="text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                  Mark as Client Workspace (Agency feature)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewWsModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white"
                >
                  Create Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
