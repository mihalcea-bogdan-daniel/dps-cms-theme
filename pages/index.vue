<template>
  <div>
    <NuxtLayout name="default" :featuredImage="false">
      <template #hero="{ contentNode, pending }">
        <div class="col-span-12 block">
          <!-- <pre>{{ contentNode }}</pre> -->
          <UiCard class="mb-4" horizontal>
            <template #header v-if="galleryNode != undefined">
              <SharedGallery
                :galleryNode="galleryNode"
                class="w-full flex-1"
              ></SharedGallery>
            </template>
            <template
              #body
              v-if="
                heroContent && heroContent.properties['cd:formattedContent']
              "
            >
              <div :class="{ 'max-w-md': galleryNode != undefined }">
                <h1 class="title mb-4">
                  {{ heroContent.properties["cd:title"].value }}
                </h1>
                <div
                  v-html="heroContent.properties['cd:formattedContent'].value"
                ></div>
              </div>
            </template>
          </UiCard>
        </div>
      </template>
      <div class="mb-4"></div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import {
  ContentNode,
  ContentNodeResponse,
} from "../types/ContentNode/ContentNode";

const config = useRuntimeConfig();
const route = useRoute();
const { dpsCmsTheme } = useAppConfig();
const heroContent: Ref<ContentNode | undefined> = ref();
const homePageNode: Ref<ContentNode | undefined> = ref();
const galleryNode: Ref<ContentNode | undefined> = ref();

const { data, pending, error } = await useFetch<ContentNodeResponse>(
  `/api/v1/web/${dpsCmsTheme.pageBlocksApiLocations.homepage}`,
  {
    baseURL: config.public.apiBase,
    query: route.query,
  }
);
if (!error.value) {
  homePageNode.value = data.value?.contentNode;
  heroContent.value = homePageNode.value?.children.find((ch) => {
    return ch.webName == "hero-content";
  });
  galleryNode.value = heroContent.value?.children.find((ch) => {
    return ch.primaryType == "cd:gallery";
  });
}
</script>

<style scoped lang="scss">
.cms-prev-image {
  @apply absolute top-1/2 -translate-y-1/2 z-10 text-white text-[3em] p-3;
}
.flicking-pagination-bullets {
  position: absolute;
  bottom: 0;
  z-index: 10;
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 5px;
  padding: 16px;
  :deep(.flicking-pagination-bullet) {
    user-select: none;
    cursor: pointer;
  }
}
</style>
