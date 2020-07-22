import Ajax from '@/ajax/Ajax'
import mockAjax from '@/ajax/mockAjax'
export const reqCategoryList = () => Ajax({
  url:'/product/getBaseCategoryList',
  methods:'GET'
})
export const reqBannerList = () => mockAjax.get('/banner')
export const reqFloorList = () => mockAjax.get('/floor')

// search
export const reqGoodsList = (searchParams) => Ajax.post('/list',searchParams)


///api/item/{ skuId }详情页
//export const reqGoodsDetailInfo = (skuId) => Ajax.get('/list/${skuId}')
export const reqGoodsDetailInfo = (skuId) => Ajax.get(`/item/${ skuId }`)
//购物车
export const reqAddOrUpdateShopCart = (skuId,skuNum) => Ajax.post(`/cart/addToCart/${ skuId }/${ skuNum }`)

export const reqShopCartList = () => Ajax.get(`/cart/cartList`)

//请求修改选中购物车列表数据 /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateIsChecked = (skuID,isChecked) => Ajax.get(`/cart/checkCart/${skuID}/${isChecked}`)
// export const reqCheckCartItem = (skuId, isChecked) => ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)

//注册
export const reqRegister = (userInfo) => Ajax.post(`/user/passport/register`,userInfo)



//user/passport/logout
export const reqLogin = (userInfo) => Ajax.post(`/user/passport/login`,userInfo)

//user/passport/logout
export const reqLogout = () => Ajax.get(`/user/passport/logout`)

//cart/deleteCart/{skuId}删除
export const reqDeleteCart = (skuId) => Ajax.delete(`/cart/deleteCart/${skuId}`)
