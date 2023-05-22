<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="grid grid-cols-12 col-span-12">
    <div
      v-if="contentNode && contentNode.properties['cd:formattedContent']?.string"
      class="col-span-12 grid-cols-12 grid"
      v-html="contentNode.properties['cd:formattedContent']?.string"
    />
    <div
      v-if="
        copyrightNode && copyrightNode.properties['cd:formattedContent']?.string
      "
      class="col-span-12"
      v-html="copyrightNode.properties['cd:formattedContent']?.string"
    />
  </div>
  <div class="col-span-4"></div>
</template>

<script setup lang="ts">
import { ContentNode } from "~~/../types/ContentNode/ContentNode";

interface SharedFooterProps {
  footerContentNode?: ContentNode;
}
const props = defineProps<SharedFooterProps>();
const contentNode: Ref<ContentNode | undefined> = ref();
const copyrightNode: Ref<ContentNode | undefined> = ref();
if (props.footerContentNode) {
  contentNode.value = props.footerContentNode.items.find(
    (ch) => ch.name === "pa:content"
  );
  copyrightNode.value = props.footerContentNode.items.find(
    (ch) => ch.name === "pa:copyright"
  );
}
</script>

<style scoped></style>
