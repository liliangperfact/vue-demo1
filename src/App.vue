<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-if='!$route.path.isHide'></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import {reqCategoryList} from '@/api'
export default {
  props: {},
  components: {
    Header,
    Footer,

  },
  data() {
    return {};
  },
  //methods: {},
  // mounted(){
  //   console.log('我是App')
  // }
    mounted() {
    this.getCategoryList();
  },
  methods: {//调过来是为了避免重复获取数据
    getCategoryList() {
      this.$store.dispatch("getCategoryList");
    }
  },
};
</script>
<style lang="less"	scoped>
</style>