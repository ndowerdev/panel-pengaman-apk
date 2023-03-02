import PocketBase from 'pocketbase'
import Swal from 'sweetalert2'
import { defaultAppBlockListSettings } from './samples'

export const pb = new PocketBase(import.meta.env.VITE_DB_URL)
export const useDb = async function (username: string, password: string) {
  const authData = await pb.collection('users').authWithPassword(`${username}`, `${password}`)
  return authData
}

export const apiKeyList = async () => {
  const records = await pb.collection('apis').getFullList(200, {
    filter: `owner = "${pb.authStore.model?.id}"`,
    sort: '-created',
  })
  return records
}

export const projectLists = async () => {
  const records = await pb.collection('projects').getFullList(200, {
    filter: `project_owner = "${pb.authStore.model?.id}"`,
    sort: '-created',
  })
  return records
}

export const appList = async () => {
  const records = await pb.collection('apps').getFullList(500, {
    filter: `owner = "${pb.authStore.model?.id}"`,
  })
  return records
}

export const appSetting = async () => {
  const appId = useMemberStore().memberData.activeApp.id
  const initData = defaultAppSettingsData
  initData.app = appId

  try {
    const response = await pb.collection('app_settings').getFirstListItem(`app="${appId}"`)

    return response
  }
  catch (error) {
    const record = await pb.collection('app_settings').create(initData)
    return record
  }
}

// export { useDb, pb, apiKeyList, projectLists, appList }

export const updateAppSetting = async (formData: any) => {
  // formData.app = useMemberStore().memberData.activeApp.id

  try {
    const record = await pb.collection('app_settings').update(formData.id, formData)
    Swal.fire({
      title: 'Success update data',
    })
    return record
  }
  catch (error) {
    console.log(error)
  }
}

// app block

export const appBlocklist = async () => {
  const appId = useMemberStore().memberData.activeApp.id
  const initData = defaultAppBlockListSettings
  initData.app = appId

  try {
    const response = await pb.collection('block').getFirstListItem(`app="${appId}"`)

    return response
  }
  catch (error) {
    const record = await pb.collection('block').create(initData)
    return record
  }
}

export const updateAppBlocklist = async (formData: any) => {
  // console.log(formData.value)
  // formData.app = useMemberStore().memberData.activeApp.id

  try {
    const record = await pb.collection('block').update(formData.value.id, formData.value)
    Swal.fire({
      title: 'Success update data',
    })
    return record
  }
  catch (error) {
    console.log(error)
  }
}
