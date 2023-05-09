<template>
  <!-- default slot -->
  <slot>
    <div
      class="mb-2"
      v-if="hasFormattedContent"
      v-html="coumputedFormattedContent"
    ></div>
  </slot>
  <!-- End default slot -->
  <div
    v-if="
      contentNode && contentNode.children && contentNode.children.length > 0
    "
  >
    <div class="flex flex-col gap-2">
      <!-- Default slot is the formatted content -->
      <!-- End Default slot -->
      <slot
        name="categories"
        :contentNodeCategories="contentNodeCategories"
      ></slot>
      <!-- <slot name="files" :contentNodeFiles="contentNodeFiles"></slot> -->
      <slot name="galleries" :contentNodeGaleries="contentNodeGaleries"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ContentNode } from "../types/ContentNode/ContentNode";
const { t } = useI18n();
interface ThemeCoreProps {
  contentNode?: ContentNode;
}
const props = defineProps<ThemeCoreProps>();

const contentNodeCategories = computed(() => {
  if (props.contentNode) {
    return props.contentNode.children;
  } else {
    return [];
  }
});

// const contentNodeFiles = computed(() => {
//   if (props.contentNode) {
//     return props.contentNode.children.filter((ch) => {
//       return ch.primaryType == "pa:file" || ch.primaryType == "pa:resource";
//     });
//   } else {
//     return [];
//   }
// });

const contentNodeGaleries = computed(() => {
  if (props.contentNode) {
    return props.contentNode.children.filter((ch) => {
      return ch.primaryType == "cd:gallery";
    });
  } else {
    return [];
  }
});

const hasFormattedContent = computed(() => {
  if (
    props.contentNode !== undefined &&
    props.contentNode.properties["cd:formattedContent"] &&
    props.contentNode.properties["cd:formattedContent"].value != "" &&
    props.contentNode.properties["cd:formattedContent"].value != undefined
  ) {
    return true;
  } else {
    return false;
  }
});
const coumputedFormattedContent: ComputedRef<string> = computed(() => {
  if (hasFormattedContent) {
    return props.contentNode?.properties["cd:formattedContent"]
      ?.value as string;
  } else {
    return "";
  }
});
</script>

<style scoped></style>
