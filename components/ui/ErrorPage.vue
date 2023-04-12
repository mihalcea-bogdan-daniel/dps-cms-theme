<template>
  <div>{{ statusCode }}</div>
</template>

<script setup lang="ts">
interface ErrorPageProps {
  statusCode: number;
}
const props = defineProps<ErrorPageProps>();
</script>

<style scoped></style>
