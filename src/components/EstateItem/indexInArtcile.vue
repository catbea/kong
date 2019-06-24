<template>
  <div>
    <div class=" estate-item" :class="itemBorder&&'van-hairline--bottom'" :style="{paddingBottom:(info&&info.divisionRules)&&'15px', borderBottom: !preview&& '1px solid rgba(177,189,210,0.5)',border: preview&& '1px solid rgba(177,189,210,0.5)'}">
      <div class="main-continer" @click="mainAreaClickHandler" v-if="info">
        <div class="bg_img left-box" :style="{backgroundImage:'url(' + ((info&&info.linkerUrl) ? info.linkerUrl : (info&&info.headImgUrl) ? info.headImgUrl : '') + ')'}">
          <img class="panorama-mark" :src="panoramaImg" v-if="info&&info.ifPanorama">
        </div>
        <div class="right-box">
          <h5 class="estate-name">
            <span :class="{'estate-name-box':isInArticle==1}">
              <!-- <span class="free" v-if="info.isFree&&isInArticle!=1&&isInArticle!=0">免费</span> -->
              {{info&&info.linkerName}}
            </span> 
            <span v-if="info.saleStatus==0&&isInArticle==1" class="house-sale-status" style="background: rgba(0, 122, 230, 1);color: #FFFFFF">热销中</span>
            <span v-if="info.saleStatus==1&&isInArticle==1" class="house-sale-status" style="background: rgba(234, 77, 46, 0.1);color: #EA4D2E">即将发售</span>
            <span v-if="info.saleStatus==3&&isInArticle==1" class="house-sale-status" style="background: rgba(143, 159, 177, 0.15);color: #5C5F66">售罄</span>
          </h5>
          <p class="estate-location">{{`${info&&info.city} ${info&&info.district?info.district:''}`}}</p>
          <!-- <tag-group class="tag-box" v-if="isInArticle==1" :arr="this.info&&this.info.projectTagArr" /> -->
          <tag-group class="tag-box" :arr="this.info&&this.info.linkerTags||this.info&&this.info.projectTagArr" />
          <div class="estate-info">
            <p class="estate-price" v-if="info.price==='0 万元/套起' || info.price==0 || info.price=='0 元/㎡'">价格待定</p>
            <p class="estate-price" v-else>{{info&&info.price}}{{info&&info.priceUnit}}</p>
            <p class="estate-area">{{info&&info.buildArea ? `建面${info.buildArea}${info.buildArea.indexOf('㎡') > -1 ? '':'㎡'}`:'建面暂无'}}</p>
          </div>
        </div>
      </div>
      <div class="operate-box">
        <div class="share-icon" v-if="conf.op === 'share'" @click.stop="shareHandler">
          <i style="color:#999999;font-size:16px;" class="icon iconfont icon-Building_list_share"></i>
        </div>
      </div>
      <div class="commission-box" v-if="showRules&&info&&info.divisionRules">
        <img :src="commissionImg" class="bottom-view-img">
        <span>{{info&&info.divisionRules | textOver}}</span>
      </div>
    </div>
    <div class="specialOffer" v-if="info&&info.promotionalLanguage||info&&info.sale">
      <p class="offer1" v-if="info.promotionalLanguage"><img :src="offerTeIMg" width="16" height="16" alt="">{{info.promotionalLanguage}}</p>
      <p class="offer2" v-if="info.sale"><img :src="offerHuiIMg" width="16" height="16" alt="">{{info.sale}}</p>
    </div>
    <div class="house-activity-poster" v-if="showCard && info&&info.cpActivityVo">
      <img class="img" :src="info.cpActivityVo.imgUrl">
      <p class="info"><span class="title">{{info.cpActivityVo.name}}</span> <span class="btn">立即领取</span></p>
    </div>
  </div>
</template>
<script>
import TagGroup from 'COMP/TagGroup'
export default {
  props: {
    info: { type: Object },
    showRules: { type: Boolean, default: true },
    itemBorder: { type: Boolean, default: false },
    showCard: {type: Boolean, default: false},
    isInArticle:{ type: Number, default: 0 },
    preview: { type: Boolean, default: false },
    conf: {
      type: Object,
      default: () => {
        return {
          op: ''
        }
      }
    }
  },
  components: {
    TagGroup
  },
  created() {
    console.log(this.info);
  },
  data: () => ({
    offerTeIMg:require('IMG/discover/te.png'),
    offerHuiIMg:require('IMG/discover/hui.png'),
    panoramaImg: require('IMG/system/icon_panorama@2x.png'),
    commissionImg: require('IMG/user/collection/icon_commission@2x.png')
  }),
  methods: {
    mainAreaClickHandler() {
      this.$emit('click', this.info)
    },
    shareHandler() {
      this.$emit('share', this.info)
    }
  }
}
</script>
<style lang="less" scoped>
.specialOffer{
  padding: 12px 16px;
  border: 1px solid rgba(177, 189, 210, 0.5);
  border-top: 0;
  p{
    display: flex;
    display: -webkit-box-flex;
    align-items: center;
    overflow : hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 14px;
    img{
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
  }
  .offer1{color: #13284D;margin-bottom: 8px;}
  .offer2{color:#EA4D2E}
}
.estate-item {
  position: relative;
  overflow: hidden;
  line-height: 1;
  width: 100%;
  // border:1px solid rgba(177,189,210,0.5);
  > .main-continer {
    word-wrap: none;
    display: flex;
    > .left-box {
      position: relative;
      background-color: #999999;
      border-radius: 6px;
      width: 120px;
      min-width: 120px;
      height: 90px;
      margin: 15px;
      flex-basis: 120px;
      > .panorama-mark {
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        width: 32px;
        height: 32px;
        object-fit: cover;
      }
    }
    > .right-box {
      flex-basis: 225px;
      margin: 16px 16px 16px 0;
      > .estate-name {
        display: flex;
        // justify-content: space-between;
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        font-weight: 600;
        color: #333333;
        margin-bottom: 8px;
        .free{
          display: inline-block;
          font-size: 10px;
          height:14px;
          line-height: 14px;
          background:rgba(234,77,46,1);
          color: #fff;
          border-radius: 2px;
          margin-right: 2px;
          padding: 0 5px;
          vertical-align: top;
        }
        .estate-name-box{
          display: inline-block;
          flex: 1;
          max-width: 3.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }      
        .house-sale-status{
          display: inline-block;
          white-space: nowrap;
          font-size: 10px;
          padding: 2px 4px;
          border-radius: 1px;          
          max-height: 16px;
          line-height: 1.4;
          color: #fff;
          background: #EA4D2E
        }

      }
      > .estate-location {
        font-size: 12px;
        font-weight: 400;
        color: #666666;
        padding-top: 1px;
        padding-bottom: 3px;
      }
      > .tag-box {
        padding: 3px 0;
        margin-left: -5px;
      }
      > .estate-info {
        white-space: nowrap;
        line-height: 22px;
        display: flex;
        padding-top: 2px;
        > p {
          display: inline-block;
        }
        > .estate-price {
          color: #ea4d2e;
          font-size: 15px;
          font-weight: 600;
          padding-right: 12px;
          font-family: PingFangSC-Semibold;
        }
        > .estate-area {
          font-size: 12px;
          font-weight: 400;
          color: #999999;
          flex: 1;
          font-family: PingFangSC-Regular;
        }
      }
    }
  }
  > .operate-box {
    position: absolute;
    top: 8px;
    right: 10px;
    > .share-icon {
      width: 100%;
      height: 100%;
    }
  }
  > .commission-box {
    position: relative;
    width: 90%;
    height: 34px;
    line-height: 34px;
    margin: 0 5%;
    background: #f7f9fa;
    border-radius: 4px;
    display: flex;
    align-items: center;
    > .bottom-view-img {
      width: 16px;
      height: 16px;
      margin-left: 8px;
    }
    span {
      color: #333333;
      font-size: 13px;
      margin-left: 8px;
      font-family: PingFangSC-Regular;
    }
  }
}
.house-activity-poster {
    margin: 8px 0 5px;
    position: relative;
    height: 100px;
    overflow: hidden;
    border-radius: 6px;
    .img{
      min-height: 100%;
      min-width: 100%;
      object-fit: contain;
      position: absolute;
      top: 0;
    }
    .info{
      position: relative;
      margin-top: 64px;
      display: flex;
      .title{
        flex: 1;
        overflow: hidden;
        font-size:20px;
        font-weight:500;
        color:rgba(255,255,255,1);
        text-shadow:0px 2px 4px rgba(0,0,0,0.5);
        color: #fff;
        padding: 0 16px;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .btn{
        display: inline-block;
        color: #F4655F;
        font-size: 12px;
        border: 1px solid #F4655F;
        padding: 0 10px;
        border-radius: 12px;
        background-color: #fff;
        margin-right: 16px;
        height: 24px;
        line-height: 24px;
      }
    }
  }
</style>
