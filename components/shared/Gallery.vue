<template>
  <template v-if="!displayAs">
    <Flicking
      :options="{ align: 'prev', circular: true, autoInit: true }"
      :plugins="plugins"
      :key="`gallery-${$.uid}`"
      :class="$attrs.class"
      hideBeforeInit
    >
      <div
        v-for="(image, index) in childImageNodeLinks"
        :key="image"
        @click="clickPanel"
        class="mx-1 my-auto"
      >
        <img :src="image" draggable="false" :width="`${previewImageWidth}`" class="rounded aspect-square object-cover object-center hover:brightness-200 transition-all duration-200" />
      </div>
      <template #viewport>
        <!-- <span class="flicking-arrow-prev"></span> -->
        <!-- <span class="flicking-arrow-next"></span> -->
        <!-- <i class="cms-prev-image fa fa-chevron-left"></i> -->
        <div class="flicking-pagination"></div>
      </template>
    </Flicking>
  </template>
  <div
    v-else-if="displayAs == 'grid'"
    class="grid grid-cols-2 sm:grid-cols-6 gap-2"
  >
    <template v-for="(image) in childImageNodeLinks">
      <div
        class="pb-full rounded-md cursor-pointer"
        @click="maskVisible = true"
      >
        <img :src="image" draggable="false" width="200" class="rounded object-cover aspect-square" />
      </div>
    </template>
  </div>
  <div v-else-if="displayAs == 'card'">
    <UiCard noTitleSeparator>
      <template
        v-if="childImageNodeLinks && childImageNodeLinks.length > 0"
        #header
      >
        <img
          :src="childImageNodeLinks[0]"
          draggable="false"
          width="200"
          height="200"
          class="max-h-48 max-w-48 object-cover object-center"
        />
      </template>
      <template #body>
        <div
          class="flex items-start h-full flex-1 my-auto flex-col justify-center"
        >
          <NuxtLink
            class="text-xl text-primary hover:text-primary-100"
            :to="galleryNode.path"
            >{{ galleryNode.webName }}</NuxtLink
          >
          <div class="flex gap-2 items-center">
            <div class="text-sm mt-1 text-gray-400">
              {{ galleryNode.children.length + " " + t("view.images") }}
            </div>
            <i class="fa fa-circle text-[5px] text-gray-400"></i>
            <div class="text-sm mt-1 text-gray-400">
              {{ d(galleryNode.properties["jcr:created"].value) }}
            </div>
          </div>
        </div>
      </template>
    </UiCard>
  </div>
  <Portal appendTo="body">
    <div
      v-if="maskVisible"
      class="fixed w-full h-full max-h-screen top-0 left-0 backdrop-blur bg-black bg-opacity-50 z-[60] flex flex-col items-center justify-center"
      @click="maskVisible = false"
    >
      <div class="relative w-full">
        <Flicking
          class="full-screen-gallery relative"
          :key="`gallery-full-screen-${$.uid}`"
          :options="{
            defaultIndex: 0,
            align: 'center',
            circular: true,
            autoInit: true,
            autoResize: true,
            useResizeObserver: true,
          }"
          :plugins="pluginsFulLScreen"
          @ready="
            (e) => {
              e.currentTarget.resize();
            }
          "
        >
          <div
            v-for="(image, index) in childImageNodeLinks"
            :key="`${image}-full-screen`"
            class="p-2 my-auto max-h-screen"
            @click.stop
          >
            <img :src="image" class="h-auto aspect-square" draggable="false" width="800" />
          </div>
          <template #viewport>
            <span
              @click.stop
              class="fa fa-thin fa-arrow-left text-white gallery-prev-arrow absolute bottom-1/2 left-0 translate-y-1/2 text-[3em] p-6 hover:bg-white hover:bg-opacity-20 cursor-pointer z-[70]"
            ></span>
            <span
              @click.stop
              class="fa fa-thin fa-arrow-right text-white gallery-next-arrow absolute bottom-1/2 right-0 translate-y-1/2 text-[3em] p-6 hover:bg-white hover:bg-opacity-20 cursor-pointer z-[70]"
            ></span>
            <!-- <i class="cms-prev-image fa fa-chevron-left"></i> -->
            <div
              @click.stop
              class="flicking-pagination-full-screen absolute"
            ></div>
          </template>
        </Flicking>
      </div>
    </div>
  </Portal>
</template>

<script setup lang="ts">
import Portal from "primevue/portal";

import Flicking, {
  ChangedEvent,
  FlickingEvents,
  ReadyEvent,
} from "@egjs/vue3-flicking";
import { Arrow, Pagination } from "@egjs/flicking-plugins";
import { ContentNode } from "~~/../types/ContentNode/ContentNode";

const config = useRuntimeConfig();
const { d, t } = useI18n();
type DisplayVariants = "card" | "grid";
interface GalleryProps {
  galleryNode: ContentNode;
  displayAs?: DisplayVariants;
  previewImageWidth?: number
}
const props = withDefaults(defineProps<GalleryProps>(), {previewImageWidth: 400});
console.log(props.galleryNode);

const maskVisible = ref(false);
const clickPanel = (e: Event) => {
  maskVisible.value = true;
};
const renderBullet = (className: string) => {
  return `<i class="fa fa-circle text-white ${className}"></i>`;
};

const renderActiveBullet = (className: string) => {
  return `<i class="fa-duotone fa-circle-dot  ${className}" style="--fa-primary-color: #2e70ea; --fa-secondary-color: #ffffff; --fa-secondary-opacity: 1;"></i>`;
};
const plugins = [
  // new Arrow(),
  new Pagination({
    type: "bullet",
    renderBullet: renderBullet,
    renderActiveBullet: renderActiveBullet,
  }),
];
const pluginsFulLScreen = [
  // new Arrow(),
  new Pagination({
    type: "bullet",
    classPrefix: "full-screen",
    selector: ".flicking-pagination-full-screen",
    renderBullet: renderBullet,
    renderActiveBullet: renderActiveBullet,
  }),
  new Arrow({
    prevElSelector: ".gallery-prev-arrow",
    nextElSelector: ".gallery-next-arrow",
  }),
];

const childImageNodeLinks: ComputedRef<string[] | undefined> = computed(() => {
  const linkArray: string[] = [];
  if (props.galleryNode && props.galleryNode.children) {
    props.galleryNode.children.forEach((imageNode) => {
      if (imageNode) {
        const imageNodePathArray = imageNode.path.split("/");
        imageNodePathArray.splice(0, 2);
        linkArray.push(
          `${
            config.public.apiBase
          }/api/v1/web/get-file/${imageNodePathArray.join("/")}`
        );
      }
    });
    return linkArray;
  } else {
    return undefined;
  }
});
</script>

<style scoped lang="scss">
.flicking-pagination-full-screen {
  position: absolute;
}
.full-screen-bullets {
  position: absolute;
  bottom: 3rem;
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
