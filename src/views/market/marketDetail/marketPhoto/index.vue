<template>
  <div class="detail-photo-page">
    <ul v-for="(item,index) in photoData" :key="item.groupId">
      <p>{{item.groupName}} ({{item.listBannerVO.length}})</p>
      <div class="template-box">
        <li class="bg_img" v-for="(ite,inde) in item.listBannerVO" :key="ite.id"
        :style="{backgroundImage:'url('+ite.imgUrl+')'}" @click="previewHandle(index,inde)"></li>
      </div>   
    </ul>
  </div>
</template>
<script>
import { ImagePreview } from 'vant'
import marketService from 'SERVICE/marketService'
export default {
  async created() {
    this.linkerId = this.$route.params.id
    await this.getMarketDetailPhotoInfo()
    await this.pushHandle()
  },
  data: () => ({
    linkerId: null,
    photoData: null,
    show: false,
    templetList: [],
    resultList: [],
    deployList: []
  }),
  components: {
    // FullScreen
  },
  methods: {
    async getMarketDetailPhotoInfo() {
      const res = await marketService.getMarketDetailPhoto(this.linkerId)
      console.log(res, '相册数据')
      this.photoData = res
    },
    pushHandle() {
      if (this.photoData[0]) {
        for (let index = 0; index < this.photoData[0].listBannerVO.length; index++) {
          const element = this.photoData[0].listBannerVO[index].imgUrl
          this.templetList.push(element)
        }
      }
      if (this.photoData[1]) {
        for (let index = 0; index < this.photoData[1].listBannerVO.length; index++) {
          const element = this.photoData[1].listBannerVO[index].imgUrl
          this.resultList.push(element)
        }
      }
      if (this.photoData[2]) {
        for (let index = 0; index < this.photoData[2].listBannerVO.length; index++) {
          const element = this.photoData[2].listBannerVO[index].imgUrl
          this.deployList.push(element)
        }
      }
    },
    previewHandle(index, inde) {
      //预览图片
      if (index == 0) {
        ImagePreview({
          images: this.templetList,
          startPosition: inde,
          onClose() {
            // do something
          }
        })
      }
      if (index == 1) {
        ImagePreview({
          images: this.resultList,
          startPosition: inde,
          onClose() {
            // do something
          }
        })
      }
      if (index == 2) {
        ImagePreview({
          images: this.deployList,
          startPosition: inde,
          onClose() {
            // do something
          }
        })
      }
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
  .template-box {
    display: flex;
    flex-wrap: wrap;
    margin: 15px 0 46px 0;
  }
  ul {
    margin: 19px 0 0 15px;
    li {
      margin: 0 4px 4px 0;
      width: 83px;
      height: 83px;
    }
  }
}
</style>
