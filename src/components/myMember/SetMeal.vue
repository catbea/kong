<template>
  <div class="mymember-set-meal-page">
    <div class="mymember-set-meal-page-content">
      <div class="mymember-set-meal-page-content-top">
        <p class="forestall-open">{{setMealInfo.openCount}}人已经抢先开通VIP套餐</p>
        <div v-show="setMealInfo.isVip" class="meal-site" @click="checkCityhandle">
          <p v-show="!setMealInfo.vipCity">选择城市</p>
          <p v-show="setMealInfo.vipCity">{{setMealInfo.vipCity}}</p>
          <!-- <span class="bg_img site-icon" :style="{backgroundImage:'url('+siteImg+')'}"></span> -->
        </div>
      </div>
      <ol class="mymember-set-meal-page-content-bottom">
        <li :class="{active:num==index}" v-for="(item,index) in vipList" :key="index" @click="taget(index)">
          <p>{{item.subscribeNum}}个月</p>
          <div class="price">
            <span>¥</span>
            <p>{{item.subscribeAmount | priceFormart}}</p> 
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    setMealInfo: {
      type: Object,
      default: function() {
        return {
          openCount: 0
        }
      }
    },
    vipList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data: () => ({
    num: 0,
    siteImg: require('IMG/myMember/location@2x.png')
  }),
  methods: {
    checkCityhandle() {
      if (!this.setMealInfo.vipCity) this.$emit('onCheckCity')
    },
    taget(index) {
      this.num = index
      this.$emit('priceClick', index)
    }
  }
}
</script>
<style lang="less">
.mymember-set-meal-page {
  width: 100%;
  // height: 149px;
  display: flex;
  padding-bottom: 12px;
  background: rgba(255, 255, 255, 1);
  .mymember-set-meal-page-content {
    margin: 17px 0 0 16px;
    width: 343px;
    .mymember-set-meal-page-content-top {
      display: flex;
      justify-content: space-between;
      .forestall-open {
        font-size: 12px;

        font-weight: 400;
        color: rgba(113, 73, 59, 1);
        line-height: 17px;
      }
      .meal-site {
        display: flex;
        p {
          font-size: 12px;
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
        border-color: #a07e72;
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
        border-color: #999;
        p:nth-child(1) {
          font-size: 16px;

          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 22px;
        }
        .price {
          display: flex;
          p {
            font-size: 26px;

            font-weight: 600;
            color: rgba(135, 102, 90, 1);
          }
          span {
            margin-top: 15px;
            font-size: 11px;
            color: rgba(135, 102, 90, 1);
          }
        }
      }
    }
  }
}
</style>
