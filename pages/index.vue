<template>
  <div>
    <NuxtLayout name="default" :featuredImage="false">
      <template #hero="{contentNode, pending}">
        <div class="col-span-12 block">
        <!-- <pre>{{ contentNode }}</pre> -->
          <UiCard class="mb-4" horizontal>
            <template #header>
            </template>
            <template #body>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                officiis vel assumenda facilis quos delectus voluptatem,
                perspiciatis sapiente alias aut fugiat. Nostrum impedit facilis
                aliquam eveniet ullam magnam fuga temporibus.
              </div>
            </template>
          </UiCard>
        </div>
      </template>
      <input class="" placeholder="Text input" type="text" />
      <input class="" placeholder="Text input" type="number" />
      <input class="" placeholder="Text input" type="date" />
      <input class="" placeholder="Text input" type="email" />
      <div class="mb-4"></div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
//import "@egjs/flicking-plugins/dist/arrow.css";
//import "@egjs/flicking-plugins/dist/pagination.css";
import CMSImage from "../components/ui/CMSImage.vue";
import Flicking, { ChangedEvent, FlickingEvents, ReadyEvent } from "@egjs/vue3-flicking";
import { Arrow, Pagination } from "@egjs/flicking-plugins";

const flicking: Ref<Flicking | undefined> = ref();

const handlePanelChange = (e: ChangedEvent) => {
  console.log(e.currentTarget);

};
const flickingReady = (e: ReadyEvent) => {
  console.log(e.currentTarget.index);
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
