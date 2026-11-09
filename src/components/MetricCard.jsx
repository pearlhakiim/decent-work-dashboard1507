import React from 'react';

export default function MetricCard({ title, value, unit = '%', subtitle, icon: Icon, color = 'blue', trend }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
  };

  const badgeColor = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-lg border ${badgeColor}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold tracking-tight text-slate-900">
          {value !== null && value !== undefined ? value : '-'}
        </span>
        {unit && value !== '-' && value !== null && (
          <span className="text-sm font-medium text-slate-500">{unit}</span>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-xs text-slate-500 line-clamp-1">{subtitle}</p>
      )}

      {trend !== undefined && trend !== null && (
        <div className="mt-2.5 flex items-center text-xs font-medium">
          <span className={trend >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
            {trend > 0 ? `+${trend}` : trend}%
          </span>
          <span className="text-slate-400 ml-1.5">vs tahun sebelumnya</span>
        </div>
      )}
    </div>
  );
}
