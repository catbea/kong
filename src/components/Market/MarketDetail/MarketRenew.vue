<template>
  <ul class="market-renew-box">
      <li class="market-renew-box-recommend" @click="recommendHandle">
      <span class="bg_img" :style="{'backgroundImage':'url('+ (renewInfo.masterRecommand!=0 || flagTj?recommendColor:recommend)+')'}"></span>
      <p :class="{recommend:true,active:renewInfo.masterRecommand!=0 || flagTj}" >推荐</p>
      </li>
    <li class="market-renew-box-show" @click="showHandle">
      <span class="bg_img" :style="{'backgroundImage':'url('+ (renewInfo.displayFlag==1 || flagZs?showColor:show)+')'}"></span>
      <p :class="{marketShow:true,active:renewInfo.displayFlag==1 || flagZs}">展示</p>
    </li>
    <li class="market-renew-box-stick" @click="stickHandle">
      <span class="bg_img" :style="{'backgroundImage':'url('+ (renewInfo.isRecommand==10 || flagZd?stickColor:stick)+')'}"></span>
      <p :class="{stickText:true,active:renewInfo.isRecommand==10 || flagZd}">置顶</p>
    </li>
    <div :class="{marketRenewBoxButton:true,color:renewInfo.openStatus==1}" @click="renewHandle(renewInfo.linkerId)">
      续费<span v-show="renewInfo.openStatus==2">({{renewInfo.expireTime | dateTimeFormatter(2)}}到期)</span><span v-show="renewInfo.openStatus==1">（楼盘已过期）</span>
      </div>
</ul>
</template>
<script>
import { Dialog } from 'vant'
import userService from 'SERVICE/userService'
export default {
  created() {
    console.log(this.renewInfo,'续费jljl');
    
  },
  data: () => ({
    flagTj: false,
    recommendColor: require('IMG/marketDetail/tj copy 10@2x.png'),
    recommend: require('IMG/marketDetail/tj@2x.png'),
    flagZs: false,
    showColor: require('IMG/marketDetail/zs copy 11@2x.png'),
    show: require('IMG/marketDetail/zs1@2x.png'),
    flagZd: false,
    stickColor: require('IMG/marketDetail/zd copy 12@2x.png'),
    stick: require('IMG/marketDetail/zd2@2x.png')
  }),
  props:{
    renewInfo:{type:Object}
  },
  methods: {
   async changeHandle(linkerId, operationType, status){//修改楼盘状态
    await userService.changeMarketData(linkerId, operationType, status)
    },
    dialogHandle(n) {
      Dialog.alert({
        message: n,
        confirmButtonText: '知道啦',
        className: 'renewDialog'
      }).then(() => {
        // on close
      })
    },
    recommendHandle() {
      this.flagTj = !this.flagTj
      switch (this.flagTj) {
        case true:
          this.dialogHandle('已推荐该楼盘')
          this.changeHandle(this.renewInfo.linkerId,20,2)
          console.log('改已普通推荐');
          
          break
        case false:
          this.dialogHandle('已取消推荐该楼盘')
          this.changeHandle(this.renewInfo.linkerId,20,0)
          break
      }
    },
    showHandle() {
      this.flagZs = !this.flagZs
      switch (this.flagZs) {
        case true:
          this.dialogHandle('已开启该楼盘展示')
          this.changeHandle(this.renewInfo.linkerId,30,0)
          break
        case false:
          this.dialogHandle('已关闭该楼盘展示')
          this.changeHandle(this.renewInfo.linkerId,30,1)
          break
      }
    },
    stickHandle() {
      this.flagZd = !this.flagZd
      switch (this.flagZd) {
        case true:
          this.dialogHandle('置顶成功')
          this.changeHandle(this.renewInfo.linkerId,40,10)
          break
        case false:
          this.dialogHandle('取消置顶成功')
          this.changeHandle(this.renewInfo.linkerId,40,0)
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
  .marketRenewBoxButton{
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
    color:#007AE6;
    margin-left: 7px;
  }
  .color{
    color:#EA4D2E;
  }
}
</style>
