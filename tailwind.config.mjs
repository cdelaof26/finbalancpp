/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '800px',
      'md': '700px',
      'lg': '1200px',
      'xl': '1800px',
      '2xl': '4000px'
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          "0": "#FFFFFF", // white
          "1": "#000000" // black
        },
        secondary: {
          "0": "#f1f5f9", // slate-100
          "1": "#0f172a" // slate-900
        },
        accent: {
          "dim-0": "#6b7280", // gray-500
          "dim-1": "#9ca3af", // gray-400
          "0": "#3b82f6", // blue-500
          "1": "#0ea5e9", // sky-500
          "2": "#075985", // sky-800
          "fg-0": "#111827", // gray-900
          "fg-1": "#FFFFFF", // white
          "b-0": "#cbd5e1", // slate-300
          "b-1": "#4b5563", // gray-600
        }
      },
    },
  },
  plugins: [],
};
