<template>
  <div class="family-list-page">
    <van-tabs v-model="activeIndex" color="#007AE6" :line-width="15" :swipe-threshold="6" sticky animated class='wrap'>
          <van-tab v-for="(item,index) in tabs" :key="index" :title="item.houseType" >
           <div class="list-wrap">
             <keep-alive>
              <div class="family-list-page-box">
              <div class="content" v-for="(itemA,indexA) in item.cpHouseTypeDetail" :key="indexA">
              <div class="big-box">
              <div class="bg_img family-list-page-box-left" :style="{backgroundImage:'url('+itemA.imgUrl+')'}" @click.stop="photoHandle(itemA.imgUrlList)">
                    
              </div>
              <ul class="family-list-page-box-center">
                <li>{{itemA.householdDesc}}</li>
                <li v-if="itemA.orientations=='暂无信息'">建面 {{itemA.area}} 暂无朝向信息</li>
                <li v-else>建面 {{itemA.area}} {{itemA.orientations}}朝向</li>
                <li>
                  <div class="tag-item"  :class="styleColor[indexA]"  ref="text">{{saleStatus[itemA.saleStatus]}}</div>
                </li>
                <li>{{itemA.price}}</li>
              </ul>
              </div>
              <div class="family-list-page-box-right">
                <a v-if="itemA.linkerUrl" :href=itemA.linkerUrl><p class="bg_img" :style="{backgroundImage:'url('+panorama+')'}"></p></a>
                <span class="bg_img" :style="{backgroundImage:'url('+leave+')'}"></span>
              </div>
              </div>
            </div>
          </keep-alive>
           </div>
          </van-tab>
      </van-tabs>
  </div>
</template>
<script>
import marketService from 'SERVICE/marketService'
import { ImagePreview } from 'vant'
export default {
  components: {},
  created() {
    this.linkerId = this.$route.params.id
    this.getHouseTypeInfo(this.linkerId)
  },
  data: () => ({
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
    info: ['热销中', '全景看房']
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
    }
  },
  methods: {
    photoHandle(n) {
      //查看户型相册
      for (let index = 0; index < n.length; index++) {
        const element = n[index]
        this.photoList.push(element)
      }
      ImagePreview({
        images: this.photoList,
        startPosition: 0,
        onClose() {
          // do something
        }
      })
      this.photoList = []
    },
    async getHouseTypeInfo(n) {
      const res = await marketService.getHouseType(n)
      console.log(res, '未显示的户型数据')
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
}
</style>
