import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import {
  FileSpreadsheet,
  Download,
  CheckCircle2,
  Calendar,
  Building,
  FileText,
  Printer,
  Sparkles,
} from 'lucide-react';

export const ReportsView: React.FC<{ navigate: (path: string) => void }> = () => {
  const { currentWorkspace, userProfile } = useAppStore();
  const [reportType, setReportType] = useState('Executive Cross-Platform Summary');
  const [dateRange, setDateRange] = useState('October 2026');
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleSimulateExport = (format: 'PDF' | 'CSV') => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setDownloadSuccess(`Social_Dominus_${currentWorkspace.slug}_${dateRange.replace(/\s+/g, '_')}.${format.toLowerCase()}`);
      setTimeout(() => setDownloadSuccess(null), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-violet-500" />
            White-Label Reporting Studio
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Generate presentation-ready analytics dossiers for marketing stakeholders and agency clients.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSimulateExport('CSV')}
            disabled={isExporting}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => handleSimulateExport('PDF')}
            disabled={isExporting}
            className="px-4 py-1.5 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white flex items-center gap-1.5 shadow"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Generating PDF...' : 'Download Branded PDF'}</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Report ready: {downloadSuccess} simulated download verified.</span>
        </div>
      )}

      {/* Report Customizer & Live Report Document Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Settings (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-sm">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Report Settings</h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Dossier Template
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option>Executive Cross-Platform Summary</option>
              <option>Audience Growth & Follower Retention</option>
              <option>Campaign Attribution & Click Velocity</option>
              <option>Full Agency White-Label Audit</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Audit Period
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option>October 2026 (Month-to-Date)</option>
              <option>Q3 2026 Full Quarter</option>
              <option>Trailing 90 Days</option>
            </select>
          </div>

          <div className="p-3 rounded-xl bg-violet-500/5 border border-violet-500/10 text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <span className="font-bold text-violet-500 block">Agency White-Label Active</span>
            <p className="text-[11px] text-slate-500">
              Your logo, custom primary accent colors, and custom header notes are automatically stamped onto the export document.
            </p>
          </div>
        </div>

        {/* Live Document Preview (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-violet-500 block">
                Official Performance Report
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {currentWorkspace.name}
              </h2>
              <span className="text-xs text-slate-400">Target Period: {dateRange}</span>
            </div>

            <div className="text-right">
              <span className="text-xs font-extrabold text-slate-900 dark:text-white block">SOCIAL DOMINUS</span>
              <span className="text-[10px] text-slate-400">Verified Analytics Engine</span>
            </div>
          </div>

          {/* Key Executive Highlights Box */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Delivered Views</span>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1">390,000</div>
              <span className="text-[10px] text-emerald-500 font-bold">+18.4% MoM</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Average Engagement</span>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1">5.8%</div>
              <span className="text-[10px] text-emerald-500 font-bold">Benchmark Surpassed</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Outbound Clicks</span>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1">14,820</div>
              <span className="text-[10px] text-sky-500 font-bold">High Intent</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Executive Summary</h4>
            <p className="leading-relaxed">
              During the analyzed period, multichannel publishing frequency was increased by 22% across LinkedIn and X, generating a 31% expansion in total website referral clicks. Audience retention remained stable with positive net follower acquisition across all 6 active gateways.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Prepared by: {userProfile.displayName} ({userProfile.email})</span>
            <span>Document ID: SD-REP-2026-OCT-8842</span>
          </div>
        </div>
      </div>
    </div>
  );
};
