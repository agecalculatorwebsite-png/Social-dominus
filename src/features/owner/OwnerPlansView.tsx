import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { PricingPlan } from '../../logic/pricing';
import { CreditCard, Edit2, CheckCircle2, ShieldCheck, ArrowRight, Save } from 'lucide-react';

export const OwnerPlansView: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { plans, updatePlanPrice } = useAppStore();
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [monthlyInput, setMonthlyInput] = useState<number>(0);
  const [annualInput, setAnnualInput] = useState<number>(0);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const startEdit = (p: PricingPlan) => {
    setEditingPlanId(p.id);
    setMonthlyInput(p.monthlyPrice);
    setAnnualInput(p.annualPrice);
  };

  const saveEdit = (planId: string) => {
    updatePlanPrice(planId, Number(monthlyInput), Number(annualInput));
    setEditingPlanId(null);
    setSuccessToast(`Plan "${planId.toUpperCase()}" updated in central registry! Public marketing & checkout synced.`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-amber-500" />
            Central Plan & Pricing Registry
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Single Source of Truth: Edits made here immediately propagate to the public marketing site, billing portals, and checkout screens.
          </p>
        </div>

        <button
          onClick={() => navigate('/pricing')}
          className="px-3.5 py-1.5 rounded-xl text-xs font-bold border border-slate-700 hover:bg-slate-800 text-slate-200 flex items-center gap-1.5"
        >
          <span>Preview Public Pricing Page</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isEditing = editingPlanId === plan.id;

          return (
            <div
              key={plan.id}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-white">{plan.name} Tier</h3>
                    <span className="text-[10px] text-slate-400 font-mono">ID: {plan.id}</span>
                  </div>
                  {plan.isRecommended && (
                    <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-500 text-slate-950">
                      Recommended
                    </span>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-3 p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Monthly Price ($USD)
                      </label>
                      <input
                        type="number"
                        value={monthlyInput}
                        onChange={(e) => setMonthlyInput(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Annual Price ($USD/year)
                      </label>
                      <input
                        type="number"
                        value={annualInput}
                        onChange={(e) => setAnnualInput(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-white font-bold"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Monthly Price:</span>
                      <span className="font-black text-white">${plan.monthlyPrice}/mo</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Annual Price:</span>
                      <span className="font-black text-amber-400">${plan.annualPrice}/year</span>
                    </div>
                  </div>
                )}

                <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Channel Slots:</span>
                    <span className="font-bold text-white">{plan.channelLimit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Workspaces:</span>
                    <span className="font-bold text-white">{plan.workspaceLimit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Team Seats:</span>
                    <span className="font-bold text-white">{plan.teamSeatLimit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">AI Monthly Credits:</span>
                    <span className="font-bold text-white">{plan.aiCreditsMonthly}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end">
                {isEditing ? (
                  <div className="flex gap-2 w-full">
                    <button
                      type="button"
                      onClick={() => setEditingPlanId(null)}
                      className="flex-1 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => saveEdit(plan.id)}
                      className="flex-1 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center gap-1"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Changes
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => startEdit(plan)}
                    className="w-full py-2 rounded-xl text-xs font-bold border border-slate-700 hover:bg-slate-800 text-slate-200 flex items-center justify-center gap-1.5"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>Edit Tier Pricing</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
