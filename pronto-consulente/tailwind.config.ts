import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#071A3D",
          50: "#EDF1F8",
          100: "#D6DFEE",
          200: "#AEC0DD",
          300: "#7F9BC8",
          400: "#4C6FA8",
          500: "#26478A",
          600: "#124A8A",
          700: "#0F3468",
          800: "#0B2650",
          900: "#071A3D",
          950: "#040F24",
        },
        institutional: "#124A8A",
        gold: {
          DEFAULT: "#C89B4A",
          50: "#FBF6EC",
          100: "#F5E9CE",
          200: "#EBD39D",
          300: "#DFBC71",
          400: "#D3A957",
          500: "#C89B4A",
          600: "#A87C36",
          700: "#82602A",
          800: "#5C4520",
          900: "#382A15",
        },
        surface: "#FFFFFF",
        muted: "#F5F7FA",
        ink: "#0B1220",
        body: "#5F6773",
        verified: {
          DEFAULT: "#2E9D67",
          50: "#EAF7EF",
          600: "#237F52",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(7,26,61,0.04), 0 4px 16px rgba(7,26,61,0.06)",
        "card-hover": "0 8px 24px rgba(7,26,61,0.10), 0 2px 6px rgba(7,26,61,0.06)",
        premium: "0 20px 60px rgba(7,26,61,0.12)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      maxWidth: {
        container: "1280px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "fade-in": "fade-in 0.4s ease-out both",
        shimmer: "shimmer 1.6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
