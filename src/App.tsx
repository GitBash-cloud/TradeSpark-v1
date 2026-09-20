import React, { useState, useEffect } from 'react';
import { BrokerKey, DashboardTab, MarketAsset, TradingSignal, ActiveTrade } from './types';
import { INITIAL_ASSETS, INITIAL_SIGNALS, BROKERS } from './data/mockData';
import { TopAppBar } from './components/TopAppBar';
import { BrokerSelector } from './components/BrokerSelector';
import { BrokerTradingViewport } from './components/BrokerTradingViewport';
import { MarketTickerTape } from './components/MarketTickerTape';
import { OtcMarketModeBar } from './components/OtcMarketModeBar';
import { QuickActionBanner } from './components/QuickActionBanner';
import { ActiveSignalsSection } from './components/ActiveSignalsSection';
import { ChartScannerModal } from './components/ChartScannerModal';
import { BottomNavBar } from './components/BottomNavBar';
import { AnalyticsTab } from './components/AnalyticsTab';
import { ProfileTab } from './components/ProfileTab';
import { NotificationsModal } from './components/NotificationsModal';

export const App: React.FC = () => {
  const [activeBroker, setActiveBroker] = useState<BrokerKey>('QUOTEX');
  const [isWebViewVisible, setIsWebViewVisible] = useState<boolean>(true);
  const [isFullScreenWebView, setIsFullScreenWebView] = useState<boolean>(false);
  const [isOtcModeEnabled, setIsOtcModeEnabled] = useState<boolean>(true);

  const [assets, setAssets] = useState<MarketAsset[]>(INITIAL_ASSETS);
  const [selectedAssetId, setSelectedAssetId] = useState<string>('otc_eurusd');
  const [signals, setSignals] = useState<TradingSignal[]>(INITIAL_SIGNALS);

  const [currentTab, setCurrentTab] = useState<DashboardTab>('dashboard');
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(3);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Derive active asset
  const activeAsset = assets.find((a) => a.id === selectedAssetId) || assets[0];

  // Live market price simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setAssets((prev) =>
        prev.map((asset) => {
          if (Math.random() < 0.4) {
            const delta = (Math.random() - 0.49) * (asset.numericPrice * 0.0003);
            const newNumericPrice = Number((asset.numericPrice + delta).toFixed(asset.isOtc ? 5 : 2));
            const newPoints = [...asset.sparklinePoints.slice(1), newNumericPrice];
            const isBullish = newNumericPrice >= asset.sparklinePoints[0];

            return {
              ...asset,
              numericPrice: newNumericPrice,
              price: asset.isOtc
                ? newNumericPrice.toFixed(5)
                : asset.symbol.includes('$') || asset.assetType === 'Crypto' || asset.assetType === 'Stocks'
                ? `$${newNumericPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                : newNumericPrice.toFixed(4),
              sparklinePoints: newPoints,
              isBullish,
            };
          }
          return asset;
        })
      );
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 900);
  };

  const handleAssetClick = (asset: MarketAsset) => {
    setSelectedAssetId(asset.id);
  };

  const handleTradeSignal = (signal: TradingSignal) => {
    // Find matching asset if available
    const matched = assets.find((a) => a.symbol === signal.pair);
    if (matched) {
      setSelectedAssetId(matched.id);
    }
    setCurrentTab('dashboard');
    setIsWebViewVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyNewSignal = (newSignal: TradingSignal) => {
    setSignals((prev) => [newSignal, ...prev]);
    setUnreadNotifications((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col items-center">
      {/* Container constrained to mobile/tablet standard width for mobile-first layout with desktop elegance */}
      <div className="w-full max-w-2xl min-h-screen bg-[#0B0E14] flex flex-col relative border-x border-[#283243]/30 shadow-2xl">
        {/* Top Header */}
        <TopAppBar
          unreadNotifications={unreadNotifications}
          onProfileClick={() => setCurrentTab('profile')}
          onNotificationClick={() => setIsNotificationsOpen(true)}
        />

        {/* Tab Views */}
        <main className="flex-1 flex flex-col">
          {currentTab === 'dashboard' && (
            <div className="flex flex-col gap-4 py-3 pb-28">
              {/* 1. Market Overview Ticker Tape */}
              <MarketTickerTape
                assets={assets}
                selectedAssetId={selectedAssetId}
                onAssetClick={handleAssetClick}
                onRefresh={handleRefresh}
                isRefreshing={isRefreshing}
              />

              {/* 2. OTC Market Mode Bar */}
              <OtcMarketModeBar
                isOtcModeEnabled={isOtcModeEnabled}
                onToggleOtcMode={(enabled) => setIsOtcModeEnabled(enabled)}
              />

              {/* 3. Integrated Broker Terminal Controller */}
              <BrokerSelector
                activeBroker={activeBroker}
                isWebViewVisible={isWebViewVisible}
                onBrokerChanged={(b) => setActiveBroker(b)}
                onToggleWebView={() => setIsWebViewVisible(!isWebViewVisible)}
                onLaunchFullScreen={() => setIsFullScreenWebView(true)}
              />

              {/* 4. Interactive Broker Trading Viewport (When visible) */}
              {isWebViewVisible && (
                <BrokerTradingViewport
                  brokerKey={activeBroker}
                  activeAsset={activeAsset}
                  onPlaceTrade={(trade) => {
                    // Update state or feedback
                  }}
                />
              )}

              {/* 5. Quick Action Banner ("Scan Chart & Get AI Insights") */}
              <QuickActionBanner onScanClick={() => setIsScannerOpen(true)} />

              {/* 6. Active Signals Section */}
              <ActiveSignalsSection
                signals={signals}
                onTradeSignal={handleTradeSignal}
                onSelectPair={(sym) => {
                  const m = assets.find((a) => a.symbol === sym);
                  if (m) setSelectedAssetId(m.id);
                }}
              />
            </div>
          )}

          {currentTab === 'scanner' && (
            <div className="p-4 pb-28 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-white">AI Vision Scanner</h2>
                  <p className="text-xs text-[#959DAD]">Candlestick & pattern recognition</p>
                </div>
              </div>
              {/* Render scanner directly on tab */}
              <div className="bg-[#161C24] p-4 rounded-2xl border border-[#283243]">
                <QuickActionBanner onScanClick={() => setIsScannerOpen(true)} />
              </div>
              <ActiveSignalsSection
                signals={signals.filter((s) => s.id.includes('scan'))}
                onTradeSignal={handleTradeSignal}
              />
            </div>
          )}

          {currentTab === 'signals' && (
            <div className="py-3 pb-28">
              <ActiveSignalsSection
                signals={signals}
                onTradeSignal={handleTradeSignal}
                onSelectPair={(sym) => {
                  const m = assets.find((a) => a.symbol === sym);
                  if (m) setSelectedAssetId(m.id);
                }}
              />
            </div>
          )}

          {currentTab === 'analytics' && <AnalyticsTab />}

          {currentTab === 'profile' && <ProfileTab />}
        </main>

        {/* Full-Screen Broker Viewport Modal */}
        {isFullScreenWebView && (
          <BrokerTradingViewport
            brokerKey={activeBroker}
            activeAsset={activeAsset}
            isFullScreen={true}
            onCloseFullScreen={() => setIsFullScreenWebView(false)}
          />
        )}

        {/* AI Chart Scanner Modal */}
        <ChartScannerModal
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          onApplySignal={handleApplyNewSignal}
        />

        {/* Notifications Modal */}
        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          onClearUnread={() => setUnreadNotifications(0)}
        />

        {/* Persistent Bottom Navigation Bar */}
        <BottomNavBar
          currentTab={currentTab}
          onTabSelected={(tab) => {
            if (tab === 'scanner') {
              setIsScannerOpen(true);
            } else {
              setCurrentTab(tab);
            }
          }}
        />
      </div>
    </div>
  );
};
