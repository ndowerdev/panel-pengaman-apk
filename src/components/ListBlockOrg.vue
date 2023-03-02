<script setup>
import ContextMenu from '@imengyu/vue3-context-menu'
const props = defineProps(['inputStatus', 'toInput', 'formData'])
const emit = defineEmits(['addOrgBlock', 'removeOrgBlock'])

const contextMenu = (e, index) => {
  // prevent the browser's default menu
  e.preventDefault()
  // show your menu
  ContextMenu.showContextMenu({
    divided: true,
    x: e.x,
    y: e.y,
    items: [
      {
        label: '❎ Remove Organization',
        onClick: () => {
          emit('removeOrgBlock', index)
        },
      },

    ],
  })
}
</script>

<template>
  <div>
    <div class="box bg-white">
      <h3 class="font-bold capitalize text-center ">
        Organization Block
      </h3>
      <InputText
        v-model="$props.toInput.org"
        label="Organization Name"
        @keydown.enter="$emit('addOrgBlock', $props.toInput.org)"
      />
      <button
        :class="$props.inputStatus.org.class"
        :disabled="$props.inputStatus.org === false"
        type="button"
        class=" text-white font-bold py-1 px-2 rounded w-full"
        @click="$emit('addOrgBlock', $props.toInput.org)"
      >
        ADD
      </button>
      <div
        class="
            flex flex-col container  mt-10 mx-auto w-full items-center
            justify-center bg-white dark:bg-gray-800 rounded-lg shadow"
      >
        <ul class="flex flex-col divide-y w-full">
          <li
            v-for="(item, index) in formData.org"
            :key="index"
            class="flex flex-row"
            @contextmenu="contextMenu($event, index)"
          >
            <div class="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
              <div class="flex-1 pl-1">
                <div class="font-medium dark:text-white">
                  {{ item }}
                </div>
              </div>
              <div class="flex flex-row justify-center">
                <button
                  class="w-10 text-right flex justify-end"
                  @click="$emit('removeOrgBlock', index)"
                >
                  ❎
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
