import { reqGoodsList } from '@/api'
const state = {
  goodsListInfo:{}//创建一个空数组准备接收数据
}
const mutations ={
  //修改数据
  RECEIVEGOODSLISTINFO(state,goodsListInfo){
    state.goodsListInfo = goodsListInfo
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


  
  async getGoodsListInfo({commit},searchParams){
    const result = await reqGoodsList(searchParams)
    if(result.code === 200){//如果状态码为200
      commit('RECEIVEGOODSLISTINFO',result.data)//获取data数据给mutations
    }
  },
}
const getters = {
  attrsList(state){
    return state.goodsListInfo.attrsList || []
  },
  goodsList(state){
    return state.goodsListInfo.goodsList || []
  },
  trademarkList(state){
    return state.goodsListInfo.trademarkList || []
  }
}


export default {
  state,
  mutations,
  actions,
  getters
}
  