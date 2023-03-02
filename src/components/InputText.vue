<script setup lang="ts">
const { modelValue } = defineModel<{
  modelValue: string
  label: string
}>()
</script>

<template>
  <div>
    <label for="ad_interval" class="block font-medium text-gray-700 mb-1 ">{{ label }}</label>
    <input
      v-model="modelValue"
      class="border border-gray-300 rounded px-2 py-1 mb-1 w-full"
      type="text" v-bind="$attrs"
    >
  </div>
</template>
