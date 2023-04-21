<template>
  <NuxtLayout name="default">
    <div class="col-9 bg-green-100">Override route `Activitati` si `activitati-2`</div>
    <div class="col-9 bg-green-100">Preluat prin symlink</div>
    <template #sidebar>
      <div class="col-3 bg-yellow-200">Sidebar</div>
    </template>
    <template #footer>
      <div>Footer inlocuit</div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
