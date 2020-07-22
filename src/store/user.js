import {reqRegister,reqLogin,reqLogout} from '@/api'
import {getUserTempId} from '@/utils/userabout'
const state = {
  userTempId:getUserTempId(),
  userInfo:JSON.parse(localStorage.getItem('USERINFO_KEY')) || {}
}
const mutations ={
  RECEVICEUSERINFO(state,userInfo){
    state.userInfo = userInfo
  },
  RESETUSERINFO(state){
    state.userInfo = {}
  }
}
const actions = {
  async userRegister({commit},userInfo){
    const result = await reqRegister(userInfo)
    if(result.code === 200){//如果状态码为200
      return "注册成功"
    }else{
      return Promise.reject(new Error('注册失败'))
    }
  },
  async userLogin({commit},userInfo){
    const result = await reqLogin(userInfo)
    if(result.code === 200){//如果状态码为200
      //自动登录
      localStorage.setItem('USERINFO_KEY',JSON.stringify(result.data))
      console.log(result.code)

      commit('RECEVICEUSERINFO',result.data)
    }else{
      return Promise.reject(new Error('登录失败'))
    }
  },
  async userLogout({commit}){
    const result = await reqLogout()
    if(result.code === 200){//如果状态码为200
      localStorage.removeItem('USERINFO_KEY')
      commit('RESETUSERINFO')
    }else{
      return Promise.reject(new Error('退出失败'))
    }
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