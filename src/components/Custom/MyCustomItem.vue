<template>
  <van-swipe-cell :right-width="80" :on-close="onClose">          
    <van-cell-group>      
      <div class="van-hairline--bottom my-custom-item" @click="clickHandler">
        <avatar class="user-avatar" :avatar="info.avatarUrl"></avatar>
        <div
          class="bg_img user-attention"
          :style="{backgroundImage:'url('+attentionImg+')'}"
          v-if="info.attentionStatus==0"
        ></div>
        <div class="baseinfo-box">
          <p class="username">{{info.clientName}}</p>
          <p class="base-focus">{{focusInfo}}</p>
        </div>
        <div class="intention-box">
          <p class="intention-value" v-bind:style="{'color':Number(this.info.intentionality*100) >70?'#007AE6':'#999999'}">{{Number(this.info.intentionality*100).toFixed(1)}}%</p>
          <p class="intention-title">意向度</p>
        </div>
      </div>
    </van-cell-group>
    <span slot="right" class="delete-btn">删除</span>
  </van-swipe-cell>
</template>
<script>
import Avatar from 'COMP/Avatar'
export default {
  components: {
    Avatar
  },
  props: {
    info: Object,
    num: Number
  },
  data: () => ({
    attentionImg: require('IMG/user/icon_attention@2x.png')
  }),
  methods: {
    clickHandler() {
      this.$emit('click', this.info)
    },
    confirm () {
      this.$emit('delete', this.num)
    },
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
           this.$dialog.confirm({
              title: '是否确定移除该客户',
              message: '删除客户,也会删除与TA的聊天记录',
              className: 'delete-dialog'
          }).then(() => {
            this.confirm()
            instance.close()
          }).catch(() => {
            instance.close()
          });
          break
      }
    }
  },
  computed: {
    focusInfo() {
      return `累计浏览${this.info.browsCount || 0}次，平均停留${Number(this.info.averageTime)}s`
    }
  }
}
</script>
<style lang="less">
.my-custom-item {
  display: flex;
  // justify-content: space-around;
  width: 100%;
  height: 80px;
  .user-avatar {
    margin: 15px;
    margin-right: 12px;
    width: 50px;
    height: 50px;
  }
  .user-attention {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 49px;
    top: 49px;
  }
  .baseinfo-box {
    margin: 15px;
    margin-left: 0px;
    flex: 1;
    width: calc(100%-160px);
    width: -webkit-calc(100%-160px);
    font-family: PingFangSC-Semibold;
    .username {
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      padding-top: 5px;
      padding-bottom: 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .base-focus {
      font-size: 13px;
      font-weight: 400;
      color: #666666;
      font-family: PingFangSC-Regular;
    }
  }
  .intention-box {
    margin: 15px 0;
    margin-top: 9px;
    text-align: center;
    width: 80px;
    .intention-value {
      font-size: 20px;
      font-weight: 500;
      color: #007ae6;
      padding: 6px 0 10px 0;
      font-family: PingFangSC-Semibold;
    }
    .intention-title {
      font-size: 12px;
      font-weight: 400;
      color: #999999;
    }
  }
}
.delete-btn{
  display: block;
  height: 80px;
  width: 80px;
  line-height: 80px;
  color: #fff;
  font-size: 16px;
  background-color: #EA4D2E;
  text-align: center;
}
.delete-dialog{
  &.van-dialog{
    position: fixed;
    top: 50%;
    left: 50%;
    width: 85%;
    font-size: 16px;
    overflow: hidden;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    border-radius: 4px;
    background-color: #fff;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .van-dialog__confirm{
    color: #EA4D2E;
  }
  .van-dialog__header {
    font-weight: 500;
    padding-top: 25px;
    text-align: center;
  }
  .van-dialog__message--has-title{
    padding-top: 12px;
    color: #7d7e80;
  }
  .van-dialog__message{
    padding: 25px;
    font-size: 14px;
    line-height: 1.5;
    max-height: 60vh;
    overflow-y: auto;
    text-align: center;
    -webkit-overflow-scrolling: touch;
    white-space: pre-wrap;
  }
}
</style>
