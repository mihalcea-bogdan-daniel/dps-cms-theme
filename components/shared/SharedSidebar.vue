<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="grid grid-nogutter">
    <div
      v-if="sidebarContentNode"
      class="col-12"
      v-html="
        sidebarContentNode.contentNode.properties['cd:formattedContent']?.value
      "
    />
  </div>
</template>

<script setup lang="ts">
import { ContentNodeResponse } from "~~/../types/ContentNode/ContentNode";

const config = useRuntimeConfig();
const { dpsCmsTheme } = useAppConfig();

const { data: sidebarContentNode } = await useFetch<ContentNodeResponse>(
  `/api/v1/web-content/${dpsCmsTheme.pageBlocksApiLocations.sidebar}`,
  {
    baseURL: config.public.apiBase,
  }
);
</script>

<style scoped></style>
