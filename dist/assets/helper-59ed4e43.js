import{q as e,S as c,p as s}from"./app-089f73da.js";const r=t=>{const a=e();c.fire({title:"Select This App?",text:`${t.name} : ${t.package_name}`,icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, Select it!"}).then(o=>{o.isConfirmed&&(a.memberData.activeApp=t,c.fire("Success!","Active App Has Been Changed.!","success").then(()=>{location.replace("/dash/app/settings")}))})},i=()=>e().memberData.activeApp!==void 0&&Object.keys(e().memberData.activeApp).length!==0,p=()=>{e().$reset()},l=()=>{s.authStore.clear(),location.reload()};export{p as a,i as c,l,r as s};
