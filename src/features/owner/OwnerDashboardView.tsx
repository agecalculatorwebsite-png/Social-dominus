import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import {
  TrendingUp,
  Users,
  CreditCard,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  ShieldAlert,
  BarChart2,
  Calendar,
} from 'lucide-react';

export const OwnerDashboardView: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { customers, plans, auditLogs } = useAppStore();

  const totalMrr = customers.reduce((sum, c) => sum + (c.isSuspended ? 0 : c.mrr), 0);
  const totalArr = totalMrr * 12;
  const payingSubscribers = customers.filter((c) => c.subscriptionStatus === 'active').length;
  const trialingUsers = customers.filter((c) => c.subscriptionStatus === 'trialing').length;
  const freeUsers = customers.filter((c) => c.subscriptionStatus === 'free').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-amber-500" />
            Executive Revenue & SaaS Portfolio Metrics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Authoritative real-time aggregation across customer subscriptions, trials, and platform quotas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/owner/plans')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow"
          >
            Edit Central Pricing
          </button>
        </div>
      </div>

      {/* 4 Primary Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950 shadow-md space-y-1">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Monthly Recurring (MRR)</span>
          <div className="text-3xl font-black text-white">${totalMrr.toLocaleString()}</div>
          <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +24% vs last quarter
          </span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950 shadow-md space-y-1">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Annual Run Rate (ARR)</span>
          <div className="text-3xl font-black text-amber-400">${totalArr.toLocaleString()}</div>
          <span className="text-[11px] text-slate-400 font-semibold">Normalized annualized contracts</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950 shadow-md space-y-1">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Paying Customers</span>
          <div className="text-3xl font-black text-white">{payingSubscribers}</div>
          <span className="text-[11px] text-sky-400 font-bold">{trialingUsers} on 14-day trials</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950 shadow-md space-y-1">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Trial Conversion Rate</span>
          <div className="text-3xl font-black text-emerald-400">28.4%</div>
          <span className="text-[11px] text-slate-400 font-semibold">Industry avg: 18-22%</span>
        </div>
      </div>

      {/* Revenue Trajectory & Plan Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Revenue Curve */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white">Monthly MRR Growth Trajectory</h3>
              <p className="text-xs text-slate-400">Subscription revenue expansion over past 6 months</p>
            </div>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Profitable
            </span>
          </div>

          <div className="h-44 flex items-end gap-3 pt-6 pb-2 border-b border-slate-800">
            {[
              { month: 'May 2026', mrr: 120 },
              { month: 'Jun 2026', mrr: 190 },
              { month: 'Jul 2026', mrr: 260 },
              { month: 'Aug 2026', mrr: 310 },
              { month: 'Sep 2026', mrr: 380 },
              { month: 'Oct 2026 (Now)', mrr: totalMrr },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div
                  className="w-full max-w-[36px] bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-md transition-all group-hover:brightness-125"
                  style={{ height: `${Math.min(130, col.mrr * 0.3)}px` }}
                />
                <span className="text-[10px] font-bold text-slate-400 truncate">{col.month.split(' ')[0]}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>May: $120 MRR</span>
            <span>Current: ${totalMrr} MRR</span>
            <span className="text-emerald-400 font-bold">+228% Net ARR Expansion</span>
          </div>
        </div>

        {/* Right Column (1 col): Plan Distribution */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
          <h3 className="font-extrabold text-sm text-white">Subscriber Plan Breakdown</h3>
          <p className="text-xs text-slate-400">Customer distribution across configured pricing tiers</p>

          <div className="space-y-3 pt-2 text-xs">
            {plans.map((p) => {
              const count = customers.filter((c) => c.planId === p.id).length;
              const percent = Math.round((count / customers.length) * 100);
              return (
                <div key={p.id} className="space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-200">{p.name} Plan</span>
                    <span className="text-amber-400">{count} users ({percent}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Administrative Audit Activity */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-white">Recent Security & Administrative Actions</h3>
          <button
            onClick={() => navigate('/owner/audit-log')}
            className="text-xs font-bold text-amber-400 hover:underline"
          >
            View Full Audit Trail
          </button>
        </div>

        <div className="space-y-2.5">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between gap-4 text-xs"
            >
              <div>
                <span className="font-bold text-white block">{log.action}</span>
                <span className="text-slate-400">{log.details}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] text-amber-400 font-mono block">{log.actor}</span>
                <span className="text-[10px] text-slate-500">{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
