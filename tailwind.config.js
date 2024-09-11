
/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {

"primary": "#f97316",

"secondary": "#f97316",

"accent": "#f97316",

"neutral": "#f97316",

"base-100": "#fed7aa",

"info": "#f97316",

"success": "#f97316",

"warning": "#f97316",

"error": "#ef4444",
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

