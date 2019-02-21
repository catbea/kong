<template>
  <div class="addReport-page">
    <van-cell-group>
      <van-cell title="报备楼盘" is-link :value="reportAddInfo.linkerName" :to="{path:'/user/myReport/addReport/reportMarket', query:{type:'report'}}"/>
      <van-cell title="客户名字" is-link :value="reportAddInfo.clientName" to="reportCustomerEdit"/>
      <van-cell title="手机号" is-link :value="valueComputed" to="reportPhone"/>
    </van-cell-group>
    <p class="addReport-remarks">注：客户手机号只提供前三后四给分销商使用，请放心填写。</p>
    <div class="addReport-botton">
      <button class="addReport-btn addReport-btn-updata" @click="editInstitutionHandler">修改所属机构</button>
      <button class="addReport-btn addReport-btn-up" @click="submitReportHandler">提交报备</button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import reportService from 'SERVICE/reportService'
export default {
  computed: {
    ...mapGetters(['reportAddInfo', 'userInfo']),
    valueComputed(){
      return this.reportAddInfo.clientPhoneType === 'all' ? this.reportAddInfo.clientPhone : this.privacyPhone(this.reportAddInfo.clientPhone)
    }
  },
  created() {
    
  },
  methods: {
    privacyPhone(value) {
      value = String(value)
      return value.length > 7 ? value.substr(0, 3) + '****' + value.substr(7) : ''
    },
    async addReportInfo(current) {
      let params = {
        clientId: this.reportAddInfo.clientId,
        clientName: this.reportAddInfo.clientName,
        clientMobile: this.reportAddInfo.clientPhone,
        linkerId: this.reportAddInfo.linkerId,
        linkerName: this.reportAddInfo.linkerName,
        distributorId: this.userInfo.distributorId,
        institutionId: this.userInfo.institutionId
      }

      const res = await reportService.addReportInfo(params.clientId, params.clientName, params.clientMobile, params.linkerId, params.linkerName, params.distributorId, params.institutionId)

      this.$toast('提交报备成功')
      this.$router.replace('/user/myReport')
    },
    /**
     * 修改所属机构
     */
    editInstitutionHandler() {
      // this.$router.push({ path: '/user/edit/userMechanism', query: { distributorId: this.userInfo.distributorId, enterpriseId: this.userInfo.enterpriseId } })
      this.$router.push('/user/edit/userPlatform')
    },
    /**
     * 创建报备
     */
    submitReportHandler() {
      if (!this.reportAddInfo.linkerId) {
        this.$dialog.alert({
          title: '请选择报备楼盘'
        })
        return
      }
      if (!this.reportAddInfo.clientName) {
        this.$dialog.alert({
          title: '请选择客户名字'
        })
        return
      }
      if (!this.reportAddInfo.clientPhone) {
        this.$dialog.alert({
          title: '请输入客户手机号'
        })
        return
      }
      this.addReportInfo()
    }
  }
}
</script>
<style lang="less">
.addReport-page {
  //#F7F9FA
  background: #f7f9fa;
  padding-top: 23px;
  .van-cell {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding: 15px 0 15px 16px;
    box-sizing: border-box;
    line-height: 0.64rem;
    position: relative;
    background-color: #fff;
    color: #333;
    font-size: 0.37333rem;
    overflow: hidden;
  }
  .van-cell-group {
    background-color: #fff;
    padding-right: 16px;
  }
  .van-cell__title {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    font-size: 15px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 21px;
  }
  .van-cell__value {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    font-size: 15px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 21px;
  }
  > .addReport-remarks {
    font-size: 12px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 17px;
    padding: 0 16px;
    padding-top: 13px;
  }
  > .addReport-botton {
    margin: 56px 32px;
    > .addReport-btn {
      width: 144px;
      height: 44px;
      border-radius: 4px;
      line-height: 22px;
      font-weight: 400;
      font-size: 16px;
    }
    > .addReport-btn-updata {
      color: rgba(0, 122, 230, 1);
      background: rgba(255, 255, 255, 1);
      border: 1px solid;
      margin-right: 23px;
    }
    > .addReport-btn-up {
      color: rgba(255, 255, 255, 1);
      border: 0;
      background: rgba(0, 122, 230, 1);
    }
  }
}
</style>
