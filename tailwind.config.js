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
        // Can choose the name you want, 'brand' is a suggestion
        'brand': {
          '50': '#eefbf5',
          '100': '#d6f5e6',
          '200': '#b1e9d1',
          '300': '#7ed7b7',
          '400': '#49be97',
          '500': '#27a27d',
          '600': '#1b9170',
          '700': '#136953',
          '800': '#125343',
          '900': '#104438',
          '950': '#082620',
        },

      },
      fontFamily: {
        sans: ['var(--font)']
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(40,101, 186, 0.25)',
      }, keyframes: {
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

