<template>
  <div class="user-edit-page">
    <cell-group class="user-base-info">
      <cell class="cell-item user-avatar" :to="'/user/edit/avatar'" title="我的头像" is-link>
        <div class="bg_img self-avtar" slot="extra" :style="{backgroundImage:'url(' + userInfo.avatarUrl + ')'}"></div>
      </cell>
      <cell class="cell-item" title="姓名" is-link :to="'/user/edit/username'" :value="userInfo.name" />
      <cell class="cell-item" title="手机号" :to="'/user/edit/phone'" is-link :value="userInfo.mobile" />
      <cell class="cell-item" title="主营区域" is-link :value="userInfo.majorRegion" />
      <cell class="cell-item" title="平台公司" is-link :value="userInfo.distributorName" />
      <cell class="cell-item" title="中介门店" is-link :value="`${userInfo.institutionName}-${userInfo.storeName}`" />
    </cell-group>
    <cell-group class="user-advance-info">
      <cell class="cell-item tag-edit" title="形象标签" is-link>
        <div slot="extra" class="tag-show-container">
          <div class="tag-item" v-for="item in userInfo.userTags" :key="item.labelId">{{item.labelName}}</div>
        </div>
      </cell>
      <cell class="cell-item user-signature" title="个性签名" is-link :value="userInfo.signature" />
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
  methods: {
    async getUserInfo () {
      // TODO jwt启用后应该不需再存userid
      let userId = window.localStorage.getItem('userId')
      this.$store.dispatch('getUserInfo', userId)
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
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
    .cell-item {
      height: 56px;
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
        right: 10px;
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
      text-align: left;
      .van-cell__value {
        position: absolute;
        left: 100px;
        width: 200px;
        line-height: 12px;
        text-align: left;
        padding: 20px;
        > span {
          word-break: break-all;
          overflow: auto;
          font-size: 14px;
        }
      }
    }
  }
}
</style>


