<template>
  <div class="channel">
    <div class="current-channel scale-1px-bottom">
      <b class="title">当前渠道<span>(不可更改)</span></b>
      <p>{{this.info.channelName}}</p>
    </div>
    <div class="other-channer scale-1px-bottom">
      <b class="title">切换其他渠道</b>
      <div class="change">
        <p class="name">
          {{currentChannel.channelName}} <span class="free" v-if="currentChannel.freeFlag">免费券</span>
        </p>
        <span class="arrow" @click="showChannelFn">
           <img src="../../../assets/img/dynamics/arrow.png" alt="">
        </span>
      </div>
    </div>
    <div class="reason-box">
      <b class="title">切换原因</b>
      <div class="reason-list">
        <span v-for="(item,index) in reasons" :key="index" :class="{'active': index === reasonIndex}" @click="changeReason(index)">{{item}}</span>
      </div>
      <div class="other-reason" v-show="reasonIndex==3">
        <textarea v-model="reasonText" name="" class="textarea" id="" cols="30" rows="10" placeholder="请输入其他原因" @blur="blur"></textarea>
      </div>
    </div>
    <div class="submit" @click="updateChannel">
      确认修改
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
import marketService from 'SERVICE/marketService'
export default {
  data () {
    return {
      info: {},
      reasons: ['从渠道离职', '佣金不满意', '渠道无券', '其他'],
      reasonIndex: 0,
      showChannel: false,
      channelList: [],
      currentChannel: {
        channelId: '',
        channelName: '',
        freeFlag: '',
      },
      reasonText: '',
      subClick: false
    }
  },
  created () {
    this.info = this.$route.query
    this.getChannelListByLinkerId()
  },
  methods: {
    // 获取渠道列表
    getChannelListByLinkerId () {
      marketService.getChannelListByLinkerId({linkerId: this.info.linkerId}).then(res => {
        this.channelList = res
        if (res.length) {
          this.currentChannel = res[0]
        }
      }).catch()
    },
    // 选择原因
    changeReason (index) {
      this.reasonIndex = index
    },
    // 选择渠道
    changeChannelFn (item){
      this.currentChannel = item
      this.hideChannelFn()
    },
    // 显示渠道
    showChannelFn () {
      this.showChannel = true
    },
    // 隐藏渠道
    hideChannelFn () {
      this.showChannel = false
    },
    // 收起键盘弹框
    blur() {
      setTimeout(()=>{document.activeElement.scrollIntoViewIfNeeded(true)},10)
    },
    // 提交渠道
    updateChannel () {
      if (this.currentChannel.channelId === this.info.channelId) {
        return this.$toast('切换的渠道与当前渠道一致，请重新选择')
      }
      if (this.reasonIndex === 3 && !this.reasonText) {
        return this.$toast('请填写切换渠道原因')
      }
      this.switchChannel()
    },
    // 切换渠道
    switchChannel () {
      // 防重复提交
      if (this.subClick) {
        return false
      }
      this.subClick = true
      let switchingReason = (this.reasonIndex === 3) ? this.reasonText : this.reasons[this.reasonIndex]
      marketService.switchChannel({
        linkerId: this.info.linkerId,
        newChannelId: this.currentChannel.channelId,
        oldChannelId: this.info.channelId || '4',
        switchingReason: switchingReason
      }).then(res => {
        this.$toast('渠道切换成功')
        setTimeout(() => {
          this.$router.go(-1)
        }, 1500)
      }).catch(err => {
         this.subClick = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.channel{
  padding: 28px 16px;
  font-size: 16px;
  .title{
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
    span{
      font-size: 14px;
      color: #999;
      font-weight: 400;
      margin-left: 5px;
    }
  }
  .current-channel{
    p{
      padding: 8px 0;
      color: #999;
      margin-top: 12px;
    }
  }
  .other-channer{
    margin: 30px 0;
    .change{
      display: flex;
      align-items: center;
      margin-top: 20px;
      padding-bottom: 10px;
      justify-content: center;
      .name{
        flex: 1;
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
      .arrow{
        width: 50px;
        text-align: right;
        img{
          width: 16px;
          height: 16px;
        }
      }
    }
  }
  .reason-list{
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    span{
      font-size: 14px;
      width:105px;
      height:40px;
      line-height: 40px;
      border-radius:4px;
      background:rgba(143,159,177,0.15);
      text-align: center;
      margin-bottom: 14px;
      &.active{
        background:rgba(0,122,230,1);
        color: #fff;
      }
    }
  }
  .other-reason{
    .textarea{
      height:70px;
      border-radius:4px;
      border:1px solid rgba(194,199,204,1);
      width: 100%;
      font-size: 14px;
      padding: 5px;
      box-shadow: none;
      -webkit-appearance: none;
      &::placeholder{
        color: #999;
      }
    }
  }
  .submit{
    margin: 60px 0 0;
    background-color: #007AE6;
    color: #fff;
    text-align: center;
    height: 44px;
    line-height: 44px;
    border-radius: 4px;
  }
  /deep/ .van-icon-close{
    display: none;
  }
  .channel-box{
    font-size: 16px;
    padding: 10px 0 0 0;
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
