<template>
  <div class="learn-page">
    <div class="header-filter">
      <div class="linker-box">
        <span class="linker-name">万科瑧湾汇</span>
        <van-icon name="arrow-down"/>
      </div>
      <div class="search-box">
        <div class="search-icon"></div>
        <span class="search-text">搜索</span>
      </div>
    </div>

    <div>
      <div class="card-box" v-for="list in [,,,]">
        <div class="card-header">
          <h3 class="card-title">佣金结算规则</h3>
          <div class="card-do">
            全部
            <img :src="require('IMG/user/learn/arrow-right.png')" alt>
          </div>
        </div>
        <div class="card-body">
          <div class="learn-list-1" v-for="(item, index) in learnList">
            <img
              src="https://720ljq2-10037467.file.myqcloud.com/linker/18907437200/ed85ae82ecf74be1898adf54ad0c439e.jpg?watermark/1/image/aHR0cDovL3Bhbm8tc2NyYXB5LWltZy0xMjUxNDc0NzQxLnBpY2d6Lm15cWNsb3VkLmNvbS9sb2dvMS5wbmc=/blogo/2/gravity/southeast"
              alt
              srcset
            >
            <div class="learn-info">
              <p class="title">楼盘推介项目介绍资料学习，学习查看楼盘推介项 目介绍资料学习，学习查看</p>
              <div class="abstract">2018/08/07更新 · 324查看 · 12</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Tabbar/>
  </div>
</template>

<script>
import Tabbar from './components/tabbar'
export default {
  name: 'learn',
  components: {
    Tabbar
  },
  data() {
    return {
      learnList: [,,,]
    }
  },
  methods: {}
}
</script>

<style lang="less">
.learn-page {
  padding-bottom: 49px;
  font-family: 'Microsoft YaHei', 'PingFangSC-Regular';
  .header-filter {
    height: 44px;
    box-sizing: border-box;
    padding: 0 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dce0e3;
    .linker-box {
      display: flex;
      flex: 1;
      align-items: center;
    }
    .linker-name {
      font-size: 14px;
      font-weight: 600;
      color: rgba(26, 39, 51, 1);
    }
    .van-icon-arrow-down {
      color: #5c6166;
      font-size: 16px;
      font-weight: 600;
    }
    .search-box {
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #e2e8ee;
    }
    .search-icon {
      height: 12px;
      width: 12px;
      background: red;
      margin: 0 8px;
    }
    .search-text {
      font-size: 12px;
      font-weight: 400;
      color: rgba(150, 158, 168, 1);
    }
  }
  //   card-box
  .card-box {
    padding: 16px;
    border-bottom: 10px solid #f7f9fa;
    box-sizing: border-box;
  }
  .card-header {
    height: 22px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    color: rgba(41, 46, 51, 1);
  }
  .card-title {
    flex: 1;
  }
  .card-do {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    color: rgba(194, 199, 204, 1);
    img {
      height: 12px;
    }
  }
  // 一行显示一个
  .learn-list-1,
  .learn-list-1 img {
    width: 343px;
    height: 193px;
    border-radius: 6px;
  }
  .learn-list-1 {
    margin-top: 10px;
    position: relative;
    .learn-info {
      position: absolute;
      bottom: 0;
      height: 97px;
      width: 100%;
      box-sizing: border-box;
      padding: 20px 23px 14px 12px;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
      border-radius: 0px 0px 6px 6px;
      .title {
        // margin-top: 21px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 21px;
      }
      .abstract {
        margin-top: 6px;
        font-size: 10px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 14px;
      }
    }
  }
  .learn-list-1 img {
    object-fit: cover;
    object-position: center;
  }
}
</style>