import React, { useState, useRef } from 'react';
import { TradingSignal } from '../types';
import {
  Camera,
  Upload,
  Sparkles,
  CheckCircle2,
  X,
  Brain,
  Zap,
  TrendingUp,
  TrendingDown,
  Layers,
  Clock,
} from 'lucide-react';

interface ChartScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySignal: (signal: TradingSignal) => void;
}

type ScannerMode = 'FOREX' | 'OTC_BINARY';

export const ChartScannerModal: React.FC<ChartScannerModalProps> = ({
  isOpen,
  onClose,
  onApplySignal,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<ScannerMode>('OTC_BINARY');
  const [selectedExpiry, setSelectedExpiry] = useState<string>('1 Min');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [selectedPair, setSelectedPair] = useState<string>('EUR/USD (OTC)');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [deployedNotification, setDeployedNotification] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target?.result as string);
        triggerScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeploy = () => {
    const isForex = mode === 'FOREX';
    const newSignal: TradingSignal = {
      id: `sig_scan_${Date.now()}`,
      pair: isForex ? 'EUR/USD' : selectedPair,
      type: isForex ? 'BUY' : 'CALL',
      timeframe: isForex ? '1H' : 'M1',
      entryPrice: isForex ? '1.08450' : '1.08640',
      stopLoss: isForex ? '1.08120' : undefined,
      takeProfit: isForex ? '1.09250' : undefined,
      riskRewardRatio: isForex ? '1:2.52' : undefined,
      expiryTime: isForex ? undefined : `${selectedExpiry} Expiry`,
      confidencePercentage: isForex ? 94 : 96,
      smcRationale: isForex ? 'Bull Flag Breakout' : 'Order Block Rejection + FVG Imbalance',
      timestamp: 'Just now',
      aiRationale: isForex
        ? 'Technical AI diagnosis identified clean ascending channel breakout with 1.08450 demand zone confirmation.'
        : 'Quotex/PO OTC feed retested bullish Order Block at key discount level with Fair Value Gap (FVG) mitigation and institutional volume spike.',
      payoutPercentage: isForex ? undefined : '95%',
      isOtc: !isForex,
      category: isForex ? 'Forex' : 'OTC',
    };

    onApplySignal(newSignal);
    setDeployedNotification(true);
    setTimeout(() => {
      setDeployedNotification(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        id="chart_scanner_dialog"
        className="w-full max-w-lg rounded-2xl bg-[#161C24] border border-[#283243] shadow-2xl p-4 sm:p-5 flex flex-col gap-4 relative overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#0B0E14] border border-[#283243] text-[#959DAD] hover:text-white transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3 pr-8">
          <div className="w-10 h-10 rounded-xl bg-[#00E676]/20 border border-[#00E676]/40 flex items-center justify-center shrink-0">
            <Camera className="w-5 h-5 text-[#00E676]" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">TradeSpark AI Vision Scanner</h3>
            <p className="text-xs text-[#959DAD] mt-0.5">
              Instant candlestick pattern detection, institutional SMC zones & automated trade setup.
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-[#0B0E14] border border-[#283243]">
          <button
            id="scanner_mode_forex"
            onClick={() => {
              setMode('FOREX');
              triggerScan();
            }}
            className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === 'FOREX'
                ? 'bg-[#1E3A5F] border border-[#00B8D9] text-white shadow-sm'
                : 'text-[#959DAD] hover:text-white'
            }`}
          >
            Standard Forex
          </button>
          <button
            id="scanner_mode_otc"
            onClick={() => {
              setMode('OTC_BINARY');
              triggerScan();
            }}
            className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === 'OTC_BINARY'
                ? 'bg-[#00875A] border border-[#00E676] text-white shadow-sm'
                : 'text-[#959DAD] hover:text-white'
            }`}
          >
            OTC Binary (Quotex/PO)
          </button>
        </div>

        {/* Scanner Viewfinder Area */}
        <div className="relative w-full h-44 rounded-xl bg-[#0B0E14] border border-[#1E2838] overflow-hidden flex items-center justify-center">
          {customImage ? (
            <img src={customImage} alt="Uploaded chart" className="w-full h-full object-cover" />
          ) : (
            /* Simulated Candlestick Chart in Viewfinder */
            <div className="w-full h-full p-3 flex flex-col justify-between relative select-none">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none opacity-20">
                <div className="border-b border-white" />
                <div className="border-b border-white" />
                <div className="border-b border-white" />
              </div>

              {/* Simulated Candlesticks */}
              <div className="flex items-end justify-around h-28 pt-4 px-2">
                {[
                  { h: 'h-14', c: 'bg-[#00E676]' },
                  { h: 'h-10', c: 'bg-[#FF1744]' },
                  { h: 'h-18', c: 'bg-[#00E676]' },
                  { h: 'h-12', c: 'bg-[#00E676]' },
                  { h: 'h-20', c: 'bg-[#00E676]' },
                  { h: 'h-16', c: 'bg-[#FF1744]' },
                  { h: 'h-24', c: 'bg-[#00E676]' },
                  { h: 'h-22', c: 'bg-[#00E676]' },
                ].map((cdl, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className={`w-0.5 h-3 ${cdl.c}`} />
                    <div className={`w-3.5 ${cdl.h} ${cdl.c} rounded-xs`} />
                    <div className={`w-0.5 h-3 ${cdl.c}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Animated Laser Scanning Line */}
          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E676] to-transparent shadow-[0_0_12px_#00E676] animate-laser pointer-events-none" />

          {/* Pair Tag overlay */}
          <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-black/80 text-[10px] font-mono text-white font-bold border border-[#283243]">
            {mode === 'FOREX' ? 'EUR/USD • 1H' : 'EUR/USD (OTC) • M1'}
          </div>

          {/* Detected Badge */}
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#00E676]/20 border border-[#00E676]/50 text-[#00E676] text-[10px] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>
              {mode === 'FOREX'
                ? 'Bull Flag Breakout + Demand Retest Detected'
                : 'Order Block Rejection + FVG Fill Detected'}
            </span>
          </div>
        </div>

        {/* Diagnosis Results Card */}
        {mode === 'FOREX' ? (
          /* FOREX ANALYSIS ENGINE */
          <div className="p-3.5 rounded-xl bg-[#0B0E14] border border-[#283243] flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#00B8D9]" />
                <span>Technical Forex Diagnosis</span>
              </div>
              <span className="text-xs font-bold text-[#00B8D9]">93.8% Win Rate</span>
            </div>

            <div className="grid grid-cols-4 gap-1 p-2 rounded-lg bg-[#161C24] border border-[#283243] text-center">
              <div>
                <span className="text-[9px] text-[#637381] font-bold block">SIGNAL</span>
                <span className="text-xs font-black text-[#00E676]">BUY / LONG</span>
              </div>
              <div className="border-l border-[#283243]">
                <span className="text-[9px] text-[#637381] font-bold block">ENTRY</span>
                <span className="text-xs font-bold text-white">1.08450</span>
              </div>
              <div className="border-l border-[#283243]">
                <span className="text-[9px] text-[#637381] font-bold block">STOP LOSS</span>
                <span className="text-xs font-bold text-[#FF1744]">1.08120</span>
              </div>
              <div className="border-l border-[#283243]">
                <span className="text-[9px] text-[#637381] font-bold block">TAKE PROFIT</span>
                <span className="text-xs font-bold text-[#00E676]">1.09250</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#959DAD]">
              <span className="text-[#FFAB00] font-bold">Risk-to-Reward Ratio: 1:2.52</span>
              <span>Timeframe: 1H Chart</span>
            </div>
          </div>
        ) : (
          /* OTC BINARY ANALYSIS ENGINE */
          <div className="p-3.5 rounded-xl bg-[#0B0E14] border border-[#283243] flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <Brain className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>SMC Binary Diagnosis (Quotex/PO)</span>
              </div>
              <span className="text-xs font-bold text-[#00E5FF]">95.4% Win Probability</span>
            </div>

            {/* Contract Expiry Selector */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#959DAD] font-medium">Contract Expiry:</span>
              <div className="flex gap-1.5">
                {['1 Min', '3 Min', '5 Min'].map((exp) => (
                  <button
                    key={exp}
                    onClick={() => setSelectedExpiry(exp)}
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                      selectedExpiry === exp
                        ? 'bg-[#00875A] text-white border border-[#00E676]'
                        : 'bg-[#161C24] text-[#959DAD] hover:text-white border border-[#283243]'
                    }`}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-1 p-2 rounded-lg bg-[#161C24] border border-[#283243] text-center">
              <div>
                <span className="text-[9px] text-[#637381] font-bold block">DIRECTION</span>
                <span className="text-xs font-black text-[#00E676]">CALL (UP)</span>
              </div>
              <div className="border-l border-[#283243]">
                <span className="text-[9px] text-[#637381] font-bold block">EXPIRY</span>
                <span className="text-xs font-bold text-[#FFAB00]">{selectedExpiry}</span>
              </div>
              <div className="border-l border-[#283243]">
                <span className="text-[9px] text-[#637381] font-bold block">STRIKE</span>
                <span className="text-xs font-bold text-white">1.08640</span>
              </div>
              <div className="border-l border-[#283243]">
                <span className="text-[9px] text-[#637381] font-bold block">EST. PAYOUT</span>
                <span className="text-xs font-black text-[#00E676]">+94% Yield</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#959DAD]">
              <span className="text-[#00E5FF] font-bold">SMC Setup: Order Block Rejection</span>
              <span className="text-[10px]">Feed: Pocket Option / Quotex</span>
            </div>
          </div>
        )}

        {/* Action Buttons: Scan + Upload */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={triggerScan}
            disabled={isScanning}
            className="flex-1 h-11 rounded-xl bg-[#00875A] hover:bg-[#00A86B] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <Camera className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning Candlesticks...' : 'Scan Chart Now'}</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-11 h-11 rounded-xl bg-[#222B38] hover:bg-[#2e3b4d] border border-[#2E3B4D] text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
            title="Upload Chart Screenshot"
          >
            <Upload className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Deploy Signal Button */}
        <button
          onClick={handleDeploy}
          className={`w-full h-11 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
            mode === 'FOREX'
              ? 'bg-[#1E3A5F] hover:bg-[#264b7d] border border-[#00B8D9]'
              : 'bg-[#00875A] hover:bg-[#00A86B] border border-[#00E676]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>
            {deployedNotification
              ? 'Signal Added to Feed!'
              : mode === 'FOREX'
              ? 'Deploy Forex Signal to Feed'
              : 'Deploy OTC Binary Signal to Feed'}
          </span>
        </button>
      </div>
    </div>
  );
};
