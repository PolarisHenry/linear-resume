import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arion | 测试开发 / 高级软件测试 / 自动化测试",
  description: "5 年跨境 SaaS 测试开发经验，现任 linko 分销平台测试负责人。擅长自动化测试 0→1 搭建、测试团队统筹。Python / JavaScript / Playwright / Pytest。",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen font-body antialiased">
        {children}
        <Toaster
          toastOptions={{
            style: {
              background: "#0a0a0c",
              color: "#EDEDEF",
              border: "1px solid rgba(255,255,255,0.06)",
              fontFamily: '"Inter", "Noto Sans SC", sans-serif',
              fontSize: "13px",
              borderRadius: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}
