/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // ← This is the key! JSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
