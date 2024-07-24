import type { Config } from "tailwindcss";

const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        green: "var(--green)",
        yellow: "var(--yellow)",
      },
    },
  },
  plugins: [],
} satisfies Config;
export default config;
