import React from 'react';
import { Brain, Zap, CheckCircle } from 'lucide-react';

interface OtcMarketModeBarProps {
  isOtcModeEnabled: boolean;
  onToggleOtcMode: (enabled: boolean) => void;
}

export const OtcMarketModeBar: React.FC<OtcMarketModeBarProps> = ({
  isOtcModeEnabled,
  onToggleOtcMode,
}) => {
  return (
    <div
      id="otc_market_mode_card"
      className={`mx-4 p-3.5 rounded-2xl border transition-all duration-300 shadow-md ${
        isOtcModeEnabled
          ? 'bg-gradient-to-r from-[#10261E] via-[#161C24] to-[#182230] border-[#00E676]/40 shadow-[#00E676]/5'
          : 'bg-[#161C24] border-[#283243]'
      }`}
    >
      {/* Top Row: Title, Status Badge, and Switch */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Status indicator dot */}
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isOtcModeEnabled ? 'bg-[#00E676] pulse-emerald' : 'bg-gray-500'
            }`}
          />

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[13px] font-extrabold text-white tracking-wide uppercase">
                OTC Market Mode
              </h3>
              <span
                className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${
                  isOtcModeEnabled
                    ? 'bg-[#00E676]/15 text-[#00E676] border-[#00E676]/40'
                    : 'bg-[#232B36] text-[#959DAD] border-[#283243]'
                }`}
              >
                {isOtcModeEnabled ? 'ACTIVE 24/7' : 'OFF'}
              </span>
            </div>

            <p
              className={`text-[11px] font-medium mt-0.5 ${
                isOtcModeEnabled ? 'text-[#00B8D9]' : 'text-[#959DAD]'
              }`}
            >
              {isOtcModeEnabled
                ? 'Quotex & Pocket Option • 92%-98% Payouts'
                : 'Standard Exchange Hours Mode'}
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          id="otc_market_mode_toggle"
          role="switch"
          aria-checked={isOtcModeEnabled}
          onClick={() => onToggleOtcMode(!isOtcModeEnabled)}
          className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer relative ${
            isOtcModeEnabled ? 'bg-[#00875A]' : 'bg-[#0B0E14] border border-[#283243]'
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out shadow-md ${
              isOtcModeEnabled ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Info Badges when enabled */}
      {isOtcModeEnabled && (
        <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-[#283243]/50 flex-wrap">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#1C2735] border border-[#2C3E55] text-[10px] font-bold text-[#00B8D9]">
            <Brain className="w-3 h-3 text-[#00B8D9]" />
            <span>SMC Algorithmic Precision</span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#2B2213] border border-[#FFAB00]/30 text-[10px] font-bold text-[#FFAB00]">
            <Zap className="w-3 h-3 text-[#FFAB00]" />
            <span>1M / 5M Binary Expiry</span>
          </div>
        </div>
      )}
    </div>
  );
};
