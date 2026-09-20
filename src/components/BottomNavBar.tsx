import React from 'react';
import { DashboardTab } from '../types';
import { LayoutDashboard, Camera, Zap, BarChart3, User } from 'lucide-react';

interface BottomNavBarProps {
  currentTab: DashboardTab;
  onTabSelected: (tab: DashboardTab) => void;
}

interface TabConfig {
  tab: DashboardTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabConfig[] = [
  { tab: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { tab: 'scanner', label: 'Scanner', icon: Camera },
  { tab: 'signals', label: 'Signals', icon: Zap },
  { tab: 'analytics', label: 'Analytics', icon: BarChart3 },
  { tab: 'profile', label: 'Profile', icon: User },
];

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentTab, onTabSelected }) => {
  return (
    <nav
      id="bottom_navigation_bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#161C24] border-t border-[#283243] rounded-t-2xl shadow-2xl safe-area-bottom max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {TABS.map(({ tab, label, icon: Icon }) => {
          const isSelected = currentTab === tab;

          return (
            <button
              key={tab}
              id={`nav_tab_${tab}`}
              onClick={() => onTabSelected(tab)}
              className="flex flex-col items-center justify-center py-1 px-3 min-w-16 rounded-xl transition-all cursor-pointer relative"
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isSelected ? 'bg-[#00875A]/25 text-[#00E676]' : 'text-[#959DAD] hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <span
                className={`text-[10px] font-semibold mt-0.5 tracking-tight ${
                  isSelected ? 'text-white font-bold' : 'text-[#959DAD]'
                }`}
              >
                {label}
              </span>

              {isSelected && <span className="w-1 h-1 rounded-full bg-[#00E676] mt-0.5" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
