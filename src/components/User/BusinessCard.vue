<template>
  <div class="business-card-container">
    <div class="business-card-box">
      <div class="bg_img info-box">
        <div class="info-top">
          <div class="info-box-title">
            <img class="info-box-left" :src="leftIcon" @click="showQrCode">
            <div class="info-box-right" @click="shareUserCard">
              <img class="share-img" :src="rightIcon">
              <span class="share-view">分享</span>
            </div>
          </div>
          <div class="info-box-center-p" @click="editCLickHandler">
            <div class="info-box-center">
              <div class="username-box">
                <span class="username-view">{{userInfo.name}}</span>
                <img class="username-img" :src="updataIcon">
              </div>
              <span class="main-camp-view">主营：{{userInfo.majorRegion}}</span>
              <span class="campany-view">{{userInfo.distributorName}}</span>
            </div>
            <img class="avatar-view" :src="userInfo.avatarUrl">
          </div>
        </div>
        <div class="info-bottom">
          <p class="content-left-labe">
            <a
              class="left-labe-css"
              v-for="(item,index) in newLabelList"
              :key="index"
            >{{item.labelName}}</a>
          </p>
          <p class="content-left-remar">{{userInfo.signature}}</p>
        </div>
        <!-- <div class="info-box-left">
          <img :src="leftIcon" class="box-left-leftIcon" @click="showQrCode">
          <span class="box-right-fx" @click="shareUserCard">
            <img :src="rightIcon" class="right-fx-rightIcon">
            <p class="right-fx-title">分享</p>
          </span>
        </div>-->
        <!-- <div class="info-box-content" @click="editCLickHandler">
          <span class="box-content-left">
            <p class="content-left-name">
              {{userInfo.name}}
              <img :src="updataIcon" class="updataIcon">
            </p>
            <p class="content-left-addres">主营：{{userInfo.majorRegion}}</p>
            <p class="content-left-compay">{{userInfo.distributorName}}</p>
            <p class="content-left-labe">
              <a
                class="left-labe-css"
                v-for="(item,index) in newLabelList"
                :key="index"
              >{{item.labelName}}</a>
            </p>
            <p class="content-left-remar">{{userInfo.signature}}</p>
          </span>
          <span class="box-content-right">
            <img :src="userInfo.avatarUrl" class="personIcon">
          </span>
        </div>-->
      </div>
      <img class="modify-img" :src="modifyImg">
    </div>
    <div class="business-status-title">优惠服务</div>
    <div class="business-status-box">
      <router-link tag="div" to="/user/myMember" class="status-info-left">
        <img :src="crownIcon">
        <p class="info-title vip-status">{{isVipInfo}}</p>
        <p class="info-desc vip-desc">{{vipTimeInfo}}</p>
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
import TagGroup from 'COMP/TagGroup'
import { mapGetters } from 'vuex'
export default {
  components: {
    TagGroup
  },
  data: () => ({
    leftIcon: require('IMG/user/left@2x.png'),
    rightIcon: require('IMG/user/fx.png'),
    personIcon: require('IMG/user/person_icon.png'),
    updataIcon: require('IMG/user/Group10@2x.png'),

    modifyImg: require('IMG/user/usercard_bg@2x.png'),
    crownIcon: require('IMG/user/cardGroup5@2x.png'),
    discountIcon: require('IMG/user/SetmealGroup17@2x.png'),
    shareIcon: require('IMG/user/share.png'),
    editIcon: require('IMG/user/editInfo@2x.png')
  }),

  onCreated: {},

  methods: {
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
      return this.userVipInfo.isvip ? '已开通VIP' : '我的vip会员'
    },
    vipTimeInfo() {
      return this.userVipInfo.isvip ? this.userVipInfo.vipRemark : '楼盘不限量'
    },
    vipPackage() {
      return this.userVipInfo.packageStatus == 0 ? '任选10个盘' : this.userVipInfo.vipRemark
    },
    newLabelList() {
      return this.userInfo.labelList.length > 3 ? this.userInfo.labelList.slice(0, 3) : this.userInfo.labelList
    }
  }
}
</script>   
<style lang="less">
.business-card-container {
  .business-status-title {
    font-size: 20px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
    padding: 5px 16px 11px;
  }
  > .business-card-box {
    width: 100%;
    height: 190px;
    position: relative;

    > .info-box {
      position: relative;
      height: 177px;
      margin: 12px 16px;
      border-radius: 10px;
      background: rgba(64, 68, 87, 1);
      display: flex;
      flex-direction: column;
     

      > .info-top {
        width: 100%;
        display: flex;
        flex-direction: column;

        > .info-box-title {
          display: flex;
          justify-content: space-between;

          > .info-box-left {
            width: 24px;
            height: 24px;
            border-top-left-radius: 10px;
            margin-left: 7px;
            margin-top: 7px;
          }

          > .info-box-right {
            margin-right: 7px;
            margin-top: 7px;
            display: flex;
            flex-direction: column;

            > .share-img {
              width: 24px;
              height: 24px;
            }

            > .share-view {
              color: #ffffff;
              font-size: 10px;
              margin-top: 3px;
            }
          }
        }
        > .info-box-center-p {
          display: flex;
          flex-direction: row;

          > .info-box-center {
            display: flex;
            flex-direction: column;
            margin-left: 28px;
            margin-top: -50px;

            > .username-box {
              margin-top: 35px;

              > .username-view {
                color: #ffffff;
                font-size: 20px;
              }
              > .username-img {
                width: 14px;
                height: 14px;
                margin-left: 5px;
              }
            }

            > .main-camp-view {
              color: #aeb1c2;
              font-size: 11px;
              margin-top: 6px;
            }

            > .campany-view {
              color: #aeb1c2;
              font-size: 12px;
              margin-top: 20px;
            }
          }

          > .avatar-view {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-left: 15px;
            margin-top: -10px;
          }
        }
      }

      > .info-bottom {
        display: flex;
        width: 100%;
        height: 49px;
        margin-top: -5px;
        flex-direction: column;

        > .content-left-labe {
          font-size: 10px;
          font-weight: 400;
          color: rgba(174, 177, 194, 1);
          line-height: 30px;
          margin-left: 27px;
          > .left-labe-css {
            padding: 2px 5px;
            background: rgba(143, 159, 177, 0.15);
            border-radius: 4px;
            border: 0;
            margin-right: 8px;
            color: #aeb1c2;
          }
        }

        > .content-left-remar {
          font-size: 12px;
          font-weight: 400;
          color: rgba(174, 177, 194, 1);
          line-height: 12px;
          margin-left: 28px;
          margin-top: 5px;
        }
      }
    }

     > .modify-img{
       width: 100%;
       position: absolute;
        margin-top: -40px;
      }
  }
  > .business-status-box {
    background-color: #ffffff;
    width: 100%;
    height: 100px;
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 10;
    margin: -10px 0 0;
    > div {
      position: relative;
      display: inline-block;
      width: 167px;
      height: 65px;
      background: #f8f8f8;
      border-radius: 3px;
      margin-top: 15px;
      > img {
        margin: 20px;
        width: 24px;
        height: 24px;
      }
      .info-title {
        position: absolute;
        top: 15px;
        left: 55px;
        font-size: 16px;
        font-weight: 400;
        color: #87665a;
        line-height: 1.5;
      }
      .info-desc {
        position: absolute;
        top: 35px;
        left: 55px;
        font-size: 12px;
        font-weight: 400;
        color: #999999;
        line-height: 1.5;
      }
    }
    > .status-info-left {
      margin: 0 15px;
    }
  }
}
</style>
