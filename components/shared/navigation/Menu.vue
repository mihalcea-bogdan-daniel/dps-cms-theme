<template>
  <div class="flex">
    <Menu as="div" v-for="menuItem in menuItems" :key="menuItem.path">
      <MenuButton v-if="menuItem.children == undefined || menuItem.children.length == 0" as="template">
        <NuxtLink
          :to="menuItem.path"
          class="p-component p-button p-button-link p-button-sm no-underline"
          >{{ menuItem.label }}</NuxtLink
        >
      </MenuButton>
      <MenuButton v-else as="div">
        {{ menuItem.label }}
      </MenuButton>
      <MenuItems
        v-if="menuItem.children != undefined && menuItem.children.length > 0"
      >
        <MenuItem
          v-for="menuSubItem in menuItem.children"
          :key="menuSubItem.path"
          as="template"
        >
          <NuxtLink
            :to="menuSubItem.path"
            class="p-component p-button p-button-link p-button-sm"
            >{{menuSubItem.label}}</NuxtLink
          >
        </MenuItem>
      </MenuItems>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

interface MenuItem {
  label: string;
  link?: string;
  children?: MenuItem[];
  path: string;
}

interface NavigationMenuProps {
  homePageLabel: string | "Prima pagina";
  menuItems: MenuItem[];
}
const props = defineProps<NavigationMenuProps>();
</script>

<style scoped></style>
