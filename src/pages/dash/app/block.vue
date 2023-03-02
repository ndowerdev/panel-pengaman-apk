<script setup>
import { isIPAddress } from 'ip-address-validator'
import ContextMenu from '@imengyu/vue3-context-menu'
import Swal from 'sweetalert2'

import { appBlocklist } from '~/composables/database'
const memberStore = useMemberStore()

const title = `APP BlockList for: ${memberStore.memberData.activeApp.package_name} - (${memberStore.memberData.activeApp.name})`
useHead({
  title,
  meta: [
    { name: 'description', content: title },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})
const router = useRouter()
const serverAppSetting = await appBlocklist()

const formData = ref(serverAppSetting ?? {})

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
  org: {
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
const addOrgBlock = (value) => {
  if (formData.value.org.includes(value) !== true && inputStatus.value.org.status === true) {
    formData.value.org.push(toInput.value.org)

    toInput.value.org = ''
  }
}
const addAsnBlock = (value) => {
  if (formData.value.asn.includes(value) !== true && inputStatus.value.asn.status === true) {
    formData.value.asn.push(toInput.value.asn)

    toInput.value.asn = ''
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
const removeOrgBlock = (index) => {
  formData.value.org.splice(formData.value.org.indexOf(index), 1)
}
const removeAsnBlock = (index) => {
  formData.value.asn.splice(formData.value.asn.indexOf(index), 1)
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
watch(
  () => toInput.value.org, (newVal, oldVal) => {
    // ip address input validation

    if (newVal !== '' && formData.value.org.includes(newVal) === false) {
      inputStatus.value.org.status = true
      inputStatus.value.org.class = 'bg-green-400 cursor'
    }

    else {
      inputStatus.value.org.status = false
      inputStatus.value.org.class = 'bg-red-300 hover:cursor-not-allowed'
    }
  },

  { deep: true },
)
watch(
  () => toInput.value.asn, (newVal, oldVal) => {
    // ip address input validation

    if (newVal !== '' && formData.value.asn.includes(newVal) === false) {
      inputStatus.value.asn.status = true
      inputStatus.value.asn.class = 'bg-green-400 cursor'
    }

    else {
      inputStatus.value.asn.status = false
      inputStatus.value.asn.class = 'bg-red-300 hover:cursor-not-allowed'
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

  <div class="w-full flex flex-row flex-wrap gap-3 text-xs mb-3">
    <div
      class="w-full "
    >
      <TheDivider title="ADS SETTINGS" />
      <div class="flex flex-col gap-3">
        <div class="flex flex-row w-full gap-3">
          <div class="w-full">
            <ListBlockIP
              :input-status="inputStatus"
              :to-input="toInput"
              :form-data="formData"
              @add-ip-block="addIPBlock"
              @remove-this-from-ip="removeThisFromIp"
            />
          </div>
          <div class="w-full">
            <ListBlockCountry
              :input-status="inputStatus"
              :to-input="toInput"
              :form-data="formData"
              @add-country-block="addCountryBlock"
              @remove-country-block="removeCountryBlock"
            />
          </div>
          <div class="w-full">
            <ListBlockCountryCode
              :input-status="inputStatus"
              :to-input="toInput"
              :form-data="formData"
              @add-country-code-block="addCountryCodeBlock"
              @remove-country-code-block="removeCountryCodeBlock"
            />
          </div>
        </div>
        <div class="flex flex-row w-full gap-3">
          <div class="w-1/3">
            <ListBlockOrg
              :input-status="inputStatus"
              :to-input="toInput"
              :form-data="formData"
              @add-org-block="addOrgBlock"
              @remove-org-block="removeOrgBlock"
            />
          </div>
          <div class="w-1/3">
            <ListBlockAsn
              :input-status="inputStatus"
              :to-input="toInput"
              :form-data="formData"
              @add-asn-block="addAsnBlock"
              @remove-asn-block="removeAsnBlock"
            />
          </div>
          <div class="w-1/3" />
        </div>
        <div class="flex flex-col w-full gap-2">
          <button
            type="button"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="saveAppBlock"
          >
            SAVE
          </button>
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
