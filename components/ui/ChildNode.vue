<template>
  <div
    class="flex gap-2 align-items-end border-1 border-round-md p-2 border-primary-100 justify-content-between"
  >
    <div class="flex flex-column">
      <div v-if="childNode.properties['cd:title']" class="text-lg mb-2">
        {{ childNode.properties["cd:title"].value }}
      </div>
      <div class="flex gap-1 font-italic">
        <span>{{ t("view.lastPublishedDate") }}</span>
        <span>{{
          d(childNode.properties["jcr:created"].value, { dateStyle: "long" })
        }}</span>
      </div>
    </div>
    <NuxtLink
      :to="childNode.path"
      class="nuxt-link-child-node p-button p-button-outlined"
      >{{ t("view.moreInformation") }}</NuxtLink
    >
  </div>
</template>

<script setup lang="ts">
import { ContentNode } from "../../types/ContentNode/ContentNode";

interface ChildNodeProps {
  childNode: ContentNode;
}
const props = defineProps<ChildNodeProps>();
const { t, d } = useI18n();

const childType = computed(() => {
  return props.childNode.primaryType;
});
</script>

<style scoped lang="scss">
a.nuxt-link-child-node {
  text-decoration: none;
}
</style>
