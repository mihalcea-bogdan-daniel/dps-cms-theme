import type { Config } from "tailwindcss";
// import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1296px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2E71EA", // Primary default
          50: "#DCECFF", //Secondary-blue
          100: "#BDD2F8", //Pastel blue
          200: "#B9CFF8",
          300: "#A6C3F6",
          400: "#98B7F0",
          500: "#81AAF2",
          600: "#6F9DF1",
          700: "#5C90EF",
          800: "#4A84ED",
          900: "#3777EB",
          950: "#2E71EA",
        },
        black: {
          DEFAULT: "#282828",
          50: "#F8F8F8",//black-50
          100: "#EBEBEB",
          200: "#D4D4D4",
          300: "#BDBDBD",
          400: "#A6A6A6",
          500: "#8F8F8F",
          600: "#848484",//secondary-black
          700: "#616161",
          800: "#4A4A4A",
          900: "#333333",
          950: "#282828",
        },
      },
      container: {
        padding: {
          DEFAULT: "20px",
          sm: "20px",
          md: "20px",
          lg: "32px",
          xl: "72px",
          "2xl": "72px",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1296px",
          "2xl": "1296px",
        },
      },
    },
  },
  // theme: {},
};
