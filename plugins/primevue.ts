import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Button from "primevue/button";
import Carousel from "primevue/carousel";
import Dropdown from "primevue/dropdown";
import Portal from "primevue/image";
import FocusTrap from "primevue/focustrap";
import Image from "../components/ui/CMSImage.vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.provide("toast", nuxtApp.vueApp.config.globalProperties.$toast);

  nuxtApp.vueApp.directive("focustrap", FocusTrap);
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("Carousel", Carousel);
  nuxtApp.vueApp.component("Dropdown", Dropdown);
  nuxtApp.vueApp.component("Portal", Portal);
  nuxtApp.vueApp.component("Image", Image);
  nuxtApp.vueApp.component("Toast", Toast);
});
