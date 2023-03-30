<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="grid grid-nogutter">
    <div
      v-if="menuNode"
      class="col-3 hidden sm:block"
      v-html="menuNode.properties['cd:formattedContent']?.value"
    />
    <div
      v-if="contentNode"
      class="col-9 sm:col-9"
      v-html="contentNode.properties['cd:formattedContent']?.value"
    />
    <div
      v-if="copyrightNode"
      class="col-12 sm:col-12"
      v-html="copyrightNode.properties['cd:formattedContent']?.value"
    />
  </div>
</template>

<script setup lang="ts">
import {
  ContentNode,
  ContentNodeResponse,
} from "../../types/ContentNode/ContentNode";
const config = useRuntimeConfig();
const { dpsCmsTheme } = useAppConfig();

const { data: footerContentNode } = await useFetch<ContentNodeResponse>(
  `/api/v1/web-content/${dpsCmsTheme.pageBlocksApiLocations.footer}`,
  {
    baseURL: config.public.apiBase,
  }
);

const contentNode: Ref<ContentNode | undefined> = ref();
const copyrightNode: Ref<ContentNode | undefined> = ref();
const menuNode: Ref<ContentNode | undefined> = ref();
if (footerContentNode.value) {
  contentNode.value = footerContentNode.value?.items.find(
    (ch) => ch.name === "pa:content"
  );
  copyrightNode.value = footerContentNode.value?.items.find(
    (ch) => ch.name === "pa:copyright"
  );
  menuNode.value = footerContentNode.value?.items.find(
    (ch) => ch.name === "pa:footer-menu"
  );
}
</script>

<style scoped></style>
