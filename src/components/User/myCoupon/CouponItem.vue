<template>
  <div class="coupon-item-page">
    <ol>
      <li class="olItem">
        <div class="olItem-content">
          <div class="cover-left"></div>
        <div class="coupon-item-page-left">
          <div v-show="info.type==10" :class="{textColorA:status!=0,textColorB:status!=0,margin:true}">
            ¥<h3>{{info.discountsLimit | numberFormatter}}</h3>
          </div>
          <div v-show="info.type==20" :class="{textColorA:status!=0,textColorB:status!=0,margin:true}">
            <h3>{{info.discountsLimit | numberFormatter}}折</h3>
          </div>
          <p>满{{info.satisfyLimit | numberFormatter}}元可用</p>
        </div>
        <ul class="coupon-item-page-center">
          <li>
            {{info.couponsName}}
            </li>
          <li>
            {{info.couponsStart}}-{{info.couponsEnd}}
            </li>
          <li @click="unfoldMore">详细信息 <span class="bg_img" :style="{backgroundImage:'url('+(unfoldShow?downImg:upImg)+')'}"></span></li>
        </ul>
        <div class="coupon-item-page-right">
         <p v-if="info.canUse || status==0" class="mayUse" @click="useHandle(info.couponsId)">立即使用</p>
          <span v-if="status==1" class="yetUse bg_img" :style="{backgroundImage:'url('+yetUseImg+')'}"></span>
          <span v-if="status==2" class="yetPast bg_img" :style="{backgroundImage:'url('+yetPastImg+')'}"></span>
          </div>
          <div class="cover-right"></div>
        </div>
        <div class="coupon-item-page-bottom" v-show="unfoldShow">
          {{info.useRule}}
          </div>
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  data: () => ({
    downImg: require('IMG/user/Rectangle 38 Copy@2x.png'),
    upImg:require('IMG/user/uptop@2x.png'),
    yetUseImg: require('IMG/user/Shape@2x.png'),
    yetPastImg: require('IMG/user/guoq@2x.png'),
    unfoldShow:false
  }),
  props: {
    info: {
      type: Object
    },
    status:{type:Number}
  },
  methods: {
    useHandle(n) {
      this.$emit('skipHandle',n)
    },
    unfoldMore(){
      this.unfoldShow=!this.unfoldShow
    }
  },
  computed: {
    ticketType() {
      // switch (this.info.ticketType) {
      //   case 10:
      //     return "代金券"
      //   case 20:
      //     return "折扣券"
      //     case 30:
      //     return "满减券"
      //     case 40:
      //     return "红包"
      //   default:
      //     break;
      // }
    }
  }
}
</script>
<style lang="less">
.coupon-item-page {
  ol {
    overflow: hidden;
    margin: 16px 0 0 16px;
    padding: 12px 20px 16px 20px;
    width: 343px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 6px 0px rgba(58, 76, 130, 0.07), 0px 2px 17px 0px rgba(34, 47, 85, 0.05);
    border-radius: 10px;
    .olItem {
      .textColorA {
        color: rgba(0, 122, 230, 1);
      }
      .textColorB {
        color: rgba(102, 102, 102, 1);
      }
      .olItem-content {
        display: flex;
        justify-content: space-between;
        position: relative;
        .cover-left {
          width: 25px;
          height: 28px;
          border-radius: 50%;
          background: #f8f6f9;
          position: absolute;
          left: -35px;
          top: 26%;
        }
        .cover-right {
          width: 25px;
          height: 28px;
          border-radius: 50%;
          background: #f8f6f9;
          position: absolute;
          right: -35px;
          top: 26%;
        }
      }
      .coupon-item-page-left {
        display: flex;
        flex-direction: column;
        height: 66px;
        border-right: 1px solid#F1F1F1;
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(0, 122, 230, 1);
        line-height: 20px;
        .margin {
          margin-top: 15px;
        }
        div {
          display: flex;
        }
        h3 {
          font-size: 22px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          line-height: 16px;
          padding-right: 20px;
        }
        p {
          font-size: 12px;
          transform: scale(0.84);
          margin-left: -7px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 14px;
          margin-top: 6px;
        }
      }
      .coupon-item-page-center {
        display: flex;
        flex-direction: column;
        width: 118px;
        // margin-left:14px;
        li:nth-child(1) {
          font-size: 14px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
        }
        li:nth-child(2) {
          font-size: 12px;
          transform: scale(0.84);
          width: 141px;
          margin-left: -12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 14px;
          margin-top: 2px;
          margin-bottom: 6px;
        }
        li:nth-child(3) {
          display: flex;
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 17px;
          span {
            width: 12px;
            height: 12px;
            margin: 2px 0 0 8px;
          }
        }
      }
      .coupon-item-page-right {
        display: flex;
        .mayUse {
          width: 70px;
          height: 20px;
          margin-top: 17px;
          // margin-left:32px;
          border-radius: 22px;
          border: 1px solid #007ae6;
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(0, 122, 230, 1);
          text-align: center;
          line-height: 20px;
        }
        .yetUse {
          width: 46px;
          height: 46px;
        }
        .yetPast {
          width: 46px;
          height: 46px;
        }
      }
      .coupon-item-page-bottom {
        height: 24px;
        background: rgba(248, 246, 249, 1);
        border-radius: 4px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 24px;
        margin-top: 16px;
        // text-indent:8px;
        text-align: center;
      }
    }
  }
}
</style>
