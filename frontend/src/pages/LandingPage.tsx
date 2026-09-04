import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Clock, 
  Scale, 
  Layers, 
  ChevronDown, 
  LifeBuoy, 
  PhoneCall, 
  Mail, 
  FileQuestion, 
  LogIn, 
  FileSpreadsheet, 
  SearchCode 
} from 'lucide-react';
import { ApplyClaimModal } from '../components/appeals/ApplyClaimModal';
import { CheckStatusModal } from '../components/appeals/CheckStatusModal';
import { getClaims } from '../services/api';
import type { Claim } from '../types/claim';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [claims, setClaims] = useState<Claim[]>([]);

  useEffect(() => {
    getClaims().then(setClaims);
  }, []);

  const scrollToAccess = () => {
    document.getElementById('access-portal')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewClaim = (claim: Claim) => {
    const existing = localStorage.getItem('van_nyaya_claims');
    const parsed = existing ? JSON.parse(existing) : [];
    localStorage.setItem('van_nyaya_claims', JSON.stringify([claim, ...parsed]));
    setClaims(prev => [claim, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* SECTION 1: TOP DEEP FOREST DARK GREEN */}
      <div className="bg-[#051a14] text-slate-100 flex flex-col border-b border-emerald-950">
        <header className="w-full border-b border-emerald-900/40 bg-[#03110d]/90 backdrop-blur-md px-8 py-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <div className="w-full h-full bg-[#03110d] rounded-[10px] flex items-center justify-center font-bold text-emerald-400 text-base">
                वन
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">Van-Nyaya (वन न्याय)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                  v3.0 Live
                </span>
              </div>
              <p className="text-[10px] text-emerald-300/70">AI-Powered Forest Rights Act Decision Support System</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToAccess}
              className="px-4 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-semibold text-xs tracking-wide transition-all"
            >
              Claims Desk & Support ↓
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide transition-all shadow-[0_0_15px_rgba(16,185,129,0.25)]"
            >
              Launch Dashboard
            </button>
          </div>
        </header>

        <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden py-16">
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[850px] h-[850px] rounded-full border border-emerald-500/10 absolute animate-[spin_120s_linear_infinite]" />
            <div className="w-[620px] h-[620px] rounded-full border border-emerald-500/15 absolute" />
            <div className="w-[400px] h-[400px] rounded-full border border-emerald-500/20 absolute shadow-[0_0_80px_rgba(16,185,129,0.06)]" />
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(5,150,105,0.14)_0%,transparent_75%)]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 text-xs font-semibold">
              <Sparkles size={14} className="text-emerald-400" />
              Autonomous Land Rights Verification Grid
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
              What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-500">Van-Nyaya?</span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/80 max-w-3xl mx-auto leading-relaxed font-normal">
              Van-Nyaya is an intelligent spatial Decision Support System designed to resolve customary land title claims under the Forest Rights Act (FRA, 2006). By combining satellite telemetry dating back prior to December 13, 2005 with real-time cadastral polygon verification, tabular machine learning, and explainable AI (SHAP), Van-Nyaya guarantees fair, transparent, and legally accountable determinations for tribal claimants and district committees.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-8 text-left">
              <div className="p-5 rounded-2xl bg-[#092820]/70 border border-emerald-900/60 space-y-2.5 hover:border-emerald-500/40 transition-all shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Clock size={20} />
                </div>
                <h4 className="text-sm font-bold text-white">1. Pre-2005 Temporal Telemetry</h4>
                <p className="text-xs text-slate-300/80 leading-relaxed">
                  Ingests archival USGS Landsat 7 imagery to verify unbroken land clearance and habitation prior to the statutory December 13, 2005 cutoff, separating historical dwelling from modern encroachment.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#092820]/70 border border-emerald-900/60 space-y-2.5 hover:border-emerald-500/40 transition-all shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <Scale size={20} />
                </div>
                <h4 className="text-sm font-bold text-white">2. Mandatory Statutory Justifications</h4>
                <p className="text-xs text-slate-300/80 leading-relaxed">
                  Eliminates silent bureaucratic rejections. Officers must provide verifiable written clauses, generating downloadable statutory rejection notices and an active 90-day appeal tracking countdown.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#092820]/70 border border-emerald-900/60 space-y-2.5 hover:border-emerald-500/40 transition-all shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Layers size={20} />
                </div>
                <h4 className="text-sm font-bold text-white">3. Cadastral Overlap & SHAP Auditing</h4>
                <p className="text-xs text-slate-300/80 leading-relaxed">
                  Computes geometric intersections with reserve forests and adjacent plots. Decomposes tabular risk scores with SHAP attribution bars so officers understand why a claim was flagged.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <button 
                onClick={scrollToAccess}
                className="text-xs font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 mx-auto transition-colors"
              >
                Proceed to Login, Claims & Support <ChevronDown size={16} className="animate-bounce" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 2: BOTTOM PISTA GREEN / SAGE */}
      <div id="access-portal" className="bg-[#ebf5ee] text-slate-900 flex-1 py-16 px-6 border-t border-emerald-900/20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold font-mono tracking-widest uppercase text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full">
              Van-Nyaya Portal Access
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Action Center & Support Desk
            </h2>
            <p className="text-xs text-slate-600 max-w-xl mx-auto">
              Choose your operation below to access digital claim tracking, officer review queues, or contact technical grievance redressal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-emerald-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                  <LogIn size={22} />
                </div>
                <h3 className="font-bold text-lg text-slate-900">Officer / Committee Login</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Access the district verification console, review automated GIS overlaps, inspect SHAP feature cards, and record determinations.
                </p>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full py-2.5 rounded-xl bg-[#0a3d2e] hover:bg-[#0e523e] text-white font-bold text-xs tracking-wider uppercase transition-colors shadow-xs"
              >
                Access Dashboard
              </button>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-emerald-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                  <FileSpreadsheet size={22} />
                </div>
                <h3 className="font-bold text-lg text-slate-900">Apply for FRA (Form A/B)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Submit individual or community forest land rights applications, upload handheld GPS perimeter data, and attach Gram Sabha resolutions.
                </p>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-[#b45309] hover:bg-[#d97706] text-white font-bold text-xs tracking-wider uppercase transition-colors shadow-xs"
              >
                Start New Claim
              </button>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-emerald-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
                  <SearchCode size={22} />
                </div>
                <h3 className="font-bold text-lg text-slate-900">Check Claim Status</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Look up processing stages at Gram Sabha, SDLC, or DLC level, verify 90-day appeal countdowns, and download formal notices.
                </p>
              </div>
              <button
                onClick={() => setIsStatusModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#14b8a6] text-white font-bold text-xs tracking-wider uppercase transition-colors shadow-xs"
              >
                Track by Claim ID
              </button>
            </div>
          </div>

          <div className="bg-white/90 rounded-2xl border border-emerald-200 p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
                <LifeBuoy size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Van-Nyaya Technical Support & Grievance Cell</h4>
                <p className="text-xs text-slate-600">Assistance for Gram Sabha secretariats, FRC committees, and field survey officials.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-emerald-100 text-xs">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-emerald-100">
                <PhoneCall size={16} className="text-emerald-700" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Toll-Free Helpline</span>
                  <span className="font-bold text-slate-800">1800-200-FRA-AI</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-emerald-100">
                <Mail size={16} className="text-emerald-700" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Email Support</span>
                  <span className="font-bold text-slate-800">support@van-nyaya.gov.in</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-emerald-100">
                <FileQuestion size={16} className="text-emerald-700" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">User Guide & Rules</span>
                  <span className="font-bold text-slate-800">FRA 2006 Statutory Manual</span>
                </div>
              </div>
            </div>
          </div>

          <footer className="text-center text-xs text-slate-500 pt-6">
            <p className="font-medium">Van-Nyaya Decision Support System • Built for fair & auditable Forest Rights Act governance.</p>
          </footer>
        </div>
      </div>

      <ApplyClaimModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        onSubmitClaim={handleNewClaim}
      />

      <CheckStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        claims={claims}
      />
    </div>
  );
};
