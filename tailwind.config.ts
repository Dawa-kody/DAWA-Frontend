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
        primaryPurple: "#6948ED",
        subPurple: "#D9D6FE",
        badColor: "#D23B3B", //실패 했을 때 사용하는 붉은 경고 색
        "slate-gray": "#F2F4F7", //옅은 회색
        "deep-gray": "#95979D", //짙은 회색
        Deactivation: "#98A2B3", //설명 글자 & 비활성화된 글자 색
        Inaccessible: "#E4E7EC", //접근 불가 색
        "text-black": "#000000", //감은색
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