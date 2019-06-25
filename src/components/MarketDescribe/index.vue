<template>
  <div class="market-box-page" v-if="itemInfo">
    <div :class="borderBottom ? 'market-box' :'market-box'" @click="itemClickHandler">
      <div :class="{allDescribe:true,padding:!itemInfo.divisionRules}" class="border">
        <div class="market-box-page-top">
          <div class="img bg_img" :style="{backgroundImage:'url('+(itemInfo.linkerImg ? itemInfo.linkerImg : itemInfo.linkerHeadUrl)+')'}">
            <!-- 720标示 -->
            <img class="panorama-mark" :src="panoramaImg" v-if="itemInfo.ifPanorama">
            <!-- <div class="label bg_img" v-show="itemInfo.sale" :style="{backgroundImage:'url('+labelImg+')'}">
              {{itemInfo.sale}}
              {{itemInfo.labels}}
            </div> -->
            <div  v-show="itemInfo.activityStatus" class="coupon">
              {{'卡券'}}
            </div>
          </div>
          <ul class="market-describe">
            <li class="market-name">
              <div class="box">
                <!-- <span class="free" v-if="+itemInfo.isFree && showFree">免费</span> -->
                <span class="title">{{itemInfo.linkerName}}</span>
                <span class="past" v-if="itemInfo.openStatus==1">已过期</span>
              </div>
              <!-- v-if="+itemInfo.isFree" -->
              <span class="dredge no"  v-if="+itemInfo.isFree && itemInfo.openStatus != 2"  @click.stop="freeConfirmFun">免费开通</span>
              <span class="dredge add" v-if="+itemInfo.isFree && itemInfo.openStatus == 2">已开通</span>
              <span class="dredge" :style="style" v-if="!(+itemInfo.isFree) && $route.name!='marketDetail-open'" @click.stop="confirmFun">{{openStatus}}</span>
            </li>
            <li class="site">
              {{`${itemInfo.city} ${itemInfo.district?itemInfo.district:''}`}}
              <!-- <span v-if="itemInfo.openStatus!=0&&itemInfo.invalidTimeStr">{{itemInfo.invalidTimeStr}}到期</span> -->
              <span>| {{itemInfo.linkerPrice?itemInfo.linkerPrice.replace('.00', ''): parseInt(itemInfo.price)===0 ? '价格待定':`${itemInfo.price}${itemInfo.priceUnit}`}}</span>
            </li>
            <li class="tag-group-left">
              <tag-group :arr="tags ? tags.slice(0,3) : []"></tag-group>
            </li>
            <li class="unit-price">
              <!-- <span>{{itemInfo.linkerPrice?itemInfo.linkerPrice.replace('.00', ''): parseInt(itemInfo.price)===0 ? '价格待定':`${itemInfo.price}${itemInfo.priceUnit}`}}</span> -->
              <span>{{itemInfo.openTimes}}次开通</span>
            </li>
          </ul>
        </div>
        <div class="market-box-page-bottom" v-show="itemInfo.commission||itemInfo.divisionRules">
          <span :style="{backgroundImage:'url('+commissionImg+')'}" class="bg_img"></span>
          <span>{{itemInfo.commission?itemInfo.commission:itemInfo.divisionRules}}</span>
        </div>
      </div>
    </div>
    <van-actionsheet v-model="showChannel">
      <div class="channel-box">
        <div class="topbar">
          <p class="title">渠道选择</p>
          <p class="subtitle">七天只能切换一次</p>
        </div>
        
        <div class="channel-list">
         <p class="item" v-for="(item,index) in channelList" :key="index" @click="changeChannelFn(item)">{{item.channelName}} <span v-if="item.freeFlag" class="free">免费券</span></p>
        </div>
        <div class="cancle" @click="hideChannelFn">取消</div>
      </div>
    </van-actionsheet>
  </div>
</template>
<script>
import TagGroup from 'COMP/TagGroup/'
import conf from './conf'
import marketService from 'SERVICE/marketService'
import { mapGetters } from 'vuex'
export default {
  components: {
    TagGroup
  },
  props: {
    value: '',
    itemInfo: {
      type: Object
    },
    borderBottom: {
      type: Boolean,
      default: true
    },
    dredge: {
      type: Boolean,
      default: true
    },
    vipInfo: {
      type: Object,
      default: () => {
        return {
          expireTimestamp: '',
          expireDate: '',
          vipValid: ''
        }
      }
    },
    showFree: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      status: this.itemInfo.openStatus,
      tags: this.itemInfo.linkerTags,
      resInfo: null,
      style: null,
      panoramaImg: require('IMG/system/icon_panorama@2x.png'),
      commissionImg: require('IMG/user/collection/icon_commission@2x.png'),
      labelImg: require('IMG/marketDetail/discount@2x.png'),
      showChannel: false,
      channelList: [],
      currentChannel: {},
      vipCity: {}
    }
  },
  created() {
    this.dredgeColor()
    if (this.tags === '') {
      this.tags = []
      this.tags.unshift(this.saleStatus)
    } else if (this.tags.indexOf(this.saleStatus) < 0) {
      this.tags.unshift(this.saleStatus)
    }
  },
  computed: {
    ...mapGetters(['userArea', 'userInfo']),
    openStatus: {
      get: function() {
        if (!this.itemInfo.hasOwnProperty('openStatus')) return '开通'
        if (this.status == 0) {
          return '开通'
        } else {
          return '续费'
        }
      },
      set: function() {}
    },
    saleStatus() {
      if (this.itemInfo.saleStatus == 0) {
        return '热销中'
      } else if (this.itemInfo.saleStatus == 1) {
        return '即将发售'
      } else if (this.itemInfo.saleStatus == 3) {
        return '售罄'
      } else {
        // return this.itemInfo.saleStatus
        return '热销中'
      }
    },
    // 判断vip城市和vip有效期
    checkVipCity() {
      let status = false
      if (this.vipInfo.vipList) {
        this.vipInfo.vipList.forEach(el => {
          if (el.city === this.itemInfo.city && el.vipValid) {
            status = true
            this.vipCity = el
          }
        })
      }
      return status
    }
  },
  methods: {
    // 获取渠道列表
    getChannelListByLinkerId () {
      marketService.getChannelListByLinkerId({linkerId: this.itemInfo.linkerId}).then(res => {
        this.channelList = res
      }).catch()
    },
    // 选择渠道
    changeChannelFn (item){
      this.currentChannel = item
      this.hideChannelFn()
      if (item.freeFlag ) {
        this.freeOpenHandle()
      } else if (this.checkVipCity) {
        this.openHandle()
      } 
      else {
        this.$router.push({ name: 'marketDetail-open', params: { id: this.itemInfo.linkerId,  newChannelId: this.currentChannel.channelId} })
      }
    },
    // 切换渠道
    switchChannel () {
      marketService.switchChannel({
        linkerId:  this.itemInfo.linkerId,
        newChannelId: this.currentChannel.channelId,
        oldChannelId: '',
        switchingReason: ''
      }).then(res => {}).catch()
    },
    // 显示渠道
    showChannelFn () {
      if (!this.channelList.length) {
        return this.$toast('该楼盘没有渠道！')
      }
      this.$store.commit('TABBAR', { show: false })
      this.showChannel = true
    },
    // 隐藏渠道
    hideChannelFn () {
      this.$store.commit('TABBAR', { show: true })
      this.showChannel = false
    },
    async getDetailInfo(id) {
      // 获取该楼盘详情
      const res = await marketService.getLinkerDetail(id)
      this.detailOpenStatus = res.openStatus
    },
    itemClickHandler() {
      this.$emit('skipDetail', this.itemInfo)
    },
    dredgeColor() {
      this.style = conf(this.openStatus)
    },
    // 免费楼盘
    freeConfirmFun () {
      this.getChannelListByLinkerId()
      this.$dialog.confirm({
        title: '提示',
        message: '是否确认添加楼盘？'
      }).then(() => {
        this.showChannelFn()
        // this.freeOpenHandle()
      }).catch(() => {})
    },
    // 确认支付
    async confirmFun () {
      // if (this.itemInfo.city !== this.vipInfo.city) {
      //   return this.$router.push({ name: 'marketDetail-open', params: { id: this.itemInfo.linkerId } })
      // }
      // 判断vip城市和vip有效期
      if (!this.checkVipCity) {
        return this.$router.push({ name: 'marketDetail-open', params: { id: this.itemInfo.linkerId } })
      }
      if (!this.status) {
        this.$dialog.confirm({
          title: '提示',
          message: '是否确认开通？'
        }).then(() => {
          this.openHandle()
        }).catch(() => {})
      } else {
        
        let invalidTime = +new Date(this.itemInfo.invalidTime.replace(/-/g,'/'))// 楼盘到期时间
        let expireTimestamp = this.vipCity.expireTimestamp // vip到期时间
        if (this.vipCity.vipValid && expireTimestamp > invalidTime && this.itemInfo.city === this.vipCity.city) {
          const res = await marketService.addHouseByVip(this.itemInfo.linkerId)
          this.$toast({
            duration: 1000,
            message: '续费成功！'
          })
          this.itemInfo.openStatus = 2
          this.itemInfo.openTimes += 1
          this.status = 2
          this.dredgeColor()
          this.$emit('updateMarket')
        } else {
          this.openHandle()
        }
      }
    },
    // 免费楼盘开通
    freeOpenHandle () {
      marketService.newOpenLinker({linkerId: this.itemInfo.linkerId, channelId: this.currentChannel.channelId}).then(res => {
        // 开通成功切换渠道
        this.switchChannel()

        this.itemInfo.openStatus = 2
        this.itemInfo.openTimes += 1
        this.dredgeColor()
        this.$toast({
          duration: 1000,
          message: '已添加成功，请到我的楼盘查看'
        })
        this.$parent.$parent.agentIdInfo++
        this.$emit('updateMarket')
      }).catch(()=>{})
    },
    async openHandle() {
      //VIP用户选择城市与VIP开通楼盘同城市
      if (this.status == 0) {       
        if (this.itemInfo.city === this.vipCity.city && this.vipCity.vipValid) {
          const res = await marketService.addHouseByVip(this.itemInfo.linkerId)
          if (res.returnCode == 21801) {
            return this.$router.push({ name: 'marketDetail-open', params: { id: this.itemInfo.linkerId } })
          }
          // 免费楼盘调绑定渠道接口
          if (parseInt(this.itemInfo.isFree)>0) {
            this.switchChannel()
          }

          this.status = 2
          this.itemInfo.openStatus = 2
          this.itemInfo.openTimes += 1
          this.dredgeColor()
          this.$toast({
            duration: 1000,
            message: '已开通成功，请到我的楼盘查看'
          })
          this.$parent.$parent.agentIdInfo++
          this.$emit('updateMarket')
        } else {
          this.$router.push({ name: 'marketDetail-open', params: { id: this.itemInfo.linkerId } })
        }
      } else {
        this.$router.push({ name: 'marketDetail-open', params: { id: this.itemInfo.linkerId } })
      }
    }
  },
  watch: {
    value(val) {
      this.val = val
    },
    val(val) {
      this.$emit('change', val)
    }
  }
}
</script>
<style lang="less">
.market-box-page {
  background: #ffffff;
  width: 100%;
  .market-box {
    // market-describewidth: 343px;
    padding-top: 16px;
    margin: 0 16px;
    .padding {
      padding-bottom: 17px;
    }
    .border{
      box-shadow: inset 0px -1px 1px -1px #c8c7cc;
    }
    .allDescribe {
      display: flex;
      flex-direction: column;
      .market-box-page-top {
        display: flex;
        .img {
          width: 120px;
          height: 90px;
          border-radius: 6px;
          margin-right: 12px;
          position: relative;
          text-align: center;
          line-height: 90px;
          .panorama-mark {
            width: 32px;
            height: 32px;
            display: inline-block;
            vertical-align: middle;
          }
          .label {
            position: absolute;
            padding:0 3px;
            left: -3px;
            top: 4px;
            // white-space: nowrap;
            // overflow: hidden;
            // text-overflow: ellipsis;
            // width: 36px;
            height: 24px;
            text-align: center;
            line-height: 22px;
            font-size: 11px;
            font-family: PingFangSC-Regular;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
          }
        }
        .market-describe {
          // flex: 1;
          height:93px;
          width:227px;
          // padding-right: 12px;
          .market-name {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            height:24px;
            .box {
              display: flex;
              // align-items: center;
              .free{
                display: inline-block;
                width: 24px;
                font-size: 10px;
                height:14px;
                line-height: 14px;
                background:linear-gradient(90deg,rgba(255,153,51,1) 0%,rgba(230,94,46,1) 100%);
                color: #fff;
                border-radius: 2px;
                margin-right: 2px;
                margin-top: 1px;
                padding: 0 2px;
                font-weight: 300;
              }
              .title {
                display:inline-block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 120px;
                font-size: 16px;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: #13294F;
              }
              .past {
                display: inline-block;
                font-size: 12px;
                transform: scale(0.84);
                font-weight: 400;
                line-height:20px;
                height: 20px;
                width:47px;
                color: rgba(234, 77, 46, 1);
                padding: 0px 3px 1px 3px;
                border-radius: 3px;
                // &::after{
                //   border-color: rgba(234,77,46,1);
                border: 1px solid rgba(234, 77, 46, 1);
                // }
              }
            }
            .dredge {
              flex: 0 0 60px;
              height: 30px;
              // background: linear-gradient(90deg,rgba(0,158,230,1) 0%,rgba(0,122,230,1) 100%);
              border-radius: 15px;
              font-size: 12px;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 30px;
              text-align: center;
              margin-top: -3px;
            }
            .no {
              background: linear-gradient(90deg,rgba(0,158,230,1) 0%,rgba(0,122,230,1) 100%);
            }
            .add{
              // border:1px solid rgba(204, 204, 204, 1);
              color: rgba(204, 204, 204, 1);
              background-color: transparent;
              font-size: 12px;
              height: 20px;
              line-height: 20px;
            }
            .open{
              background:linear-gradient(119deg,rgba(234,77,46,1) 0%,rgba(255,156,56,1) 100%);
            }
          }
          .site {
            font-size: 12px;
            margin-top: 6px;
            font-weight: 400;
            color: #40516F;
            line-height: 12px;
            margin-bottom: 5px;
            font-family: PingFangSC-Regular;
          }
          .tag-group-left {
            height: 25px;
            width: 100%;
            margin-top: 10px;
            // margin-left: -3px;
          }
          .unit-price {
            height: 15px;
            display: flex;
            span{
              line-height: 15px;
              font-size: 12px;
              font-weight: 400;
              color: #445166;
              font-family: PingFangSC-Regular;
              font-weight:600;
            }
          }
        }
        .coupon{
          position: absolute;
          top: 8px;
          font-size: 12px;
          color: #fff;
          padding: 0 10px 0 5px;
          height: 20px;
          line-height: 20px;
          background-color: #CF562B;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }

      .market-box-page-bottom {
        width: 335px;
        height: 34px;
        padding: 0 0 0 8px;
        background: rgba(247, 249, 250, 1);
        border-radius: 4px;
        margin: 16px 0 16px 0;
        display: flex;
        align-items: center;
        span:nth-child(1) {
          width: 16px;
          height: 16px;
        }
        span:nth-child(2) {
          margin: 0 0 0 6px;
          font-size: 15px;

          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 24px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 130px;
        }
      }
    }
  }
  /deep/.van-icon-close{
    display: none;
  }
  .channel-box{
    font-size: 16px;
    padding: 10px 0 0 0;
    background-color: #fff;
    .topbar{
      text-align: center;
      padding-bottom: 5px;
      .title{
        padding: 10px 0 5px;
        font-size: 18px;
        color: #333;
        font-weight: 600;
      }
      .subtitle{
        font-size: 12px;
        color: #999;
        z-index: 9;
        position: relative;
      }
    }
    
    .channel-list{
      max-height: 500px;
      overflow-y: scroll;
    }
    .item{
      padding: 16px 0 10px 16px;
      .free{
        display: inline-block;
        font-size: 10px;
        color: #fff;
        background-color: #EA4D2E;
        line-height: 15px;
        height: 15px;
        padding: 0 5px;
        border-radius: 2px;
        vertical-align: middle;
      }
    }
    .cancle{
      margin-top: 20px;
      height:50px;
      background:rgba(238,238,238,1);
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>
