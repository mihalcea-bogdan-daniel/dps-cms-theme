<template>
  <div
    class="cms-card relative"
    :class="[
      horizontal ? 'cms-card-horizontal' : '',
      noBackground ? 'bg-none border-none' : 'bg-white drop-shadow-md',
    ]"
  >
    <slot v-if="!hideHeader" name="header"> </slot>

    <div class="flex flex-col p-3">
      <div class="flex flex-col flex-1">
        <div
          v-if="hasTitle"
          class="cms-card-title"
          :class="{ 'cms-card-title-separator': titleSeparatorClasses }"
        >
          <slot name="title"></slot>

          <div v-if="hasSubTitle" class="text-sm mt-1 text-gray-400">
            <slot name="sub-title"></slot>
          </div>
        </div>
        <div class="cms-card-body">
          <slot name="body">
            <!-- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores
            veritatis quia illum qui molestiae exercitationem velit ut quo
            autem, magni sit, quod rem. Molestiae, vel neque sapiente libero
            tempora repudiandae. -->
          </slot>
        </div>
      </div>
      <div
        class="cms-card-footer"
        v-if="!hideFooter && articleLink != undefined"
      >
        <slot name="footer">
          <NuxtLink :to="articleLink" class="cms-button">{{
            t("view.moreInformation")
          }}</NuxtLink>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

interface CardProps {
  title?: string;
  hideTitle?: boolean;
  hideBody?: boolean;
  hideFooter?: boolean;
  hideHeader?: boolean;
  noBackground?: boolean;
  horizontal?: boolean;
  noTitleSeparator?: boolean;
  imgUrl?: string;
  size?: string;
  articleLink?: string;
}
const props = defineProps<CardProps>();
const titleSeparatorClasses = computed(() => {
  if (props.horizontal) return false;
  if (props.noBackground) return false;
  if (props.noTitleSeparator) return false;
  return true;
});
const slots = useSlots();
const hasTitle = computed(() => {
  return slots.title != undefined;
});
const hasSubTitle = computed(() => {
  return slots["sub-title"] != undefined;
});
</script>

<style scoped></style>
