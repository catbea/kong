<template>
  <div class="market-box-page" v-if="itemInfo">
    <div :class="borderBottom ? 'van-hairline--bottom market-box' :'market-box'" @click="itemClickHandler">
      <div :class="{allDescribe:true,padding:!itemInfo.divisionRules}">
        <div class="market-box-page-top">
          <div class="img bg_img" :style="{backgroundImage:'url('+(itemInfo.linkerImg ? itemInfo.linkerImg : itemInfo.linkerHeadUrl)+')'}">
            <!-- 720标示 -->
            <img class="panorama-mark" :src="panoramaImg" v-if="itemInfo.ifPanorama">
            <div class="label bg_img" v-show="itemInfo.sale" :style="{backgroundImage:'url('+labelImg+')'}">
              {{itemInfo.sale}}
              {{itemInfo.labels}}
            </div>
          </div>
          <ul class="market-describe">
            <li class="market-name">
              <div class="box">
                <span class="title">{{itemInfo.linkerName}}</span>
                <span class="past" v-if="itemInfo.openStatus==1">已过期</span>
              </div>
              <span class="dredge" :style="style" v-if="dredge" @click.stop="confirmFun">{{openStatus}}</span>
            </li>
            <li class="site">
              {{`${itemInfo.city} ${itemInfo.district?itemInfo.district:''}`}}
              <span v-if="itemInfo.openStatus!=0&&itemInfo.invalidTimeStr">{{itemInfo.invalidTimeStr}}到期</span>
            </li>
            <li class="tag-group-left">
              <tag-group :arr="tags ? tags.slice(0,3) : []"></tag-group>
            </li>
            <li class="unit-price">
              <span>{{itemInfo.linkerPrice?itemInfo.linkerPrice: parseInt(itemInfo.price)===0 ? '价格待定':`${itemInfo.price}${itemInfo.priceUnit}`}}</span>
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
      type: Object
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
      labelImg: require('IMG/marketDetail/discount@2x.png')
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
        return this.itemInfo.saleStatus
      }
    }
  },
  methods: {
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
    // 确认支付
    async confirmFun () {
      if (!this.status) {
        this.$dialog.confirm({
          title: '提示',
          message: '是否确认开通？'
        }).then(() => {
          this.openHandle()
        }).catch(() => {})
      } else {
        let invalidTime = +new Date(this.itemInfo.invalidTime) // 楼盘到期时间
        let expireTimestamp = +this.vipInfo.expireTimestamp // vip到期时间
        if (this.vipInfo.vipValid && expireTimestamp > invalidTime && this.itemInfo.city === this.vipInfo.city) {
          const res = await marketService.addHouseByVip(this.itemInfo.linkerId)
          this.$toast({
            duration: 1000,
            message: '续费成功！'
          })
          // this.$emit('vipOpen')
          let time = new Date(+this.vipInfo.expireTimestamp)
          let mou = time.getMonth() + 1
          let date = time.getDate()
          this.itemInfo.invalidTimeStr = `${mou}/${date}`
          this.itemInfo.invalidTime = this.vipInfo.expireDate
          this.itemInfo.openStatus = 2
          this.dredgeColor()
        } else {
          this.openHandle()
        }
      }
    },
    async openHandle() {
      //VIP用户选择城市与VIP开通楼盘同城市
      if (this.status == 0) {
        if (this.itemInfo.city === this.userInfo.vipInfo.city) {
          const res = await marketService.addHouseByVip(this.itemInfo.linkerId)
          if (res.returnCode == 21801) {
            this.$router.push({ name: 'marketDetail-open', params: { id: this.itemInfo.linkerId } })
            return
          }
          this.status = 2
          this.dredgeColor()
          this.$toast({
            duration: 1000,
            message: '已开通成功，请到我的楼盘查看'
          })
          this.$parent.$parent.agentIdInfo++
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
  width: 375px;
  .market-box {
    // market-describewidth: 343px;
    padding-top: 16px;
    margin: 0 0px 0 16px;
    .padding {
      padding-bottom: 16px;
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
            left: -4px;
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
          padding-right: 12px;
          .market-name {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            height:24px;
            .box {
              display: flex;
              align-items: center;
              .title {
                display:inline-block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 110px;
                font-size: 16px;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: rgba(51, 51, 51, 1);
                line-height: normal;
              }
              .past {
                display: inline-block;
                font-size: 12px;
                transform: scale(0.84);
                font-weight: 400;
                line-height: normal;
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
              flex: 0 0 46px;
              height: 24px;
              background: rgba(0, 122, 230, 1);
              border-radius: 12px;
              font-size: 12px;

              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 24px;
              text-align: center;
            }
          }
          .site {
            font-size: 12px;
            margin-top: 6px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 12px;
            margin-bottom: 5px;
            font-family: PingFangSC-Regular;
          }
          .tag-group-left {
            height: 25px;
            width: 100%;
            margin-left: -3px;
          }
          .unit-price {
            height: 15px;
            margin-top: 4px;
            display: flex;
            span:nth-child(1) {
              line-height: 15px;
              font-size: 15px;
              font-weight: 600;
              color: rgba(234, 77, 46, 1);
              font-family: PingFangSC-Semibold;
            }
            span:nth-child(2) {
              margin-left: 12px;
              line-height: 15px;
              font-size: 12px;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              font-family: PingFangSC-Regular;
            }
          }
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
}
</style>
