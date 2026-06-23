"use client";

import { useState, useEffect } from "react";
import { t, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  Search, ArrowRight, ArrowUpRight,
  Code2, Bug, Globe, Zap, Brain, Database, GitBranch, Terminal, Cpu,
  Mail, Phone, MapPin, Star, Trophy, Users, Languages,
  ChevronRight, Copy, Check, ExternalLink, Menu, X, Command,
  CheckCircle2, Timer, Shield,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  code: <Code2 className="w-3.5 h-3.5" />,
  bug: <Bug className="w-3.5 h-3.5" />,
  brain: <Brain className="w-3.5 h-3.5" />,
  globe: <Globe className="w-3.5 h-3.5" />,
  zap: <Zap className="w-3.5 h-3.5" />,
  database: <Database className="w-3.5 h-3.5" />,
  git: <GitBranch className="w-3.5 h-3.5" />,
  terminal: <Terminal className="w-3.5 h-3.5" />,
  cpu: <Cpu className="w-3.5 h-3.5" />,
};

/* ── Circular progress ring ── */
function Ring({ value, size = 40, sw = 2.5 }: { value: number; size?: number; sw?: number }) {
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const off = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} className="progress-ring shrink-0">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={sw} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#5E6AD2" strokeWidth={sw} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={off}
        style={{ filter: "drop-shadow(0 0 4px rgba(94,106,210,0.4))" }} />
      <text x="50%" y="50%" textAnchor="middle" dy=".35em" fill="#EDEDEF" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif">
        {value}%
      </text>
    </svg>
  );
}

/* ── Copy button ── */
function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 2000); }}
      className="w-6 h-6 rounded flex items-center justify-center text-[#8A8F98] hover:text-[#EDEDEF] hover:bg-white/[0.06] transition-all"
    >
      {done ? <Check className="w-3 h-3 text-[#5E6AD2]" /> : <Copy className="w-3 h-3" />}
    </button>
  );
}

/* ── Section header ── */
function SectionHeader({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5E6AD2] font-medium">{label}</span>
      <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
        {children}
      </h2>
    </div>
  );
}

/* ================================================================ */
export default function HomePage() {
  const [lang, setLang] = useState<Lang>("zh");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [typedIdx, setTypedIdx] = useState(0);
  const email = "polarishenry990908@gmail.com";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typedIdx >= email.length) return;
    const t = setTimeout(() => setTypedIdx((i) => i + 1), 60);
    return () => clearTimeout(t);
  }, [typedIdx, email.length]);

  const navItems: [string, string][] = [
    ["skills",     t.nav.skills[lang]],
    ["experience", t.nav.experience[lang]],
    ["projects",   t.nav.projects[lang]],
    ["contact",    t.nav.contact[lang]],
  ];

  return (
    <div className="min-h-screen">
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="ambient-blob ambient-1" />
        <div className="ambient-blob ambient-2" />
      </div>

      {/* ── Header ── */}
      <header className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-[#050506]/80 backdrop-blur-xl border-b border-white/[0.05]" : ""
      )}>
        <div className="mx-auto max-w-[1200px] flex items-center justify-between px-5 py-3">
          <a href="#" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Logo" className="w-7 h-7 rounded-md object-contain ring-1 ring-white/[0.06]" />
            <span className="font-semibold text-sm text-[#EDEDEF]">Arion</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(([key, label]) => (
              <a key={key} href={`#${key}`}
                className="px-3.5 py-2 text-[13px] font-medium text-[#8A8F98] hover:text-[#EDEDEF] rounded-md hover:bg-white/[0.04] transition-colors"
              >{label}</a>
            ))}
            <div className="w-px h-4 bg-white/[0.06] mx-1.5" />
            <button onClick={() => setLang((l) => (l === "zh" ? "en" : "zh"))}
              className="px-3 py-1.5 text-[12px] text-[#8A8F98] hover:text-[#EDEDEF] rounded-md hover:bg-white/[0.04] transition-colors font-mono flex items-center gap-1.5"
            >
              <Languages className="w-3 h-3" />
              {lang === "zh" ? "EN" : "中"}
            </button>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-[#EDEDEF] w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/[0.06]"
            onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#050506]/95 backdrop-blur-xl border-b border-white/[0.05] px-5 py-3 flex flex-col gap-1">
            {navItems.map(([key, label]) => (
              <a key={key} href={`#${key}`} onClick={() => setMobileOpen(false)}
                className="text-[13px] text-[#8A8F98] hover:text-[#EDEDEF] py-2.5 px-3 rounded-lg hover:bg-white/[0.04] transition-colors"
              >{label}</a>
            ))}
            <button onClick={() => { setLang((l) => (l === "zh" ? "en" : "zh")); setMobileOpen(false); }}
              className="text-[13px] text-[#8A8F98] hover:text-[#EDEDEF] py-2.5 px-3 rounded-lg hover:bg-white/[0.04] transition-colors flex items-center gap-2 font-mono"
            ><Languages className="w-3.5 h-3.5" />{lang === "zh" ? "Switch to English" : "切换到中文"}</button>
          </div>
        )}
      </header>

      {/* ── MAIN ── */}
      <main className="mx-auto max-w-[1200px] px-5 sm:px-8">

        {/* ================================================================
             HERO – full width statement
             ================================================================ */}
        <section className="pt-36 sm:pt-44 pb-14 sm:pb-20">
          {/* Command bar */}
          <div className="flex items-center gap-2 mb-8 max-w-lg">
            <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] font-mono text-[13px] text-[#8A8F98]">
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">
                {typedIdx < email.length ? email.slice(0, typedIdx) : email}
              </span>
              {typedIdx >= email.length && (
                <span className="w-1.5 h-4 bg-[#5E6AD2] animate-blink ml-0.5" />
              )}
            </div>
            <CopyBtn text={email} />
            <span className="hidden sm:flex items-center gap-1 ml-1 text-[#8A8F98]/50">
              <kbd className="inline-flex items-center justify-center w-5 h-5 rounded font-mono text-[10px] bg-white/[0.06] border border-white/[0.08]">⌘</kbd>
              <kbd className="inline-flex items-center justify-center w-5 h-5 rounded font-mono text-[10px] bg-white/[0.06] border border-white/[0.08]">K</kbd>
            </span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="badge">{t.hero.badge[lang]}</span>
            {t.hero.tags[lang].map((tag) => (
              <span key={tag} className="badge-muted">{tag}</span>
            ))}
            <span className="status-dot ml-1" />
          </div>

          {/* Name */}
          <h1 className="text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] max-w-4xl">
            <span className="text-gradient">{t.hero.name[lang]}</span>
          </h1>

          {/* Subtitle + CTA row */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div>
              <p className="text-lg sm:text-xl text-[#8A8F98] font-medium tracking-tight">{t.hero.title[lang]}</p>
              <p className="mt-1.5 text-[14px] text-[#8A8F98]/70 leading-relaxed">{t.hero.subtitle[lang]}</p>
            </div>
            <div className="flex items-center gap-3 sm:ml-auto">
              <a href="#skills" className="btn-primary">{t.hero.btn1[lang]} <ArrowRight className="w-3.5 h-3.5" /></a>
              <a href="#contact" className="btn-ghost">{t.hero.btn2[lang]} <ChevronRight className="w-3.5 h-3.5" /></a>
            </div>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 mt-12 panel overflow-hidden">
            {t.stats[lang].map(([value, label], i) => (
              <div key={label} className={cn(
                "text-center py-8 px-4",
                i < 3 && "border-r border-white/[0.04]"
              )}>
                <div className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-gradient-accent tabular-nums">{value}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8A8F98] mt-2.5">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================
             SKILLS – Linear issue list
             ================================================================ */}
        <section id="skills" className="py-12 sm:py-16">
          <SectionHeader label={t.skills.sectionLabel[lang]}>
            <span className="text-gradient">{t.skills.heading1[lang]}</span>{" "}
            <span className="text-gradient-accent">{t.skills.heading2[lang]}</span>
          </SectionHeader>

          <div className="panel overflow-hidden">
            {t.skills.items.map((s, i) => {
              const levels = [92, 88, 80, 78, 72, 85, 82, 72, 75];
              const tags = [
                ["Python", "JS/TS", "Java"], ["Pytest", "Playwright", "Allure"],
                ["Vue3", "FastAPI", "Vite"], ["Claude", "Cursor", "Codex"],
                ["AES", "CAPTCHA", "逆向"], ["MySQL", "DML", "Navicat"],
                ["Git", "Branch"], ["CLI", "日志"], ["Postman", "JMeter"],
              ];
              return (
                <div key={s.icon}
                  className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.015] transition-colors group cursor-pointer">
                  {/* Priority line */}
                  <span className={cn("shrink-0 w-0.5 h-8 rounded-full",
                    i < 3 ? "bg-[#5E6AD2]" : i < 6 ? "bg-[#5E6AD2]/50" : "bg-[#5E6AD2]/25"
                  )} />
                  {/* ID */}
                  <span className="hidden sm:inline font-mono text-[10px] text-[#8A8F98]/50 w-14 shrink-0">
                    SKL-{String(i+1).padStart(2,"0")}
                  </span>
                  {/* Icon */}
                  <span className="w-7 h-7 rounded-md bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-[#5E6AD2] group-hover:border-[#5E6AD2]/30 transition-colors shrink-0">
                    {iconMap[s.icon]}
                  </span>
                  {/* Name + desc */}
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-[#EDEDEF]">{s.title[lang]}</div>
                    <div className="text-[11px] text-[#8A8F98] truncate hidden sm:block">{s.desc[lang]}</div>
                  </div>
                  {/* Tags (desktop) */}
                  <div className="hidden lg:flex items-center gap-1">
                    {tags[i].map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded text-[9px] font-mono text-[#8A8F98]/60 border border-white/[0.04]">{t}</span>
                    ))}
                  </div>
                  {/* Ring */}
                  <Ring value={levels[i]} />
                  {/* Arrow */}
                  <ChevronRight className="w-3.5 h-3.5 text-[#8A8F98] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================
             EXPERIENCE – cards with status
             ================================================================ */}
        <section id="experience" className="py-12 sm:py-16">
          <SectionHeader label={t.experience.sectionLabel[lang]}>
            <span className="text-gradient">{t.experience.heading1[lang]}</span>{" "}
            <span className="text-gradient-accent">{t.experience.heading2[lang]}</span>
          </SectionHeader>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {t.experience.items.map((exp, i) => {
              const statusLabel = i === 0 ? { zh: "进行中", en: "Active" } : { zh: "已完成", en: "Completed" };
              const StatusIcon = i === 0 ? Timer : CheckCircle2;
              return (
                <div key={i} className="panel-hover p-5 flex flex-col gap-3 group">
                  {/* Status + period */}
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border",
                      i === 0
                        ? "border-[#5E6AD2]/25 text-[#5E6AD2] bg-[#5E6AD2]/[0.05]"
                        : "border-white/[0.06] text-[#8A8F98]"
                    )}>
                      <StatusIcon className="w-3 h-3" />
                      {statusLabel[lang]}
                    </span>
                    <span className="font-mono text-[10px] text-[#8A8F98]/60 tracking-wider">{`0${i+1}`}</span>
                  </div>

                  {/* Role + Company */}
                  <div className="flex-1">
                    <h3 className="text-[15px] font-semibold tracking-tight text-[#EDEDEF] leading-snug">{exp.role[lang]}</h3>
                    <p className="text-[12px] text-[#8A8F98] mt-2 leading-relaxed">{exp.company[lang]}</p>
                    <p className="font-mono text-[11px] text-[#5E6AD2] mt-2 tracking-wider">{exp.period[lang]}</p>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1.5 pt-3 border-t border-white/[0.03]">
                    {exp.highlights[lang].slice(0, 3).map((h, j) => (
                      <li key={j} className="text-[12px] text-[#8A8F98] leading-relaxed flex items-start gap-1.5">
                        <span className="text-[#5E6AD2]/50 shrink-0 mt-[3px]">&mdash;</span>
                        <span>{h}</span>
                      </li>
                    ))}
                    {exp.highlights[lang].length > 3 && (
                      <li className="text-[11px] text-[#5E6AD2]/50 font-mono pl-5 pt-0.5">
                        +{exp.highlights[lang].length - 3} {lang === "zh" ? "更多" : "more"}
                      </li>
                    )}
                  </ul>

                  <div className="mt-auto pt-2 flex items-center gap-1.5 text-[#5E6AD2]/0 group-hover:text-[#5E6AD2]/50 transition-colors duration-300">
                    <span className="font-mono text-[10px] uppercase tracking-wider">{lang === "zh" ? "查看详情" : "View details"}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================
             ACHIEVEMENTS + CODE – split panel
             ================================================================ */}
        <section className="py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
            {/* Achievements */}
            <div>
              <div className="mb-6"><span className="badge">{t.achievements.label[lang]}</span></div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-8">
                <span className="text-gradient">{t.achievements.heading1[lang]}</span>{" "}
                <span className="text-gradient-accent">{t.achievements.heading2[lang]}</span>
              </h2>
              <div className="space-y-0.5">
                {[
                  { icon: <Trophy className="w-3.5 h-3.5" />, z: 0 },
                  { icon: <Star className="w-3.5 h-3.5" />, z: 1 },
                  { icon: <Users className="w-3.5 h-3.5" />, z: 2 },
                  { icon: <Zap className="w-3.5 h-3.5" />, z: 3 },
                  { icon: <Shield className="w-3.5 h-3.5" />, z: 4 },
                ].map((item) => (
                  <div key={item.z}
                    className="flex items-start gap-3 py-2.5 px-2 -mx-2 rounded-lg hover:bg-white/[0.02] transition-colors group/a">
                    <span className="w-7 h-7 rounded-md bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-[#8A8F98] group-hover/a:text-[#5E6AD2] group-hover/a:border-[#5E6AD2]/25 transition-colors shrink-0 mt-px">
                      {item.icon}
                    </span>
                    <span className="text-[14px] text-[#8A8F98] group-hover/a:text-[#EDEDEF] transition-colors leading-relaxed">
                      {t.achievements.items[lang][item.z]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code editor */}
            <div className="panel overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.04] bg-[#08080a]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-[10px] text-[#8A8F98] tracking-wider">test_framework.py</span>
              </div>
              <div className="px-5 py-4 font-mono text-[11px] leading-[1.75] flex-1">
                {[
                  ["# ", "Test Automation Framework"],
                  ["", ""],
                  ["class ", "TestFramework", ":"],
                  ["  engine", " = ", "Pytest", " + Playwright"],
                  ["  report", " = ", "Allure"],
                  ["  api_docs", " = ", "OpenAPI", " (Swagger)"],
                  ["", ""],
                  ["  def ", "coverage", "():", " -> ", "75%"],
                  ["  def ", "regression", "():", " -> ", "2 days"],
                  ["  def ", "maintenance", "():", " -> ", "-50%"],
                ].map((parts, i) => (
                  <div key={i}>
                    <span className="text-[#6872D9]">{parts[0]}</span>
                    <span className="text-[#EDEDEF]">{parts[1]}</span>
                    <span className="text-[#8A8F98]">{parts[2]}</span>
                    <span className="text-[#5E6AD2]">{parts[3]}</span>
                    <span className="text-[#8A8F98]/50">{parts[4]}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1.5 mt-1"><span className="w-1.5 h-3.5 bg-[#5E6AD2] animate-blink" /></div>
              </div>
              <div className="px-5 py-2.5 border-t border-white/[0.04] flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[#8A8F98]">
                <span>v2.4.1</span>
                <span className="flex items-center gap-1.5 text-[#5E6AD2]"><span className="status-dot" />ALL PASSING</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
             PROJECTS – bento grid
             ================================================================ */}
        <section id="projects" className="py-12 sm:py-16">
          <SectionHeader label={t.projects.sectionLabel[lang]}>
            <span className="text-gradient">{t.projects.heading1[lang]}</span>{" "}
            <span className="text-gradient-accent">{t.projects.heading2[lang]}</span>
          </SectionHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
            {t.projects.items.map((p, i) => {
              const spans = i === 0
                ? "lg:col-span-2 lg:row-span-2"
                : i === 3
                  ? "lg:col-span-2"
                  : "lg:col-span-1";
              return (
                <div key={p.title.en} className={cn("panel-hover p-5 flex flex-col gap-3 group", spans)}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#5E6AD2] font-medium">PRJ-{String(i+1).padStart(2,"0")}</span>
                    <span className="badge-muted">{p.period[lang]}</span>
                  </div>
                  <h3 className="text-sm font-semibold tracking-tight text-[#EDEDEF]">{p.title[lang]}</h3>
                  <p className="text-[11px] text-[#8A8F98] font-mono uppercase tracking-wider">{p.role[lang]}</p>
                  <ul className="space-y-1 flex-1">
                    {p.details[lang].slice(0, i === 0 ? 4 : 2).map((d, j) => (
                      <li key={j} className="text-[12px] text-[#8A8F98] flex items-start gap-1.5">
                        <span className="text-[#5E6AD2]/50 shrink-0">&mdash;</span>
                        <span className="line-clamp-1">{d}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-white/[0.03]">
                    <span className="text-[10px] text-[#8A8F98]/60 font-mono">{p.details[lang].length} {lang === "zh" ? "项详情" : "items"}</span>
                    <span className="text-[#5E6AD2]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[11px]">
                      <span className="font-mono">View</span> <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================
             CONTACT + EDUCATION + TRAITS
             ================================================================ */}
        <section id="contact" className="py-12 sm:py-16">
          <div className="mb-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5E6AD2] font-medium">
              {t.contact.heading1[lang]} {t.contact.heading2[lang]}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Contact */}
            <div className="lg:col-span-2 panel p-6 flex flex-col gap-4">
              <p className="text-[14px] text-[#8A8F98] leading-relaxed">{t.contact.subtitle[lang]}</p>
              <div className="flex flex-col gap-1.5">
                {[
                  { icon: <Phone className="w-3.5 h-3.5" />, label: lang === "zh" ? "电话" : "Phone", value: lang === "zh" ? "[已加密]" : "[Protected]" },
                  { icon: <Mail className="w-3.5 h-3.5" />, label: "Email", value: email },
                  { icon: <MapPin className="w-3.5 h-3.5" />, label: lang === "zh" ? "位置" : "Location", value: lang === "zh" ? "中国 · 深圳" : "Shenzhen, China" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-3 py-2 group/c">
                    <span className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-[#5E6AD2] group-hover/c:border-[#5E6AD2]/25 transition-colors shrink-0">
                      {c.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-[#8A8F98]">{c.label}</div>
                      <div className="text-[13px] text-[#EDEDEF] font-medium">{c.value}</div>
                    </div>
                    <CopyBtn text={c.value} />
                  </div>
                ))}
              </div>
            </div>

            {/* Education + Traits */}
            <div className="panel p-5 flex flex-col gap-4">
              {t.education.items.map((edu) => (
                <div key={edu.school.en}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#5E6AD2]/[0.08] border border-[#5E6AD2]/[0.15] flex items-center justify-center text-sm font-semibold text-[#5E6AD2]">
                      {edu.school[lang][0]}
                    </div>
                    <div>
                      <div className="text-[13px] font-medium text-[#EDEDEF]">{edu.school[lang]}</div>
                      <div className="text-[11px] text-[#8A8F98]">{edu.degree[lang]}</div>
                    </div>
                    <span className="ml-auto badge">{edu.type[lang]}</span>
                  </div>
                </div>
              ))}
              <div className="pt-3 border-t border-white/[0.04]">
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8A8F98] mb-2">{t.selfEval.label[lang]}</div>
                <div className="flex flex-wrap gap-1.5">
                  {t.selfEval.traits[lang].map((trait) => (
                    <span key={trait} className="px-2.5 py-1 rounded-md text-[11px] text-[#8A8F98] bg-white/[0.02] border border-white/[0.04] hover:text-[#EDEDEF] hover:border-white/[0.08] transition-colors">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-auto pt-3 border-t border-white/[0.04]">
                <p className="text-[10px] text-[#8A8F98]/40 font-mono">Built with Next.js + Tailwind</p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
