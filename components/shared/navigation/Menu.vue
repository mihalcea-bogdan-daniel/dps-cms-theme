<template>
  <Menu as="div">
    <MenuButton> Options</MenuButton>
    <MenuItems>
      <MenuItem v-slot="{ active }">
        <a :class="{ 'bg-blue-500': active }" href="/account-settings">
          Account settings
        </a>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
interface NavigationMenuProps {
  menuLabel: string;
}
const props = defineProps<NavigationMenuProps>();
</script>

<style scoped></style>
