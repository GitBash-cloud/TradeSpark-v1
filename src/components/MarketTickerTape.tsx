import React, { useState, useMemo } from 'react';
import { MarketAsset } from '../types';
import { MarketTickerCard } from './MarketTickerCard';
import { Activity, RefreshCw } from 'lucide-react';

interface MarketTickerTapeProps {
  assets: MarketAsset[];
  selectedAssetId: string | null;
  onAssetClick: (asset: MarketAsset) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

const CATEGORIES = ['All', 'OTC', 'Crypto', 'Forex', 'Indices', 'Stocks'] as const;

export const MarketTickerTape: React.FC<MarketTickerTapeProps> = ({
  assets,
  selectedAssetId,
  onAssetClick,
  onRefresh,
  isRefreshing = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredAssets = useMemo(() => {
    if (selectedCategory === 'All') return assets;
    if (selectedCategory === 'OTC') return assets.filter((a) => a.isOtc);
    return assets.filter((a) => a.assetType.toLowerCase() === selectedCategory.toLowerCase());
  }, [assets, selectedCategory]);

  return (
    <div id="market_overview_tape" className="w-full flex flex-col gap-2">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#00E676]" />
          <h3 className="text-xs font-bold text-white tracking-wider uppercase">Market Overview</h3>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#2B1D3A] text-[#CE93D8] border border-[#AB47BC]/40">
            LIVE
          </span>
        </div>

        {onRefresh && (
          <button
            id="market_refresh_indicator"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1C2430] border border-[#283243] hover:border-[#3d4d66] text-[#959DAD] hover:text-white text-[10px] font-medium transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-2.5 h-2.5 ${isRefreshing ? 'animate-spin text-[#00E676]' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync'}</span>
          </button>
        )}
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-1.5 px-4 overflow-x-auto no-scrollbar py-1">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              id={`ticker_filter_${cat.toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#00875A] text-white font-bold border border-[#00E676]'
                  : 'bg-[#1C2430] text-[#959DAD] hover:text-white border border-[#283243]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Horizontal scrolling ticker cards */}
      <div
        id="market_overview_ticker_row"
        className="flex items-center gap-3 px-4 overflow-x-auto py-1 scroll-smooth pb-2"
      >
        {filteredAssets.map((asset) => (
          <MarketTickerCard
            key={asset.id}
            asset={asset}
            isSelected={asset.id === selectedAssetId}
            onClick={() => onAssetClick(asset)}
          />
        ))}
      </div>
    </div>
  );
};
