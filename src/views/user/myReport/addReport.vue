<template>
  <div class="addReport-page">
    <cell-group>
      <cell
        title="报备楼盘"
        is-link
        :value="reportAddInfo.linkerName"
        :to="{path:'/user/myReport/addReport/reportMarket', query:{type:'report'}}"
      />
      <cell
        title="客户名字"
        is-link
        :value="reportAddInfo.clientName"
        to="reportCustomer"
      />
      <cell
        title="手机号"
        is-link
        :value="reportAddInfo.clientPhone"
        to="reportPhone"
      />
      <!-- <cell title="单元格"  is-link value="内容" label="描述信息" /> -->
    </cell-group>
    <p class="addReport-remarks">注：客户手机号只提供前三后四给分销商使用，请放心填写。</p>
    <div class="addReport-botton">
      <button class="addReport-btn addReport-btn-updata" @click="editInstitutionHandler">修改所属机构</button>
      <button class="addReport-btn addReport-btn-up" @click="submitReportHandler">提交报备</button>
    </div>
  </div>
</template>
<script>
import { Cell, CellGroup } from 'vant'
import { mapGetters } from 'vuex'
import reportService from 'SERVICE/reportService'
export default {
  components: {
    Cell,
    CellGroup
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['reportAddInfo'])
  },
  methods: {
    async addReportInfo(current) {
      let params = {
        clientId: this.reportAddInfo.clientId,
        clientName: this.reportAddInfo.clientName,
        clientMobile: this.reportAddInfo.clientPhone,
        linkerId: this.reportAddInfo.linkerId,
        linkerName: this.reportAddInfo.linkerName,
        distributorId: this.reportAddInfo.distributorId,
        institutionId: this.reportAddInfo.institutionId
      }
      const res = await reportService.addReportInfo(params.clientId, params.clientName, params.clientMobile, params.linkerId, params.linkerName, params.distributorId, params.institutionId)
    },
    /**
     * 修改所属机构
     */
    editInstitutionHandler() {
      this.$router.push('/user/edit/userMechanism')
    },
    /**
     * 创建报备
     */
    submitReportHandler() {
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
