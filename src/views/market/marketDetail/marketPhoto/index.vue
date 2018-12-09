<template>
  <div class="detail-photo-page">
    <full-screen :info="info"></full-screen>
    <ul>
      <p>样板间 ({{templateList.length}})</p>
      <div class="template-box">
        <li tag="li" to="/" class="bg_img" :style="{backgroundImage:'url('+item.a+')'}" 
         v-for="(item,index) in templateList" :key="index" @click="showClick()"></li>
      </div>   
    </ul>
    <ol>
      <p>效果图 ({{effectList.length}})</p>
      <div class="effect-box">
        <li class="bg_img" :style="{backgroundImage:'url('+item.a+')'}" 
        v-for="(item,index) in effectList" :key="index" @click="showClick()"></li>
      </div> 
    </ol>
    <div class="community-box">
      <p>小区配置 ({{communityList.length}})</p>
      <div class="community-box-content">
        <span class="bg_img" :style="{backgroundImage:'url('+item.a+')'}" 
        v-for="(item,index) in communityList" :key="index" @click="showClick()"></span>
      </div> 
    </div>
  </div>
</template>
<script>
import FullScreen from './FullScreen'
export default {
  data: () => ({
    templateList: [{ a: require('IMG/dev/timg.jpg') }],
    effectList: [{ a: require('IMG/dev/timg.jpg') }],
    communityList: [{ a: require('IMG/dev/timg.jpg') }],
    show: false,
    info: {
      domShow: false,
      arr: [
        'https://720ljq2-10037467.file.myqcloud.com/linker/administrator/e05b52f4539e43c4867ae74bc852a271.jpg',
        'https://720ljq2-10037467.file.myqcloud.com/linker/administrator/e05b52f4539e43c4867ae74bc852a271.jpg',
        'https://720ljq2-10037467.file.myqcloud.com/linker/administrator/e05b52f4539e43c4867ae74bc852a271.jpg',
        'https://720ljq2-10037467.file.myqcloud.com/linker/administrator/e05b52f4539e43c4867ae74bc852a271.jpg'
      ]
    }
  }),
  components: {
    FullScreen
  },
  methods: {
    showClick() {
      ;(this.show = true), (this.info.domShow = true)
    }
  }
}
</script>
<style lang="less">
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
