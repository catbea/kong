<template>
  <div class="list-continer">
    <shadow-box>
      <div
        slot="container"
        class="list-continer-padd"
      >
        <checkbox v-model="checked" :name="list">
          <div class="report-list">
            <span class="report-list-left">
              <img
                :src="availableImg"
                class="report-list-img"
              >
              <img class="list-img-icon">
            </span>
            <span class="report-list-right">
              <p class="list-right-name">李晓峰</p>
              <p class="list-right-conter">累计浏览5次，平均停留5.5s</p>
            </span>
          </div>
        </checkbox>
      </div>
    </shadow-box>
  </div>
</template>
<script>
import { Checkbox, CheckboxGroup } from 'vant';
import ShadowBox from 'COMP/ShadowBox'
export default {
  components: {
    ShadowBox,
    Checkbox,
    CheckboxGroup
  },
  data () {
    return {
      availableImg: require('IMG/user/usercard@2x.png')
    }
  }
}
</script>
<style lang="less">
// .van-checkbox__icon--checked .van-icon {
//   color: #fff;
//   border-color: #ea4d2e;
//   background-color: #ea4d2e;
// }
// // .van-checkbox{
// //       margin-bottom: 16px;
// // }
// .van-checkbox__label {
//   margin-left: 0.26667rem;
//   width: 100%;
// }
// .van-icon-success {
//   position: absolute;
//   display: inline-block;
//   font: normal normal normal 0.37333rem/1 vant-icon;
//   font-size: inherit;
//   text-rendering: auto;
//   margin-left: 16px;
//   margin-top: 50px;
// }
// .van-checkbox__icon,
// .van-checkbox__label {
//   display: list-item;
//   vertical-align: -webkit-baseline-middle;
//   line-height: 0.53333rem;
// }
.list-continer {
  .list-continer-padd {
    padding: 16px;
  }
  .report-list {
    display: flex;
    > .report-list-left {
      > .report-list-img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .list-img-icon {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        position: absolute;
        margin-left: -15px;
        margin-top: 33px;
      }
    }
    > .report-list-right {
      margin-left: 17px;
      padding-top: 6px;
      > .list-right-name {
        font-size: 18px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 16px;
      }
      > .list-right-conter {
        font-size: 12px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 12px;
        margin-top: 10px;
      }
    }
  }
}
</style>
