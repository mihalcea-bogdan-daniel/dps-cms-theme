<template>
  <h2>{{ contentNode.properties["cd:title"].value }}</h2>
  <div v-html="contentNode.properties['cd:description'].value"></div>
  <div class="w-full border-bottom-1 mb-4 border-primary-600"></div>
  <div class="flex flex-column gap-1">
    <UiChildNode
      v-for="ch in contentNode.children"
      :key="ch.id"
      :childNode="ch"
    ></UiChildNode>
  </div>
  <!-- <pre>{{ contentNode }}</pre> -->
</template>

<script setup lang="ts">
import { ContentNode } from "../types/ContentNode/ContentNode";

interface ThemeCoreProps {
  contentNode: ContentNode;
}
defineProps<ThemeCoreProps>();
</script>

<style scoped></style>
