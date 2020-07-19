import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'

export default[
  {
    path:'/detail/:goodsId',
    component:Detail
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/login',
    component:Login,
    meta:{
      isHide:true
    }
  },
  {
    path:'/register',
    component:Register,
    meta:{
      isHide:true
    }
  },
  {
    path:'/search/:keyword?',//可传可不传
    component:Search,
    name:'search',
    //props:route => ({kws:route.params.kws,keywords:route.query.keywords})
  },
  {
    path:'/',
    redirect:'/home'
  }
]