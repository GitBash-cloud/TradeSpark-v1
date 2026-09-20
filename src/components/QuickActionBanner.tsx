import React from 'react';
import { Sparkles, Camera, Upload } from 'lucide-react';

interface QuickActionBannerProps {
  onScanClick: () => void;
}

export const QuickActionBanner: React.FC<QuickActionBannerProps> = ({ onScanClick }) => {
  return (
    <div
      id="quick_action_scanner_card"
      onClick={onScanClick}
      className="mx-4 rounded-2xl border border-[#00E676]/40 bg-gradient-to-br from-[#0F3227] via-[#132838] to-[#161C24] p-4.5 shadow-xl shadow-[#00E676]/5 cursor-pointer relative overflow-hidden group transition-all hover:border-[#00E676]/70"
    >
      {/* AI Vision Scanner Pill */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00C853]/20 border border-[#00E676]/40 text-[#00E676] text-[10px] font-bold tracking-wider mb-2.5">
        <Sparkles className="w-3 h-3 text-[#00E676]" />
        <span>AI VISION SCANNER</span>
      </div>

      <div className="flex items-center justify-between gap-3 mb-3.5">
        <div className="max-w-[70%]">
          <h3 className="text-base font-extrabold text-white leading-tight">
            Scan Chart & Get AI Insights
          </h3>
          <p className="text-xs text-[#959DAD] mt-1 leading-relaxed">
            Instant candlestick detection, support/resistance levels & automated SL/TP setup.
          </p>
        </div>

        {/* Glowing circular camera badge */}
        <div className="w-13 h-13 rounded-full bg-[#16232E] border-2 border-[#00E676]/70 flex items-center justify-center shrink-0 shadow-lg shadow-[#00E676]/20 group-hover:scale-105 transition-transform">
          <Camera className="w-6 h-6 text-[#00E676]" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5">
        <button
          id="scan_chart_cta_button"
          onClick={(e) => {
            e.stopPropagation();
            onScanClick();
          }}
          className="flex-1 h-10 rounded-xl bg-[#00875A] hover:bg-[#00A86B] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-[#00875A]/20"
        >
          <Camera className="w-4 h-4" />
          <span>Scan Chart Now</span>
        </button>

        <button
          id="upload_chart_cta_button"
          onClick={(e) => {
            e.stopPropagation();
            onScanClick();
          }}
          className="w-10 h-10 rounded-xl bg-[#222B38] hover:bg-[#2c3848] border border-[#2E3B4D] text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
          title="Upload Chart Screenshot"
        >
          <Upload className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};
