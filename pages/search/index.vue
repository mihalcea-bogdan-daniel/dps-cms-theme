<template>
  <NuxtLayout :featuredImage="false">
    <template #hero></template>
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
    query: {text: route.query.search},
  }
);
console.log(data);

</script>

<style scoped></style>
