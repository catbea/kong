<template>
  <div class="user-edit-page">
    <cell-group class="user-base-info">
      <div class="user-avatar" >
      <router-link to="/user/edit/userPortrait">
        <!-- <div class="bg_img self-avtar" slot="extra" :style="{backgroundImage:'url(' + userInfo.avatarUrl + ')'}"></div> -->
        <img :src="userEditIcon" class="editIcon-icon">
        <p class="user-avatar-clik">点击可编辑头像</p>
        </router-link>
      </div>
      <!-- <cell class="cell-item user-avatar" :to="'/user/edit/avatar'" title="我的头像" is-link>
        <div class="bg_img self-avtar" slot="extra" :style="{backgroundImage:'url(' + userInfo.avatarUrl + ')'}"></div>
      </cell> -->
      <cell class="cell-item" title="名字" is-link :to="'/user/edit/username'" value="看的纯净水" />
      <cell class="cell-item" title="手机号" :to="'/user/edit/phone'" is-link :value="userInfo.mobile" />
      <cell class="cell-item" title="微信号" :to="'/user/edit/userWechat'" is-link />
      <cell class="cell-item" title="主营区域" is-link :value="userInfo.majorRegion" />
      <cell class="cell-item" title="平台公司" is-link :value="userInfo.distributorName" />
      <!-- <cell class="cell-item" title="中介门店" is-link :value="`${userInfo.institutionName}-${userInfo.storeName}`" /> -->
      <cell class="cell-item" title="我的机构" is-link :to="'/user/edit/userMechanism'" />
    </cell-group>
    <cell-group class="user-advance-info">
      <cell class="cell-item tag-edit" title="标签展示" is-link :to="'/user/edit/userLabel'">
        <div slot="extra" class="tag-show-container">
          <div class="tag-item" v-for="item in userInfo.userTags" :key="item.labelId">{{item.labelName}}</div>
        </div>
      </cell>
      <cell class="cell-item  user-signature" title="个人介绍" :to="'/user/edit/userIntroduction'" is-link value="别问我是谁，请叫我大师" />
    </cell-group>
  </div>
</template>
<script>
import { Cell, CellGroup } from 'vant'
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'
export default {
  components: {
    Cell,
    CellGroup
  },
  created () {
    this.getUserInfo()
  },
  data () {
    return {
      userEditIcon: require('IMG/user/collection/Article@2x.png'),
    }
  },
  methods: {
    async getUserInfo () {
      // TODO jwt启用后应该不需再存userid
      let userId = window.localStorage.getItem('userId')
      this.$store.dispatch('getUserInfo', userId)
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>
<style lang="less">
.user-edit-page {
  width: 100%;
  height: 100%;
  background: #f2f5f9;

  > .user-base-info,
  > .user-advance-info {
    background: #fff;

    > .user-avatar {
      padding: 32px 0;
      text-align: center;
       .editIcon-icon {
        width: 50px;
        height: 50px;
      }
      .user-avatar-clik {
        font-size: 12px;

        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0, 122, 230, 1);
        line-height: 17px;
      }
    }
    .cell-item {
      // height: 56px;
      line-height: 56px;
      padding: 0 20px;
      &.user-avatar {
        height: 80px;
        line-height: 80px;
        .self-avtar {
          margin: 20px 0;
        }
        .van-cell__right-icon {
          padding: 30px 0;
        }
      }
      .van-cell__title {
        font-size: 16px;
        font-weight: 400;
        color: #333333;
      }
      .van-cell__right-icon {
        padding: 15px 0;
      }
    }
  }
  > .user-base-info {
    margin-bottom: 10px;
    .cell-item {
      position: relative;
      .self-avtar {
        position: absolute;
        width: 40px;
        height: 40px;
        right: 40px;
        border-radius: 4px;
      }
    }
  }
  > .user-advance-info {
    .tag-edit {
      position: relative;
      display: block;
      height: 110px;
      .van-cell__right-icon {
        position: absolute;
        right: 22px;
        top: 0px;
      }
      .tag-show-container {
        display: flex;
        .tag-item {
          height: 20px;
          line-height: 20px;
          display: inline-block;
          font-size: 12px;
          color: #666666;
          background: #f2f5f9;
          padding: 5px 5px;
          margin: 0 5px;
        }
      }
    }
    .user-signature {
      overflow: auto;
      // text-align: left;
      .van-cell__value {
        position: absolute;
        left: 100px;
        width: 200px;
        line-height: 16px;
        text-align: right;
        padding: 20px;
        > span {
          word-break: break-all;
          overflow: auto;
          font-size: 14px;
          text-align: left;
        }
      }
    }
  }
}
</style>
