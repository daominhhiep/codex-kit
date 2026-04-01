/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "#f8fbff",
        ink: "#111111",
        slate: "#505866",
        "slate-light": "#7b8494"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"]
      },
      boxShadow: {
        soft: "0 20px 50px rgba(16, 24, 40, 0.08)",
        hero: "0 32px 72px rgba(125, 152, 194, 0.18)"
      }
    }
  },
  plugins: []
};
