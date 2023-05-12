<template>
  <NuxtLayout>
    <template #featured-image>
      <div v-if="error" class="text-primary">
        <h1 class="text-primary">{{ t(`error.error`) + ' ' + error.statusCode }}</h1>
        <h3>{{ t(`error.${error.statusCode}`) }}</h3>
      </div>
    </template>
    <template #sidebar>
      <div></div>
    </template>
    <template> <div></div> </template>
    <template #breadcrumb> <div></div> </template>
    <!-- <template #hero>
      <div class="container relative font-sans col-span-12" n="green6">
        <h1>{{ error.message }}</h1>
        <h2>{{ error.cause }}</h2>
        There was an error 😱
        <br />
        <button @click="handleError">Clear error</button>
        <br />
        <NuxtLink to="/404"> Trigger another error </NuxtLink>
        <br />
        <NuxtLink to="/"> Navigate home </NuxtLink>
      </div>
    </template> -->
  </NuxtLayout>
</template>

<script setup lang="ts">
const { t } = useI18n();
defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>
