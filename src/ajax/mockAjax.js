import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const service = axios.create({
  baseURL:'/mock',
  timeout:20000
})
service.interceptors.request.use(config =>{
  Nprogress.start()
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