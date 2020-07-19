<template>
  <div>
    <div class="type-nav">
      <div class="container">
        <div @mouseleave="moveOut" @mouseenter="isShow=true">
          <!-- 列表移入移出 -->
          <h2 class="all">全部商品分类</h2>
          <transition name="show">
            <!-- 动画 -->
            <div class="sort" v-show="isShow">
              <!-- 列表菜单隐藏与显示 -->
              <div class="all-sort-list2" @click="toSearch">
                <!-- 标签点击时间委派，父元素 -->
                <div
                  class="item"
                  v-for="(c1,index) in categoryList"
                  :key="c1.categoryId"
                  @mouseenter="moveIn(index)"
                  :class="{item_on:currentIndex === index}"
                >
                  <!-- 遍历渲染，每个行移入执行函数，样式跟随下标 -->
                  <h3>
                    <a
                      href="javascript:;"
                      :data-categoryName="c1.categoryName"
                      :data-category1Id="c1.categoryId"
                    >{{c1.categoryName}}</a>
                    <!-- 自定义属性传参 -->
                  </h3>
                  <div class="item-list clearfix">
                    <div class="subitem">
                      <dl class="fore" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                        <dt>
                          <a
                            href="javascript:;"
                            :data-categoryName="c2.categoryName"
                            :data-category2Id="c2.categoryId"
                          >{{c2.categoryName}}</a>
                        </dt>
                        <dd>
                          <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                            <a
                              href="javascript:;"
                              :data-categoryName="c3.categoryName"
                              :data-category3Id="c3.categoryId"
                            >{{c3.categoryName}}</a>
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  props: {},
  components: {},
  data() {
    return {
      currentIndex: -1, //定义标志位
      isShow: true
    };
  },
  mounted() {
    // this.getCategoryList();
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
  methods: {
    // getCategoryList() {
    //   this.$store.dispatch("getCategoryList");
    // }
    moveIn: throttle(
      function(index) {
        this.currentIndex = index; //
      },
      50,
      { trailing: false }
    ),
    moveOut() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        //如果不是home页面
        this.isShow = false;
      }
    },
    toSearch(event) {
      let data = event.target.dataset;
      console.log(data)
      
      let { categoryname, category1id, category2id, category3id } = data;

      if (categoryname) {
        let location = {
          name: "search"
        };
        let query = {};
        query.categoryName = categoryname;

        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        location.query = query;
        console.log(location);

        //点击三级分类的时候，我们也不能光关注query参数，也要去看看之前有没有params参数
        //如果有，需要把之前的params参数也带上
        let { params } = this.$route;
        if (params) {
          location.params = params;
        }
        //看是否从首页到search页
        if(this.$route.path != '/home'){
          this.$$router.replace(location)
        }else{
          this.$router.push(location);
        }
        
      }
    }
  },

  computed: {
    // ...mapState(['categoryList'])
    //错误的

    ...mapState({
      //获取的数据格式化，逐一分离出来
      categoryList: state => state.home.categoryList
    })
  }
};
</script>
<style lang="less"	scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      &.show-enter {
        height: 0;
        opacity: 0;
      }
      &.show-enter-active {
        transition: all 0.5s;
      }
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: #aaa;
            .item-list {
              display: block;
            }
          }
          &:last-of-type {
            display: none;
          }
        }
      }
    }
  }
}
</style>