<script setup>
const title = computed(() => {
  // return 'dashboard'
  return useMemberStore().memberData.public !== undefined ? useMemberStore().memberData.public.title : 'DASHBOARD'
})
</script>

<template>
  <h1 class="text-2xl font-bold mb-6">
    {{ title }}
  </h1>
</template>

<style lang="scss" scoped></style>
