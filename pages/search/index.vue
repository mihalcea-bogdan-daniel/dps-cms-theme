<template>
  <NuxtLayout :featuredImage="false" :sidebar="false">
    <template #hero>
      <template v-if="data?.items && !(data?.items.length > 0)">
        <h2 class="small col-span-12 text-center my-12">
          Nu au fost gasite rezultate
        </h2>
      </template>
      <template v-else>
      <pre>{{ data }}</pre>
      </template>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">

import { ContentNodeResponse } from "~~/../types/ContentNode/ContentNode";
const { dpsCmsTheme } = useAppConfig();
const route = useRoute();
const config = useRuntimeConfig();

const { data, pending, error } = await useFetch<ContentNodeResponse>(
  `/api/v1/web/search`,
  {
    baseURL: config.public.apiBase,
    query: { text: route.query.search },
  }
);
console.log('====================================');
console.log(data);
console.log('====================================');
//Disable caching on the search results
//@ts-ignore -- this modules is imported in the core project
useRouteCache((helper) => {
  helper.setUncacheable();
});
</script>

<style scoped></style>
