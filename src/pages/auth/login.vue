<script setup>
// import PocketBase from 'pocketbase'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { RouterLinkStub } from '@vue/test-utils'
import { routeLocationKey, routerKey, useRoute, useRouter } from 'vue-router'

import { pb, useDb } from '../../composables/database'
// const pb = new PocketBase(import.meta.env.VITE_DB_URL)
const username = ref('ndowernet@gmail.com')
const password = ref('arma09121993')
const router = useRouter()

const doLogin = function () {
  useDb(username.value, password.value).then((data) => {
    if (pb.authStore.model.is_active === true) {
      router.push({ name: 'dash.index' })
    }
    else {
      pb.authStore.clear()
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'User tidak aktif!',

      })
    }
  })
}
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 lg:w-1/4" @submit.prevent="onSubmit">
      <div class="flex flex-col mb-4">
        <InputText v-model="username" label="Username" />
      </div>
      <div class="mb-6">
        <InputText v-model="password" type="password" label="password" />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " type="submit"
          @click="doLogin"
        >
          Sign In
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
name: auth-login
</route>
