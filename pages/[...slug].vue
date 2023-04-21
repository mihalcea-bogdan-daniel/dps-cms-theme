<!-- eslint-disable vue/no-v-html -->
<template>
  <NuxtLayout>
    <template v-slot="{ contentNode, pending }">
      <div v-if="contentNode.contentNode && !pending" class="col-9">
        <ThemeCore :contentNode="contentNode.contentNode"></ThemeCore>
      </div>
      <div v-else>
        <div>Loading resources</div>
      </div>
    </template>
  </NuxtLayout>
</template>
<script setup lang="ts">
</script>

<style scoped></style>
