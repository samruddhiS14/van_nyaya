import React, { useState } from 'react';
import type { Claim } from '../../types/claim';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  FileText, 
  SendHorizontal, 
  AlertOctagon,
  ChevronRight
} from 'lucide-react';

interface EvidencePanelProps {
  claim: Claim | null;
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({ claim }) => {
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!claim) {
    return (
      <div className="h-full min-h-[520px] flex flex-col items-center justify-center p-8 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl text-center text-slate-500">
        <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-4 text-slate-600 shadow-inner">
          <FileText size={28} />
        </div>
        <h4 className="text-sm font-semibold text-slate-300 mb-1">Cadastre Inspector Standby</h4>
        <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
          Select any boundary polygon on the WebGIS radar to initiate automated statutory auditing and temporal validation.
        </p>
      </div>
    );
  }

  const isHighRisk = claim.risk_level === 'HIGH';
  const areaDelta = Math.abs(claim.area_claimed_hectares - claim.gis_computed_area_hectares);
  const deltaPct = ((areaDelta / claim.area_claimed_hectares) * 100).toFixed(1);

  return (
    <div className="h-full flex flex-col gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-2xl p-5 shadow-2xl overflow-y-auto">
      {/* Claimant Top Card */}
      <div className="flex items-start justify-between border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400">
              {claim.id}
            </span>
            <span className="text-[10px] font-mono text-emerald-400">● LIVE TELEMETRY</span>
          </div>
          <h3 className="font-bold text-white text-lg tracking-tight">{claim.claimant_name}</h3>
          <p className="text-xs text-slate-400">{claim.village}, {claim.district} • {claim.state}</p>
        </div>

        {/* Dynamic Risk Gauge */}
        <div className="text-right">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase ${
            isHighRisk
              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.2)]'
              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
          }`}>
            {isHighRisk ? <AlertOctagon size={12} /> : <ShieldCheck size={12} />}
            {claim.risk_level} RISK
          </div>
          <p className="text-[11px] font-mono text-slate-500 mt-1">Anomaly Score: {(claim.risk_score * 100).toFixed(0)}/100</p>
        </div>
      </div>

      {/* Statutory Pre-2005 Cutoff Card */}
      <div className={`p-4 rounded-xl border transition-all ${
        claim.pre_2005_verified
          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.05)]'
          : 'bg-amber-950/20 border-amber-500/30 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.05)]'
      }`}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Clock size={14} /> Statutory Cutoff (Dec 13, 2005)
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-white/10">
            {claim.pre_2005_verified ? 'ARCHIVALLY VERIFIED' : 'TEMPORAL DEFICIT'}
          </span>
        </div>
        <p className="text-xs text-slate-300/90 leading-relaxed">
          {claim.pre_2005_verified
            ? 'Landsat 7 surface reflectance time-series confirms uninterrupted agricultural cultivation prior to December 13, 2005.'
            : 'Pre-2005 Landsat archives show dense forest canopy. Forest clearing appears to date after statutory cutoff.'}
        </p>
      </div>

      {/* Cadastral Area Cross-Check */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1">Declared in Form</span>
          <span className="text-base font-extrabold text-white">{claim.area_claimed_hectares} ha</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">GIS Cadastre Area</span>
            <span className={`text-[10px] font-bold ${Number(deltaPct) > 10 ? 'text-rose-400' : 'text-emerald-400'}`}>
              ±{deltaPct}%
            </span>
          </div>
          <span className="text-base font-extrabold text-white">{claim.gis_computed_area_hectares} ha</span>
        </div>
      </div>

      {/* SHAP Feature Contribution Bars */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-2">
          <Sparkles size={14} className="text-sky-400" /> Explainable AI Attribution (SHAP)
        </h4>
        <div className="space-y-2">
          {claim.shap_attributions.map((factor, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/70 hover:border-slate-700 transition-colors">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-slate-200">{factor.feature}</span>
                <span className="text-xs font-mono font-bold text-rose-400">
                  +{(factor.importance * 100).toFixed(0)}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">{factor.description}</p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full"
                  style={{ width: `${Math.min(factor.importance * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory Statutory Rejection & 90-Day Tracker Section */}
      <div className="mt-auto pt-4 border-t border-slate-800/80">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
          <ShieldAlert size={14} className="text-rose-400" /> Committee Determination Desk
        </h4>
        
        {isSubmitted ? (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs text-emerald-300">
            ✓ Written justification recorded. Formal notice generated. 90-day claimant appeal window initiated.
          </div>
        ) : (
          <div className="space-y-2.5">
            <textarea
              rows={2}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter mandatory statutory grounds for rejection or approval qualification..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setIsSubmitted(true)}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-1.5"
              >
                Approve Claim <ChevronRight size={14} />
              </button>
              <button
                onClick={() => setIsSubmitted(true)}
                className="flex-1 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                Reject & Open 90D Appeal <SendHorizontal size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};