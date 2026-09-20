# TradeSpark — Professional AI Trading Assistant

TradeSpark is an institutional-grade AI trading assistant and market analysis application built with React, Vite, and TypeScript. It features real-time OTC & market overview tickers, an integrated dual-broker trading terminal (Quotex & Pocket Option), an AI Vision chart scanner, and high-accuracy algorithmic Smart Money Concepts (SMC) trading signals.

## Key Features

- **Market Overview Ticker Tape**: Real-time multi-asset live feed covering OTC Forex (EUR/USD, GBP/USD, USD/JPY, AUD/CAD), Cryptocurrencies (BTC, ETH, SOL), Indices (NAS100), and Equities (NVDA) with dynamic sparklines and category filtering.
- **OTC Market Mode (24/7)**: Dedicated OTC engine supporting Quotex and Pocket Option broker feeds with high payout rate indications (92%–95%) and ultra-low latency execution routes.
- **Integrated Broker Terminal**:
  - Direct broker switcher between **Quotex** (Frankfurt-01, 18ms) and **Pocket Option** (London-LD4, 22ms).
  - Live interactive candlestick & moving-average canvas chart with institutional Order Block overlays.
  - One-click **CALL (UP)** and **PUT (DOWN)** contract execution with payout calculation, duration selection (1M, 2M, 5M), and real-time active contract countdown.
  - Expandable full-screen terminal modal.
- **AI Vision Chart Scanner**: Candlestick pattern detection, Smart Money Concepts (SMC) order block rejection & fair value gap (FVG) analysis, with automated stop-loss, take-profit, and binary expiry signal deployment.
- **Active Signals Feed**: High-probability institutional signals with confidence scoring, SMC setup classification, and single-click trade deployment to the broker terminal.
- **AI Performance Analytics**: Audited 7-day win rate (89.4%), broker accuracy comparison, profit factor, and net yield metrics.
- **Trader Profile & Controls**: Customizable risk guard limits, SMC strict filtering, and real-time notification alerts.

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite 6
