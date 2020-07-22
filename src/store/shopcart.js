import {reqAddOrUpdateShopCart,reqShopCartList,reqUpdateIsChecked,reqDeleteCart  } from '@/api'

const state = {
  shopCartList:[]
}
const mutations ={
  RECEIVESHOPCARTLIST(state,shopCartList){
    state.shopCartList = shopCartList
  }
}
const actions = {
  async addorUpdateShopCart({commit},{skuId,skuNum}){
    const result = await reqAddOrUpdateShopCart(skuId,skuNum)
    if(result.code === 200){//如果状态码为200
      return "添加购物车成功"
    }else{
      //return '添加失败'
      return Promise.reject(new Error('添加购物车失败'))
    }
  },
  async getShopCartList({commit}){
    const result = await reqShopCartList()
    if(result.code === 200){//如果状态码为200
      commit('RECEIVESHOPCARTLIST',result.data)
    }
  },
  async updateIsChecked({commit},{skuId,isChecked}){
    
    const result = await reqUpdateIsChecked(skuId,isChecked)
    
    console.log(result.code)
    if(result.code === 200){//如果状态码为200
      return "修改购物车成功"
    }else{
      //return '添加失败'
      
      return Promise.reject(new Error('修改购物车失败'))
    }
  },
  updateAllIsChecked({commit,state,dispatch},isChecked){
    let promises = []
    state.shopCartList.forEach(item => {
      if(item.isChecked===isChecked) return
      // if(item.isChecked!==isChecked){
        let promise = dispatch('updateIsChecked',{skuId:item.skuId,isChecked:isChecked})
        promises.push(promise)
     // }
    })
    return Promise.all(promises)
    
  },
  async deleteCart({commit},skuId){
    const result = await reqDeleteCart(skuId)
    if(result.code === 200){//如果状态码为200
      return "删除成功"
    }else{ 
      return Promise.reject(new Error('删除失败'))
    }
  },
  deleteChecked({commit,dispatch}){
    let promises = []
    state.shopCartList.forEach(item => {
      if(!item.isChecked) return
      let promise = dispatch('deleteCart',item.skuId)
      promises.push(promise)
    })
    return Promise.all(promises)
  },
}
const getters = {

}


export default {
  state,
  mutations,
  actions,
  getters
}
  