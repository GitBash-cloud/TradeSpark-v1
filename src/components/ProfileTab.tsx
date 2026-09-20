import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Zap,
  Volume2,
  VolumeX,
  Smartphone,
  ExternalLink,
  Cpu,
  Key,
  CheckCircle2,
} from 'lucide-react';

export const ProfileTab: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [smcStrict, setSmcStrict] = useState(true);
  const [autoRisk, setAutoRisk] = useState(true);

  return (
    <div className="flex flex-col gap-4 p-4 pb-24">
      {/* Profile Header Card */}
      <div className="p-4 rounded-2xl bg-[#161C24] border border-[#283243] flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#00E676] bg-[#1F2633]">
            <img
              src="/trader_avatar_1789548821647.jpg"
              alt="Trader Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#00E676] border-2 border-[#161C24] pulse-emerald" />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-white">Alexei Petrov</h2>
            <ShieldCheck className="w-4 h-4 text-[#00E676]" />
          </div>
          <p className="text-xs text-[#959DAD]">Institutional Algorithmic Trader</p>
          <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#00E676]/15 border border-[#00E676]/30 text-[#00E676] text-[10px] font-black w-fit">
            <Zap className="w-3 h-3" />
            <span>VIP PRO TIER ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Connected Broker Integrations */}
      <div className="p-4 rounded-2xl bg-[#161C24] border border-[#283243] flex flex-col gap-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          Connected Broker Gateways
        </h3>

        {/* Quotex Connection */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#0B0E14] border border-[#283243]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] font-black text-xs flex items-center justify-center">
              QX
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">Quotex Direct Terminal</span>
                <span className="w-2 h-2 rounded-full bg-[#00E676]" />
              </div>
              <p className="text-[10px] text-[#959DAD]">Live WebSocket • 18ms latency</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00E676]/15 text-[#00E676]">
            SYNCHRONIZED
          </span>
        </div>

        {/* Pocket Option Connection */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#0B0E14] border border-[#283243]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#2979FF]/20 text-[#00B0FF] font-black text-xs flex items-center justify-center">
              PO
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">Pocket Option Terminal</span>
                <span className="w-2 h-2 rounded-full bg-[#00E676]" />
              </div>
              <p className="text-[10px] text-[#959DAD]">London Gateway • 22ms latency</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00E676]/15 text-[#00E676]">
            SYNCHRONIZED
          </span>
        </div>
      </div>

      {/* Engine & Assistant Preferences */}
      <div className="p-4 rounded-2xl bg-[#161C24] border border-[#283243] flex flex-col gap-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          AI Assistant Preferences
        </h3>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B0E14] border border-[#283243]">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-4 h-4 text-[#00E5FF]" />
            <div>
              <span className="text-xs font-bold text-white block">Strict SMC Institutional Filter</span>
              <span className="text-[10px] text-[#959DAD]">Only notify on FVG + Order Block confluence</span>
            </div>
          </div>
          <button
            onClick={() => setSmcStrict(!smcStrict)}
            className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
              smcStrict ? 'bg-[#00875A]' : 'bg-[#283243]'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                smcStrict ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B0E14] border border-[#283243]">
          <div className="flex items-center gap-2.5">
            <Key className="w-4 h-4 text-[#FFAB00]" />
            <div>
              <span className="text-xs font-bold text-white block">Automated R:R & Risk Guard</span>
              <span className="text-[10px] text-[#959DAD]">Caps max recommended stake to 3% portfolio</span>
            </div>
          </div>
          <button
            onClick={() => setAutoRisk(!autoRisk)}
            className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
              autoRisk ? 'bg-[#00875A]' : 'bg-[#283243]'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                autoRisk ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B0E14] border border-[#283243]">
          <div className="flex items-center gap-2.5">
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#00E676]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#959DAD]" />
            )}
            <div>
              <span className="text-xs font-bold text-white block">Real-time Sound Alerts</span>
              <span className="text-[10px] text-[#959DAD]">Audible chime on high-confidence setups</span>
            </div>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
              soundEnabled ? 'bg-[#00875A]' : 'bg-[#283243]'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                soundEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* App Version Info */}
      <div className="text-center text-xs text-[#637381] py-2">
        <p className="font-semibold text-[#959DAD]">TradeSpark • Professional AI Trading Assistant</p>
        <p className="text-[10px] mt-0.5">Engine v2.4.8 (Build 184) • SMC Vision Ready</p>
      </div>
    </div>
  );
};
