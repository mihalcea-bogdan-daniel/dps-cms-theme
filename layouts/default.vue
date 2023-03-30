<template>
  <div>
    <header class="h-10rem">
      <div class="flex h-full align-items-center justify-content-between">
        <img
          class="ml-4"
          src="https://www.dc-tech.ro/wp-content/uploads/2019/10/logo-dc-tech@2x.png"
          height="80"
          alt=""
        />
        <div class="mr-8">
          <UiLanguageSelect />
        </div>
      </div>
    </header>
    <nav class="dps-navigation">
      <!-- <Menu class="h-full" :items="menuItems"></Menu> // TODO transpus Menu -->
    </nav>
    <main class="dps-container grid grid-nogutter mb-4 mx-auto">
      <NuxtLoadingIndicator />
      <NuxtPage class="col-9" />
      <SharedSidebar class="col-3" />
    </main>
    <footer class="dps-footer">
      <SharedFooter class="col-12" />
    </footer>
  </div>
</template>
<script setup lang="ts">
import {
  ContentNodeResponse,
  ContentNode,
} from "../types/ContentNode/ContentNode";

const config = useRuntimeConfig();
const { dpsCmsTheme } = useAppConfig();

// const menuItems: Ref<MenuItem[]> = ref([]);
await useFetch<ContentNodeResponse>(
  `/api/v1/web-content/${dpsCmsTheme.pageBlocksApiLocations.menu}`,
  {
    baseURL: config.public.apiBase,
  }
);
// ).then((res) => {
//   if (res.data.value) {
//     if (res.data.value.contentNode.referredContent) {
//       return res.data.value.contentNode.referredContent.forEach((item) => {
//         menuItems.value.push({
//           id: item.id,
//           webName: item.properties["cd:title"].value,
//           path: item.path,
//           subItems:
//             item.referredContent && // If has references
//             item.referredContent.map((refItem: ContentNode) => {
//               return {
//                 id: refItem.id,
//                 path: refItem.path,
//                 webName: refItem.properties["cd:title"]?.value,
//               }; // TODO Meniu secundar preia referintele sau categoriile referintelor?
//             }),
//         });
//       });
//     } else {
//       return []; // TODO - setup default menu buttons
//     }
//   }
// });
// const { t } = useI18n();
// locale.setLocale("en");
</script>
<style lang="scss">
.page-content {
  // width: 1200px;
  // max-width: 1200px;
}
.dps-navigation {
  max-height: 2rem;
  height: 2rem;
  background-color: var(--blue-100);
  position: sticky;
  width: 100%;
  top: 0;
}
.dps-container {
  margin-top: 3rem;
  width: 100%;
  max-width: 1200px;
}
.dps-footer {
  position: absolute;
  width: 100%;
  left: 0;
  // background-color: var(--gray-700);
  border-top: 1px solid var(--gray-200);
}
</style>
