import React from 'react';
import { BrokerInfo, BrokerKey } from '../types';
import { BROKERS } from '../data/mockData';
import { Activity, Eye, EyeOff, Maximize2, Check, Zap } from 'lucide-react';

interface BrokerSelectorProps {
  activeBroker: BrokerKey;
  isWebViewVisible: boolean;
  onBrokerChanged: (broker: BrokerKey) => void;
  onToggleWebView: () => void;
  onLaunchFullScreen: () => void;
}

export const BrokerSelector: React.FC<BrokerSelectorProps> = ({
  activeBroker,
  isWebViewVisible,
  onBrokerChanged,
  onToggleWebView,
  onLaunchFullScreen,
}) => {
  const currentBrokerInfo: BrokerInfo = BROKERS[activeBroker];

  return (
    <div
      id="broker_selector_container"
      className="mx-4 p-3.5 rounded-2xl bg-[#161C24] border border-[#283243] shadow-md relative overflow-hidden"
    >
      {/* Top row: Terminal title & Latency */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00E676] pulse-emerald" />
          <span className="text-[11px] font-bold text-white tracking-wider uppercase">
            Integrated Broker Terminal
          </span>
        </div>

        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0B0E14] border border-[#283243] text-[10px] font-bold text-[#00E5FF]">
          <Zap className="w-3 h-3 text-[#00E5FF]" />
          <span>{currentBrokerInfo.latency}</span>
        </div>
      </div>

      {/* Dual Broker Switcher Tabs */}
      <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[#0B0E14] border border-[#283243] mb-2.5">
        {(Object.keys(BROKERS) as BrokerKey[]).map((key) => {
          const broker = BROKERS[key];
          const isSelected = activeBroker === key;
          return (
            <button
              key={key}
              id={`broker_button_${broker.displayName.toLowerCase().replace(' ', '_')}`}
              onClick={() => onBrokerChanged(key)}
              className={`flex items-center justify-center gap-2 py-2 px-2.5 rounded-lg text-xs transition-all cursor-pointer ${
                isSelected
                  ? key === 'QUOTEX'
                    ? 'bg-[#0F263B] border border-[#00E5FF] text-white font-bold'
                    : 'bg-[#132047] border border-[#2979FF] text-white font-bold'
                  : 'bg-transparent text-[#959DAD] hover:text-white border border-transparent'
              }`}
            >
              {/* Monogram Badge */}
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black text-white shrink-0 ${
                  isSelected
                    ? key === 'QUOTEX'
                      ? 'bg-gradient-to-br from-[#00E5FF] to-[#00E676]'
                      : 'bg-gradient-to-br from-[#2979FF] to-[#00B0FF]'
                    : 'bg-[#283243]'
                }`}
              >
                {broker.shortName}
              </div>

              <span className="truncate">{broker.displayName}</span>

              {isSelected && <Check className="w-3.5 h-3.5 text-[#00E676] shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Bottom info & actions */}
      <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
        <p className="text-[11px] text-[#959DAD] truncate">{currentBrokerInfo.tagline}</p>

        <div className="flex items-center gap-2 shrink-0">
          <button
            id="toggle_broker_webview_button"
            onClick={onToggleWebView}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer border ${
              isWebViewVisible
                ? 'bg-[#00E5FF]/15 border-[#00E5FF] text-[#00E5FF]'
                : 'bg-[#1C2430] border-[#283243] text-white hover:border-[#38465c]'
            }`}
          >
            {isWebViewVisible ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span>Hide Terminal</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Show Terminal</span>
              </>
            )}
          </button>

          <button
            id="fullscreen_broker_webview_button"
            onClick={onLaunchFullScreen}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-[#1C2430] border border-[#283243] text-[#00E5FF] hover:border-[#00E5FF] transition-all cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Full Screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
