<template>
  <div class="business-card-container">
    <div class="business-card-box">
      <div class="bg_img info-box" v-if="userInfo" :style="{backgroundImage:'url(' + infoBg + ')'}">
        <card-avatar class="card-avatar" :url="userInfo.avatarUrl" :member="true" @click="editCLickHandler"></card-avatar>
        <div class="user-info" v-if="userVipInfo" :class="userVipInfo.isvip &&'member-status'" @click="editCLickHandler">
          <div class="user-name">{{userInfo.name}} <img :src="editIcon"> </div>
          <p class="user-company">{{userInfo.distributorName}}</p>
          <p class="user-area">主营区域: {{userInfo.majorRegion}}</p>
        </div>
        <tag-group class="tag-group-container" v-if="userInfo&&userVipInfo" :data="userInfo.userTags" :textColor="textColor" :backColor="backColor"></tag-group>
        <p class="user-signature" :style="{color:userVipInfo&&userVipInfo.isvip ? '#E5B37B': '#A4B8D5'}" v-if="userInfo">“{{userInfo.signature}}”</p>
        <router-link class="share-handler-icon" to="/user/share-business-card"><img :src="shareIcon"></router-link>
      </div>
      <img class="modify-img" :src="modifyImg">
    </div>
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
import CardAvatar from 'COMP/User/CardAvatar'
import TagGroup from 'COMP/TagGroup'
import { mapGetters } from 'vuex'
export default {
  components: {
    CardAvatar,
    TagGroup
  },
  data: _ => ({
    infoBg: require('IMG/user/usercard@2x.png'),
    modifyImg: require('IMG/user/usercard_bg@2x.png'),
    crownIcon: require('IMG/user/cardGroup5@2x.png'),
    discountIcon: require('IMG/user/SetmealGroup17@2x.png'),
    shareIcon: require('IMG/user/share.png'),
    editIcon: require('IMG/user/editInfo@2x.png')
  }),
  methods: {
    editCLickHandler () {
      console.log(1);
      
      this.$router.push('/user/edit')
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userVipInfo']),
    textColor () {
      return this.userVipInfo.isvip ? '#E5B37B' : '#A4B8D5'
    },
    backColor () {
      return this.userVipInfo.isvip ? 'rgba(229,179,123,0.15)' : 'rgba(164,184,213,0.15)'
    },
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
  > .business-card-box {
    position: relative;
    height: 190px;
    > .info-box {
      position: relative;
      width: 345px;
      height: 175px;
      margin: 15px 15px 0;
      border-radius: 10px;
      > .card-avatar {
        margin: 20px;
      }
      > .user-info {
        position: absolute;
        top: 5px;
        display: inline-block;
        color: #ffffff;
        &.member-status {
          color: #e5b37b;
        }
        > .user-name {
          display: inline-flex;
          font-size: 18px;
          line-height: 25px;
          font-weight: 600;
          > img {
            width: 16px;
            height: 16px;
            padding: 4px;
          }
        }
        > .user-company {
          font-size: 12px;
          font-weight: 400;
          line-height: 17px;
          margin-top: -5px;
        }
        > .user-area {
          font-size: 12px;
          font-weight: 400;
          line-height: 17px;
          margin-top: 5px;
        }
      }
      > .tag-group-container {
        position: absolute;
        display: flex;
        top: 115px;
        left: 20px;
      }
      > .user-signature {
        position: absolute;
        bottom: 13px;
        left: 20px;
        font-size: 12px;
      }
      > .share-handler-icon {
        position: absolute;
        width: 16px;
        height: 16px;
        right: 20px;
        top: 5px;
        > img {
          width: 100%;
        }
      }
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
    > .status-info-right {
    }
  }
}
</style>
