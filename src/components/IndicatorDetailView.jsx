import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  AlertCircle,
  TrendingUp,
  Table as TableIcon,
  BarChart2,
  Users,
  MapPin,
  Info
} from 'lucide-react';
import MetricCard from './MetricCard';

export default function IndicatorDetailView({ indicator, selectedYear }) {
  const [activeSubTab, setActiveSubTab] = useState('gender'); // 'gender', 'wilayah', 'trend'

  if (!indicator) return null;

  if (indicator.empty) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-2xl mx-auto my-12 shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">{indicator.name}</h3>
        <p className="text-sm font-semibold text-slate-600 mb-3">{indicator.subIndicator}</p>
        <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
          {indicator.description}
        </p>
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 inline-block">
          📌 Catatan BPS: Data untuk indikator ini tidak ditemukan atau belum dipublikasikan pada survei Sakernas Tanjung Jabung Barat 2025.
        </div>
      </div>
    );
  }

  // Filter current year data
  const genderYearData = (indicator.genderData || []).filter(d => d.tahun === selectedYear);
  const wilayahYearData = (indicator.wilayahData || []).filter(d => d.tahun === selectedYear);

  // Extract key KPI numbers for current year
  const totalRow = genderYearData.find(d => 
    d.kategori.toLowerCase().includes('total') || 
    d.kategori.toLowerCase().includes('laki-laki dan perempuan') ||
    d.kategori.toLowerCase().includes('laki-laki & perempuan')
  ) || genderYearData[0];

  const maleRow = genderYearData.find(d => 
    d.kategori.toLowerCase() === 'laki-laki'
  );

  const femaleRow = genderYearData.find(d => 
    d.kategori.toLowerCase() === 'perempuan'
  );

  const desaRow = wilayahYearData.find(d => 
    d.kategori.toLowerCase() === 'perdesaan'
  );

  const kotaRow = wilayahYearData.find(d => 
    d.kategori.toLowerCase() === 'perkotaan'
  );

  // Build Trend Data for Multi-year Line Chart
  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const trendData = years.map(yr => {
    const yrG = (indicator.genderData || []).filter(d => d.tahun === yr);
    const yrW = (indicator.wilayahData || []).filter(d => d.tahun === yr);

    const tot = yrG.find(d => 
      d.kategori.toLowerCase().includes('total') || 
      d.kategori.toLowerCase().includes('laki-laki dan perempuan') ||
      d.kategori.toLowerCase().includes('laki-laki & perempuan')
    );
    const lk = yrG.find(d => d.kategori.toLowerCase() === 'laki-laki');
    const pr = yrG.find(d => d.kategori.toLowerCase() === 'perempuan');
    const desa = yrW.find(d => d.kategori.toLowerCase() === 'perdesaan');
    const kota = yrW.find(d => d.kategori.toLowerCase() === 'perkotaan');

    return {
      tahun: yr,
      Total: tot ? tot.nilai : null,
      'Laki-laki': lk ? lk.nilai : null,
      Perempuan: pr ? pr.nilai : null,
      Perdesaan: desa ? desa.nilai : null,
      Perkotaan: kota ? kota.nilai : null
    };
  });

  const hasWilayah = indicator.wilayahData && indicator.wilayahData.length > 0;

  return (
    <div className="space-y-6">
      {/* Indicator Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-bold font-mono">
            INDIKATOR {indicator.number}
          </span>
          <span className="text-xs font-medium text-slate-500">•</span>
          <span className="text-xs font-semibold text-slate-600">{indicator.subIndicator}</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{indicator.name}</h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-4xl">
          {indicator.description}
        </p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title={`Total (${selectedYear})`}
          value={totalRow ? totalRow.nilai : '-'}
          unit={indicator.unit}
          subtitle={totalRow?.pekerja ? `${totalRow.pekerja.toLocaleString('id-ID')} orang` : 'Nilai gabungan'}
          color="blue"
        />
        <MetricCard
          title="Laki-laki"
          value={maleRow ? maleRow.nilai : '-'}
          unit={indicator.unit}
          subtitle={maleRow?.pekerja ? `${maleRow.pekerja.toLocaleString('id-ID')} orang` : '-'}
          color="indigo"
        />
        <MetricCard
          title="Perempuan"
          value={femaleRow ? femaleRow.nilai : '-'}
          unit={indicator.unit}
          subtitle={femaleRow?.pekerja ? `${femaleRow.pekerja.toLocaleString('id-ID')} orang` : '-'}
          color="rose"
        />
        <MetricCard
          title={hasWilayah ? "Perkotaan vs Perdesaan" : "Disparitas Gender"}
          value={
            hasWilayah && kotaRow && desaRow
              ? `${kotaRow.nilai}% / ${desaRow.nilai}%`
              : (maleRow && femaleRow ? `${Math.abs(Math.round((maleRow.nilai - femaleRow.nilai)*10)/10)}%` : '-')
          }
          unit=""
          subtitle={hasWilayah ? "Kota vs Desa" : "Selisih Gender"}
          color="emerald"
        />
      </div>

      {/* View Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('gender')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'gender'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          Berdasarkan Kategori / Gender ({selectedYear})
        </button>

        {hasWilayah && (
          <button
            onClick={() => setActiveSubTab('wilayah')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'wilayah'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Berdasarkan Wilayah ({selectedYear})
          </button>
        )}

        <button
          onClick={() => setActiveSubTab('trend')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'trend'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          Tren Historis (2020 - 2025)
        </button>
      </div>

      {/* Main Visualizations Area */}
      {activeSubTab === 'gender' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <h3 className="text-base font-bold text-slate-800 mb-1">
              Grafik Perbandingan Menurut Kategori ({selectedYear})
            </h3>
            <p className="text-xs text-slate-500 mb-4">{indicator.metricName}</p>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={genderYearData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="kategori" tick={{ fontSize: 11, fill: '#64748b' }} interval={0} />
                  <YAxis unit="%" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', color: '#fff', border: 'none', fontSize: '12px' }}
                    formatter={(val) => [`${val}%`, indicator.metricName]}
                  />
                  <Bar dataKey="nilai" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={44} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-3">Tabel Ringkas ({selectedYear})</h3>
              <div className="space-y-3">
                {genderYearData.map((row, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-700">{row.kategori}</p>
                      {row.pekerja && (
                        <p className="text-[11px] text-slate-400">
                          {row.pekerja.toLocaleString('id-ID')} pekerja
                        </p>
                      )}
                    </div>
                    <span className="text-base font-extrabold text-blue-700">
                      {row.nilai}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-blue-50 text-blue-800 text-xs flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Sumber: BPS Sakernas Kabupaten Tanjung Jabung Barat.</span>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'wilayah' && hasWilayah && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <h3 className="text-base font-bold text-slate-800 mb-1">
              Perbandingan Wilayah Tempat Tinggal ({selectedYear})
            </h3>
            <p className="text-xs text-slate-500 mb-4">{indicator.metricName}</p>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wilayahYearData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="kategori" tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis unit="%" tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', color: '#fff', border: 'none', fontSize: '12px' }}
                    formatter={(val) => [`${val}%`, indicator.metricName]}
                  />
                  <Bar dataKey="nilai" fill="#059669" radius={[6, 6, 0, 0]} barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <h3 className="text-base font-bold text-slate-800 mb-3">Distribusi Wilayah</h3>
            <div className="space-y-4">
              {wilayahYearData.map((row, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-slate-800">{row.kategori}</span>
                    <span className="text-lg font-extrabold text-emerald-600">{row.nilai}%</span>
                  </div>
                  {row.pekerja && (
                    <div className="text-xs text-slate-500 flex justify-between mt-1">
                      <span>Jumlah Pekerja:</span>
                      <span className="font-semibold text-slate-700">{row.pekerja.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  {row.totalBuruh && (
                    <div className="text-xs text-slate-500 flex justify-between mt-0.5">
                      <span>Total Populasi Terkait:</span>
                      <span className="font-semibold text-slate-700">{row.totalBuruh.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'trend' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Tren Perkembangan 2020 - 2025
              </h3>
              <p className="text-xs text-slate-500">
                Perkembangan nilai {indicator.metricName} dari tahun ke tahun
              </p>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="tahun" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis unit="%" tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', color: '#fff', border: 'none', fontSize: '12px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="Total" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} connectNulls />
                <Line type="monotone" dataKey="Laki-laki" stroke="#4f46e5" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} connectNulls />
                <Line type="monotone" dataKey="Perempuan" stroke="#e11d48" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} connectNulls />
                {hasWilayah && (
                  <Line type="monotone" dataKey="Perdesaan" stroke="#059669" strokeWidth={1.5} dot={{ r: 3 }} connectNulls />
                )}
                {hasWilayah && (
                  <Line type="monotone" dataKey="Perkotaan" stroke="#d97706" strokeWidth={1.5} dot={{ r: 3 }} connectNulls />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Complete Data Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <TableIcon className="w-4 h-4 text-slate-600" />
          <h3 className="text-base font-bold text-slate-800">Rincian Data Tabel Lengkap</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Tahun</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4 text-right">Pekerja Terdampak</th>
                <th className="py-3 px-4 text-right">Populasi Basis</th>
                <th className="py-3 px-4 text-right">Nilai ({indicator.unit})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(indicator.genderData || []).map((row, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-slate-50 transition-colors ${
                    row.tahun === selectedYear ? 'bg-blue-50/50 font-semibold' : ''
                  }`}
                >
                  <td className="py-2.5 px-4 font-mono text-slate-700">{row.tahun}</td>
                  <td className="py-2.5 px-4 text-slate-800">{row.kategori}</td>
                  <td className="py-2.5 px-4 text-right text-slate-600 font-mono">
                    {row.pekerja !== undefined && row.pekerja !== null
                      ? row.pekerja.toLocaleString('id-ID')
                      : '-'}
                  </td>
                  <td className="py-2.5 px-4 text-right text-slate-500 font-mono">
                    {row.usiaKerja || row.totalBuruh || row.totalPekerja
                      ? (row.usiaKerja || row.totalBuruh || row.totalPekerja).toLocaleString('id-ID')
                      : '-'}
                  </td>
                  <td className="py-2.5 px-4 text-right font-bold text-blue-700 font-mono">
                    {row.nilai}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
