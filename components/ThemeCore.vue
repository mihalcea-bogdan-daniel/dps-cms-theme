<template>
  <h2>{{ contentNode.properties["cd:title"].value }}</h2>
  <div v-html="descriptionHtmlContent"></div>
  <div class="w-full border-bottom-1 mb-4 border-primary-600"></div>
  <div class="flex flex-column gap-1">
    <UiChildNode
      v-for="ch in childContent"
      :key="ch.originalNode.id"
      :childNode="ch.originalNode"
    ></UiChildNode>
  </div>
  <!-- <pre>{{ contentNode }}</pre> -->
</template>

<script setup lang="ts">
import { ContentNode } from "../types/ContentNode/ContentNode";

interface ThemeCoreProps {
  contentNode: ContentNode;
}
const props = defineProps<ThemeCoreProps>();

provide("currentContentNode", props.contentNode);

const descriptionHtmlContent = computed(() => {
  if (props.contentNode.primaryType === "cd:content") {
    return props.contentNode.properties["cd:description"].value;
  } else if (props.contentNode.primaryType === "cd:contentModule") {
    return props.contentNode.properties["cd:formattedContent"]?.value;
  } else return "";
});
const childContent = computed(() => {
  if (props.contentNode.hasChildren && props.contentNode.children) {
    return props.contentNode.children.map((ch) => {
      return { type: ch.primaryType, originalNode: ch };
    });
  } else {
    return [];
  }
});
</script>

<style scoped></style>
