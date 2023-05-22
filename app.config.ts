export default defineAppConfig({
  dpsCmsTheme: {
    name: "dpsCmsTheme",
    pageBlocksApiLocations: {
      footer: {
        path: "sections/footer",
        content: "sections/footer/content",
        copyright: "sections/footer/copyright",
      },
      sidebar: "sections/sidebar",
      homepage: "sections/homepage",
      header: {
        path: "sections/header",
        contact: "sections/header/contact",
        menu: "sections/header/menu",
      },
    },
  },
});

interface PageBlocksDefaultLocationConfig {
  footer: {
    path: string;
    content: string;
    copyright: string;
  };
  sidebar: string;
  homepage: string;
  header: {
    path: string;
    contact: string;
    menu: string;
  };
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
