import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-public-sans)", "Public Sans", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          green: "#10b981",
          "green-light": "#d1fae5",
        },
        figma: {
          primary: "#1c252e",
          secondary: "#637381",
        },
      },
    },
  },
  plugins: [],
};

export default config;
