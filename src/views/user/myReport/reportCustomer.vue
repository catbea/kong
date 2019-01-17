

<template>
  <div class="report-page">
    <form action="/">
      <van-search
        class="search-container"
        v-model="searchVal"
        placeholder="请输入楼盘名称"
        show-action
        @search="onSearchHandler"
        @click="onClickHandler"
        @change="onChangeHandler"
      ></van-search>
    </form>
    <div slot="sort" @click="onSearchHandler"></div>
    <div class="tab-container">
      <van-tabs
        v-model="activeIndex"
        color="#007AE6"
        :line-width="15"
        :swipe-threshold="6"
        @click="onClick"
      >
        <van-tab title="全部" :actionIndex="0"></van-tab>
        <van-tab title="关注" :actionIndex="1"></van-tab>
        <van-tab title="访客" :actionIndex="2"></van-tab>
        <van-tab title="意向" :actionIndex="3"></van-tab>
        <van-tab title="新增" :actionIndex="4"></van-tab>
      </van-tabs>
    </div>
    <div class="report-list-continer">
      <van-list class="report-van-list" v-model="loading" :finished="currentData.finished" @load="onLoad">
        <van-radio-group class="radio-container" v-model="radio" @change="onRadioChangeHandler">
          <van-radio
            class="shadow_box radio-item-container"
            :name="item"
            v-for="(item,index) in currentData.list"
            :key="index"
            :value="item"
          >
            <div class="report-list">
              <span class="report-list-left">
                <img class="report-list-img" :src="item.avatarUrl">
                <img class="list-img-icon" :src="ovalImg" v-if="item.attentionStatus == 0">
              </span>
              <span class="report-list-right">
                <p class="list-right-name">{{item.clientName}}</p>
                <p
                  class="list-right-conter"
                >累计浏览{{item.browsCount?item.browsCount:0}}次，平均停留{{item.averageTime?item.averageTime:0}}s</p>
              </span>
            </div>
          </van-radio>
        </van-radio-group>
      </van-list>
      <div class="list-fixed">
        <button class="list-but" @click="sureHandler">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
import CustomService from 'SERVICE/customService'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
export default {
  components: {
    CustomService
  },
  data: () => ({
    radio: {},
    ovalImg: require('IMG/user/icon_attention@2x.png'),
    activeIndex: 0,
    data: {
      0: { finished: false, list: [], page: 1 },
      1: { finished: false, list: [], page: 1 },
      2: { finished: false, list: [], page: 1 },
      3: { finished: false, list: [], page: 1 },
      4: { finished: false, list: [], page: 1 }
    },
    loading: false,
    pageSize: 10,
    searchVal: '',
    sort: ' intention' // intention：意向度，createTime：客户新增时间
  }),
  created() {},
  methods: {
    onSearchHandler() {
      this.currentData.page = 1
      this.onLoad()
    },
    onClickHandler() {},
    onChangeHandler() {
      this.currentData.page = 1
      this.onLoad()
    },
    /**
     * 切换tab方法
     */
    onClick() {
      this.onLoad()
    },
    async onLoad() {
      this.loading = true
      const result = await CustomService[this.getServeceFunc()](this.searchVal, this.currentData.page, this.pageSize, this.sort)
      if (this.currentData.page > 1) {
        this.currentData.list = this.currentData.list.concat(result.records)
      } else {
        this.currentData.list = result.records
      }
      if (result.pages <= this.currentData.page) {
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

    onRadioChangeHandler(val) {},
    /**
     * 确定
     */
    sureHandler() {
      let _reportAddInfo = {
        clientId: this.radio.clientId,
        clientName: this.radio.clientName
      }
      this.$store.commit(types.REPORT_INFO, _reportAddInfo)
      this.$router.replace({ name: 'addReport' })
    }
  },
  computed: {
    currentData() {
      return this.data[this.activeIndex]
    },
    ...mapGetters(['reportAddInfo'])
  }
}
</script>
<style lang="less">
.sort {
  width: 16px;
  height: 17px;
  background: url('../../../assets/img/market/Combined Shape@2x.png') no-repeat;
  background-size: contain;
  margin-right: 13px;
}

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
    .report-van-list {
      margin-bottom: 70px;
    }
    .radio-container {
      > .radio-item-container {
        margin: 10px 15px;
        padding: 20px 15px;
      }
    }
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
  width: 100%;
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
