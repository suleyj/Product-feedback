/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#AD1FEA",
        blue: "#4661E6",
        white: "#FFFFFF",
        lightIndigo: "#F2F4FF",
        lightGray: "#F7F8FD",
        navyBlue: "#3A4374",
        gray: "#647196",
        orange: "#F49F85",
        lightBlue: "#62BCFA",
        dark: "#373F68",
        red: "#D73737",
        overlay: "rgba(0, 0, 0, 0.5)",
      },
      fontFamily: {
        jost: ["Jost", "sans-serif"],
      },
      backgroundImage: {
        gradientMobile:
          "url('./assets/suggestions/mobile/background-header.png')",
        gradientTablet:
          "url('./assets/suggestions/tablet/background-header.png')",
        gradientDesktop:
          "url('./assets/suggestions/desktop/background-header.png')",
      },
    },
  },
  plugins: [],
};
