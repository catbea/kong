<template>
  <div class="me-page">
    <business-card @showPopup="this.showPopp" @shareUserCard='this.enterSharePage'></business-card>
    <div class="top-null"></div>
    <div class="business-status-con">
      <div class="business-status-title">个人中心</div>
      <div class="modify-child">
        <div
          v-for="(item,index) in headIcons"
          :key="index"
          class="head-img"
          @click="selectedHead(item,index)"
        >
          <img :src="item.Icon">
          <p class="grou1Icon-p">{{item.title}}</p>
        </div>
      </div>
    </div>
    <div class="top-null"></div>
    <div class="business-status-tow">
      <div class="business-status-title">我的服务</div>
      <div class="modify-child">
        <div
          v-for="(img,index) in btnIcons"
          :key="index"
          class="head-img"
          @click="selectedHeads(index,img.type,img.itemCode)"
        >
          <!--   -->
          <img :src="img.Icon">
          <p class="grou1Icon-p">{{img.title}}</p>
        </div>
        <div class="head-img" onclick="qimoChatClick();">
          <img :src="consultImg">
          <p class="grou1Icon-p">在线咨询</p>
        </div>
      </div>
    </div>
    <div class="top-null-css"></div>
    <van-popup
      class="popup-view"
      v-model="openPopup"
      :overlay="true"
      :lock-scroll="true"
      :close-on-click-overlay="true"
      :click-overlay="overlayClose"
    >
      <div class="close-titile">
        <img class="closePopup" :src="this.closeImg" @click="overlayClose">
      </div>
      <img class="qrcode-view" :src="this.qrcodeImg">
      <span class="notice-view">扫描二维码关注</span>
      <span class="username-view">{{userInfo.name}}</span>
      <span class="company-view">{{userInfo.enterpriseName}}</span>
    </van-popup>
  </div>
</template>
<script>
import businessCard from 'COMP/User/BusinessCard'
import userService from 'SERVICE/userService'
import { Cell, CellGroup } from 'vant'
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'
export default {
  components: {
    businessCard,
    Cell,
    CellGroup
  },
  data: () => ({
    consultImg: require('IMG/user/Group8@2x.png'),
    closeImg: require('IMG/user/close_popup.png'),
    headIcons: [
      { title: '我的楼盘', Icon: require('IMG/user/mm@2x.png') },
      { title: '我的收藏', Icon: require('IMG/user/Group1@2x.png') },
      { title: '历史文章', Icon: require('IMG/user/Group3@2x.png') },
      { title: '我的报备', Icon: require('IMG/user/Group6@2x.png') },
      { title: '我的优惠券', Icon: require('IMG/user/Group5@2x.png') },
      { title: '消费账单', Icon: require('IMG/user/Group2@2x.png') },
      { title: '邀请有礼', Icon: require('IMG/user/Group4@2x.png') }
    ],
    btnIcons: [{ title: '勿扰模式', Icon: require('IMG/user/Group9@2x.png') }, { title: '意见反馈', Icon: require('IMG/user/Group7@2x.png') }],
    openPopup: false,
    qrcodeImg: ''
  }),
  created() {
    this.getUserInfo()
    this.getQrCode(this.userInfo.id)
    this.getVipAndPackage()
  },
  methods: {
    enterSharePage() {
      this.$router.push({ name: 'share-business-card' })
    },

    overlayClose() {
      this.openPopup = false
    },

    //展示二维码框
    showPopp() {
      this.openPopup = true
    },
    //点击获取二维码
    async getQrCode(agentId) {
      const result = await userService.getQrCode(agentId)
      if (result) {
        this.qrcodeImg = result.miniQrCode
      }
    },

    async getUserInfo() {
      // TODO jwt启用后应该不需再存userid
      // this.$store.dispatch('getUserVipInfo', userId)
    },
    async getVipAndPackage() {
      await this.$store.dispatch('getUserVipInfo')
    },

    selectedHead(item, index) {
      switch (index) {
        case 0:
          this.$router.push('/user/myMarket')
          break
        case 1:
          this.$router.push('/user/collection/myCollection')
          break
        case 2:
          this.$router.push('/user/articles/historicalArticles')
          break
        case 3:
          this.$router.push('/user/myReport')
          break
        case 4:
          this.$router.push('/user/myCoupon')
          break
        case 5:
          this.$router.push('/user/consumption/consumptionBill')
          break
        case 6:
          this.$router.push('/user/invitation/awWelfare')
          break
      }
    },
    selectedHeads(index, type, itemCode) {
      switch (index) {
        case 0:
          this.$router.push('/user/noDisturb')
          break
        case 1:
          window.location = 'https://support.qq.com/product/31776'
          break
        case 2:
          break
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>
<style lang="less">
.popup-view {
  width: 280px;
  height: 417px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > .close-titile {
    width: 100%;
    height: 24px;
    display: flex;
    flex-direction: row-reverse;

    > .closePopup {
      width: 24px;
      height: 24px;
      margin-top: 16px;
      margin-right: 16px;
    }
  }

  > .qrcode-view {
    width: 200px;
    height: 200px;
    text-align: center;
    margin-top: 28px;
  }
  > .notice-view {
    color: #969ea8;
    font-size: 12px;
  }
  > .username-view {
    color: #333333;
    font-size: 18px;
    margin-top: 60px;
  }
  > .company-view {
    margin-top: 7px;
    color: #333333;
    font-size: 12px;
  }
}
.me-page {
  height: 100%;
  background: #ffffff;
  .business-status-title {
    font-size: 20px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
    padding: 20px 16px 18px;
  }
  .top-null {
    height: 10px;
    background: rgba(247, 249, 250, 1);
  }
  .top-null-css {
    height: 30px;
    background: rgba(247, 249, 250, 1);
  }
  .business-status-con {
    height: 218px;
  }
  .business-status-tow {
    height: 140px;
  }
  .modify-child {
    .head-img {
      float: left;
      margin-left: 16px;
      margin-bottom: 16px;
      height: 60px;
      width: 65px;
      position: relative;
      margin-right: 10px;
      text-align: center;
      img {
        height: 24px;
        width: 24px;
      }
      > .grou1Icon-p {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 17px;
      }
    }
  }

  // > .business-info,
  // > .business-help {
  //   background: #fff;
  //   margin-top: 10px;
  //   > .business-info-cell {
  //     height: 56px;
  //     line-height: 56px;
  //     padding: 0 20px;
  //     font-size: 16px;
  //     color: #333333;
  //     font-weight: 400;
  //     > .van-icon {
  //       font-size: 16px;
  //       position: absolute;
  //       right: 5px;
  //       top: 50%;
  //       transform: translateY(-50%);
  //     }
  //     > .msg-dot {
  //       position: absolute;
  //       background: #ea4d2e;
  //       width: 8px;
  //       height: 8px;
  //       right: 30px;
  //       border-radius: 100%;
  //       top: 50%;
  //       transform: translateY(-50%);
  //     }
  //   }
  // }
}
</style>
