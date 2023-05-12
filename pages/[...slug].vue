<template>
  <NuxtLayout>
    <!-- featured image slot -->
    <template #featured-image="{ contentNode, pending }">
      <div
        v-if="featuredImageNode(contentNode)"
        :style="{
          background: `url('${featuredImageNode(contentNode)}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply',
          backgroundPosition: 'center center',
        }"
        style="-webkit-mask-image: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(255,255,255,0) 100%);
}"
        class="w-full container h-full relative flex items-center justify-center z-10 opacity-20"
      ></div>
      <h1
        v-if="
          !pending && contentNode && contentNode.properties['cd:title']?.value
        "
        class="absolute z-10 title"
      >
        {{ contentNode.properties["cd:title"].value }}
      </h1>
    </template>
    <!-- End featured image slot -->
    <!-- Default slot -->
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
                <i class="fa fa-folder text-primary text-xl"></i>
              </template>
              <template #title>
                <div class="flex gap-2 items-center">
                  <NuxtLink
                    class="text-primary hover:text-primary-100"
                    :to="category.path"
                    >{{
                      category.properties["cd:title"]?.value || category.webName
                    }}</NuxtLink
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

          <!-- <template #files="{ contentNodeFiles }">
            <UiCard
              icon="fa-file"
              v-for="file in contentNodeFiles"
              :key="file.id"
              noTitleSeparator
            >
              <template #header>
                <i class="fa fa-file text-primary text-xl"></i>
              </template>
              <template #title>
                <div class="flex gap-2 items-center">
                  <NuxtLink
                    noPrefetch
                    class="text-primary hover:text-primary-100"
                    :to="file.path"
                    >{{ file.webName }}</NuxtLink
                  >
                </div>
              </template>
              <template #sub-title>
                {{ file.properties["jcr:createdBy"]?.value }}
              </template>
            </UiCard>
          </template> -->
        </ThemeCore>
      </div>
      <div v-else>
        <div class="animation-spin">
          <i class="fa fa-loader"></i>
        </div>
      </div>
    </template>
    <!-- End Default slot -->
    <!-- Paginare -->
    <template #pagination="{ totalPages, goToPageNumber }">
      <UiPagination
        :totalPages="totalPages"
        :goToPageNumber="goToPageNumber"
      ></UiPagination>
    </template>
    <!-- End Paginare -->
  </NuxtLayout>
</template>
<script setup lang="ts">
import { ContentNode } from "../types/ContentNode/ContentNode";

const config = useRuntimeConfig();

const featuredImageNode = (contentNode: ContentNode) => {
  if (contentNode && contentNode.children) {
    const imageNode = contentNode.children.find((ch) => {
      return ch.webName.startsWith("thumbnail");
    });
    if (imageNode) {
      const imageNodePathArray = imageNode.path.split("/");
      imageNodePathArray.splice(0, 2);
      return `${
        config.public.apiBase
      }/api/v1/web/get-file/${imageNodePathArray.join("/")}`;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
</script>

<style scoped></style>
