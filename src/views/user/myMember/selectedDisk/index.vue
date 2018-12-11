<template>
  <div class="my-member-page">
    <div style="margin-left:16px;margin-top:7px">
    <van-search :obj="searchInfo"></van-search>
    </div>
    <div>
      <screen></screen>
    </div>
    <div class="market-box">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="'没有更多了'"
        @load="vipLinkerList">
        <meal-market
            v-for="(item,index) in projectList"
            :key="index"
            :dataArr="item"
            :indexData="index"
            :showData="showArr.indexOf(index) >-1"
            @click.native="selectHandle(item)" ></meal-market>
      </van-list>
    </div>
    <div class="check-all-box">
      <div class="img-box">
      <span
      class="icon-check bg_img"
      :style="{backgroundImage:'url('+(checkAllShow ? checkColorImg : checkImg)+')'}"
      @click="allSelectHandle"
      ></span>
      全选
      </div>
      <span @click="vipProjectOpenHandle" class="check-all-button">开通</span>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant'
import marketService from 'SERVICE/marketService'
import VanSearch from 'COMP/VanSearch/'
import Screen from 'COMP/Screen/'
import MealMarket from './MealMarket.vue'
export default {
  components: {
    VanSearch,
    Screen,
    MealMarket
  },
  created() {
    // this.vipLinkerList()
  },
  data: () => ({
    showArr: [],
    searchInfo: {
      siteText: '全国',
      placeholderText: '请输入楼盘'
    },
    checkImg: require('IMG/user/mealMarket/check@2x.png'),
    checkColorImg: require('IMG/user/mealMarket/checkColor@2x.png'),
    page: 1,
    pageSize: 8,
    checkAllShow: false,
    loading: false,
    finished: false,
    projectList: []
  }),
  methods: {
    async vipLinkerList() {
      this.checkAllShow = false
      let param = {current: this.page, size: this.pageSize}
      const res = await marketService.vipLinkerList(param)
      let _list = []
      for(let item of res.records) {
        let obj = {
          linkerId: item.linkerId,
          linkerUrl: item.linkerUrl,
          sale: item.sale,
          linkerName: item.linkerName,
          site: `${item.city} ${item.county} ${item.price} ${item.priceUnit}`, //'深圳 南山 120000元/㎡',
          condition: item.linkerTags,
          open: `${item.openTimes}次开通`,
          isChecked: false,
          price: `${item.price} ${item.priceUnit}`
        }
        _list.push(obj)
      }
      this.projectList = this.projectList.concat(_list)
      if (res.pages === 0 || this.page === res.pages) {
        this.finished = true
      }
      this.page++
      this.loading = false
    },

    async vipProjectOpenHandle() {
      if(this.showArr.length == 0) {
        this.$toast('请先选择楼盘')
        return
      }
      let isCheckLinkerArr = []
      for(let item of this.showArr){
        isCheckLinkerArr.push(item.linkerId)
      }
      let res = await marketService.addHouseByVip(isCheckLinkerArr.join())
      this.$toast('添加到我的楼盘成功');
      // this.$router.replace({path: "/user"});
    },

    selectHandle(project) {
      project.isChecked = !project.isChecked
      for(let item of this.showArr) {
        if(project.linkerId == item.linkerId){
          this.showArr = this.showArr.filter(obj => {
            return obj != item
          })
          return
        }
      }
      this.showArr.push(project)
    },

    allSelectHandle() {
      this.checkAllShow = !this.checkAllShow
      if(this.checkAllShow){
        this.showArr = this.projectList
        for(let item of this.projectList){
          item.isChecked = true
        }
      } else {
        this.showArr = []
        for(let item of this.projectList){
          item.isChecked = false
        }
      }
    }
  }
}
</script>
<style lang="less">
.my-member-page {
  .market-box {
    padding-bottom: 80px;
    .meal-market-page {
      .meal-market-page-box {
        margin: 16px 0 0 16px;
      }
    }
  }
  .check-all-box {
    background: rgba(255, 255, 255, 1);
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    .img-box {
      display: flex;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    .icon-check {
      width: 18px;
      height: 18px;
      margin: 0 16px;
    }
    .check-all-button {
      margin-right: 32px;
      width: 72px;
      height: 30px;
      border-radius: 22px;
      border: 1px solid;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 122, 230, 1);
      line-height: 30px;
      text-align: center;
    }
  }
}
</style>
