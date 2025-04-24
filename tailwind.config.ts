import type { Config } from "tailwindcss";
import scrollbarHide from 'tailwind-scrollbar-hide'

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dawapurple: "#6948ED",
        tableheader: "#F0EDFE",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        slideIn: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        slideOut: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.4s ease-in-out',
        slideOut: 'slideOut 0.4s ease-in-out forwards',
      },
    },
  },
  plugins: [scrollbarHide],
};
export default config;