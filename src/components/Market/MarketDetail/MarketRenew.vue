<template>
  <ul class="market-renew-box">
      <li class="market-renew-box-recommend" @click="recommendHandle">
      <span class="bg_img market-renew-box-recommend-icon" :style="{'backgroundImage':'url('+ (flagTj?recommendA:recommend)+')'}"></span>
      <p class="market-renew-box-recommend-text">推荐</p>
      </li>
    <li class="market-renew-box-show" @click="showHandle">
      <span class="bg_img market-renew-box-show-icon" :style="{'backgroundImage':'url('+ (flagZs?showA:show)+')'}"></span>
      <p class="market-renew-box-show-text">展示</p>
    </li>
    <li class="market-renew-box-stick" @click="stickHandle">
      <span class="bg_img  market-renew-box-stick-icon" :style="{'backgroundImage':'url('+ (flagZd?stickA:stick)+')'}"></span>
      <p class="market-renew-box-stick-text">置顶</p>
    </li>
    <div class="market-renew-box-button">续费(07/11到期)</div>
</ul>
</template>
<script>
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
  methods: {
    recommendHandle() {
      this.flagTj = !this.flagTj
    },
    showHandle() {
      this.flagZs = !this.flagZs
    },
    stickHandle() {
      this.flagZd = !this.flagZd
    }
  }
}
</script>
<style lang="less">
.market-renew-box {
  display: flex;
  width: 375px;
  height: 57px;
  padding-top: 14px;
  background: rgba(255, 255, 255, 1);
  border-top: 1px solid #e6e6e6;
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .market-renew-box-recommend {
    margin: 0 34px 0 25px;

    .market-renew-box-recommend-icon {
      width: 14px;
      height: 19px;
    }
    .market-renew-box-recommend-text {
      font-size: 11px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      height: 16px;
    }
  }
  .market-renew-box-show {
    margin-right: 34px;
    .market-renew-box-show-icon {
      width: 18px;
      height: 18px;
    }
    .market-renew-box-show-text {
      font-size: 11px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      height: 16px;
    }
  }
  .market-renew-box-stick {
    margin-right: 34px;
    .market-renew-box-stick-icon {
      width: 15px;
      height: 19px;
    }
    .market-renew-box-stick-text {
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
    line-height: 44px;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 122, 230, 1);
    margin-left: 7px;
  }
}
</style>
