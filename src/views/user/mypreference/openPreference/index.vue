<template>
  <div class="open-preference-page">
    <div class="bg_img background" :style="{backgroundImage:'url('+backImg+')'}">
      <div class="background-content">
      <div class="headImg">
        <avatar class="avatar" :avatar="userInfo.avatarUrl"></avatar>
        <!-- <span class="head-icon bg_img" :style="{backgroundImage:'url('+(flag ? headImgB : headImgA)+')'}"></span> -->
      </div>
      <ul class="head-describe">
        <li>{{userInfo.nickName}}</li>
        <li v-if="packageCount>0">已购买{{packageCount>0 ? packageCount+'个' : '' }}套餐，最晚将于{{expireDate | dateTimeFormatter(2,'-')}}到期。</li>
        <li v-if="packageCount==0">当前未开通套餐</li>
        <li>余额：{{balance | priceFormart}}元</li>
      </ul>
      </div>
    </div>
    <already-buy v-for="(item, index) in bugList" :key="index" :packageItem="item" @selectProject="selectProjectHandle"></already-buy>
    <binding-meal :itemInfo="packageInfo"></binding-meal>
    <meal-privilege :itemInfo="packageInfo"></meal-privilege>
    <privilege></privilege>
    <agreement></agreement>
    <div class="open-and-renew">
      <div class="open-and-renew-left">
        合计：<p>{{payValue | priceFormart}}元</p>
      </div>
      <div v-show="!isPayLoading" class="open-and-renew-right" @click="payClickHandle">
        立即支付
      </div>
      <div v-show="isPayLoading" class="pay-loadding">
        支付中...
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant'
import { mapGetters } from 'vuex'
import marketService from 'SERVICE/marketService'
import commonService from 'SERVICE/commonService'
import AlreadyBuy from 'COMP/User/mypreference/openPreference/AlreadyBuy.vue'
import BindingMeal from 'COMP/User/mypreference/openPreference/BindingMeal.vue'
import MealPrivilege from 'COMP/User/mypreference/openPreference/MealPrivilege.vue'
import Privilege from 'COMP/User/mypreference/openPreference/Privilege.vue'
import Agreement from 'COMP/User/mypreference/openPreference/Agreement.vue'
import Avatar from 'COMP/Avatar'
export default {
  components: {
    AlreadyBuy,
    BindingMeal,
    MealPrivilege,
    Privilege,
    Agreement,
    Avatar
  },
  data: () => ({
    currPackage: null,
    packageCount: 0,
    balance: 0,
    expireDate: 0,
    isPayLoading: false,
    packageInfo: {},
    bugList: [],
    flag: false,
    payValue: 0,
    backImg: require('IMG/myMember/person_card_bg@2x.png'),
    headImgA: require('IMG/myMember/ShapeColor@2x.png'),
    headImgB: require('IMG/myMember/Shape@2x.png'),
    bdr: 2,
    borderColor: {
      border: 'none'
    }
  }),
  created() {
    this.getPackageInfo()
  },
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
    async addProjectHandle() {
      const res = await marketService.queryLastInfoByAgentId()
      this.$router.push({ path: '/user/myMember/selectedDisk', query: { packageId: res.id, type: 'package' } })
    },

    async payClickHandle() {
      if (this.packageCount >= 3) {
        this.$toast('最多能开通3个套餐')
        return
      }
      this.isPayLoading = true
      let param = {
        packageId: this.currPackage.id,
        subscribeAmount: this.payValue,
        payOpenid: this.userInfo.payOpenId
      }
      const res = await commonService.packagePayment(param)
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
              this.paySuss()
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
          this.paySuss()
        }
      } else {
        this.$toast('支付失败')
      }
    },

    cancelPayment(purchaseId) {
      commonService.cancelPayment(purchaseId)
    },

    paySuss() {
      this.getPackageInfo()
      this.$dialog.confirm({
        title: '开通成功',
        message: '成功开通套餐，海量楼盘等你添加~',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.addProjectHandle()
        })
        .catch(() => {})
    },

    async selectProjectHandle(item) {
      this.$router.push({ path: '/user/myMember/selectedDisk', query: { packageId: item.id, type: 'package' } })
    },

    async getPackageInfo() {
      this.bugList = []
      const res = await marketService.userPackageSituation()
      this.expireDate = res.expireDate ? parseInt(res.expireDate) : 0
      this.balance = res.price
      this.packageCount = res.count
      if (res.packagePurchageList.length > 0) {
        for (let i = 0; i < res.packagePurchageList.length; i++) {
          let item = res.packagePurchageList[i]
          let obj = {
            id: item.id,
            packageId: item.packageId,
            title: '已购套餐' + (i + 1),
            projectSelected: item.giveNum + item.limitTotal - item.limitResidue,
            projectCount: item.giveNum + item.limitTotal,
            expireDate: item.expireDate
          }
          this.bugList.push(obj)
        }
      }

      if (res.packageList.length > 0) {
        this.currPackage = res.packageList[0]
        this.packageInfo = {
          price: this.currPackage.price,
          timeNum: this.currPackage.timeNum,
          limitTotal: this.currPackage.limitTotal,
          timeUnit: this.currPackage.timeUnit
        }
        this.payValue = this.packageInfo.price
      } else {
        this.$toast('陶盘信息返回错误')
      }
    }
  }
}
</script>
<style lang="less">
.open-preference-page {
  background: rgba(247, 249, 250, 1);
  padding-bottom: 48px;
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
        width: 253px;
        margin-left: 15px;
        margin-right: 6px;
        font-size: 18px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 25px;
        li:nth-child(2) {
          font-size: 12px;
          
          font-weight: 400;
          color: rgba(164, 184, 213, 1);
          line-height: 25px;
        }
        li:nth-child(3) {
          margin: 4px 0 3px 0;
          font-size: 12px;
          
          font-weight: 400;
          color: rgba(164, 184, 213, 1);
          line-height: 17px;
        }
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
