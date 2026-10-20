import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { calculateAnnualSavings } from '../../logic/pricing';
import { CheckCircle2, HelpCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface PricingPageProps {
  navigate: (path: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ navigate }) => {
  const { plans, userProfile } = useAppStore();
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Simple, Predictable Plans for Every Stage
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
          No hidden fees, no per-platform add-ons. Connect all 15 social networks with transparent pricing.
        </p>

        {/* Toggle */}
        <div className="mt-8 inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setBillingInterval('monthly')}
            className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              billingInterval === 'monthly'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingInterval('yearly')}
            className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              billingInterval === 'yearly'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Annual Billing</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-sky-300 text-slate-950 font-black">SAVE ~20%</span>
          </button>
        </div>
      </div>

      {/* Plans Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
        {plans.map((plan) => {
          const savings = calculateAnnualSavings(plan.monthlyPrice, plan.annualPrice);
          const isYearly = billingInterval === 'yearly';
          const displayPrice = isYearly ? savings.monthlyEquivalent : plan.monthlyPrice;
          const isCurrent = userProfile.planId === plan.id;

          return (
            <div
              key={plan.id}
              className={`rounded-2xl p-5 sm:p-6 flex flex-col justify-between border transition-all ${
                plan.isRecommended
                  ? 'border-violet-500 bg-gradient-to-b from-violet-500/10 via-white dark:via-slate-900 to-white dark:to-slate-900 shadow-xl ring-2 ring-violet-500/30'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{plan.name}</h3>
                  {plan.isRecommended && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-violet-600 text-white font-black uppercase">
                      Popular
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-500 font-bold">
                      Your Tier
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 min-h-[32px]">{plan.tagline}</p>

                <div className="mt-4 mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">
                      ${displayPrice}
                    </span>
                    <span className="text-xs text-slate-500">/mo</span>
                  </div>
                  {isYearly && plan.annualPrice > 0 ? (
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                      ${plan.annualPrice} billed annually (Save ${savings.totalSaved})
                    </p>
                  ) : (
                    <p className="text-[10px] text-slate-400 mt-0.5">Billed monthly</p>
                  )}
                </div>

                <div className="py-2.5 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Channels:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{plan.channelLimit} slots</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Workspaces:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{plan.workspaceLimit}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Team Seats:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{plan.teamSeatLimit}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">AI Credits:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{plan.aiCreditsMonthly}/mo</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Highlights</span>
                  {plan.features.slice(0, 5).map((feat, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-violet-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3">
                <button
                  onClick={() => navigate(plan.id === 'free' ? '/signup' : '/app/billing')}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                    plan.isRecommended
                      ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
                  }`}
                >
                  {isCurrent ? 'Current Plan' : plan.id === 'free' ? 'Choose Free' : 'Start 14-Day Free Trial'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 overflow-x-auto shadow-md">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Detailed Entitlement Comparison</h3>
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
              <th className="pb-3 font-semibold">Capability</th>
              <th className="pb-3 font-semibold">Free</th>
              <th className="pb-3 font-semibold">Starter</th>
              <th className="pb-3 font-semibold text-violet-500 font-bold">Growth</th>
              <th className="pb-3 font-semibold">Agency</th>
              <th className="pb-3 font-semibold">Enterprise</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300">
            <tr>
              <td className="py-3 font-medium text-slate-900 dark:text-white">Supported Channels</td>
              <td className="py-3">Up to 3</td>
              <td className="py-3">Up to 5</td>
              <td className="py-3 font-bold text-violet-500">Up to 15</td>
              <td className="py-3">Up to 50</td>
              <td className="py-3">200+ Custom</td>
            </tr>
            <tr>
              <td className="py-3 font-medium text-slate-900 dark:text-white">Monthly Publishing Jobs</td>
              <td className="py-3">30 jobs</td>
              <td className="py-3">500 jobs</td>
              <td className="py-3 font-bold text-violet-500">2,000 jobs</td>
              <td className="py-3">5,000 jobs</td>
              <td className="py-3">Unlimited</td>
            </tr>
            <tr>
              <td className="py-3 font-medium text-slate-900 dark:text-white">AI Content Generation</td>
              <td className="py-3">20 credits</td>
              <td className="py-3">100 credits</td>
              <td className="py-3 font-bold text-violet-500">500 credits</td>
              <td className="py-3">2,000 credits</td>
              <td className="py-3">10,000+ credits</td>
            </tr>
            <tr>
              <td className="py-3 font-medium text-slate-900 dark:text-white">Multi-Client Workspaces</td>
              <td className="py-3">1 workspace</td>
              <td className="py-3">1 workspace</td>
              <td className="py-3 font-bold text-violet-500">3 workspaces</td>
              <td className="py-3">10 workspaces</td>
              <td className="py-3">50+ workspaces</td>
            </tr>
            <tr>
              <td className="py-3 font-medium text-slate-900 dark:text-white">Approval Workflows</td>
              <td className="py-3 text-slate-400">—</td>
              <td className="py-3 text-slate-400">—</td>
              <td className="py-3 text-emerald-500 font-bold">Included</td>
              <td className="py-3 text-emerald-500 font-bold">Included</td>
              <td className="py-3 text-emerald-500 font-bold">Custom Multi-Step</td>
            </tr>
            <tr>
              <td className="py-3 font-medium text-slate-900 dark:text-white">White-Label Reports</td>
              <td className="py-3 text-slate-400">—</td>
              <td className="py-3 text-slate-400">—</td>
              <td className="py-3 text-slate-400">—</td>
              <td className="py-3 text-emerald-500 font-bold">PDF & CSV Branded</td>
              <td className="py-3 text-emerald-500 font-bold">Fully Custom Domain</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
