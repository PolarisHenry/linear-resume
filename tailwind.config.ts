import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        linear: {
          "bg-deep": "#020203",
          "bg-base": "#050506",
          "bg-elevated": "#0a0a0c",
          surface: "rgba(255,255,255,0.05)",
          "surface-hover": "rgba(255,255,255,0.08)",
          fg: "#EDEDEF",
          "fg-muted": "#8A8F98",
          "fg-subtle": "rgba(255,255,255,0.60)",
          accent: "#5E6AD2",
          "accent-bright": "#6872D9",
          "accent-glow": "rgba(94,106,210,0.3)",
          border: "rgba(255,255,255,0.06)",
          "border-hover": "rgba(255,255,255,0.10)",
          "border-accent": "rgba(94,106,210,0.30)",
        },
      },
      fontFamily: {
        sans: ['"Inter"', '"Geist Sans"', "system-ui", "sans-serif"],
        body: ['"Inter"', '"Geist Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(1deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg) scale(1)" },
          "33%": { transform: "translateY(-15px) rotate(0.5deg) scale(1.02)" },
          "66%": { transform: "translateY(10px) rotate(-0.5deg) scale(0.98)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.8" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        float: "float 8s ease-in-out infinite",
        "float-slow": "float-slow 10s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
