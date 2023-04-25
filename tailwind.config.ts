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
      colors:{
        primary: {
          blue: "#2E70EA",
          black: "#282828",
        },
        secondary: {
          blue: "#DCECFF",
          black: "#848484",
        },
        pastel: {
          blue: "#BDD2F8",
          black: "#E8E8E8",
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
