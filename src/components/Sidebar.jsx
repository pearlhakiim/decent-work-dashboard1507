import React from 'react';
import {
  LayoutDashboard,
  Briefcase,
  DollarSign,
  Clock,
  AlertOctagon,
  ShieldCheck,
  Users,
  HeartHandshake,
  MessageSquare,
  ChevronRight,
  BookOpen,
  PanelLeftClose,
  X
} from 'lucide-react';

import logoImg from '../assets/logo.png';

export const groupIcons = {
  overview: LayoutDashboard,
  '01_kesempatan_kerja': Briefcase,
  '02_pendapatan_setara': DollarSign,
  '03_jam_kerja': Clock,
  '04_pekerjaan_dihapus': AlertOctagon,
  '05_stabilitas_keamanan': ShieldCheck,
  '06_kesempatan_setara': Users,
  '07_jaminan_sosial': HeartHandshake,
  '08_dialog_sosial': MessageSquare
};

export default function Sidebar({
  isOpen = true,
  onClose,
  indicatorGroups,
  activeGroupId,
  setActiveGroupId,
  activeSubId,
  setActiveSubId,
  currentUser,
  onLogout
}) {
  const groups = Object.values(indicatorGroups);

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-30 flex flex-col shrink-0 min-h-screen bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-300 ease-in-out overflow-hidden select-none ${
        isOpen
          ? 'w-80 translate-x-0 opacity-100'
          : 'w-0 -translate-x-full opacity-0 pointer-events-none border-none'
      }`}
    >
      <div className="w-80 flex flex-col h-full min-h-screen">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-slate-800/80 p-1 flex items-center justify-center border border-slate-700/60 shadow-md shadow-blue-500/10 shrink-0">
                <img src={logoImg} alt="Logo Indikator Pekerjaan Layak" className="w-full h-full object-contain filter drop-shadow" />
              </div>
              <div>
                <h1 className="text-white font-bold text-sm tracking-tight leading-tight">
                  Indikator Pekerjaan Layak
                </h1>
                <p className="text-[11px] text-slate-400">Decent Work Indicators 2025</p>
              </div>
            </div>

            {/* Close Toggle Button */}
            <button
              onClick={onClose}
              title="Tutup Menu Navigasi"
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0 mt-0.5 border border-slate-800 hover:border-slate-700"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3.5 flex items-center gap-2 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/60 text-[11px] text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="truncate">BPS Kab. Tanjung Jabung Barat</span>
          </div>
        </div>

      {/* Navigation Groups */}
      <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold tracking-wider text-slate-300 uppercase flex items-center justify-between">
          <span>Pilar Indikator</span>
          <span className="text-[10px] text-slate-300">8 Pilar • 20 Tabel</span>
        </div>

        {/* Ringkasan Eksekutif */}
        <button
          onClick={() => {
            setActiveGroupId('overview');
            setActiveSubId(null);
          }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
            activeGroupId === 'overview'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 shrink-0 text-blue-400 group-hover:text-white" />
          <span className="flex-1 truncate">00. Ringkasan Eksekutif</span>
        </button>

        {/* 8 Main Indicator Groups */}
        {groups.map((group) => {
          const Icon = groupIcons[group.group_id] || Briefcase;
          const isGroupActive = activeGroupId === group.group_id;
          const subList = Object.values(group.sub_indicators || {});

          return (
            <div key={group.group_id} className="space-y-0.5">
              <button
                onClick={() => {
                  setActiveGroupId(group.group_id);
                  const firstSub = subList[0];
                  setActiveSubId(firstSub ? firstSub.id : null);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left group ${
                  isGroupActive
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                    isGroupActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {group.group_number}
                </div>
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isGroupActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'
                  }`}
                />
                <span className="flex-1 truncate">{group.title.split('(')[0].trim()}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                  {subList.length}
                </span>
              </button>

              {/* Sub-indicators Dropdown list if Group Active */}
              {isGroupActive && subList.length > 1 && (
                <div className="ml-7 pl-2 border-l border-slate-800 space-y-0.5 my-1">
                  {subList.map((sub) => {
                    const isSubActive = activeSubId === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setActiveSubId(sub.id)}
                        className={`w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all text-left ${
                          isSubActive
                            ? 'bg-blue-600/20 text-blue-300 font-semibold border border-blue-500/30'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                        }`}
                      >
                        <ChevronRight className={`w-3 h-3 shrink-0 ${isSubActive ? 'text-blue-400' : 'text-slate-400'}`} />
                        <span className="truncate">{sub.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Info & User Session */}
      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-300 space-y-2.5">
        {currentUser && (
          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700 flex items-center justify-between">
            <div className="truncate">
              <span className="block font-bold text-white text-xs truncate">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-slate-400 truncate block">
                {currentUser.instansi}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="text-[10px] font-bold text-rose-400 hover:text-rose-300 px-2 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 transition-colors shrink-0"
            >
              Keluar
            </button>
          </div>
        )}

        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-slate-300">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Referensi BPS & ILO</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-normal">
            Buku Indikator Pekerjaan Layak & Sakernas Kab. Tanjung Jabung Barat
          </p>
        </div>
      </div>
    </div>
  </aside>
  );
}
