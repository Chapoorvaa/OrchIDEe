/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        skin: {
          "bg-dark": "var(--bg-dark)",
          "bg-medium": "var(--bg-medium)",
          "bg-light": "var(--bg-light)",
        },
      },
      borderColor: {
        skin: {
          "stroke-light": "var(--stroke-light)",
          "stroke-dark": "var(--stroke-dark)",
        },
      },
      textColor: {
        skin: {
          "text-primary": "var(--text-primary)",
          "text-secondary": "var(--text-secondary)",
          "text-tertiary": "var(--text-tertiary)",
        },
      },
      fontFamily: {
        custom: "var(--custom-family)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no_scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
