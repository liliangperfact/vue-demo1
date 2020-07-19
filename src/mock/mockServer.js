import Mock from 'mockjs'
// import banner from '@/mock/banner'
// import floor from '@/mock/floor'
import banner from './banner.json'  //json数据被引入之后会变为真正的数组，不再是json串了
import floor from './floor.json' 

Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})