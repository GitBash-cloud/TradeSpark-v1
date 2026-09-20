import React, { useState, useEffect, useRef } from 'react';
import { BrokerKey, MarketAsset, ActiveTrade } from '../types';
import { BROKERS } from '../data/mockData';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  Maximize2,
  Minimize2,
  X,
  Volume2,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';

interface BrokerTradingViewportProps {
  brokerKey: BrokerKey;
  activeAsset: MarketAsset;
  isFullScreen?: boolean;
  onCloseFullScreen?: () => void;
  onPlaceTrade?: (trade: ActiveTrade) => void;
}

interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  time: number;
}

const TIMEFRAMES = ['10s', '30s', '1M', '5M'] as const;
const STAKE_PRESETS = [10, 25, 50, 100];
const EXPIRIES = ['1M', '2M', '5M'] as const;

export const BrokerTradingViewport: React.FC<BrokerTradingViewportProps> = ({
  brokerKey,
  activeAsset,
  isFullScreen = false,
  onCloseFullScreen,
  onPlaceTrade,
}) => {
  const broker = BROKERS[brokerKey];
  const [selectedTf, setSelectedTf] = useState<string>('1M');
  const [stake, setStake] = useState<number>(50);
  const [selectedExpiry, setSelectedExpiry] = useState<string>('1M');
  const [candles, setCandles] = useState<Candle[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(activeAsset.numericPrice);
  const [openTrades, setOpenTrades] = useState<ActiveTrade[]>([]);
  const [tradeNotification, setTradeNotification] = useState<{ message: string; isWin: boolean } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const priceRef = useRef<number>(activeAsset.numericPrice);

  // Initialize simulated candles on asset change
  useEffect(() => {
    const base = activeAsset.numericPrice;
    priceRef.current = base;
    setCurrentPrice(base);

    const initialCandles: Candle[] = [];
    let p = base * 0.998;
    const now = Date.now();

    for (let i = 24; i >= 0; i--) {
      const delta = (Math.random() - 0.48) * (base * 0.0006);
      const open = p;
      const close = p + delta;
      const high = Math.max(open, close) + Math.random() * (base * 0.0004);
      const low = Math.min(open, close) - Math.random() * (base * 0.0004);
      initialCandles.push({
        open,
        high,
        low,
        close,
        time: now - i * 5000,
      });
      p = close;
    }
    setCandles(initialCandles);
  }, [activeAsset.id]);

  // Real-time tick simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCandles((prev) => {
        if (!prev.length) return prev;
        const last = { ...prev[prev.length - 1] };
        const tickDelta = (Math.random() - 0.49) * (activeAsset.numericPrice * 0.0002);
        const newPrice = Number((last.close + tickDelta).toFixed(activeAsset.isOtc ? 5 : 2));

        priceRef.current = newPrice;
        setCurrentPrice(newPrice);

        last.close = newPrice;
        last.high = Math.max(last.high, newPrice);
        last.low = Math.min(last.low, newPrice);

        // Append new candle every 12 ticks
        if (Math.random() < 0.12) {
          const newCandle: Candle = {
            open: newPrice,
            high: newPrice,
            low: newPrice,
            close: newPrice,
            time: Date.now(),
          };
          return [...prev.slice(-30), newCandle];
        }

        return [...prev.slice(0, -1), last];
      });
    }, 450);

    return () => clearInterval(interval);
  }, [activeAsset.numericPrice, activeAsset.isOtc]);

  // Open trades countdown & resolution
  useEffect(() => {
    if (!openTrades.length) return;

    const timer = setInterval(() => {
      setOpenTrades((prev) => {
        const updated: ActiveTrade[] = [];

        prev.forEach((trade) => {
          if (trade.secondsRemaining <= 1) {
            // Settle trade
            const current = priceRef.current;
            const isWin =
              trade.direction === 'CALL' ? current >= trade.entryPrice : current <= trade.entryPrice;

            const payoutYield = isWin ? trade.stakeAmount * (1 + trade.payoutPercentage / 100) : 0;
            const netProfit = isWin ? trade.stakeAmount * (trade.payoutPercentage / 100) : -trade.stakeAmount;

            setTradeNotification({
              message: isWin
                ? `Trade Won on ${trade.assetSymbol}! +$${netProfit.toFixed(2)} (${trade.direction})`
                : `Trade Closed on ${trade.assetSymbol}: -$${trade.stakeAmount.toFixed(2)}`,
              isWin,
            });

            setTimeout(() => setTradeNotification(null), 5000);
          } else {
            updated.push({
              ...trade,
              secondsRemaining: trade.secondsRemaining - 1,
            });
          }
        });

        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [openTrades]);

  // Render canvas chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !candles.length) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Clear background
    ctx.fillStyle = '#0F141C';
    ctx.fillRect(0, 0, width, height);

    // Compute min/max
    const allLows = candles.map((c) => c.low);
    const allHighs = candles.map((c) => c.high);
    let minPrice = Math.min(...allLows);
    let maxPrice = Math.max(...allHighs);
    if (maxPrice === minPrice) {
      minPrice *= 0.999;
      maxPrice *= 1.001;
    }
    const paddingY = 24;
    const availableH = height - paddingY * 2;
    const priceToY = (p: number) => height - paddingY - ((p - minPrice) / (maxPrice - minPrice)) * availableH;

    // Grid lines
    ctx.strokeStyle = '#1F2837';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      const y = paddingY + (availableH / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width - 55, y);
      ctx.stroke();

      const pVal = minPrice + ((maxPrice - minPrice) / 5) * (5 - i);
      ctx.fillStyle = '#637381';
      ctx.font = '10px sans-serif';
      ctx.fillText(pVal.toFixed(activeAsset.isOtc ? 4 : 2), width - 50, y + 3);
    }

    // Order Block / SMC institutional zone overlay
    const obYTop = priceToY(maxPrice * 0.999);
    const obYBottom = priceToY(maxPrice * 0.9975);
    ctx.fillStyle = 'rgba(0, 230, 118, 0.06)';
    ctx.fillRect(0, obYTop, width - 55, Math.max(10, obYBottom - obYTop));
    ctx.strokeStyle = 'rgba(0, 230, 118, 0.3)';
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(0, obYTop, width - 55, Math.max(10, obYBottom - obYTop));
    ctx.setLineDash([]);

    // Draw candles
    const candleWidth = Math.max(4, Math.min(14, (width - 70) / (candles.length * 1.5)));
    const spacing = (width - 70) / candles.length;

    candles.forEach((c, i) => {
      const x = i * spacing + spacing / 2;
      const isGreen = c.close >= c.open;
      const candleColor = isGreen ? '#00E676' : '#FF1744';

      const openY = priceToY(c.open);
      const closeY = priceToY(c.close);
      const highY = priceToY(c.high);
      const lowY = priceToY(c.low);

      // Wick
      ctx.strokeStyle = candleColor;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();

      // Body
      ctx.fillStyle = candleColor;
      const top = Math.min(openY, closeY);
      const bodyH = Math.max(2, Math.abs(openY - closeY));
      ctx.fillRect(x - candleWidth / 2, top, candleWidth, bodyH);
    });

    // Moving Average Line (SMA 9)
    if (candles.length > 5) {
      ctx.beginPath();
      ctx.strokeStyle = '#00B8D9';
      ctx.lineWidth = 1.5;
      candles.forEach((_, i) => {
        if (i < 4) return;
        const slice = candles.slice(i - 4, i + 1);
        const avg = slice.reduce((acc, curr) => acc + curr.close, 0) / slice.length;
        const x = i * spacing + spacing / 2;
        const y = priceToY(avg);
        if (i === 4) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }

    // Active trade strike lines
    openTrades.forEach((trade) => {
      const y = priceToY(trade.entryPrice);
      ctx.strokeStyle = trade.direction === 'CALL' ? '#00E676' : '#FF1744';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width - 55, y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = trade.direction === 'CALL' ? '#00E676' : '#FF1744';
      ctx.fillRect(width - 55, y - 8, 50, 16);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 9px sans-serif';
      ctx.fillText(`${trade.direction} $${trade.stakeAmount}`, width - 50, y + 4);
    });

    // Current price horizontal line & badge
    const currentY = priceToY(currentPrice);
    ctx.strokeStyle = '#00E5FF';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(0, currentY);
    ctx.lineTo(width - 55, currentY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Price badge
    ctx.fillStyle = '#00E5FF';
    ctx.beginPath();
    ctx.roundRect(width - 55, currentY - 9, 52, 18, 4);
    ctx.fill();

    ctx.fillStyle = '#0B0E14';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText(currentPrice.toFixed(activeAsset.isOtc ? 4 : 2), width - 50, currentY + 4);
  }, [candles, currentPrice, openTrades, activeAsset.isOtc]);

  const handleExecuteTrade = (direction: 'CALL' | 'PUT') => {
    const durationMap: Record<string, number> = {
      '1M': 60,
      '2M': 120,
      '5M': 300,
    };
    const dur = durationMap[selectedExpiry] || 60;
    const payoutNum = parseInt(activeAsset.otcPayout.replace('%', '')) || 92;

    const newTrade: ActiveTrade = {
      id: `trade_${Date.now()}`,
      assetSymbol: activeAsset.symbol,
      direction,
      stakeAmount: stake,
      entryPrice: currentPrice,
      payoutPercentage: payoutNum,
      durationSeconds: dur,
      secondsRemaining: dur,
      timestamp: Date.now(),
      status: 'OPEN',
    };

    setOpenTrades((prev) => [newTrade, ...prev]);
    if (onPlaceTrade) onPlaceTrade(newTrade);
  };

  const payoutYield = parseInt(activeAsset.otcPayout.replace('%', '')) || 94;
  const returnAmount = (stake * (1 + payoutYield / 100)).toFixed(2);

  return (
    <div
      id="broker_trading_viewport_container"
      className={`${
        isFullScreen
          ? 'fixed inset-0 z-50 bg-[#0B0E14] flex flex-col p-3 sm:p-6 overflow-y-auto'
          : 'mx-4 rounded-2xl bg-[#161C24] border border-[#283243] shadow-xl overflow-hidden'
      }`}
    >
      {/* Toast Notification for Trade Result */}
      {tradeNotification && (
        <div
          className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 mb-2 text-xs font-bold shadow-lg transition-all ${
            tradeNotification.isWin
              ? 'bg-[#00E676]/20 border-[#00E676] text-[#00E676]'
              : 'bg-[#FF1744]/20 border-[#FF1744] text-[#FF1744]'
          }`}
        >
          {tradeNotification.isWin ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <ShieldAlert className="w-4 h-4 shrink-0" />
          )}
          <span>{tradeNotification.message}</span>
        </div>
      )}

      {/* Viewport Header */}
      <div className="flex items-center justify-between p-3.5 bg-[#121720] border-b border-[#283243]">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white shrink-0"
            style={{ backgroundColor: broker.key === 'QUOTEX' ? '#0F263B' : '#132047' }}
          >
            <span style={{ color: broker.primaryColorHex }}>{broker.shortName}</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-white">{activeAsset.symbol}</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/40">
                +{payoutYield}% PAYOUT
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#959DAD]">
              <span>Live Feed</span>
              <span>•</span>
              <span className="font-mono text-[#00E5FF] font-bold">
                {currentPrice.toFixed(activeAsset.isOtc ? 5 : 2)}
              </span>
            </div>
          </div>
        </div>

        {/* Timeframe selector & Fullscreen toggle */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center bg-[#0B0E14] rounded-lg p-0.5 border border-[#283243]">
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTf(tf)}
                className={`px-2 py-1 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                  selectedTf === tf
                    ? 'bg-[#00875A] text-white font-bold'
                    : 'text-[#959DAD] hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {isFullScreen && onCloseFullScreen && (
            <button
              onClick={onCloseFullScreen}
              className="p-1.5 rounded-lg bg-[#1C2430] border border-[#283243] text-[#959DAD] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className={`relative w-full ${isFullScreen ? 'h-[420px] sm:h-[500px]' : 'h-[230px]'} bg-[#0F141C]`}>
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* SMC Watermark */}
        <div className="absolute top-2 left-3 pointer-events-none opacity-40 text-[10px] font-mono text-[#637381]">
          SMC Algorithmic Engine • {broker.displayName} Terminal
        </div>
      </div>

      {/* Order Placement Control Deck */}
      <div className="p-3.5 bg-[#121720] border-t border-[#283243] flex flex-col gap-3">
        {/* Stake & Expiry selectors */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Stake input */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-[11px] text-[#959DAD]">
              <span>Investment</span>
              <span className="text-[#00E676] font-semibold">Yield: ${returnAmount}</span>
            </div>
            <div className="flex items-center bg-[#0B0E14] rounded-xl border border-[#283243] px-2.5 py-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#959DAD]" />
              <input
                type="number"
                min={1}
                max={10000}
                value={stake}
                onChange={(e) => setStake(Math.max(1, parseInt(e.target.value) || 10))}
                className="w-full bg-transparent font-bold text-sm text-white focus:outline-none pl-1"
              />
            </div>
            {/* Quick presets */}
            <div className="flex gap-1 mt-0.5">
              {STAKE_PRESETS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setStake(amt)}
                  className={`flex-1 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                    stake === amt
                      ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/50'
                      : 'bg-[#1C2430] text-[#959DAD] hover:text-white border border-[#283243]'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

          {/* Expiry Selector */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-[11px] text-[#959DAD]">
              <span>Expiry Duration</span>
              <Clock className="w-3 h-3 text-[#959DAD]" />
            </div>
            <div className="grid grid-cols-3 gap-1 h-[38px] items-center">
              {EXPIRIES.map((exp) => (
                <button
                  key={exp}
                  onClick={() => setSelectedExpiry(exp)}
                  className={`h-full rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedExpiry === exp
                      ? 'bg-[#00875A] border-[#00E676] text-white shadow-sm'
                      : 'bg-[#0B0E14] border-[#283243] text-[#959DAD] hover:text-white'
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-[#637381] mt-0.5">Fast 24/7 OTC Contract</span>
          </div>
        </div>

        {/* CALL / PUT Dual Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* CALL BUTTON */}
          <button
            id="broker_call_button"
            onClick={() => handleExecuteTrade('CALL')}
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-[#00875A] to-[#00C853] hover:from-[#00A86B] hover:to-[#00E676] text-white font-extrabold shadow-lg shadow-[#00E676]/15 transition-all cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-white" />
              <div className="text-left">
                <div className="text-xs font-black tracking-wider">CALL (UP)</div>
                <div className="text-[10px] text-white/80 font-normal">Higher strike</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-black">+{payoutYield}%</div>
              <div className="text-[10px] text-white/90 font-mono">+${(stake * (payoutYield / 100)).toFixed(1)}</div>
            </div>
          </button>

          {/* PUT BUTTON */}
          <button
            id="broker_put_button"
            onClick={() => handleExecuteTrade('PUT')}
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-[#C62828] to-[#FF1744] hover:from-[#D32F2F] hover:to-[#FF5252] text-white font-extrabold shadow-lg shadow-[#FF1744]/15 transition-all cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-white" />
              <div className="text-left">
                <div className="text-xs font-black tracking-wider">PUT (DOWN)</div>
                <div className="text-[10px] text-white/80 font-normal">Lower strike</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-black">+{payoutYield}%</div>
              <div className="text-[10px] text-white/90 font-mono">+${(stake * (payoutYield / 100)).toFixed(1)}</div>
            </div>
          </button>
        </div>

        {/* Active Open Positions Bar if any */}
        {openTrades.length > 0 && (
          <div className="mt-1 pt-2 border-t border-[#283243]/60">
            <div className="flex items-center justify-between text-[11px] font-bold text-white mb-1.5">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
                Active Contracts ({openTrades.length})
              </span>
              <span className="text-[10px] text-[#959DAD]">Auto-settles on expiry</span>
            </div>

            <div className="flex flex-col gap-1.5 max-h-28 overflow-y-auto pr-1">
              {openTrades.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#0B0E14] border border-[#283243] text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold ${
                        t.direction === 'CALL'
                          ? 'bg-[#00E676]/20 text-[#00E676]'
                          : 'bg-[#FF1744]/20 text-[#FF1744]'
                      }`}
                    >
                      {t.direction}
                    </span>
                    <span className="font-semibold text-white">{t.assetSymbol}</span>
                    <span className="text-[#959DAD] text-[10px]">@ {t.entryPrice.toFixed(4)}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-[#00E5FF] font-bold">
                      {t.secondsRemaining}s left
                    </span>
                    <span className="font-bold text-white">${t.stakeAmount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
