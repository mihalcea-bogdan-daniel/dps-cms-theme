<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="grid grid-nogutter">
    <div
      v-if="sidebarContentNode"
      class="col-12"
      v-html="
        sidebarContentNode.properties['cd:formattedContent']?.value
      "
    />
  </div>
</template>

<script setup lang="ts">
import { ContentNode } from "~~/../types/ContentNode/ContentNode";

interface SharedSidebarProps {
  sidebarContentNode?: ContentNode;
}
defineProps<SharedSidebarProps>();
</script>

<style scoped></style>
