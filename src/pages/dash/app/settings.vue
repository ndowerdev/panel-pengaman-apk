<script setup>
import { appSetting } from '~/composables/database'

const memberStore = useMemberStore()
const router = useRouter()
const serverAppSetting = await appSetting()

const formData = serverAppSetting

const title = `APP Settings for: ${memberStore.memberData.activeApp.package_name} - (${memberStore.memberData.activeApp.name})`
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

const saveAppSettings = () => {
  updateAppSetting(formData)
}
</script>

<template>
  <h1 class="text-2xl font-bold mb-6">
    {{ title }}
  </h1>

  <div class="w-full flex flex-row flex-wrap gap-3 text-xs mb-3">
    <div class="w-full">
      <TheDivider title="ADS SETTINGS" />
      <div class="flex lg:flex-row flex-col gap-3">
        <div class="w-1/3">
          <div class="box bg-white">
            <h3 class="font-bold capitalize text-center ">
              AD SETTINGS
            </h3>

            <div class="">
              <label for="name" class="block font-medium text-gray-700 mb-2">ad_active</label>
              <select v-model="formData.ads.ad_active" class="border border-gray-300 rounded px-2 py-1 mb-1 w-full">
                <option v-for="(item, index) in addActiveSelector" :key="index" :value="item.id">
                  {{ item.desc }}
                </option>
              </select>
            </div>

            <div id="ad_interval">
              <label for="ad_interval" class="block font-medium text-gray-700 mb-2 ">Ad Interval</label>
              <input
                v-model="formData.ads.ad_interval" type="number"
                class="border border-gray-300 rounded px-2 py-1 mb-1 w-full" required
              >
            </div>
          </div>
        </div>

        <div class="w-1/3">
          <div class="box bg-white">
            <h3 class="font-bold capitalize text-center ">
              SYSTEM AD SETTINGS
            </h3>

            <InputText v-model="formData.system_ads.title" label="System Ads Title" />
            <InputText v-model="formData.system_ads.content" label="System Content Title" />
            <InputText v-model="formData.system_ads.image" label="System Image Title" />
            <InputText v-model="formData.system_ads.url" label="System Url Title" />
          </div>
        </div>
        <div class="w-1/3">
          <div class="box bg-white">
            <h3 class="font-bold capitalize text-center ">
              SYSTEM APP SETTINGS
            </h3>

            <div class="pt-2">
              <InputText v-model="formData.system_app.title" label="System App Title" />
              <InputText v-model="formData.system_app.content" label="System App Content" />
              <InputText v-model="formData.system_app.image" label="System App Image" />
              <InputText v-model="formData.system_app.url" label="System App Url" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full">
      <TheDivider title="ADMOB SETTINGS" />
      <div class="w-full">
        <div class="flex flex-row gap-3">
          <div class="w-1/3">
            <div class="box bg-white">
              <h4 class="text-center m-3 font-bold">
                Admob Banner
              </h4>
              <div>
                <TheSwitcher v-model="formData.ads.admob.banner.status" text="Banner Status" />
                <InputText v-model="formData.ads.admob.banner.ad_unit" label="Banner Add Unit" />
              </div>
            </div>
          </div>
          <div class="w-1/3">
            <div class="box bg-white">
              <h4 class="text-center m-3 font-bold">
                Admob Interstitial
              </h4>
              <div>
                <TheSwitcher v-model="formData.ads.admob.interstitial.status" text="Banner Status" />
                <InputText v-model="formData.ads.admob.interstitial.ad_unit" label="interstitial Add Unit" />
              </div>
            </div>
          </div>
          <div class="w-1/3">
            <div class="box bg-white">
              <h4 class="text-center m-3 font-bold">
                Admob Native
              </h4>
              <div class="pt-2">
                <TheSwitcher v-model="formData.ads.admob.native.status" text="Banner Status" />
                <InputText v-model="formData.ads.admob.native.ad_unit" label="Native Add Unit" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- admob setting -->

    <!-- FAN setting -->
    <div class="w-full">
      <TheDivider title="FAN SETTINGS" />
      <div class="flex flex-row gap-3">
        <div class="w-1/3 box bg-white">
          <h4 class="text-center m-3 font-bold">
            FAN Banner
          </h4>
          <div class="pt-2">
            <TheSwitcher v-model="formData.ads.fan.banner.status" text="Banner Status" />
            <InputText v-model="formData.ads.fan.banner.ad_unit" label="Banner Add Unit" />
          </div>
        </div>

        <!-- next -->
        <div class="w-1/3 box bg-white">
          <h4 class="text-center m-3 font-bold">
            FAN Interstitial
          </h4>
          <div class="pt-2">
            <TheSwitcher v-model="formData.ads.fan.interstitial.status" text="Banner Status" />
            <InputText v-model="formData.ads.fan.interstitial.ad_unit" label="interstitial Add Unit" />
          </div>
        </div>
        <!-- next -->
        <div class="w-1/3 box bg-white">
          <h4 class="text-center m-3 font-bold">
            FAN Native
          </h4>
          <div class="pt-2">
            <TheSwitcher v-model="formData.ads.fan.native.status" text="Banner Status" />
            <InputText v-model="formData.ads.fan.native.ad_unit" label="Native Add Unit" />
          </div>
        </div>
      </div>
    </div>
    <!-- batas -->

    <div class="w-full">
      <TheDivider title="APPLOVIN SETTINGS" />
      <div class="flex flex-row gap-3">
        <div class="w-1/4 ">
          <div class="box bg-white">
            <h4 class="text-center m-3 font-bold">
              APPLOVIN Banner
            </h4>
            <div class="pt-2">
              <TheSwitcher v-model="formData.ads.applovin.banner.status" text="Banner Status" />
              <InputText v-model="formData.ads.applovin.banner.ad_unit" label="Banner Add Unit" />
            </div>
          </div>
        </div>
        <div class="w-1/4 box bg-white">
          <h4 class="text-center m-3 font-bold">
            APPLOVIN Interstitial
          </h4>
          <div class="pt-2">
            <TheSwitcher v-model="formData.ads.applovin.interstitial.status" text="Banner Status" />
            <InputText v-model="formData.ads.applovin.interstitial.ad_unit" label="interstitial Add Unit" />
          </div>
        </div>
        <div class="w-1/4 box bg-white">
          <h4 class="text-center m-3 font-bold">
            APPLOVIN Native
          </h4>
          <div class="pt-2">
            <TheSwitcher v-model="formData.ads.applovin.native.status" text="Banner Status" />
            <InputText v-model="formData.ads.applovin.native.ad_unit" label="Native Add Unit" />
          </div>
        </div>
        <div class="w-1/4 box bg-white">
          <h4 class="text-center m-3 font-bold">
            APPLOVIN Mrec
          </h4>
          <div class="pt-2">
            <TheSwitcher v-model="formData.ads.applovin.mrec.status" text="Banner Status" />
            <InputText v-model="formData.ads.applovin.mrec.ad_unit" label="Mrec Add Unit" />
          </div>
        </div>
      </div>
    </div>
    <!-- applovin -->
  </div>

  <div class="flex flex-col w-full gap-2">
    <button
      type="button"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="saveAppSettings"
    >
      SAVE
    </button>

    <button type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      Cancel
    </button>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
name: dash.app.settings
meta:
  layout: dashboard
  requiresAuth: true
  </route>
