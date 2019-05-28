<template>
  <div class="ai-server">
    <div class="ai-set scale-1px-bottom">
      <span class="title">AI客服</span>
      <van-switch v-model="checked" @change="changeSwitch" />
    </div>
    <div class="ai-tips">
      <p v-show="!checked">启用AI客服之后，AI客服会在聊天会话的过程中介入应答，请谨慎选择。</p>
      <p v-show="checked">关闭AI客服之后，您与客户的会话AI将不再介入，请谨慎选择。</p>
    </div>
  </div>
</template>

<script>
import userService from 'SERVICE/userService'
export default {
  data () {
    return {
      checked: false
    }
  },
  created () {
    this.getAI()
  },
  methods: {
    changeSwitch () {
      userService.updateAI({status: this.checked ? 1 : 0}).then(res => {
        if (this.checked) {
          this.$toast('AI客服开启成功')
        } else {
          this.$toast('AI客服关闭成功')
        }
      }).catch()
    },
    getAI () {
      userService.getAI({}).then(res => {
        this.checked = !!res
      }).catch()
    }
  }
}
</script>


<style lang="less" scoped>
.ai-server{
  height: 100%;
  position: relative;
  background-color: #F7F9FA;
  font-size: 14px;
  .ai-set{
    height: 56px;
    line-height: 56px;
    background-color: #fff;
    margin-top: 20px;
    padding: 0 16px;
    font-size: 16px;
    display: flex;
    .title{
      flex: 1;
    }
    .van-switch{
      margin-top: 12px;
    }
  }
  .ai-tips{
    padding: 10px 16px;
    font-weight:400;
    color:rgba(150,158,168,1);
    line-height:24px;
  }
}
</style>
