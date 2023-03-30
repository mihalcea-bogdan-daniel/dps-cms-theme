<template>
  <ClientOnly>
    <Dropdown
      v-model="localesModelValue"
      option-label="name"
      option-value="code"
      :options="availableLocales"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
const { locales, setLocale, locale } = useI18n();
const availableLocales = computed(() => locales.value);
const localesModelValue = computed({
  get() {
    return locale.value;
  },
  set(val) {
    setLocale(val);
  },
});
</script>

<style scoped></style>
