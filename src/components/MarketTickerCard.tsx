import React from 'react';
import { MarketAsset } from '../types';
import { MiniSparkline } from './MiniSparkline';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketTickerCardProps {
  asset: MarketAsset;
  isSelected: boolean;
  onClick: () => void;
}

export const MarketTickerCard: React.FC<MarketTickerCardProps> = ({ asset, isSelected, onClick }) => {
  const isBullish = asset.isBullish;

  return (
    <div
      id={`ticker_card_${asset.id}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className={`shrink-0 w-[172px] p-3.5 rounded-2xl cursor-pointer transition-all duration-200 select-none ${
        isSelected
          ? 'bg-[#1C2430] border-[#00E676] shadow-lg shadow-[#00E676]/10'
          : 'bg-[#161C24] border-[#283243] hover:border-[#38465c] hover:bg-[#19212c]'
      } border`}
    >
      {/* Top row: Symbol and Change Badge */}
      <div className="flex items-start justify-between gap-1 mb-2.5">
        <div className="overflow-hidden">
          <h4 className="font-bold text-[13px] text-white truncate tracking-tight">{asset.symbol}</h4>
          <p className="text-[10px] text-[#959DAD] truncate">{asset.name}</p>
        </div>

        <div
          className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-semibold shrink-0 ${
            isBullish ? 'bg-[#00E676]/15 text-[#00E676]' : 'bg-[#FF1744]/15 text-[#FF1744]'
          }`}
        >
          {isBullish ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
          <span>{asset.changePercentage}</span>
        </div>
      </div>

      {/* Price and OTC Payout / Asset Type Badge */}
      <div className="flex items-baseline justify-between gap-1 mb-2.5">
        <span className="text-[15px] font-extrabold text-white tracking-wide">{asset.price}</span>

        {asset.isOtc ? (
          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30">
            {asset.otcPayout}
          </span>
        ) : (
          <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#0B0E14] text-[#636E80] border border-[#283243]">
            {asset.assetType.toUpperCase()}
          </span>
        )}
      </div>

      {/* Sparkline canvas */}
      <div className="w-full h-9 rounded-lg bg-[#0B0E14]/60 p-1 flex items-center justify-center overflow-hidden border border-[#283243]/40">
        <MiniSparkline points={asset.sparklinePoints} isBullish={isBullish} />
      </div>
    </div>
  );
};
