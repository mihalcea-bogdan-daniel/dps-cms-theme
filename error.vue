<template>
  <NuxtLayout static>
    <template #featured-image>
      <div v-if="error" class="text-primary">
        <h1 class="text-primary">
          {{ t(`error.error`) + " " + error.statusCode }}
        </h1>
        <h3>{{ t(`error.${error.statusCode}`) }}</h3>
      </div>
    </template>
    <template #sidebar>
      <div></div>
    </template>
    <template> <div></div> </template>
    <template #breadcrumb> <div></div> </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { t } = useI18n();
defineProps({
  error: Object,
});
//@ts-ignore -- this modules is imported in the core project
useRouteCache((helper) => {
  helper.setUncacheable();
});
const handleError = () => clearError({ redirect: "/" });
</script>
