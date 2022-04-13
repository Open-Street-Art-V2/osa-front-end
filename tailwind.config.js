module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      zIndex: {
        100: "100",
      },
      boxShadow: {
        center: "0px 0px 4px 2px rgba(0, 0, 0, 0.1)",
        navbar: "0px 0px 4px 2px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        modal: "rgba(255, 255, 255, 0.1)",
        logoGreen: "#7DCCAB",
        logoSlate: "#3A4551",
      },
    },
  },
  variants: {
    outline: ["focus"],
  },
  // eslint-disable-next-line global-require
  plugins: [require("tw-elements/dist/plugin")],
};
