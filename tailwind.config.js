/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["media", '[data-theme="dark"]'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // https://uicolors.app/
        'blue-lagoon': {
          '50': '#e9fffc',
          '100': '#c7fff7',
          '200': '#96fff1',
          '300': '#4dffea',
          '400': '#00ffee',
          '500': '#00f2f8',
          '600': '#00bfd0',
          '700': '#0098a7',
          '800': '#047582',
          '900': '#086271',
          '950': '#00434f',
        },
      },
      fontFamily: {
        sans: ['var(--font)']
      }
      , keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

