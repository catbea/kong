<template>
  <div class="user-mymember-page">
    <div class="bg_img background" :style="{backgroundImage:'url('+backImg+')'}">
      <div class="background-content">
      <div class="headImg" :style="isVip ? borderStyle : ''">
        <avatar class="avatar" :avatar="userInfo.avatarUrl"></avatar>
        <span class="bg_img head-icon" v-show="isVip" :style="{backgroundImage:'url('+(isExpire ? headImgB : headImgA)+')'}"></span>
      </div>
      <ul :class="isVip && !isExpire ? 'head-describe' : 'head-describe expire'">
        <li>{{userInfo.name}}</li>
        <!-- <li v-show="isVip && !isExpire">AW大师VIP: {{expireTimestamp | dateTimeFormatter(2,'-')}}</li> -->
        <li @click="goVipList" v-show="isVip && !isExpire">已开通城市({{vipInfo&&vipInfo.vipList.length || 0}}) ></li>
        <li @click="goVipList" v-show="isVip && isExpire">vip已到期，请继续充值续费 ></li>
        <li v-show="!isVip">暂未开通VIP功能</li>
        <li>余额：{{balance | priceFormart}}元</li>
      </ul>
      <router-link v-show="isVip && !isExpire" tag="p" :to="{path:'/user/myMember/selectedDisk', query: {type: 'vip', vipCity: vipInfo.lastVipCity}}">VIP选盘 ></router-link>
      </div>
    </div>
    <set-meal :vipList="vipList" @onCheckCity="checkCityHandle" :setMealInfo="setMealInfo" @priceClick="priceClickHandle" @goVipList="goVipList" :userArea="userArea"></set-meal>
    <member-privilege></member-privilege>
    <privilege-describe></privilege-describe>
    <agreement></agreement>
     <div class="open-and-renew">
      <div class="open-and-renew-left">
        合计：<p>{{payValue | priceFormart}}元</p>
      </div>
      <div v-show="!isPayLoading" class="open-and-renew-right" @click="confirmFun">
        立即支付
      </div>
      <div v-show="isPayLoading" class="pay-loadding">
        支付中...
      </div>
    </div>
  </div>
</template>
<script>
import commonService from 'SERVICE/commonService'
import SetMeal from 'COMP/myMember/SetMeal.vue'
import MemberPrivilege from 'COMP/myMember/MemberPrivilege.vue'
import PrivilegeDescribe from 'COMP/myMember/PrivilegeDescribe.vue'
import Agreement from 'COMP/myMember/Agreement.vue'
import marketService from 'SERVICE/marketService'
import { mapGetters } from 'vuex'
import Avatar from 'COMP/Avatar'
import * as types from '@/store/mutation-types'
export default {
  components: {
    SetMeal,
    MemberPrivilege,
    PrivilegeDescribe,
    Agreement,
    Avatar
  },
  created() {
    this.selectCity = this.userArea.vipSelectedCity || this.userInfo.vipDefaultCity || this.userInfo.majorCity ||  this.userArea.city
    this.setMealInfo.vipCity = this.selectCity
    this.getVipInfo()
  },
  data: () => ({
    isPayLoading: false,
    isVip: false,
    balance: 0,
    currPriceIndex: 0,
    isPayLoading: false,
    payValue: 0,
    setMealInfo: { isVip: false, openCount: 0, vipCity: '' },
    vipList: [],
    isExpire: false,
    expireTimestamp: 0,
    backImg: require('IMG/myMember/person_card_bg@2x.png'),
    headImgA: require('IMG/myMember/ShapeColor@2x.png'),
    headImgB: require('IMG/myMember/Shape@2x.png'),
    bdr: 1,
    borderColor: {
      border: 'none'
    },
    selectCity: '',
    title: 'VIP生效城市待选',
    showAddProjectDialogFlag: false,
    vipInfo: ''
  }),
  computed: {
    ...mapGetters(['userInfo', 'userArea']),
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
    // 跳转vip列表
    goVipList () {
      this.$router.push('/user/viplist')
    },
    // 确认支付
    confirmFun () {
      this.$dialog.confirm({
        title: '提示',
        message: `是否确认选择${this.selectCity}作为楼盘开通城市？`
      }).then(() => {
        this.paySubmit()
      }).catch(() => {})
    },
    async paySubmit() {
      let param = {
        // costType: 1, //1、开通vip 2、楼盘开通 3：套盘套餐开通 4：一天体验
        city: this.selectCity,
        amountId: this.vipList[this.currPriceIndex].id,
        subscribeNum: this.vipList[this.currPriceIndex].monthNum,
        payOpenid: this.userInfo.payOpenId
      }
      this.isPayLoading = true
      const res = await commonService.payForVip(param)
      const purchaseId = res.purchaseId
      this.isPayLoading = false
      if (res.prepayStatus) {
        if (res.isPay) {
          wx.chooseWXPay({
            //弹出支付
            timestamp: res.timestamp,
            nonceStr: res.nonceStr,
            package: res.packageId,
            signType: 'MD5',
            paySign: res.signature,
            success: res => {
              this.pyaSuss()
            },
            cancel: res => {
              this.$toast('支付取消')
              this.cancelPayment(purchaseId)
            },
            fail: res => {
              this.$toast('支付失败')
              this.cancelPayment(purchaseId)
            }
          })
        } else {
          this.pyaSuss()
        }
      } else {
        this.$toast('支付失败')
      }
    },

    cancelPayment(purchaseId) {
      commonService.cancelPayment(purchaseId)
    },

    pyaSuss() {
      this.getVipInfo()
      if (!this.setMealInfo.vipCity) {
        //未绑定VIP城市先绑定
        this.showAddProjectDialogFlag = true
        this.unselectedPopup()
      } else {
        this.showAddProjectDialog()
      }
    },

    showAddProjectDialog() {
      this.$dialog
        .confirm({
          title: '开通成功',
          message: '成功开通vip，海量楼盘等你添加~',
          cancelButtonText: '取消'
        })
        .then(() => {
          this.$router.replace({ path: '/user/myMember/selectedDisk', query: { type: 'vip' } })
        })
        .catch(() => {})
    },

    async getVipInfo() {
      let res = await marketService.vipInfo()
      this.vipInfo = res
      this.vipList = res.vipSettingList
      this.isVip = !!res.expireTimestamp
      this.expireTimestamp = res.expireTimestamp
      this.balance = res.balance
      // 未开通vip取主营区域
      if (!res.lastVipCity) {
        res.lastVipCity = this.selectCity
      }
      this.setMealInfo = { isVip: res.vipFlag, openCount: res.count, vipCity: res.lastVipCity}
      if (!this.userArea.vipSelectedCity) {
        this.selectCity = res.lastVipCity
      }
      // 判断是否已过期
      let now = new Date()
      if (now.getTime() > parseInt(res.expireTimestamp)) {
        this.isExpire = true
      }

      //更新vipInfo
      let _vipInfo = { city: res.city }
      this.$store.commit(types.USER_INFO, Object.assign({}, this.userInfo, { vipInfo: _vipInfo }))
      if (res.vipFlag && !res.city) {
        this.unselectedPopup()
      }

      if (this.vipList.length > 0) {
        this.currPriceIndex = 0
        this.priceClickHandle(0)
      }
    },

    priceClickHandle(index) {
      this.currPriceIndex = index
      this.payValue = this.vipList[this.currPriceIndex].subscribeAmount
    },

    unselectedPopup() {
      this.$dialog
        .confirm({
          title: '是否选择“' + this.selectCity + '”作为VIP开通城市',
          message: '<font color="#EA4D2E">vip仅针对生效城市下所有楼盘免费，请谨慎选择</font>',
          cancelButtonText: '其他城市'
        })
        .then(() => {
          this.updateCity()
        })
        .catch(() => {
          this.$router.push({ path: '/public/area-select/', query: { fromPage: 'myMember' } })
        })
    },

    async updateCity() {
      let res = await marketService.updateCityByAgentId(this.selectCity)
      let _vipInfo = { city: this.selectCity }
      this.setMealInfo.vipCity = this.selectCity
      this.$store.commit(types.USER_INFO, Object.assign({}, this.userInfo, { vipInfo: _vipInfo }))
      this.showAddProjectDialog()
      // if(this.showAddProjectDialogFlag) {
      //   this.showAddProjectDialog()
      // } else {
      //   this.$toast('vip城市添加成功')
      // }
    },

    checkCityHandle() {
      this.$router.push({ path: '/public/vip-market/', query: { fromPage: 'myMember', category: 0 } })
    }
  },
  beforeDestroy () {
    this.$dialog.close()
  }
}
</script>
<style lang="less">
.van-dialog__message {
  // text-align: left;
  line-height: 24px;
}
.unselect {
  width: 280px;
  height: 146px;
  background: rgba(255, 255, 255, 1);
  border-radius: 12px;
  .van-dialog__header {
    font-size: 18px;

    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 25px;
  }
  .van-dialog__confirm {
    color: rgba(0, 122, 230, 1);
  }
  .van-dialog__cancel {
    font-size: 18px;

    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .van-dialog__content {
    font-size: 15px;

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
        .avatar {
          width: 60px;
          height: 58px;
        }
      }
      .head-describe {
        width: 183px;
        margin-left: 15px;
        margin-right: 6px;
        font-size: 12px;

        font-weight: 400;
        color: rgba(229, 179, 123, 1);
        line-height: 24px;
        li:nth-child(1) {
          font-size: 18px;

          font-weight: 400;
          line-height: 25px;
        }
        li:nth-child(2) {
          margin: 4px 0 3px 0;
        }
      }
      .expire {
        color: #a4b8d5;
      }
      p {
        margin-top: 24px;
        width: 68px;
        height: 24px;
        border-radius: 12px;
        border: 1px solid;
        font-size: 11px;
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
      padding-left: 16px;
      line-height: 56px;
      font-size: 14px;

      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      p {
        font-size: 20px;

        font-weight: 600;
        color: rgba(234, 77, 46, 1);
      }
    }
    .pay-loadding {
      line-height: 56px;
      width: 125px;
      text-align: center;
      font-size: 18px;

      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      background: #ccc;
    }
    .open-and-renew-right {
      line-height: 56px;
      width: 125px;
      text-align: center;
      font-size: 18px;

      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      background: rgba(195, 151, 101, 1);
    }
  }
}
</style>
