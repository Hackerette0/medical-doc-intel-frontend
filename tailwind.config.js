/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Medical theme colors (optional bonus)
      colors: {
        'medical-blue': '#3B82F6',
        'warning-red': '#EF4444',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}