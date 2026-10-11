/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "16px",
          md: "20px",
          lg: "24px",
          "2xl": "32px",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1440px",
        },
      },
      colors: {
        primary: "#4F46E5",
        primaryHover: "#4338CA",
        primaryLight: "#EEF2FF",
        background: "#F8FAFC",
        surface: "#FFFFFF",
        text: "#0F172A",
        textMuted: "#64748B",
        border: "#E2E8F0",
        success: "#16A34A",
        warning: "#D97706",
        danger: "#DC2626",
      },
    },
  },
  plugins: [],
};
