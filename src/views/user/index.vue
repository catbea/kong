<template>
  <div class="me-page">
    <business-card v-if="userInfo">
    </business-card>
    <cell-group class="business-info">
      <cell class="business-info-cell" title="我的楼盘" is-link>
        <div slot="extra" class="msg-dot" />
      </cell>
      <cell class="business-info-cell" title="优惠券" is-link>
        <div slot="extra" class="msg-dot" />
      </cell>
      <cell class="business-info-cell" title="线下报备" is-link>
        <div slot="extra" class="msg-dot" />
      </cell>
      <cell class="business-info-cell" title="消费账单" is-link>
        <div slot="extra" class="msg-dot" />
      </cell>
    </cell-group>
    <div class="business-help">
      <cell class="business-info-cell" title="邀请有礼" is-link>
        <div slot="extra" class="msg-dot" />
      </cell>
      <cell class="business-info-cell" title="意见反馈" is-link>
        <div slot="extra" class="msg-dot" />
      </cell>
    </div>
  </div>
</template>
<script>
import businessCard from 'COMP/User/BusinessCard'
import { Cell, CellGroup } from 'vant'
import * as types from '@/store/mutation-types'
import { mapGetters } from 'vuex'
export default {
  components: {
    businessCard,
    Cell,
    CellGroup
  },
  data: _ => ({

  }),
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      // TODO jwt启用后应该不需再存userid
      let userId = window.localStorage.getItem('userId')
      this.$store.dispatch('getUserInfo', userId)
      this.$store.dispatch('getUserVipInfo', userId)
    }
  },
  computed: {    
    ...mapGetters(['userInfo']),
  }
}
</script>
<style lang="less">
.me-page {
  height: 100%;
  background: #f2f5f9;
  > .business-card-container {
    .card-box {
      height: 192px;
    }
  }
  > .business-info ,>.business-help{
    background: #fff;
    margin-top: 10px;
    > .business-info-cell {
      height: 56px;
      line-height: 56px;
      padding: 0 20px;
      font-size: 16px;
      color: #333333;
      font-weight: 400;
      > .van-icon {
        font-size: 16px;
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
      }
      > .msg-dot {
        position: absolute;
        background: #ea4d2e;
        width: 8px;
        height: 8px;
        right: 30px;
        border-radius: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>


