<template>
  <Listbox v-model="localesModelValue">
    <div class="">
      <ListboxButton
        class="relative w-30 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
      >
        <span class="block truncate">{{ localesModelValue }}</span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <i class="fa-solid fa-chevron-down text-gray-400"></i>
        </span>
      </ListboxButton>
      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-slot="{ active }"
            v-for="loc in availableLocales as LocaleObject[]"
            :key="loc.code"
            :value="loc.code"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-blue-100 text-blue-900' : 'text-gray-900',
                'relative cursor-pointer select-none py-2 pl-10 pr-4',
              ]"
            >
              <span
                :class="[
                  locale == loc.code ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
                >{{ greaterThanSm ? loc.name : loc.shortName }}</span
              >
              <span
                v-if="locale == loc.code"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600"
              >
                <i class="fa-light fa-check"></i>
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { LocaleObject } from "@nuxtjs/i18n/dist/runtime/composables";
import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsTailwind);
const greaterThanSm = breakpoints.greater("sm");

const { locales, setLocale, locale } = useI18n();
const availableLocales = computed(() => locales.value);

const localesModelValue = computed({
  get() {
    const currentLocaleObject = locales.value.find((loc: LocaleObject) => loc.code == locale.value)
    return greaterThanSm.value ? currentLocaleObject?.name : currentLocaleObject?.shortName
  },
  set(val) {
    setLocale(val);
  },
});
</script>
