<template>
  <div class="learn-search-page">
    <div class="search-box">
      <form action="/">
        <van-search
          v-model="value"
          background="#fff"
          placeholder="输入搜索楼盘"
          show-action
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </div>

    <div class="search-result">
      <div class="search-result-list">
        <div class="linker-name">碧桂园·中央公馆</div>
        <div class="linker-info">南山区-蛇口 120000元/㎡</div>
      </div>

      <div class="search-result-list">
        <div class="linker-name">碧桂园·中央公馆</div>
        <div class="linker-info">南山区-蛇口 120000元/㎡</div>
      </div>
    </div>

    <!-- <div class="search-history">
      <div class="search-title">
        <p class="label">历史搜索</p>
        <img class="search-icon" :src="require('IMG/user/learn/delete-icon.png')" alt>
      </div>

      <div class="history-list">
        <div class="item">万科</div>
        <div class="item">华侨城</div>
        <div class="item">城市花园</div>
        <div class="item">永奥.巴塞罗那</div>
        <div class="item">城市花园</div>
        <div class="item">永奥.巴塞罗那</div>
        <div class="item">城市花园</div>
      </div>
    </div>-->

    <!-- <div class="empty-search">
      <img :src="require('IMG/user/learn/empty-house.png')" alt>
      <p>没有搜索到任何楼盘</p>
    </div>-->
  </div>
</template>

<script>
export default {
  name: 'learnSearch',
  data() {
    return {
      value: ''
    }
  }
}
</script>

<style lang="less">
.learn-search-page {
  padding: 0 15px;
  box-sizing: border-box;
  .search-box {
    height: 44px;
    .van-search {
      .van-cell {
        background: rgba(245, 245, 245, 1);
      }
      margin: 7px 0;
      padding: 0;
      border-radius: 6px;
    }
    .van-search__action {
      padding-left: 16px;
    }
    .van-search__action:active {
      background: #fff;
    }
  }
  .search-history {
    margin-top: 16px;
    .search-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .label {
        font-size: 18px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(26, 39, 51, 1);
        line-height: 27px;
      }
      .search-icon {
        height: 16px;
        width: 16px;
      }
    }
    .history-list {
      display: flex;
      flex-wrap: wrap;
      .item {
        margin-top: 16px;
        margin-right: 32px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(92, 97, 102, 1);
        line-height: 21px;
      }
    }
  }
  .empty-search {
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
  .search-result-list {
    height: 67px;
    border-bottom: 1px solid #eeeeee;
    .linker-name {
      padding-top: 12px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(26, 39, 51, 1);
      line-height: 22px;
    }
    .linker-info {
      margin-top: 2px;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(145, 149, 153, 1);
      line-height: 17px;
    }
  }
}
</style>