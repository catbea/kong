<template>
  <div class="mymember-set-meal-page">
    <div class="mymember-set-meal-page-content">
      <div class="mymember-set-meal-page-content-top">
      <p class="forestall-open">2568人已经抢先开通VIP套餐</p>
      <div class="meal-site">
        <p>选择城市我我额人发他个</p>
        <span class="site-icon bg_img" :style="{backgroundImage:'url('+siteImg+')'}"></span>
      </div>
      </div>
      <ol class="mymember-set-meal-page-content-bottom">
        <li :class="{active:num==index}" v-for="(item,index) in vipList" :key="index" @click="taget(index)">
          <p>1个月</p>
          <div class="price">
            <span>¥</span>
            <p>300</p> 
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    vipList: [1, 2, 3],
    num: 0,
    siteImg: require('IMG/myMember/location@2x.png')
  }),
  methods: {
    taget(index) {
      this.num = index
    }
  }
}
</script>
<style lang="less">
.mymember-set-meal-page {
  width: 100%;
  height: 149px;
  display: flex;
  background: rgba(255, 255, 255, 1);
  .mymember-set-meal-page-content {
    margin: 17px 0 0 16px;
    width: 343px;
    .mymember-set-meal-page-content-top {
      display: flex;
      justify-content: space-between;
      .forestall-open {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(113, 73, 59, 1);
        line-height: 17px;
      }
      .meal-site {
        display: flex;
        p {
          font-size: 12px;
          font-family: ArialUnicodeMS;
          color: rgba(102, 102, 102, 1);
          line-height: 16px;
          width: 50px;
          overflow: hidden; /*超出部分隐藏*/
          white-space: nowrap; /*不换行*/
          text-overflow: ellipsis; /*超出部分文字以...显示*/
        }
        .site-icon {
          width: 10px;
          height: 12px;
          margin: 2px 0 0 3px;
        }
      }
    }
    .mymember-set-meal-page-content-bottom {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .active {
        background: rgba(194, 161, 113, 0.17);
      }
      li {
        width: 105px;
        height: 75px;
        margin-top: 16px;
        border-radius: 6px;
        border: 1px solid;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p:nth-child(1) {
          font-size: 16px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 22px;
        }
        .price {
          display: flex;
          p {
            font-size: 26px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(135, 102, 90, 1);
          }
          span {
            margin-top: 15px;
            font-size: 11px;
            font-family: ArialUnicodeMS;
            color: rgba(135, 102, 90, 1);
          }
        }
      }
    }
  }
}
</style>
