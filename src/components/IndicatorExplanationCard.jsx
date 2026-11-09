import React, { useState } from 'react';
import {
  BookOpen,
  HelpCircle,
  Calculator,
  Compass,
  FileText,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';

export default function IndicatorExplanationCard({ subIndicator, groupIntro }) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('definisi'); // 'definisi', 'kegunaan', 'rumus', 'interpretasi'

  if (!subIndicator) return null;

  return (
    <div className="bg-white rounded-2xl border border-blue-200/80 shadow-xs overflow-hidden transition-all">
      {/* Top Banner Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-4 bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-white flex items-center justify-between cursor-pointer border-b border-blue-100/70 select-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Penjelasan & Konsep Indikator: {subIndicator.name}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
                BPS & ILO Standard
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Panduan definisi, kegunaan kebijakan, serta metode penghitungan resmi
            </p>
          </div>
        </div>

        <button className="text-slate-400 hover:text-slate-600 p-1">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="p-6">
          {/* Tabs Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-4">
            <button
              onClick={() => setActiveTab('definisi')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'definisi'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Definisi & Konsep
            </button>

            <button
              onClick={() => setActiveTab('kegunaan')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'kegunaan'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Kegunaan & Manfaat Kebijakan
            </button>

            <button
              onClick={() => setActiveTab('rumus')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'rumus'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Rumus & Formula
            </button>

            <button
              onClick={() => setActiveTab('interpretasi')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'interpretasi'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Interpretasi Standar
            </button>
          </div>

          {/* Tab 1: Definisi */}
          {activeTab === 'definisi' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Konsep Definisi Resmi (BPS / ILO)
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {subIndicator.definisi}
                </p>
              </div>
              {groupIntro && (
                <p className="text-xs text-slate-500 italic">
                  💡 Konteks Pilar: {groupIntro}
                </p>
              )}
            </div>
          )}

          {/* Tab 2: Kegunaan */}
          {activeTab === 'kegunaan' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wide mb-1.5">
                  Kegunaan Bagi Perencanaan & Evaluasi Daerah
                </h4>
                <p className="text-sm text-emerald-950 leading-relaxed">
                  {subIndicator.kegunaan}
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Rumus */}
          {activeTab === 'rumus' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs">
                <div className="text-slate-400 mb-1 text-[11px] font-sans font-semibold uppercase">
                  Metode Perhitungan Matematis:
                </div>
                <div className="text-blue-300 font-bold text-sm tracking-wide py-1">
                  {subIndicator.rumus}
                </div>
                <div className="mt-2 text-[11px] text-slate-400 font-sans">
                  Satuan pengukuran: <span className="text-white font-semibold">{subIndicator.unit}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Interpretasi */}
          {activeTab === 'interpretasi' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80">
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide mb-1.5">
                  Cara Membaca & Interpretasi Angka
                </h4>
                <p className="text-sm text-amber-950 leading-relaxed">
                  {subIndicator.interpretasi || subIndicator.status_tanjabbar || 'Angka persentase menunjukkan proporsi kelompok sasaran terhadap total populasi referensi yang diukur.'}
                </p>
              </div>
            </div>
          )}

          {/* Source Citation Footer */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
            <span>
              Dokumen Rujukan: <strong className="text-slate-600">Buku Indikator Pekerjaan Layak di Indonesia (BPS & ILO)</strong>
            </span>
            {subIndicator.file && (
              <span className="font-mono text-slate-500">
                File Data: {subIndicator.file}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
