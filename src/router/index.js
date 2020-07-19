import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const originPush = VueRouter.prototype.push 
const originReplace = VueRouter.prototype.replace 

VueRouter.prototype.push  = function(location,onResolved,onrejected){
  if(onResolved===undefined && onrejected===undefined){
    return originPush.call(this,location).catch(()=>{})
  }else{
    return originPush.call(this,location,onResolved,onrejected)
  }
}
VueRouter.prototype.replace  = function(location,onResolved,onrejected){
  if(onResolved===undefined && onrejected===undefined){
    return originReplace.call(this,location).catch(()=>{})
  }else{
    return originReplace.call(this,location,onResolved,onrejected)
  }
}

import routes from '@/router/routes'

export default new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})