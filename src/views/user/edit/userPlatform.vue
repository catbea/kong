<template>
<div class="user-platform">
  <div class="platform">
    <h3>我的机构</h3>
    <p class="name">
      <img :src="userInfo.institutionLogo" v-if="userInfo.institutionLogo"/>
      <img :src="userInfo.avatarUrl"  v-else />
      {{userInfo.institutionName || this.userData.institutionName}}</p>
  </div>
  <div class="warning">{{this.warning}}</div>
  <div class="action">
    <button type="button" @click="toApply" :class="{'disabled': disBtn}">{{btnText}}</button>
  </div>
  <div class="loading"  v-show="showLoading" >
      <van-loading type="spinner" color="white" class="van-loading"/>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import userService from 'SERVICE/userService'
export default {
  data() {
    return {
      warning: '修改您的机构需向后台提交申请修改。审核通过后，可重新进行选择。',
      btnText: '申请修改',
      disBtn: true,
      userData: '',
      showLoading: true
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    // 获取用户离岗状态
    this.getUserInfo()
  },
  methods: {
    // 获取用户离岗状态
    async getUserInfo() {
      let result = await userService.getUserInfo(this.userInfo.agentId)
      if (result) {
        this.userData = result
        // switchStatus 组织切换状态 空 未申请 0 待处理  1 通过  2 拒绝
        let switchStatus = result.switchStatus + ''
        let text = {
          '': '申请修改',
          '0': '申请审批中',
          '1': '审批通过',
          '2': '审批不通过'
        }
        this.btnText = text[switchStatus] || '未知状态'
        // 审核通过，并且完善了信息
        if (switchStatus === '1' && this.userData.institutionId) {
          this.btnText = '申请修改'
          this.disBtn = false
        }
        // 审核不通过或未申请
        if (switchStatus === '' || switchStatus === '2') {
          this.disBtn = false
        }
        if (switchStatus === '1' && !this.userData.institutionId) {
          // 审批通过，更新信息
          this.$dialog
            .alert({
              title: '审批通过',
              confirmButtonText: '更新数据',
              message: '您提交的我的机构申请，已经通过，请及时填写新的机构信息避免部分功能无法使用。'
            })
            .then(() => {
              this.$store.commit('USER_INFO', Object.assign(this.userInfo, { institutionId: '', institutionName: '' }))
              this.$router.push('/public/complete-info')
            })
        }
        // 审批不通过
        if (switchStatus === '2') {
          this.btnText = '申请修改'
          let storage = JSON.parse(window.localStorage.getItem('userPlatform'))
          if (!storage) {
            this.$dialog
              .alert({
                title: '审批不通过',
                message: '您提交的我的机构申请，被后台驳回，如有问题，请联系相关管理人员了解详细情况。'
              })
              .then(() => {
                window.localStorage.setItem('userPlatform', true)
              })
          }
        }
      }
      this.showLoading = false
    },
    // 点击申请离岗按钮
    toApply() {
      if (this.disBtn) {
        return false
      }
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否确认申请修改?'
        })
        .then(() => {
          // 确认离岗
          this.apply()
          window.localStorage.setItem('userPlatform', false)
        })
        .catch(() => {
          // 取消离岗
        })
    },
    // 申请离岗
    async apply() {
      let obj = {
        agentId: this.userInfo.agentId,
        personnelType: 2 // 1 离岗 2 变换组织
      }
      let result = await userService.applyAgent(obj)
      if (result) {
        this.$dialog
          .confirm({
            title: '申请成功',
            message: '后台通过修改申请后，即可重新选择我的机构'
          })
          .then(() => {
            // 按钮置灰不可点击
            this.disBtn = true
            this.btnText = '申请审批中'
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-platform {
  height: 100%;
  width: 100%;
  background-color: #fff;
  padding: 16px;
  .platform {
    padding: 12px 0 0;
    position: relative;
    border: none;
    h3 {
      font-size: 20px;
      height: 28px;
      line-height: 28px;
      font-weight: 600;
    }
    p {
      vertical-align: middle;
      padding: 20px 0 10px;
      font-size: 24px;
      color: rgba(51, 51, 51, 1);
      line-height: 50px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      img {
        width: 50px;
        height: 50px;
        vertical-align: middle;
        margin-right: 10px;
        border-radius: 50%;
      }
    }
  }

  .warning {
    padding-top: 24px;
    line-height: 1.5;
    color: rgba(150, 158, 168, 1);
    font-size: 14px;
  }
  .action {
    padding-top: 32px;
    button {
      width: 100%;
      border: none;
      height: 44px;
      background: #EA4D2E;
      border-radius: 4px;
      color: #fff;
      font-size: 16px;
      &.disabled {
        background-color: #e8e8e8;
        cursor: not-allowed;
        color: #999;
      }
    }
  }
  // loading
  .loading {
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
