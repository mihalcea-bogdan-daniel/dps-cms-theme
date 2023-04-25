<template>
  <div v-if="contentNode.children && contentNode.children.length > 0">
    <h1 v-if="contentNode.properties['cd:title']">
      {{ contentNode.properties["cd:title"]?.value }}
    </h1>
    <div class="flex flex-column gap-1">
      <slot
        name="categories"
        :contentNodeCategories="contentNodeCategories"
      ></slot>
      <slot name="files" :contentNodeFiles="contentNodeFiles"></slot>
      <slot name="galleries" :contentNodeGaleries="contentNodeGaleries"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ContentNode } from "../types/ContentNode/ContentNode";
const { t } = useI18n();
interface ThemeCoreProps {
  contentNode: ContentNode;
}
const props = defineProps<ThemeCoreProps>();
const contentNodeCategories = computed(() => {
  if (props.contentNode) {
    return props.contentNode.children.filter((ch) => {
      return ch.primaryType == "cd:content";
    });
  } else {
    return [];
  }
});
const contentNodeFiles = computed(() => {
  if (props.contentNode) {
    return props.contentNode.children.filter((ch) => {
      return ch.primaryType == "pa:file" || ch.primaryType == "pa:resource";
    });
  } else {
    return [];
  }
});
const contentNodeGaleries = computed(() => {
  if (props.contentNode) {
    return props.contentNode.children.filter((ch) => {
      return ch.primaryType == "cd:gallery";
    });
  } else {
    return [];
  }
});
</script>

<style scoped></style>
