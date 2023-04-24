<template>
  <div class="flex relative h-full items-center gap-8">
    <Menu
      v-slot="{ open }"
      as="div"
      v-for="menuItem in menuItems"
      :key="menuItem.path"
      class="h-full z-50"
    >
      <MenuButton
        v-if="menuItem.children == undefined || menuItem.children.length == 0"
        as="template"
      >
        <NuxtLink
          :to="menuItem.path"
          class="no-underline block h-full border-blue-600 hover:border-b-4 hover:text-blue-600 outline-none focus:text-blue-600"
          >{{ menuItem.label }}</NuxtLink
        >
      </MenuButton>
      <MenuButton
        v-else
        as="div"
        class="h-full border-blue-600 hover:border-b-4"
        :class="{ 'border-b-4 text-blue-600': open }"
      >
        <div class="flex gap-3">
          <button class="outline-none focus:text-blue-600">{{ menuItem.label }}</button>
          <i class="fa fa-caret-down"></i>
        </div>
      </MenuButton>
      <MenuItems
        class="absolute bg-white drop-shadow-md p-2 rounded-b-md rounded-r-md flex flex-col outline-none"
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
            class="p-3 relative hover:bg-slate-100 rounded-md"
          >
            <div class="flex gap-4 items-center justify-between">
              <NuxtLink
                  :href="menuSubItem.path"
                  class="p-2 hover:bg-slate-100 hover:text-blue-600 rounded-md outline-none"
                  :class="active ? 'text-blue-600' : ''"
                >{{ menuSubItem.label }}</NuxtLink>
              <i class="fa fa-chevron-right text-xs"></i>
            </div>
            <div v-if="active">
              <div
                class="absolute flex flex-col top-0 right-0 translate-x-full p-2 drop-shadow-md bg-white rounded-b-md rounded-r-md"
              >
                <NuxtLink
                  v-for="leafItem in menuSubItem.children"
                  :href="leafItem.path"
                  class="p-2 hover:bg-slate-100 hover:text-blue-600 rounded-md"
                >
                  <span>{{ leafItem.label }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
          <NuxtLink
            v-else
            :to="menuSubItem.path"
            class="p-3 hover:bg-slate-100 hover:text-blue-600 rounded-md"
            >{{ menuSubItem.label }}</NuxtLink
          >
        </MenuItem>
      </MenuItems>
    </Menu>
  </div>

</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import {
  ContentNode,
} from "../../../types/ContentNode/ContentNode";
import { IMenuItem, extractMenuItems } from './utils';

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
