<template>
  <div class="open-preference-page">
    <div class="bg_img background" :style="{backgroundImage:'url('+backImg+')'}">
      <div class="background-content">
      <div class="headImg" :style="borderStyle">
        <span class="head-icon bg_img" :style="{backgroundImage:'url('+(flag?headImgB:headImgA)+')'}"></span>
      </div>
      <ul class="head-describe">
        <li>刘新博</li>
        <li>已购买套餐，将于2018年10月15日到期。</li>
        <li>余额：23元</li>
      </ul>
      </div>
    </div>
    <already-buy></already-buy>
    <binding-meal></binding-meal>
    <meal-privilege></meal-privilege>
    <privilege></privilege>
    <agreement></agreement>
    <div class="open-and-renew">
      <div class="open-and-renew-left">
        合计：<p>158.00元</p>
      </div>
      <div class="open-and-renew-right">
        立即支付
      </div>
    </div>
  </div>
</template>
<script>
import AlreadyBuy from 'COMP/User/mypreference/openPreference/AlreadyBuy.vue'
import BindingMeal from 'COMP/User/mypreference/openPreference/BindingMeal.vue'
import MealPrivilege from 'COMP/User/mypreference/openPreference/MealPrivilege.vue'
import Privilege from 'COMP/User/mypreference/openPreference/Privilege.vue'
import Agreement from 'COMP/User/mypreference/openPreference/Agreement.vue'
export default {
  components: {
    AlreadyBuy,
    BindingMeal,
    MealPrivilege,
    Privilege,
    Agreement
  },
  data: () => ({
    backImg: require('IMG/myMember/person_card_bg@2x.png'),
    headImgA: require('IMG/myMember/ShapeColor@2x.png'),
    headImgB: require('IMG/myMember/Shape@2x.png'),
    bdr: 2,
    borderColor: {
      border: 'none'
    }
  }),
  computed: {
    borderStyle() {
      if (this.bdr == 1) {
        this.borderColor.border = '1px solid #C6C6C6'
        return this.borderColor
      } else if (this.bdr == 2) {
        this.borderColor.border = '1px solid #EEC597'
        return this.borderColor
      }
    }
  }
}
</script>
<style lang="less">
.open-preference-page {
  background: rgba(247, 249, 250, 1);
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
        font-size: 18px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 25px;
        li:nth-child(2) {
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(164, 184, 213, 1);
          line-height: 17px;
        }
        li:nth-child(3) {
          margin: 4px 0 3px 0;
          font-size: 12px;
          font-family: PingFangSC-Regular;
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
