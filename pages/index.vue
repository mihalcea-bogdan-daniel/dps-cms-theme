<template>
  <div>
    <NuxtLayout name="default">
      <div class="col-span-9">
        <UiCard></UiCard>
        <input class="" placeholder="Text input" type="text" />
        <input class="" placeholder="Text input" type="number" />
        <input class="" placeholder="Text input" type="date" />
        <input class="" placeholder="Text input" type="email" />

        <Flicking
          :options="{ align: 'center', circular: true }"
          :plugins="plugins"
        >
          <div class="panel" :key="1">
            <Image
              indicatorIcon="fa fa-magnifying-glass text-slate-100"
              src="https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg"
              preview
              width="400"
            ></Image>
          </div>
          <div class="panel" :key="2">
            <Image
              indicatorIcon="fa fa-magnifying-glass text-slate-100"
              src="https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg"
              preview
              width="400"
            ></Image>
          </div>
          <div class="panel" :key="3">
            <Image
              indicatorIcon="fa fa-magnifying-glass text-slate-100"
              src="https://primefaces.org/cdn/primevue/images/galleria/galleria3.jpg"
              preview
              width="400"
            ></Image>
          </div>
          <div class="panel" :key="4">
            <Image
              indicatorIcon="fa fa-magnifying-glass text-slate-100"
              src="https://primefaces.org/cdn/primevue/images/galleria/galleria4.jpg"
              preview
              width="400"
            ></Image>
          </div>
          <div class="panel" :key="5">
            <Image
              indicatorIcon="fa fa-magnifying-glass text-slate-100"
              src="https://primefaces.org/cdn/primevue/images/galleria/galleria4.jpg"
              preview
              width="400"
            ></Image>
          </div>

          <template #viewport>
            <span class="flicking-arrow-prev"></span>
            <span class="flicking-arrow-next"></span>
          </template>
        </Flicking>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import "@egjs/flicking-plugins/dist/arrow.css";

import Flicking from "@egjs/vue3-flicking";
import { Arrow } from "@egjs/flicking-plugins";
const plugins = [new Arrow()];
</script>

<style scoped>
.panel {
  width: 22rem;
}
</style>
