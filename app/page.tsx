"use client";

import { useScrollReveal, useNavScroll, useTypewriter, useScrollParallax } from "@/hooks";
import { t, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Menu, X, ArrowRight, ArrowUpRight, ChevronDown, ChevronRight,
  Code2, Bug, Globe, Shield, Zap, Brain, Database,
  GitBranch, Terminal, Cpu, Mail, Phone, MapPin, Star, Trophy, Users, Languages,
  Command, Copy, Check, ExternalLink,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  code: <Code2 className="w-4 h-4" />,
  bug: <Bug className="w-4 h-4" />,
  brain: <Brain className="w-4 h-4" />,
  globe: <Globe className="w-4 h-4" />,
  zap: <Zap className="w-4 h-4" />,
  database: <Database className="w-4 h-4" />,
  git: <GitBranch className="w-4 h-4" />,
  terminal: <Terminal className="w-4 h-4" />,
  cpu: <Cpu className="w-4 h-4" />,
};

/* ================================================================
   COMMAND BAR — Raycast-style quick action input
   ================================================================ */
function CommandBar({ email, lang }: { email: string; lang: Lang }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText("polarishenry990908@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="command-line pl-4 py-3 pr-3 rounded-r-xl flex items-center gap-3">
      <Command className="w-3.5 h-3.5 text-[#5E6AD2] shrink-0" />
      <span className="text-[13px] text-[#8A8F98] font-mono truncate flex-1">{email}</span>
      <button
        onClick={handleCopy}
        className="shrink-0 w-7 h-7 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#8A8F98] hover:text-[#EDEDEF] hover:bg-white/[0.08] transition-all duration-200"
      >
        {copied ? <Check className="w-3 h-3 text-[#5E6AD2]" /> : <Copy className="w-3 h-3" />}
      </button>
    </div>
  );
}

/* ================================================================
   METRIC COUNTER — Dashboard stat widget
   ================================================================ */
function MetricCounter({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <div className="text-center p-5">
      <div className={cn("text-4xl sm:text-5xl font-semibold tracking-[-0.02em] tabular-nums", accent)}>
        {value}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8A8F98] mt-3">
        {label}
      </div>
    </div>
  );
}

/* ================================================================
   SKILL PROGRESS — Individual skill with level bar
   ================================================================ */
function SkillBar({
  icon, name, desc, level, tags,
}: {
  icon: React.ReactNode; name: string; desc: string; level: number; tags: string[];
}) {
  return (
    <div className="group flex flex-col gap-2.5 px-4 py-3.5 rounded-xl hover:bg-white/[0.02] transition-colors duration-200">
      <div className="flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-[#5E6AD2] group-hover:border-[#5E6AD2]/30 group-hover:bg-[#5E6AD2]/[0.06] transition-all duration-200 shrink-0">
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold tracking-tight text-[#EDEDEF]">{name}</h4>
          <p className="text-[12px] text-[#8A8F98] truncate">{desc}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-[#8A8F98] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 progress-bar">
          <div className="progress-fill" style={{ width: `${level}%` }} />
        </div>
        <span className="font-mono text-[10px] text-[#8A8F98] w-8 text-right">{level}%</span>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {tags.map((t) => (
          <span key={t} className="font-mono text-[9px] tracking-wider text-[#5E6AD2]/60 px-2 py-0.5 rounded-md bg-[#5E6AD2]/[0.04] border border-[#5E6AD2]/[0.10]">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   KANBAN CARD — Work experience as kanban card
   ================================================================ */
function KanbanCard({
  period, company, role, highlights, index,
}: {
  period: string; company: string; role: string; highlights: string[]; index: number;
}) {
  return (
    <div className="panel-interactive p-5 flex flex-col gap-3 group/card">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[10px] text-[#5E6AD2] uppercase tracking-[0.15em] font-medium">
          {period}
        </span>
        <span className="font-mono text-[10px] text-[#8A8F98] bg-white/[0.03] rounded-full px-2.5 py-0.5">
          {`0${index + 1}`}
        </span>
      </div>
      {/* Role & Company */}
      <div>
        <h3 className="text-base font-semibold tracking-tight text-[#EDEDEF] leading-tight">
          {role}
        </h3>
        <p className="text-[12px] text-[#8A8F98] mt-1 leading-relaxed">{company}</p>
      </div>
      {/* Highlights */}
      <ul className="space-y-1.5 pt-1 border-t border-white/[0.04]">
        {highlights.map((h, j) => (
          <li key={j} className="text-[12px] text-[#8A8F98] leading-relaxed flex items-start gap-2">
            <span className="text-[#5E6AD2]/50 shrink-0 mt-[3px] w-1 h-1 rounded-full bg-[#5E6AD2]/40 group-hover/card:bg-[#5E6AD2]/70 transition-colors duration-200" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
      {/* Action hint */}
      <div className="mt-auto pt-2 flex items-center gap-1.5 text-[#5E6AD2]/0 group-hover/card:text-[#5E6AD2]/60 transition-colors duration-300">
        <span className="font-mono text-[10px] uppercase tracking-wider">View details</span>
        <ArrowRight className="w-3 h-3" />
      </div>
    </div>
  );
}

/* ================================================================
   PROJECT WIDGET — Dashboard-style project card
   ================================================================ */
function ProjectWidget({
  title, role, period, details, index,
}: {
  title: string; role: string; period: string; details: string[]; index: number;
}) {
  const [open, setOpen] = useState(false);
  const spans = [
    "lg:col-span-2 lg:row-span-2", // hero project - big
    "lg:col-span-1 lg:row-span-1",
    "lg:col-span-1 lg:row-span-1",
    "lg:col-span-2 lg:row-span-1", // wide
  ];
  return (
    <div className={cn("panel-interactive p-5 flex flex-col gap-3", spans[index % spans.length])}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-[#5E6AD2] font-medium">{`PROJ-0${index + 1}`}</span>
          <span className="badge-neutral">{period}</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[#8A8F98] hover:text-[#EDEDEF] hover:bg-white/[0.05] transition-all duration-200"
        >
          <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", open && "rotate-180")} />
        </button>
      </div>
      <h3 className="text-sm font-semibold tracking-tight text-[#EDEDEF]">{title}</h3>
      <p className="text-[11px] text-[#8A8F98] font-mono uppercase tracking-wider">{role}</p>
      <div
        className={cn("overflow-hidden transition-all duration-300", open ? "max-h-64" : "max-h-0")}
      >
        <ul className="space-y-1 pt-2 border-t border-white/[0.04]">
          {details.map((d, j) => (
            <li key={j} className="text-[12px] text-[#8A8F98] leading-relaxed flex items-start gap-1.5">
              <span className="text-[#5E6AD2]/40 shrink-0">&mdash;</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ================================================================
   MAIN PAGE
   ================================================================ */
export default function HomePage() {
  const [lang, setLang] = useState<Lang>("zh");
  useScrollReveal();
  const { scrolled, mobileOpen, setMobileOpen } = useNavScroll();
  const { displayed: typedText } = useTypewriter("polarishenry990908@gmail.com", 60, 600);
  const scrollY = useScrollParallax();

  const navItems: [string, string][] = [
    ["skills",     t.nav.skills[lang]],
    ["experience", t.nav.experience[lang]],
    ["projects",   t.nav.projects[lang]],
    ["contact",    t.nav.contact[lang]],
  ];

  /* Hero parallax */
  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const heroTranslateY = Math.min(60, scrollY * 0.06);
  const heroScale = 1 - Math.min(0.03, scrollY / 15000);

  /* Skill levels for progress bars */
  const skillLevels = [92, 88, 80, 75, 70, 85, 82, 72, 78];
  const skillTags = [
    ["Python", "JS/TS", "Java"],
    ["Pytest", "Playwright", "Allure"],
    ["Vue3", "FastAPI", "Vite"],
    ["Claude", "Cursor", "Codex"],
    ["AES", "CAPTCHA", "逆向"],
    ["MySQL", "DML", "Navicat"],
    ["Git", "Branch", "Merge"],
    ["CLI", "日志", "排查"],
    ["Postman", "JMeter", "压测"],
  ];

  return (
    <div className="relative dashboard-grid">
      {/* ===== AMBIENT ===== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="ambient-blob ambient-blob-a" />
        <div className="ambient-blob ambient-blob-b" />
        <div className="ambient-blob ambient-blob-c" />
      </div>

      {/* ===== NAVIGATION ===== */}
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#050506]/85 backdrop-blur-xl border-b border-white/[0.05]"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-3.5">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-7 h-7 rounded-md object-contain ring-1 ring-white/[0.06] group-hover:ring-[#5E6AD2]/30 transition-all duration-200"
            />
            <span className="font-semibold text-sm tracking-[-0.01em] text-[#EDEDEF] opacity-80 group-hover:opacity-100 transition-opacity">
              Arion
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center">
            {navItems.map(([key, label]) => (
              <a
                key={key}
                href={`#${key}`}
                className="relative px-3.5 py-2 text-[13px] font-medium text-[#8A8F98] hover:text-[#EDEDEF] transition-colors duration-200"
              >
                {label}
              </a>
            ))}
            <div className="w-px h-4 bg-white/[0.06] mx-2" />
            <button
              onClick={() => setLang((l) => (l === "zh" ? "en" : "zh"))}
              className="px-3 py-1.5 text-[12px] font-mono text-[#8A8F98] hover:text-[#EDEDEF] transition-colors duration-200 flex items-center gap-1.5 rounded-md hover:bg-white/[0.04]"
            >
              <Languages className="w-3 h-3" />
              {lang === "zh" ? "EN" : "中"}
            </button>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <CommandBar email={typedText} lang={lang} />
            <a href="#contact" className="btn-primary px-4 py-2 text-[12px] rounded-lg">
              {t.nav.contactBtn[lang]} <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[#EDEDEF] w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/[0.06] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#050506]/95 backdrop-blur-xl border-b border-white/[0.05]">
            <div className="flex flex-col p-5 gap-1">
              {navItems.map(([key, label]) => (
                <a key={key} href={`#${key}`} className="text-[13px] text-[#8A8F98] hover:text-[#EDEDEF] transition-colors py-2.5 px-3 rounded-lg hover:bg-white/[0.04]" onClick={() => setMobileOpen(false)}>
                  {label}
                </a>
              ))}
              <button
                onClick={() => { setLang((l) => (l === "zh" ? "en" : "zh")); setMobileOpen(false); }}
                className="text-[13px] text-[#8A8F98] hover:text-[#EDEDEF] transition-colors text-left py-2.5 px-3 rounded-lg hover:bg-white/[0.04] flex items-center gap-2"
              >
                <Languages className="w-3.5 h-3.5" />
                {lang === "zh" ? "Switch to English" : "切换到中文"}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ================================================================
           HERO — Product launch page style
           ================================================================ */}
      <section className="relative pt-36 pb-16 sm:pt-48 sm:pb-24 overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 relative z-10">
          <div
            style={{
              opacity: heroOpacity,
              transform: `scale(${heroScale}) translateY(${heroTranslateY}px)`,
              transition: "opacity 80ms linear, transform 80ms linear",
            }}
          >
            {/* Eyebrow */}
            <div className="reveal flex items-center gap-3 mb-8">
              <span className="status-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#5E6AD2]">
                {t.hero.badge[lang]}
              </span>
            </div>

            {/* Headline — big, cinematic */}
            <h1 className="reveal text-[clamp(3rem,10vw,7rem)] font-semibold leading-[0.92] tracking-[-0.04em] max-w-4xl">
              <span className="text-gradient">{t.hero.name[lang]}</span>
            </h1>

            {/* Subtitle + tags row */}
            <div className="reveal reveal-delay-1 flex flex-wrap items-center gap-4 mt-7">
              <span className="text-lg sm:text-xl text-[#8A8F98] font-medium tracking-tight">
                {t.hero.title[lang]}
              </span>
              <span className="hidden sm:inline text-[#8A8F98]/30">|</span>
              <div className="flex flex-wrap gap-1.5">
                {t.hero.tags[lang].map((tag) => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>
            </div>

            {/* Metrics row — like Linear's project stats */}
            <div className="reveal reveal-delay-2 grid grid-cols-2 sm:grid-cols-4 gap-0 mt-14 divide-x divide-white/[0.04] rounded-2xl panel overflow-hidden">
              {t.stats[lang].map(([value, label]) => (
                <MetricCounter key={label} value={value} label={label} accent="text-gradient-accent" />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#050506] to-transparent pointer-events-none z-10" />
      </section>

      {/* ================================================================
           SKILLS — Command palette list style (Raycast-like)
           ================================================================ */}
      <section id="skills" className="relative py-12 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 relative z-10">
          <div className="mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5E6AD2] font-medium">
              {t.skills.sectionLabel[lang]}
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">
              <span className="text-gradient">{t.skills.heading1[lang]}</span>{" "}
              <span className="text-gradient-accent">{t.skills.heading2[lang]}</span>
            </h2>
          </div>

          {/* Two-column skill list */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-1">
            {t.skills.items.map((s, i) => (
              <div key={s.icon} className="reveal">
                <SkillBar
                  icon={iconMap[s.icon]}
                  name={s.title[lang]}
                  desc={s.desc[lang]}
                  level={skillLevels[i]}
                  tags={skillTags[i]}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
           EXPERIENCE — Kanban board layout
           ================================================================ */}
      <section id="experience" className="relative py-12 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 relative z-10">
          <div className="mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5E6AD2] font-medium">
              {t.experience.sectionLabel[lang]}
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">
              <span className="text-gradient">{t.experience.heading1[lang]}</span>{" "}
              <span className="text-gradient-accent">{t.experience.heading2[lang]}</span>
            </h2>
          </div>

          {/* Kanban board */}
          <div className="overflow-x-auto pb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-0 kanban-col">
              {t.experience.items.map((exp, i) => (
                <div key={i} className="reveal">
                  <KanbanCard
                    period={exp.period[lang]}
                    company={exp.company[lang]}
                    role={exp.role[lang]}
                    highlights={exp.highlights[lang]}
                    index={i}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
           ACHIEVEMENTS — Sidebar panel + code preview
           ================================================================ */}
      <section className="relative py-12 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
            {/* Left: achievements list */}
            <div>
              <div className="mb-2">
                <span className="badge">{t.achievements.label[lang]}</span>
              </div>
              <h2 className="mt-3 mb-10 text-4xl sm:text-5xl font-semibold tracking-tight">
                <span className="text-gradient">{t.achievements.heading1[lang]}</span>{" "}
                <span className="text-gradient-accent">{t.achievements.heading2[lang]}</span>
              </h2>
              <div className="space-y-1">
                {[
                  { icon: <Trophy className="w-3.5 h-3.5" />, z: 0 },
                  { icon: <Star className="w-3.5 h-3.5" />, z: 1 },
                  { icon: <Users className="w-3.5 h-3.5" />, z: 2 },
                  { icon: <Zap className="w-3.5 h-3.5" />, z: 3 },
                  { icon: <Shield className="w-3.5 h-3.5" />, z: 4 },
                ].map((item) => (
                  <div
                    key={item.z}
                    className="reveal flex items-start gap-3 group py-2.5 px-2 -mx-2 rounded-lg hover:bg-white/[0.02] transition-colors duration-200"
                  >
                    <span className="shrink-0 w-7 h-7 rounded-md bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-[#8A8F98] group-hover:text-[#5E6AD2] group-hover:border-[#5E6AD2]/30 transition-all duration-200 mt-0.5">
                      {item.icon}
                    </span>
                    <span className="text-[14px] text-[#8A8F98] group-hover:text-[#EDEDEF] transition-colors leading-relaxed">
                      {t.achievements.items[lang][item.z]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: code editor panel */}
            <div className="reveal reveal-delay-1 panel overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.04] bg-[#08080a]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-[10px] text-[#8A8F98] tracking-wider">
                  test_framework.py
                </span>
              </div>
              <div className="px-5 py-4 font-mono text-[11px] leading-[1.7] flex-1">
                {[
                  ["# ", "Test Automation Framework", "", "", ""],
                  ["", "", "", "", ""],
                  ["class ", "TestFramework", ":", "", ""],
                  ["  engine", " = ", "Pytest", " + Playwright", ""],
                  ["  report", " = ", "Allure", "", ""],
                  ["  api_docs", " = ", "OpenAPI", " (Swagger)", ""],
                  ["", "", "", "", ""],
                  ["  def ", "coverage", "():", " -> ", "75%"],
                  ["  def ", "regression", "():", " -> ", "2 days"],
                  ["  def ", "maintenance", "():", " -> ", "-50%"],
                ].map(([key, val, op, str, comment], i) => (
                  <div key={i}>
                    <span className="text-[#6872D9]">{key}</span>
                    <span className="text-[#EDEDEF]">{val}</span>
                    <span className="text-[#8A8F98]">{op}</span>
                    <span className="text-[#5E6AD2]">{str}</span>
                    <span className="text-[#8A8F98]/50">{comment}</span>
                  </div>
                ))}
                <div>
                  <span className="inline-block w-2 h-3.5 bg-[#5E6AD2] animate-blink align-middle" />
                </div>
              </div>
              <div className="px-5 py-2.5 border-t border-white/[0.04] flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[#8A8F98]">
                <span>v2.4.1</span>
                <span className="flex items-center gap-1.5 text-[#5E6AD2]">
                  <span className="status-dot" />
                  ALL PASSING
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
           PROJECTS — Bento widget grid
           ================================================================ */}
      <section id="projects" className="relative py-12 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 relative z-10">
          <div className="mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5E6AD2] font-medium">
              {t.projects.sectionLabel[lang]}
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">
              <span className="text-gradient">{t.projects.heading1[lang]}</span>{" "}
              <span className="text-gradient-accent">{t.projects.heading2[lang]}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
            {t.projects.items.map((p, i) => (
              <div key={p.title.en} className="reveal">
                <ProjectWidget
                  title={p.title[lang]}
                  role={p.role[lang]}
                  period={p.period[lang]}
                  details={p.details[lang]}
                  index={i}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
           EDUCATION + TRAITS — Compact row
           ================================================================ */}
      <section className="relative py-12 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Education */}
            <div className="panel p-6 sm:p-8 flex flex-col">
              <span className="badge w-fit mb-4">{t.education.label[lang]}</span>
              {t.education.items.map((edu) => (
                <div key={edu.school.en}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#5E6AD2]/[0.08] border border-[#5E6AD2]/[0.15] flex items-center justify-center text-[#5E6AD2] font-semibold text-lg">
                      {edu.school[lang][0]}
                    </div>
                    <div>
                      <div className="font-semibold text-[#EDEDEF]">{edu.school[lang]}</div>
                      <div className="text-[13px] text-[#8A8F98]">{edu.degree[lang]}</div>
                    </div>
                    <span className="ml-auto badge">{edu.type[lang]}</span>
                  </div>
                </div>
              ))}
              <div className="mt-6 pt-5 border-t border-white/[0.04]">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8A8F98]">
                  {t.selfEval.label[lang]}
                </span>
                <div className="flex flex-wrap gap-2 mt-3">
                  {t.selfEval.traits[lang].map((trait) => (
                    <span key={trait} className="px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[13px] text-[#8A8F98] hover:text-[#EDEDEF] hover:border-white/[0.10] transition-colors duration-200">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact preview */}
            <div id="contact" className="panel p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="badge w-fit mb-4">{t.contact.heading1[lang]} {t.contact.heading2[lang]}</span>
                <p className="text-[14px] text-[#8A8F98] leading-relaxed">{t.contact.subtitle[lang]}</p>
              </div>
              <div className="flex flex-col gap-2.5 mt-6">
                {[
                  { icon: <Phone className="w-3.5 h-3.5" />, label: t.contact.phone[lang], value: t.contact.phoneVal[lang] },
                  { icon: <Mail className="w-3.5 h-3.5" />, label: t.contact.email[lang], value: "polarishenry990908@gmail.com" },
                  { icon: <MapPin className="w-3.5 h-3.5" />, label: t.contact.loc[lang], value: t.contact.locVal[lang] },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.02] transition-colors duration-200 group/c">
                    <span className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-[#5E6AD2] shrink-0 group-hover/c:border-[#5E6AD2]/30 transition-all duration-200">
                      {c.icon}
                    </span>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-[#8A8F98]">{c.label}</div>
                      <div className="text-[13px] text-[#EDEDEF] font-medium">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
           FOOTER — Minimal, desktop-app status bar style
           ================================================================ */}
      <footer className="border-t border-white/[0.04] bg-[#020203]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Logo" className="w-5 h-5 rounded object-contain opacity-60" />
              <span className="text-[12px] text-[#8A8F98]">
                Arion &middot; {t.footer.title[lang]}
              </span>
            </div>
            <div className="flex items-center gap-6">
              {["#skills", "#experience", "#projects", "#contact"].map((href, i) => (
                <a key={href} href={href} className="text-[11px] font-mono text-[#8A8F98] hover:text-[#EDEDEF] transition-colors">
                  {href.replace("#", "/")}
                </a>
              ))}
            </div>
            <span className="text-[11px] text-[#8A8F98]/60">
              &copy; {new Date().getFullYear()} &middot; Built with Next.js + Tailwind
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
