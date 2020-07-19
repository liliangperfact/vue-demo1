<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            
            <li class="with-x" v-if="searchParams.categoryName">
              {{searchParams.categoryName}}
              <i @click="removeCategoryName">×</i>
            </li>
             <li class="with-x" v-if="searchParams.keyword">
              {{searchParams.keyword}}
              <i @click="removekeyword">×</i>
            </li>
             <li class="with-x" v-if="searchParams.mark">
              {{searchParams.mark.split(':')[1]}}
              <i @click="removemark">×</i>
            </li>
             <li class="with-x" v-for="(prop,index) in searchParams.props" :key="index">
              {{prop.split(':')[1]}}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector666-->
        <SearchSelector @searchForTrademark='searchForTrademark' 
        @searchForattr="searchForattr"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:sortFlag==='1'}">
                  <a href="javascript:;" @click="sortGoods(1)">综合
                    <i class="iconfont" 
                    :class="{icondown:sortType==='desc',iconup:sortType==='asc'}" 
                    v-if="sortFlag==='1'"
                    >
                    </i>
                  </a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li :class="{active:sortFlag ==='2'}">
                  <a href="javascript:;" @click="sortGoods(2)">价格
                    <i class="iconfont" 
                    :class="{icondown:sortType==='desc',iconup:sortType==='asc'}" 
                    v-if="sortFlag ==='2'"
                    >
                    </i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods,index) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="item.html" target="_blank"> -->
                      <router-link :to="`/detail/${goods.id}`">
                        <img :src="goods.defaultImg" />
                      </router-link>
                      
                    <!-- </a> -->
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >
                      {{goods.title}}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>2000</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                    >加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination
            :currentPageNum="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="goodsListInfo.total"
            :continueNum="5"
            @changePage="changePageNum"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  components: {
    SearchSelector
  },
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "2:desc",
        pageNo: 1,
        pageSize: 4,
        props: [],
        trademark: ""
      }
    };
  },
  beforeMount() {
       this.handlerSearchParams()
  },
  mounted() {
    this.getGoodsListInfo();//定义函数，发送请求
  },
  methods: {
    getGoodsListInfo() {
      this.$store.dispatch("getGoodsListInfo", this.searchParams);
    },
    //处理类别和params
    handlerSearchParams(){
      let { keyword } = this.$route.params;
      //console.log(keyword)
      let {
        categoryName,
        category1Id,
        category2Id,
        category3Id
      } = this.$route.query;

      //2、拿到的这些参数都是可能有可能没有，需要判定，但是我们这次不判定直接全部放在一个新的对象当中
      //...拆包对象，其实是浅拷贝

      let searchParams = {
        ...this.searchParams,
        keyword,
        categoryName,
        category1Id,
        category2Id,
        category3Id
      };

      //3、过滤这个对象当中没有数据的属性项
      Object.keys(searchParams).forEach(item => {
        if (!searchParams[item]) {
          delete searchParams[item];
        }
      });
      //console.log(searchParams)
      this.searchParams = searchParams;
    },
    removeCategoryName(){
      this.searchParams.categoryName = ''
      this.searchParams.pageNo = 1
      //这时categoryName已经清空，在监听里面路由已经没有了，所以下面这行代码才会跳转到没有categoryName的路由了
      this.$router.replace({name:'search',params:this.$route.params})//重新跳转，刷新params
      //this.getGoodsListInfo();
    },
    //关键词
    removekeyword(){
      this.searchParams.keyword = ''
      this.$bus.$emit('clearKeyword')
      this.searchParams.pageNo = 1
      //this.getGoodsListInfo();
      this.$router.replace({name:'search',query:this.$route.query})//重新跳转，刷新params
    },
    searchForTrademark(mark){
      // if(this.searchParams.mark !== 0 && this.searchParams.mark < 2){
      //   this.searchParams.mark = `${mark.tmId}:${mark.tmName}`
      // }
      
      this.searchParams.mark = `${mark.tmId}:${mark.tmName}`
      this.searchParams.pageNo = 1
      this.getGoodsListInfo();
    },
    removemark(){
      this.searchParams.mark = ''
      this.searchParams.pageNo = 1
      this.getGoodsListInfo();
    },
    searchForattr(attr,attrv){
      this.searchParams.props.push(`${attr.attrId}:${attrv}:${attr.attrName}`)
      this.searchParams.pageNo = 1
      this.getGoodsListInfo();
    },
    removeProp(index){
      this.searchParams.props.splice(index,1)
      this.searchParams.pageNo = 1
      this.getGoodsListInfo();
    },
    //排序
    sortGoods(sortflag){//传值
      let orginFlag = this.sortFlag//1/2
      let orginType = this.sortType//升序/降序
      let newOrder//定义一个对象
      if(sortflag === orginFlag){//如果传过来的值等于order的值，说明点击的还是原来的
        newOrder = `${sortflag}:${orginType === 'desc'?'asc':'desc'}`
        //新对象 = order的1/2:如果顺序为降序，则让它等于升序，如果是升序，则等于降序
      }else{
        newOrder = `${sortflag}:desc`//点击的不是原先的，则切换成其他的，默认为降序
        //新对象 =  传过来的flag：desc
      }
      this.searchParams.order = newOrder//新对象赋值给当前的order
      this.getGoodsListInfo();//重新发送请求
    },
    changePageNum(num){
      this.searchParams.pageNo = num
      this.getGoodsListInfo();
    }
  },
  watch:{
    $route(){
      //this.searchParams.pageNo = 1
      this.handlerSearchParams()
      this.getGoodsListInfo();
      
      //console.log(this.searchParams)
    }
  },
  computed: {
    ...mapState({
      goodsListInfo:state => state.search.goodsListInfo
      //这里的search指的是store下的search.js（search的vuex中拿到goodsListInfo的数据）
    }), //
    ...mapGetters(["goodsList"]), //
    sortFlag(){
      return this.searchParams.order.split(':')[0]
    },
    sortType(){
      return this.searchParams.order.split(':')[1]
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>