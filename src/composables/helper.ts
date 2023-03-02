import Swal from 'sweetalert2'

export const cencorString = (string: any) => {
  if (string !== undefined)
    return string.toString().replace(/(\w| )(?=(\w| ){4})/g, '*')

  // return string.replace(new RegExp(`\\b${string}\\b`, 'g'), '***')
  // return string.toString().replace(/(\w| )(?=(\w| ){4})/g, '*')
}

export const showtAlert = (icon: any, title: any, text: any) => {
  Swal.fire({
    icon, title, text,
  })
}

export const showToast = (_string: string) => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: _string,
    showConfirmButton: false,
    timer: 1500,
  })
}

export const setActiveApp = (app: any) => {
  const store = useMemberStore()
  Swal.fire({
    title: 'Select This App?',
    text: `${app.name} : ${app.package_name}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Select it!',
  }).then((result) => {
    if (result.isConfirmed) {
      store.memberData.activeApp = app
      Swal.fire(
        'Success!',
        'Active App Has Been Changed.!',
        'success',
      ).then(() => {
        location.replace('/dash/app/settings')
      })
    }
  })
}

export const setH1Title = (title: string) => {
  useMemberStore().memberData.public.title = title
}

export const checkActiveApp = () => {
  return (useMemberStore().memberData.activeApp !== undefined && Object.keys(useMemberStore().memberData.activeApp).length !== 0)
}

export const closeActiveApp = () => {
  useMemberStore().$reset()
}

export const logout = () => {
  pb.authStore.clear()
  location.reload()
}

export const checkIfExists = (itemId: any, arrayName: any) => {
  return arrayName.value.includes(itemId)
}

export const checkIfValidIP = (str: string) => {
  // Regular expression to check if string is a IP address
  const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi

  return regexExp.test(str)
}
