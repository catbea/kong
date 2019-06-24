<template>
  <div class="market-page">
    <div class="search-box">
      <van-search v-model.trim="searchValue" placeholder="请输入楼盘名称" background="#fff" @click.native="goSearch">
        <img src="../../assets/img/market/Group 3@2x.png" class="search-icon" slot="left-icon">
      </van-search>
    </div>
    <div class="market-classify">
      <div class="market-classify-item" @click="goPage('/market/classify/allmarket')">
        <img src="../../assets/img/market/classify/classify1.png" alt="">
        <p>全部楼盘</p>
      </div>
      <div class="market-classify-item" @click="goPage('/market/classify/freemarket')">
        <img src="../../assets/img/market/classify/classify2.png" alt="">
        <p>免费楼盘</p>
      </div>
      <div class="market-classify-item" @click="goPage('/market/classify/hotmarket')">
        <img src="../../assets/img/market/classify/classify3.png" alt="">
        <p>热门楼盘</p>
      </div>
      <div class="market-classify-item" @click="goPage('/market/classify/mapmarket')">
        <img src="../../assets/img/market/classify/classify4.png" alt="">
        <p>地图找房</p>
      </div>
    </div>
    <div class="my-markey">
      <div class="title" @click="goMyMarket" v-show="myMarket.length">
        我的楼盘<span> ({{total}})</span>
      </div>
      <div class="market-list">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="market-item" v-for="(item,index) in myMarket" :key="index" @click="goMarketDetail(item)">
            <div class="market-img">
              <img class="headimg" :src="item.linkerUrl" alt="">
              <img v-if="item.ifPanorama==1" class="icon" :src="panoramaIcon" alt="">
              <div v-if="item.cpActivityVo" class="coupon">卡券</div>
            </div>
            <div class="market-info">
              <p class="market-name"><span class="name">{{item.linkerName}}</span> <span class="iconShare" @click.stop="goShare(item)">分享</span></p>
              <p class="market-location">{{item.city}} {{item.county}}</p>
              <p class="market-tags"><span class="active">{{['热销中', '即将发售', '', '售罄'][item.saleStatus]}}</span><span v-for="(option, i) in item.linkerTags.slice(0,2)" >{{option}}</span></p>
              <p class="market-price" v-if="!item.price"  @click.stop="popupHandle(item,index)"><span class="price">价格待定</span> <span class="icon iconfont icon-more"></span></p>
              <p class="market-price" v-else  @click.stop="popupHandle(item,index)"><span class="price">{{item.price}}{{item.priceUnit}}</span><span class="icon iconfont icon-more"></span></p>
            </div>
          </div>
        </van-list>
      </div>
      <div class="nodata" v-show="!myMarket.length && nodataStatus">
        <img src="../../assets/img/article/noarticle.png" alt="">
        <p>你还没有开通任何楼盘</p>
        <button class="add-linker" @click="$router.push('/market/classify/allmarket')">去开通</button>
      </div>
    </div>
    <div>
      <van-popup v-model="showPopup" position="bottom" :close-on-click-overlay="true" overlay :class="{pastStyle:!pastShow}">
        <ul>
          <li @click="goRenew(currentItem.linkerId)" v-show="!stride">续费（{{currentItem.subscribeInvalidTime | dateTimeFormatter(0)}}到期）</li>
          <li @click="goRenew(currentItem.linkerId)" v-show="stride">续费（{{currentItem.subscribeInvalidTime | dateTimeFormatter(2)}}到期）</li>
          <div v-if="pastShow">
            <li class="color" @click="stickHandle">
              <span v-show="currentItem.recommand==0">置顶</span>
              <span v-show="currentItem.recommand==10">取消置顶</span>
            </li>
            <!-- <li @click="exhibitionHandle">
                <span v-show="currentItem.displayFlag==0">关闭楼盘展示</span>
                <span v-show="currentItem.displayFlag!=0">开启楼盘展示</span>
              </li> -->
          </div>
          <li class="cancel" @click="closeHandle">取消</li>
        </ul>
      </van-popup>
    </div>
  </div>
</template>
<script>
import Search from 'COMP/Search'
import { mapGetters } from 'vuex'
import userService from 'SERVICE/userService'
export default {
  components: {
    Search
  },
  data() {
    return {
      searchValue: '',
      myMarket: [],
      loading: false,
      finished: false,
      size: 10,
      current: 1,
      pages: 1,
      total: '',
      nodataStatus: false,
      panoramaIcon: require('IMG/marketDetail/Oval@2x.png'),
      showPopup: false,
      pastShow: '是否过期',
      stride: true,
      currentItem: {},
      currentIndex: '',
      stickNum: 0
    }
  },
  computed: {
    ...mapGetters(['userArea', 'userInfo'])
  },
  created() {
  },
  methods: {
    // 点击搜索
    goSearch() {
      this.$router.push({ name: 'market-search', query: { city: '全国' } })
    },
    // 跳转分类
    goPage(url) {
      this.$router.push(url)
    },
    // 加载更多
    onLoad() {
      if (this.current > this.pages) {
        // 加载状态结束
        this.finished = true
        this.loading = false
        this.stickNumHandle()
      } else {
        this.getMyMarket()
      }
    },
    // 获取我的楼
    getMyMarket() {
      let parma = {
        name: '',
        size: this.size,
        current: this.current
      }
      userService.getMyMarket(parma).then(res => {
        this.pages = res.pages
        this.total = res.total
        if (this.current === 1) {
          this.myMarket = res.records
        } else {
          this.myMarket.push(...res.records)
        }
        this.current += 1
        this.nodataStatus = true
        this.loading = false
      }).catch(err => {
      })
    },
    // 跳转楼盘详情
    goMarketDetail(item) {
      if (item.shelfFlag == 1) {
        this.$dialog
          .alert({
            title: '非常抱歉',
            message: '该楼盘已被下架或删除',
            confirmButtonText: '知道啦'
          })
          .then(() => {
            // on close
          })
      } else {
        this.$router.push('/market/' + item.linkerId)
      }
    },
    // 分享
    goShare(item) {
      if (item.shelfFlag == 1) {
        this.$dialog
          .alert({
            title: '非常抱歉',
            message: '该楼盘已被下架或删除',
            confirmButtonText: '知道啦'
          })
          .then(() => {
            // on close
          })
      } else {
        //去分享
        this.$router.push({ name: 'market-poster', params: { id: item.linkerId } })
      }
    },
    // 置顶
    popupHandle(item, index) {
      if (item.shelfFlag == 1) {
        this.$toast({
          message: '该楼盘已被下架或删除!',
          duration: 1000
        })
      } else {
        //更多
        this.currentItem = item
        this.currentIndex = index
        this.time(item)
        this.strideYear(item)
        this.showPopup = true
        this.$store.commit('TABBAR', { show: false })
      }
    },
    //比较时间错判断是否过期
    time(item) {
      let timestamp = new Date().getTime()
      if (timestamp - item.subscribeInvalidTime > 0) {
        this.pastShow = false
      } else {
        this.pastShow = true
      }
    },
    strideYear(item) {
      //判断是否跨年
      let timestamp = new Date().getTime()
      let usefulLife = item.subscribeInvalidTime - 0 //到期时间错
      if (new Date(usefulLife).getFullYear() - new Date(timestamp).getFullYear() > 0) {
        this.stride = true
      } else {
        this.stride = false
      }
    },
    goRenew(linkerId) {
      if (this.currentItem.saleStatus == 3) {
        this.$dialog
          .alert({
            title: '非常抱歉',
            message: '该楼盘已售罄，无法开通',
            confirmButtonText: '知道啦'
          })
          .then(() => {
            // on close
          })
      } else if (this.currentItem.shelfFlag == 1) {
        this.$dialog
          .alert({
            title: '非常抱歉',
            message: '该楼盘已被下架或删除',
            confirmButtonText: '知道啦'
          })
          .then(() => {
            // on close
          })
      } else if (this.currentItem.thisDistributor === false) {
        this.$dialog
          .alert({
            title: '该楼盘不可续费',
            message: '非当前所属公司下楼盘无法开通续费',
            confirmButtonText: '知道啦'
          })
          .then(() => {
            // on close
          })
      } else {
        //去续费
        this.$router.push({ name: 'marketDetail-open', params: { id: linkerId } })
      }
    },
    stickNumHandle() {
      //判断有没有超过3个置顶
      for (let i = 0; i < this.myMarket.length; i++) {
        const element = this.myMarket[i]
        if (element.recommand == 10) {
          this.stickNum++
        }
      }
    },
    // 楼盘置顶
    stickHandle() {
      if (this.currentItem.recommand == 10) {
        this.recommandFalseHandle()
      } else {
        this.recommandTrueHandle()
      }
    },
    //-----置顶操作
    recommandTrueHandle() {
      this.stickNum++
      this.myMarket[this.currentIndex].recommand = '10'
      this.myMarket.unshift(this.myMarket[this.currentIndex])
      this.myMarket.splice(this.currentIndex + 1, 1)
      this.changeUserStatus(this.currentItem.linkerId, 40, 10) //改置顶状态
      this.$toast({ duration: 1000, message: '置顶成功' })
      this.closeHandle()
    },
    recommandFalseHandle() {
      this.stickNum--
      this.myMarket[this.currentIndex].recommand = '0'
      this.myMarket.push(this.myMarket[this.currentIndex])
      this.myMarket.splice(this.currentIndex, 1)
      this.changeUserStatus(this.currentItem.linkerId, 40, 0) //改置顶状态
      this.$toast({ duration: 1000, message: '取消置顶成功' })
      this.closeHandle()
    },
    exhibitionHandle() {
      //关闭楼盘展示
      this.$dialog
        .confirm({
          title: '是否确定关闭该楼盘名片展示',
          message: '关闭该楼盘展示将取消推荐和置顶状态'
        })
        .then(() => {
          this.closeHandle()
          this.changeUserStatus(this.currentItem.linkerId, 30, 1) //改为不展示
          this.myMarket.splice(this.currentIndex, 1)
          this.$toast({
            duration: 800,
            message: '关闭展示成功'
          })
        })
    },
    closeHandle() {
      this.showPopup = false
      this.$store.commit('TABBAR', { show: true })
    },
    async changeUserStatus(linkerId, operationType, status) {
      await userService.changeMarketData(linkerId, operationType, status)
    }, //修改楼盘状态
    goMyMarket() {
      this.$router.push('/market/classify/mymarket')
    }
  },
  mounted() {
  },
  beforeDestroy() {

  }
}
</script>
<style lang="less" scoped>
.market-page {
  display: flex;
  flex-direction: column;
  position: relative;
  .market-classify {
    margin: 20px 0;
    font-size: 10px;
    display: flex;
    .market-classify-item {
      flex: 1;
      text-align: center;
      color: #445166;
      img {
        width: 44px;
        height: 44px;
      }
      p {
        height: 14px;
        line-height: 14px;
        margin-top: 4px;
      }
    }
  }
  .my-markey {
    flex: 1;
    overflow-y: scroll;
    padding: 0 16px;
    border-top: 8px solid #f2f6f7;
    .title {
      padding: 16px 0 16px;
      font-size: 24px;
      color: #333;
      font-weight: 600;
      font-family: PingFangSC-Semibold;
      span {
        font-size: 18px;
      }
    }
    .nodata {
      text-align: center;
      margin-top: 88px;
      img {
        height: 88px;
        width: 88px;
        margin: 0 auto;
      }
      p {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 17px;
      }
      .add-linker {
        margin-top: 16px;
        width: 64px;
        height: 32px;
        border-radius: 16px;
        line-height: 32px;
        border: 1px solid rgba(0, 122, 230, 1);
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0, 122, 230, 1);
        line-height: 17px;
        text-align: center;
        background: #fff;
      }
    }
  }
  .market-item {
    display: flex;
    font-size: 14px;
    margin-bottom: 15px;
    .market-img {
      width: 120px;
      height: 90px;
      border-radius: 6px;
      overflow: hidden;
      margin: 5px 12px 0 0;
      position: relative;
      .headimg {
        width: 100%;
        height: 100%;
        border-radius: 6px;
        object-fit: cover;
      }
      .coupon {
        position: absolute;
        left: 0;
        top: 8px;
        font-size: 12px;
        color: #fff;
        padding: 0 10px 0 5px;
        height: 20px;
        line-height: 20px;
        background-color: #cf562b;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
    .market-info {
      flex: 1;
      p {
        margin-bottom: 8px;
      }
      .market-name {
        display: flex;
        font-size: 18px;
        font-weight: 600;
        color: rgba(19, 41, 79, 1);
        margin-bottom: 0;
        .name {
          flex: 1;
          line-height: 30px;
          max-width: 150px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .iconShare {
          width: 54px;
          height: 30px;
          line-height: 30px;
          background: linear-gradient(90deg, rgba(255, 153, 51, 1) 0%, rgba(230, 94, 46, 1) 100%);
          box-shadow: 0px 2px 4px 0px rgba(230, 94, 46, 0.35);
          border-radius: 15px;
          font-size: 12px;
          color: #fff;
          text-align: center;
          font-weight: 500;
          margin-left: 10px;
          margin-top: 4px;
        }
      }
      .market-location {
        font-size: 12px;
        font-weight: 400;
        color: rgba(64, 81, 111, 1);
      }
      .market-tags {
        font-size: 10px;
        span {
          display: inline-block;
          padding: 3px 6px;
          border-radius: 2px;
          margin-right: 5px;
          background: rgba(143, 159, 177, 0.15);
          color: #5c5f66;
          &.active {
            background-color: rgba(0, 120, 255, 0.15);
          }
        }
      }
      .market-price {
        font-size: 14px;
        font-weight: 600;
        color: rgba(68, 81, 102, 1);
        display: flex;
        margin-bottom: 0;
        .price {
          flex: 1;
        }
        .icon-more {
          width: 50px;
          text-align: center;
          color: #9e9e9e;
        }
      }
    }
  }
  .pastStyle {
    height: 106px;
  }
  //弹窗
  .van-popup--bottom {
    background: rgba(255, 255, 255, 1);
    width: 100%;
    // height: 250px;
    border-radius: 0;
    left: 0;
    bottom: 0;
    transform: translate3d(0, 0, 0);
    ul {
      li {
        width: 375px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .borderDottom {
        border-bottom: 1px solid #eeeeee;
      }
      .color {
        color: rgba(234, 77, 46, 1);
        border-bottom: 1px solid #eeeeee;
      }
      .cancel {
        border-top: 6px solid #e8e8e8;
      }
    }
  }
}
</style>

<style lang='less'>
.market-page {
  .search-box {
    margin-top: 10px;
    .van-field__body {
      height: 100%;
    }
    .van-field__left-icon {
      display: flex;
    }
    .van-cell {
      background-color: #f5f5f5;
    }
    .search-icon {
      width: 24px;
      height: 24px;
    }
    .van-field__control {
      height: 24px;
      padding-top: 2px;
    }
  }
}
</style>