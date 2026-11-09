import React from 'react';
import { Calendar, Layers, MapPin, Sparkles } from 'lucide-react';

export default function Header({
  meta,
  selectedYear,
  setSelectedYear,
  activeGroup,
  activeSub,
  currentUser,
  onLogout
}) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 sm:px-8 py-4 sticky top-0 z-20 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title & Breadcrumb */}
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              Ketenagakerjaan
            </span>
            <span>/</span>
            <span className="text-slate-700 font-semibold">
              {activeGroup ? activeGroup.title.split('(')[0].trim() : 'Ringkasan Eksekutif'}
            </span>
            {activeSub && (
              <>
                <span>/</span>
                <span className="text-blue-600 font-bold truncate max-w-xs sm:max-w-md">
                  {activeSub.name}
                </span>
              </>
            )}
          </div>

          <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">
            {activeSub
              ? activeSub.name
              : (activeGroup ? activeGroup.title : meta.title)}
          </h1>
        </div>

        {/* Global Year Filter & Location Badge & User Controls */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/80">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <span>Tanjung Jabung Barat</span>
          </div>

          {/* Year selector */}
          <div className="flex items-center gap-2 bg-blue-50/80 border border-blue-200/80 px-3 py-1.5 rounded-xl">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-900">Tahun:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
              className="bg-transparent text-xs font-bold text-blue-700 outline-none cursor-pointer pr-1"
            >
              <option value="ALL">Semua Tahun (Tren)</option>
              {meta.years.map((yr) => (
                <option key={yr} value={yr}>
                  Tahun {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Active User Badge & Logout */}
          {currentUser && (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <span className="block text-xs font-bold text-slate-800 leading-tight">
                  {currentUser.name}
                </span>
                <span className="block text-[10px] text-slate-400">
                  {currentUser.role}
                </span>
              </div>
              <button
                onClick={onLogout}
                title="Keluar dari sesi"
                className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-bold transition-all border border-slate-200/70"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
