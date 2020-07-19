<template>
  <div>
    <div class="swiper-container" ref="banner">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(banner,index) in bannerList" :key="banner.id">
          <img :src="banner.imgUrl" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper';  
import 'swiper/css/swiper.min.css'
export default {
  name: "SliderLoop",
  props: ['bannerList'],
  components: {},
  data() {
    return {};
  },
  methods: {},
  watch:{
    bannerList:{
      handler(){
        this.$nextTick(() => {
          new Swiper (this.$refs.banner, {
            //direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            
            // 如果需要滚动条
            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },
          }) 
        })
      },
      immediate:true
    }
  }
};
</script>
<style lang="less"	scoped>
</style>