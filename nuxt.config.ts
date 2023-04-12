import { resolve } from "pathe";
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/i18n", "nuxt-headlessui", "@nuxt/content"],
  css: [
    "primevue/resources/themes/saga-blue/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
    "primeflex/primeflex.css",
  ],
  // Optionally change the default prefix.
  headlessui: {
    prefix: "Headless",
  },
  content: {
    sources: {
      // overwrite default source AKA `content` directory
      content: {
        driver: "fs",
        prefix: "/content", // All contents inside this source will be prefixed with `/docs`
        base: resolve(__dirname, "content"),
      },
    },
  },
});
