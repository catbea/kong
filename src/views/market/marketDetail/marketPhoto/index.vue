<template>
  <div class="detail-photo-page">
    <ul v-for="(item,index) in photoData" :key="item.groupId">
      <p>{{item.groupName}} ({{item.listBannerVO.length}})</p>
      <div class="template-box">
        <li class="bg_img" v-for="(ite,inde) in item.listBannerVO" :key="ite.id"
        :style="{backgroundImage:'url('+ite.imgUrl+')'}" @click="previewHandle(item.listBannerVO,inde)"></li>
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
    // await this.pushHandle()
  },
  data: () => ({
    one: 0,
    two: 0,
    three: 0,
    arr: null,
    linkerId: null,
    photoData: null,
    show: false,
    templetList: [],
    resultList: [],
    deployList: [],
    reloadStatus: false,
    preview: '',
    inde: 0,
    listBannerVO: ''
  }),
  components: {
    // FullScreen
  },
  beforeRouteLeave(to, from, next) {
    if (this.arr) {
      this.arr.close()
    }
    next()
  },
  methods: {
    async getMarketDetailPhotoInfo() {
      const res = await marketService.getMarketDetailPhoto(this.linkerId)
      this.photoData = res
    },
    previewHandle(listBannerVO, inde) {
      this.listBannerVO = listBannerVO
      this.inde = inde
      //预览图片
      this.arr = []
      for (let i = 0; i < listBannerVO.length; i++) {
        const element = listBannerVO[i].imgUrl
        this.arr.push(element)
      }
      this.preview = ImagePreview({
        images: this.arr,
        startPosition: inde,
        onClose() {
          // do something
        }
      })
    },
    orientationchange () {
      if (window.orientation === 180 || window.orientation === 0) {
        if (this.reloadStatus) {
          this.preview && this.preview.close()
          if (this.listBannerVO) {
            this.$nextTick(() => {
              this.previewHandle(this.listBannerVO, this.inde)
              this.listBannerVO = ''
            })
          }
          
        }
        this.$dialog.close()
      }
      if (window.orientation === 90 || window.orientation === -90 ){
          this.$dialog.alert({message: '您横屏了，竖屏操作体验更佳！'}).then(() => {
            if (window.orientation === 90 || window.orientation === -90) {
              this.reloadStatus = true
            }
          })
      }
    }
  },
  mounted () {
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", this.orientationchange, false)
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
