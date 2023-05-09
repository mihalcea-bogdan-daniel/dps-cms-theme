<template>
  <div class="z-50">
    <!-- Menu button -->
    <Menu v-slot="{ open }" as="template" :key="'main-menu-mobile'">
      <div class="h-full">
        <MenuButton
          as="template"
          :key="'main-menu-mobile-button'"
          id="main-menu-mobile-button"
        >
          <div class="flex gap-4 w-full items-center" :class="{'text-primary-blue':open}">
            <div>{{ t("view.menu") }}</div>
            <i class="fa" :class="open ? 'fa-times' : 'fa-bars'"></i>
          </div>
        </MenuButton>
        <!-- Backdrop -->
        <transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            class="absolute transform bottom-0 left-0 z-10 translate-y-full h-screen w-screen bg-black bg-opacity-20 backdrop-blur-md"
            v-if="open"
          ></div>
        </transition>
        <!-- Backdrop end -->
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-y-0 opacity-0"
          enter-to-class="transform scale-y-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-y-100 opacity-100"
          leave-to-class="transform scale-y-0 opacity-0"
        >
          <MenuItems
            id="main-menu-mobile-button"
            v-if="open"
            static
            class="absolute z-[301] origin-top bottom-0 left-0 transition animation-delay-150 w-full bg-white drop-shadow-md p-2 rounded-b-md flex flex-col outline-none border-t-2 border-primary-blue translate-y-full "
          >
            <!-- Level #1 -->
            <MenuItem v-for="menuItem in menuItems" :key="menuItem.path">
              <Menu as="div" class="p-3" v-slot="{ open: firstLevelOpen }">
                <MenuButton as="template">
                  <div
                    v-if="menuItem.children && menuItem.children.length > 0"
                    class="flex gap-4 w-full items-center justify-between transition-colors"
                    :class="firstLevelOpen ? 'text-primary-blue' : ''"
                  >
                    <div>
                      <NuxtLink :to="menuItem.path">
                        {{ menuItem.label }}
                      </NuxtLink>
                    </div>
                    <i
                      class="fa fa-chevron-right transition-transform p-2"
                      :class="firstLevelOpen ? 'rotate-90' : ''"
                    ></i>
                  </div>
                  <div v-else class="w-full">
                    <NuxtLink :to="menuItem.path" class="w-full block">
                      {{ menuItem.label }}
                    </NuxtLink>
                  </div>
                </MenuButton>
                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-y-0 opacity-0"
                  enter-to-class="transform scale-y-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-y-100 opacity-100"
                  leave-to-class="transform scale-y-0 opacity-0"
                >
                  <div v-if="firstLevelOpen && open" class="origin-top">
                    <MenuItems
                      v-if="menuItem.children && menuItem.children.length > 0"
                      static
                      as="div"
                      class="transition-all p-2"
                      :class="firstLevelOpen ? '' : 'h-0'"
                    >
                      <MenuItem
                        v-for="menuSubItem in menuItem.children"
                        as="div"
                        :key="menuSubItem.path"
                        v-slot="{ close: secondLevelClose }"
                      >
                        <!-- Level #2 -->
                        <Menu as="div" class="p-2" v-slot="{ open: openSubMenu }">
                          <MenuButton as="template">
                            <div
                              class="p-2 flex gap-4 w-full items-center justify-between transition-colors"
                              :class="openSubMenu ? 'text-primary-blue' : ''"
                              v-if="
                                menuSubItem.children && menuSubItem.children.length > 0
                              "
                            >
                              <NuxtLink :to="menuSubItem.path">
                                {{ menuSubItem.label }}
                              </NuxtLink>
                              <i
                                class="fa fa-chevron-right transition-transform"
                                :class="openSubMenu ? 'rotate-90' : ''"
                              ></i>
                            </div>
                            <div v-else class="w-full block">
                              <NuxtLink :to="menuSubItem.path" class="w-full block">
                                {{ menuSubItem.label }}
                              </NuxtLink>
                            </div>
                          </MenuButton>
                          <transition
                            enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-y-0 opacity-0"
                            enter-to-class="transform scale-y-100 opacity-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="transform scale-y-100 opacity-100"
                            leave-to-class="transform scale-y-0 opacity-0"
                          >
                            <MenuItems
                              static
                              v-if="openSubMenu"
                              as="div"
                              class="px-2 origin-top"
                            >
                              <!-- Level #3 -->
                              <MenuItem
                                v-for="leafItem in menuSubItem.children"
                                :key="leafItem.path"
                              >
                                <div class="p-2">
                                  <NuxtLink
                                    :to="leafItem.path"
                                    class="py-2 w-full block"
                                    >{{ leafItem.label }}</NuxtLink
                                  >
                                </div>
                              </MenuItem>
                            </MenuItems>
                          </transition>
                        </Menu>
                      </MenuItem>
                    </MenuItems>
                  </div>
                </transition>
              </Menu>
            </MenuItem>
          </MenuItems>
        </transition>
      </div>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

import { ContentNode } from "../../../types/ContentNode/ContentNode";
import { extractMenuItems, IMenuItem } from "./utils";

interface NavigationMenuProps {
  contentNode: ContentNode;
}

const props = defineProps<NavigationMenuProps>();
const { t } = useI18n();
const menuItems: ComputedRef<IMenuItem[]> = computed(() => {
  if (props.contentNode) {
    return extractMenuItems(props.contentNode.children);
  } else {
    return [];
  }
});
</script>

<style scoped></style>
