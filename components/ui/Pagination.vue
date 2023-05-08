<template>
  <div class="flex gap-4 justify-center my-3 items-center" v-if="totalPages && totalPages > 1">
    <button type="button" v-if="prevButtonEnabled">
      <i class="fa fa-chevron-left text-sm"></i>
    </button>
    <NuxtLink
      prefetch
      v-for="page in totalPages"
      :to="{ path: $route.path, query: { page: page - 1, ...queryWithoutPage } }"
      :key="$route.path + $route.query.page"
      class="page-item"
      :class="{
        'active-page-item':
          $route.query.page == String(page - 1) ||
          (!$route.query.page && page - 1 == 0),
      }"
      >{{ page }}</NuxtLink
    >
    <button type="button">
      <i class="fa fa-chevron-right text-sm"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
interface PaginationProps {
  goToPageNumber?: (page: number) => void;
  totalPages?: number;
}
const props = defineProps<PaginationProps>();
const prevButtonEnabled = computed(() => {
  if (!route.query.page) return false;
  if (route.query.page == "0") return false;
  return true;
});
const queryWithoutPage = computed(() => {
  const { page, ...rest } = route.query;
  return { ...rest };
});
</script>

<style scoped lang="scss">
.page-item {
  @apply text-primary-black;
  &.active-page-item {
    @apply text-primary-blue font-bold;
  }
}
</style>
