
import React, { useState } from 'react';
import { generateSecurityPolicy } from '../services/geminiService';

const AISecurityConsultant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const policy = await generateSecurityPolicy(prompt);
      setResult(policy);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 text-white p-6 rounded-xl shadow-xl border border-slate-800">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center text-xl">
          <i className="fa-solid fa-sparkles"></i>
        </div>
        <div>
          <h3 className="text-lg font-bold">AI Security Architect</h3>
          <p className="text-slate-400 text-xs">Gemini-powered policy generator</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Describe the requirement</label>
          <textarea 
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-600"
            rows={3}
            placeholder="e.g. A temporary role for external security auditors who need to read logs and export reports but cannot change settings."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading || !prompt}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2"
        >
          {loading ? (
            <i className="fa-solid fa-circle-notch fa-spin"></i>
          ) : (
            <i className="fa-solid fa-wand-magic-sparkles text-xs"></i>
          )}
          <span>{loading ? 'Consulting Gemini...' : 'Generate Policy'}</span>
        </button>

        {result && (
          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Generated Profile</span>
              <button onClick={() => setResult(null)} className="text-slate-500 hover:text-white">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div>
              <h4 className="font-bold text-slate-100">{result.roleName}</h4>
              <p className="text-xs text-slate-400 mt-1 italic">"{result.description}"</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.permissions.map((p: string) => (
                <span key={p} className="bg-indigo-900/30 text-indigo-300 px-2 py-1 rounded text-[10px] font-bold border border-indigo-500/30">
                  {p}
                </span>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-700">
              <p className="text-[11px] text-emerald-400 leading-relaxed flex gap-2">
                <i className="fa-solid fa-shield-check mt-1"></i>
                <span>{result.securityJustification}</span>
              </p>
            </div>
            <button className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded transition-colors">
              Deploy to Active Directory
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISecurityConsultant;
