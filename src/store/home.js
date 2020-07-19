import {reqCategoryList,reqBannerList,reqFloorList} from '@/api'
const state = {
  categoryList:[],
  bannerList:[],
  floorList:[]//创建一个空数组准备接收数据
}
const mutations ={
  //修改数据
  RECEIVECATEGORYLIST(state,categoryList){
    state.categoryList = categoryList
  },
  RECEIVEBANNERLIST(state,bannerList){
    state.bannerList = bannerList
  },
  RECEIVEFLOORLIST(state,floorList){
    state.floorList = floorList
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



  async getCategoryList({commit}){
    const result = await reqCategoryList()
    if(result.code === 200){//如果状态码为200
      commit('RECEIVECATEGORYLIST',result.data)//获取data数据给mutations
    }
  },
  async getBannerList({commit}){
    const result = await reqBannerList()
    if(result.code === 200){//如果状态码为200
      commit('RECEIVEBANNERLIST',result.data)//获取data数据给mutations
    }
  },
  async getFloorList({commit}){
    const result = await reqFloorList()
    if(result.code === 200){//如果状态码为200
      commit('RECEIVEFLOORLIST',result.data)//获取data数据给mutations
    }
  }
}
const getters = {
  bannerList(state){
    return state.bannerList
  }
}


export default {
  state,
  mutations,
  actions,
  getters
}
  