
import React, { useState } from 'react';
import { MOCK_AUDITS } from '../constants';
import { analyzeAuditLogs } from '../services/geminiService';

const AuditAnalytics: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    const result = await analyzeAuditLogs(MOCK_AUDITS);
    setReport(result);
    setAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Immutable Audit Trail</h3>
            <p className="text-slate-500 text-xs uppercase font-bold tracking-widest mt-1">Compliance Standard: SOC2 Type II</p>
          </div>
          <button 
            onClick={handleAnalyze}
            disabled={analyzing}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100 disabled:opacity-50"
          >
            {analyzing ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-brain-circuit"></i>}
            <span>{analyzing ? 'AI Analyzing Logs...' : 'AI Threat Analysis'}</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {MOCK_AUDITS.map((audit) => (
            <div key={audit.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                  audit.status === 'SUCCESS' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'
                }`}>
                  <i className={`fa-solid ${audit.status === 'SUCCESS' ? 'fa-shield-check' : 'fa-triangle-exclamation'}`}></i>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {audit.action.replace('_', ' ')}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    <span className="font-medium text-indigo-600">{audit.actor}</span>
                    <span className="text-slate-300">•</span>
                    <span>{audit.resource}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  {new Date(audit.timestamp).toLocaleTimeString()}
                </p>
                <p className="text-[10px] text-slate-400">
                  {new Date(audit.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {report && (
        <div className="bg-indigo-950 text-indigo-100 p-6 rounded-xl shadow-xl border border-indigo-900 animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
              <i className="fa-solid fa-wand-magic-sparkles text-white text-sm"></i>
            </div>
            <h4 className="font-bold">AI Threat Posture Report</h4>
          </div>
          <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap leading-relaxed opacity-90">
            {report}
          </div>
          <div className="mt-6 flex gap-3">
            <button className="text-xs font-bold bg-indigo-800 hover:bg-indigo-700 text-white px-3 py-1.5 rounded transition-colors">
              Export PDF Report
            </button>
            <button className="text-xs font-bold bg-transparent border border-indigo-700 hover:bg-indigo-900 text-indigo-300 px-3 py-1.5 rounded transition-colors">
              Dismiss Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditAnalytics;
