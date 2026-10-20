import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { applyCoupon, calculateAnnualSavings, Coupon } from '../../logic/pricing';
import { PlanTier, BillingInterval } from '../../types';
import {
  CreditCard,
  CheckCircle2,
  Download,
  ShieldCheck,
  AlertCircle,
  Tag,
  ArrowRight,
  Layers,
  Sparkles,
} from 'lucide-react';

export const BillingView: React.FC<{ navigate: (path: string) => void }> = () => {
  const { userProfile, plans, invoices, subscribeToPlan } = useAppStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<PlanTier>(userProfile.planId);
  const [interval, setInterval] = useState<BillingInterval>(userProfile.planInterval);
  const [couponCode, setCouponCode] = useState('');
  const [couponResult, setCouponResult] = useState<{ discountAmount: number; finalPrice: number } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const currentPlan = plans.find((p) => p.id === userProfile.planId) || plans[1];
  const targetPlan = plans.find((p) => p.id === selectedPlanId) || currentPlan;

  const basePrice = interval === 'yearly' ? targetPlan.annualPrice : targetPlan.monthlyPrice;

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    const mockCoupon: Coupon = {
      code: 'LAUNCH25',
      discountType: 'percentage',
      discountValue: 25,
      applicablePlans: ['starter', 'growth', 'agency', 'enterprise'],
    };

    if (couponCode.toUpperCase() === 'LAUNCH25') {
      const res = applyCoupon(basePrice, mockCoupon, targetPlan.id);
      setCouponResult({ discountAmount: res.discountAmount, finalPrice: res.finalPrice });
      setCouponError(null);
    } else {
      setCouponError('Invalid coupon code. Try "LAUNCH25" for 25% off.');
      setCouponResult(null);
    }
  };

  const handleConfirmSubscription = () => {
    subscribeToPlan(selectedPlanId, interval);
    setModalOpen(false);
    setSuccessMessage(`Subscription updated to ${targetPlan.name} tier (${interval}).`);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-violet-500" />
            Subscription & Entitlements
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your tier, upgrade quotas, review invoice receipts, and apply promotional coupons.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-1.5 shadow"
        >
          <span>Change Subscription Plan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Current Plan Overview Card */}
      <div className="rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-950/30 via-slate-900 to-indigo-950/30 p-6 sm:p-8 space-y-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-violet-500/20 pb-5">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-violet-400 block mb-1">
              Active Tier
            </span>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-black text-white">{currentPlan.name} Plan</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold uppercase tracking-wider border border-emerald-500/30">
                {userProfile.subscriptionStatus}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Billed {userProfile.planInterval === 'yearly' ? 'annually' : 'monthly'} • Next renewal simulated in 30 days.
            </p>
          </div>

          <div className="text-right">
            <span className="text-3xl font-black text-white">
              ${userProfile.planInterval === 'yearly' ? currentPlan.annualPrice : currentPlan.monthlyPrice}
            </span>
            <span className="text-xs text-slate-400">/{userProfile.planInterval === 'yearly' ? 'yr' : 'mo'}</span>
          </div>
        </div>

        {/* Quota Progress Trackers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Social Channel Slots</span>
              <span className="text-violet-400">6 / {currentPlan.channelLimit} Used</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-violet-500 h-full rounded-full"
                style={{ width: `${Math.min(100, (6 / currentPlan.channelLimit) * 100)}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Workspaces</span>
              <span className="text-violet-400">3 / {currentPlan.workspaceLimit} Used</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-sky-400 h-full rounded-full"
                style={{ width: `${Math.min(100, (3 / currentPlan.workspaceLimit) * 100)}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Monthly AI Credits</span>
              <span className="text-violet-400">120 / {currentPlan.aiCreditsMonthly} Used</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full"
                style={{ width: `${Math.min(100, (120 / currentPlan.aiCreditsMonthly) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Invoice History */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Billing History & Invoices</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                <th className="pb-3">Invoice #</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Plan Description</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 font-mono font-bold text-violet-500">{inv.number}</td>
                  <td className="py-3 text-slate-500">{inv.date}</td>
                  <td className="py-3 font-medium">{inv.planName}</td>
                  <td className="py-3 font-bold">${inv.amount.toFixed(2)} USD</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500 uppercase">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => alert(`Simulated receipt download for ${inv.number}`)}
                      className="text-violet-600 dark:text-violet-400 font-bold hover:underline flex items-center gap-1 justify-end ml-auto"
                    >
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Change Plan / Checkout Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Configure Subscription Plan</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white text-xs">
                Cancel
              </button>
            </div>

            {/* Interval selector */}
            <div className="flex items-center justify-center gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => setInterval('monthly')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  interval === 'monthly' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
                }`}
              >
                Monthly Interval
              </button>
              <button
                type="button"
                onClick={() => setInterval('yearly')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  interval === 'yearly' ? 'bg-violet-600 text-white shadow-xs' : 'text-slate-500'
                }`}
              >
                Annual Billing (Save ~20%)
              </button>
            </div>

            {/* Plan Cards selection */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Select Destination Tier
              </label>
              <div className="grid grid-cols-2 gap-2">
                {plans.map((p) => {
                  const isSelected = selectedPlanId === p.id;
                  const price = interval === 'yearly' ? p.annualPrice : p.monthlyPrice;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setSelectedPlanId(p.id as PlanTier);
                        setCouponResult(null);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-300 ring-2 ring-violet-500/20'
                          : 'border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs">{p.name}</span>
                        <span className="font-black text-xs">${price}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">{p.channelLimit} channels • {p.workspaceLimit} ws</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Coupon Code input */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Promotional Coupon Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code (e.g. LAUNCH25)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white uppercase font-mono"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-[11px] text-rose-500">{couponError}</p>}
              {couponResult && (
                <p className="text-[11px] text-emerald-500 font-bold">
                  ✓ LAUNCH25 applied: ${couponResult.discountAmount} discount deducted!
                </p>
              )}
            </div>

            {/* Price breakdown */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-500">
                <span>Base Tier Price:</span>
                <span>${basePrice.toFixed(2)}</span>
              </div>
              {couponResult && (
                <div className="flex justify-between text-emerald-500 font-bold">
                  <span>Promotional Discount:</span>
                  <span>-${couponResult.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-slate-900 dark:text-white pt-1 border-t border-slate-200 dark:border-slate-700 text-sm">
                <span>Final Payable Today:</span>
                <span className="text-violet-500">
                  ${(couponResult ? couponResult.finalPrice : basePrice).toFixed(2)} USD
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSubscription}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white shadow-md"
              >
                Confirm Plan Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
