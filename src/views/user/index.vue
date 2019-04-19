<template>
  <div class="user-page">
    <!-- 顶部个人信息及vip信息 -->
    <business-card @showPopup="this.showPopp" @shareUserCard="enterSharePage"/>
    <div class="business-status-con">
      <div class="business-status-title">个人中心</div>
      <div class="modify-child">
        <div v-for="(item,index) in headIcons" :key="index" class="head-img" @click="selectedHead(item,index)">
          <!-- <img :src="item.Icon"> -->
           <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.Icon"></use>
           </svg>
          <p class="grou1Icon-p">{{item.title}}</p>
        </div>
        <!-- 邀请有礼 -->
        <div v-if="parseInt(userInfo.ifView)===1" class="head-img" @click="invitationHead">
          <!-- <img :src="item.Icon"> -->
           <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-me_gift"></use>
           </svg>
          <p class="grou1Icon-p">邀请有礼</p>
          <p class="politeness">有礼</p>
        </div>
        <!-- 拓客关系 -->
        <div class="relation head-img" @click="relationHandle">
          <!-- <img :src="item.Icon"> -->
           <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-mi_data"></use>
           </svg>
          <p class="grou1Icon-p">拓客关系</p>
        </div> 
      </div>  
    </div>
    <!--3.0.9迭代-->
    <div class="modify-childs">
        <!-- 我的点评 -->
        <div class="head-imgs" @click="jumpToRemark">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-me_review"></use>
          </svg>
          <p class="grou1Icon-p">我的点评</p>
        </div>
        <!-- 我的问答 -->  
        <div class="head-imgs" @click="jumpToAnswers">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-me_ask"></use>
          </svg>
          <p class="grou1Icon-p">我的问答</p>
        </div>
    </div>
    <!---->
    <div class="business-status-tow">
      <div class="business-status-title">我的服务</div>
      <div class="modify-child">
        <div v-for="(img,index) in btnIcons" :key="index" class="head-img" @click="selectedHeads(index,img.type,img.itemCode)">
          <!-- <img :src="img.Icon"> -->
          <svg class="icon" aria-hidden="true">
              <use :xlink:href="img.Icon"></use>
           </svg>
          <p class="grou1Icon-p">{{img.title}}</p>
        </div>
        <!-- <div class="head-img" onclick="qimoChatClick();">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-me_Customer"></use>
           </svg>
          <p class="grou1Icon-p">在线咨询</p>
        </div> -->
      </div>
    </div>
    <van-popup class="popup-view" v-model="openPopup" :click-overlay="overlayClose">
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
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'
export default {
  components: {
    ...mapGetters(['userInfo']),
    businessCard
  },
  data: () => ({
    consultImg: require('IMG/user/Group8@2x.png'),
    closeImg: require('IMG/user/close_popup.png'),
    headIcons: [
      { title: '我的楼盘', Img: require('IMG/user/mm@2x.png'), Icon: '#icon-me_building' },
      { title: '我的收藏', Img: require('IMG/user/Group1@2x.png'), Icon: '#icon-me_collection' },
      { title: '我的写一写', Img: require('IMG/user/Group3@2x.png'), Icon: '#icon-me_write' },
      { title: '我的报备', Img: require('IMG/user/Group6@2x.png'), Icon: '#icon-me_Reported' },
      { title: '我的优惠券', Img: require('IMG/user/Group5@2x.png'), Icon: '#icon-me_coupons' },
      { title: '消费账单', Img: require('IMG/user/Group2@2x.png'), Icon: '#icon-me_order' }, 
      // { title: '邀请有礼', Img: require('IMG/user/Group4@2x.png'),Icon:'' }
    ],
    btnIcons: [{ title: '勿扰模式', Img: require('IMG/user/Group9@2x.png'), Icon: '#icon-me_night' },{ title: '欢迎语设置', Img: require('IMG/user/reply_icon.png'), Icon: '#icon-me_reply' }, { title: '意见反馈', Img: require('IMG/user/Group7@2x.png'), Icon: '#icon-me_opinion' }],
    openPopup: false,
    qrcodeImg: '',
    oldUrl:0
  }),
  created() {
    this.getUserInfo()
    this.getQrCode(this.userInfo.agentId)
    this.getVipAndPackage()
    
  },
  // watch: {
  //   '$route' () {
  //     window.location.reload()
  //   }
  // },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    relationHandle() {
      //分享插件
      let host = process.env.VUE_APP_APP_URL
      // // window.open(`${host}panorama-helper/static/customerAnalysis.html?agentId=${this.userInfo.agentId}&enterpriseId=${this.userInfo.enterpriseId}`,'_blank') 
      // window.location.href = `${host}panorama-helper/static/customerAnalysis.html?agentId=${this.userInfo.agentId}&enterpriseId=${this.userInfo.enterpriseId}`
      this.$router.push({path: '/user/talk'})
    },
    enterSharePage() {
      this.$router.push({ path: '/user/share-card', query: { agentId: this.userInfo.agentId } })
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
      const result = await userService.getQrCodeByToken(agentId)
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
          // this.$router.push('/user/articles/historicalArticles')
          this.$router.push({ name: 'historicalArticles', query: { typeCode: '2' } })
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
        // case 6:
        //   this.$router.push('/user/invitation/awWelfare')
        //   break
      }
    },
    invitationHead() {
      this.$router.push('/user/invitation/awWelfare')
    },
    jumpToRemark () {
      this.$router.push('/user/remark')
    },
    jumpToAnswers () {
      this.$router.push('/user/questionAnswers')
    },
    selectedHeads(index, type, itemCode) {
      switch (index) {
        case 0:
          this.$router.push('/user/noDisturb')
          break
        case 1:
          this.$router.push('/user/reply')
          break
        case 2:
          window.location = 'https://support.qq.com/product/31776'
          break
        case 3:
          break
      }
    }
  },
  beforeDestroy () {
    // qimosdk.closeChatBox();
  }
}
</script>
<style lang="less" scoped>
.icon {
  width: 23px;
  height: 23px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.user-page {
  height: auto !important;
}
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
    padding: 20px;
  }
  > .notice-view {
    color: #969ea8;
    font-size: 12px;
  }
  > .username-view {
    color: #333333;
    font-size: 18px;
    margin-top: 60px;
    font-weight: bold;
  }
  > .company-view {
    margin-top: 7px;
    color: #333333;
    font-size: 12px;
  }
}
.user-page {
  height: 100%;
  background: #f7f9fa;
  .business-status-title {
    font-size: 20px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
    padding: 20px 16px 18px; 
  }
  .business-status-con {
    background: #fff;
    height: 218px;
    margin-top: 10px;
  }
  .business-status-tow {
    background: #fff;
    height: 140px;
    margin-top: 10px;
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
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 17px;
        margin-top: 8px;
      }
      .politeness {
        position: absolute;
        right: -7px;
        top: -5px;
        width: 41px;
        height: 22.3px;
        line-height: 21.3px;
        background: rgba(234, 77, 46, 1);
        border-radius: 10.6px;
        font-size: 12px;
        transform: scale(0.75);
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .modify-childs {
    display: flex;
    flex-direction: row;
    .head-imgs {
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
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 17px;
        margin-top: 8px;
      }
    }
  }
}
</style>
