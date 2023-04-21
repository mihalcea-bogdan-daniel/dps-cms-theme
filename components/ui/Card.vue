<template>
  <div class="cms-card" :class="horizontal ? 'cms-card-horizontal' : ''">
    <div>
      <slot name="feature-img"></slot>
    </div>
    <div class="cms-card-title">
      <slot name="title"> Titlul card </slot>
    </div>
    <div class="cms-card-body">
      <slot name="body"> Continut card </slot>
    </div>
    <div class="cms-card-footer">
      <slot name="footer" v-if="!hideFooter">
        <button type="button" class="cms-button"> Hello button</button>
      </slot>
    </div>

  </div>
</template>

<script setup lang="ts">
interface CardProps {
  title?: string;
  hideTitle?: boolean;
  hideBody?:boolean;
  hideFooter?:boolean;
  titleLink?: string;
  noBackground?: boolean;
  horizontal?: boolean;
}
defineProps<CardProps>();
</script>

<style scoped></style>
