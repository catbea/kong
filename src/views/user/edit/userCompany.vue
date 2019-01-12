<template>
<div class="user-company">
  <div class="company">
    <h3>{{userInfo.distributorName || userData.distributorName}}</h3>
  </div>
  <div class="warning" v-show="!disBtn">
    <b>提示</b>{{this.warning}}
  </div>
  <div class="tips">{{this.tips}}</div>
  <div class="action">
    <button type="button" @click="toApply" :class="{'disabled': disBtn}">{{btnText}}</button>
  </div>
  <div class="loading"  v-show="showLoading" >
      <van-loading type="spinner" color="white" class="van-loading"/>
  </div>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import userService from 'SERVICE/userService'
export default {
  data() {
    return {
      warning: '请慎重编辑所属平台公司。成功申请离岗将导致楼盘不可续费、不可报备等一系列不可逆行为。',
      tips: '申请离岗后，会向所属后台提交离岗申请。若5个工作日所属平台未审批会默认通过处理。',
      btnText: '申请离岗',
      disBtn: true,
      userData: '',
      showLoading: true
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    // 获取用户离岗状态
    this.getUserInfo()
  },
  methods: {
    // 获取用户离岗状态
    async getUserInfo () {
      let result = await userService.getUserInfo(this.userInfo.agentId)
      if (result) {
        this.userData = result
        // leavingStatus  离岗状态  空 未申请 0 待处理  1 通过  2 拒绝
        let leavingStatus = result.leavingStatus + ''
        let text = {
          '': '申请离岗',
          '0': '申请审批中',
          '1': '审批通过',
          '2': '审批不通过'
        } 
        this.btnText = text[leavingStatus] || '未知状态'
        // 审核通过，并且完善了信息
        if(leavingStatus === '1' && this.userData.distributorId) {
          this.btnText = '申请离岗'
          this.disBtn = false
        }
        // 审核不通过或未申请
        if (leavingStatus === '' || leavingStatus === '2') {
          this.disBtn = false
        }
        if (leavingStatus === '1' && !this.userData.distributorId) {
          // 审批通过，更新信息
          this.$dialog.alert({
            title: '审批通过',
            confirmButtonText: '更新数据',
            className: 'update',
            message: '您提交的我的机构申请，已经通过，请及时填写新的机构信息避免部分功能无法使用。'
          }).then(() => {
            this.$store.commit('USER_INFO', Object.assign(this.userInfo, { distributorId: '', distributorName: ''}))
            this.$router.push('/public/complete-info')
          })
        }
        // 审批不通过
        if (leavingStatus === '2') {
          this.btnText = '申请离岗'
          if (!window.localStorage.setItem('userCompany')) {
            this.$dialog.alert({
            title: '审批不通过',
            confirmButtonText: '我知道了',
            message: '您提交的我的机构申请，被后台驳回，如有问题，请联系相关管理人员了解详细情况。'
            }).then(() => {
              window.localStorage.setItem('userCompany', true)
            })
          }
        }
      }
      this.showLoading = false
    },
    // 点击申请离岗按钮
    toApply () {
      if (this.disBtn) {
        return false
      }
      this.$dialog.confirm({
        title: '提示',
        message: '是否确认申请离岗?'
      }).then(() => {
        // 确认离岗
        this.apply()
        window.localStorage.setItem('userCompany', false)
      }).catch(() => {
        // 取消离岗
      })
    },
    // 申请离岗
    async apply () {
      let obj = {
        agentId: this.userInfo.agentId,
        personnelType: 1 // 1 离岗 2 变换组织
      }
      let result = await userService.applyAgent(obj)
      if (result) {
        this.$dialog.alert({
          title: '申请已提交',
          confirmButtonText: '我知道了',
          message: '后台通过修改申请后，即可重新选择我的平台公司'
        }).then(() => {
          // 按钮置灰不可点击
          this.disBtn = true
          this.btnText = '申请审核中'
        })
      }
    }

  }
}
</script>

<style lang="less" scoped>
.user-company {
  height: 100%;
  width: 100%;
  background-color: #fff;
  padding: 16px;
  .company {
    padding: 8px 0 24px;
    position: relative;
    border: none;
    h3 {
      font-size: 24px;
      height: 32px;
      line-height: 32px;
      font-weight: 600;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      text-align: center;
    }
  }

  .warning {
    line-height: 1.5;
    color: rgba(234, 77, 46, 1);
    font-size: 14px;
    b{
      display: block;
      font-size: 20px;
    }
  }

  .tips {
    padding-top: 20px;
    color: rgba(150, 158, 168, 1);
    font-size: 14px;
    line-height: 1.5;
  }

  .action {
    padding-top: 32px;
    button {
      width: 100%;
      border: none;
      height: 44px;
      background: rgba(234, 77, 46, 1);
      border-radius: 6px;
      color: #fff;
      font-size: 16px;
      &.disabled{
        background-color: #e8e8e8;
        cursor: not-allowed;
        color: #999;
      }
    }
  }

  .update {
    .van-button--large{
      height: 1.5rem;
    }
    .van-button__text{
      display: inline-block;
      background-color: rgba(0, 122, 230, 1);
      color: #fff;
      width: 80%;
      border-radius:6px;
      height: 40px;
      line-height: 40px;
    }
  }
  // loading
  .loading{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    .van-loading {
      display: inline-block;
      position: fixed;
      left: 50%;
      top: 50%;
      width: 50px;
      height: 50px;
      z-index: 5;
      margin-left: -25px;
      margin-top: -25px;
    }
  }
}
</style>

