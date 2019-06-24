<template>
  <div class="user-page">
    <!-- 顶部个人信息及vip信息 -->
    <business-card @showPopup="this.showPopp"  @selectedShortcut="shortcut"/>
    <div class="business-status-con">
      <!-- </div> --> 
      <div class="div_view">
        <ul class="ul_view">
          <li class="li_view scale-1px-bottom" v-for="(item,index) in headIcons" :key="index" @click="selectedHead(item,index)" :class="index===6?'li':'li_view'">
            <div>
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="item.Icon"></use>
              </svg>
            </div>
            <div>
              <span class="grou1Icon-p" style="font-size:14px;">{{item.title}}</span>
            </div>
            <div>
              <svg class="icon" aria-hidden="true" style="width:16px;heigt:16px;margin-right:16px;">
                <use xlink:href="#icon-arrow"></use>
              </svg>
            </div> 
          </li>
        </ul>
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
    businessCard
  },
  data: () => ({
    consultImg: require('IMG/user/Group8@2x.png'),
    closeImg: require('IMG/user/close_popup.png'),
    headIcons: [
      { title: '我的问答', Img: require('IMG/user/Group2@2x.png'), Icon: '#icon-wenda' }, 
      { title: '我的点评', Img: require('IMG/user/Group2@2x.png'), Icon: '#icon-dianping' }, 
      { title: '优惠券', Img: require('IMG/user/Group2@2x.png'), Icon: '#icon-youhuiquan' }, 
      { title: '消费账单', Img: require('IMG/user/Group2@2x.png'), Icon: '#icon-dingdan' }, 
      { title: '邀请有礼', Img: require('IMG/user/Group2@2x.png'), Icon: '#icon-yaoqingyouli' }, 
      { title: '拓客关系', Img: require('IMG/user/Group2@2x.png'), Icon: '#icon-guanxitu' }, 
      { title: '设置', Img: require('IMG/user/Group2@2x.png'), Icon: '#icon-shezhi' },  
    ],
    btnIcons: [{ title: '勿扰模式', Img: require('IMG/user/Group9@2x.png'), Icon: '#icon-me_night' },{ title: '欢迎语设置', Img: require('IMG/user/reply_icon.png'), Icon: '#icon-me_reply' }, { title: '意见反馈', Img: require('IMG/user/Group7@2x.png'), Icon: '#icon-me_opinion' }, {title: 'AI客服', Img: require('IMG/user/me_Customer.png'), Icon: '#icon-me_Customer'}],
    openPopup: false,
    qrcodeImg: '',
    oldUrl:0,
    studyList:[]
  }),
  created() {
    this.getUserInfo()
    this.getQrCode(this.userInfo.agentId)
    this.getVipAndPackage()
    
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    relationHandle() { 
      this.$router.push({path: '/user/talk'})
    },
    enterSharePage() {
      this.$router.push({ path: '/user/share-card', query: { agentId: this.userInfo.agentId } })
    },

    overlayClose() {
      this.openPopup = false
    },
    goSchool () {
      userService.getStudyLinkerList({agentId:this.userInfo.agentId
      }).then((result) => { 
        if (result.length == 0 ) { 
          this.$toast('您开通的楼盘尚未上传培训素材')
        }else{
          this.$router.push('/user/learn')
        }
      }).catch((err) => {
          console.log(err)
      })
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
    shortcut(index) {
      switch (index) {
        case 0:
          this.$router.push('/user/myReport')
          break
        case 1:
          this.$router.push({ name: 'historicalArticles', query: { typeCode: '2' } })
          break
        case 2:
          // this.$router.push('/user/learn')
          this.goSchool()
          break
        case 3:
          this.enterSharePage()
          break
      } 
    },
    selectedHead(item, index) {
      switch (index) {
        case 0:
          this.$router.push('/user/questionAnswers')
          break
        case 1:
          this.$router.push('/user/remark')
          break
        case 2:
          this.$router.push('/user/myCoupon')
          break
        case 3: 
          this.$router.push('/user/consumption/consumptionBill')
          break
        case 4:
          this.$router.push('/user/invitation/awWelfare')
          break
        case 5:
          this.$router.push('/user/talk')
          break
        case 6:
          this.$router.push('/user/set')
          break 
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
  // .business-status-title {
  //   font-size: 20px;
  //   font-weight: 600;
  //   color: rgba(51, 51, 51, 1);
  //   line-height: 28px;
  //   padding: 20px 16px 18px; 
  // }
  .business-status-con { 
    margin-top: 6px;
    .div_view {
      // background: #fff; 
      .ul_view {
        list-style:none;
        .li_view { 
          width: 100%;
          height: 52px;
          display: flex;  
          background: #fff; 
          // &:after{
          //   position: absolute;
          //   content:" ";
          //   top:0;
          //   height: 1px;
          //   width: 100%;
          //   border-top:1px solid #ccc;
          //   transform-origin: 0 0;
          //   transform: scaleY(0.3);
          // }
          div:nth-child(1) {
            width: 49px;
            height: 100%; 
          }
          div:nth-child(2) {
            width: 78%;
            height: 100%;
            // border-bottom: 1px solid #E2E8EE;
          }
          div:nth-child(3) {
            // border-bottom: 1px solid #E2E8EE;
          }
          .icon{
            margin-left: 16px;
          }
        }
        .li { 
          width: 100%;
          height: 52px;
          margin-top:6px;
          display: flex;
        }
      }
    }
  } 
}
</style>
