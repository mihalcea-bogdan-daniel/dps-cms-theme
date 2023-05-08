<!-- eslint-disable vue/no-v-html -->
<template>
  <NuxtLayout>
    <template v-slot="{ contentNode, pending }">
      <div v-if="!pending && contentNode" class="col-9">
        <ThemeCore :contentNode="contentNode">
          <template #categories="{ contentNodeCategories }">
            <UiCard
              icon="fa-folder"
              v-for="category in contentNodeCategories"
              :key="category.id"
              noTitleSeparator
            >
              <template #header>
                <i class="fa fa-folder text-primary-blue text-xl"></i>
              </template>
              <template #title>
                <div class="flex gap-2 items-center">
                  <NuxtLink
                    class="text-primary-blue hover:text-pastel-blue"
                    :to="category.path"
                    >{{ category.properties["cd:title"]?.value }}</NuxtLink
                  >
                </div>
              </template>
              <template #sub-title>
                {{ category.properties["jcr:createdBy"]?.value }}
              </template>
              <template #body>
                <div>{{ category.properties["cd:description"]?.value }}</div>
              </template>
            </UiCard>
          </template>

          <template #files="{ contentNodeFiles }">
            <UiCard
              icon="fa-file"
              v-for="file in contentNodeFiles"
              :key="file.id"
              noTitleSeparator
            >
              <template #header>
                <i class="fa fa-file text-primary-blue text-xl"></i>
              </template>
              <template #title>
                <div class="flex gap-2 items-center">
                  <NuxtLink
                    noPrefetch
                    class="text-primary-blue hover:text-pastel-blue"
                    :to="file.path"
                    >{{ file.webName }}</NuxtLink
                  >
                </div>
              </template>
              <template #sub-title>
                {{ file.properties["jcr:createdBy"]?.value }}
              </template>
            </UiCard>
          </template>
        </ThemeCore>
      </div>
      <div v-else>
        <div class="animation-spin">
          <i class="fa fa-loader"></i>
        </div>
      </div>
    </template>
    <!-- Paginare -->
    <template #pagination="{ totalPages, goToPageNumber }">
      <UiPagination :totalPages="totalPages" :goToPageNumber="goToPageNumber"></UiPagination>
    </template>
    <!-- Paginare end -->
  </NuxtLayout>
</template>
<script setup lang="ts"></script>

<style scoped></style>
