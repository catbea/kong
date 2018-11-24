<template>
  <div class="custom-detail">
    <div class="custom-info-box">
      <avatar class="custom-avatar"></avatar>
      <div class="custom-info">
        <div class="custom-name-box">
          <h5 class="custom-name">Susan Hall</h5>
          <van-icon name="edit" size="24px" />
        </div>
        <p class="custom-browsed">最近浏览：2018/05/22 22:08</p>
      </div>
    </div>
    <div class="custom-analyze-box">
      <van-tabs v-model="activeIndex" color="#007AE6" :line-width="15" :swipe-threshold="6">
        <van-tab title="分析">
          <custom-detail-analyze />
        </van-tab>
        <van-tab title="足迹">
          <custom-detail-track />
        </van-tab>
        <van-tab title="资料">
          <custom-detail-info />
        </van-tab>
      </van-tabs>

    </div>
  </div>
</template>
<script>
import Avatar from 'COMP/Avatar'
import CustomDetailAnalyze from 'COMP/Custom/CustomDetailAnalyze'
import CustomDetailTrack from 'COMP/Custom/CustomDetailTrack'
import CustomDetailInfo from 'COMP/Custom/CustomDetailInfo'

import CustomService from 'SERVICE/customService'

export default {
  components: {
    Avatar,
    CustomDetailAnalyze,
    CustomDetailTrack,
    CustomDetailInfo
  },
  data: () => ({
    id: -1,
    customBaseInfo: null,
    activeIndex: 0,
  }),
  created () {
    this.id = this.$route.params.id
    this.getCustomBaseInfo(this.id)
  },
  methods: {
    async getCustomBaseInfo (id) {
      const result = await CustomService.getClientInfo(id)
      this.customBaseInfo = result
    }
  }
}
</script>
<style lang="less">
.custom-detail {
  background: #f7f9fa;
  .custom-info-box {
    background: #fff;
    margin-bottom: 10px;
    display: flex;
    .custom-avatar {
      width: 60px;
      height: 60px;
      margin: 15px;
    }
    .custom-info {
      margin: 20px 15px 15px 0;
      .custom-name-box {
        display: flex;
        .custom-name {
          font-size: 18px;
          font-weight: 500;
          color: #333333;
        }
      }
      .custom-browsed {
        font-size: 13px;
        font-weight: 400;
        color: #999999;
      }
    }
  }
  .custom-analyze-box {
    background: #fff;
  }
}
</style>

