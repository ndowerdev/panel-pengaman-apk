<script setup>
import { appList } from '~/composables/database'
const router = useRouter()
// if (checkActiveApp() === true)
//   router.push({ name: 'dash.app.settings' })

const listApp = await appList()
const showModal = ref(false)

const activeAppId = computed(() => {
  return useMemberStore().memberData.activeApp ? useMemberStore().memberData.activeApp : ''
})
</script>

<template>
  <div
    class="w-full flex flex-row gap-3"
  >
    <div
      v-for="(item, index) in listApp" :key="index" :class="item.id === activeAppId.id ? 'bg-green-300' : 'bg-blue-500'"
      class="bg-blue-500 rounded-md p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4" @click="setActiveApp(item)"
    >
      <h2 class="text-white font-bold text-lg mb-2">
        {{ item.name }}
      </h2>
      <p class="text-white text-sm">
        {{ item.package_name }}
      </p>
    </div>
  </div>

  <ModalNewApp v-if="showModal" :userid="pb.authStore.model.id" @close="showModal = false" />
  <button
    v-if="!showModal" title="Contact Sale"
    class="fixed z-90 bottom-10 right-8 bg-blue-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300"
    @click="showModal = true"
  >
    <img src="/images/plus-icon.png" alt="">
  </button>
  <!-- <div>
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="showModal = !showModal">
                  ADD NEW
                </button>
                <div>
                  applist
                </div>
              </div> -->
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
name: dash.index
meta:
  layout: dashboard
  requiresAuth: true
</route>
