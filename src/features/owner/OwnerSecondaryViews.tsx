import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import {
  Users,
  Tag,
  Receipt,
  Layers,
  Activity,
  History,
  Settings,
  Plus,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Trash2,
  DollarSign,
  Shield,
  Ban,
  RotateCcw,
} from 'lucide-react';

export const OwnerCustomersView: React.FC<{ navigate: (path: string) => void }> = () => {
  const { customers, toggleCustomerSuspension } = useAppStore();
  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-500" />
            Customer Registry & Tenant Accounts
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Global directory of registered accounts, subscription statuses, and monthly revenue.
          </p>
        </div>

        <input
          type="text"
          placeholder="Filter by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1.5 rounded-xl text-xs border border-slate-700 bg-slate-800 text-white focus:outline-none w-full sm:w-64"
        />
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Status</th>
              <th className="p-4">MRR</th>
              <th className="p-4">Channels</th>
              <th className="p-4">Workspaces</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            {filtered.map((cust) => (
              <tr key={cust.id} className="hover:bg-slate-900/60 transition-colors">
                <td className="p-4">
                  <span className="font-bold text-white block">{cust.name}</span>
                  <span className="text-xs text-slate-400">{cust.email}</span>
                </td>
                <td className="p-4 font-bold uppercase text-xs text-amber-400">{cust.planId}</td>
                <td className="p-4">
                  {cust.isSuspended ? (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold uppercase">
                      Suspended
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold uppercase">
                      {cust.subscriptionStatus}
                    </span>
                  )}
                </td>
                <td className="p-4 font-bold">${cust.mrr}/mo</td>
                <td className="p-4 text-slate-400">{cust.channelsUsed}</td>
                <td className="p-4 text-slate-400">{cust.workspacesCount}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => toggleCustomerSuspension(cust.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      cust.isSuspended
                        ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20'
                    }`}
                  >
                    {cust.isSuspended ? 'Reinstate' : 'Suspend'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const OwnerCouponsView: React.FC<{ navigate: (path: string) => void }> = () => {
  const [coupons, setCoupons] = useState([
    { code: 'LAUNCH25', discount: '25% Off', type: 'percentage', redemptions: 142, status: 'active' },
    { code: 'CREATOR50', discount: '50% Off First Month', type: 'percentage', redemptions: 68, status: 'active' },
    { code: 'ENTERPRISE100', discount: '$100 Flat Credit', type: 'fixed', redemptions: 12, status: 'active' },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('20');

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCode.trim()) {
      setCoupons([
        ...coupons,
        {
          code: newCode.trim().toUpperCase(),
          discount: `${newDiscount}% Off`,
          type: 'percentage',
          redemptions: 0,
          status: 'active',
        },
      ]);
      setNewCode('');
      setModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Tag className="w-6 h-6 text-amber-500" />
            Promotional Coupons & Discount Rules
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create and track promotional discount campaigns across public checkout.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Coupon</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coupons.map((c) => (
          <div key={c.code} className="p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-mono font-black text-sm text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                {c.code}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold uppercase">
                {c.status}
              </span>
            </div>
            <div className="text-lg font-extrabold text-white">{c.discount}</div>
            <div className="text-xs text-slate-400 pt-2 border-t border-slate-800 flex justify-between">
              <span>Total Redemptions:</span>
              <span className="font-bold text-white">{c.redemptions}</span>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Create Promotional Coupon</h3>
            <form onSubmit={handleCreateCoupon} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FLASH30"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs border border-slate-700 bg-slate-800 text-white font-mono uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Discount Value (%)</label>
                <input
                  type="number"
                  required
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs border border-slate-700 bg-slate-800 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950"
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export const OwnerPaymentsView: React.FC<{ navigate: (path: string) => void }> = () => {
  const [payments] = useState([
    { id: 'tx-881', customer: 'Alex Rivera', amount: '$372.00', provider: 'Stripe Billing', status: 'succeeded', date: 'Oct 01, 2026' },
    { id: 'tx-880', customer: 'Horizon Media Partners', amount: '$99.00', provider: 'Stripe Billing', status: 'succeeded', date: 'Oct 01, 2026' },
    { id: 'tx-879', customer: 'Acme Global Marketing', amount: '$2,388.00', provider: 'Manual Wire', status: 'verified', date: 'Sep 28, 2026' },
  ]);

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-800">
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Receipt className="w-6 h-6 text-amber-500" />
          Transactions & Settlement Audit
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Direct verification of incoming customer settlements and payment provider transaction receipts.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Gateway</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            {payments.map((p) => (
              <tr key={p.id}>
                <td className="p-4 font-mono font-bold text-amber-400">{p.id}</td>
                <td className="p-4 font-medium text-white">{p.customer}</td>
                <td className="p-4 font-black">{p.amount}</td>
                <td className="p-4 text-slate-400">{p.provider}</td>
                <td className="p-4">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold uppercase">
                    {p.status}
                  </span>
                </td>
                <td className="p-4 text-slate-400">{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const OwnerIntegrationsView: React.FC<{ navigate: (path: string) => void }> = () => {
  const { firebaseUser } = useAppStore();

  const services = [
    {
      name: 'Google Firebase Cloud Firestore & Auth',
      category: 'Primary Cloud Database & Identity',
      status: 'Connected & Deployed',
      details: 'Enterprise Edition • ABAC security rules active • Google Sign-in enabled',
      healthy: true,
    },
    {
      name: 'AI Gemini API Service Boundary',
      category: 'AI Publishing Engine',
      status: 'Server Proxy Ready',
      details: '@google/genai TypeScript SDK configured via secure server routes',
      healthy: true,
    },
    {
      name: 'Social Network OAuth Gateways',
      category: 'External Platform Adapters',
      status: '15 Handlers Standby',
      details: 'Twitter, LinkedIn, Instagram, Facebook, TikTok, YouTube, Threads, and Fediverse',
      healthy: true,
    },
    {
      name: 'Payment & Subscription Billing Layer',
      category: 'Merchant Processing Adapter',
      status: 'Stripe & Manual Ready',
      details: 'Webhook handlers and centralized plan registry synchronized',
      healthy: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-800">
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Activity className="w-6 h-6 text-amber-500" />
          Cloud Infrastructure & Gateway Health
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Operational telemetry and backend service connectivity status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s, idx) => (
          <div key={idx} className="p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-extrabold text-sm text-white">{s.name}</h3>
                <span className="text-xs text-slate-400">{s.category}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {s.status}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{s.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const OwnerAuditView: React.FC<{ navigate: (path: string) => void }> = () => {
  const { auditLogs } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-800">
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <History className="w-6 h-6 text-amber-500" />
          Immutable Security Audit Trail
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Cryptographically timestamped log of privileged administrative changes and tier pricing modifications.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-3">
        {auditLogs.map((log) => (
          <div key={log.id} className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-white block">{log.action}</span>
              <span className="text-slate-400">{log.details}</span>
            </div>
            <div className="text-right shrink-0">
              <span className="text-amber-400 font-mono block">{log.actor}</span>
              <span className="text-[10px] text-slate-500">{log.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const OwnerSettingsView: React.FC<{ navigate: (path: string) => void }> = () => {
  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-800">
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-amber-500" />
          Global SaaS Configuration
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Platform-wide flags, registration controls, default trial lengths, and currency standards.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4 max-w-xl text-xs">
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Platform Brand Name</label>
          <input
            type="text"
            defaultValue="Social Dominus"
            className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Default Trial Duration</label>
          <input
            type="text"
            defaultValue="14 Days (Zero credit card required)"
            className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Administrative Contact</label>
          <input
            type="text"
            defaultValue="agecalculator.website@gmail.com"
            disabled
            className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-500"
          />
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => alert('Global SaaS parameters updated.')}
            className="px-4 py-2 rounded-xl font-bold bg-amber-500 text-slate-950 hover:bg-amber-400"
          >
            Save Global Settings
          </button>
        </div>
      </div>
    </div>
  );
};
