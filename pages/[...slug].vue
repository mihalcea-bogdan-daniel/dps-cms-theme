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
          !pending && contentNode && contentNode.properties['cd:title']?.string
        "
        class="absolute z-10 title"
      >
        {{ contentNode.properties["cd:title"].string }}
      </h1>
      <h1 v-else class="z-10 absolute title">{{ contentNode?.webName }}</h1>
    </template>
    <!-- End featured image slot -->
    <!-- Default slot -->
    <template v-slot="{ contentNode, pending }">
      <div v-if="!pending && contentNode">
        <!-- Formatted content -->
        <div
          v-if="contentNode.properties['cd:formattedContent'].string"
          v-html="
            contentNode && contentNode.properties['cd:formattedContent'].string
          "
        ></div>
        <div v-if="contentNode.primaryType == 'cd:gallery'" class="mb-2">
          <SharedGallery
            :galleryNode="contentNode"
            displayAs="grid"
          ></SharedGallery>
        </div>
        <!-- End Formatted content -->
        <!-- Children list -->
        <div
          v-if="contentNode.children && contentNode.primaryType != 'cd:gallery'"
        >
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
                        childNode.properties["cd:title"]?.string ||
                        childNode.webName
                      }}</NuxtLink
                    >
                  </div>
                </template>
                <template #sub-title>
                  <div class="">
                    {{ childNode.properties["jcr:createdBy"]?.string }}
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
                v-if="childNode.primaryType == 'pa:file'"
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
                      :to="`${
                        config.public.apiBase
                      }/api/v1/web/get-file/${stripWebFromUrl(childNode.path)}`"
                      >{{
                        childNode.properties["cd:title"]?.string ||
                        childNode.webName
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
        </div>
        <!-- End Children list -->
      </div>
      <div v-else>
        <div class="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-black-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
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
    <template #sidebar>
      <div v-if="parentNode && !pendingSidebar && parentNode.contentNode">
        <h2 class="small title">{{ t("view.sidebar.relatedContent") }}</h2>
        <template
          v-for="relatedContent in parentNode.contentNode.children"
          :key="relatedContent.id"
        >
          <div
            v-if="
              relatedContent.properties['cd:title'] &&
              relatedContent.primaryType != 'cd:section' &&
              relatedContent.primaryType != 'pa:resource'
            "
          >
            <NuxtLink class="cms-link" :to="relatedContent.path">
              <h4 class="small text-inherit">
                {{ relatedContent.properties["cd:title"]?.string }}
              </h4>
            </NuxtLink>
          </div>
        </template>
      </div>
    </template>

  </NuxtLayout>
</template>
<script setup lang="ts">
import {
  ContentNode,
  ContentNodeResponse,
} from "../types/ContentNode/ContentNode";
import { stripWebFromUrl, mimeTypeIcon } from "../utils/contentNodeUtils";
const { t } = useI18n();
const config = useRuntimeConfig();
const route = useRoute();

const { data: parentNode, pending: pendingSidebar } =
  await useFetch<ContentNodeResponse>(
    `/api/v1${route.path.split("/").slice(0, -1).join("/")}`,
    { baseURL: config.public.apiBase}
  );

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
