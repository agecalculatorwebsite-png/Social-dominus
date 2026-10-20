import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { PLATFORM_CONFIG } from '../../components/icons/SocialIcons';
import { calculateAnnualSavings } from '../../logic/pricing';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  BarChart3,
  Users,
  ShieldCheck,
  Zap,
  Globe2,
  Clock,
  ChevronDown,
  ChevronUp,
  Inbox,
  PenSquare,
} from 'lucide-react';

interface LandingPageProps {
  navigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ navigate }) => {
  const { plans, firebaseUser } = useAppStore();
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('yearly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Social Dominus connect to 15 different social networks?',
      a: 'Social Dominus integrates with official platform APIs and OAuth gateways. You can securely authenticate Facebook, Instagram, X (Twitter), LinkedIn, YouTube, TikTok, Threads, Pinterest, Bluesky, Mastodon, Telegram, and more from one central dashboard.',
    },
    {
      q: 'Is there really a 14-day free trial without a credit card?',
      a: 'Yes. All paid tiers (Starter, Growth, Agency) include a full 14-day evaluation trial with zero credit card required upfront. You can also stay on our permanent Free tier with up to 3 channel slots.',
    },
    {
      q: 'Can marketing agencies manage multiple client workspaces separately?',
      a: 'Absolutely. The Growth and Agency plans feature isolated client workspaces with custom timezones, separate social channels, dedicated approval gates, and white-label reporting.',
    },
    {
      q: 'How does the AI Content Studio assist social media publishing?',
      a: 'The AI Studio writes platform-tailored post variants, brainstorms viral hooks, translates captions, and refines your tone while strictly obeying character limits for each destination network.',
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-8 text-center max-w-5xl mx-auto px-4">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-violet-600/20 via-sky-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 dark:bg-violet-950/60 border border-violet-500/20 text-violet-700 dark:text-violet-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Social Publishing Platform 2026</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
          Every Social Channel.{' '}
          <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-sky-400 bg-clip-text text-transparent">
            One Command Center.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Create smarter content, schedule with confidence, collaborate seamlessly, and understand your social media performance from one powerful workspace.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => navigate(firebaseUser ? '/app/dashboard' : '/signup')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-xl shadow-violet-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <span>Start Free — 14-Day Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/app/dashboard')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-semibold text-sm bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300/80 dark:border-slate-700/80 transition-all"
          >
            Explore the Platform
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card required
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cancel anytime
          </div>
          <div className="flex items-center gap-1.5 hidden sm:flex">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 15 Native channels
          </div>
        </div>

        {/* Realistic Interactive Preview UI */}
        <div className="mt-14 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-4 sm:p-6 text-left max-w-4xl mx-auto overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-2 text-xs font-semibold text-slate-400">Social Dominus — Unified Queue Preview</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 px-2 py-0.5 rounded">
              America/New_York (EST)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Scheduled card */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-sky-500">Today • 2:30 PM</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold text-[10px]">
                  Approved
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-200 font-medium">
                "Unveiling our 2026 SaaS Growth Playbook: How unified social publishing cuts marketing overhead by 40%."
              </p>
              <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-400">Destinations:</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100">X (Twitter) + LinkedIn</span>
              </div>
            </div>

            {/* AI Generator snippet */}
            <div className="p-4 rounded-xl border border-violet-500/30 bg-violet-500/5 space-y-3">
              <div className="flex items-center justify-between text-xs text-violet-600 dark:text-violet-400 font-semibold">
                <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> AI Studio Output</span>
                <span className="text-[10px] bg-violet-500/20 px-1.5 py-0.5 rounded">Hook Generated</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-200">
                "Stop juggling 7 different social tools. Scale your brand across 15 platforms in minutes, not hours."
              </p>
              <div className="pt-2 text-[10px] text-violet-500 font-bold flex items-center justify-between">
                <span>Character Count: 142/280</span>
                <span>Ready to Schedule →</span>
              </div>
            </div>

            {/* Analytics metric */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Weekly Impressions</span>
                <span className="text-emerald-500 font-bold">+28.4%</span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                384,200
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-violet-600 to-sky-400 h-2 rounded-full" style={{ width: '78%' }} />
              </div>
              <div className="text-[10px] text-slate-400">Across 6 connected social channels</div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2">
            Multi-Platform Mastery
          </h2>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            15 Official Networks Connected in One Place
          </h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Publish simultaneously or craft tailored caption variants respecting each platform's distinct character limits and audience norms.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {Object.entries(PLATFORM_CONFIG).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <div
                key={key}
                onClick={() => navigate('/channels')}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-violet-500/50 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-xl ${config.bgColor} border ${config.borderColor} group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {config.maxChars.toLocaleString()} chars
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-violet-500 transition-colors">
                    {config.name}
                  </h4>
                  <span className="text-[10px] text-slate-500 block">{config.category}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Pillar: Unified Publishing & Composer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500/10 text-sky-500 text-xs font-bold mb-4">
              <PenSquare className="w-3.5 h-3.5" /> Multi-Platform Composer
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              One Draft. Tailored Variants for Every Feed.
            </h3>
            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              No more copying and pasting between tabs. Social Dominus lets you author one core idea, then customize hashtags for Instagram, thread structure for X, and professional tone for LinkedIn—all in a synchronized split-screen editor.
            </p>

            <ul className="mt-6 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                <span>Live real-time character count monitors per destination network.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                <span>Smart Queue slots automatically dispatch posts at optimal engagement hours.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                <span>CSV Bulk scheduling importer for staging weeks of content in seconds.</span>
              </li>
            </ul>

            <button
              onClick={() => navigate('/app/compose')}
              className="mt-8 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-2 shadow-lg shadow-violet-600/20 transition-all"
            >
              <span>Test the Composer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
              <span className="font-bold text-white">Live Cross-Platform Preview</span>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-400 font-semibold text-[10px]">Twitter / X</span>
                <span className="px-2 py-0.5 rounded bg-pink-950 text-pink-400 font-semibold text-[10px]">Instagram</span>
                <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 font-semibold text-[10px]">LinkedIn</span>
              </div>
            </div>

            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <span className="font-bold text-xs text-white block">Social Dominus SaaS</span>
                  <span className="text-[10px] text-slate-400">@socialdominus • 1m</span>
                </div>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Consistency beats viral spikes every time. Here is the daily scheduling routine our marketing department follows to maintain 10M monthly impressions across 15 networks. 🧵👇
              </p>
              <div className="rounded-lg bg-slate-900 p-3 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Media Attachment: playbook_infographic.png</span>
                <span className="text-violet-400 font-bold">Valid Aspect Ratio (16:9)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Commercial Plans Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2">
            Transparent Pricing
          </h2>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Plans Built for Individual Creators to Global Agencies
          </h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            Switch intervals anytime. All paid plans include a 14-day zero-risk trial.
          </p>

          {/* Monthly / Yearly Switcher */}
          <div className="mt-6 inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setBillingInterval('monthly')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                billingInterval === 'monthly'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingInterval('yearly')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingInterval === 'yearly'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-sky-400 text-slate-950 font-black">SAVE 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.slice(0, 4).map((plan) => {
            const savings = calculateAnnualSavings(plan.monthlyPrice, plan.annualPrice);
            const isYearly = billingInterval === 'yearly';
            const displayPrice = isYearly ? savings.monthlyEquivalent : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between border transition-all ${
                  plan.isRecommended
                    ? 'border-violet-500 bg-gradient-to-b from-violet-500/10 via-white dark:via-slate-900 to-white dark:to-slate-900 shadow-xl shadow-violet-500/10 ring-2 ring-violet-500/40'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60'
                }`}
              >
                {plan.isRecommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-violet-600 text-white text-[10px] font-black uppercase tracking-wider shadow">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">{plan.name}</h4>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[32px]">{plan.tagline}</p>

                  <div className="mt-5 mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                        ${displayPrice}
                      </span>
                      <span className="text-xs text-slate-500">/month</span>
                    </div>
                    {isYearly && plan.annualPrice > 0 ? (
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">
                        Billed annually at ${plan.annualPrice}/yr (Save ${savings.totalSaved})
                      </p>
                    ) : (
                      <p className="text-[11px] text-slate-400 mt-1">Billed on a monthly basis</p>
                    )}
                  </div>

                  <div className="py-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Channels:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">Up to {plan.channelLimit}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Workspaces:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{plan.workspaceLimit}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">AI Credits:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{plan.aiCreditsMonthly}/mo</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Features</span>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-violet-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => navigate(plan.id === 'free' ? '/signup' : `/app/billing`)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                      plan.isRecommended
                        ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/30'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
                    }`}
                  >
                    {plan.id === 'free' ? 'Get Started Free' : 'Start 14-Day Free Trial'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2">
            Frequently Asked Questions
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Everything you need to know about Social Dominus
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-4 h-4 text-violet-500" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-3 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="rounded-3xl bg-gradient-to-tr from-violet-900 via-indigo-900 to-slate-950 border border-violet-700/40 p-8 sm:p-14 text-white shadow-2xl space-y-6">
          <h3 className="text-3xl sm:text-5xl font-black tracking-tight">
            Ready to Dominate Your Social Publishing?
          </h3>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Join thousands of forward-thinking creators and multi-brand agencies publishing smarter across 15 networks with Social Dominus.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/signup')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-white text-slate-950 hover:bg-slate-100 shadow-xl transition-all"
            >
              Start Your Free 14-Day Trial
            </button>
            <button
              onClick={() => navigate('/app/dashboard')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm bg-violet-800/60 hover:bg-violet-700/60 border border-violet-600/50 text-white transition-all"
            >
              View Live Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
