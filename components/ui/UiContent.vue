<template>
  <div v-if="htmlContent" v-html="htmlContent"></div>
  <div v-else><slot></slot></div>
</template>

<script setup lang="ts">
interface UiContentProps {
  id: string;
  htmlContent?: string;
}
const props = defineProps<UiContentProps>();
</script>

<style scoped></style>
