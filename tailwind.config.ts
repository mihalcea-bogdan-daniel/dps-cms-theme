import type { Config } from "tailwindcss";
// import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  theme: {
    extend: {
      animation: {
        "backdrop": "backdrop 1s ease-in",
      },
      keyframes: {
        "backdrop": {
          "0%": {
            "backdrop-filter": "blur(0px)"
          },
          "100%":{
            "backdrop-filter": "blur(16px)"
          }
        },
      },
    },
  },
  // theme: {},
};
