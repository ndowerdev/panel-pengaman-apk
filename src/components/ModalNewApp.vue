<script setup>
const formData = ref({

  name: '',
  package_name: '',
  owner: '',
  is_live: false,
})
const isFormDataValid = ref(false)

watch(formData.value, () => {
  formData.value.owner = pb.authStore.model.id

  if (formData.value.package_name !== '' && formData.value.name !== '')
    isFormDataValid.value = true
  else
    isFormDataValid.value = false
})
const submitData = async () => {
  await pb.collection('apps').create(formData.value).then((response) => {
    location.reload()
  })
}
</script>

<template>
  <div class="fixed bg-gray top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur ">
    <div class="bg-white rounded-lg shadow-lg p-6 backdrop-blur">
      <h2 class="text-lg font-bold mb-4 text-center">
        NEW APP
      </h2>
      <form @submit.prevent>
        <label for="name" class="block font-medium text-gray-700 mb-2">App Name:</label>
        <input v-model="formData.name" type="text" class="border border-gray-300 rounded px-4 py-2 mb-4 w-full" required>
        <label for="name" class="block font-medium text-gray-700 mb-2">Package Name:</label>
        <input
          v-model="formData.package_name" type="text" class="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
          required
        >

        <label class="relative inline-flex items-center cursor-pointer">
          <input
            v-model="formData.is_live" type="checkbox" class="sr-only peer"
            @click="formData.is_live = !formData.is_live"
          >
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          />
          <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">IS LIVE</span>
        </label>

        <div class="flex flex-col w-full gap-2">
          <button
            v-show="isFormDataValid" type="button"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="submitData"
          >
            Submit
          </button>

          <button
            type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            @click="$emit('close')"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
