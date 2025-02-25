
/** @type {import('tailwindcss').Config} */

import forms from "@tailwindcss/forms";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        def_blue_1: "#1e3a8a", // blue-900
        def_blue_2: "#1d4ed8", // blue-700
        def_dark_1: "#000000", // black
        def_dark_2: "#171717", // neutral-900
      },
    },
  },
  plugins: [
    forms({
      strategy: 'class',
    }),
  ],
}

