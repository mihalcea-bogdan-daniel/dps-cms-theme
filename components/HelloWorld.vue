<script setup lang="ts">
const { dpsCmsTheme } = useAppConfig();
const config = useRuntimeConfig();
</script>

<template>
  <div>
    <h1>Hello World!</h1>
    <pre>{{ dpsCmsTheme }}</pre>
    <pre>{{ config }}</pre>
  </div>
</template>
