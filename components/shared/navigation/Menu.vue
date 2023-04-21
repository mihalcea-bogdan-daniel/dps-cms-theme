<template>
  <div class="flex relative h-full items-center gap-8">
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
          class="no-underline block h-full border-blue-600 hover:border-b-4"
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
          <div>{{ menuItem.label }}</div>
          <i class="fa fa-caret-down"></i>
        </div>
      </MenuButton>
      <MenuItems
        class="absolute bg-white drop-shadow-md p-2 rounded-b-md rounded-r-md"
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
            <div class="flex gap-4 items-center">
              <div>{{ menuSubItem.label }}</div>
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
            class="p-component p-button p-button-link p-button-sm"
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
  PrimaryType,
} from "../../../types/ContentNode/ContentNode";
import SubMenu from "./SubMenu.vue";

interface NavigationMenuProps {
  contentNode: ContentNode;
}

interface MenuItem {
  label: string;
  link?: string;
  children?: MenuItem[];
  path: string;
}

const props = defineProps<NavigationMenuProps>();

const extractMenuItems = function (contentNodes: ContentNode[]): MenuItem[] {
  const menuItems: MenuItem[] = [];
  contentNodes.forEach((cn: ContentNode) => {
    if (![PrimaryType.FILE, PrimaryType.RESOURCE].includes(cn.primaryType)) {
      // level 1
      menuItems.push({
        label: cn.properties["cd:title"]?.value,
        path: cn.path,
        link: cn.path,
        children: cn.children
          ? cn.children
              .filter(
                (ch) =>
                  ![PrimaryType.FILE, PrimaryType.RESOURCE].includes(
                    ch.primaryType
                  )
              )
              // level 2
              .map((ch) => {
                return {
                  label: ch.properties["cd:title"]?.value,
                  path: cn.path,
                  link: cn.path,
                  // level 3
                  children: extractMenuItems(ch.children),
                };
              })
          : [],
      });
    }
  });
  return menuItems;
};
const menuItems: ComputedRef<MenuItem[]> = computed(() => {
  if (props.contentNode) {
    return extractMenuItems(props.contentNode.children);
  } else {
    return [];
  }
});
</script>

<style scoped></style>
