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
      <h1 v-else class="z-10 absolute title">{{ contentNode?.webName }}</h1>
    </template>
    <!-- End featured image slot -->
    <!-- Default slot -->
    <template v-slot="{ contentNode, pending }">
      <div v-if="!pending && contentNode">
        <!-- Formatted content -->
        <div
          v-if="contentNode.properties['cd:formattedContent']"
          v-html="
            contentNode && contentNode.properties['cd:formattedContent'].value
          "
        ></div>
        <div v-if="contentNode.primaryType == 'cd:gallery'" class="mb-2">
          <SharedGallery :galleryNode="contentNode" displayAs="grid"></SharedGallery>
        </div>
        <!-- End Formatted content -->
        <!-- Children list -->
        <div v-if="contentNode.children && contentNode.primaryType != 'cd:gallery'">
          <div class="flex flex-col gap-2">
            <template v-for="childNode in contentNode.children">
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
                        childNode.properties["cd:title"]?.value ||
                        childNode.webName
                      }}</NuxtLink
                    >
                  </div>
                </template>
                <template #sub-title>
                  <div class="">
                    {{ childNode.properties["jcr:createdBy"]?.value }}
                  </div>
                </template>
                <template #body>
                  <div class="">
                    {{ childNode.properties["cd:description"]?.value }}
                  </div>
                </template>
              </UiCard>
              <!--End ContentTypes -->
              <!--FileTypes -->
              <UiCard
                v-if="childNode.primaryType == 'pa:file'"
                icon="fa-folder"
                :key="childNode.id"
                noTitleSeparator
              >
                <template #header>
                  <i class="fa fa-file text-primary text-xl p-3 pr-0"></i>
                </template>
                <template #title>
                  <div class="flex gap-2 items-center">
                    <NuxtLink
                      class="text-primary hover:text-primary-100"
                      :to="childNode.path"
                      >{{
                        childNode.properties["cd:title"]?.value ||
                        childNode.webName
                      }}</NuxtLink
                    >
                  </div>
                </template>
                <template #sub-title>
                  <div class="p-2">
                    {{ childNode.properties["jcr:createdBy"]?.value }}
                  </div>
                </template>
                <template #body>
                  <div class="p-2">
                    {{ childNode.properties["cd:description"]?.value }}
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
        </div>
        <!-- End Children list -->
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
