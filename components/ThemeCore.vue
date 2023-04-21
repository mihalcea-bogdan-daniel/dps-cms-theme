<template>
  <UiCard>
    <template #title>
      <h2 class="p-0">{{ contentNode.properties["cd:title"]?.value }}</h2>
    </template>
    <template #body>
      <div v-html="contentNode.properties['cd:description'].value"></div>
    </template>
    <template #footer>
      <NuxtLink class="cms-button" :href="contentNode.path"> {{ t("view.moreInformation") }} </NuxtLink>
    </template>
  </UiCard>
  <div v-html="contentNode.properties['cd:description'].value"></div>

  <div class="flex flex-column gap-1">
    <UiChildNode
      v-for="ch in contentNode.children"
      :key="ch.id"
      :childNode="ch"
    ></UiChildNode>
    <template name="article"></template>
    <template name="category"></template>
    <template name="files"></template>
    <template name="gallery"></template>
  </div>
  <!-- <pre>{{ contentNode }}</pre> -->
</template>

<script setup lang="ts">
import { ContentNode } from "../types/ContentNode/ContentNode";
const { t } = useI18n();
interface ThemeCoreProps {
  contentNode: ContentNode;
}
defineProps<ThemeCoreProps>();
</script>

<style scoped></style>
