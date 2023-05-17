<template>
  <div
    class="flex justify-center my-3 items-center"
    v-if="totalPages && totalPages > 1"
  >
    <button
      type="button"
      class="border-2 border-black-400 rounded-l w-24 -m-[1px]"
      :disabled="!prevButtonEnabled"
    >
      {{ t("view.pagination.prev") }}
    </button>
    <NuxtLink
      prefetch
      v-for="page in generatePagination(
        totalPages,
        Number.parseInt(String($route.query.page || 0))
      )"
      :to="{
        path: $route.path,
        query: { page: page, ...queryWithoutPage },
      }"
      :key="$route.path + $route.query.page"
      class="page-item"
      :class="{
        'active-page-item':
          $route.query.page == String(page) ||
          (!$route.query.page && page - 1 == 0),
      }"
      >{{ page + 1 }}</NuxtLink
    >

    <button
      type="button"
      class="border-2 border-black-400 rounded-r -m-[1px] w-24"
    >
      {{ t("view.pagination.next") }}
    </button>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { t } = useI18n();
interface PaginationProps {
  goToPageNumber?: (page: number) => void;
  totalPages: number;
}
const props = defineProps<PaginationProps>();
const currentPage = route.query.page
  ? Number.parseInt(route.query.page as string)
  : undefined;

const prevButtonEnabled = computed(() => {
  if (!route.query.page) return false;
  if (route.query.page == "0") return false;
  return true;
});
const queryWithoutPage = computed(() => {
  const { page, ...rest } = route.query;
  return { ...rest };
});

function generatePagination(totalPages: number, currentPage: number) {
  const pageRange = 2; // Number of pages to display before and after the current page

  let startPage = Math.max(0, currentPage - pageRange);
  let endPage = Math.min(totalPages, currentPage + pageRange);

  if (currentPage - startPage < pageRange) {
    endPage = Math.min(
      endPage + pageRange - (currentPage - startPage),
      totalPages
    );
  }

  if (endPage - currentPage < pageRange) {
    startPage = Math.max(startPage - (pageRange - (endPage - currentPage)), 1);
  }

  let paginationLinks = [];

  // Generate links for each page
  for (let page = startPage; page <= endPage; page++) {
    paginationLinks.push(page);
  }

  return paginationLinks;
}
console.log(generatePagination(12, 1));
</script>

<style scoped lang="scss">
.page-item {
  @apply text-black border-2 border-black-400 w-7 text-center;
  margin: -1px;
  &.active-page-item {
    @apply text-white font-bold bg-primary border-y-primary;
  }
}
</style>
