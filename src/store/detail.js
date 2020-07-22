import {reqGoodsDetailInfo} from '@/api'
const state = {
  goodsDetailInfo:{},
 //创建一个空数组准备接收数据
}
const mutations ={
  //修改数据
  RECEIVEGOODSDETAILINFO(state,goodsDetailInfo){
    state.goodsDetailInfo = goodsDetailInfo
  }
}
const actions = {
  //异步请求数据
  // getCategoryList({commit}){//等于axios,直接获取数据，返回成功或失败
  //   reqCategoryList().then(response =>{
  //     commit('RECEIVECATEGORYLIST',response.data)
  //    // return response.data
  //   }).catch(error =>{
  //     alert('请求失败' + error.message)
  //   })
  // }
  //上面比较捞，不用



  async getGoodsDetailInfo({commit},skuId){
    const result = await reqGoodsDetailInfo(skuId)
    if(result.code === 200){//如果状态码为200
      commit('RECEIVEGOODSDETAILINFO',result.data)//获取data数据给mutations
    }
  },
  
}
const getters = {
  // bannerList(state){
  //   return state.bannerList
  // }
  categoryView(state){
    return state.goodsDetailInfo.categoryView || {}
  },
  skuInfo(state){
    return state.goodsDetailInfo.skuInfo || {}
  },
  spuSaleAttrList(state){
    return state.goodsDetailInfo.spuSaleAttrList || []
  },
  imgList(state){
    return (state.goodsDetailInfo.skuInfo || {}).skuImageList
  }
}


export default {
  state,
  mutations,
  actions,
  getters
}
  