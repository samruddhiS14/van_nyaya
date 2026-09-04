import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { Claim } from '../../types/claim';

interface CheckStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  claims: Claim[];
}

export const CheckStatusModal: React.FC<CheckStatusModalProps> = ({ isOpen, onClose, claims }) => {
  const [claimIdInput, setClaimIdInput] = useState('FRA-1023');
  const [searchedClaim, setSearchedClaim] = useState<Claim | null>(null);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = claims.find(c => c.id.toUpperCase() === claimIdInput.trim().toUpperCase());
    setSearchedClaim(found || null);
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-sm text-slate-900">Van-Nyaya Public Claim Tracking</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            required
            value={claimIdInput}
            onChange={(e) => setClaimIdInput(e.target.value)}
            placeholder="Enter Claim ID (e.g. FRA-1023)"
            className="flex-1 p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600 font-mono"
          />
          <button type="submit" className="px-4 py-2 bg-[#0a3d2e] hover:bg-[#0e523e] text-white rounded-lg text-xs font-bold flex items-center gap-1">
            <Search size={14} /> Search
          </button>
        </form>

        {searched && (
          <div>
            {searchedClaim ? (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500">{searchedClaim.id}</span>
                    <h4 className="font-bold text-sm text-slate-900">{searchedClaim.claimant_name}</h4>
                    <p className="text-slate-500">{searchedClaim.village}, {searchedClaim.district}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    searchedClaim.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                    searchedClaim.status === 'REJECTED' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {searchedClaim.status}
                  </span>
                </div>

                {/* Statutory Milestone Progress */}
                <div className="space-y-1.5 pt-2 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <CheckCircle2 size={14} /> Gram Sabha FRC Resolution (Passed)
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <CheckCircle2 size={14} /> Sub-Divisional (SDLC) Telemetry Verification (Completed)
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock size={14} className="text-amber-500" /> District Level Committee (DLC) Determination
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-center justify-between">
                  <span>Pre-2005 Satellite Verification:</span>
                  <span className="font-bold">{searchedClaim.pre_2005_verified ? 'ARCHIVALLY VERIFIED' : 'TEMPORAL DEFICIT'}</span>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 text-center">
                No claim matching "{claimIdInput}" was found in active records.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
