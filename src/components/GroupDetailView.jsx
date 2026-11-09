import React, { useState, useEffect } from 'react';
import IndicatorExplanationCard from './IndicatorExplanationCard';
import SubIndicatorDataViewer from './SubIndicatorDataViewer';
import { Briefcase, AlertCircle, Sparkles } from 'lucide-react';

export default function GroupDetailView({
  group,
  activeSubId,
  setActiveSubId,
  tablesByFile,
  selectedYear,
  setSelectedYear
}) {
  const subIndicators = Object.values(group.sub_indicators || {});

  // Default to first sub-indicator if none selected
  const activeSub =
    subIndicators.find((s) => s.id === activeSubId) || subIndicators[0];

  // Retrieve sheets data for the active sub-indicator's file
  const sheetsData = activeSub && activeSub.file ? tablesByFile[activeSub.file] || [] : [];

  return (
    <div className="space-y-6">
      {/* Group Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-mono font-bold">
            PILAR {group.group_number}
          </span>
          <span className="text-xs font-medium text-slate-400">•</span>
          <span className="text-xs font-semibold text-slate-500">
            {subIndicators.length} Sub-Indikator Terdaftar
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {group.title}
        </h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-4xl">
          {group.intro}
        </p>
      </div>

      {/* Sub-Indicators Pill Switcher */}
      {subIndicators.length > 1 && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            Pilih Sub-Indikator Analisis:
          </div>
          <div className="flex flex-wrap gap-2">
            {subIndicators.map((sub) => {
              const isSelected = activeSub?.id === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubId(sub.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 ring-2 ring-blue-500/30'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      isSelected ? 'bg-blue-700 text-blue-100' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {sub.code}
                  </span>
                  <span>{sub.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Official BPS & ILO Explanation Card */}
      {activeSub && (
        <IndicatorExplanationCard
          subIndicator={activeSub}
          groupIntro={group.intro}
        />
      )}

      {/* Special Notice for Indicator 04 (Pekerjaan yang Harus Dihapuskan) */}
      {group.group_id === '04_pekerjaan_dihapus' && (
        <div className="bg-white rounded-2xl p-8 border border-amber-200 shadow-xs text-center max-w-2xl mx-auto my-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-2">
            Status Data Pekerja Anak di Kabupaten Tanjung Jabung Barat
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed max-w-lg mx-auto">
            Berdasarkan hasil pengolahan data Sakernas BPS, pada periode survei 2020–2025 di Kabupaten Tanjung Jabung Barat tidak ditemukan sampel anak usia 5–17 tahun yang bekerja pada bentuk-bentuk pekerjaan berbahaya (status data nihil). Ini merupakan indikasi positif pemenuhan hak belajar dan perlindungan anak.
          </p>
        </div>
      )}

      {/* Sub-Indicator Data Viewer with Multi-Sheet Tabs, Filters, Charts, and Full Tables */}
      {activeSub && activeSub.file && (
        <SubIndicatorDataViewer
          subIndicator={activeSub}
          sheetsData={sheetsData}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      )}
    </div>
  );
}
