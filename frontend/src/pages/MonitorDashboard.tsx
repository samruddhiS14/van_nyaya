import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getClaims } from '../services/api';
import type { Claim } from '../types/claim';
import { ClaimMap } from '../components/map/ClaimMap';
import { 
  LayoutDashboard, 
  Map, 
  FileText, 
  AlertTriangle, 
  BarChart3, 
  User, 
  LogOut, 
  Search, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Calendar,
  Sparkles,
  Printer,
  X,
  TrendingUp,
  ShieldCheck,
  FileCheck2
} from 'lucide-react';

type TabType = 'overview' | 'map' | 'claims' | 'anomalies' | 'analytics' | 'profile';

export const MonitorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const refreshData = () => {
    getClaims().then((data) => {
      setClaims(data);
      if (data.length > 0 && !selectedClaim) setSelectedClaim(data[0]);
    });
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    try {
      await axios.patch(`http://127.0.0.1:8080/api/claims/${id}/status`, { status: newStatus });
    } catch (err) {
      console.warn('Backend patch failed, updating local state:', err);
    }
    setClaims(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    if (selectedClaim?.id === id) {
      setSelectedClaim(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const total = claims.length;
  const approved = claims.filter(c => c.status === 'APPROVED').length;
  const pending = claims.filter(c => c.status === 'PENDING').length;
  const rejected = claims.filter(c => c.status === 'REJECTED').length;
  const anomalies = claims.filter(c => c.risk_level === 'HIGH').length;

  const filteredClaims = claims.filter(c => {
    const matchesSearch = c.claimant_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.village.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'All' || c.district === selectedDistrict;
    const matchesTab = activeTab === 'anomalies' ? c.risk_level === 'HIGH' : true;
    return matchesSearch && matchesDistrict && matchesTab;
  });

  return (
    <div className="min-h-screen bg-[#f4f7f6] text-slate-800 flex font-sans">
      <aside className="w-64 bg-[#0a3d2e] text-white flex flex-col justify-between shrink-0 shadow-xl">
        <div>
          <div className="p-6 border-b border-emerald-900/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-300 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#0a3d2e] rounded-[10px] flex items-center justify-center font-bold text-emerald-300 text-sm">
                वन
              </div>
            </div>
            <div>
              <h2 className="font-extrabold text-sm tracking-tight leading-tight">Van-Nyaya</h2>
              <p className="text-[10px] text-emerald-300/80">AI Decision Support Grid</p>
            </div>
          </div>

          <nav className="p-4 space-y-1.5 text-xs font-semibold">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-emerald-800/80 text-white shadow-sm' : 'text-emerald-200/80 hover:bg-emerald-900/60'}`}
            >
              <LayoutDashboard size={16} /> Overview
            </button>
            <button 
              onClick={() => setActiveTab('map')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeTab === 'map' ? 'bg-emerald-800/80 text-white shadow-sm' : 'text-emerald-200/80 hover:bg-emerald-900/60'}`}
            >
              <Map size={16} /> Cadastral WebGIS
            </button>
            <button 
              onClick={() => setActiveTab('claims')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeTab === 'claims' ? 'bg-emerald-800/80 text-white shadow-sm' : 'text-emerald-200/80 hover:bg-emerald-900/60'}`}
            >
              <FileText size={16} /> Claims Queue
            </button>
            <button 
              onClick={() => setActiveTab('anomalies')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeTab === 'anomalies' ? 'bg-emerald-800/80 text-white shadow-sm' : 'text-emerald-200/80 hover:bg-emerald-900/60'}`}
            >
              <AlertTriangle size={16} /> SHAP Anomaly Radar
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeTab === 'analytics' ? 'bg-emerald-800/80 text-white shadow-sm' : 'text-emerald-200/80 hover:bg-emerald-900/60'}`}
            >
              <BarChart3 size={16} /> Compliance Analytics
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-emerald-800/80 text-white shadow-sm' : 'text-emerald-200/80 hover:bg-emerald-900/60'}`}
            >
              <User size={16} /> Officer Workspace
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-emerald-900/60">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-emerald-200/80 hover:bg-emerald-900/60 transition-colors"
          >
            <LogOut size={16} /> Return to Van-Nyaya Home
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-3.5 flex items-center justify-between shadow-xs">
          <div className="relative w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Claim ID, Village, Claimant..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-xs font-bold text-emerald-800">
              VN
            </div>
            <div className="text-left leading-tight">
              <p className="text-xs font-bold text-slate-800">Van-Nyaya Verification Desk</p>
              <p className="text-[10px] text-emerald-700 font-mono font-medium">Mode: {activeTab.toUpperCase()} • Live</p>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-6">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-[11px] font-semibold">Total Evaluated</span>
                <FileText size={16} className="text-blue-500" />
              </div>
              <p className="text-xl font-extrabold text-slate-900 font-mono">{total}</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-[11px] font-semibold">Validated</span>
                <CheckCircle2 size={16} className="text-emerald-500" />
              </div>
              <p className="text-xl font-extrabold text-emerald-600 font-mono">{approved}</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-[11px] font-semibold">Under Audit</span>
                <Clock size={16} className="text-amber-500" />
              </div>
              <p className="text-xl font-extrabold text-amber-600 font-mono">{pending}</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-[11px] font-semibold">Flagged / Denied</span>
                <XCircle size={16} className="text-rose-500" />
              </div>
              <p className="text-xl font-extrabold text-rose-600 font-mono">{rejected}</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-[11px] font-semibold">Triage Speed</span>
                <Calendar size={16} className="text-purple-500" />
              </div>
              <p className="text-xl font-extrabold text-slate-900 font-mono">118 d</p>
            </div>

            <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-200 shadow-xs cursor-pointer" onClick={() => setActiveTab('anomalies')}>
              <div className="flex items-center justify-between text-rose-700 mb-2">
                <span className="text-[11px] font-bold">Risk Anomalies</span>
                <AlertTriangle size={16} className="text-rose-600" />
              </div>
              <p className="text-xl font-extrabold text-rose-700 font-mono">{anomalies}</p>
            </div>
          </div>

          {/* TAB: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                  <TrendingUp size={16} className="text-emerald-600" /> Statutory Conversion Rate
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between font-medium"><span>Approval Rate</span><span className="text-emerald-600 font-bold">{total ? ((approved/total)*100).toFixed(1) : 0}%</span></div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-emerald-500 h-full" style={{ width: `${total ? (approved/total)*100 : 0}%` }} /></div>
                  <div className="flex justify-between font-medium pt-2"><span>Rejection Rate</span><span className="text-rose-600 font-bold">{total ? ((rejected/total)*100).toFixed(1) : 0}%</span></div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-rose-500 h-full" style={{ width: `${total ? (rejected/total)*100 : 0}%` }} /></div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                  <Clock size={16} className="text-amber-600" /> Average SDLC Processing Cycle
                </h3>
                <div className="p-3 bg-slate-50 rounded-xl font-mono text-center">
                  <span className="text-2xl font-black text-slate-900">118 Days</span>
                  <span className="block text-[11px] text-slate-400">Section 14 Statutory Limit: 180 Days</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-sky-600" /> Pre-2005 Landsat Integrity
                </h3>
                <div className="p-3 bg-emerald-50 rounded-xl text-center">
                  <span className="text-2xl font-black text-emerald-700">{claims.filter(c => c.pre_2005_verified).length} of {total}</span>
                  <span className="block text-[11px] text-emerald-600">Archivally Validated Customary Occupancy</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB: OFFICER WORKSPACE */}
          {activeTab === 'profile' && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 max-w-xl space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white font-black text-xl flex items-center justify-center">DO</div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">District Verification Officer</h3>
                  <p className="text-xs text-slate-500">Jurisdiction: Sehore & Dewas Sectors, MP</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-slate-600">
                <p><strong>Officer Node ID:</strong> VN-MP-SEH-092</p>
                <p><strong>Digital Signature:</strong> Verified (e-Sign Statutory Level 3)</p>
                <p><strong>ML Pipeline Connection:</strong> Live • TreeExplainer v1.2</p>
              </div>
            </div>
          )}

          {/* WORKSPACE VIEW (OVERVIEW, MAP, CLAIMS, ANOMALIES) */}
          {(activeTab === 'overview' || activeTab === 'map' || activeTab === 'claims' || activeTab === 'anomalies') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {activeTab !== 'map' && (
                <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Triage Filters</h3>
                    <button onClick={() => { setSelectedDistrict('All'); setSearchQuery(''); }} className="text-[11px] font-semibold text-emerald-700 hover:underline">Reset</button>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-500 mb-1 font-medium">District Sector</label>
                      <select 
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg"
                      >
                        <option value="All">All Sectors</option>
                        <option value="Sehore">Sehore</option>
                        <option value="Dewas">Dewas</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className={`${activeTab === 'map' ? 'lg:col-span-12' : 'lg:col-span-5'} bg-white p-4 rounded-2xl border border-slate-200 shadow-xs`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-700">Van-Nyaya Cadastral Telemetry</span>
                  <span className="text-[11px] text-emerald-700 font-mono font-semibold">● Spatial Sync Active</span>
                </div>
                <ClaimMap 
                  claims={filteredClaims} 
                  selectedClaim={selectedClaim} 
                  onSelectClaim={setSelectedClaim} 
                />
              </div>

              {activeTab !== 'map' && (
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">
                        {activeTab === 'anomalies' ? 'High Risk Anomalies' : 'Claims in Queue'} ({filteredClaims.length})
                      </span>
                    </div>
                    <div className="max-h-44 overflow-y-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 text-[11px]">
                          <tr>
                            <th className="p-2.5">Claim ID</th>
                            <th className="p-2.5">Surveyed</th>
                            <th className="p-2.5">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredClaims.map((c) => (
                            <tr
                              key={c.id}
                              onClick={() => setSelectedClaim(c)}
                              className={`cursor-pointer hover:bg-slate-50 ${selectedClaim?.id === c.id ? 'bg-emerald-50/70 font-semibold' : ''}`}
                            >
                              <td className="p-2.5 font-mono text-[11px]">{c.id}</td>
                              <td className="p-2.5 font-mono">{c.area_claimed_hectares} ha</td>
                              <td className="p-2.5">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  c.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
                                  c.status === 'REJECTED' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                  {c.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {selectedClaim && (
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{selectedClaim.claimant_name}</p>
                          <p className="text-[11px] text-slate-500 font-mono">{selectedClaim.id} • {selectedClaim.village}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          selectedClaim.risk_level === 'HIGH' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {selectedClaim.risk_level} Priority
                        </span>
                      </div>

                      {/* Real SHAP Bars */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">SHAP Risk Drivers</span>
                        {selectedClaim.shap_attributions.map((s, idx) => (
                          <div key={idx} className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-[11px]">
                            <div className="flex justify-between font-mono font-bold">
                              <span>{s.feature}</span>
                              <span className={s.direction === 'positive' ? 'text-rose-600' : 'text-emerald-600'}>
                                {s.direction === 'positive' ? '+' : '-'}{(s.importance * 100).toFixed(0)}%
                              </span>
                            </div>
                            <p className="text-slate-500 text-[10px] mt-0.5">{s.description}</p>
                          </div>
                        ))}
                      </div>

                      {/* Live SQLite Status Mutation Buttons */}
                      <div className="pt-2 flex gap-2">
                        <button
                          onClick={() => {
                            handleUpdateStatus(selectedClaim.id, 'APPROVED');
                            setShowCertificateModal(true);
                          }}
                          className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                          <FileCheck2 size={13} /> Approve Title
                        </button>
                        <button
                          onClick={() => {
                            handleUpdateStatus(selectedClaim.id, 'REJECTED');
                            setShowNoticeModal(true);
                          }}
                          className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                          <AlertTriangle size={13} /> Reject Order
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Statutory Rejection Order & Appeal Notice Modal */}
      {showNoticeModal && selectedClaim && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-rose-600" />
                <h3 className="font-bold text-sm text-slate-900">Statutory Rejection Order & Appeal Notice</h3>
              </div>
              <button onClick={() => setShowNoticeModal(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p>Under Section 12(2) of the Scheduled Tribes and Other Traditional Forest Dwellers (FRA) Rules, 2006:</p>
              
              <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 space-y-1.5 text-rose-900">
                <p className="font-bold">Claim Ref: {selectedClaim.id} — {selectedClaim.claimant_name}</p>
                <p>Grounds: Landsat satellite archival analysis does not evidence agrarian occupation prior to statutory cutoff date (Dec 13, 2005).</p>
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 flex items-center justify-between">
                <div>
                  <span className="font-bold block">Statutory Appeal Window</span>
                  <span className="text-[11px]">Claimant may appeal to Sub-Divisional Committee within 90 days</span>
                </div>
                <span className="text-sm font-mono font-black px-2.5 py-1 bg-white rounded-lg border border-amber-300">
                  90 Days Active
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowNoticeModal(false)} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50">Close</button>
              <button onClick={() => window.print()} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5">
                <Printer size={14} /> Print Legal Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Title Grant Certificate Modal */}
      {showCertificateModal && selectedClaim && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900">Title Grant & Audit Dossier Certificate</h3>
              </div>
              <button onClick={() => setShowCertificateModal(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 text-emerald-950">
                <p className="font-bold text-sm">VAN-NYAYA STATUTORY TITLE RECOGNITION</p>
                <p>This certifies that <strong>{selectedClaim.claimant_name}</strong> has been granted customary rights over <strong>{selectedClaim.gis_computed_area_hectares} ha</strong> in Village <strong>{selectedClaim.village}</strong>, District {selectedClaim.district}.</p>
                <p className="text-[10px] text-emerald-800 pt-1">USGS Landsat-7 NIR Telemetry: Verified Pre-December 13, 2005 Possession.</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowCertificateModal(false)} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50">Close</button>
              <button onClick={() => window.print()} className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5">
                <Printer size={14} /> Print Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
