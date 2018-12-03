<template>
  <div class="Properties-container">
    <shadow-box>
      <div slot="container">
        <dynamics-data :totalTitle="totalTitle" :totalNum="totalNum" :cardTitle="cardTitle" :cardNum="cardNum" :propertiesTitle="propertiesTitle" :propertiesNum="propertiesNum" :articleTitle="articleTitle" :articleNum="articleNum"></dynamics-data>
      </div>
    </shadow-box>
    <div class="Properties-list" v-for="(item,index) in properties" :key="index" plain  @click="onClickConfirm(item)">
 <!-- @click="onClickConfirm" -->
      <p class="list-left">{{item.propertiesName}}{{item.statue == 0 ? "（未开通）":""}}<span class="list-right">{{item.num}}条动态</span></p>
      <p class="list-left-btn">{{item.address}} | {{item.price == 0?"价格待定": item.price}}</p>
    </div>
    <!-- <div class="Properties-list">

      <p class="list-left"><span class="list-right" >条动态</span></p>
      <p class="list-left-btn"> | 元/㎡</p>
    </div> -->

    <!-- <dialog :title="$t('confirm')">
      <button type="primary" plain @click="onClickConfirm">
        {{ $t('confirm') }}
      </button>
    </dialog> -->

  </div>
</template>
<script>
import DynamicsData from 'COMP/Dynamics/DynamicsData'
import ShadowBox from 'COMP/ShadowBox'
import { Dialog } from 'vant'
export default {
  components: {
    DynamicsData,
    ShadowBox,
    Dialog
  },
   props: {
    info: Object,
    item:Object
  },
  data() {
    return {
      totalTitle: '楼盘数量',
      totalNum: '90',
      cardTitle: '楼盘分享',
      cardNum: '0',
      propertiesTitle: '楼盘访客',
      propertiesNum: '190',
      articleTitle: '平均停留(S)',
      articleNum: '124',
      properties:[
        {'id':'1','propertiesName':'碧桂园凤凰国际','statue':'0','num':'14','address':'南山 深圳湾','price':'0'},
        {'id':'2','propertiesName':'万科臻湾汇 ','statue':'1','num':'20','address':'南山 深圳湾','price':'119878'},
      ]
    }
  },
  methods: {
    onClickConfirm(item) {
      let parm={
        info:this.info,
        statue:item.statue
      }
       this.$emit('click', parm)
    },
    // godynamicsInfo() {
    //   //跳转到动态详情
    //   this.$router.push('/dynamics/dynamicsInfo')
    // }
  }
}
</script>
<style lang="less">
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
  > .Properties-list {
    border-bottom: 1px solid #e6e6e6;
    margin: 0 16px;
    padding: 16px 0;

    > .list-left {
      font-size: 16px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
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
.demo-dialog {
  .van-doc-demo-block > .van-button {
    margin-left: 15px;
  }
}
</style>
