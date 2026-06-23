"use client";

import { useScrollReveal, useNavScroll, useTypewriter, useScrollParallax, useMouseSpotlight } from "@/hooks";
import { t, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import {
  Menu, X, ArrowRight, ArrowUpRight, ChevronDown,
  Code2, Bug, Globe, Shield, Zap, Brain, Database,
  GitBranch, Terminal, Cpu, Mail, Phone, MapPin, Star, Trophy, Users, Languages,
} from "lucide-react";

/* ── helpers ── */
const pick = (obj: Record<string, string>) => (lang: Lang) => obj[lang];

const iconMap: Record<string, React.ReactNode> = {
  code: <Code2 className="w-5 h-5" />,
  bug: <Bug className="w-5 h-5" />,
  brain: <Brain className="w-5 h-5" />,
  globe: <Globe className="w-5 h-5" />,
  zap: <Zap className="w-5 h-5" />,
  database: <Database className="w-5 h-5" />,
  git: <GitBranch className="w-5 h-5" />,
  terminal: <Terminal className="w-5 h-5" />,
  cpu: <Cpu className="w-5 h-5" />,
};

/* ── Spotlight Card wrapper ── */
function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, pos, hover, setHover } = useMouseSpotlight();
  return (
    <div
      ref={ref}
      className={cn("spotlight-container glass-card group cursor-pointer", className)}
      onMouseMove={(e) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          const spotlight = ref.current.querySelector(".spotlight") as HTMLElement;
          if (spotlight) {
            spotlight.style.left = `${x}%`;
            spotlight.style.top = `${y}%`;
          }
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="spotlight"
        style={{
          left: `${pos.x * 100}%`,
          top: `${pos.y * 100}%`,
          opacity: hover ? 1 : 0,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ── Expandable Card ── */
function ExpandableCard({ title, subtitle, details, lang }: {
  title: string; subtitle: string; details: string[]; lang: Lang;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card cursor-pointer">
      <div className="px-5 pt-5 pb-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold tracking-tight text-[#EDEDEF]">{title}</h3>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#8A8F98] mt-1">{subtitle}</p>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="shrink-0 text-[#8A8F98] hover:text-[#5E6AD2] transition-colors mt-1 w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/[0.05]"
          >
            <ChevronDown
              className="w-4 h-4 transition-transform duration-200"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>
        </div>
      </div>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "24rem" : "0" }}
      >
        <ul className="px-5 pb-5 space-y-1.5">
          {details.map((d, i) => (
            <li key={i} className="text-[13px] text-[#8A8F98] leading-relaxed flex items-start gap-2">
              <span className="text-[#5E6AD2] shrink-0 mt-0.5 opacity-60">—</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-5 py-2.5 border-t border-white/[0.06] flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#8A8F98]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2] animate-pulse-soft" />
        {open ? t.expandCard.open[lang] : t.expandCard.closed[lang]}
      </div>
    </div>
  );
}

/* ── Main ── */
export default function HomePage() {
  const [lang, setLang] = useState<Lang>("zh");
  useScrollReveal();
  const { scrolled, mobileOpen, setMobileOpen } = useNavScroll();
  const { displayed: typedText, cursor: showCursor } = useTypewriter("polarishenry990908@gmail.com", 60, 600);
  const scrollY = useScrollParallax();

  const navItems: [string, string][] = [
    ["skills",     t.nav.skills[lang]],
    ["experience", t.nav.experience[lang]],
    ["projects",   t.nav.projects[lang]],
    ["contact",    t.nav.contact[lang]],
  ];

  /* ── Hero parallax values ── */
  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const heroScale = 1 - Math.min(0.05, scrollY / 12000);
  const heroTranslateY = Math.min(100, scrollY * 0.08);

  return (
    <>
      {/* ===== AMBIENT BLOBS ===== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="ambient-blob ambient-blob-1" />
        <div className="ambient-blob ambient-blob-2" />
        <div className="ambient-blob ambient-blob-3" />
        <div className="ambient-blob ambient-blob-4" />
      </div>

      {/* ===== GRID OVERLAY ===== */}
      <div className="fixed inset-0 pointer-events-none z-[1] grid-overlay" />

      {/* ===== NAV ===== */}
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#050506]/90 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-8 h-8 rounded-lg object-contain shadow-[0_0_0_1px_rgba(94,106,210,0.3),0_4px_12px_rgba(94,106,210,0.2)]"
            />
            <span className="font-semibold text-[17px] tracking-tight text-[#EDEDEF]">
              Arion
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(([key, label]) => (
              <a
                key={key}
                href={`#${key}`}
                className="relative px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-[#8A8F98] hover:text-[#EDEDEF] transition-colors duration-200 rounded-lg hover:bg-white/[0.04]"
              >
                {label}
              </a>
            ))}
            {/* Language toggle */}
            <button
              onClick={() => setLang((l) => (l === "zh" ? "en" : "zh"))}
              className="ml-2 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-[#8A8F98] hover:text-[#EDEDEF] transition-colors duration-200 rounded-lg hover:bg-white/[0.04] flex items-center gap-1.5 border border-white/[0.06]"
            >
              <Languages className="w-3 h-3" />
              {lang === "zh" ? "EN" : "中"}
            </button>
          </div>

          <div className="hidden md:block">
            <a href="#contact" className="btn-primary px-5 py-2.5 text-[13px] rounded-lg">
              {t.nav.contactBtn[lang]} <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            className="md:hidden text-[#EDEDEF] w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/[0.06] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#050506]/95 backdrop-blur-xl border-b border-white/[0.06]">
            <div className="flex flex-col p-6 gap-1 font-mono text-[12px] uppercase tracking-widest">
              {navItems.map(([key, label]) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="text-[#8A8F98] hover:text-[#EDEDEF] transition-colors py-2.5 px-3 rounded-lg hover:bg-white/[0.04]"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </a>
              ))}
              <button
                onClick={() => setLang((l) => (l === "zh" ? "en" : "zh"))}
                className="text-[#8A8F98] hover:text-[#EDEDEF] transition-colors text-left py-2.5 px-3 rounded-lg hover:bg-white/[0.04] flex items-center gap-2"
              >
                <Languages className="w-3.5 h-3.5" />
                {lang === "zh" ? "Switch to English" : "切换到中文"}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 sm:pt-44 sm:pb-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div
            style={{
              opacity: heroOpacity,
              transform: `scale(${heroScale}) translateY(${heroTranslateY}px)`,
              transition: "opacity 100ms linear, transform 100ms linear",
            }}
          >
            {/* Tags */}
            <div className="reveal mb-10 flex flex-wrap items-center gap-2">
              {t.hero.tags[lang].map((tag) => (
                <span key={tag} className="badge">{tag}</span>
              ))}
              <span className="w-2 h-2 rounded-full bg-[#5E6AD2] animate-pulse-soft ml-1" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left: Headline */}
              <div className="lg:col-span-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#8A8F98] mb-5 font-medium">
                  {t.hero.badge[lang]}
                </p>
                <h1 className="reveal text-6xl sm:text-7xl md:text-8xl lg:text-[94px] font-semibold leading-none tracking-[-0.03em]">
                  <span className="text-gradient">{t.hero.name[lang]}</span>
                </h1>
                <p className="reveal reveal-delay-1 mt-5 text-lg sm:text-xl text-[#8A8F98] tracking-tight leading-relaxed max-w-xl">
                  {t.hero.title[lang]}
                </p>
                <p className="reveal reveal-delay-1 mt-3 text-[15px] text-[rgba(255,255,255,0.50)] leading-relaxed max-w-lg">
                  {t.hero.subtitle[lang]}
                </p>
                <div className="hidden lg:block mt-8">
                  <div className="h-px w-16 bg-gradient-to-r from-[#5E6AD2] to-transparent" />
                </div>
              </div>

              {/* Right: Avatar + Contact + HUD */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                {/* Avatar */}
                <div className="reveal reveal-delay-1 flex justify-center lg:justify-start">
                  <div className="relative p-[1px] rounded-2xl bg-gradient-to-b from-white/[0.1] to-white/[0.02] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_8px_30px_rgba(0,0,0,0.4)]">
                    <div className="relative w-36 h-36 rounded-2xl overflow-hidden bg-[#0a0a0c]">
                      <img src="/avatar.png" alt="Profile" className="w-36 h-36 object-cover" />
                    </div>
                  </div>
                </div>

                {/* Typewriter */}
                <div className="reveal reveal-delay-1 font-mono text-[13px] text-[#8A8F98] leading-relaxed">
                  <span className="text-[#5E6AD2]">&gt;&nbsp;</span>
                  <span>{typedText}</span>
                  {showCursor && (
                    <span className="inline-block w-2 h-[15px] bg-[#5E6AD2] ml-0.5 align-middle animate-blink" />
                  )}
                </div>

                {/* HUD panel */}
                <div className="reveal reveal-delay-2 hidden lg:block glass-card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8A8F98]">
                      {t.hero.hud.status[lang]}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] text-[#5E6AD2] font-mono uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2] animate-pulse-soft" />
                      {t.hero.hud.avail[lang]}
                    </span>
                  </div>
                  <div className="space-y-2.5 text-[12px]">
                    {[
                      [t.hero.hud.exp[lang], t.hero.hud.expVal[lang]],
                      [t.hero.hud.role[lang], t.hero.hud.roleVal[lang]],
                      [t.hero.hud.loc[lang], t.hero.hud.locVal[lang]],
                      [t.hero.hud.phone[lang], t.hero.hud.phoneVal[lang]],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-[#8A8F98]">{label}</span>
                        <span className="text-[#EDEDEF] font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="reveal reveal-delay-2 flex flex-col sm:flex-row gap-3 mt-2">
                  <a href="#skills" className="btn-primary px-6 py-3 text-sm rounded-lg">
                    {t.hero.btn1[lang]} <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="#experience" className="btn-secondary px-6 py-3 text-sm rounded-lg">
                    {t.hero.btn2[lang]}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accent-divider mt-16 sm:mt-24" />
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {t.stats[lang].map(([value, label], i) => (
              <div
                key={label}
                className={cn(
                  "reveal text-center py-8 px-4 relative transition-all duration-300",
                  "hover:bg-white/[0.02] rounded-2xl"
                )}
              >
                <div className="text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-accent">
                  {value}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8A8F98] mt-3">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-7xl" />

      {/* ===== SKILLS ===== */}
      <section id="skills" className="py-24 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="reveal flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#5E6AD2]/50" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#5E6AD2] font-medium">
                {t.skills.sectionLabel[lang]}
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#5E6AD2]/50" />
            </div>
            <h2 className="reveal text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-gradient">
              {t.skills.heading1[lang]}&nbsp;
              <span className="text-gradient-accent">{t.skills.heading2[lang]}</span>
            </h2>
            <p className="reveal reveal-delay-1 mt-4 text-[15px] text-[#8A8F98] max-w-xl mx-auto leading-relaxed">
              {t.skills.subtitle[lang]}
            </p>
          </div>

          {/* Bento grid: varying card sizes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 auto-rows-[180px]">
            {t.skills.items.map((s, i) => {
              const isHero = i === 0;
              const isWide = i === 1;
              return (
                <div
                  key={s.icon}
                  className={cn(
                    "reveal",
                    isHero ? "lg:col-span-3 lg:row-span-2" : isWide ? "lg:col-span-3" : "lg:col-span-2"
                  )}
                >
                  <SpotlightCard className="h-full p-5 flex flex-col">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#5E6AD2] group-hover:bg-[#5E6AD2]/10 group-hover:border-[#5E6AD2]/30 transition-all duration-200 shrink-0">
                      {iconMap[s.icon]}
                    </div>
                    <div className="mt-3 mb-1 flex items-center justify-between">
                      <h3 className="text-sm font-semibold tracking-tight text-[#EDEDEF] group-hover:text-white transition-colors">
                        {s.title[lang]}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-[#8A8F98] opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0" />
                    </div>
                    <p className="text-[13px] text-[#8A8F98] leading-relaxed flex-1">{s.desc[lang]}</p>
                    <div className="mt-auto pt-2">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#5E6AD2]/60">
                        {s.label[lang]}
                      </span>
                    </div>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-7xl" />

      {/* ===== EXPERIENCE ===== */}
      <section id="experience" className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <div className="reveal flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#5E6AD2]/50" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#5E6AD2] font-medium">
                {t.experience.sectionLabel[lang]}
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#5E6AD2]/50" />
            </div>
            <h2 className="reveal text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-gradient">
              {t.experience.heading1[lang]}&nbsp;
              <span className="text-gradient-accent">{t.experience.heading2[lang]}</span>
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="timeline-line hidden lg:block left-[calc(50%-0.5px)]" />
            <div className="flex flex-col gap-10">
              {t.experience.items.map((exp, i) => (
                <div
                  key={i}
                  className={cn(
                    "reveal relative flex flex-col lg:flex-row items-start gap-6",
                    i % 2 === 0 ? "" : "lg:flex-row-reverse"
                  )}
                >
                  {/* Timeline dot */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-6 z-10">
                    <div className="timeline-dot" />
                  </div>

                  {/* Content */}
                  <div className={cn("lg:w-[calc(50%-32px)]", i % 2 === 0 ? "lg:pr-4" : "lg:pl-4")}>
                    <div className="glass-card p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="font-mono text-[10px] text-[#5E6AD2] uppercase tracking-widest font-medium">
                          {exp.period[lang]}
                        </span>
                        <span className="font-mono text-[10px] text-[#8A8F98] uppercase tracking-widest">
                          {exp.company[lang]}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold tracking-tight text-[#EDEDEF] mb-3">
                        {exp.role[lang]}
                      </h3>
                      <ul className="space-y-2">
                        {exp.highlights[lang].map((h, j) => (
                          <li key={j} className="text-[13px] text-[#8A8F98] leading-relaxed flex items-start gap-2">
                            <span className="text-[#5E6AD2] shrink-0 mt-0.5 opacity-60">&mdash;</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block lg:w-[calc(50%-32px)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-7xl" />

      {/* ===== ACHIEVEMENTS ===== */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="reveal mb-3">
                <span className="badge">{t.achievements.label[lang]}</span>
              </div>
              <h2 className="reveal text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-gradient mb-10">
                {t.achievements.heading1[lang]}&nbsp;
                <span className="text-gradient-accent">{t.achievements.heading2[lang]}</span>
              </h2>
              <div className="space-y-4">
                {[
                  { icon: <Trophy className="w-4 h-4" />, z: 0 },
                  { icon: <Star className="w-4 h-4" />, z: 1 },
                  { icon: <Users className="w-4 h-4" />, z: 2 },
                  { icon: <Zap className="w-4 h-4" />, z: 3 },
                  { icon: <Shield className="w-4 h-4" />, z: 4 },
                ].map((item) => (
                  <div
                    key={item.z}
                    className="reveal flex items-start gap-3 group cursor-pointer p-3 rounded-xl hover:bg-white/[0.03] transition-colors duration-200 -mx-3"
                  >
                    <span className="shrink-0 w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#8A8F98] group-hover:text-[#5E6AD2] group-hover:border-[#5E6AD2]/30 transition-all duration-200">
                      {item.icon}
                    </span>
                    <span className="text-sm text-[#8A8F98] group-hover:text-[#EDEDEF] transition-colors leading-relaxed">
                      {t.achievements.items[lang][item.z]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code editor mockup */}
            <div className="reveal reveal-delay-1 code-editor">
              <div className="code-editor-header">
                <span className="code-editor-dot bg-[#ff5f57]" />
                <span className="code-editor-dot bg-[#febc2e]" />
                <span className="code-editor-dot bg-[#28c840]" />
                <span className="ml-2 font-mono text-[10px] text-[#8A8F98] uppercase tracking-widest">
                  test_framework v2.4.1
                </span>
              </div>
              <div className="px-5 py-4 font-mono text-[11px] leading-relaxed">
                {[
                  { n: 1, c: "#",  h: " Test Automation Framework", t: "",    s: "",                m: "" },
                  { n: 2, c: "",   h: "",                        t: "",    s: "",                m: "" },
                  { n: 3, c: "class", h: " TestFramework",       t: ":",   s: "",                m: "" },
                  { n: 4, c: "",   h: "  engine",                t: " = ", s: "Pytest",          m: " + Playwright" },
                  { n: 5, c: "",   h: "  report",                t: " = ", s: "Allure",          m: "" },
                  { n: 6, c: "",   h: "  api_docs",              t: " = ", s: "OpenAPI",         m: " (Swagger)" },
                  { n: 7, c: "",   h: "",                        t: "",    s: "",                m: "" },
                  { n: 8, c: "",   h: "  def",                   t: " ",   s: "coverage",        m: "(): -> 75%" },
                  { n: 9, c: "",   h: "  def",                   t: " ",   s: "regression",      m: "(): -> 2 days" },
                  { n: 10, c: "",  h: "  def",                   t: " ",   s: "maintenance",     m: "(): -> -50%" },
                ].map((line) => (
                  <div key={line.n} className="flex">
                    <span className="text-[#8A8F98]/40 w-8 shrink-0 text-right mr-4 select-none">
                      {line.n}
                    </span>
                    <span>
                      {line.c && <span className="text-[#6872D9]">{line.c} </span>}
                      <span className="text-[#EDEDEF]">{line.h}</span>
                      <span className="text-[#8A8F98]">{line.t}</span>
                      <span className="text-[#5E6AD2]">{line.s}</span>
                      <span className="text-[#8A8F98]">{line.m}</span>
                    </span>
                  </div>
                ))}
                <div className="flex mt-1">
                  <span className="text-[#8A8F98]/40 w-8 shrink-0 text-right mr-4 select-none">11</span>
                  <span className="inline-block w-2 h-4 bg-[#5E6AD2] animate-blink" />
                </div>
              </div>
              <div className="px-5 py-2.5 border-t border-white/[0.05] flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#8A8F98]">
                <span>test_framework v2.4.1</span>
                <span className="flex items-center gap-1.5 text-[#5E6AD2]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2] animate-pulse-soft" />
                  ALL PASSING
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-7xl" />

      {/* ===== PROJECTS ===== */}
      <section id="projects" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <div className="reveal flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#5E6AD2]/50" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#5E6AD2] font-medium">
                {t.projects.sectionLabel[lang]}
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#5E6AD2]/50" />
            </div>
            <h2 className="reveal text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-gradient">
              {t.projects.heading1[lang]}&nbsp;
              <span className="text-gradient-accent">{t.projects.heading2[lang]}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {t.projects.items.map((p) => (
              <div key={p.title.en} className="reveal">
                <ExpandableCard
                  title={p.title[lang]}
                  subtitle={`${p.role[lang]}  ·  ${p.period[lang]}`}
                  details={p.details[lang]}
                  lang={lang}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-7xl" />

      {/* ===== EDUCATION ===== */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="reveal mb-4">
            <span className="badge">{t.education.label[lang]}</span>
          </div>
          <h2 className="reveal text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-gradient mb-14">
            {t.education.heading1[lang]}&nbsp;
            <span className="text-gradient-accent">{t.education.heading2[lang]}</span>
          </h2>

          <div className="flex flex-col lg:flex-row justify-center gap-6">
            {t.education.items.map((edu) => (
              <div key={edu.school.en} className="reveal glass-card p-8 text-center max-w-md w-full">
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-[#5E6AD2]/10 border border-[#5E6AD2]/20 flex items-center justify-center text-[#5E6AD2] text-xl font-bold">
                  {edu.school[lang][0]}
                </div>
                <div className="text-lg font-semibold tracking-tight text-[#EDEDEF]">
                  {edu.school[lang]}
                </div>
                <div className="text-sm text-[#8A8F98] mt-2">{edu.degree[lang]}</div>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <span className="badge">{edu.type[lang]}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Self-evaluation */}
          <div className="reveal mt-8 glass-card p-8 text-center">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8A8F98] mb-4 font-medium">
              {t.selfEval.label[lang]}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {t.selfEval.traits[lang].map((trait, i) => (
                <span
                  key={trait}
                  className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-sm text-[#8A8F98] hover:text-[#EDEDEF] hover:border-white/[0.12] transition-colors duration-200"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-7xl" />

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="reveal glass-card p-12 sm:p-16 relative overflow-hidden">
            {/* Corner accents */}
            <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#5E6AD2]/50 rounded-tl-lg" />
            <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#5E6AD2]/50 rounded-tr-lg" />
            <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#5E6AD2]/50 rounded-bl-lg" />
            <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#5E6AD2]/50 rounded-br-lg" />

            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">
              <span className="text-gradient">{t.contact.heading1[lang]}</span>{" "}
              <span className="text-gradient-accent">{t.contact.heading2[lang]}</span>
            </h2>
            <p className="mt-4 text-[15px] text-[#8A8F98] leading-relaxed max-w-md mx-auto">
              {t.contact.subtitle[lang]}
            </p>

            <div className="mt-8 flex flex-col gap-3 max-w-sm mx-auto">
              {[
                { icon: <Phone className="w-4 h-4" />, label: t.contact.phone[lang], value: t.contact.phoneVal[lang] },
                { icon: <Mail className="w-4 h-4" />, label: t.contact.email[lang], value: "polarishenry990908@gmail.com" },
                { icon: <MapPin className="w-4 h-4" />, label: t.contact.loc[lang], value: t.contact.locVal[lang] },
              ].map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.10] transition-all duration-200"
                >
                  <span className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#5E6AD2] shrink-0">
                    {c.icon}
                  </span>
                  <div className="text-left">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[#8A8F98]">
                      {c.label}
                    </div>
                    <div className="text-sm text-[#EDEDEF] font-medium mt-0.5">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-16 border-t border-white/[0.06] bg-[#020203]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <a href="#" className="flex items-center gap-2.5 group">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-8 h-8 rounded-lg object-contain shadow-[0_4px_12px_rgba(94,106,210,0.2)]"
                />
                <span className="font-semibold text-[17px] tracking-tight text-[#EDEDEF]">Arion</span>
              </a>
              <p className="text-[13px] text-[#8A8F98] mt-3 leading-relaxed">
                {t.footer.title[lang]}
              </p>
            </div>
            {[
              [t.footer.nav[lang], ["#skills", "#experience", "#projects", "#contact"]],
              [t.footer.stack[lang], ["Python", "Pytest", "Playwright", "Vue 3", "MySQL"]],
              [t.footer.links[lang], ["GitHub", "LinkedIn", "Blog", "GitLab"]],
            ].map(([title, links]) => (
              <div key={title as string}>
                <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#EDEDEF] mb-4 font-medium">
                  {title}
                </h4>
                <ul className="flex flex-col gap-2">
                  {(links as string[]).map((l) => (
                    <li key={l}>
                      <a
                        href={l.startsWith("#") ? l : "#"}
                        className="text-[13px] text-[#8A8F98] hover:text-[#EDEDEF] transition-colors duration-200"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[12px] text-[#8A8F98]">
              &copy; {new Date().getFullYear()} Arion. {t.footer.copyright[lang]}
            </p>
            <div className="flex gap-6 text-[12px]">
              <span className="text-[#8A8F98]">
                Built with{" "}
                <span className="text-[#EDEDEF]">Next.js</span>
                {" + "}
                <span className="text-[#5E6AD2]">Tailwind</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
