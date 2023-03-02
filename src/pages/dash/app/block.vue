<script setup>
import { isIPAddress } from 'ip-address-validator'
import ContextMenu from '@imengyu/vue3-context-menu'
import Swal from 'sweetalert2'

import { appBlocklist } from '~/composables/database'
const memberStore = useMemberStore()

const title = `APP BlockList for: ${memberStore.memberData.activeApp.package_name} - (${memberStore.memberData.activeApp.name})`

const router = useRouter()
const serverAppSetting = await appBlocklist()

const formData = ref(serverAppSetting)

// if (checkActiveApp() === false)
//   router.push('/dash')

const addActiveSelector = [
  {
    id: 'fan',
    desc: 'Facebook Ads Network',
  },
  {
    id: 'applovin',
    desc: 'Applovin',
  },
  {
    id: 'admob',
    desc: 'Google Admob',
  },
  {
    id: 'empty',
    desc: 'NO ADS',
  },
]

const toInput = ref({
  ip: '',
  org: '',
  country: '',
  country_code: '',
  asn: '',
})

const saveAppBlock = () => {
  updateAppBlocklist(formData)
}

const inputStatus = ref({
  ip: {
    status: false,
    class: 'bg-red-300 hover:cursor-not-allowed',
  },
  country: {
    status: false,
    class: 'bg-red-300 hover:cursor-not-allowed',
  },
  country_code: {
    status: false,
    class: 'bg-red-300 hover:cursor-not-allowed',
  },
  asn: {
    status: false,
    class: 'bg-red-300 hover:cursor-not-allowed',
  },
})
const removeThisFromIp = (index) => {
  formData.value.ip.splice(formData.value.ip.indexOf(index), 1)
}
const addIPBlock = () => {
  const inputVal = toInput.value.ip
  if (toInput.value.ip !== '' && formData.value.ip.includes(inputVal) !== true && inputStatus.value.ip.status === true) {
    formData.value.ip.push(toInput.value.ip)
    toInput.value.ip = ''
  }
}

// country
const addCountryBlock = (value) => {
  if (formData.value.country.includes(value) !== true && inputStatus.value.country.status === true) {
    formData.value.country.push(toInput.value.country)

    toInput.value.country = ''
  }
}
const addCountryCodeBlock = (value) => {
  if (formData.value.country_code.includes(value) !== true && inputStatus.value.country_code.status === true) {
    formData.value.country_code.push(toInput.value.country_code)

    toInput.value.country_code = ''
  }
}

const removeCountryBlock = (index) => {
  formData.value.country.splice(formData.value.country.indexOf(index), 1)
}
// watcher
const removeCountryCodeBlock = (index) => {
  formData.value.country_code.splice(formData.value.country_code.indexOf(index), 1)
}
// watcher
watch(
  () => toInput.value.ip, (newVal, oldVal) => {
    // ip address input validation
    const isIp = inputStatus.value.ip.status = isIPAddress(newVal)
    if (isIp === true) {
      inputStatus.value.ip.status = true
      inputStatus.value.ip.class = 'bg-green-400 cursor'
    }

    else {
      inputStatus.value.ip.status = false
      inputStatus.value.ip.class = 'bg-red-300 hover:cursor-not-allowed'
    }
  },

  { deep: true },
)
watch(
  () => toInput.value.country, (newVal, oldVal) => {
    // ip address input validation

    if (newVal !== '' && formData.value.country.includes(newVal) === false) {
      inputStatus.value.country.status = true
      inputStatus.value.country.class = 'bg-green-400 cursor'
    }

    else {
      inputStatus.value.country.status = false
      inputStatus.value.country.class = 'bg-red-300 hover:cursor-not-allowed'
    }
  },

  { deep: true },
)
watch(
  () => toInput.value.country_code, (newVal, oldVal) => {
    // ip address input validation

    if (newVal !== '' && formData.value.country_code.includes(newVal) === false) {
      inputStatus.value.country_code.status = true
      inputStatus.value.country_code.class = 'bg-green-400 cursor'
    }

    else {
      inputStatus.value.country_code.status = false
      inputStatus.value.country_code.class = 'bg-red-300 hover:cursor-not-allowed'
    }
  },

  { deep: true },
)

const blockContextMenu = (e) => {
  // prevent the browser's default menu
  e.preventDefault()
  // show your menu
  ContextMenu.showContextMenu({
    divided: true,
    x: e.x,
    y: e.y,
    items: [
      {
        label: '✅ Save to DB',
        onClick: () => {
          saveAppBlock()
        },
      },

    ],
  })
}
</script>

<template>
  <h1 class="text-2xl font-bold mb-6">
    {{ title }}
  </h1>
  {{ formData }}
  ---
  <pre>{{ toInput }}</pre>
  <div
    class="w-full flex flex-row flex-wrap gap-3 text-xs mb-3"
  >
    <div class="w-full " @contextmenu="blockContextMenu($event)">
      <TheDivider title="ADS SETTINGS" />
      <div class="flex lg:flex-row flex-col gap-3">
        <div class="w-1/4">
          <ListBlockIP
            :input-status="inputStatus"
            :to-input="toInput"
            :form-data="formData"
            @add-ip-block="addIPBlock"
            @remove-this-from-ip="removeThisFromIp"
          />
        </div>
        <div class="w-1/4">
          <ListBlockCountry
            :input-status="inputStatus"
            :to-input="toInput"
            :form-data="formData"
            @add-country-block="addCountryBlock"
            @remove-country-block="removeCountryBlock"
          />
        </div>
        <div class="w-1/4">
          <ListBlockCountryCode
            :input-status="inputStatus"
            :to-input="toInput"
            :form-data="formData"
            @add-country-code-block="addCountryCodeBlock"
            @remove-country-code-block="removeCountryCodeBlock"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
name: dash.app.block
meta:
  layout: dashboard
  requiresAuth: true
  </route>
