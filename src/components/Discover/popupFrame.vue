<template>
  <popup  v-model="show" :close-on-click-overlay="false" :lock-scroll="true">
    <div class="popupframe-container">
      <div class="popupframe-top">
        <span class="popupframe-top-title">长按识别查看更多</span>
        <img :src="editImg" class="popupframe-top-img">
      </div>
      <div class="popupframe-img">
        <img :src="userImg" class="popupframe-userImg">
      </div>
      <div class="popupframe-agent">
        <p class="agent-name">Bela</p>
        <p class="agent-introduce">资深房产经纪人</p>
        <p class="agent-tel">132 5927 6623</p>
        <p class="agent-company">深圳尊豪网络科技有限公司</p>
      </div>
      <div class="popupframe-btn">开启买房新模式 及时获取一手房源信息</div>
    </div>
  </popup>
</template>
<script>
import { Popup } from 'vant'
export default {
  props: {
    value: Boolean
  },
  components: {
    Popup
  },
  data() {
    return {
      show: false,
      editImg: require('IMG/user/editInfo@2x.png'),
      userImg: require('IMG/user/usercard@2x.png')
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(vla) {
      this.$emit('change')
    }
  }
}
</script>
<style lang="less">
.popupframe-container {
  background: #ffffff;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  > .popupframe-top {
    margin: 8px 8px 0 49px;
    text-align: center;
    display: flex;
    > .popupframe-top-title {
      font-size: 20px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 45px;
      text-align: center;
    }
    > .popupframe-top-img {
      width: 16px;
      height: 16px;
      background: rgba(204, 204, 204, 1);
      position: absolute;
      right: 8px;
    }
  }
  > .popupframe-img {
    margin: 4px 49px 0;
    > .popupframe-userImg {
      width: 162px;
      height: 162px;
    }
  }
  > .popupframe-agent {
    margin: 0 49px 23px 49px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
    > .agent-name {
      font-size: 16px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
    }
    > .agent-introduce {
      font-size: 14px;
    }
    > .agent-tel {
      font-size: 12px;
      padding: 10px 0 3px 0;
    }
    > .agent-company {
      font-size: 12px;
    }
  }
  > .popupframe-btn {
    font-size: 12px;
    font-weight: 500;
    color: rgba(102, 102, 102, 1);
    line-height: 17px;
    text-align: center;
    background: rgba(216, 216, 216, 0.2);
    border-radius: 0px 0px 10px 10px;
    height: 32px;
    line-height: 30px;
  }

  .demo-popup {
    .van-button {
      margin: 10px 0 10px 15px;
    }
    .van-popup {
      width: 60%;
      padding: 20px;
      box-sizing: border-box;
      &--bottom {
        width: 100%;
        padding: 0;
        border-radius: 0;
      }
      .van-tabs__content {
        height: 156px;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
      }
      .van-tab__pane:not(:first-child) {
        padding: 10px;
        line-height: 1.4;
        color: #666;
      }
      &--top {
        color: #fff;
        width: 100%;
        border-radius: 0;
        line-height: 20px;
        background-color: rgba(0, 0, 0, 0.8);
      }
      &--left,
      &--right {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
