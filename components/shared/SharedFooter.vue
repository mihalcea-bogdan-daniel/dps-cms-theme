<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="grid grid-cols-12 col-span-12">
    <div
      v-if="
        contentNode && contentNode.properties['cd:formattedContent']?.string
      "
      class="col-span-12 grid-cols-12 grid"
      v-html="contentNode.properties['cd:formattedContent']?.string"
    />
    <div v-else class="grid-cols-12 grid col-span-12 mt-4">
      <div class="col-span-3">
        <h4 class="small title uppercase mb-2">Informații generale</h4>
        <p class="font-bold">Primăria Corbu, jud. Olt</p>
        <p class="font-bold">Program: L-V 8<sup>00</sup>-15<sup>00</sup></p>
        <p>
          <a href="tel:+4049481006" class="cms-link font-bold"
            >T: 0249 481 006</a
          >
        </p>
        <p>
          <a href="mailt:contact@primaria-corbu.ro" class="cms-link font-bold"
            >E: contact@primaria-corbu.ro</a
          >
        </p>
      </div>
      <div class="col-span-3">
        <h4 class="small title uppercase mb-2">Linkuri Utile</h4>
        <p>
          <a href="https://www.cjolt.ro/ro" class="cms-link font-bold"
            >Consiliul Județean Olt</a
          >
        </p>
        <p>
          <a
            href="http://djepolt.ro/djepolt-new/home"
            class="cms-link font-bold"
            >D.J.E.P. Olt</a
          >
        </p>
      </div>
      <div class="col-span-3">
        <h4 class="small title uppercase mb-2">Informații Publice</h4>
        <p><a href="#" class="cms-link font-bold">Achiziții publice</a></p>
        <p>
          <a href="#" class="cms-link font-bold">Transparență Decizională</a>
        </p>
      </div>
      <div class="col-span-3 h-full flex items-center gap-4">
        <a href="https://infocons.ro/" target="_blank">
          <img
            src="https://infocons.ro/wp-content/uploads/2020/12/logo-infocons-full.png"
            alt="Urgență 112"
            width="100"
            height="100"
          />
        </a>
        <a href="https://www.sts.ro/ro/despre-112" target="_blank">
          <img
            src="https://play-lh.googleusercontent.com/cpDyUcTP_Fih2rZwM4_czR9KPPN_G5YNLHmogKe8lNRHwMiNmvwYcP1nGVzXULxjAA=w100-h100-rw"
            alt="Urgență 112"
            width="100"
            height="100"
          />
        </a>
      </div>
    </div>
    <div
      v-if="
        copyrightNode && copyrightNode.properties['cd:formattedContent']?.string
      "
      class="col-span-12"
      v-html="copyrightNode.properties['cd:formattedContent']?.string"
    />
  </div>
  <div class="col-span-4"></div>
</template>

<script setup lang="ts">
import { ContentNode } from "~~/../types/ContentNode/ContentNode";

interface SharedFooterProps {
  footerContentNode?: ContentNode;
}
const props = defineProps<SharedFooterProps>();
const contentNode: Ref<ContentNode | undefined> = ref();
const copyrightNode: Ref<ContentNode | undefined> = ref();
if (props.footerContentNode) {
  contentNode.value = props.footerContentNode.items.find(
    (ch) => ch.name === "pa:content"
  );
  copyrightNode.value = props.footerContentNode.items.find(
    (ch) => ch.name === "pa:copyright"
  );
}
</script>

<style scoped></style>
