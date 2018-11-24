<template>
  <div class="user-mymarket-page">
    <master-market></master-market>
    <title-bar :conf="titleInfo"></title-bar>
    <van-search :obj="searchInfo"></van-search>
  </div>
</template>
<script>
import MasterMarket from 'COMP/User/MasterMarket/'
import TitleBar from 'COMP/TitleBar/arrow.vue'
import VanSearch from 'COMP/VanSearch/'
export default {
  components:{
    MasterMarket,
    TitleBar,
    VanSearch
  },
  data:()=>({
   titleInfo:{
     title:"我的楼盘",
     linkText:"切换关闭展示楼盘",
     link:""
   },
   searchInfo:{
     siteText:"全国",
     placeholderText:"请输入楼盘"
   }
  }),
}
</script>
<style lang="less">
.user-mymarket-page{
  width:359px;
  padding-left:16px;
  height:100%;
  > div{
    width:343px;
  }
  .user-mymarket-page-search{
    height:44px;
  }
}
</style>
