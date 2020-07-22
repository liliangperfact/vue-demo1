import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
const service = axios.create({
  baseURL:'/api',
  timeout:20000
})
//拦截开始
service.interceptors.request.use(config =>{
  Nprogress.start()
  //临时ID
  let userTempId = store.state.user.userTempId
  if(userTempId){
    config.headers.userTempId = userTempId
  }
  //token
  let token = store.state.user.userInfo.token
  if(token){
    config.headers.token = token
  }

  return config
})
service.interceptors.response.use(
  response =>{
    Nprogress.done()
    return response.data
  },
  error =>{
    Nprogress.done()
    alert('请求出错'+error.message || "未知错误")
    return new Promise(()=>{})
  }
)
export default service