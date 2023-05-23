<template>
  <div>
    <NuxtLayout name="default" :featuredImage="false" static>
      <template #hero>
        <div v-if="galleryNode" class="col-span-12 block">
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
                <!-- <h1 class="title mb-4">
                  {{ heroContent.properties["cd:title"].string }}
                </h1> -->
                <div
                  v-html="heroContent.properties['cd:formattedContent'].string"
                ></div>
              </div>
            </template>
          </UiCard>
        </div>
      </template>
      <div class="grid grid-cols-2 gap-6">
        <div class="col-span-1">
        <!-- Social -->
          <div name="social" class="mb-6">
            <h4 class="small text-primary bg-primary-50 p-1 rounded mb-2">
              <div class="flex items-center gap-3 ml-2">
                <i class="fa fa-people-roof"></i>
                Social
              </div>
            </h4>
            <ul class="list-disc ml-12">
              <li class="font-bold"><a href="#">Asistență socială</a></li>
              <li class="font-bold"><a href="#">Ajutoare încălzire locuință</a></li>
              <li class="font-bold"><a href="#">Tichete sociale grădiniță</a></li>
              <li class="font-bold"><a href="#">Informații despre alocații de stat</a></li>
              <li class="font-bold"><a href="#">Dosar de alocație pentru susținerea familiei</a></li>
              <li class="font-bold"><a href="#">Dosar de ajutor social</a></li>
            </ul>
          </div>
        <!-- End Social -->
        <!-- Constructii -->
          <div name="constructii" class="mb-6">
            <h4 class="small text-primary bg-primary-50 p-1 rounded mb-2">
              <div class="flex items-center gap-3 ml-2">
                <i class="fa fa-house"></i>
                Construcții, imobile, urbanism
              </div>
            </h4>
            <ul class="list-disc ml-12">
              <li class="font-bold"><a href="#">Dezvoltare urbană și Protejare monumente </a></li>
              <li class="font-bold"><a href="#">Construcții și urbanism</a></li>
              <li class="font-bold"><a href="#">Cadastru și Evidența  construcțiilor</a></li>
              <li class="font-bold"><a href="#">Reparații imobile</a></li>
              <li class="font-bold"><a href="#">Administrare și patrimoniu</a></li>
            </ul>
          </div>
        <!-- End Constructii -->
        </div>
        <div class="col-span-1">
        <!-- Persoane -->
        <div name="constructii" class="mb-6">
            <h4 class="small text-primary bg-primary-50 p-1 rounded mb-2">
              <div class="flex items-center gap-3 ml-2">
                <i class="fa fa-id-card"></i>
                Persoane
              </div>
            </h4>
            <ul class="list-disc ml-12">
              <li class="font-bold"><a href="#">Evidența persoanelor </a></li>
              <li class="font-bold"><a href="#">Stare civilă</a></li>
            </ul>
          </div>
        <!-- End Persoane -->
        <!-- Directia venituri -->
        <div name="venituri" class="mb-2">
            <h4 class="small text-primary bg-primary-50 p-1 rounded mb-2">
              <div class="flex items-center gap-3 ml-2">
                <i class="fa fa-id-card"></i>
                Direcția venituri
              </div>
            </h4>
            <ul class="list-disc ml-12">
              <li class="font-bold"><a href="#">Facilități </a></li>
              <li class="font-bold"><a href="#">Persoane juridice</a></li>
              <li class="font-bold"><a href="#">Persoane fizice</a></li>
            </ul>
          </div>
        <!-- End Directia venituri -->
        <!-- Taxe si impozite -->
        <div name="taxe" class="mb-6">
            <h4 class="small text-primary bg-primary-50 p-1 rounded mb-2">
              <div class="flex items-center gap-3 ml-2">
                <i class="fa fa-coins"></i>
                Taxe și impozite
              </div>
            </h4>
          </div>
        <!-- End Taxe si impozite -->
        <!-- Autorizatii -->
        <div name="taxe" class="mb-6">
            <h4 class="small text-primary bg-primary-50 p-1 rounded mb-2">
              <div class="flex items-center gap-3 ml-2">
                <i class="fa fa-file"></i>
                Autorizații
              </div>
            </h4>
          </div>
        <!-- End Autorizatii -->
        <!-- Directia agricola -->
        <div name="taxe" class="mb-6">
            <h4 class="small text-primary bg-primary-50 p-1 rounded mb-2">
              <div class="flex items-center gap-3 ml-2">
                <i class="fa fa-tractor"></i>
                Direcția agricolă
              </div>
            </h4>
          </div>
        <!-- End Directia agricola -->
        </div>
      </div>
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
const { locale } = useI18n();
const { dpsCmsTheme } = useAppConfig();
const heroContent: Ref<ContentNode | undefined> = ref();
const homePageNode: Ref<ContentNode | undefined> = ref();
const galleryNode: Ref<ContentNode | undefined> = ref();

const { data, pending, error } = await useFetch<ContentNodeResponse>(
  `/api/v1/web/${locale.value}/${dpsCmsTheme.pageBlocksApiLocations.homepage}`,
  {
    baseURL: config.public.apiBase,
    query: route.query,
  }
);

if (!error.value && data.value) {
  homePageNode.value = data.value.contentNode;
  if (homePageNode.value.children) {
    heroContent.value = homePageNode.value?.children.find((ch) => {
      return ch.webName == "hero-content";
    });
  }
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
