export default defineAppConfig({
  dpsCmsTheme: {
    name: "dpsCmsTheme",
    pageBlocksApiLocations: {
      footer: "sections/footer",
      sidebar: "sections/sidebar",
      menu: "sections/header/menu",
      homepage: "sections/homepage",
      header: "sections/header",
    },
  },
});

interface PageBlocksDefaultLocationConfig {
  footer: string;
  sidebar: string;
  menu: string;
  homepage: string;
  header: string;
}

declare module "@nuxt/schema" {
  interface AppConfigInput {
    dpsCmsTheme?: {
      /** Project name */
      name?: string;
      pageBlocksApiLocations: PageBlocksDefaultLocationConfig;
    };
  }
}
