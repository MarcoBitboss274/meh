import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0078c8",
        black: "#1b1b1b",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "accordion-up": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ['var(--font-overpass)', 'Overpass', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config; 