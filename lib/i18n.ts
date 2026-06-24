export type Lang = "zh" | "en";

export const t = {
  nav: {
    skills:     { zh: "技能",     en: "Skills" },
    experience: { zh: "经历",     en: "Experience" },
    projects:   { zh: "项目",     en: "Projects" },
    contact:    { zh: "联系",     en: "Contact" },
    contactBtn: { zh: "联系我",   en: "Get in Touch" },
  },
  hero: {
    badge:    { zh: "SENIOR_SDET",       en: "SENIOR_SDET" },
    name:     { zh: "ARION",             en: "ARION" },
    title:    { zh: "高级测试开发工程师",  en: "Senior SDET Engineer" },
    subtitle: { zh: "5 年跨境 SaaS 测试经验 · 专注自动化测试 0→1 搭建 · 测试团队统筹", en: "5 years cross-border SaaS testing · Automation from scratch · Test team leadership" },
    tags: {
      zh: ["跨境SaaS", "ERP/OMS/WMS", "自动化0→1", "测试团队统筹"],
      en: ["Cross-border SaaS", "ERP/OMS/WMS", "Automation 0→1", "Test Team Lead"],
    },
    hud: {
      status:  { zh: "状态",         en: "STATUS" },
      avail:   { zh: "可入职",        en: "AVAILABLE" },
      exp:     { zh: "经验",         en: "EXP" },
      expVal:  { zh: "5 年",         en: "5 YEARS" },
      role:    { zh: "角色",         en: "ROLE" },
      roleVal: { zh: "测试负责人",     en: "TEST LEAD" },
      loc:     { zh: "位置",         en: "LOCATION" },
      locVal:  { zh: "深圳",         en: "SHENZHEN" },
      phone:   { zh: "电话",         en: "PHONE" },
      phoneVal:{ zh: "[已加密]",      en: "[ENCRYPTED]" },
    },
    btn1:    { zh: "查看技能",       en: "View Skills" },
    btn2:    { zh: "工作经历",       en: "Experience" },
  },
  stats: {
    zh: [["5 年", "经验年限"], ["S 级", "年度绩效"], ["500+", "累计面试"], ["10 万+", "节省成本"]],
    en: [["5Y", "Experience"], ["S Grade", "Performance"], ["500+", "Interviewed"], ["¥100K+", "Cost Saved"]],
  },
  skills: {
    sectionLabel:{ zh: "能力矩阵",      en: "CAPABILITIES" },
    heading1:   { zh: "技术",           en: "Technical" },
    heading2:   { zh: "栈",            en: "Stack" },
    subtitle:   { zh: "5 年深耕，全栈测试能力矩阵", en: "5 years of full-stack testing expertise" },
    items: [
      { icon: "code",     label: { zh: "编程",       en: "Programming" },     title: { zh: "编程语言", en: "Programming Languages" },     desc: { zh: "Python / JavaScript (Node.js + TypeScript) / Java — 多项实际项目落地", en: "Python / JavaScript (Node.js + TypeScript) / Java — production-proven" } },
      { icon: "bug",      label: { zh: "自动化",      en: "Automation" },      title: { zh: "自动化测试", en: "Test Automation" },          desc: { zh: "Pytest + Playwright + OpenAPI + Allure — 0→1 搭建框架，覆盖度 75%", en: "Pytest + Playwright + OpenAPI + Allure — 0→1 framework, 75% coverage" } },
      { icon: "cpu",      label: { zh: "工具开发",     en: "Dev Tools" },      title: { zh: "提效工具开发", en: "Dev Tools" },              desc: { zh: "Vue 3 + NaiveUI/ElementUI + Vite + FastAPI — 全栈独立交付", en: "Vue 3 + NaiveUI/ElementUI + Vite + FastAPI — full-stack delivery" } },
      { icon: "brain",    label: { zh: "AI 工具",    en: "AI Tools" },       title: { zh: "AI 辅助开发", en: "AI-Assisted Dev" },       desc: { zh: "Claude Code / Codex / Cursor / DeepSeek — AI 辅助编码与调试", en: "Claude Code / Codex / Cursor / DeepSeek — AI-assisted coding & debugging" } },
      { icon: "globe",    label: { zh: "Web 逆向",   en: "Web Reverse" },    title: { zh: "Web 逆向爬虫", en: "Web Reverse Engineering" }, desc: { zh: "JavaScript 逆向 — AES 加密、图像验证码、滑块验证突破", en: "JS reverse engineering — AES, CAPTCHA, slider bypass" } },
      { icon: "database", label: { zh: "数据库",      en: "Database" },       title: { zh: "数据库", en: "Database" },                  desc: { zh: "MySQL 精通 — SQL 增删改查、DataGrip / Navicat 数据分析", en: "MySQL expert — DML/DDL, DataGrip / Navicat" } },
      { icon: "git",      label: { zh: "版本管理",     en: "Version Control" }, title: { zh: "版本协同", en: "Version Control" },          desc: { zh: "Git — pull / push / merge / branch 团队协作", en: "Git — pull / push / merge / branch workflows" } },
      { icon: "terminal", label: { zh: "Linux",      en: "Linux" },          title: { zh: "Linux 系统", en: "Linux" },                  desc: { zh: "Linux CLI — 服务器日志定位与问题排查", en: "Linux CLI — log inspection & troubleshooting" } },
      { icon: "zap",      label: { zh: "接口测试",     en: "API Testing" },    title: { zh: "接口测试", en: "API Testing" },              desc: { zh: "Postman / JMeter — API 测试、文档管理与性能压测", en: "Postman / JMeter — API testing, docs & perf" } },
    ],
  },
  experience: {
    sectionLabel:{ zh: "职业路径",     en: "CAREER PATH" },
    heading1:   { zh: "工作",         en: "Work" },
    heading2:   { zh: "经历",         en: "Experience" },
    items: [
      {
        period:  { zh: "2025.09 — 至今", en: "2025.09 — Present" },
        company: { zh: "店小秘 (D轮独角兽 · 跨境 SaaS 头部)", en: "Dianxiaomi (Series D Unicorn · Cross-border SaaS Leader)" },
        role:    { zh: "linko 分销平台 · 测试负责人", en: "linko Distribution Platform · Test Lead" },
        highlights: {
          zh: ["0→1 组建测试团队，明确 MVP 版本内容，统筹任务拆分与推进","基于 Swagger 独立开发接口 + UI 自动化测试框架","核心主流程用例覆盖度 75%，回归从 1 周降至 2 天","自动化 case 维护成本降低 50%"],
          en: ["Built test team 0→1, defined MVP scope, drove delivery","Built API + UI automation framework based on Swagger docs","75% core-flow coverage, regression: 1wk → 2 days","50% reduction in automation maintenance cost"],
        },
      },
      {
        period:  { zh: "2022.03 — 2025.09", en: "2022.03 — 2025.09" },
        company: { zh: "店小秘 (D轮独角兽 · 跨境 SaaS 头部)", en: "Dianxiaomi (Series D Unicorn · Cross-border SaaS Leader)" },
        role:    { zh: "赛狐 ERP · 高级测试工程师", en: "Sailfox ERP · Senior Test Engineer" },
        highlights: {
          zh: ["主导 FBM 订单发货、物流对账、物流追踪等 10+ 核心功能测试","指导自动化脚本开发，覆盖多平台业务场景","开发提效工具累计节省人力成本超 10 万元","2024 年度连续 3 季度优秀员工，Q2 全团队 150 人中最高 S 级","全年稳定性全团队第一，线上 bug 数最低，无严重线上问题","组织公司级测试技术培训 5 场，作为面试官累计面试 500+ 人，担任导师培养 4 人均已转正为核心骨干"],
          en: ["Led testing for 10+ features: FBM, logistics, tracking & more","Mentored automation script dev across multi-platform scenarios","Built tools saving over ¥100K in labor costs","2024: 3× Outstanding Employee; Q2 S-grade among 150 (only 2)","#1 annual stability; lowest online bugs; zero critical incidents","5 company-wide training sessions; mentored 4 — all became core contributors"],
        },
      },
      {
        period:  { zh: "2021.06 — 2022.01", en: "2021.06 — 2022.01" },
        company: { zh: "深圳麦唯智能科技有限公司", en: "Shenzhen Maiwei Intelligent Technology" },
        role:    { zh: "电商 ERP 系统 · 软件测试工程师", en: "E-commerce ERP · Software Test Engineer" },
        highlights: {
          zh: ["独立负责整个 ERP 系统测试 (采购→入库→FBA 全链路)","连续 2 个季度获优秀员工称号","推动 ERP 软件在公司成功实施落地"],
          en: ["Sole end-to-end ERP testing (Procurement→Warehousing→FBA)","Outstanding Employee 2 consecutive quarters","Drove successful ERP implementation company-wide"],
        },
      },
    ],
  },
  achievements: {
    label:    { zh: "亮点成果",      en: "HIGHLIGHTS" },
    heading1: { zh: "核心",         en: "Key" },
    heading2: { zh: "成果",         en: "Results" },
    items: {
      zh: ["2024 Q2 全团队 150 人中绩效 S 级 (仅 2 名额)","连续 3 季度优秀员工，功能稳定性全团队第一","作为面试官累计面试 500+ 候选人","担任导师培养 4 人，均已转正为核心骨干","开发提效工具节省人力成本超 10 万元，迁移效率翻倍","线上 bug 数全团队最低，无严重线上问题"],
      en: ["2024 Q2: S-grade performance among 150 (only 2 awarded)","3× Outstanding Employee; #1 feature stability company-wide","Interviewed 500+ candidates as hiring panel","Mentored 4 — all promoted to core contributors","Productivity tools saved ¥100K+; 2x migration efficiency","Lowest online bug count; zero critical production issues"],
    },
  },
  projects: {
    sectionLabel:{ zh: "项目集",       en: "PORTFOLIO" },
    heading1:   { zh: "核心",         en: "Core" },
    heading2:   { zh: "项目",         en: "Projects" },
    items: [
      {
        title:   { zh: "linko 分销平台", en: "linko Distribution Platform" },
        period:  { zh: "2025.09 — 至今", en: "2025.09 — Present" },
        role:    { zh: "测试负责人",      en: "Test Lead" },
        details: {
          zh: ["跨境生态核心布局 — B2B 一件代发分销平台","链接本地货源供应商与亚马逊/TK 等多平台无货源分销商","订单/支付/发货全链路自动化 + 交易担保一体化","0→1 组建测试团队，统筹推进 MVP 版本落地","独立开发接口 + UI 自动化框架，覆盖度 75%，回归 1 周→2 天"],
          en: ["Core cross-border B2B dropshipping distribution platform","Connecting suppliers with Amazon/TikTok Shop resellers","End-to-end automation: order/payment/fulfillment + escrow","Built test team 0→1, drove MVP delivery","Built API + UI automation; 75% coverage, regression: 1wk→2d"],
        },
      },
      {
        title:   { zh: "赛狐 ERP", en: "Sailfox ERP" },
        period:  { zh: "2022.03 — 2025.09", en: "2022.03 — 2025.09" },
        role:    { zh: "高级测试工程师", en: "Senior Test Engineer" },
        details: {
          zh: ["亚马逊卖家精细化运营管理系统","主导 FBM 发货、物流对账、物流追踪、三方海外仓等 10+ 功能测试","覆盖亚马逊 + 多平台、多区域业务场景","开发提效工具，累计节省人力成本 10W+ RMB","全年稳定性全团队第一，线上 bug 数最低"],
          en: ["Refined operations system for Amazon sellers","Led testing for 10+ modules: FBM, logistics, tracking, 3PL","Covered Amazon + multi-platform, multi-region scenarios","Built tools saving ¥100K+ in labor costs","#1 annual stability; lowest online bug count"],
        },
      },
      {
        title:   { zh: "1688 配比关系迁移工具", en: "1688 Supplier Mapping Migration" },
        period:  { zh: "2024.07 — 2025.07", en: "2024.07 — 2025.07" },
        role:    { zh: "全栈开发", en: "Full-Stack Developer" },
        details: {
          zh: ["领星 + 赛盒 ERP 用户 1688 配比关系批量迁移工具","技术栈: JavaScript + Vue 3 + Vite + Tampermonkey","1~3 人半个月工作量缩减至 1 小时，节省超 10 万元/月","简单易用，快速完成新签用户数据迁移","显著增强用户粘性与留存"],
          en: ["Batch migration for LingXing + SaiHe ERP supplier mapping data","Stack: JavaScript + Vue 3 + Vite + Tampermonkey","Reduced 1~3 person-weeks to 1 hour; ¥100K+/month savings","Intuitive tool for rapid new-user data migration","Significantly improved retention & stickiness"],
        },
      },
      {
        title:   { zh: "店小秘内部财务系统", en: "Dianxiaomi Finance System" },
        period:  { zh: "2022.12 — 2023.02", en: "2022.12 — 2023.02" },
        role:    { zh: "独立测试负责人", en: "Sole Test Lead" },
        details: {
          zh: ["公司内部财务核算系统 — 日/月/年营收核算","支持向投资机构展示盈利数据，辅助融资及上市准备","独立负责全系统测试 (功能 + 接口自动化)","0→1 搭建接口测试自动化框架","开发自动化 case 近 300+ 条"],
          en: ["Internal financial accounting: daily/monthly/annual revenue","Investor-facing profitability dashboards for funding & IPO","Sole end-to-end testing (functional + API automation)","Built API test automation framework from scratch (0→1)","Developed 300+ automated test cases"],
        },
      },
    ],
  },
  education: {
    label:    { zh: "教育背景",     en: "EDUCATION" },
    heading1: { zh: "教育",        en: "Academic" },
    heading2: { zh: "背景",        en: "Background" },
    items: [
      {
        school:  { zh: "暨南大学",   en: "Jinan University" },
        degree:  { zh: "计算机科学与技术", en: "Computer Science & Technology" },
        type:    { zh: "本科",       en: "Bachelor" },
        period:  { zh: "", en: "" },
      },
    ],
  },
  selfEval: {
    label:  { zh: "自我评价",      en: "TRAITS" },
    traits: {
      zh: ["勤奋踏实", "工作负责", "经验丰富", "善于沟通", "技术扎实"],
      en: ["Diligent", "Accountable", "Experienced", "Communicative", "Skilled"],
    },
  },
  contact: {
    heading1:  { zh: "准备好",            en: "Ready to" },
    heading2:  { zh: "联系了吗？",         en: "Connect?" },
    subtitle:  { zh: "测试开发 / 高级软件测试 / 自动化测试 — 期待与您交流", en: "SDET / Senior QA / Test Automation — Let's talk" },
    phone:     { zh: "电话",             en: "PHONE" },
    phoneVal:  { zh: "[已加密]",          en: "[PROTECTED]" },
    email:     { zh: "邮箱",             en: "EMAIL" },
    loc:       { zh: "位置",             en: "LOCATION" },
    locVal:    { zh: "中国 · 深圳",       en: "Shenzhen, China" },
  },
  footer: {
    title:     { zh: "高级测试开发工程师", en: "Senior SDET Engineer" },
    nav:       { zh: "导航",             en: "NAV" },
    stack:     { zh: "技术栈",            en: "STACK" },
    links:     { zh: "链接",             en: "LINKS" },
    copyright: { zh: "版权所有",          en: "All rights reserved." },
  },
  expandCard: {
    open:  { zh: "已展开",  en: "EXPANDED" },
    closed:{ zh: "点击展开", en: "CLICK TO EXPAND" },
  },
};
