/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      cashmere: "#deccbd", // light version of donkey
      donkey: "#aa9584",
      millbrook: "#5e4739", // dark version of donkey
      beaver: "#906d57",
      bitter: "#8f927d",
      merino: "#f3eae1",
      swirl: "#ebe2da", // dark version of merino
      error: "#ff3333",
    },
  },
  plugins: [],
};
