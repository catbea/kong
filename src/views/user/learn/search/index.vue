<template>
  <div class="learn-search-page">
    <div class="search-box">
      <form action="/">
        <van-search
          v-model="linkerName"
          background="#fff"
          placeholder="输入搜索楼盘"
          show-action
          @search="onSearch"
          @cancel="$router.go(-1)"
          @focus="onPress"
        />
      </form>
    </div>

    <div class="search-result">
      <div class="search-result-list" v-for="item in resultList" @click="toUserLearn(item.linkerId)">
        <div class="linker-name">{{item.linkerName}}</div>
        <div class="linker-info">{{item.city}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.averagePrice}}{{item.priceUnit}}</div>
      </div>
    </div>

    <div class="search-history" v-if="searchHistory.length > 0">
      <div class="search-title">
        <p class="label">历史搜索</p>
        <img
          @click="clearHistory"
          class="search-icon"
          :src="require('IMG/user/learn/delete-icon.png')"
          alt
        >
      </div>

      <div class="history-list">
        <div @click="historyTag(item)" class="item" v-for="item in searchHistory">{{item}}</div>
      </div>
    </div>

    <div v-if="linkerName && resultList.length == 0 && !isPress" class="empty-search">
      <img :src="require('IMG/user/learn/empty-house.png')" alt>
      <p>没有搜索到任何楼盘</p>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import userService from 'SERVICE/userService'
export default {
  name: 'learnSearch',
  data() {
    return {
      linkerName: '',
      resultList: [],
      isPress: true,
      searchHistory: [] //历史搜索记录
    }
  },
  mounted() {
    const searchHistory = localStorage.getItem('searchStudyHistory')
    if (searchHistory) {
      this.searchHistory = searchHistory.split(',')
    }
  },
  methods: {
    // 点击搜索历史的标签
    historyTag(linkerName) {
      this.linkerName = linkerName
      this.searchLinker()
    },
    // 清除历史记录
    clearHistory() {
      this.searchHistory = []
      localStorage.setItem('searchStudyHistory', '')
    },
    // 开始的事件搜索
    onSearch() {
      this.$nextTick(_ => {
        this.searchLinker()
      })
    },
    onPress(){
      this.isPress = true;
    },
    // 跳转到学习首页
    toUserLearn(linkerId) {
      let router = {
        path: '/user/learn/'
      }
      if (linkerId) {
        router.query = {
          linkerId
        }
      }
      this.$router.push(router)
    },
    // 搜索楼盘列表
    async searchLinker() {
      const { linkerName } = this
      if (!linkerName) return

      Toast.loading({
        duration: 0,
        message: '加载中...'
      })

      const response = await userService.studySearchLinker({
        linkerName
      })

      if (!this.searchHistory.includes(linkerName)) {
        this.searchHistory.push(linkerName)
        localStorage.setItem('searchStudyHistory', this.searchHistory)
      }

      this.isPress = false;
      Toast.clear()
      this.resultList = response
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
    position: fixed;
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