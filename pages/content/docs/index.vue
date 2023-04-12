<template>
  <ContentDoc path="/content/docs">
    <template #not-found>
      <h2 class="text-red-500">Document not found</h2>
    </template>
  </ContentDoc>
  <!-- <ContentList path="/" v-slot="{ list }">
    <div v-for="article in list" :key="article._path">
      <pre>{{ article._path }}</pre>
      <h2>{{ article.title }}</h2>
      <p>{{ article.description }}</p>
    </div>
  </ContentList> -->
</template>
<script setup lang="ts"></script>
