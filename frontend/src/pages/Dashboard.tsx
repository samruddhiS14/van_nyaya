import React, { useEffect, useState } from 'react';
import { getClaims } from '../services/api';
import type { Claim } from '../types/claim';
import { ClaimMap } from '../components/map/ClaimMap';
import { EvidencePanel } from '../components/audit/EvidencePanel';
import { 
  Scale, 
  AlertTriangle, 
  Layers, 
  Activity, 
  MapPin, 
  Search,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getClaims().then((data) => {
      setClaims(data);
      if (data.length > 0) setSelectedClaim(data[0]);
    });
  }, []);

  const filteredClaims = claims.filter(c => 
    c.claimant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.village.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highRiskCount = claims.filter(c => c.risk_level === 'HIGH').length;
  const verifiedCount = claims.filter(c => c.pre_2005_verified).length;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Cyber Command Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Scale size={20} className="text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base tracking-tight text-white">Van-Nyaya</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                FRA DSS v2.4
              </span>
            </div>
            <p className="text-xs text-slate-400">National Geospatial Land Rights Verification & Explainable AI Grid</p>
          </div>
        </div>

        {/* Global Key Metrics HUD */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl flex items-center gap-3">
            <Activity size={16} className="text-sky-400" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block leading-none">Total Ingested</span>
              <span className="text-sm font-black font-mono text-white leading-tight">{claims.length} Claims</span>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl flex items-center gap-3">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block leading-none">Pre-2005 Verified</span>
              <span className="text-sm font-black font-mono text-emerald-400 leading-tight">{verifiedCount} Records</span>
            </div>
          </div>

          <div className="bg-rose-950/40 border border-rose-800/60 px-4 py-2 rounded-xl flex items-center gap-3 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
            <AlertTriangle size={16} className="text-rose-400 animate-pulse" />
            <div>
              <span className="text-[10px] text-rose-300 uppercase font-bold block leading-none">Anomalies Detected</span>
              <span className="text-sm font-black font-mono text-rose-400 leading-tight">{highRiskCount} High Risk</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Command Center Grid */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1800px] w-full mx-auto">
        {/* Left 8-col: WebGIS & Cadastral Records */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-emerald-400" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-300">
                Interactive Cadastral Telemetry & Satellite Radar
              </h2>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span> Valid</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]"></span> Review</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]"></span> Anomaly</span>
            </div>
          </div>

          {/* Leaflet WebGIS Component */}
          <ClaimMap claims={filteredClaims} selectedClaim={selectedClaim} onSelectClaim={setSelectedClaim} />

          {/* Claims Triage Table */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-slate-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                  Verification Queue ({filteredClaims.length})
                </span>
              </div>
              <div className="relative w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter by claimant, village, ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/60 text-slate-400 uppercase font-semibold border-b border-slate-800/80 tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3.5">ID</th>
                    <th className="p-3.5">Claimant</th>
                    <th className="p-3.5">Village / Dist</th>
                    <th className="p-3.5">Claimed Area</th>
                    <th className="p-3.5">GIS Measured</th>
                    <th className="p-3.5">Cutoff Status</th>
                    <th className="p-3.5">Risk Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredClaims.map((claim) => {
                    const isSelected = selectedClaim?.id === claim.id;
                    return (
                      <tr
                        key={claim.id}
                        onClick={() => setSelectedClaim(claim)}
                        className={`cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? 'bg-slate-800/80 border-l-4 border-emerald-400 text-white'
                            : 'hover:bg-slate-800/40 text-slate-300'
                        }`}
                      >
                        <td className="p-3.5 font-mono text-[11px] text-slate-400">{claim.id}</td>
                        <td className="p-3.5 font-bold text-white">{claim.claimant_name}</td>
                        <td className="p-3.5 text-slate-400">{claim.village}, {claim.district}</td>
                        <td className="p-3.5 font-mono">{claim.area_claimed_hectares} ha</td>
                        <td className="p-3.5 font-mono">{claim.gis_computed_area_hectares} ha</td>
                        <td className="p-3.5">
                          {claim.pre_2005_verified ? (
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
                              VERIFIED
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded">
                              DEFICIT
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                            claim.risk_level === 'HIGH'
                              ? 'text-rose-400 bg-rose-950/80 border border-rose-800'
                              : 'text-emerald-400 bg-emerald-950/80 border border-emerald-800'
                          }`}>
                            {claim.risk_level}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 4-col: Explainable AI & Committee Actions */}
        <div className="lg:col-span-4">
          <EvidencePanel claim={selectedClaim} />
        </div>
      </main>
    </div>
  );
};