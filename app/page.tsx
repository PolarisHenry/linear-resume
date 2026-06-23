"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { t, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  Command, Search, ArrowRight, ArrowUpRight,
  Code2, Bug, Globe, Zap, Brain, Database, GitBranch, Terminal, Cpu,
  Mail, Phone, MapPin, Star, Trophy, Users, Languages, Shield,
  ChevronRight, Copy, Check, ExternalLink, LayoutGrid, ListTree,
  Circle, CheckCircle2, Timer, BarChart3, Activity, Hash, Plus,
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

/* ── Circular Progress (like Linear's cycle progress) ── */
function CircularProgress({ value, size = 48, strokeWidth = 3 }: { value: number; size?: number; strokeWidth?: number }) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} className="progress-ring shrink-0">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} />
      <circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke="#5E6AD2" strokeWidth={strokeWidth} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        style={{ filter: "drop-shadow(0 0 4px rgba(94,106,210,0.4))" }}
      />
      <text x="50%" y="50%" textAnchor="middle" dy=".35em" fill="#EDEDEF" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif">
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

/* ================================================================
   SIDEBAR
   ================================================================ */
function Sidebar({ lang, activeSection, onNav }: {
  lang: Lang; activeSection: string; onNav: (s: string) => void;
}) {
  const items = [
    { id: "overview",    label: lang === "zh" ? "总览" : "Overview",   icon: <Activity className="w-4 h-4" /> },
    { id: "skills",      label: t.nav.skills[lang],                   icon: <BarChart3 className="w-4 h-4" /> },
    { id: "experience",  label: t.nav.experience[lang],                icon: <ListTree className="w-4 h-4" /> },
    { id: "projects",    label: t.nav.projects[lang],                  icon: <LayoutGrid className="w-4 h-4" /> },
    { id: "contact",     label: t.nav.contact[lang],                   icon: <Mail className="w-4 h-4" /> },
  ];
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.04]">
        <img src="/logo.png" alt="Logo" className="w-6 h-6 rounded object-contain ring-1 ring-white/[0.06]" />
        <span className="font-semibold text-sm text-[#EDEDEF]">Arion</span>
      </div>
      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            className={cn(
              "sidebar-link w-full text-left",
              activeSection === item.id && "active"
            )}
          >
            <span className={cn("text-[#8A8F98]", activeSection === item.id && "text-[#5E6AD2]")}>
              {item.icon}
            </span>
            <span className="flex-1">{item.label}</span>
            {activeSection === item.id && (
              <span className="w-1 h-4 rounded-full bg-[#5E6AD2]" />
            )}
          </button>
        ))}
      </nav>
      {/* Bottom: language + status */}
      <div className="px-4 py-3 border-t border-white/[0.04] space-y-2">
        <button
          onClick={() => onNav("lang")}
          className="flex items-center gap-2 w-full text-[12px] text-[#8A8F98] hover:text-[#EDEDEF] transition-colors"
        >
          <Languages className="w-3.5 h-3.5" />
          <span>{lang === "zh" ? "EN" : "中"}</span>
        </button>
        <div className="flex items-center gap-2 text-[11px] text-[#8A8F98]">
          <span className="status-dot" />
          <span className="font-mono tracking-wider uppercase">{lang === "zh" ? "可入职" : "Available"}</span>
        </div>
      </div>
    </aside>
  );
}

/* ================================================================
   MAIN PAGE
   ================================================================ */
export default function HomePage() {
  const [lang, setLang] = useState<Lang>("zh");
  const [activeSection, setActiveSection] = useState("overview");
  const [typedIdx, setTypedIdx] = useState(0);
  const email = "polarishenry990908@gmail.com";

  /* Typewriter */
  useEffect(() => {
    if (typedIdx >= email.length) return;
    const t = setTimeout(() => setTypedIdx((i) => i + 1), 60);
    return () => clearTimeout(t);
  }, [typedIdx, email.length]);

  /* Scroll spy */
  useEffect(() => {
    const sections = ["overview", "skills", "experience", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0 && sections.includes(visible[0].target.id)) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: 0.3, rootMargin: "-80px 0px -60% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (id: string) => {
    if (id === "lang") { setLang((l) => (l === "zh" ? "en" : "zh")); return; }
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  /* Content scrolls in main area, sidebar is fixed */
  return (
    <div className="flex min-h-screen">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="ambient-blob ambient-1" />
        <div className="ambient-blob ambient-2" />
      </div>

      {/* Sidebar */}
      <Sidebar lang={lang} activeSection={activeSection} onNav={handleNav} />

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 ml-[220px] relative z-10">

        {/* ================================================================
             SECTION 1: OVERVIEW — Profile card + stats grid
             ================================================================ */}
        <section id="overview" className="px-6 lg:px-10 pt-12 pb-10 max-w-[1100px]">
          {/* Command bar */}
          <div className="flex items-center gap-2 mb-10">
            <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] max-w-md font-mono text-[13px] text-[#8A8F98]">
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{typedIdx < email.length ? email.slice(0, typedIdx) : email}</span>
              {typedIdx >= email.length && <span className="w-1.5 h-4 bg-[#5E6AD2] animate-blink ml-0.5" />}
            </div>
            <CopyBtn text={email} />
            <span className="flex items-center gap-1 ml-2">
              <kbd className="cmd-key">⌘</kbd><kbd className="cmd-key">K</kbd>
            </span>
          </div>

          {/* Profile row */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              {/* Badges */}
              <div className="flex items-center gap-2 mb-5">
                <span className="badge">{t.hero.badge[lang]}</span>
                {t.hero.tags[lang].map((tag) => (
                  <span key={tag} className="badge-muted">{tag}</span>
                ))}
              </div>

              {/* Name */}
              <h1 className="text-[clamp(3rem,7vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
                <span className="text-gradient">{t.hero.name[lang]}</span>
              </h1>

              {/* Title */}
              <p className="mt-4 text-lg text-[#8A8F98] font-medium tracking-tight">
                {t.hero.title[lang]}
              </p>
              <p className="mt-2 text-[14px] text-[#8A8F98]/70 leading-relaxed max-w-lg">
                {t.hero.subtitle[lang]}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-3 mt-6">
                <button onClick={() => handleNav("skills")} className="btn-primary">
                  {t.hero.btn1[lang]} <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleNav("contact")} className="btn-ghost">
                  {t.hero.btn2[lang]} <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Avatar + key stats — card */}
            <div className="shrink-0 panel p-5 flex flex-col items-center gap-3 w-full lg:w-56">
              <img src="/avatar.png" alt="Avatar" className="w-20 h-20 rounded-full object-cover ring-1 ring-white/[0.08]" />
              <div className="text-center">
                <div className="text-sm font-semibold text-[#EDEDEF]">Arion</div>
                <div className="text-[11px] text-[#8A8F98] font-mono uppercase tracking-wider mt-0.5">
                  {lang === "zh" ? "测试负责人" : "Test Lead"}
                </div>
              </div>
              <div className="w-full pt-3 border-t border-white/[0.04] space-y-1.5">
                {[
                  [t.hero.hud.exp[lang], t.hero.hud.expVal[lang]],
                  [t.hero.hud.loc[lang], t.hero.hud.locVal[lang]],
                  [t.hero.hud.role[lang], t.hero.hud.roleVal[lang]],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-[11px]">
                    <span className="text-[#8A8F98]">{k}</span>
                    <span className="text-[#EDEDEF] font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 mt-10 rounded-2xl panel overflow-hidden divide-x divide-white/[0.04]">
            {t.stats[lang].map(([value, label]) => (
              <div key={label} className="text-center py-7 px-4">
                <div className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-gradient-accent tabular-nums">
                  {value}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8A8F98] mt-2">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================
             SECTION 2: SKILLS — Linear issue-list style
             ================================================================ */}
        <section id="skills" className="px-6 lg:px-10 py-10 max-w-[1100px]">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5E6AD2] font-medium">
              {t.skills.sectionLabel[lang]}
            </span>
            <span className="h-px flex-1 bg-white/[0.04]" />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight mb-8">
            <span className="text-gradient">{t.skills.heading1[lang]}</span>{" "}
            <span className="text-gradient-accent">{t.skills.heading2[lang]}</span>
          </h2>

          {/* Skills as Linear issues list */}
          <div className="panel overflow-hidden">
            {t.skills.items.map((s, i) => {
              const levels = [92, 88, 80, 78, 72, 85, 82, 72, 75];
              const tags = [
                ["Python", "JS/TS", "Java"], ["Pytest", "Playwright", "Allure"],
                ["Vue3", "FastAPI", "Vite"], ["Claude", "Cursor", "Codex"],
                ["AES", "CAPTCHA", "逆向"], ["MySQL", "DML", "Navicat"],
                ["Git", "Branch", "Merge"], ["CLI", "日志", "排查"], ["Postman", "JMeter"],
              ];
              return (
                <div
                  key={s.icon}
                  className="flex items-center gap-4 px-5 py-3.5 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.015] transition-colors duration-150 group cursor-pointer"
                >
                  {/* Priority line */}
                  <span className={cn(
                    "shrink-0 w-0.5 h-8 rounded-full",
                    i < 3 ? "bg-[#5E6AD2]" : i < 6 ? "bg-[#5E6AD2]/50" : "bg-[#5E6AD2]/25"
                  )} />

                  {/* ID */}
                  <span className="font-mono text-[10px] text-[#8A8F98]/50 w-12 shrink-0">
                    SKL-{String(i+1).padStart(2,"0")}
                  </span>

                  {/* Icon + Name + Desc */}
                  <span className="w-7 h-7 rounded-md bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-[#5E6AD2] group-hover:border-[#5E6AD2]/30 transition-colors shrink-0">
                    {iconMap[s.icon]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-[#EDEDEF]">{s.title[lang]}</div>
                    <div className="text-[11px] text-[#8A8F98] truncate">{s.desc[lang]}</div>
                  </div>

                  {/* Tags */}
                  <div className="hidden lg:flex items-center gap-1">
                    {tags[i].map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded text-[9px] font-mono text-[#8A8F98]/60 border border-white/[0.04]">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Progress ring */}
                  <CircularProgress value={levels[i]} size={36} strokeWidth={2.5} />

                  {/* Chevron */}
                  <ChevronRight className="w-3.5 h-3.5 text-[#8A8F98] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================
             SECTION 3: EXPERIENCE — Linear issues with status
             ================================================================ */}
        <section id="experience" className="px-6 lg:px-10 py-10 max-w-[1100px]">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5E6AD2] font-medium">
              {t.experience.sectionLabel[lang]}
            </span>
            <span className="h-px flex-1 bg-white/[0.04]" />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight mb-8">
            <span className="text-gradient">{t.experience.heading1[lang]}</span>{" "}
            <span className="text-gradient-accent">{t.experience.heading2[lang]}</span>
          </h2>

          <div className="flex flex-col gap-3">
            {t.experience.items.map((exp, i) => {
              const statusIcons = [<CheckCircle2 className="w-3.5 h-3.5" />, <CheckCircle2 className="w-3.5 h-3.5" />, <CheckCircle2 className="w-3.5 h-3.5" />];
              const statusLabels = [
                { zh: "进行中", en: "Active" },
                { zh: "已完成", en: "Completed" },
                { zh: "已完成", en: "Completed" },
              ];
              return (
                <div key={i} className="panel-interactive p-5 flex flex-col lg:flex-row lg:items-start gap-4 group">
                  {/* Left: status + meta */}
                  <div className="flex lg:flex-col items-start lg:items-start gap-3 lg:gap-2 lg:w-40 shrink-0">
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border border-[#5E6AD2]/25 text-[#5E6AD2] bg-[#5E6AD2]/[0.05]">
                      {statusIcons[i]}
                      {statusLabels[i][lang]}
                    </span>
                    <span className="font-mono text-[11px] text-[#5E6AD2] tracking-wider">
                      {exp.period[lang]}
                    </span>
                  </div>

                  {/* Center: content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-semibold tracking-tight text-[#EDEDEF] leading-snug">
                      {exp.role[lang]}
                    </h3>
                    <p className="text-[12px] text-[#8A8F98] mt-1">{exp.company[lang]}</p>
                    <ul className="mt-3 space-y-1">
                      {exp.highlights[lang].slice(0, 3).map((h, j) => (
                        <li key={j} className="text-[12px] text-[#8A8F98] leading-relaxed flex items-start gap-1.5">
                          <span className="text-[#5E6AD2]/50 shrink-0 mt-[3px]">&mdash;</span>
                          <span>{h}</span>
                        </li>
                      ))}
                      {exp.highlights[lang].length > 3 && (
                        <li className="text-[11px] text-[#5E6AD2]/60 font-mono mt-1 pl-4">
                          +{exp.highlights[lang].length - 3} {lang === "zh" ? "更多" : "more"}
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Right: expand */}
                  <div className="shrink-0 text-[#8A8F98] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================
             SECTION 4: PROJECTS + ACHIEVEMENTS — Grid layout
             ================================================================ */}
        <section id="projects" className="px-6 lg:px-10 py-10 max-w-[1100px]">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5E6AD2] font-medium">
              {t.projects.sectionLabel[lang]}
            </span>
            <span className="h-px flex-1 bg-white/[0.04]" />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight mb-8">
            <span className="text-gradient">{t.projects.heading1[lang]}</span>{" "}
            <span className="text-gradient-accent">{t.projects.heading2[lang]}</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {t.projects.items.map((p, i) => (
              <div key={p.title.en} className="panel-interactive p-5 flex flex-col gap-3 group">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#5E6AD2] font-medium">
                    PRJ-{String(i+1).padStart(2,"0")}
                  </span>
                  <span className="badge-muted text-[9px]">{p.period[lang]}</span>
                </div>
                <h3 className="text-sm font-semibold tracking-tight text-[#EDEDEF]">{p.title[lang]}</h3>
                <p className="text-[11px] text-[#8A8F98] font-mono uppercase tracking-wider">{p.role[lang]}</p>
                {/* Preview of first 2 details */}
                <ul className="space-y-1">
                  {p.details[lang].slice(0, 2).map((d, j) => (
                    <li key={j} className="text-[12px] text-[#8A8F98] flex items-start gap-1.5">
                      <span className="text-[#5E6AD2]/50 shrink-0">&mdash;</span>
                      <span className="line-clamp-1">{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/[0.03]">
                  <span className="text-[10px] text-[#8A8F98]/60 font-mono">
                    {p.details[lang].length} {lang === "zh" ? "项详情" : "items"}
                  </span>
                  <span className="text-[#5E6AD2]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[11px]">
                    <span className="font-mono">View</span> <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Achievements — compact row below */}
          <div className="mt-6 panel p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="badge">{t.achievements.label[lang]}</span>
              <Trophy className="w-4 h-4 text-[#5E6AD2]/50" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
              {[
                { icon: <Trophy className="w-3 h-3" />, z: 0 },
                { icon: <Star className="w-3 h-3" />, z: 1 },
                { icon: <Users className="w-3 h-3" />, z: 2 },
                { icon: <Zap className="w-3 h-3" />, z: 3 },
                { icon: <Shield className="w-3 h-3" />, z: 4 },
              ].map((item) => (
                <div key={item.z} className="flex items-start gap-2 py-2 px-2 rounded-lg hover:bg-white/[0.02] transition-colors group/a">
                  <span className="w-6 h-6 rounded flex items-center justify-center text-[#8A8F98] group-hover/a:text-[#5E6AD2] transition-colors shrink-0 mt-px">
                    {item.icon}
                  </span>
                  <span className="text-[12px] text-[#8A8F98] group-hover/a:text-[#EDEDEF] transition-colors leading-relaxed">
                    {t.achievements.items[lang][item.z]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
             SECTION 5: CONTACT + EDUCATION — footer panel
             ================================================================ */}
        <section id="contact" className="px-6 lg:px-10 py-10 pb-16 max-w-[1100px]">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5E6AD2] font-medium">
              {t.contact.heading1[lang]} {t.contact.heading2[lang]}
            </span>
            <span className="h-px flex-1 bg-white/[0.04]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Contact info */}
            <div className="lg:col-span-2 panel p-6 flex flex-col gap-4">
              <p className="text-[14px] text-[#8A8F98] leading-relaxed">{t.contact.subtitle[lang]}</p>
              <div className="flex flex-col gap-2">
                {[
                  { icon: <Phone className="w-3.5 h-3.5" />, label: t.contact.phone[lang], value: t.contact.phoneVal[lang] },
                  { icon: <Mail className="w-3.5 h-3.5" />, label: t.contact.email[lang], value: email },
                  { icon: <MapPin className="w-3.5 h-3.5" />, label: t.contact.loc[lang], value: t.contact.locVal[lang] },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-3 py-1.5 group/c">
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

            {/* Education + traits */}
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
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8A8F98] mb-2">
                  {t.selfEval.label[lang]}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {t.selfEval.traits[lang].map((trait) => (
                    <span key={trait} className="px-2.5 py-1 rounded-md text-[11px] text-[#8A8F98] bg-white/[0.02] border border-white/[0.04] hover:text-[#EDEDEF] hover:border-white/[0.08] transition-colors">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              {/* Built with */}
              <div className="mt-auto pt-3 border-t border-white/[0.04]">
                <p className="text-[10px] text-[#8A8F98]/50 font-mono">
                  Built with Next.js + Tailwind
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
