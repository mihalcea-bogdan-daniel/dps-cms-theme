<!-- eslint-disable vue/no-v-html -->
<template>
  <NuxtLayout>
    <template v-slot="{ contentNode, pending }">
      <div v-if="!pending && contentNode" class="col-9">
        <ThemeCore :contentNode="contentNode.contentNode">

        </ThemeCore>
      </div>
      <div v-else>
        <div class="animation-spin">
        <i class="fa fa-loader"></i>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>
<script setup lang="ts">
</script>

<style scoped></style>
