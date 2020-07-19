import Ajax from '@/ajax/Ajax'
import mockAjax from '@/ajax/mockAjax'
export const reqCategoryList = () => Ajax({
  url:'/product/getBaseCategoryList',
  methods:'GET'
})
export const reqBannerList = () => mockAjax.get('/banner')
export const reqFloorList = () => mockAjax.get('/floor')
// console.log(111)  
// console.log(reqBannerList())
// console.log(111)
export const reqGoodsList = (searchParams) => Ajax.post('/list',searchParams)


///api/item/{ skuId }
//export const reqGoodsDetailInfo = (skuId) => Ajax.get('/list/${skuId}')
export const reqGoodsDetailInfo = (skuId) => Ajax.get(`/item/${ skuId }`)