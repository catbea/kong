<template>
  <div class="historicalArticles-page">
    <div class="historicalArticles-content" v-show="articles=='2'">
      <div class="historicalArticles-title">
      共{{total}}文章
      <span class="historicalArticles-title-right"><router-link  to='/user/articles/updateArticles'>编辑</router-link></span>
    </div>
      <discover-list :data="historyList"></discover-list>
    </div>
    <div class="historicalArticles-null" v-show="articles== '1'">
      <null-articles :nullIcon="nullIcon" :nullcontent="nullcontent"></null-articles>
    </div>
  </div>
</template>
<script>
import discoverList from 'COMP/Discover/discoverList'
import nullArticles from 'COMP/Null'
import userService from 'SERVICE/userService'
export default {
 components: {
   discoverList,
    nullArticles,
   

  },
  data(){
    return{
      articles:'2',
      nullIcon:require('IMG/user/collection/Article@2x.png'),
      nullcontent:'暂无历史文章',
      historyList:[],
      total:0,
    }
  },
  created() {
    this.gethistoryList()
  },
  methods:{
    async gethistoryList () {
      const res = await userService.gethistoryList()
      this.historyList = res.records
      this.total = res.total
    },
  }
}
</script>
<style lang="less">
.historicalArticles-page {
  background: #ffffff;
  > .historicalArticles-content{
 > .historicalArticles-title {
    font-size: 14px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 16px;
    margin: 17px 16px 0 16px;

    > .historicalArticles-title-right {
      font-size: 13px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 16px;
      float: right;
    }
  }
  }
  > .historicalArticles-null{

  }
 
}
</style>
