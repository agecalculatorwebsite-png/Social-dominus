import React from 'react';
import { SocialDominusLogo } from '../icons/SocialIcons';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="col-span-2">
            <div className="flex items-center gap-3">
              <SocialDominusLogo size={32} />
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                SOCIAL DOMINUS
              </span>
            </div>
            <p className="mt-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Every Social Channel. One Command Center. Purpose-built SaaS for high-growth creators, marketing teams, agencies, and enterprise brands.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All 15 Social Gateways Operational</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Product
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><button onClick={() => navigate('/app/dashboard')} className="hover:text-violet-500">Command Center</button></li>
              <li><button onClick={() => navigate('/app/planner')} className="hover:text-violet-500">Visual Planner</button></li>
              <li><button onClick={() => navigate('/app/compose')} className="hover:text-violet-500">Multi-Channel Composer</button></li>
              <li><button onClick={() => navigate('/app/ai-studio')} className="hover:text-violet-500">AI Content Studio</button></li>
              <li><button onClick={() => navigate('/channels')} className="hover:text-violet-500">15 Supported Networks</button></li>
              <li><button onClick={() => navigate('/app/analytics')} className="hover:text-violet-500">Unified Analytics</button></li>
            </ul>
          </div>

          {/* Solutions & SaaS */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><button onClick={() => navigate('/pricing')} className="hover:text-violet-500">Pricing & Plans</button></li>
              <li><button onClick={() => navigate('/app/workspaces')} className="hover:text-violet-500">Client Workspaces</button></li>
              <li><button onClick={() => navigate('/app/approvals')} className="hover:text-violet-500">Approval Workflows</button></li>
              <li><button onClick={() => navigate('/app/reports')} className="hover:text-violet-500">White-Label Reports</button></li>
              <li><button onClick={() => navigate('/owner/dashboard')} className="hover:text-amber-500 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Owner Portal</button></li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Governance
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><button onClick={() => navigate('/privacy')} className="hover:text-violet-500">Privacy Notice</button></li>
              <li><button onClick={() => navigate('/terms')} className="hover:text-violet-500">Terms of Service</button></li>
              <li><button onClick={() => navigate('/faq')} className="hover:text-violet-500">Security & FAQ</button></li>
              <li><button onClick={() => navigate('/about')} className="hover:text-violet-500">Architecture & Vision</button></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Social Dominus SaaS. Commercial Social Media Management. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for marketing professionals & agencies.
          </p>
        </div>
      </div>
    </footer>
  );
};
