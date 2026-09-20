export type SignalType = 'BUY' | 'SELL' | 'CALL' | 'PUT';

export interface SignalTypeDetails {
  label: string;
  binaryLabel: string;
  isBullish: boolean;
}

export const SIGNAL_DETAILS: Record<SignalType, SignalTypeDetails> = {
  BUY: { label: 'BUY / LONG', binaryLabel: 'CALL (UP)', isBullish: true },
  SELL: { label: 'SELL / SHORT', binaryLabel: 'PUT (DOWN)', isBullish: false },
  CALL: { label: 'CALL (UP)', binaryLabel: 'CALL (UP)', isBullish: true },
  PUT: { label: 'PUT (DOWN)', binaryLabel: 'PUT (DOWN)', isBullish: false },
};

export interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  price: string;
  numericPrice: number;
  changePercentage: string;
  isBullish: boolean;
  sparklinePoints: number[];
  assetType: 'OTC' | 'Crypto' | 'Forex' | 'Indices' | 'Stocks';
  volume24h: string;
  isOtc: boolean;
  otcPayout: string;
}

export interface TradingSignal {
  id: string;
  pair: string;
  type: SignalType;
  timeframe: string;
  entryPrice: string;
  stopLoss?: string;
  takeProfit?: string;
  riskRewardRatio?: string;
  expiryTime?: string;
  confidencePercentage: number;
  smcRationale: string;
  timestamp: string;
  aiRationale: string;
  payoutPercentage?: string;
  isOtc: boolean;
  category: 'OTC' | 'Forex' | 'Crypto' | 'Indices' | 'Stocks';
}

export type BrokerKey = 'QUOTEX' | 'POCKET_OPTION';

export interface BrokerInfo {
  key: BrokerKey;
  displayName: string;
  shortName: string;
  tagline: string;
  primaryColorHex: string;
  accentColorHex: string;
  latency: string;
  serverLocation: string;
  webUrl: string;
}

export type DashboardTab = 'dashboard' | 'scanner' | 'signals' | 'analytics' | 'profile';

export interface ActiveTrade {
  id: string;
  assetSymbol: string;
  direction: 'CALL' | 'PUT';
  stakeAmount: number;
  entryPrice: number;
  payoutPercentage: number;
  durationSeconds: number;
  secondsRemaining: number;
  timestamp: number;
  status: 'OPEN' | 'WON' | 'LOST';
  payoutAmount?: number;
}
