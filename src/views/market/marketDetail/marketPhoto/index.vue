<template>
  <div class="detail-photo-page">
    <full-screen :info="info"></full-screen>
    <ul>
      <p>样板间（11）</p>
      <div class="template-box">
        <li tag="li" to="/" v-for="(item,index) in list" :key="index" @click="showClick()"></li>
      </div>   
    </ul>
    <ol>
      <p>效果图（8）</p>
      <div class="effect-box">
        <li v-for="(item,index) in list" :key="index" @click="showClick()"></li>
      </div> 
    </ol>
    <div class="community-box">
      <p>小区配置（30）</p>
      <div class="community-box-content">
        <span v-for="(item,index) in list" :key="index" @click="showClick()"></span>
      </div> 
    </div>
  </div>
</template>
<script>
import FullScreen from './FullScreen'
export default {
  data:()=>({
    list:[1,2,3,4,5,6,7,8,9,9,0,990,11,65],
    show:false,
    info:{
      domShow:false,
     arr:[
      'https://720ljq2-10037467.file.myqcloud.com/linker/administrator/e05b52f4539e43c4867ae74bc852a271.jpg',
      'https://720ljq2-10037467.file.myqcloud.com/linker/administrator/e05b52f4539e43c4867ae74bc852a271.jpg',
      'https://720ljq2-10037467.file.myqcloud.com/linker/administrator/e05b52f4539e43c4867ae74bc852a271.jpg',
      'https://720ljq2-10037467.file.myqcloud.com/linker/administrator/e05b52f4539e43c4867ae74bc852a271.jpg',
      'https://720ljq2-10037467.file.myqcloud.com/linker/administrator/e05b52f4539e43c4867ae74bc852a271.jpg',
      'https://720ljq2-10037467.file.myqcloud.com/linker/administrator/e05b52f4539e43c4867ae74bc852a271.jpg',
      'https://720ljq2-10037467.file.myqcloud.com/linker/administrator/e05b52f4539e43c4867ae74bc852a271.jpg',
    ]
    }
  }),
  components:{
    FullScreen
  },
  methods:{
    showClick(){
      this.show=true,
      this.info.domShow=true
    }
  }
}
</script>
<style lang="less">
.detail-photo-page{
  width: 375px;
  height: 100%;
  background:rgba(247,249,250,1);
  p{
    font-size:20px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:28px;
  }
  .community-box-content,.template-box,.effect-box{
      display: flex;
      flex-wrap: wrap;
  }
  ul,ol,.community-box{
    margin:19px 0 0 15px;
    li,span{
      margin: 0 4px 4px 0;
      width: 83px;
      height: 83px;
      border: 1px solid;
    }
  }
}
</style>
