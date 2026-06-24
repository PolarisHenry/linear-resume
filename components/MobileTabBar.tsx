"use client";

import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";

export interface TabBarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export function MobileTabBar({
  items,
  activeSection,
  onNavigate,
  lang,
  onToggleLang,
}: {
  items: TabBarItem[];
  activeSection: string;
  onNavigate: (id: string) => void;
  lang: "zh" | "en";
  onToggleLang: () => void;
}) {
  return (
    <nav
      role="navigation"
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-[#07070a]/95 backdrop-blur-xl border-t border-white/[0.05] px-2 pb-[env(safe-area-inset-bottom,8px)] pt-2"
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={cn(
            "flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg min-w-0 flex-1 transition-colors duration-150",
            activeSection === item.id
              ? "text-[#5E6AD2]"
              : "text-[#8A8F98]"
          )}
        >
          <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
          <span className="text-[10px] font-medium leading-none">{item.label}</span>
        </button>
      ))}
      <button
        onClick={onToggleLang}
        className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg min-w-0 flex-1 text-[#8A8F98] transition-colors duration-150"
        aria-label={lang === "zh" ? "Switch to English" : "切换中文"}
      >
        <Languages className="w-5 h-5" />
        <span className="text-[10px] font-medium leading-none">{lang === "zh" ? "EN" : "中"}</span>
      </button>
    </nav>
  );
}
