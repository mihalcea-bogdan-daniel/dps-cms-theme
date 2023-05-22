<template>
  <NuxtLayout :sidebar="false">
    <template v-slot="{ contentNode, pending }">
      <div id="app"></div>
    </template>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { MetaObject } from "nuxt/schema";
useHead({
  script: [
    {
      src: "http://localhost:8081/api/v1/web/get-file/homepage/mol-frontend",
      async: true,
      defer: true,
    },
  ],
});
</script>
<style scoped></style>
