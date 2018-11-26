<template>
  <div class="updateArticles-page">
    <div class="updateArticles-content">
      <div class="updateArticles-title">
        共12文章
        <span class="updateArticles-title-right">完成</span>
      </div>
      <!-- <discover-list></discover-list> -->

      <checkbox-group v-model="result">
        <!-- v-for="(item, index) in list" :key="index" :name="item" -->
        <checkbox v-for="(item, index) in list" :key="index" :name="item.id">
          <div class="updateArticles-list" :id="item.id">
            <span class="updateArticles-list-left">
              <p class="list-left-title">{{item.title}}</p>
              <p class="list-left-time">{{item.time}}&nbsp;&nbsp;刚刚&nbsp;&nbsp;1.2万浏览</p>
            </span>
            <span class="updateArticles-list-right">
              <img :src="item.backIcon" class="mark-icon">
            </span>
          </div>
        </checkbox>
      </checkbox-group>

      <div class="updateArticles-fixed-btn">
        <div class="fixed-btn-check">
          <checkbox v-model="checked"></checkbox>
          <span class="fixed-btn-title">全选</span>
        </div>
        <div class="fixed-btn">
          删除
        </div>
      </div>
    </div>

  </div>
</template>
<script>
// import discoverList from 'COMP/Discover/discoverList'
import nullArticles from 'COMP/Null'
import { Checkbox, CheckboxGroup } from 'vant';
import { SubmitBar } from 'vant';
export default {
  components: {
    //  discoverList,
    Checkbox,
    CheckboxGroup,
    nullArticles,
    SubmitBar


  },
  data () {
    return {
      // backIcon: require('IMG/user/usercard@2x.png'),
      // list: ['a', 'b', 'c'],
      list: [
        { 'id': '1', 'title': '专家：“规避政策”卖房新路子要不得', 'time': '华尔街见闻', 'backIcon': require('IMG/user/usercard@2x.png') },
        { 'id': '2', 'title': '测试', 'time': '华尔街见闻2', 'backIcon': require('IMG/user/usercard@2x.png') },
        { 'id': '3', 'title': '测试', 'time': '华尔街见闻3', 'backIcon': require('IMG/user/usercard@2x.png') },
        { 'id': '4', 'title': '测试', 'time': '华尔街见闻3', 'backIcon': require('IMG/user/usercard@2x.png') },
        { 'id': '5', 'title': '测试', 'time': '华尔街见闻3', 'backIcon': require('IMG/user/usercard@2x.png') },
        { 'id': '6', 'title': '测试', 'time': '华尔街见闻3', 'backIcon': require('IMG/user/usercard@2x.png') },
        { 'id': '7', 'title': '测试', 'time': '华尔街见闻3', 'backIcon': require('IMG/user/usercard@2x.png') },
      ],
      result: [
        { 'id': '1', 'id': '2' }
      ]

    }
  }
}
</script>
<style lang="less">
.van-checkbox__icon--checked .van-icon {
  color: #fff;
  border-color: #ea4d2e;
  background-color: #ea4d2e;
}
// .van-checkbox{
//       margin-bottom: 16px;
// }
.van-checkbox__label {
  margin-left: 0.26667rem;
  width: 100%;
}
.van-icon-success {
  position: absolute;
  display: inline-block;
  font: normal normal normal 0.37333rem/1 vant-icon;
  font-size: inherit;
  text-rendering: auto;
  margin-left: 16px;
  margin-top: 50px;
}
.van-checkbox__icon,
.van-checkbox__label {
  display: list-item;
  vertical-align: -webkit-baseline-middle;
  line-height: 0.53333rem;
}
.updateArticles-page {
  background: #ffffff;
  > .updateArticles-content {
        margin-bottom: 80px;
    > .updateArticles-fixed-btn {
      height: 60px;
      // display: flex;
      position: fixed;
      bottom: 0;
      border-top: 1px solid #e6e6e6;
      background: #ffffff;
      width: 100%;
      > .fixed-btn-check {
        margin-top: -30px;
        > .fixed-btn-title {
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 40px;
           margin-left: 45px;
           position: absolute;
           margin-top: 20px;
        }
      }
      > .fixed-btn {
        width: 72px;
        height: 30px;
        border-radius: 22px;
        border: 1px solid;
        font-size: 14px;
        font-weight: 400;
        color: rgba(234, 77, 46, 1);
        float: right;
        margin-right: 16px;
        margin-top: 15px;
        text-align: center;
        line-height: 30px;
      }
    }
    > .updateArticles-title {
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 16px;
      margin: 17px 16px;
         

      > .updateArticles-title-right {
        font-size: 13px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 16px;
        float: right;
      }
    }
    .updateArticles-list {
      margin: 0 25px 0 10px;
      display: flex;
      border-bottom: 1px solid #e6e6e6;
      padding: 0 0 16px 0;
      > .updateArticles-list-left {
        height: 90px;
        position: relative;
        margin-left: 31px;
        > .list-left-title {
          font-size: 16px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 24px;
          margin-right: 60px;
          padding-right: 70px;
        }
        > .list-left-time {
          font-size: 12px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          position: absolute;
          bottom: 0;
        }
      }
      > .updateArticles-list-right {
        width: 120px;
        height: 90px;
        border-radius: 6px;
        position: absolute;
        margin-right: 0;
        padding-right: 0;
        right: 16px;
        > .mark-icon {
          width: 120px;
          height: 90px;
          background: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
</style>
