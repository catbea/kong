<template>
  <ul class="market-renew-box">
      <!-- <li class="market-renew-box-recommend" @click="recommendHandle">
      <span class="bg_img" :style="{'backgroundImage':'url('+ (flagTj?recommendColor:recommend)+')'}"></span>
      <p :class="{recommend:true,active:flagTj}" >推荐</p>
      </li> -->
    <li class="market-renew-box-show" @click="showHandle">
      <span class="bg_img" :style="{'backgroundImage':'url('+ (flagZs?showColor:show)+')'}"></span>
      <p :class="{marketShow:true,active:flagZs}">展示</p>
    </li>
    <li class="market-renew-box-stick" @click="stickHandle">
      <span class="bg_img" :style="{'backgroundImage':'url('+ (flagZd?stickColor:stick)+')'}"></span>
      <p :class="{stickText:true,active:flagZd}">置顶</p>
    </li>
    <div class="free" v-if="+renewInfo.isFree">已免费添加<span v-if="renewInfo.openStatus==2">({{renewInfo.expireTime}}到期)</span></div>
    <div v-else :class="{marketRenewBoxButton:true,color:renewInfo.openStatus==1}" @click="renewHandle(renewInfo.linkerId)">
      续费<span v-if="renewInfo.openStatus==2">({{renewInfo.expireTime}}到期)</span><span v-if="renewInfo.openStatus==1">（楼盘已过期）</span>
      </div>
</ul>
</template>
<script>
import userService from 'SERVICE/userService'
import marketService from 'SERVICE/marketService'
export default {
  created() {
    this.flagTjHandle()
    this.flagZsHandle()
    this.flagZdHandle()
  },
  data: () => ({
    recommendColor: require('IMG/marketDetail/tj copy 10@2x.png'),
    recommend: require('IMG/marketDetail/tj@2x.png'),
    showColor: require('IMG/marketDetail/zs copy 11@2x.png'),
    show: require('IMG/marketDetail/zs1@2x.png'),
    stickColor: require('IMG/marketDetail/zd copy 12@2x.png'),
    stick: require('IMG/marketDetail/zd2@2x.png'),
    flagTj: false,
    flagZs: false,
    flagZd: false
  }),
  props: {
    renewInfo: { type: Object },
    vipInfo: { 
      type: Object,
      default: () => {
        return {
          expireTimestamp: '',
          expireDate: '',
          vipValid: ''
        }
      }
     }
  },
  methods: {
    flagTjHandle() {
      if (this.renewInfo.masterRecommand == 0) {
        this.flagTj = false
      } else {
        this.flagTj = true
      }
    },
    flagZsHandle() {
      if (this.renewInfo.displayFlag == 1) {
        this.flagZs = false
      } else {
        this.flagZs = true
      }
    },
    flagZdHandle() {
      if (this.renewInfo.isRecommand == 0) {
        this.flagZd = false
      } else {
        this.flagZd = true
      }
    },
    async changeHandle(linkerId, operationType, status) {
      //修改楼盘状态
      await userService.changeMarketData(linkerId, operationType, status)
    },
    dialogHandle(n) {
      this.$dialog
        .alert({
          message: n,
          confirmButtonText: '知道啦'
        })
        .then(() => {
          // on close
        })
    },
    recommendHandle() {
      this.flagTj = !this.flagTj
      switch (this.flagTj) {
        case true:
          if (this.flagZs === false) {
            this.$toast({
              duration: 800,
              message: '已推荐与展示'
            })
          } else {
            this.$toast({
              duration: 800,
              message: '已推荐'
            })
          }
          this.flagZs = true
          this.changeHandle(this.renewInfo.linkerId, 30, 0)
          this.changeHandle(this.renewInfo.linkerId, 20, 2)
          break
        case false:
          this.$toast({
            duration: 800,
            message: '已取消推荐'
          })
          this.changeHandle(this.renewInfo.linkerId, 20, 0)
          break
      }
    },
    showHandle() {
      this.flagZs = !this.flagZs
      switch (this.flagZs) {
        case true:
          this.$toast({
            duration: 800,
            message: '已开启展示'
          })
          this.changeHandle(this.renewInfo.linkerId, 30, 0)
          break
        case false:
          this.$toast({
            duration: 800,
            message: '已关闭展示、推荐与置顶'
          })
          this.changeHandle(this.renewInfo.linkerId, 30, 1)
          this.flagTj = false
          this.flagZd = false
          break
      }
    },
    stickHandle() {
      this.flagZd = !this.flagZd
      switch (this.flagZd) {
        case true:
          if (this.flagZs === false) {
            this.$toast({
              duration: 800,
              message: '已置顶与展示'
            })
          } else {
            this.$toast({
              duration: 800,
              message: '已置顶'
            })
          }
          this.flagZs = true
          this.changeHandle(this.renewInfo.linkerId, 30, 0)
          this.changeHandle(this.renewInfo.linkerId, 40, 10)
          break
        case false:
          this.$toast({
            duration: 800,
            message: '已取消置顶'
          })
          this.changeHandle(this.renewInfo.linkerId, 40, 0)
          break
      }
    },
   async renewHandle(n) {
      // if (this.renewInfo.thisDistributor === false) {
      //   this.$dialog
      //     .alert({
      //       message: '该楼盘不可续费，非当前所属公司下楼盘无法开通续费',
      //       confirmButtonText: '知道啦'
      //     })
      //     .then(() => {
      //       // on close
      //     })
          
      // } else {
        // let invalidTime = +new Date(this.renewInfo.expireTime.replace(/-/g,'/'))// 楼盘到期时间
        let invalidTime = this.renewInfo.expireDate-0// 含时分秒的楼盘到期时间
        let expireTimestamp = this.vipInfo.expireTimestamp-0 // vip到期时间
        if (this.vipInfo.vipValid && expireTimestamp > invalidTime && this.renewInfo.city === this.vipInfo.city) {
          const res = await marketService.addHouseByVip(this.renewInfo.linkerId)
          this.$toast({
            duration: 1000,
            message: '续费成功！'
          })
          let time = new Date(+this.vipInfo.expireTimestamp)
          let year =time.getFullYear();
          let mou = time.getMonth() + 1
          let date = time.getDate()
          mou = mou < 10 ? ('0' + mou) : mou
          date = date < 10 ? ('0' + date) : date
          this.renewInfo.expireTime = `${mou}/${date}`
          // this.info.expireTime = this.vipInfo.expireDate.substring(0,9)
          this.renewInfo.openStatus = 2
      }else{
        this.$router.push({ name: 'marketDetail-open', params: { id: n } })
      }
    // }
  }
}
}
</script>
<style lang="less">
.renewDialog,
.distributor {
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
  padding-top: 12px;
  // margin-bottom: 5px;
  background: rgba(255, 255, 255, 1);
  border-top: 1px solid #e6e6e6;
  justify-content: space-around;
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
    // margin: 0 34px 0 25px;
    .recommend {
      font-size: 11px;

      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      height: 16px;
    }
  }
  .market-renew-box-show {
    // margin-right: 34px;
    .marketShow {
      font-size: 11px;

      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      height: 16px;
    }
  }
  .market-renew-box-stick {
    // margin-right: 34px;
    .stickText {
      font-size: 11px;

      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      height: 16px;
    }
  }
  .marketRenewBoxButton {
    // width: 156px;
    height: 44px;
    border-radius: 6px;
    border: 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    border-color: #007ae6;
    font-weight: 400;
    color: #007ae6;
    // margin-left: 7px;
    padding: 0 20px;
  }
  .free{
    background-color: rgba(204, 204, 204, 1);
    color: #fff;
    font-size: 14px;
    border-radius: 6px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    width: 200px;
  }
  .color {
    color: #ea4d2e;
    border-color: #ea4d2e;
  }
}
</style>
