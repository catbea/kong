<template>
  <div class="detail-photo-page">
    <!-- <full-screen :info="info"></full-screen> -->
    <!-- <full-screen :info="communityList"></full-screen>
    <full-screen :info="effectList"></full-screen> -->
    <ul>
      <p>{{templateData.groupName}} ({{templateData.listBannerVO.length}})</p>
      <div class="template-box">
        <li tag="li" to="/" class="bg_img" :style="{backgroundImage:'url('+item.imgUrl+')'}" 
         v-for="(item,index) in templateData.listBannerVO" :key="index" @click="templateClick()"></li>
      </div>   
    </ul>
    <ol>
      <p>{{effectData.groupName}} ({{effectData.listBannerVO.length}})</p>
      <div class="effect-box">
        <li class="bg_img" :style="{backgroundImage:'url('+item.imgUrl+')'}" 
        v-for="(item,index) in effectData.listBannerVO" :key="index" @click="effectClick()"></li>
      </div> 
    </ol>
    <div class="community-box">
      <p>{{communityData.groupName}} ({{communityData.listBannerVO.length}})</p>
      <div class="community-box-content">
        <span class="bg_img" :style="{backgroundImage:'url('+item.imgUrl+')'}" 
        v-for="(item,index) in communityData.listBannerVO" :key="index" @click="communityClick()"></span>
      </div> 
    </div>
  </div>
</template>
<script>
import { ImagePreview } from 'vant'
import FullScreen from './FullScreen'
import MarketService from 'SERVICE/marketService'
export default {
  created() {
    this.linkerId=this.$route.params.id
    console.log(this.linkerId,'路由参数')
    this.getMarketDetailPhotoInfo()
  },
  data: () => ({
    linkerId:null,
    templateData:null,
    templateList:[],
    templateArr:[],
    effectData: null,
    effectList:[],
    effectArr:[],
    communityData:null,
    communityList:[],
    communityArr:[],
    show: false
  }),
  components: {
    // FullScreen
  },
  methods: {
    templateClick() {
      ImagePreview({
  images:this.templateArr,
  startPosition: 0,
  onClose() {
    // do something
  }
});
    },
    effectClick() {
      ImagePreview({
  images:this.effectArr,
  startPosition: 0,
  onClose() {
    // do something
  }
});
    },
    communityClick() {
      ImagePreview({
  images:this.communityArr,
  startPosition: 0,
  onClose() {
    // do something
  }
});
    },
    aPhotoList(n,arr){
      for (let index = 0; index < n.length; index++) {
        const element = n[index];
        arr.push(element.imgUrl) 
      }
    },
    async getMarketDetailPhotoInfo(){
      const res = await MarketService.getMarketDetailPhoto(this.linkerId)
      console.log(res,"相册数据")
      this.templateData=res[0]
      this.templateList=this.templateData.listBannerVO 
      this.aPhotoList(this.templateList,this.templateArr)
      this.effectData=res[1]
      this.effectList=this.effectData.listBannerVO
      this.aPhotoList(this.effectList,this.effectArr)
      this.communityData=res[2]
      this.communityList=this.communityData.listBannerVO
      this.aPhotoList(this.communityList,this.communityArr)
    }
  }
}
</script>
<style lang="less">
.van-swipe-item{
    background:#ffffff;
  }
.detail-photo-page {
  width: 375px;
  height: 100%;
  background: #ffffff;
  p {
    font-size: 20px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
  }
  .community-box-content,
  .template-box,
  .effect-box {
    display: flex;
    flex-wrap: wrap;
  }
  ul,
  ol,
  .community-box {
    margin: 19px 0 0 15px;
    li,
    span {
      margin: 0 4px 4px 0;
      width: 83px;
      height: 83px;
    }
  }
}
</style>
