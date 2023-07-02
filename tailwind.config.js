/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    colors: {
      ...colors,
      primary: "#272088",
      "primary-dark": "#171351",
      "primary-contrast": colors.white,
      secondary: colors.yellow,
      neutral: colors.gray,
    },
    extend: {},
  },
  plugins: [],
};
