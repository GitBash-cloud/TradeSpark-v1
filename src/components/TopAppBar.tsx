import React from 'react';
import { Sparkles, Bell } from 'lucide-react';

interface TopAppBarProps {
  unreadNotifications: number;
  onProfileClick: () => void;
  onNotificationClick: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  unreadNotifications,
  onProfileClick,
  onNotificationClick,
}) => {
  return (
    <header
      id="app_top_bar"
      className="w-full flex items-center justify-between px-4 py-3 bg-[#0B0E14] border-b border-[#283243]/50 sticky top-0 z-40"
    >
      {/* Left: Trader Profile Avatar with Online Status */}
      <button
        id="top_bar_profile_button"
        onClick={onProfileClick}
        className="relative group cursor-pointer"
        title="Open Profile"
      >
        <div className="w-10 h-10 rounded-full border-2 border-[#283243] group-hover:border-[#00E676] overflow-hidden bg-[#1F2633] transition-colors">
          <img
            src="/trader_avatar_1789548821647.jpg"
            alt="User Profile Avatar"
            className="w-full h-full object-cover"
            onError={(e) => {
              // fallback if image path issue
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>
        {/* Active online pulse dot */}
        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#00E676] border-2 border-[#0B0E14] pulse-emerald" />
      </button>

      {/* Center: Brand Header */}
      <div id="app_brand_header" className="flex items-center gap-2.5">
        {/* Futuristic AI Logo Emblem */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00875A] to-[#00B8D9] flex items-center justify-center shadow-md shadow-[#00875A]/20">
          <Sparkles className="w-4 h-4 text-white" />
        </div>

        <div className="flex flex-col text-left">
          <div className="flex items-center">
            <span className="text-lg font-bold text-white tracking-tight">Trade</span>
            <span className="text-lg font-extrabold text-[#00E676] tracking-tight ml-0.5">Spark</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
            <span className="text-[10px] font-semibold text-[#00E676] tracking-wide">
              OTC • SMC Engine Active
            </span>
          </div>
        </div>
      </div>

      {/* Right: Notifications Bell */}
      <button
        id="notification_bell_button"
        onClick={onNotificationClick}
        className="relative w-10 h-10 rounded-xl bg-[#161C24] border border-[#283243] hover:border-[#3a475d] flex items-center justify-center text-white transition-all cursor-pointer"
        title="View Notifications"
      >
        <Bell className="w-4.5 h-4.5 text-white" />

        {unreadNotifications > 0 && (
          <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#FF1744] text-white text-[9px] font-extrabold flex items-center justify-center border-2 border-[#0B0E14]">
            {unreadNotifications}
          </span>
        )}
      </button>
    </header>
  );
};
