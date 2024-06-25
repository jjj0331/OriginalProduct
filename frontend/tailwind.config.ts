import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
      },
      colors: {
        main_color: 'rgb(242, 240, 233)',
        "selected-bg": "#cccccc",
      },
      fontFamily: {
        'noto-sans-cjk': ['Noto Sans CJK JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
