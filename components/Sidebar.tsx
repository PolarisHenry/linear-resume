"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Languages } from "lucide-react";

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export function Sidebar({
  items,
  activeSection,
  onNavigate,
  lang,
  onToggleLang,
}: {
  items: SidebarItem[];
  activeSection: string;
  onNavigate: (id: string) => void;
  lang: "zh" | "en";
  onToggleLang: () => void;
}) {
  const [locked, setLocked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const expanded = locked || hovered;

  return (
    <nav
      role="navigation"
      className={cn(
        "fixed top-0 left-0 bottom-0 z-40 flex flex-col bg-[#07070a]/90 backdrop-blur-xl border-r border-white/[0.05] transition-all duration-300 ease-out",
        expanded ? "w-[220px]" : "w-[56px]"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.04] h-[57px] overflow-hidden">
        <img src="/logo.png" alt="Logo" className="w-6 h-6 rounded object-contain ring-1 ring-white/[0.06] shrink-0" />
        <span className={cn("font-semibold text-sm text-[#EDEDEF] whitespace-nowrap transition-opacity duration-200", expanded ? "opacity-100" : "opacity-0")}>Arion</span>
      </div>

      {/* Nav items */}
      <div className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "flex items-center gap-2.5 w-full text-left px-3 py-2 text-[13px] font-medium rounded-md transition-colors duration-150 overflow-hidden whitespace-nowrap",
              activeSection === item.id
                ? "text-[#EDEDEF] bg-white/[0.06]"
                : "text-[#8A8F98] hover:text-[#EDEDEF] hover:bg-white/[0.04]"
            )}
          >
            <span className={cn("shrink-0", activeSection === item.id ? "text-[#5E6AD2]" : "text-[#8A8F98]")}>
              {item.icon}
              <span className="sr-only">{item.label}</span>
            </span>
            <span className={cn("flex-1 text-left transition-opacity duration-200", expanded ? "opacity-100" : "opacity-0")}>{item.label}</span>
            {activeSection === item.id && expanded && (
              <span className="w-1 h-4 rounded-full bg-[#5E6AD2] shrink-0" />
            )}
          </button>
        ))}
      </div>

      {/* Bottom: toggle expand + language */}
      <div className={cn("px-4 py-3 border-t border-white/[0.04] flex items-center gap-2 transition-all duration-200", expanded ? "justify-between" : "justify-center")}>
        <button
          onClick={() => setLocked((v) => !v)}
          className="flex items-center justify-center gap-1.5 text-[12px] text-[#8A8F98] hover:text-[#EDEDEF] transition-colors shrink-0"
          aria-label={locked ? "收起侧边栏" : "展开侧边栏"}
        >
          {locked ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          {expanded && <span className="text-[11px] font-mono whitespace-nowrap">{locked ? (lang === "zh" ? "收起" : "Collapse") : ""}</span>}
        </button>
        <button
          onClick={onToggleLang}
          className="flex items-center gap-1.5 text-[12px] text-[#8A8F98] hover:text-[#EDEDEF] transition-colors font-mono shrink-0"
          aria-label={lang === "zh" ? "Switch to English" : "切换中文"}
        >
          <Languages className="w-3.5 h-3.5" />
          {expanded && <span className="whitespace-nowrap">{lang === "zh" ? "EN" : "中"}</span>}
        </button>
      </div>
    </nav>
  );
}
