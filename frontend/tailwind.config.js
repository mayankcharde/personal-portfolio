/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // === COMMAND DECK — Warm Terracotta OS Theme ===
        background: "#D85A48", // Terracotta coral — main page BG
        surface: "#2A3040", // Deep navy charcoal — card/panel BG
        surfaceLight: "#E07060", // Lighter coral — secondary surfaces
        primary: "#2A3040", // Dark navy — primary button fills
        secondary: "#F0B0A0", // Warm peach — borders, glows, highlights
        highlight: "#FFD166", // Warm gold — status dots, lime replacement
        textPrimary: "#F9F5F2", // Warm off-white — on dark panels
        textSecondary: "#9AA0AC", // Muted cool-gray — secondary labels
        textDark: "#2A3040", // Dark navy — text on coral backgrounds
        success: "#6BCB8B",
        error: "#F87171",
        radarBg: "#0A0A0A",
        radarBorder: "#2A2A2A",
        radarGrid: "#3A2A1A",
        radarAccent: "#FF7A1A",
        radarText: "#E8E8E8",
        radarTextMuted: "#B0B0B0",
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "coral-navy": "linear-gradient(135deg, #2A3040 0%, #3D4A60 100%)",
        "coral-peach": "linear-gradient(135deg, #D85A48 0%, #F0B0A0 100%)",
        "peach-gold": "linear-gradient(135deg, #F0B0A0 0%, #FFD166 100%)",
      },
    },
  },
  plugins: [],
};
