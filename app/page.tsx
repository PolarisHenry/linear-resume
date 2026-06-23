"use client";

import { useState, useEffect } from "react";
import { t, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  Search, ArrowRight, ArrowUpRight,
  Code2, Bug, Globe, Zap, Brain, Database, GitBranch, Terminal, Cpu,
  Mail, Phone, MapPin, Star, Trophy, Users, Languages,
  ChevronRight, Copy, Check, Timer, Shield, CheckCircle2, Activity, BarChart3, ListTree, LayoutGrid,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  code: <Code2 className="w-3.5 h-3.5" />, bug: <Bug className="w-3.5 h-3.5" />,
  brain: <Brain className="w-3.5 h-3.5" />, globe: <Globe className="w-3.5 h-3.5" />,
  zap: <Zap className="w-3.5 h-3.5" />, database: <Database className="w-3.5 h-3.5" />,
  git: <GitBranch className="w-3.5 h-3.5" />, terminal: <Terminal className="w-3.5 h-3.5" />,
  cpu: <Cpu className="w-3.5 h-3.5" />,
};

function Ring({ value, size = 40, sw = 2.5 }: { value: number; size?: number; sw?: number }) {
  const r = (size - sw) / 2, circ = 2 * Math.PI * r, off = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} className="progress-ring shrink-0">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={sw} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#5E6AD2" strokeWidth={sw} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={off}
        style={{ filter: "drop-shadow(0 0 4px rgba(94,106,210,0.4))" }} />
      <text x="50%" y="50%" textAnchor="middle" dy=".35em" fill="#EDEDEF" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif">{value}%</text>
    </svg>
  );
}

function CopyBtn({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 2000); }}
      className="w-6 h-6 rounded flex items-center justify-center text-[#8A8F98] hover:text-[#EDEDEF] hover:bg-white/[0.06] transition-all">
      {done ? <Check className="w-3 h-3 text-[#5E6AD2]" /> : <Copy className="w-3 h-3" />}
    </button>
  );
}

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("zh");
  const [activeSection, setActiveSection] = useState("overview");
  const [typedIdx, setTypedIdx] = useState(0);
  const email = "polarishenry990908@gmail.com";

  useEffect(() => {
    if (typedIdx >= email.length) return;
    const t = setTimeout(() => setTypedIdx((i) => i + 1), 60);
    return () => clearTimeout(t);
  }, [typedIdx, email.length]);

  const handleNav = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const sidebarItems = [
    { id: "overview", label: lang === "zh" ? "总览" : "Overview", icon: <Activity className="w-4 h-4" /> },
    { id: "skills", label: t.nav.skills[lang], icon: <BarChart3 className="w-4 h-4" /> },
    { id: "experience", label: t.nav.experience[lang], icon: <ListTree className="w-4 h-4" /> },
    { id: "projects", label: t.nav.projects[lang], icon: <LayoutGrid className="w-4 h-4" /> },
    { id: "contact", label: t.nav.contact[lang], icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="ambient-blob ambient-1" />
        <div className="ambient-blob ambient-2" />
      </div>

      {/* ── SIDEBAR ── */}
      <aside className="fixed top-0 left-0 bottom-0 z-40 w-[220px] flex flex-col bg-[#07070a]/90 backdrop-blur-xl border-r border-white/[0.05]">
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.04]">
          <img src="/logo.png" alt="Logo" className="w-6 h-6 rounded object-contain ring-1 ring-white/[0.06]" />
          <span className="font-semibold text-sm text-[#EDEDEF]">Arion</span>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
          {sidebarItems.map((item) => (
            <button key={item.id} onClick={() => handleNav(item.id)}
              className={cn(
                "flex items-center gap-2.5 w-full text-left px-3 py-2 text-[13px] font-medium rounded-md transition-colors duration-150",
                activeSection === item.id ? "text-[#EDEDEF] bg-white/[0.06]" : "text-[#8A8F98] hover:text-[#EDEDEF] hover:bg-white/[0.04]"
              )}>
              <span className={cn(activeSection === item.id ? "text-[#5E6AD2]" : "text-[#8A8F98]")}>{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {activeSection === item.id && <span className="w-1 h-4 rounded-full bg-[#5E6AD2]" />}
            </button>
          ))}
        </nav>
        <div className="px-4 py-3 border-t border-white/[0.04] flex items-center justify-between">
          <button onClick={() => setLang((l) => (l === "zh" ? "en" : "zh"))}
            className="flex items-center gap-1.5 text-[12px] text-[#8A8F98] hover:text-[#EDEDEF] transition-colors font-mono">
            <Languages className="w-3.5 h-3.5" />{lang === "zh" ? "EN" : "中"}
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex-1 ml-[220px] relative z-10 px-8 lg:px-12 xl:px-16 py-10">

        {/* ===== OVERVIEW ===== */}
        <section id="overview" className="min-h-screen flex flex-col justify-center pb-12">
          {/* Command bar */}
          <div className="flex items-center gap-2 mb-6 max-w-lg">
            <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] font-mono text-[13px] text-[#8A8F98]">
              <Search className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{typedIdx < email.length ? email.slice(0, typedIdx) : email}{typedIdx >= email.length && <span className="w-1.5 h-4 bg-[#5E6AD2] animate-blink ml-0.5 inline-block align-middle" />}</span>
            </div>
            <CopyBtn text={email} />
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="badge">{t.hero.badge[lang]}</span>
            {t.hero.tags[lang].map((tag) => (<span key={tag} className="badge-muted">{tag}</span>))}
          </div>

          {/* Name */}
          <h1 className="text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
            <span className="text-gradient">{t.hero.name[lang]}</span>
          </h1>

          {/* Subtitle + CTAs */}
          <div className="mt-5 flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-8">
            <div>
              <p className="text-xl sm:text-2xl text-[#8A8F98] font-medium tracking-tight">{t.hero.title[lang]}</p>
              <p className="mt-1.5 text-[15px] text-[#8A8F98]/70 leading-relaxed max-w-2xl">{t.hero.subtitle[lang]}</p>
            </div>
            <div className="flex items-center gap-3 lg:ml-auto shrink-0">
              <a href="#skills" onClick={() => handleNav("skills")} className="btn-primary">{t.hero.btn1[lang]} <ArrowRight className="w-3.5 h-3.5" /></a>
              <a href="#contact" onClick={() => handleNav("contact")} className="btn-ghost">{t.hero.btn2[lang]} <ChevronRight className="w-3.5 h-3.5" /></a>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 mt-10 panel overflow-hidden">
            {t.stats[lang].map(([value, label], i) => (
              <div key={label} className={cn("text-center py-7 px-4", i < 3 && "border-r border-white/[0.04]")}>
                <div className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-gradient-accent tabular-nums">{value}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8A8F98] mt-2">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== SKILLS ===== */}
        <section id="skills" className="py-10 sm:py-14">
          <div className="mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5E6AD2] font-medium">{t.skills.sectionLabel[lang]}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
              <span className="text-gradient">{t.skills.heading1[lang]}</span> <span className="text-gradient-accent">{t.skills.heading2[lang]}</span>
            </h2>
          </div>

          <div className="panel overflow-hidden">
            {t.skills.items.map((s, i) => {
              const levels = [92, 88, 80, 78, 72, 85, 82, 72, 75];
              const tags = [
                ["Python", "JS/TS", "Java"], ["Pytest", "Playwright", "Allure"], ["Vue3", "FastAPI", "Vite"],
                ["Claude", "Cursor", "Codex"], ["AES", "CAPTCHA"], ["MySQL", "Navicat"],
                ["Git", "Branch"], ["CLI", "日志"], ["Postman", "JMeter"],
              ];
              return (
                <div key={s.icon} className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3.5 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.015] transition-colors group cursor-pointer">
                  <span className={cn("shrink-0 w-0.5 h-8 rounded-full", i < 3 ? "bg-[#5E6AD2]" : i < 6 ? "bg-[#5E6AD2]/50" : "bg-[#5E6AD2]/25")} />
                  <span className="hidden lg:inline font-mono text-[10px] text-[#8A8F98]/50 w-12 shrink-0">SKL-{String(i+1).padStart(2,"0")}</span>
                  <span className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-[#5E6AD2] group-hover:border-[#5E6AD2]/30 transition-colors shrink-0">{iconMap[s.icon]}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium text-[#EDEDEF]">{s.title[lang]}</div>
                    <div className="text-[12px] text-[#8A8F98] truncate">{s.desc[lang]}</div>
                  </div>
                  <div className="hidden xl:flex items-center gap-1">
                    {tags[i].map((t) => (<span key={t} className="px-1.5 py-0.5 rounded text-[9px] font-mono text-[#8A8F98]/60 border border-white/[0.04]">{t}</span>))}
                  </div>
                  <Ring value={levels[i]} />
                  <ChevronRight className="w-3.5 h-3.5 text-[#8A8F98] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== EXPERIENCE ===== */}
        <section id="experience" className="py-10 sm:py-14">
          <div className="mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5E6AD2] font-medium">{t.experience.sectionLabel[lang]}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
              <span className="text-gradient">{t.experience.heading1[lang]}</span> <span className="text-gradient-accent">{t.experience.heading2[lang]}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {t.experience.items.map((exp, i) => {
              const statusLabel = i === 0 ? { zh: "进行中", en: "Active" } : { zh: "已完成", en: "Completed" };
              const StatusIcon = i === 0 ? Timer : CheckCircle2;
              return (
                <div key={i} className="panel-hover p-5 flex flex-col gap-3 group">
                  <div className="flex items-center justify-between">
                    <span className={cn("flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border",
                      i === 0 ? "border-[#5E6AD2]/25 text-[#5E6AD2] bg-[#5E6AD2]/[0.05]" : "border-white/[0.06] text-[#8A8F98]")}>
                      <StatusIcon className="w-3 h-3" />{statusLabel[lang]}
                    </span>
                    <span className="font-mono text-[10px] text-[#8A8F98]/60">{`0${i+1}`}</span>
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold tracking-tight text-[#EDEDEF] leading-snug">{exp.role[lang]}</h3>
                    <p className="text-[12px] text-[#8A8F98] mt-1.5 leading-relaxed">{exp.company[lang]}</p>
                    <p className="font-mono text-[11px] text-[#5E6AD2] mt-2 tracking-wider">{exp.period[lang]}</p>
                  </div>
                  <ul className="space-y-1 pt-3 border-t border-white/[0.03]">
                    {exp.highlights[lang].map((h, j) => (
                      <li key={j} className="text-[12px] text-[#8A8F98] leading-relaxed flex items-start gap-1.5">
                        <span className="text-[#5E6AD2]/50 shrink-0 mt-[3px]">&mdash;</span><span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== ACHIEVEMENTS + CODE ===== */}
        <section className="py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-6">
            <div>
              <span className="badge mb-4 inline-block">{t.achievements.label[lang]}</span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-3 mb-8">
                <span className="text-gradient">{t.achievements.heading1[lang]}</span> <span className="text-gradient-accent">{t.achievements.heading2[lang]}</span>
              </h2>
              <div className="space-y-0.5">
                {[
                  { icon: <Trophy className="w-4 h-4" />, z: 0 },
                  { icon: <Star className="w-4 h-4" />, z: 1 },
                  { icon: <Users className="w-4 h-4" />, z: 2 },
                  { icon: <Zap className="w-4 h-4" />, z: 3 },
                  { icon: <Shield className="w-4 h-4" />, z: 4 },
                ].map((item) => (
                  <div key={item.z} className="flex items-start gap-3 py-2.5 px-3 -mx-3 rounded-xl hover:bg-white/[0.02] transition-colors group/a">
                    <span className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-[#8A8F98] group-hover/a:text-[#5E6AD2] group-hover/a:border-[#5E6AD2]/25 transition-colors shrink-0 mt-px">{item.icon}</span>
                    <span className="text-[14px] text-[#8A8F98] group-hover/a:text-[#EDEDEF] transition-colors leading-relaxed">{t.achievements.items[lang][item.z]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.04] bg-[#08080a]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" /><span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" /><span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-[10px] text-[#8A8F98] tracking-wider">test_framework.py</span>
              </div>
              <div className="px-5 py-4 font-mono text-[11px] leading-[1.7] flex-1">
                {[["# ","Test Automation Framework"],["",""],["class ","TestFramework",":"],["  engine"," = ","Pytest"," + Playwright"],["  report"," = ","Allure"],["  api_docs"," = ","OpenAPI"," (Swagger)"],["",""],["  def ","coverage","():"," -> ","75%"],["  def ","regression","():"," -> ","2 days"],["  def ","maintenance","():"," -> ","-50%"]].map((p, i) => (
                  <div key={i}><span className="text-[#6872D9]">{p[0]}</span><span className="text-[#EDEDEF]">{p[1]}</span><span className="text-[#8A8F98]">{p[2]}</span><span className="text-[#5E6AD2]">{p[3]}</span><span className="text-[#8A8F98]/50">{p[4]}</span></div>
                ))}
                <div className="flex items-center gap-1.5 mt-2"><span className="w-1.5 h-3.5 bg-[#5E6AD2] animate-blink" /></div>
              </div>
              <div className="px-5 py-2.5 border-t border-white/[0.04] flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[#8A8F98]">
                <span>v2.4.1</span><span className="flex items-center gap-1.5 text-[#5E6AD2]"><span className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2] shadow-[0_0_5px_rgba(94,106,210,0.4)]" />ALL PASSING</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PROJECTS ===== */}
        <section id="projects" className="py-10 sm:py-14">
          <div className="mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5E6AD2] font-medium">{t.projects.sectionLabel[lang]}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
              <span className="text-gradient">{t.projects.heading1[lang]}</span> <span className="text-gradient-accent">{t.projects.heading2[lang]}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {t.projects.items.map((p, i) => (
              <div key={p.title.en} className="panel-hover p-5 flex flex-col gap-3 group">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#5E6AD2] font-medium">PRJ-{String(i+1).padStart(2,"0")}</span>
                  <span className="badge-muted">{p.period[lang]}</span>
                </div>
                <h3 className="text-sm font-semibold tracking-tight text-[#EDEDEF]">{p.title[lang]}</h3>
                <p className="text-[11px] text-[#8A8F98] font-mono uppercase tracking-wider">{p.role[lang]}</p>
                <ul className="space-y-1">
                  {p.details[lang].map((d, j) => (
                    <li key={j} className="text-[12px] text-[#8A8F98] flex items-start gap-1.5">
                      <span className="text-[#5E6AD2]/50 shrink-0">&mdash;</span><span>{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.03]">
                  <span className="text-[10px] text-[#8A8F98]/60 font-mono">{p.details[lang].length} {lang === "zh" ? "项" : "items"}</span>
                  <span className="text-[#5E6AD2]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[11px] font-mono">View <ArrowUpRight className="w-3 h-3" /></span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== EDUCATION ===== */}
        <section className="py-10 sm:py-14">
          <div className="mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5E6AD2] font-medium">{t.education.label[lang]}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
              <span className="text-gradient">{t.education.heading1[lang]}</span> <span className="text-gradient-accent">{t.education.heading2[lang]}</span>
            </h2>
          </div>
          <div className="panel p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#5E6AD2]/[0.08] border border-[#5E6AD2]/[0.15] flex items-center justify-center text-lg font-semibold text-[#5E6AD2] shrink-0">
              {t.education.items[0].school[lang][0]}
            </div>
            <div className="flex-1">
              <div className="text-[15px] font-medium text-[#EDEDEF]">{t.education.items[0].school[lang]}</div>
              <div className="text-[13px] text-[#8A8F98] mt-0.5">{t.education.items[0].degree[lang]}</div>
            </div>
            <span className="badge">{t.education.items[0].type[lang]}</span>
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 sm:ml-4">
              {t.selfEval.traits[lang].map((trait) => (
                <span key={trait} className="px-3 py-1 rounded-lg text-[12px] text-[#8A8F98] bg-white/[0.02] border border-white/[0.04] hover:text-[#EDEDEF] hover:border-white/[0.08] transition-colors">{trait}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section id="contact" className="py-10 sm:py-14 mb-8">
          <div className="mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#5E6AD2] font-medium">{t.contact.heading1[lang]} {t.contact.heading2[lang]}</span>
          </div>
          <div className="panel p-6 sm:p-8">
            <p className="text-[15px] text-[#8A8F98] leading-relaxed mb-6">{t.contact.subtitle[lang]}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: <Phone className="w-4 h-4" />, label: lang === "zh" ? "电话" : "Phone", value: lang === "zh" ? "[已加密]" : "[Protected]" },
                { icon: <Mail className="w-4 h-4" />, label: "Email", value: email },
                { icon: <MapPin className="w-4 h-4" />, label: lang === "zh" ? "位置" : "Location", value: lang === "zh" ? "中国 · 深圳" : "Shenzhen, China" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-white/[0.02] transition-colors group/c">
                  <span className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-[#5E6AD2] group-hover/c:border-[#5E6AD2]/25 transition-colors shrink-0">{c.icon}</span>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#8A8F98]">{c.label}</div>
                    <div className="text-[14px] text-[#EDEDEF] font-medium mt-0.5">{c.value}</div>
                  </div>
                  <CopyBtn text={c.value} />
                </div>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-[#8A8F98]/30 font-mono mt-6 text-center">Built with Next.js + Tailwind</p>
        </section>

      </main>
    </div>
  );
}
