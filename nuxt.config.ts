import { resolve } from "pathe";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const currentDir = dirname(fileURLToPath(import.meta.url));

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/i18n",
    "nuxt-headlessui",
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@vee-validate/nuxt",
  ],
  build: {
    transpile: ["primevue", "@vee-validate/rules", "@vee-validate/yup" ],
  },
  plugins: [
    {
      src: join(currentDir, "./plugins/primevue.ts"),
      mode: "client",
    },
    {
      src: join(currentDir, "./plugins/veevalidate-rules.ts"),
    },
  ],
  css: [
    // because of the docs https://nuxt.com/docs/guide/going-further/layers#relative-paths-and-aliases
    join(currentDir, "./assets/fontawesome/css/all.css"),
    join(currentDir, "./assets/cms-components.scss"),
    join(currentDir, "/node_modules/primevue/resources/primevue.min.css"),
  ],
  // Optionally change the default prefix for headless.
  headlessui: {
    prefix: "Headless",
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: "VForm",
      Field: "VField",
      FieldArray: "VFieldArray",
      ErrorMessage: "VErrorMessage",
    },
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
