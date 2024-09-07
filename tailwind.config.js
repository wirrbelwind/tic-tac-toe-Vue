
/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#713f12",

          "secondary": "#713f12",

          "accent": "#713f12",

          "neutral": "#713f12",

          "base-100": "#fee2e2",

          "info": "#713f12",

          "success": "#713f12",

          "warning": "#713f12",

          "error": "#713f12",
        },
      },
    ],
  },

  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
}

