import React from 'react';
import {
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Award,
  Zap,
  DollarSign,
  Activity,
  ArrowUpRight,
} from 'lucide-react';

export const AnalyticsTab: React.FC = () => {
  const weeklyData = [
    { day: 'Mon', trades: 18, winRate: 94, profit: '+$640' },
    { day: 'Tue', trades: 22, winRate: 88, profit: '+$810' },
    { day: 'Wed', trades: 19, winRate: 91, profit: '+$750' },
    { day: 'Thu', trades: 25, winRate: 92, profit: '+$920' },
    { day: 'Fri', trades: 21, winRate: 86, profit: '+$590' },
    { day: 'Sat (OTC)', trades: 24, winRate: 95, profit: '+$1,120' },
    { day: 'Sun (OTC)', trades: 20, winRate: 93, profit: '+$890' },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 pb-24">
      {/* Top Headline */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-white">AI Engine Performance</h2>
          <p className="text-xs text-[#959DAD]">Audited win rate & payout statistics</p>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00E676]/15 border border-[#00E676]/30 text-[#00E676] text-xs font-bold">
          <Award className="w-3.5 h-3.5" />
          <span>Verified AI PnL</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 rounded-xl bg-[#161C24] border border-[#283243]">
          <span className="text-[10px] text-[#959DAD] font-semibold uppercase">Win Rate</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-black text-[#00E676]">89.4%</span>
            <span className="text-[10px] text-[#00E676] font-bold">+2.1%</span>
          </div>
          <span className="text-[9px] text-[#637381]">Last 142 AI signals</span>
        </div>

        <div className="p-3 rounded-xl bg-[#161C24] border border-[#283243]">
          <span className="text-[10px] text-[#959DAD] font-semibold uppercase">Net Yield</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-black text-white">+$4,892</span>
            <ArrowUpRight className="w-3 h-3 text-[#00E676]" />
          </div>
          <span className="text-[9px] text-[#637381]">Average +93% payout</span>
        </div>

        <div className="p-3 rounded-xl bg-[#161C24] border border-[#283243]">
          <span className="text-[10px] text-[#959DAD] font-semibold uppercase">Profit Factor</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-black text-[#FFAB00]">2.48</span>
          </div>
          <span className="text-[9px] text-[#637381]">Institutional risk tier</span>
        </div>

        <div className="p-3 rounded-xl bg-[#161C24] border border-[#283243]">
          <span className="text-[10px] text-[#959DAD] font-semibold uppercase">Avg Expiry</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-xl font-black text-[#00B8D9]">60s - 3M</span>
          </div>
          <span className="text-[9px] text-[#637381]">Ultra-fast resolution</span>
        </div>
      </div>

      {/* Broker Accuracy Comparison */}
      <div className="p-4 rounded-2xl bg-[#161C24] border border-[#283243] flex flex-col gap-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          Integrated Broker Precision Comparison
        </h3>

        {/* Quotex Metric */}
        <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-[#0B0E14] border border-[#283243]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#00E5FF]/20 text-[#00E5FF] font-black text-[10px] flex items-center justify-center">
                QX
              </span>
              <span className="text-xs font-bold text-white">Quotex OTC Precision</span>
            </div>
            <span className="text-xs font-black text-[#00E676]">94.2% Win Rate</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#1C2430] overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#00B8D9] to-[#00E676] w-[94%]" />
          </div>
          <div className="flex justify-between text-[10px] text-[#959DAD]">
            <span>Latency: 18ms • Frankfurt-01</span>
            <span>78 Wins / 5 Losses</span>
          </div>
        </div>

        {/* Pocket Option Metric */}
        <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-[#0B0E14] border border-[#283243]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-[#2979FF]/20 text-[#2979FF] font-black text-[10px] flex items-center justify-center">
                PO
              </span>
              <span className="text-xs font-bold text-white">Pocket Option OTC Precision</span>
            </div>
            <span className="text-xs font-black text-[#00B0FF]">91.8% Win Rate</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#1C2430] overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#2979FF] to-[#00B0FF] w-[91%]" />
          </div>
          <div className="flex justify-between text-[10px] text-[#959DAD]">
            <span>Latency: 22ms • London-LD4</span>
            <span>64 Wins / 6 Losses</span>
          </div>
        </div>
      </div>

      {/* 7-Day Performance Breakdown */}
      <div className="p-4 rounded-2xl bg-[#161C24] border border-[#283243] flex flex-col gap-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          7-Day Trading Audit Log
        </h3>

        <div className="flex flex-col gap-2">
          {weeklyData.map((d, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B0E14] border border-[#283243] text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-18 font-bold text-white">{d.day}</span>
                <span className="text-[#959DAD] text-[11px]">{d.trades} Signals</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-[#00E676] font-bold">{d.winRate}% Win</span>
                <span className="font-extrabold text-white">{d.profit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
