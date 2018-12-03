

<template>
  <div class="report-page">
    <van-search
      class="search-container"
      v-model="searchVal"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearchHandler"
      @click="onFocusHandler"
    >
      <div slot="action" @click="onSearchHandler">搜索</div>
    </van-search>
    <div class="tab-container">
      <van-tabs v-model="activeIndex" color="#007AE6" :line-width="15" :swipe-threshold="6" @click="onClick">
        <van-tab title="全部" :actionIndex='0'></van-tab>
        <van-tab title="关注" :actionIndex='1'></van-tab>
        <van-tab title="访客" :actionIndex='2'></van-tab>
        <van-tab title="意向" :actionIndex='3'></van-tab>
        <van-tab title="新增" :actionIndex='4'></van-tab>
      </van-tabs>
    </div>
    <div class="report-list-continer">
      <van-list v-model="loading" :finished="currentData.finished" @load="onLoad">
        <div
          class="list-continer-for"
          v-for="(item,index) in currentData.list"
          :key="index"
          :info="item"
          @click="itemClickHandler"
        >
          <shadow-box>
            <div slot="container" class="list-continer-padd">
              <checkbox-group v-model="result">
                <checkbox v-model="checked" :name="item.id">
                  <div class="report-list">
                    <span class="report-list-left">
                      <img class="report-list-img" :src="item.avatarUrl" >
                      <img class="list-img-icon" :src="ovalImg" v-if="item.attentionStatus == 0">
                    </span>
                    <span class="report-list-right">
                      <p class="list-right-name">{{item.clientName}}</p>
                      <p class="list-right-conter">累计浏览{{item.browsCount?item.browsCount:0}}次，平均停留{{item.averageTime?item.averageTime:0}}s</p>
                    </span>
                  </div>
                </checkbox>
              </checkbox-group>
            </div>
          </shadow-box>
        </div>
      </van-list>
      <div class="list-fixed">
        <button class="list-but">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
import { Checkbox, CheckboxGroup } from 'vant'
import ShadowBox from 'COMP/ShadowBox'
import CustomService from 'SERVICE/customService'

export default {
  components: {
    ShadowBox,
    Checkbox,
    CheckboxGroup,
    CustomService
  },
  data: () => ({
    availableImg: require('IMG/user/usercard@2x.png'),
    ovalImg: require('IMG/user/Oval 2@2x.png'),
    activeIndex: 0,
    data: {
      0: { finished: false, list: [], page: 1 },
      1: { finished: false, list: [], page: 1 },
      2: { finished: false, list: [], page: 1 },
      3: { finished: false, list: [], page: 1 },
      4: { finished: false, list: [], page: 1 }
    },
    result: [{ id: '1', id: '2' }],
    loading: false,
    search: '',
    pageSize: 10,
    searchVal: '',
    sort: ' intention' // intention：意向度，createTime：客户新增时间
  }),
  created() {},
  methods: {
    onSearchHandler() {},
    onClick () {
      this.onLoad()
    },
    async onLoad() {
      this.loading = true
      const result = await CustomService[this.getServeceFunc()](
        this.search,
        this.currentData.page,
        this.pageSize,
        this.sort
      )
      console.log(result)
      this.currentData.list = this.currentData.list.concat(result.records)
      if (result.records.length < this.currentData.page) {
        this.currentData.finished = true
      } else {
        this.currentData.page++
      }
      this.loading = false
    },

    // 获取当前serviec处理方法
    getServeceFunc() {
      switch (this.activeIndex) {
        case 0:
          return 'getCustomerAll'
        case 1:
          return 'getCustomerFollow'
        case 2:
          return 'getCustomerVisitor'
        case 3:
          return 'getCustomerIntention'
        case 4:
          return 'getCustomerAdd'
      }
    },
    itemClickHandler(e) {
      // this.$router.push(`/custom/${e.clientId}`)
    },
    onFocusHandler() {
      console.log('fffff')
    }
  },
  computed: {
    currentData() {
      console.log(this.activeIndex)
      return this.data[this.activeIndex]
    }
  }
}
</script>
<style lang="less">
.report-page {
  .search-container {
    .van-field__body {
      height: 100%;
    }
    .van-field__control {
      height: 100%;
    }
  }
  .report-list-continer {
    margin-top: 16px;
  }
}

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
</style>
