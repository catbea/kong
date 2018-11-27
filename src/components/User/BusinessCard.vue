<template>
  <div class="business-card-container">

    <div class="business-card-box">
      <!-- :style="{backgroundImage:'url(' + infoBg + ')'}" -->
      <div
        class="bg_img info-box"
        v-if="userInfo"
      >
        <div class="info-box-left">
          <img
            :src="leftIcon"
            class="box-left-leftIcon"
          >
          <span class="box-right-fx">
            <img
              :src="rightIcon"
              class="right-fx-rightIcon"
            >
            <p class="right-fx-title">分享</p>
          </span>
        </div>
        <div
          class="info-box-content"
          @click="editCLickHandler"
        >
          <span class="box-content-left">
            <p class="content-left-name">
              张佳玮
              <img
                :src="updataIcon"
                class="updataIcon"
              >
            </p>
            <p class="content-left-addres">主营：深圳 南油</p>
            <p class="content-left-compay">深圳尊豪网络科技有限公司</p>
            <p class="content-left-labe">
              <button class="left-labe-css">资深中介</button>
              <button class="left-labe-css">交易专家</button>
            </p>
            <p class="content-left-remar">十年房产置业生涯专业为您服务</p>
          </span>
          <span class="box-content-right">
            <img
              :src="personIcon"
              class="personIcon"
            >
          </span>
        </div>
        <!-- <card-avatar class="card-avatar" :url="userInfo.avatarUrl" :member="true" @click="editCLickHandler"></card-avatar>
        <div class="user-info" v-if="userVipInfo" :class="userVipInfo.isvip &&'member-status'" @click="editCLickHandler">
          <div class="user-name">fdfsdfds <img :src="editIcon"> </div>
          <p class="user-company">dfdfsdf</p>
          <p class="user-area">主营区域:dfsdfsdfds</p>
        </div>
        <tag-group class="tag-group-container" v-if="userInfo&&userVipInfo" :arr="userInfo.userTags"></tag-group>
        <p class="user-signature" :style="{color:userVipInfo&&userVipInfo.isvip ? '#E5B37B': '#A4B8D5'}" v-if="userInfo">“cdcsdc”</p>
        <router-link class="share-handler-icon" to="/user/share-business-card"><img :src="shareIcon"></router-link> -->
      </div>
      <img
        class="modify-img"
        :src="modifyImg"
      >
    </div>
    <div class="business-status-title">优惠服务</div>
    <div class="business-status-box">

      <div class="status-info-left">
        <img :src="crownIcon">
        <p class="info-title vip-status">{{isVipInfo}}</p>
        <p class="info-desc vip-desc">{{vipTimeInfo}}</p>
      </div>
      <div class="status-info-right">
        <img :src="discountIcon">
        <p class="info-title welfare-status">特惠套餐</p>
        <p class="info-desc welfare-desc">{{vipPackage}}</p>
      </div>
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
  methods: {
    editCLickHandler () {
      this.$router.push('/user/edit')
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userVipInfo']),
    isVipInfo () {
      return this.userVipInfo.isvip ? '已开通VIP' : '我的vip会员'
    },
    vipTimeInfo () {
      return this.userVipInfo.isvip ? this.userVipInfo.vip : '楼盘不限量'
    },
    vipPackage () {
      return this.userVipInfo.isvip ? this.userVipInfo.package : '任选10个盘'
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
    position: relative;
    height: 190px;
    > .info-box {
      position: relative;
      height: 177px;
      margin: 12px 16px;
      border-radius: 10px;
      background: rgba(64, 68, 87, 1);
      display: flex;
      > .info-box-left {
        display: flex;
        > .box-left-leftIcon {
          width: 24px;
          height: 24px;
          padding: 7px;
        }
        > .box-right-fx {
          position: absolute;
          right: 8px;
          top: 8px;
          > .right-fx-rightIcon {
            width: 24px;
            height: 24px;
          }
          > .right-fx-title {
            font-size: 10px;
            font-weight: 400;
            color: #aeb1c2;
            line-height: 14px;
          }
        }
      }
      > .info-box-content {
        display: flex;
        margin-top: 28px;
        position: relative;
        margin-left: -10px;
        > .box-content-left {
          padding-top: 11px;
          > .content-left-name {
            font-size: 26px;
            font-weight: 600;
            line-height: 37px;
            color: rgba(255, 255, 255, 1);
            display: flex;
            > .updataIcon {
              width: 17px;
              height: 17px;
              position: relative;
              margin-left: 10px;
              margin-top: 10px;
            }
          }
          > .content-left-addres {
            font-size: 11px;
            font-weight: 400;
            color: rgba(174, 177, 194, 1);
            line-height: 12px;
          }
          > .content-left-compay {
            font-size: 12px;
            font-weight: 400;
            color: rgba(174, 177, 194, 1);
            line-height: 12px;
            margin-top: 18px;
          }
          > .content-left-labe {
            font-size: 10px;
            font-weight: 400;
            color: rgba(174, 177, 194, 1);
            line-height: 30px;
            > .left-labe-css {
              padding: 2px 5px;
              background: rgba(143, 159, 177, 0.15);
              border-radius: 4px;
              border: 0;
              margin-right: 8px;
            }
          }
          > .content-left-remar {
            font-size: 12px;
            font-weight: 400;
            color: rgba(174, 177, 194, 1);
            line-height: 12px;
          }
        }
        > .box-content-right {
          position: relative;
          right: -30px;
          > .personIcon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
          }
        }
      }
      // > .card-avatar {
      //   margin: 20px;
      // }
      // > .user-info {
      //   position: absolute;
      //   top: 5px;
      //   display: inline-block;
      //   color: #ffffff;
      //   &.member-status {
      //     color: #e5b37b;
      //   }
      //   > .user-name {
      //     display: inline-flex;
      //     font-size: 18px;
      //     line-height: 25px;
      //     font-weight: 600;
      //     > img {
      //       width: 16px;
      //       height: 16px;
      //       padding: 4px;
      //     }
      //   }
      //   > .user-company {
      //     font-size: 12px;
      //     font-weight: 400;
      //     line-height: 17px;
      //     margin-top: -5px;
      //   }
      //   > .user-area {
      //     font-size: 12px;
      //     font-weight: 400;
      //     line-height: 17px;
      //     margin-top: 5px;
      //   }
      // }
      // > .tag-group-container {
      //   position: absolute;
      //   display: flex;
      //   top: 115px;
      //   left: 20px;
      // }
      // > .user-signature {
      //   position: absolute;
      //   bottom: 13px;
      //   left: 20px;
      //   font-size: 12px;
      // }
      // > .share-handler-icon {
      //   position: absolute;
      //   width: 16px;
      //   height: 16px;
      //   right: 20px;
      //   top: 5px;
      //   > img {
      //     width: 100%;
      //   }
      // }
    }
    > .modify-img {
      position: absolute;
      bottom: 10px;
      width: 100%;
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
