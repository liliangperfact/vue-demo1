<template>
  <div class="pagination">
    <button :disabled="currentPageNum === 1" 
    @click="$emit('changePage',currentPageNum - 1)">上一页</button>
    <button 
      v-show="startEnd.start > 1" 
      :class="currentPageNum === 1"
       @click="$emit('changePage',1 )"
      >1</button>
    <button v-show="startEnd.start > 2">···</button>

    <button 
      v-for="page in startEnd.end" :key="page" 
      v-if="page >= startEnd.start"
      :class="{active:page === currentPageNum}"
      @click="$emit('changePage',page)"
      >{{page}}
    </button>


    
    <!-- v-for="page in startEnd.end" :key="page"
    v-if="page >= startEnd.start"
    :class="{active:page === currentPageNum}"
     @click="$emit('changePage',page)"
    >{{page}}
    </button> -->

    <button v-show="startEnd.end < totalPage-1">···</button>
    <button v-show="startEnd.end < totalPage" 
    :class="{active:currentPageNum === totalPage}"
    @click="$emit('changePage',totalPage)"
    >{{totalPage}}</button>
    <button :disabled="currentPageNum === totalPage"  
    @click="$emit('changePage',currentPageNum + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    continueNum: {
      type: Number,
      default: 5
    }
  },
  computed:{
    //总页数
    totalPage(){
      return Math.ceil(this.total / this.pageSize)
    },
    //计算连续页的起始和结束
    startEnd(){
      let {currentPageNum,continueNum,totalPage} = this//解构赋值
      let start//定义start对象
      let end//定义end对象
      let disNum//定义disNum对象
      if(totalPage <= continueNum){//如果总页数小于连续页，
        start = 1//则初始页为1
        end = totalPage//结束页为总页数
      }else{
        //正常情况
        start = currentPageNum - Math.floor(continueNum / 2) //初始页等于当前页减去连续页除2向下取整
        end = currentPageNum + Math.floor(continueNum / 2)//结束页等于当前页加上连续页除2向下取整
        //左边界限制
        if(start <= 1) {//如果初始页小于等于1，则
          disNum = 1- start//如果很绕，则带数字进去串
          start += disNum
          end += disNum
        }
        //右边界限制
        if(end >= totalPage){//如果结束页大于等于总页数，则
          disNum = end - totalPage
          start -= disNum//初始页减
          end -= disNum
        }
      }
      return {
        start,end//返回start和end的结果
      }
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>