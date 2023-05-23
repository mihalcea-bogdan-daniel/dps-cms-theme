<template>
  <div
    class="flex justify-center my-3 items-center"
    v-if="totalPages && totalPages > 1"
  >
    <NuxtLink
      class="border border-black-400 rounded-l w-24 -m-[1px] text-center text-black hover:text-black"
      :class="{ disabled: !prevButtonEnabled }"
      :to="{
        path: route.path,
        query: {
          page: String(currentPage ? currentPage - 1 : 0),
          ...queryWithoutPage,
        },
      }"
    >
      {{ t("view.pagination.prev") }}
    </NuxtLink>
    <NuxtLink
      prefetch
      v-for="page in generatePagination(
        totalPages,
        Number.parseInt(String($route.query.page)) || 0
      )"
      :to="{
        path: $route.path,
        query: { page: page - 1, ...queryWithoutPage },
      }"
      :key="$route.path + $route.query.page"
      class="page-item"
      :class="{
        'active-page-item':
          $route.query.page == String(page - 1) ||
          (!$route.query.page && page - 1 == 0),
      }"
      >{{ page }}</NuxtLink
    >

    <NuxtLink
      class="border border-black-400 rounded-r -m-[1px] w-24 text-black text-center hover:text-black"
      :class="{ disabled: nextButtonEnabled }"
      :to="{
        path: route.path,
        query: {
          page: String(currentPage ? currentPage + 1 : 1),
          ...queryWithoutPage,
        },
      }"
    >
      {{ t("view.pagination.next") }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
interface PaginationProps {
  goToPageNumber?: (page: number) => void;
  totalPages: number;
}
const props = defineProps<PaginationProps>();
const currentPage = route.query.page
  ? Number.parseInt(route.query.page as string)
  : undefined;

const queryWithoutPage = computed(() => {
  const { page, ...rest } = route.query;
  return { ...rest };
});
const prevButtonEnabled = computed(() => {
  if (!route.query.page) return false;
  if (route.query.page == "0") return false;
  return true;
});
const nextButtonEnabled = computed(() => {
  if (!route.query.page) return false;
  if (route.query.page == String(props.totalPages - 1)) return true;
  return false;
});

function generatePagination(totalPages: number, currentPage: number) {
  const pageRange = 2; // Number of pages to display before and after the current page

  let startPage = Math.max(1, currentPage - pageRange);
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
</script>

<style scoped lang="scss">
.page-item {
  @apply text-black border border-black-400 w-7 text-center;
  margin: -1px;
  &.disabled {
    @apply pointer-events-none text-black-300;
  }
  &.active-page-item {
    @apply text-white font-bold bg-primary border-y-primary;
  }
}
</style>
