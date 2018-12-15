<template>
  <ul class="market-renew-box">
      <li class="market-renew-box-recommend" @click="recommendHandle(flagTj)">
      <span class="bg_img" :style="{'backgroundImage':'url('+ (flagTj?recommendA:recommend)+')'}"></span>
      <p :class="{recommend:true,active:flagTj}" >推荐</p>
      </li>
    <li class="market-renew-box-show" @click="showHandle(flagZs)">
      <span class="bg_img" :style="{'backgroundImage':'url('+ (flagZs?showA:show)+')'}"></span>
      <p :class="{marketShow:true,active:flagZs}">展示</p>
    </li>
    <li class="market-renew-box-stick" @click="stickHandle(flagZd)">
      <span class="bg_img" :style="{'backgroundImage':'url('+ (flagZd?stickA:stick)+')'}"></span>
      <p :class="{stickText:true,active:flagZd}">置顶</p>
    </li>
    <div class="market-renew-box-button" @click="renewHandle(renewInfo.linkerId)">续费(07/11到期)</div>
</ul>
</template>
<script>
import { Dialog } from 'vant'
export default {
  data: () => ({
    flagTj: false,
    recommendA: require('IMG/marketDetail/tj copy 10@2x.png'),
    recommend: require('IMG/marketDetail/tj@2x.png'),
    flagZs: false,
    showA: require('IMG/marketDetail/zs copy 11@2x.png'),
    show: require('IMG/marketDetail/zs1@2x.png'),
    flagZd: false,
    stickA: require('IMG/marketDetail/zd copy 12@2x.png'),
    stick: require('IMG/marketDetail/zd2@2x.png')
  }),
  props:{
    renewInfo:{type:Object}
  },
  methods: {
    dialogHandle(n) {
      Dialog.alert({
        message: n,
        confirmButtonText: '知道啦',
        className: 'renewDialog'
      }).then(() => {
        // on close
      })
    },
    recommendHandle(n) {
      this.flagTj = !this.flagTj
      switch (n) {
        case false:
          this.dialogHandle('已推荐该楼盘')
          break
        case true:
          this.dialogHandle('已取消推荐该楼盘')
          break
      }
    },
    showHandle(n) {
      this.flagZs = !this.flagZs
      switch (n) {
        case false:
          this.dialogHandle('已开启该楼盘展示')
          break
        case true:
          this.dialogHandle('已关闭该楼盘展示')
          break
      }
    },
    stickHandle(n) {
      this.flagZd = !this.flagZd
      switch (n) {
        case false:
          this.dialogHandle('置顶成功')
          break
        case true:
          this.dialogHandle('取消置顶成功')
          break
      }
    },
    renewHandle(n) {
      this.$router.push({name:'marketDetail-open', params: {id:n}} )
    }
  }
}
</script>
<style lang="less">
.renewDialog {
  width: 280px;
  > .van-dialog__content {
    > .van-dialog__message {
      text-align: center;
    }
  }
  > .van-dialog__footer {
    display: flex;
    justify-content: center;
    > .van-dialog__confirm {
      border-radius: 5px;
      height: 40px;
      width: 142px;
      line-height: 40px;
      color: #ffffff;
      background: #007ae6;
      margin-bottom: 12px;
    }
  }
}
.market-renew-box {
  display: flex;
  width: 375px;
  height: 57px;
  padding-top: 10px;
  margin-bottom:5px;
  background: rgba(255, 255, 255, 1);
  border-top: 1px solid #e6e6e6;
  .active {
    color: rgba(0, 122, 230, 1) !important;
  }
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      width: 24px;
      height: 24px;
    }
    p {
      margin-top: 4px;
    }
  }
  .market-renew-box-recommend {
    margin: 0 34px 0 25px;
    .recommend {
      font-size: 11px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      height: 16px;
    }
  }
  .market-renew-box-show {
    margin-right: 34px;
    .marketShow {
      font-size: 11px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      height: 16px;
    }
  }
  .market-renew-box-stick {
    margin-right: 34px;
    .stickText {
      font-size: 11px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      height: 16px;
    }
  }
  .market-renew-box-button {
    width: 156px;
    height: 44px;
    border-radius: 6px;
    border: 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 122, 230, 1);
    margin-left: 7px;
  }
}
</style>
