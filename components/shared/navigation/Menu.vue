<template>
  <div class="flex relative h-full items-center gap-8 border-b border-secondary-black">
    <Menu
      v-slot="{ open }"
      as="div"
      v-for="menuItem in menuItems"
      :key="menuItem.path"
      class="h-full"
    >
      <MenuButton
        v-if="menuItem.children == undefined || menuItem.children.length == 0"
        as="template"
      >
        <NuxtLink
          :to="menuItem.path"
          class="no-underline flex items-center box-content h-full border-primary hover:border-b-4 hover:text-primary outline-none focus:text-primary-100"
          >{{ menuItem.label }}</NuxtLink
        >
      </MenuButton>
      <MenuButton
        v-else
        as="div"
        class="h-full flex box-content border-primary hover:border-b-4"
        :class="{ 'border-b-4 text-primary': open }"
      >
        <div class="flex gap-3 items-center hover:text-primary">
          <button class="outline-none focus:text-primary">
            {{ menuItem.label }}
          </button>
          <i class="fa fa-caret-down"></i>
        </div>
      </MenuButton>
      <MenuItems
        class="absolute bg-white drop-shadow-md p-2 rounded-b-md rounded-r-md flex flex-col outline-none z-50"
        v-if="menuItem.children != undefined && menuItem.children.length > 0"
      >
        <MenuItem
          v-for="menuSubItem in menuItem.children"
          :key="menuSubItem.path"
          as="template"
          v-slot="{ active }"
        >
          <div
            v-if="menuSubItem.children && menuSubItem.children?.length > 0"
            class="p-2 relative hover:bg-black-50 rounded-md"
          >
            <div
              class="flex gap-4 items-center justify-between"
              :class="active ? 'text-primary bg-black-50' : ''"
            >
              <NuxtLink
                :href="menuSubItem.path"
                class="p-2 rounded-md outline-none"
                >{{ menuSubItem.label }}</NuxtLink
              >
              <i class="fa fa-chevron-right text-xs"></i>
            </div>
            <div v-if="active">
              <div
                class="absolute flex flex-col top-0 right-0 translate-x-full p-2 drop-shadow-md bg-white rounded-b-md rounded-r-md"
              >
                <NuxtLink
                  v-for="leafItem in menuSubItem.children"
                  :href="leafItem.path"
                  class="p-3 hover:bg-black-50 hover:text-primary rounded-md"
                >
                  <span class="text-inherit">{{ leafItem.label }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
          <NuxtLink
            v-else
            :to="menuSubItem.path"
            class="p-3 hover:bg-black-50 hover:text-primary rounded-md"
            >{{ menuSubItem.label }}</NuxtLink
          >
        </MenuItem>
      </MenuItems>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ContentNode } from "../../../types/ContentNode/ContentNode";
import { IMenuItem, extractMenuItems } from "./utils";

interface NavigationMenuProps {
  contentNode: ContentNode;
}
const props = defineProps<NavigationMenuProps>();

const menuItems: ComputedRef<IMenuItem[]> = computed(() => {
  if (props.contentNode) {
    return extractMenuItems(props.contentNode.children);
  } else {
    return [];
  }
});
</script>

<style scoped></style>
