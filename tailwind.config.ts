import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--m-bg)",
        surface: "var(--m-surface)",
        soft: "var(--m-soft)",
        card: "var(--m-card)",
        ink: "var(--m-ink)",
        sub: "var(--m-sub)",
        muted: "var(--m-muted)",
        faint: "var(--m-faint)",
        border: "var(--m-border)",
        divider: "var(--m-divider)",
        dark: "var(--m-dark)",
        accent: {
          DEFAULT: "var(--m-accent)",
          soft: "var(--m-accent-soft)",
          deep: "var(--m-accent-deep)",
          hover: "var(--m-accent-hover)",
        },
        yolk: "var(--m-yolk)",
        butter: "var(--m-butter)",
        "yolk-soft": "var(--m-yolk-soft)",
        warn: { DEFAULT: "var(--m-warn)", soft: "var(--m-warn-soft)" },
        tomato: { DEFAULT: "var(--m-tomato)", soft: "var(--m-tomato-soft)" },
      },
      borderRadius: {
        sm: "var(--m-radius-sm)",
        DEFAULT: "var(--m-radius)",
        lg: "var(--m-radius-lg)",
        xl: "var(--m-radius-xl)",
      },
      boxShadow: {
        soft: "var(--m-shadow-sm)",
        DEFAULT: "var(--m-shadow)",
        lg: "var(--m-shadow-lg)",
      },
      fontFamily: {
        sans: ["var(--m-font-ui)"],
        display: ["var(--m-font-display)"],
        mono: ["var(--m-font-mono)"],
      },
      letterSpacing: {
        tightest: "-0.025em",
      },
      keyframes: {
        fall: {
          "0%": { transform: "translateY(-10vh) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(720deg)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.3333%)" },
        },
      },
      animation: {
        fall: "fall linear forwards",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
