<template>
  <div class="family-list-page">
    <div v-show="!showPreview">
      <van-tabs v-model="activeIndex" color="#007AE6" :line-width="15" :swipe-threshold="6" sticky animated class='wrap'>
          <van-tab v-for="(item,index) in tabs" :key="index" :title="item.houseType" >
           <div class="list-wrap">
             <keep-alive>
              <div class="family-list-page-box">
              <div class="content" v-for="(itemA,indexA) in item.cpHouseTypeDetail" :key="indexA"  @click.stop="photoHandle(itemA.imgUrl)">
              <div class="big-box">
              <div class="bg_img family-list-page-box-left" :style="{backgroundImage:'url('+itemA.imgUrl+')'}">
                    
              </div>
              <ul class="family-list-page-box-center">
                <li>{{itemA.householdDesc}}</li>
                <li v-if="itemA.orientations=='暂无信息'">建面 {{itemA.area}} 暂无朝向信息</li>
                <li v-else>建面 {{itemA.area}} {{itemA.orientations}}朝向</li>
                <li>
                  <div class="tag-item"  :class="styleColor[indexA]"  ref="text">{{saleStatus[itemA.saleStatus]}}</div>
                </li>
                <li><span v-if="itemA.price.indexOf('起')=== -1">约</span>{{itemA.price}}</li>
              </ul>
              </div>
              <div class="family-list-page-box-right">
                <a v-if="itemA.ifPanorama==1" :href=itemA.linkerUrl><p class="bg_img" :style="{backgroundImage:'url('+panorama+')'}"></p></a>
                <span class="bg_img" :style="{backgroundImage:'url('+leave+')'}"></span>
              </div>
              </div>
            </div>
          </keep-alive>
           </div>
          </van-tab>
      </van-tabs>
    </div>
    
      <div class="img-preview" v-if="showPreview" @click="hidePreview">
        <div class="title">{{imgData.householdDesc}}</div>
        <div class="img-box">
          <van-swipe @change="onChange" :initial-swipe="current" :loop="false" :show-indicators="false">
            <van-swipe-item v-for="(item,index) in imgList" :key="index">
              <img :src="item" alt="" srcset="">
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="custom-indicator">
          {{ current + 1 }}/{{imgList.length}}
        </div>
      </div>
  </div>
</template>
<script>
import { ImagePreview } from 'vant'
import marketService from 'SERVICE/marketService'
export default {
  components: {},
  created() {
    this.linkerId = this.$route.params.id
    this.getHouseTypeInfo(this.linkerId)
  },
  data: () => ({
    instance: null,
    photoList: [],
    linkerId: '13f8c005b5c6440ea1ba2a0d9341e56c',
    num: null,
    tabs: [],
    saleStatus: { '0': '热销中', '1': '即将发售', '3': '售罄' },
    style: {
      background: 'rgba(143, 159, 177, 0.15)',
      color: '#5C5F66'
    },
    activeIndex: 0,
    loading: false,
    finished: false,
    panorama: require('IMG/marketDetail/quanj@2x.png'),
    leave: require('IMG/marketDetail/arrow2.png'),
    info: ['热销中', '全景看房'],
    current: 0,
    showPreview: false
  }),
  computed: {
    styleColor() {
      if (this.tabs) {
        return this.tabs[this.activeIndex].cpHouseTypeDetail.map(item => {
          if (item.saleStatus === '0') {
            return 'blue'
          } else if (item.saleStatus === '1') {
            return 'orange'
          } else {
            return 'gary'
          }
        })
      }
    },
    imgList() {
      let imgs = []
      this.tabs.length && this.tabs[0].cpHouseTypeDetail.forEach(item => {
        imgs.push(...item.imgUrlList)
      })
      return imgs
    },
    imgData() {
      let data = {}
      if(this.tabs.length){
        this.tabs.length && this.tabs[0].cpHouseTypeDetail.forEach(item => {
          if(item.imgUrlList.indexOf(this.imgList[this.current]) > -1) {
            data = item
          }
        })
      }
      return data
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.instance) {
      this.instance.close()
    }
    next()
  },
  methods: {
    // 预览图片切换
    onChange (index) {
      this.current  = index 
    },
    // 显示图片预览
    showPreviewFn () {
      this.showPreview = true
    },
    // 隐藏预览
    hidePreview () {
      this.showPreview = false
    },
    photoHandle(url) {
      this.current = this.imgList.indexOf(url) || 0
      this.showPreviewFn()
      //查看户型相册
      // for (let index = 0; index < n.length; index++) {
      //   const element = n[index]
      //   this.photoList.push(element)
      // }
      // this.instance = ImagePreview({
      //   images: this.photoList,
      //   startPosition: 0
      // })
      // this.photoList = []
    },
    async getHouseTypeInfo(n) {
      const res = await marketService.getHouseType(n)
      this.tabs = res
    }
  }
}
</script>
<style lang="less">
.family-list-page {
  display: flex;
  height: 100%;
  flex-direction: column;
  background: #ffffff;
  .list-wrap {
    width: 100%;
    height: 623px;
    overflow-y: auto;
  }
  .family-list-page-box {
    width: 375px;
    // height: 100%;
    display: flex;
    flex-direction: column;
    .content {
      width: 343px;
      height: 107px;
      margin: 16px 0px 0 16px;
      border-bottom: 1px solid #eeeeee;
      display: flex;
      justify-content: space-between;
    }
    .big-box {
      display: flex;
    }
    .family-list-page-box-left {
      width: 120px;
      height: 90px;
    }
    .family-list-page-box-center {
      margin-left: 11px;
      li:nth-of-type(1) {
        margin-bottom: 11px;
        font-size: 16px;

        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 16px;
      }
      li:nth-of-type(2) {
        margin-bottom: 9px;
        font-size: 12px;

        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 12px;
      }
      li:nth-of-type(3) {
        .blue {
          background: rgba(0, 122, 230, 1);
          color: #ffffff;
        }
        .orange {
          background: orange;
          color: #ffffff;
        }
        .gary {
          background: rgba(143, 159, 177, 0.15);
          color: #5c5f66;
        }
        margin-bottom: 9px;
        display: flex;
        flex-wrap: wrap;
        .tag-item {
          white-space: nowrap;
          font-size: 12px;
          margin: 0 -5px;
          transform: scale(0.85);
          margin: 1px 4px 1px -6px;
          padding: 1px 5px;
          border-radius: 3px;
          height: 15px;
          line-height: 15px;
        }
      }
      li:nth-of-type(4) {
        font-size: 15px;

        font-weight: 600;
        color: rgba(234, 77, 46, 1);
        line-height: 15px;
      }
    }
    .family-list-page-box-right {
      display: flex;
      margin-top: 37px;
      p {
        width: 28px;
        height: 15px;
      }
      span {
        margin: 2px 0 0 4px;
        width: 12px;
        height: 12px;
      }
    }
  }
  .img-preview{
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    // align-items: center;
    // justify-content: center;
    .title{
      height: 80px;
      line-height: 80px;
      padding: 0 20px;
      font-size:24px;
      color:rgba(51,51,51,1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      box-shadow: border-box;
    }
    .img-box{
      flex: 1;
      display: flex;
      flex-direction: column;
      margin: 0 20px;
      text-align: center;
      .van-swipe{
        height: 100%;
      }
      .van-swipe-item{
        line-height: 100%;
        vertical-align: middle;
        img{
          min-width: 100%;
          min-height: 100%;
          object-fit: cover;
        }
      }
      
    }
    .custom-indicator{
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      text-align: center;
      font-size:16px;
      color:rgba(51,51,51,1);
    }
  }
}
</style>
