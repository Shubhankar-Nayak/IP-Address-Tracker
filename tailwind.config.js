/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        VeryDarkGray: "hsl(0, 0%, 17%)",
        DarkGray: "hsl(0, 0%, 59%)",
      },
      fontFamily: {
        Rubik : ["Rubik"]
      },
      screens: {
        "mobile-l" : "376px",
        "tablet" : "576px",
        "laptop" : "768px"
      }
    },
  },
  plugins: [],
}

