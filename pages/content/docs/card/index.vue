<template>
  <div class="container mx-auto p-10 bg-gray-100">
    <h1 class="mb-4">Card component</h1>
    <div class="flex gap-6 flex-col">
      <UiCard
        imgUrl="https://images.unsplash.com/photo-1650989859642-dc988199807a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
      ></UiCard>
      <UiCard
        horizontal
        imgUrl="https://images.unsplash.com/photo-1650989859642-dc988199807a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
      ></UiCard>
    </div>
    <div class="grid grid-cols-12 mt-10 gap-6">
      <UiCard
        articleLink="/test"
        class="col-span-3"
        imgUrl="https://images.unsplash.com/photo-1650989859642-dc988199807a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
      ></UiCard>
      <UiCard
        class="col-span-3"
        imgUrl="https://images.unsplash.com/photo-1650989859642-dc988199807a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
      ></UiCard>
      <UiCard
        class="col-span-3"
        imgUrl="https://images.unsplash.com/photo-1650989859642-dc988199807a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
      ></UiCard>
      <UiCard
        class="col-span-3"
        noBackground
        imgUrl="https://images.unsplash.com/photo-1650989859642-dc988199807a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
      ></UiCard>
      <UiCard
        horizontal
        articleLink="/"
        class="col-span-12"
        imgUrl="https://images.unsplash.com/photo-1650989859642-dc988199807a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
      ></UiCard>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
