<template>
  <div class="list-continer">
    <div class="list-continer-for" v-for="(item, index) in list" :key="index" >
      <shadow-box>
      <div
        slot="container"
        class="list-continer-padd"
      >
       <checkbox-group v-model="result">
        <checkbox
          v-model="checked"
          :name="item.id"
        >
          <div class="report-list" >
            <span class="report-list-left">
              <img
                :src="availableImg"
                class="report-list-img"
              >
              <img
                class="list-img-icon"
                :src="ovalImg"
              >
            </span>
            <span class="report-list-right">
              <p class="list-right-name">{{item.title}}</p>
              <p class="list-right-conter">{{item.conter}}</p>
            </span>
          </div>
        </checkbox>
         </checkbox-group>
      </div>
    </shadow-box>
    </div>
    <div class="list-fixed">
      <button class="list-but">确定</button>
    </div>
  </div>
</template>
<script>
import { Checkbox, CheckboxGroup } from 'vant'
import ShadowBox from 'COMP/ShadowBox'
export default {
  components: {
    ShadowBox,
    Checkbox,
    CheckboxGroup
  },
  data() {
    return {
      availableImg: require('IMG/user/usercard@2x.png'),
      ovalImg: require('IMG/user/Oval 2@2x.png'),
      list: [
        { id: '1', title: '李晓峰', conter: '累计浏览5次，平均停留5.5s' },
        { id: '2', title: '测试', conter: '累计浏览5次，平均停留5.5s' },
        { id: '3', title: '测试', conter: '累计浏览5次，平均停留5.5s' },
        { id: '4', title: '测试', conter: '华尔街见闻3' },
        { id: '5', title: '测试', conter: '华尔街见闻3' },
        { id: '6', title: '测试', conter: '华尔街见闻3' },
        { id: '7', title: '测试', conter: '华尔街见闻3' }
      ],
      result: [{ id: '1', id: '2' }]
    }
  }
}
</script>
<style lang="less">
.van-checkbox__icon--checked .van-icon {
  color: #fff;
  border-color: #007ae6;
  background-color: #007ae6;
}
.list-continer {
  margin-bottom: 75px;
  .list-continer-for {
    margin-bottom: 16px;
  }
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
  .list-fixed {
    height: 60px;
    background: rgba(255, 255, 255, 1);
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    line-height: 50px;
    .list-but {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 122, 230, 1);
      line-height: 20px;
      width: 72px;
      height: 30px;
      border-radius: 22px;
      border: 1px solid;
      background: rgba(255, 255, 255, 1);
    }
  }
}
</style>
