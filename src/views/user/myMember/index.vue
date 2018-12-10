<template>
  <div class="user-mymember-page">
    <div class="bg_img background" :style="{backgroundImage:'url('+backImg+')'}">
      <div class="background-content">
      <div class="headImg" :style="borderStyle">
        <span class="head-icon bg_img" :style="{backgroundImage:'url('+(flag?headImgB:headImgA)+')'}"></span>
      </div>
      <ul class="head-describe">
        <li>{{userInfo.nickName}}</li>
        <li>AW大师VIP: {{expireTimestamp | dateTimeFormatter(2,'-')}}</li>
        <li>余额：{{userInfo.price | priceFormart}}元</li>
      </ul>
      <router-link v-show="isVip === 1" tag="p" to="/user/myMember/selectedDisk">VIP选盘</router-link>
      </div>
    </div>
    <set-meal :vipList="vipList" :info="setMealInfo" @priceClick="priceClickHandle"></set-meal>
    <member-privilege></member-privilege>
    <privilege-describe></privilege-describe>
    <agreement></agreement>
     <div class="open-and-renew">
      <div class="open-and-renew-left">
        合计：<p>{{payValue | priceFormart}}元</p>
      </div>
      <div class="open-and-renew-right" @click="paySubmit">
        立即支付
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant'
import commonService from 'SERVICE/commonService'
import SetMeal from 'COMP/myMember/SetMeal.vue'
import MemberPrivilege from 'COMP/myMember/MemberPrivilege.vue'
import PrivilegeDescribe from 'COMP/myMember/PrivilegeDescribe.vue'
import Agreement from 'COMP/myMember/Agreement.vue'
import marketService from 'SERVICE/marketService'
import { mapGetters } from 'vuex'
export default {
  components: {
    SetMeal,
    MemberPrivilege,
    PrivilegeDescribe,
    Agreement
  },
  created() {
    this.unselectedPopup()
    this.getVipInfo()
  },
  data: () => ({
    isVip: false,
    currPriceIndex: 0,
    isPayLoading: false,
    payValue: 0,
    setMealInfo: {openCount: 0},
    vipList: [],
    expireTimestamp: 0,
    backImg: require('IMG/myMember/person_card_bg@2x.png'),
    headImgA: require('IMG/myMember/ShapeColor@2x.png'),
    headImgB: require('IMG/myMember/Shape@2x.png'),
    bdr: 1,
    borderColor: {
      border: 'none'
    },
    title: 'VIP生效城市待选',
    content: '是否选择深圳作为VIP开通城市',
    flag: true
  }),
  computed: {
    ...mapGetters(['userInfo']),
    borderStyle() {
      if (this.bdr == 1) {
        this.borderColor.border = '1px solid #C6C6C6'
        return this.borderColor
      } else if (this.bdr == 2) {
        this.borderColor.border = '1px solid #EEC597'
        return this.borderColor
      }
    }
  },
  methods: {
    async paySubmit() {
      let param = {
        // costType: 1, //1、开通vip 2、楼盘开通 3：套盘套餐开通 4：一天体验
        amountId: this.vipList[this.currPriceIndex].id,
        subscribeNum: this.payValue,
        payOpenid: this.userInfo.payOpenId
      }
      this.isPayLoading = true
      const res = await commonService.payForVip(param)
      if (res.isPay) {
        wx.chooseWXPay({
          //弹出支付
          timestamp: res.timestamp,
          nonceStr: res.nonceStr,
          package: res.packageId,
          signType: 'MD5',
          paySign: res.signature,
          success: res => {
            console.log('支付suss')
          },
          cancel: res => {
            console.log(res, '支付取消')
          },
          fail: res => {
            console.log(res, '支付失败')
          }
        })
      }
    },

    async getVipInfo() {
      let res = await marketService.vipInfo()
      this.vipList = res.vipSettingList
      this.setMealInfo = {openCount: res.count}
      this.isVip = parseInt(this.userInfo.isVip)
      this.expireTimestamp = res.expireTimestamp
      if(this.vipList.length > 0){
        this.currPriceIndex = 0
        this.priceClickHandle(0)
      }
      
      // console.log(this.vipList, 'this.vipList')
    },

    priceClickHandle(index) {
      this.currPriceIndex = index
      // this.payValue = this.vipList[this.currPriceIndex].subscribeAmount - this.userInfo.price
      // if(this.payValue < 0) this.payValue = 0
      this.payValue = this.vipList[this.currPriceIndex].subscribeAmount
    },

    unselectedPopup() {
      Dialog.confirm({
        title: this.title,
        message: this.content,
        cancelButtonText: '其他城市',
        className: 'unselect'
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    },
    affirmPopup() {}
  }
}
</script>
<style lang="less">
.unselect {
  width: 280px;
  height: 146px;
  background: rgba(255, 255, 255, 1);
  border-radius: 12px;
  .van-dialog__header {
    font-size: 18px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 25px;
  }
  .van-dialog__confirm {
    color: rgba(0, 122, 230, 1);
  }
  .van-dialog__cancel {
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .van-dialog__content {
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
  }
}

.user-mymember-page {
  background: #f7f9fa;
  .background {
    width: 375px;
    height: 123px;
    display: flex;
    .background-content {
      margin: 25px 0 0 23px;
      display: flex;
      width: 334px;
      .borderA {
        border: 1px solid #c6c6c6;
      }
      .borderB {
        border: 1px solid #eec597;
      }
      .headImg {
        width: 60px;
        height: 60px;
        display: flex;
        position: relative;
        border-radius: 50%;
        .head-icon {
          width: 18px;
          height: 16px;
          position: absolute;
          top: -1px;
          right: 0;
        }
      }
      .head-describe {
        width: 183px;
        margin-left: 15px;
        margin-right: 6px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(229, 179, 123, 1);
        line-height: 17px;
        li:nth-child(1) {
          font-size: 18px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(229, 179, 123, 1);
          line-height: 25px;
        }
        li:nth-child(2) {
          margin: 4px 0 3px 0;
        }
      }
      p {
        margin-top: 24px;
        width: 68px;
        height: 24px;
        border-radius: 12px;
        border: 1px solid;
        font-size: 11px;
        font-family: ArialUnicodeMS;
        color: rgba(229, 179, 123, 1);
        line-height: 24px;
        text-align: center;
      }
    }
  }
  .open-and-renew {
    width: 100%;
    display: flex;
    height: 56px;
    background: rgba(255, 255, 255, 1);
    position: fixed;
    bottom: 0;
    .open-and-renew-left {
      display: flex;
      flex: 1;
      padding-left: 24px;
      line-height: 56px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      p {
        font-size: 20px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(234, 77, 46, 1);
      }
    }
    .open-and-renew-right {
      line-height: 56px;
      width: 125px;
      text-align: center;
      font-size: 18px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      background: rgba(195, 151, 101, 1);
    }
  }
}
</style>
