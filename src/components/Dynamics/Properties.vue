<template>
  <div class="Properties-container">
    <div class="shadow-box">
      <div class="dynaData-container" v-if="houseDynamicCount">
        <span class="container-total">
          <p class="container-title">楼盘数量</p>
          <p class="card-num">{{houseDynamicCount.linkerCount }}</p>
        </span>
        <span class="container-card">
          <p class="container-title">楼盘分享</p>
          <p class="card-num">{{houseDynamicCount.linkerShareCount }}</p>
        </span>
        <span class="container-properties">
          <p class="container-title">楼盘访客</p>
          <p class="card-num">{{houseDynamicCount.linkerVisitorCount }}</p>
        </span>
        <span calss="container-article">
          <p class="container-title">平均停留(S)</p>
          <p class="card-num">{{avgStayLinkerTime}}</p>
        </span>
      </div>
    </div>
    <div class="Properties-list-body" v-if="houseDynamicList.length >0">
      <div
        class="Properties-list"
        v-for="(item,index) in houseDynamicList"
        :key="index"
        plain
        @click="onClickConfirm(item)"
      >
        <p class="list-left">
          {{item.linkerName }}{{item.openStatus == 1 ? "（未开通）":""}}
          <span
            class="list-right"
          >{{item.dynamicCount }}条动态</span>
        </p>
        <p
          class="list-left-btn"
        >{{item.area}} {{item.city}} | {{item.price == 0?"价格待定": item.price+item.priceUnit }}</p>
      </div>
    </div>
    <dynamics-null v-else/>
  </div>
</template>
<script>
import DynamicsData from 'COMP/Dynamics/DynamicsData'
import ShadowBox from 'COMP/ShadowBox'
import DynamicsNull from 'COMP/Dynamics/DynamicsNull'
export default {
  components: {
    DynamicsData,
    ShadowBox,
    DynamicsNull
  },
  props: {
    item: Object,
    houseDynamicList: { type: Array },
    houseDynamicCount: { type: '' },
    avgStayLinkerTime: { type: '' }
  },

  data() {
    return {
      properties: [
        { id: '1', propertiesName: '碧桂园凤凰国际', statue: '0', num: '14', address: '南山 深圳湾', price: '0' },
        { id: '2', propertiesName: '万科臻湾汇 ', statue: '1', num: '20', address: '南山 深圳湾', price: '119878' }
      ]
    }
  },
  methods() {},
  methods: {
    onClickConfirm(item) {
      let parm = {
        itemDynamiclist: item
      }
      this.$emit('click', parm)
    }
  }
}
</script>
<style lang="less" scoped>
.van-dialog__confirm,
.van-dialog__confirm:active {
  color: #007ae6;
}
.van-dialog__message--has-title {
  font-size: 15px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 11px;
  text-align: center;
}
.van-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 68%;
  font-size: 0.42667rem;
  overflow: hidden;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 0.10667rem;
  background-color: #fff;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  border-radius: 12px;
}
.van-dialog__header {
  padding: 0.4rem 0 0;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.Properties-container {
  background: #ffffff;
  // margin: 0 16px;
  .Properties-list-body {
    margin-top: 30px;
    > .Properties-list {
      border-bottom: 1px solid #eeeeee;
      margin: 0 16px;
      padding: 13px 0;

      > .list-left {
        font-size: 16px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
        height: 25px;
        > .list-right {
          font-size: 12px;
          font-weight: 400;
          color: rgba(0, 122, 230, 1);
          line-height: 17px;
          float: right;
        }
      }
      > .list-left-btn {
        font-size: 13px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
      }
    }
  }

  .shadow-box {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 6px 0px rgba(58, 76, 130, 0.07), 0px 2px 17px 0px rgba(34, 47, 85, 0.05);
    border-radius: 6px;
    margin: 0 16px;
    .dynaData-container {
      background: #ffffff;
      display: flex;
      padding: 25px 0 20px 20px;

      span {
        width: 80.7px;
      }
      .container-title {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 18px;
      }
      .card-num {
        font-size: 24px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 36px;
      }
    }
  }
}
.demo-dialog {
  .van-doc-demo-block > .van-button {
    margin-left: 15px;
  }
}
</style>
