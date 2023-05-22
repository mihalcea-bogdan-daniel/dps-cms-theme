<template>
  <form action="/search">
    <div class="relative">
      <input
        name="search"
        class="px-2"
        type="text"
        placeholder="Căutare"
        ref="searchInput"
        v-model="val"
      />
      <button class="cursor-pointer text-primary hover:text-black-400 active:text-black" :disabled="val == ''">
        <i
          class="fa-regular fa-magnifying-glass absolute top-1/2 -translate-y-1/2 mr-2 right-0"
        ></i>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
const route = useRoute();
const searchInput: Ref<HTMLInputElement | undefined> = ref();
const val: Ref<string|undefined> = ref("")
onMounted(() => {
  if (route.query.search && searchInput.value) {
    searchInput.value.value = route.query.search as string;
    val.value = searchInput.value.value;
  }
});
</script>

<style scoped></style>
