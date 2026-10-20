import React from 'react';
import { PenSquare, Calendar, Sparkles, Inbox, BarChart3, Users, ShieldCheck, ArrowRight } from 'lucide-react';

interface SimplePageProps {
  navigate: (path: string) => void;
}

export const FeaturesPage: React.FC<SimplePageProps> = ({ navigate }) => {
  const featuresList = [
    {
      icon: PenSquare,
      title: 'Unified Multi-Platform Composer',
      desc: 'Author once, customize per network. Live character counting, platform formatting, hashtags, and media aspect-ratio checks prevent publishing errors.',
    },
    {
      icon: Calendar,
      title: 'Visual Planner & Dynamic Queue',
      desc: 'Month, week, and day calendar layouts with color-coded status badges. Easily drag-and-drop or reschedule queued content across peak engagement slots.',
    },
    {
      icon: Sparkles,
      title: 'AI Content Studio & Brand Voices',
      desc: 'Generate viral hooks, platform variants, and tone rewrites while adhering to custom brand guidelines and avoiding prohibited vocabulary.',
    },
    {
      icon: Inbox,
      title: 'Unified Social Community Inbox',
      desc: 'Consolidate comments, direct messages, and brand mentions from all 15 networks into a single responsive support desk with internal notes.',
    },
    {
      icon: BarChart3,
      title: 'Deep Analytics & Cross-Channel Reporting',
      desc: 'Track reach, engagement rate, impression trends, and audience growth across networks with exportable client-ready PDF and CSV reports.',
    },
    {
      icon: Users,
      title: 'Agency Collaboration & Approval Gates',
      desc: 'Protect brand reputation with multi-tiered team roles (Owner, Editor, Contributor, Analyst) and strict submission-to-approval workflows.',
    },
  ];

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Engineered for Publishing Velocity
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
          Everything creators, agencies, and enterprise social teams require to scale without chaos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresList.map((f, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold">
              <f.icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">{f.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center pt-8">
        <button
          onClick={() => navigate('/signup')}
          className="px-8 py-3.5 rounded-2xl font-bold text-sm bg-violet-600 hover:bg-violet-500 text-white shadow-xl shadow-violet-600/30 inline-flex items-center gap-2"
        >
          <span>Experience Social Dominus Free</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const AboutPage: React.FC<SimplePageProps> = ({ navigate }) => (
  <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 space-y-8">
    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
      About Social Dominus
    </h1>
    <div className="prose dark:prose-invert text-sm sm:text-base space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
      <p>
        Social Dominus was engineered to solve fragmentation in contemporary social operations. Today's brands cannot afford to log into 8 separate tools, juggle disconnected billing systems, or deal with low-contrast interfaces designed for consumer hobbies rather than professional operations.
      </p>
      <p>
        Built on a modern microservices architecture with Firebase Cloud persistence, Social Dominus brings clarity, speed, and mathematical consistency to social publishing.
      </p>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white pt-4">Our Core Directives</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Truth in Integration:</strong> We never disguise simulated data as verified platform metrics.</li>
        <li><strong>Single Source of Pricing:</strong> Entitlements and pricing are synchronized globally across public marketing, checkout, and administrative consoles.</li>
        <li><strong>Accessibility First:</strong> Designed to satisfy WCAG 2.2 AA standards with full light and dark mode parity.</li>
      </ul>
    </div>
  </div>
);

export const LegalPage: React.FC<{ type: 'privacy' | 'terms' | 'faq' }> = ({ type }) => {
  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white capitalize">
        {type === 'privacy' ? 'Privacy Notice & Data Governance' : type === 'terms' ? 'Commercial Terms of Service' : 'Platform Security & FAQ'}
      </h1>
      <p className="text-xs text-slate-400">Last updated: October 2026 • Social Dominus Legal Compliance</p>
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed">
        <p>
          Social Dominus protects customer content and social channel credentials with industry-grade attribute-based access control (ABAC). We do not sell user data or feed private customer drafts into public AI models.
        </p>
        <p>
          All 14-day free trials allow complete evaluation of platform capabilities with no automatic billing obligation unless explicitly authorized by the account holder.
        </p>
        <p>
          For regulatory inquiries, compliance audits, or account deletion requests, users can submit requests directly from their customer settings portal.
        </p>
      </div>
    </div>
  );
};
