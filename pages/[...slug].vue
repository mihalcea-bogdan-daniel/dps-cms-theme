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
// const categoryChildren = computed(() => {
//   if (contentNode.value) {
//     return contentNode.value.contentNode.children?.filter((child) => child.primaryType === "cd:content");
//   } else {
//     return [];
//   }
// });
// const articleChildren = computed(() => {
//   if (contentNode.value) {
//     return contentNode.value.contentNode.children?.filter((child) => child.primaryType === "cd:contentModule");
//   } else {
//     return [];
//   }
// });
// const fileChildren = computed(() => {
//   if (contentNode.value) {
//     return contentNode.value.contentNode.children?.filter((child) => child.primaryType === "pa:file");
//   } else {
//     return [];
//   }
// });
</script>

<style scoped></style>
