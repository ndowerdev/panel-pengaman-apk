<script setup>
defineOptions({
  name: 'IndexPage',
})
const router = useRouter()
const gotoDash = () => {
  router.push({ name: 'dash.index' })
}
</script>

<template>
  <div id="modal-open" class="m-auto  text-center fixed bg-gray top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-[20px] overscroll-auto">
    <div class="bg-white rounded-lg shadow-lg p-6 ackdrop-filter backdrop-blur-[20px]">
      <button
        type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        @click="gotoDash"
      >
        DASHBOARD
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
