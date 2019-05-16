<template>
  <div class="business-card-container">
    <div class="business-card-box">
      <div class="bg_img info-box" @click="editCLickHandler">
        <!-- 左上二维码形状,点击出名片 -->
        <i class="icon iconfont icon-me_Qrcode qr-icon" @click.stop="showQrCode"/>
        <!-- 右上分享 -->
        <div class="share-box" @click.stop="shareUserCard">
          <i class="icon iconfont icon-Building_list_share share-icon"/>
          <span class="share-text">分享</span>
        </div>
        <!-- 用户avatar -->
        <avatar class="user-avatar" :avatar="userInfo.avatarUrl"/>

        <div class="user-info-content">
          <!-- 姓名、主营区域 -->
          <div class="user-detail-box">
            <div class="username-box">
              <span class="username-text">{{userInfo.name}}</span>
              <i class="icon iconfont icon-me_editor username-edit-icon"></i>
            </div>
            <p class="main-camp-view">主营：{{userInfo.majorRegion}}</p>
          </div>
          <!-- 公司、标签、签名 -->
          <div class="user-company-box">
            <!-- <p class="campany-view">{{userInfo.distributorName}}</p> -->
            <p class="content-left-labe">
              <a class="left-labe-css" v-for="(item,index) in newLabelList" :key="index">{{item.labelName}}</a>
            </p>
            <p class="content-left-remar">{{userInfo.signature}}</p>
          </div>
        </div>
      </div>
      <img class="modify-img" :src="modifyImg">
    </div>
    <div class="business-status-title">优惠服务</div>
    <div class="business-status-box">
      <router-link tag="div" to="/user/myMember" class="status-info-left">
        <img :src="crownIcon">
        <p class="info-title vip-status">{{isVipInfo}}</p>
        <p class="info-desc welfare-desc">{{vipTimeInfo}}</p>
      </router-link>
      <router-link tag="div" to="/user/mypreference/openPreference" class="status-info-right">
        <img :src="discountIcon">
        <p class="info-title welfare-status">特惠套餐</p>
        <p class="info-desc welfare-desc">{{vipPackage}}</p>
      </router-link>
    </div>
  </div>
</template>
<script>
import Avatar from 'COMP/Avatar'
import TagGroup from 'COMP/TagGroup'
import { mapGetters } from 'vuex'
import marketService from 'SERVICE/marketService'
export default {
  components: {
    TagGroup,
    Avatar
  },
  data: () => ({
    modifyImg: require('IMG/user/usercard_bg@2x.png'),
    crownIcon: require('IMG/user/cardGroup5@2x.png'),
    discountIcon: require('IMG/user/SetmealGroup17@2x.png'),
    vipInfo: ''
  }),
  created () {
    this.getVipInfo()
  },
  methods: {
  async getVipInfo() {
    let res = await marketService.vipInfo()
    this.vipInfo = res
  },
    editCLickHandler() {
      this.$router.push('/user/edit')
    },

    showQrCode() {
      this.$emit('showPopup', '')
    },

    shareUserCard() {
      this.$emit('shareUserCard', '')
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userVipInfo']),

    isVipInfo() {
      return '我的vip会员'
      // return this.userVipInfo.isvip ? '已开通VIP' : '我的vip会员'
    },
    vipTimeInfo() {
      // return this.userVipInfo.isvip ? this.userVipInfo.vipRemark : '楼盘不限量'
      if (this.vipInfo) {
        let time = this.vipInfo.expireTimestamp
        let text = '楼盘不限量'
        if (time > +new Date()) {
          text = '已开通部分城市'
        }
        return text
      } else {
        return ''
      }
    },
    vipPackage() {
      return this.userVipInfo.packageStatus == 2 ? '任选10个盘' : this.userVipInfo.packageRemark
    },
    newLabelList() {
      return this.userInfo.labelList.length > 3 ? this.userInfo.labelList.slice(0, 3) : this.userInfo.labelList
    }
  }
}
</script>   
<style lang="less">
.business-card-container {
  background: #fff;
  > .business-card-box {
    > .info-box {
      position: relative;
      height: 190px;
      margin: 12px 16px;
      border-radius: 10px;
      background: #404456;
      > .qr-icon {
        position: absolute;
        top: 5px;
        left: 5px;
        font-size: 24px;
        color: #686b80;
      }
      > .share-box {
        position: absolute;
        top: 5px;
        right: 10px;
        color: #ffffff;
        > .share-icon {
          display: block;
          font-size: 24px;
        }
        > .share-text {
          display: block;
          font-size: 10px;
          padding-top: 5px;
        }
      }
      > .user-avatar {
        position: absolute;
        width: 80px;
        height: 80px;
        top: 30px;
        right: 40px;
      }
      > .user-info-content {
        padding: 25px 30px;
        > .user-detail-box {
          line-height: 1;
          > .username-box {
            color: #fff;
            > .username-text {
              font-size: 20px;
            }
            > .username-edit-icon {
              color: rgba(255, 255, 255, 0.15);
            }
          }
          > .main-camp-view {
            margin-top: 8px;
            color: #aeb1c2;
            font-size: 12px;
          }
        }
        > .user-company-box {
          color: #aeb1c2;
          line-height: 1.5;
          font-size: 12px;
          margin-top: 36px;
          > .content-left-labe {
            margin-top: 8px;
            > .left-labe-css {
              background: rgba(143, 159, 177, 0.15);
              padding: 1px 3px;
              border-radius: 4px;
              color: #aeb1c2;
              margin: 3px 5px 3px 0;
              transform: scale(0.8);
            }
          }
          > .content-left-remar {
            margin-top: 8px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    > .modify-img {
      width: 100%;
      position: absolute;
      margin-top: -40px;
    }
  }

  > .business-status-title {
    font-size: 20px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    padding: 10px 16px 8px !important;
  }

  > .business-status-box {
    background-color: #ffffff;
    width: 100%;
    padding-bottom: 20px;
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 10;
    > div {
      position: relative;
      display: inline-block;
      width: 167px;
      height: 65px;
      background: #f8f8f8;
      border-radius: 3px;
      margin-top: 5px;
      > img {
        margin: 20px 10px;
        width: 24px;
        height: 24px;
      }
      .info-title {
        position: absolute;
        top: 10px;
        left: 42px;
        font-size: 16px;
        font-weight: 400;
        color: #87665a;
        line-height: 1.5;
      }
      .info-desc {
        position: absolute;
        top: 33px;
        left: 42px;
        font-size: 10px;
        font-weight: 400;
        color: #999999;
        line-height: 22px;
      }
    }
    > .status-info-left {
      margin: 0 15px;
      > .info-desc {
        font-size: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
