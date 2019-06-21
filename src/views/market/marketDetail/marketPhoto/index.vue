<template>
  <div class="detail-photo-page" v-if="photoData">
    <div class="tab-cnt">
      <div class="tab-box">
        <div class="tab-tags">
          <p class="item" :class="{'active': index === tabIndex}" v-for="(option,index) in photoData" :key="index" @click="goAnchor('#anchor-' + index, index)"> {{option.groupName}} ({{option.listBannerVO.length}})</p>
        </div>
      </div>
    </div>
    
    <div class="photo-box" v-show="!showPreview">
      <ul v-for="(item,index) in photoData" :key="item.groupId" :id="'anchor-' + index">
        <p>{{item.groupName}} ({{item.listBannerVO.length}})</p>
        <div class="template-box">
          <li class="bg_img" v-for="(ite,inde) in item.listBannerVO" :key="ite.id"
          :style="{backgroundImage:'url('+ite.imgUrl+')'}" @click="previewHandle(item.listBannerVO,inde,index)"></li>
        </div>   
      </ul>
    </div>
    <!-- 图片预览 -->
    <div class="img-preview" v-if="showPreview" @click="hidePreview">
      <div class="img-box">
        <van-swipe @change="onChange" :initial-swipe="currentIndex" :loop="false" :show-indicators="false">
          <van-swipe-item v-for="(item,index) in arr" :key="index">
            <img :src="item" alt="" srcset="">
          </van-swipe-item>
        </van-swipe>
        <div class="custom-indicator">
          {{ currentIndex + 1 }}/{{totalImg}}
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
import { ImagePreview, Toast } from 'vant';
import marketService from 'SERVICE/marketService'
export default {
  async created() {
    this.linkerId = this.$route.query.id
    await this.getMarketDetailPhotoInfo()
    // await this.pushHandle()
  },
  data: () => ({
    one: 0,
    two: 0,
    three: 0,
    arr: [],
    linkerId: null,
    photoData: null,
    show: false,
    templetList: [],
    resultList: [],
    deployList: [],
    reloadStatus: false,
    preview: '',
    inde: 0,
    listBannerVO: '',
    tabIndex: '',
    showPreview: false,
    currentIndex : 0
  }),
  components: {
    // FullScreen
  },
  beforeRouteLeave(to, from, next) {
    // if (this.preview) {
    //   this.preview.close()
    // }
    if (this.showPreview) {
      this.showPreview = false
      return next(false)
    } else {
      next()
    }
  },
  methods: {
    // 预览图片切换
    onChange (index) {
      this.currentIndex  = index
      this.changeTabindex(index)
    },
    // tab栏切换
    changeTabindex (index) {
      let current = 0
      for (let i = 0; i < this.photoData.length; i++) {
        current += this.photoData[i].listBannerVO.length
        if (current > index) {
          this.tabIndex = i
          break
        }
      }
    },
    // 隐藏预览
    hidePreview () {
      this.showPreview = false
    },
    goAnchor (selector, index) {
      this.currentIndex = 0
      for (let i = 0; i < index; i++) {
        this.currentIndex += this.photoData[i].listBannerVO.length
      }
      this.tabIndex = index
      this.showPreview = true
      this.$nextTick(()=>{
        let anchor = this.$el.querySelector(selector)
        document.querySelector('.photo-box').scrollTop = anchor.offsetTop - 70
      })
      
    },
    async getMarketDetailPhotoInfo() {
      const res = await marketService.getMarketDetailPhoto(this.linkerId)
      this.photoData = res
    },
    previewHandle(listBannerVO, inde, index) {
      this.listBannerVO = listBannerVO
      this.currentIndex = inde
      for (let i = 0; i < index; i++) {
        this.currentIndex += this.photoData[i].listBannerVO.length
      }
      this.changeTabindex(this.currentIndex)
      this.showPreview = true
    },
    orientationchange () {
      if (window.orientation === 180 || window.orientation === 0) {
        this.preview && this.preview.close()
        if (this.listBannerVO) {
          setTimeout(() => {
            this.previewHandle(this.listBannerVO, this.inde)
            this.listBannerVO = ''
          },500)
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
  },
  computed: {
    totalImg () {
      let total = 0
      if (this.photoData.length) {
        this.photoData.forEach(el => {
          total += el.listBannerVO.length
          for (let i = 0; i < el.listBannerVO.length; i++) {
            this.arr.push(el.listBannerVO[i].imgUrl) 
          }
        })
      }
      return total
    }
  }
}
</script>

<style lang="less" scoped>
.detail-photo-page{
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  .tab-cnt{
    overflow: hidden;
  }
  .tab-box{
    height: 70px;  
    width: 100%;
    overflow-y: hidden;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar{display:none;}
    padding-bottom: 20px;
    margin-bottom: -20px;
    .tab-tags{
      min-width: 100%;
      margin: 16px 0 0 16px;
      display: flex;
      flex-wrap: nowrap;
      .item{
        flex: 0 0 auto;
        font-size: 12px;
        font-weight:400;
        height:30px;
        line-height: 30px;
        background:rgba(238,238,238,1);
        border-radius:15px;
        padding: 0 10px;
        margin-right: 10px;
        text-align: center;
        &.active{
          background-color: #007AE6;
          color: #fff;
        }
      }
    }
  }
  .photo-box{
    flex: 1;
    overflow-y: scroll;
    p {
      font-size: 20px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
    }
    .template-box {
      display: flex;
      flex-wrap: wrap;
      margin: 15px 0 24px 0;
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
  .img-preview{
    margin: 32px 16px;
    .img-box{
      height: 440px;
      background-color: #eee;
      line-height: 440px;
      position: relative;
      img{
        min-width: 100%;
        min-height: 100%;
        height: 440px;
        object-fit: contain;
      }
    }
    .custom-indicator{
      position: absolute;
      bottom: 18px;
      right: 8px;
      height: 20px;
      width: 48px;
      font-size:12px;
      font-weight: 400;
      background:rgba(0,0,0,0.4);
      border-radius:10px;
      color: rgba(255,255,255,0.6);
      text-align: center;
      line-height: 20px;
    }
  }
}
</style>


<style lang="less">
.van-image-preview__image{
  max-height: 90%!important;
  max-width: 100%!important;
}
.van-image-preview__index{
  top: 20px;
  color: #000;
}
.van-image-preview__overlay{
  background-color: rgba(255,255,255,1);
}
</style>
