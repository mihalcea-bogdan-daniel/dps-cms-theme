<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="grid grid-cols-12 col-span-12">
    <div v-if="footerMenuNode" class="col-span-3 hidden sm:block" v-html="footerMenuNode.properties['cd:formattedContent']?.value" />
    <div v-if="contentNode" class="col-span-9 sm:col-9" v-html="contentNode.properties['cd:formattedContent']?.value" />
    <div v-if="copyrightNode" class="col-span-12 sm:col-12" v-html="copyrightNode.properties['cd:formattedContent']?.value" />
  </div>
</template>

<script setup lang="ts">
import { ContentNode } from "~~/../types/ContentNode/ContentNode";

interface SharedFooterProps {
  footerContentNode?: ContentNode;
}
const props = defineProps<SharedFooterProps>();
const contentNode: Ref<ContentNode | undefined> = ref();
const copyrightNode: Ref<ContentNode | undefined> = ref();
const footerMenuNode: Ref<ContentNode | undefined> = ref();
if (props.footerContentNode) {
  contentNode.value = props.footerContentNode.items.find(
    (ch) => ch.name === "pa:content"
  );
  copyrightNode.value = props.footerContentNode.items.find(
    (ch) => ch.name === "pa:copyright"
  );
  footerMenuNode.value = props.footerContentNode.items.find(
    (ch) => ch.name === "pa:footer-menu"
  );
}
</script>

<style scoped></style>
