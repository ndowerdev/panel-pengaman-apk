<script setup>
import { NavMenus } from '../composables/menus'
const route = useRoute()
const sidebarOpen = ref(true)
const notificationOpen = ref(false)
const dropdownOpen = ref(false)
const closeSidebar = () => {
  sidebarOpen.value = false
}

const menuList = computed(() => {
  // console.log(useMemberStore().memberData.activeApp)
  return checkActiveApp() ? NavMenus : []
})
</script>

<template>
  <ModalError v-if="checkActiveApp() !== true && route.name !== 'dash.index'" />
  <div class="flex flex-col md:flex-row md:min-h-screen">
    <aside class="bg-gray-800 text-gray-500 w-52 md:w-64 flex-shrink-0" :class="sidebarOpen ? 'block' : 'hidden'">
      <div class="flex items-center justify-center h-16 md:h-20 border-b border-gray-700">
        <span class="text-white font-bold text-xl md:text-2xl">{{ pb.authStore.model?.name }}</span>
      </div>
      <nav class="mt-6">
        <div v-if="checkActiveApp()">
          <RouterLink
            v-for="(item, index) in menuList" :key="index" :to="{ name: item.routeName }"
            class="block py-2 px-4 text-sm hover:bg-gray-700 hover:text-white"
          >
            {{ item.name }}
          </RouterLink>
        </div>

        <button
          v-if="checkActiveApp()"
          class="w-full block py-2 px-4 text-sm text-left hover:bg-gray-700 hover:text-white " @click="closeActiveApp()"
        >
          CLOSE APP
        </button>
        <button

          class="w-full block py-2 px-4 text-sm text-left hover:bg-gray-700 hover:text-white " @click="logout()"
        >
          LOGOUT
        </button>
      </nav>
    </aside>

    <main class="bg-gray flex-1 p-6">
      <!-- <TheTitle /> -->
      <RouterView />
    </main>
  </div>
</template>
