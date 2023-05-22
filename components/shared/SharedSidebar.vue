<!-- eslint-disable vue/no-v-html -->
<template>
  <div
  class="col-span-12"
    v-if="sidebarContentNode && sidebarContentNode.properties['cd:formattedContent']?.string"
    v-html="sidebarContentNode.properties['cd:formattedContent']?.string"
  />
</template>

<script setup lang="ts">
import { ContentNode } from "~~/../types/ContentNode/ContentNode";

interface SharedSidebarProps {
  sidebarContentNode?: ContentNode;
}
defineProps<SharedSidebarProps>();
</script>

<style scoped></style>
