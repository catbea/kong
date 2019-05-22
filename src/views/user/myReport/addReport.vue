<template>
  <div class="addReport-page">
    <div class="group">
      <van-cell-group>
        <van-cell
          title="报备楼盘"
          is-link
          :value="reportAddInfo.linkerName"
          :to="{path:'/user/myReport/addReport/reportMarket', query:{type:'report'}}"
        />
        <van-cell title="客户名字" is-link :value="reportAddInfo.clientName" to="reportCustomerEdit"/>
        <van-cell title="手机号" is-link :value="valueComputed" to="reportPhone"/>
        <van-cell title="渠道" v-show="angent.agentType !== 1" :value="channel" :is-link="chooseChannel" @click="showChannelFn" />
      </van-cell-group>
    </div>
    
    <!-- <p class="addReport-remarks">注：客户手机号只提供前三后四给分销商使用，请放心填写。</p> -->
    <!-- <div class="addReport-botton">
      <button class="addReport-btn addReport-btn-updata" @click="editInstitutionHandler">修改所属机构</button>
      <button class="addReport-btn addReport-btn-up" @click="submitReportHandler">提交报备</button>
    </div> -->
    <div class="addReport-submit">
      <button class="button" @click="submitReportHandler">提交报备</button>
    </div>
    <van-actionsheet v-model="showChannel">
      <div class="channel-box">
        <div class="topbar">
          <p class="title">渠道选择</p>
          <p class="subtitle">七天只能切换一次</p>
        </div>
        <div class="channel-list">
          <p class="item" v-for="(item,index) in channelList" :key="index" @click="changeChannelFn(item)">{{item.channelName}} <span v-if="item.freeFlag" class="free">免费券</span></p>
        </div>
        <div class="cancle" @click="hideChannelFn">取消</div>
      </div>
    </van-actionsheet>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import reportService from 'SERVICE/reportService'
export default {
  data() {
    return {
      hideClientMobile: '',
      showChannel: false,
      channelList: [],
      currentChannel: {},
      chooseChannel: false,
      channel: '',
      linkerId: '',
      angent: {}
    }
  },

  computed: {
    ...mapGetters(['reportAddInfo', 'userInfo']),
    valueComputed() {
      return this.reportAddInfo.phoneDisplay ? this.reportAddInfo.clientPhone : this.privacyPhone(this.reportAddInfo.clientPhone)
    }
  },
  created() {
    let linkerId = this.reportAddInfo && this.reportAddInfo.linkerId || ''
    if (linkerId) {
      this.linkerId = linkerId
      this.getAgentTypeByLinkerId()
      this.getChannelListByLinkerId()
    }
  },
  methods: {
    // 获取渠道列表
    getChannelListByLinkerId () {
      reportService.getChannelListByLinkerId({linkerId: this.linkerId}).then(res => {
        this.channelList = res
      }).catch()
    },
    // 获取经纪人类型
    getAgentTypeByLinkerId () {
      reportService.getAgentTypeByLinkerId({linkerId: this.linkerId}).then(res => {
        this.angent = res
        if (res.agentType === 0 ) {
          this.channel = res.channelName
          if (!res.channelName) {
            this.chooseChannel = true
            this.channel = this.reportAddInfo.channel ? this.reportAddInfo.channel : '请选择'
            this.currentChannel = this.reportAddInfo && this.reportAddInfo.currentChannel
          }
        }
      }).catch()
    },
    // 选择渠道
    changeChannelFn (item){
      this.currentChannel = item
      this.channel = `${item.channelName}${item.freeFlag ? '(免费券)' : ''}`
      this.$store.commit('REPORT_INFO', {
        channel: this.channel,
        currentChannel: this.currentChannel
      })
      this.hideChannelFn()
    },
    // 显示渠道
    showChannelFn () {
      if (!this.chooseChannel) {
        return false
      }
      if (this.channelList.length) {
        this.showChannel = true
      } else {
        this.$toast('该楼盘没有渠道！')
      }
    },
    // 隐藏渠道
    hideChannelFn () {
      this.showChannel = false
    },
    privacyPhone(value) {
      value = String(value)
      return value.length > 7 ? value.substr(0, 3) + '****' + value.substr(7) : ''
    },
    async addReportInfo(current) {
      if (this.reportAddInfo.phoneDisplay) {
        this.hideClientMobile = '0'
      } else {
        this.hideClientMobile = '1'
      }
      let channelId = ''
      if (this.angent.agentType === 0) {
        channelId =  this.angent.channelId || this.currentChannel.channelId
      }
      let developersId = this.angent.developersId ? this.angent.developersId : this.currentChannel.developersId
      let params = {
        clientId: this.reportAddInfo.clientId,
        clientName: this.reportAddInfo.clientName,
        clientMobile: this.reportAddInfo.clientPhone,
        linkerId: this.reportAddInfo.linkerId,
        linkerName: this.reportAddInfo.linkerName,
        channelId: channelId, 
        developersId: developersId
        // distributorId: this.userInfo.distributorId,
        // institutionId: this.userInfo.institutionId,
        // hideClientMobile: this.hideClientMobile
      }
      const res = await reportService.addReportInfo(params)
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
      // 非合作楼盘，无渠道可选，报备失败
      if (!this.angent.freeLinker) {
        return this.$dialog.alert({
          title: '非合作楼盘，无渠道可选，报备失败'
        })
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
      // 没有选择渠道
      if(this.channel === '请选择') {
        return this.showChannelFn()
      }
      this.addReportInfo()
    }
  }
}
</script>
<style lang="less">
.addReport-page {
  height: 100%;
  position: relative;
  //#F7F9FA
  background: #f7f9fa;
  .group{
   padding-top: 23px;
  }
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
  .addReport-remarks {
    font-size: 12px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 17px;
    padding: 0 16px;
    padding-top: 13px;
  }
  .addReport-submit{
    margin: 50px 16px 20px;
    .button{
      width: 100%;
      height: 44px;
      border-radius: 4px;
      font-weight: 400;
      font-size: 16px;
      color: rgba(255, 255, 255, 1);
      border: 0;
      background: rgba(0, 122, 230, 1);
    }
  }
  .addReport-botton {
    margin: 56px 32px;
    .addReport-btn {
      width: 144px;
      height: 44px;
      border-radius: 4px;
      line-height: 22px;
      font-weight: 400;
      font-size: 16px;
    }
    .addReport-btn-updata {
      color: rgba(0, 122, 230, 1);
      background: rgba(255, 255, 255, 1);
      border: 1px solid;
      margin-right: 23px;
    }
    .addReport-btn-up {
      color: rgba(255, 255, 255, 1);
      border: 0;
      background: rgba(0, 122, 230, 1);
    }
  }
  /deep/ .van-icon-close{
    display: none;
  }
  .channel-box{
    font-size: 16px;
    padding: 10px 0 0 0;
    background-color: #fff;
    .topbar{
      text-align: center;
      padding-bottom: 5px;
      .title{
        padding: 10px 0 5px;
        font-size: 18px;
        color: #333;
        font-weight: 600;
      }
      .subtitle{
        font-size: 12px;
        color: #999;
        z-index: 9;
        position: relative;
      }
    }
    
    .channel-list{
      max-height: 500px;
      overflow-y: scroll;
    }
    .item{
      padding: 16px 0 10px 16px;
      .free{
        display: inline-block;
        font-size: 10px;
        color: #fff;
        background-color: #EA4D2E;
        line-height: 15px;
        height: 15px;
        padding: 0 5px;
        border-radius: 2px;
        vertical-align: middle;
      }
    }
    .cancle{
      margin-top: 20px;
      height:50px;
      background:rgba(238,238,238,1);
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>
