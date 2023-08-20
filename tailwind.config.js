 /** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grey: "#5A5959",
        yellow: "#FFEAAE",
        purple: "#5F00D9",
        red: "#D01C28",
      },
    },
  },
  plugins: [],
};
