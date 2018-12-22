<template>
  <div class="commission-page">
    <div class="commission-content">
      <p>{{distributorName}}</p>
      <p>
        佣金提成：
        <span>{{commission | textOver }}</span>
      </p>
    </div>
  </div>
</template>
<script>
import MarketService from 'SERVICE/marketService'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    commission: null
  }),
  created() {
    this.linkerId = this.$route.params.id
    this.getLinkerDetail(this.linkerId)
  },
  computed: {
    ...mapGetters(['userInfo'])
  },

  methods: {
    async getLinkerDetail(id) {
      const result = await MarketService.getLinkerDetail(id)

      this.commission = result.commission
      this.distributorName=result.distributorName
    }
  }
}
</script>
<style lang="less">
.commission-page {
  height: 100%;
  width: 100%;
  background: #f7f9fa;
  .commission-content {
    width: 343px;
    padding: 16px 0 20px 16px;
    margin: 16px 0 0 16px;
    background: #ffffff;
    p {
      font-size: 18px;
      font-family: PingFang-SC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
    }
    p:nth-child(2) {
      margin-top: 16px;
      font-size: 15px;
      span {
        color: #ea4d2e;
      }
    }
  }
}
</style>
