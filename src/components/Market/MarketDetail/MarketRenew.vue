<template>
  <ul class="market-renew-box">
      <li class="market-renew-box-recommend" @click="recommendHandle">
      <span class="bg_img" :style="{'backgroundImage':'url('+ (flagTj?recommendColor:recommend)+')'}"></span>
      <p :class="{recommend:true,active:flagTj}" >推荐</p>
      </li>
    <li class="market-renew-box-show" @click="showHandle">
      <span class="bg_img" :style="{'backgroundImage':'url('+ (flagZs?showColor:show)+')'}"></span>
      <p :class="{marketShow:true,active:flagZs}">展示</p>
    </li>
    <li class="market-renew-box-stick" @click="stickHandle">
      <span class="bg_img" :style="{'backgroundImage':'url('+ (flagZd?stickColor:stick)+')'}"></span>
      <p :class="{stickText:true,active:flagZd}">置顶</p>
    </li>
    <div :class="{marketRenewBoxButton:true,color:renewInfo.openStatus==1}" @click="renewHandle(renewInfo.linkerId)">
      续费<span v-show="renewInfo.openStatus==2">({{renewInfo.expireTime}}到期)</span><span v-show="renewInfo.openStatus==1">（楼盘已过期）</span>
      </div>
</ul>
</template>
<script>
import userService from 'SERVICE/userService'
export default {
  created() {
    this.flagTjHandle()
    this.flagZsHandle()
    this.flagZdHandle()
    console.log(this.renewInfo,'续费数据');
    
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
    renewInfo: { type: Object }
  },
  // computed: {
  //   flagTj:{
  //     get:function() {
  //       if (this.renewInfo.masterRecommand==0) {
  //       return false
  //     }else{
  //       return true
  //     }
  //     },
  //     set:function (newValue) {

  //     }
  //   },
  //   flagZs:{
  //     get:function() {
  //       if (this.renewInfo.displayFlag==1) {
  //       return false
  //     }else{
  //       return true
  //     }
  //     },
  //     set:function (newValue) {

  //     }
  //   },
  //   flagZd:{
  //     get:function() {
  //       if (this.renewInfo.isRecommand==0) {
  //       return false
  //     }else{
  //       return true
  //     }
  //     },
  //     set:function (newValue) {

  //     }
  //   }
  // },
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
      this.$dialog.alert({
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
          if(this.flagZs===false){
            this.$toast({
            duration:800,
            message:'已推荐与展示',
          })
          }else{
            this.$toast({
            duration:800,
            message:'已推荐',
          })
          }
          this.flagZs =true
          this.changeHandle(this.renewInfo.linkerId, 30, 0)
          this.changeHandle(this.renewInfo.linkerId, 20, 2)
          break
        case false:
          this.$toast({
            duration:800,
            message:'已取消推荐',
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
            duration:800,
            message:'已开启展示',
          })
          this.changeHandle(this.renewInfo.linkerId, 30, 0)
          break
        case false:
          this.$toast({
            duration:800,
            message:'已关闭展示、推荐与置顶',
          })
          this.changeHandle(this.renewInfo.linkerId, 30, 1)
          this.flagTj=false
          this.flagZd=false
          break
      }
    },
    stickHandle() {
      this.flagZd = !this.flagZd
      switch (this.flagZd) {
        case true:
          if(this.flagZs===false){
            this.$toast({
            duration:800,
            message:'已置顶与展示',
          })
          }else{
            this.$toast({
            duration:800,
            message:'已置顶',
          })
          }
          this.flagZs =true
          this.changeHandle(this.renewInfo.linkerId, 30, 0)
          this.changeHandle(this.renewInfo.linkerId, 40, 10)
          break
        case false:
          this.$toast({
            duration:800,
            message:'已取消置顶',
          })
          this.changeHandle(this.renewInfo.linkerId, 40, 0)
          break
      }
    },
    renewHandle(n) {
      if(this.renewInfo.thisDistributor===false){
        this.$dialog.alert({
        message: '该楼盘不可续费非当前所属公司下楼盘无法开通续费',
        confirmButtonText:'知道啦',
        className:'distributor'
      }).then(() => {
        // on close
      });
      }else{
        this.$router.push({ name: 'marketDetail-open', params: { id: n } })
      }
    }
  }
}
</script>
<style lang="less">
.renewDialog,.distributor{
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
  margin-bottom: 5px;
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
      
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      height: 16px;
    }
  }
  .market-renew-box-show {
    margin-right: 34px;
    .marketShow {
      font-size: 11px;
      
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      height: 16px;
    }
  }
  .market-renew-box-stick {
    margin-right: 34px;
    .stickText {
      font-size: 11px;
      
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      height: 16px;
    }
  }
  .marketRenewBoxButton {
    width: 156px;
    height: 44px;
    border-radius: 6px;
    border: 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    
    font-weight: 400;
    color: #007ae6;
    margin-left: 7px;
  }
  .color {
    color: #ea4d2e;
  }
}
</style>
