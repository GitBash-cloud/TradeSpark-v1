import React, { useState, useMemo } from 'react';
import { TradingSignal } from '../types';
import {
  Flame,
  Clock,
  Copy,
  Check,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  Brain,
  Layers,
} from 'lucide-react';

interface ActiveSignalsSectionProps {
  signals: TradingSignal[];
  onSelectPair?: (symbol: string) => void;
  onTradeSignal?: (signal: TradingSignal) => void;
}

const SIGNAL_CATEGORIES = ['All', 'OTC', 'Forex', 'Crypto'] as const;

export const ActiveSignalsSection: React.FC<ActiveSignalsSectionProps> = ({
  signals,
  onSelectPair,
  onTradeSignal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedSignalId, setCopiedSignalId] = useState<string | null>(null);

  const filteredSignals = useMemo(() => {
    if (selectedCategory === 'All') return signals;
    if (selectedCategory === 'OTC') return signals.filter((s) => s.isOtc);
    return signals.filter((s) => s.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [signals, selectedCategory]);

  const handleCopy = (sig: TradingSignal) => {
    const text = sig.isOtc
      ? `[TradeSpark AI Signal]\nPair: ${sig.pair}\nType: ${sig.type}\nEntry Strike: ${sig.entryPrice}\nExpiry: ${sig.expiryTime}\nConfidence: ${sig.confidencePercentage}%\nSMC Rationale: ${sig.smcRationale}`
      : `[TradeSpark AI Signal]\nPair: ${sig.pair}\nType: ${sig.type}\nEntry: ${sig.entryPrice}\nSL: ${sig.stopLoss}\nTP: ${sig.takeProfit}\nR:R: ${sig.riskRewardRatio}\nConfidence: ${sig.confidencePercentage}%`;

    navigator.clipboard.writeText(text);
    setCopiedSignalId(sig.id);
    setTimeout(() => setCopiedSignalId(null), 2500);
  };

  return (
    <div id="active_signals_section" className="flex flex-col gap-3 px-4">
      {/* Header & Categories */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-[#00E676]" />
            <h3 className="text-xs font-bold text-white tracking-wider uppercase">
              Active Signals Feed
            </h3>
          </div>
          <p className="text-[10px] text-[#00E676] font-semibold mt-0.5">Live AI & SMC Engine</p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1 bg-[#161C24] p-1 rounded-lg border border-[#283243]">
          {SIGNAL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#00875A] text-white font-bold'
                    : 'text-[#959DAD] hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Signals List */}
      <div className="flex flex-col gap-3">
        {filteredSignals.map((sig) => {
          const isBullish = sig.type === 'CALL' || sig.type === 'BUY';
          const isCopied = copiedSignalId === sig.id;

          return (
            <div
              key={sig.id}
              id={`signal_card_${sig.id}`}
              className="p-4 rounded-2xl bg-[#161C24] border border-[#283243] hover:border-[#3a475a] transition-all shadow-md flex flex-col gap-3"
            >
              {/* Card Header: Pair, Direction Badge, Confidence */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-black shrink-0 ${
                      isBullish ? 'bg-[#00E676]/20 text-[#00E676]' : 'bg-[#FF1744]/20 text-[#FF1744]'
                    }`}
                  >
                    {isBullish ? (
                      <ArrowUpRight className="w-5 h-5" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-extrabold text-sm text-white tracking-tight">{sig.pair}</h4>
                      {sig.isOtc ? (
                        <span className="px-1 py-0.2 rounded text-[8px] font-bold bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/30">
                          OTC
                        </span>
                      ) : (
                        <span className="px-1 py-0.2 rounded text-[8px] font-bold bg-[#0B0E14] text-[#959DAD] border border-[#283243]">
                          {sig.category}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-[#959DAD]">
                      <span>{sig.timeframe} Chart</span>
                      <span>•</span>
                      <span>{sig.timestamp}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Confidence Badge */}
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-black tracking-wider ${
                      isBullish ? 'bg-[#00E676]/15 text-[#00E676]' : 'bg-[#FF1744]/15 text-[#FF1744]'
                    }`}
                  >
                    {sig.type}
                  </span>

                  <span className="text-[10px] font-extrabold text-[#00B8D9] flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#00B8D9]" />
                    {sig.confidencePercentage}% AI Conf.
                  </span>
                </div>
              </div>

              {/* SMC Rationale Badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B0E14] border border-[#283243] text-xs">
                <Brain className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                <span className="text-[#959DAD] text-[11px]">SMC Setup:</span>
                <span className="font-bold text-white text-[11px] truncate">{sig.smcRationale}</span>
              </div>

              {/* Metrics Grid */}
              {sig.isOtc ? (
                /* Binary / OTC Metrics Grid */
                <div className="grid grid-cols-4 gap-1.5 p-2 rounded-xl bg-[#0B0E14] border border-[#283243]/80 text-center">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-[#637381] font-bold uppercase">Direction</span>
                    <span
                      className={`text-xs font-black ${
                        isBullish ? 'text-[#00E676]' : 'text-[#FF1744]'
                      }`}
                    >
                      {sig.type}
                    </span>
                  </div>
                  <div className="flex flex-col border-l border-[#283243]">
                    <span className="text-[9px] text-[#637381] font-bold uppercase">Strike</span>
                    <span className="text-xs font-bold text-white truncate px-1">{sig.entryPrice}</span>
                  </div>
                  <div className="flex flex-col border-l border-[#283243]">
                    <span className="text-[9px] text-[#637381] font-bold uppercase">Expiry</span>
                    <span className="text-xs font-bold text-[#FFAB00] truncate">{sig.expiryTime}</span>
                  </div>
                  <div className="flex flex-col border-l border-[#283243]">
                    <span className="text-[9px] text-[#637381] font-bold uppercase">Est. Payout</span>
                    <span className="text-xs font-black text-[#00E676]">{sig.payoutPercentage || '94%'}</span>
                  </div>
                </div>
              ) : (
                /* Traditional Forex / Crypto Metrics Grid */
                <div className="grid grid-cols-4 gap-1.5 p-2 rounded-xl bg-[#0B0E14] border border-[#283243]/80 text-center">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-[#637381] font-bold uppercase">Entry</span>
                    <span className="text-xs font-bold text-white truncate px-1">{sig.entryPrice}</span>
                  </div>
                  <div className="flex flex-col border-l border-[#283243]">
                    <span className="text-[9px] text-[#637381] font-bold uppercase">Stop Loss</span>
                    <span className="text-xs font-bold text-[#FF1744] truncate px-1">{sig.stopLoss}</span>
                  </div>
                  <div className="flex flex-col border-l border-[#283243]">
                    <span className="text-[9px] text-[#637381] font-bold uppercase">Take Profit</span>
                    <span className="text-xs font-bold text-[#00E676] truncate px-1">{sig.takeProfit}</span>
                  </div>
                  <div className="flex flex-col border-l border-[#283243]">
                    <span className="text-[9px] text-[#637381] font-bold uppercase">R:R Ratio</span>
                    <span className="text-xs font-black text-[#FFAB00]">{sig.riskRewardRatio}</span>
                  </div>
                </div>
              )}

              {/* AI Explanation Snippet */}
              <p className="text-[11px] text-[#959DAD] leading-relaxed line-clamp-2 italic">
                "{sig.aiRationale}"
              </p>

              {/* Footer Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleCopy(sig)}
                  className="flex-1 h-8 rounded-lg bg-[#1C2430] hover:bg-[#253040] border border-[#283243] text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#00E676]" />
                      <span className="text-[#00E676]">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#959DAD]" />
                      <span>Copy Setup</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    if (onTradeSignal) onTradeSignal(sig);
                    if (onSelectPair) onSelectPair(sig.pair);
                  }}
                  className="px-3 h-8 rounded-lg bg-[#00875A] hover:bg-[#00A86B] text-white text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                >
                  <span>Trade on Terminal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
