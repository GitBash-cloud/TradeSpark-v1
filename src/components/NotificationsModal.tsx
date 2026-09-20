import React from 'react';
import { Bell, CheckCheck, X, Zap, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  isUnread: boolean;
  type: 'SIGNAL' | 'BROKER' | 'SYSTEM';
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearUnread: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onClearUnread,
}) => {
  if (!isOpen) return null;

  const notifications: NotificationItem[] = [
    {
      id: 'n1',
      title: 'High-Probability OTC Signal Detected',
      description: 'EUR/USD (OTC) triggered an institutional Order Block rejection with 95% confidence.',
      time: '2m ago',
      isUnread: true,
      type: 'SIGNAL',
    },
    {
      id: 'n2',
      title: 'Quotex Gateway Optimized',
      description: 'Connected to Frankfurt-01 with ultra-low 18ms latency for 1-minute OTC contracts.',
      time: '14m ago',
      isUnread: true,
      type: 'BROKER',
    },
    {
      id: 'n3',
      title: 'SMC Algorithm Retrained',
      description: 'Vision Scanner model weights updated for improved FVG imbalance mitigation detection.',
      time: '1h ago',
      isUnread: true,
      type: 'SYSTEM',
    },
    {
      id: 'n4',
      title: 'Trade Target Hit: GBP/USD',
      description: 'Bearish continuation setup closed in full profit yield (+92%).',
      time: '3h ago',
      isUnread: false,
      type: 'SIGNAL',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-[#161C24] border border-[#283243] shadow-2xl p-4 flex flex-col gap-3 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#283243]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#00E676]" />
            <h3 className="font-extrabold text-white text-sm">System & Signal Alerts</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClearUnread}
              className="text-[11px] font-semibold text-[#00E5FF] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark read</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-lg bg-[#0B0E14] border border-[#283243] text-[#959DAD] hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex flex-col gap-2 max-h-96 overflow-y-auto pr-1">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl border transition-all ${
                item.isUnread
                  ? 'bg-[#1C2430] border-[#00E676]/30'
                  : 'bg-[#0B0E14] border-[#283243] opacity-80'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {item.type === 'SIGNAL' ? (
                    <Zap className="w-3.5 h-3.5 text-[#00E676] shrink-0" />
                  ) : item.type === 'BROKER' ? (
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                  ) : (
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FFAB00] shrink-0" />
                  )}
                  <h4 className="font-bold text-xs text-white">{item.title}</h4>
                </div>
                <span className="text-[10px] text-[#637381] shrink-0">{item.time}</span>
              </div>
              <p className="text-[11px] text-[#959DAD] mt-1 leading-normal pl-5">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
