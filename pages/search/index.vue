<template>
  <NuxtLayout :featuredImage="false" :sidebar="false">
    <template #hero>
      <!-- Not found -->
      <template v-if="data?.items && !(data?.items.length > 0)">
        <h2 class="small col-span-12 text-center my-12">Nu au fost gasite rezultate</h2>
      </template>
      <!-- If found -->
      <template v-if="data?.items">
        <div class="flex flex-col gap-2 col-span-12">
          <template v-for="childNode in data.items">
            <!-- ContentTypes -->
            <UiCard
              v-if="childNode.primaryType == 'cd:content'"
              icon="fa-folder"
              :key="childNode.id"
              noTitleSeparator
            >
              <template #header>
                <i class="fa fa-folder text-primary text-xl p-3 pr-0"></i>
              </template>
              <template #title>
                <div class="flex gap-2 items-center">
                  <NuxtLink
                    class="text-primary hover:text-primary-100"
                    :to="childNode.path"
                    >{{
                      childNode.properties["cd:title"]?.string || childNode.webName
                    }}</NuxtLink
                  >
                </div>
              </template>
              <template #sub-title>
                <div class="flex gap-2 items-center">
                  {{ t("view.lastPublishedDate") }}:
                  <div>
                    {{ d(childNode.properties["cd:publishingDate"]?.date) }}
                  </div>
                </div>
              </template>
              <template #body>
                <div class="">
                  {{ childNode.properties["cd:description"]?.string }}
                </div>
              </template>
            </UiCard>
            <!--End ContentTypes -->
            <!--FileTypes -->
            <UiCard
              v-if="childNode.primaryType == 'cd:file'"
              :key="childNode.id"
              noTitleSeparator
            >
              <template #header>
                <i
                  class="fa text-primary text-xl p-3 pr-0"
                  :class="mimeTypeIcon(childNode.mimeType)"
                ></i>
              </template>
              <template #title>
                <div class="flex gap-2 items-center">
                  <NuxtLink
                    class="text-primary hover:text-primary-100"
                    :to="`${config.public.apiBase}/api/v1/web/get-file/${stripWebFromUrl(
                      childNode.path
                    )}`"
                    >{{
                      childNode.properties["cd:title"]?.string || childNode.webName
                    }}</NuxtLink
                  >
                </div>
              </template>
              <template #sub-title>
                <div class="p-2">
                  {{ childNode.properties["jcr:createdBy"]?.string }}
                </div>
              </template>
              <template #body>
                <div class="p-2">
                  {{ childNode.properties["cd:description"]?.string }}
                </div>
              </template>
            </UiCard>
            <!-- End FileTypes -->
            <!-- Gallery type -->
            <SharedGallery
              v-if="childNode.primaryType == 'cd:gallery'"
              :galleryNode="childNode"
              :key="childNode.id"
              displayAs="card"
            ></SharedGallery>
            <!-- End Gallery type -->
          </template>
        </div>
      </template>
      <!-- End If found -->
    </template>
    <template #pagination>
      <template v-if="data && !error">
        <UiPagination :totalPages="data.totalPages"></UiPagination>
      </template>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ContentNodeResponse } from "~~/../types/ContentNode/ContentNode";

const route = useRoute();
const config = useRuntimeConfig();
const { d, t } = useI18n();
const { data, pending, error } = await useFetch<ContentNodeResponse>(
  `/api/v1/web/search`,
  {
    baseURL: config.public.apiBase,
    query: { text: route.query.text },
  }
);

//Disable caching on the search results
//@ts-ignore -- this modules is imported in the core project
useRouteCache((helper) => {
  helper.setUncacheable();
});
</script>

<style scoped></style>
