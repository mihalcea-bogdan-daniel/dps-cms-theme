export default defineAppConfig({
  dpsCmsTheme: {
    name: "dpsCmsTheme",
    pageBlocksApiLocations: {
      footer: {
        path: "sections/footer",
        content:"sections/footer/content",
        copyright: "sections/footer/copyright",
        "footer-menu": "sections/footer/footer-menu",
      },
      sidebar: "sections/sidebar",
      homepage: "sections/homepage",
      header: "sections/header",
        menu: "sections/header/menu",
    },
  },
});



interface PageBlocksDefaultLocationConfig {
  footer: {
    path: string,
    content: string,
    copyright: string,
    "footer-menu": string,
  };
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
