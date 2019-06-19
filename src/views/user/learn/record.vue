<template>
  <div class="learn-record-page">
    <!-- <div class="empty-record">
      <img :src="require('IMG/user/learn/empty-record.png')" alt>
      <p>还没有学习过任何资料！</p>
    </div>-->

    <div class="learn-list">
      <div class="learn-item" v-for="item in [,,,,,,,,,,]">
        <div class="learn-img">
          <div class="learn-type pdf">PDF</div>
          <img
            src="https://720ljq2-10037467.file.myqcloud.com/linker/18907437200/ed85ae82ecf74be1898adf54ad0c439e.jpg?watermark/1/image/aHR0cDovL3Bhbm8tc2NyYXB5LWltZy0xMjUxNDc0NzQxLnBpY2d6Lm15cWNsb3VkLmNvbS9sb2dvMS5wbmc=/blogo/2/gravity/southeast"
            alt
          >
        </div>
        <div class="learn-info">
          <h3 class="title">楼盘推介项目介绍资料学习，学习查看楼盘推介项</h3>
          <p class="linker-name">
            所属楼盘：
            <span>山水江南</span>
          </p>
          <div class="times">查看时间：2019/03/23 12:23:23</div>
        </div>
      </div>
    </div>
    <Tabbar name="底部tabbar"/>
  </div>
</template>

<script>
import Tabbar from './components/tabbar'
export default {
  name: 'learnRecord',
  components: {
    Tabbar
  }
}
</script>

<style lang="less">
.learn-record-page {
  padding-bottom: 49px;
  font-family: 'Microsoft YaHei', 'PingFangSC-Regular';

  .learn-list {
    padding: 0 16px;
    margin-bottom: 24px;
    box-sizing: border-box;
  }
  .learn-item {
    display: flex;
    position: relative;
    margin-top: 24px;
    height: 90px;
  }
  .learn-img,
  .learn-img img {
    width: 120px;
    height: 90px;
    border-radius: 6px;
    position: relative;
  }
  .learn-img {
    .learn-type {
      width: 33px;
      height: 15px;
      line-height: 15px;
      text-align: center;
      z-index: 9;
      border-radius: 0px 4px 0px 4px;
      position: absolute;
      right: 0;
      top: 0;
      font-size: 10px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
    .pdf {
      background: rgba(250, 100, 0, 1);
    }
    .img {
      background: #2882ff;
    }
    .h5 {
      background: #01b805;
    }
  }
  .learn-info {
    flex: 1;
    margin-left: 12px;
    .title {
      height: 42px;
      font-size: 14px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 21px;
      margin-bottom: 10px;
    }
    .linker-name {
      font-size: 10px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 14px;
      margin-bottom: 10px;
      span {
        color: #666666;
      }
    }
    .times {
      font-size: 10px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 14px;
    }
  }

  .empty-record {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin-top: -50px;
    text-align: center;
    img {
      height: 88px;
      width: 88px;
    }
    p {
      font-size: 12px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
}
</style>