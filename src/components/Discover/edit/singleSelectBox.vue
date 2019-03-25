<template>
  <van-popup class="single-select-box" v-model="singleShow">
    <img class="close-btn" :src="closeImg" @click="closeHandler">
    <div v-if="status===1" class="search-container">
      <div class="search-box">
        <!-- @getContent="searchChangeHandle" -->
        <search :conf="searchInfo" v-model.trim="projectName" @input="searchChangeHandle"  @areaClick="areaClickHandle" @focus="focusHandler"/>
        <screen v-model.trim="projectFilters" :local="this.searchInfo.siteText"/>
      </div>
      <div class="house-box">
        <van-list v-model="loading" :finished="finished" :finished-text="'没有更多了'" @load="getLinkerList">
          <discover-item2 v-for="(item,index) in projectList" v-model="item.isChecked" :data="item" :showRules="false" :disabled="item.disabled" :key="index" @click.native="selectHandle(item)"/>
        </van-list>
      </div>
    </div>
    <div v-else class="city-select-container">
      <div class="area-selection-page" ref="content">
        <div class="search-box van-hairline--bottom">
          <search :conf="searchInfo" v-model.trim="projectName" @areaClick="areaClickHandle" @focus="focusHandler"/>
        </div>
        <div class="area-selection-box">
          <div class="current-location">
            <p class="location-str" v-if="userArea.city">
              {{userArea.city}}
              <span @click="itemClick(userArea.city)">当前城市</span>
            </p>
            <div class="location-fail" v-else>
              <p class="fail-str">定位失败,请检查</p>
              <p class="retry-text" @click="retryLocation">重新定位</p>
            </div>
          </div>
          <div class="selection-box" id="hot-city-box">
            <div class="hot-container">
              <p class="hot-title">热门城市</p>
              <div class="hot-item-content">
                <div class="hot-item" v-for="(item,index) in hotCityMap" :key="index" @click="itemClick(item.city)">{{item.city}}</div>
              </div>
            </div>
            <div class="index-container">
              <ul class="index-content">
                <li class="indexlist-item" v-for="(arr, index) in cityMap" :key="index">
                  <p class="index-item-title" :id="'city_'+arr.character">{{arr.character}}</p>
                  <ul class="index-content-item">
                    <p class="van-hairline--bottom index-content-item-link" v-for="(item,index) in arr.city" :key="index" @click="itemClick(item)">{{item}}</p>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="index-key-box" ref="nav">
          <ul class="index-key-nav">
            <li class="index-key-item" v-for="(item,index) in indexList" :key="index" @touchstart="keyTouchStartHandler">{{item}}</li>
          </ul>
        </div>
        <div class="selected-indicator" :style="indicatorStyle">{{indicator.str}}</div>
      </div>
    </div>
  </van-popup>
</template>
<script>
import Search from 'COMP/Search/'
import Screen from 'COMP/Screen/'
import DiscoverItem2 from 'COMP/DiscoverItem2/'
import { mapGetters } from 'vuex'
import marketService from 'SERVICE/marketService'
import userService from 'SERVICE/userService'
import screenFilterHelper from '@/utils/screenFilterHelper'
export default {
  components: {
    Search,
    Screen,
    DiscoverItem2
  },
  props: {
    value: { type: Boolean, default: false }, // 对应show.是否显示
    selected: {
      type: Array,
      default: () => {
        return []
      }
    } // 已经选中的
  },
  data: () => ({
    closeImg: require('IMG/article/bg_close.png'),
    singleShow: false,
    status: 1,
    projectFilters: {},
    searchInfo: {
      siteText: '',
      placeholder: '请输入楼盘'
    },
    searchTimer: null,
    loading: false,
    finished: false,
    page: 1,
    pageSize: 10,
    projectName: '',
    projectList: [],
    selectedItems: [],
    fromPage: null,
    indicator: {
      show: false,
      timer: null,
      str: ''
    },
    searchInfo: {
      siteText: '',
      placeholder: '请输入楼盘名称'
    },
    navOffsetX: 0,
    moving: false,
    areaQueryFlag: false
  }),
  created() {
    this.searchInfo.siteText = this.userInfo.majorCity
  },
  methods: {
    // 搜索框文字改变时触发搜索
    searchChangeHandle(name) {
      this.finished = false
      this.page = 1
      this.projectName = name.trim()
      this.projectList = []
    },
    // 加载数据方法 整合加载更多和重新搜索
    async getLinkerList() {
      let mergeFilters = this.projectFilters.baseFilters ? Object.assign(this.projectFilters.baseFilters, this.projectFilters.moreFilters) : {}
      let payload = screenFilterHelper(this.projectName, mergeFilters)
      payload = Object.assign(payload, { current: this.page, size: this.pageSize, city: this.searchInfo.siteText })

      const res = await userService.getMyHouses(payload)
      let _list = []
      for (let item of res.records) {
        if (this.selectedIdArr.indexOf(item.linkerId) !== -1) continue
        let obj = {
          linkerId: item.linkerId,
          linkerUrl: item.linkerUrl,
          sale: item.sale,
          linkerName: item.linkerName,
          site: `${item.city ? item.city : ''} ${item.district ? item.district : ''} ${item.price ? item.price : '价格待定'} ${item.priceUnit&&item.price ? item.priceUnit : ''}`, //'深圳 南山 120000元/㎡',
          condition: item.linkerTags,
          open: `${item.openTimes}次开通`,
          saleStatus: item.saleStatus,
          disabled: false,
          divisionRules: item.divisionRules,
          price: `${item.price} ${item.priceUnit}`,
          buildArea: item.minArea !== '' && item.maxArea !== '' ? `${item.minArea}-${item.maxArea}㎡` : ''
        }
        // if (!obj.city) obj.city = obj.site
        // if (!obj.linkerTags) {
        //   let statusArr = ['热销中', '即将发售', '售罄']
        //   obj.linkerTags = [statusArr[obj.saleStatus], ...obj.condition]
        // }
        _list.push(obj)
      }
      this.projectList = this.page <= 1 ? _list : this.projectList.concat(_list)
      if (res.pages === 1 || this.page >= res.pages) {
        this.finished = true
      }else {
        this.page++
      }
      this.loading = false
    },
    // 切换到地域切换
    areaClickHandle() {
      if (this.status == 1) {
        this.status = 2
        if (!this.areaQueryFlag) {
          this.$store.dispatch('getAllCity')
          this.areaQueryFlag = true
          this.searchInfo.placeholder = '点击返回楼盘搜索'
        }
      } else {
        this.status = 1
        this.searchInfo.placeholder = '请输入楼盘名称'
      }
    },
    focusHandler() {
      if (this.status == 2){
         this.status = 1
        this.searchInfo.placeholder = '请输入楼盘名称'
      }
    },
    closeHandler() {
      this.singleShow = false
    },
    // item点击
    selectHandle(item) {
      this.$emit('submit', item)
      this.singleShow = false
    },
    // 重置,cleanData - 是否也清除数据
    reset(cleanData = false) {
      this.selectedItems = []
      this.page = 1
      this.projectList = []
      this.finished = false
    },
    keyTouchStartHandler(e) {
      if (e.target.tagName !== 'LI') return
      this.scrollHander(e.target.innerText)
      if (e.target.innerText == '热') {
        document.getElementById('hot-city-box').scrollIntoView()
      } else {
        document.getElementById('city_' + e.target.innerText).scrollIntoView()
      }
    },
    scrollHander(val) {
      this.indicator.str = val
      this.indicator.show = true
      this.indicator.timer = setTimeout(() => {
        this.indicator.show = false
        this.indicator.str = ''
        clearTimeout(this.indicator.timer)
      }, 1000)
    },
    itemClick(val) {
      this.searchInfo.siteText = val
      this.status = 1
      this.searchInfo.placeholder = '请输入楼盘名称'
      this.reset(this.maxSelect <= 1)
    },
    retryLocation() {
      this.$wechatHelper.getUserArea()
    }
  },
  watch: {
    value(val) {
      this.singleShow = val
      if (val) {
        this.reset()
      }
    },
    singleShow(val) {
      this.$emit('input', val)
      this.reset()
      if (val === true) {
        this.getLinkerList()
      }
    },
    'searchInfo.siteText'(val) {
      this.reset()
    },
    projectFilters: {
      handler(val) {
        this.reset()
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userArea', 'cityMap', 'hotCityMap']),
    indexList() {
      let result = ['热']
      for (let temp of this.cityMap) {
        result.push(temp.character)
      }
      return result
    },
    indicatorStyle() {
      return { display: this.indicator.show ? 'block' : 'none' }
    },
    selectedIdArr() {
      let result = []
      for (let temp of this.selected) {
        result.push(temp.linkerId)
      }
      return result
    }
  }
}
</script>

<style lang="less">
.single-select-box {
  width: 84%;
  height: 86%;
  border-radius: 4px;
  overflow: unset;
  > .close-btn {
    position: absolute;
    width: 24px;
    height: 32px;
    left: 50%;
    bottom: -48px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%); 
  }
  > .search-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    > .search-box {
      position: relative;
      margin: 8px 10px;
    }
    > .house-box {
      flex: 1;
      // margin-bottom: 30px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    > .operate-box {
      position: fixed;
      width: 100%;
      height: 50px;
      bottom: 0;
      flex: 1;
      display: flex;
      justify-content: space-around;
      background: #fff;
      > div {
        font-size: 12px;
        color: #ffffff;
        font-weight: 400;
        width: 120px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        letter-spacing: 2px;
        margin: 9px;
        border-radius: 6px;
        &.cancel-btn {
          background: #404457;
        }
        &.submit-btn {
          background: #007ae6;
        }
      }
    }
  }
  > .city-select-container {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    > .area-selection-page {
      .search-box {
        position: relative;
        width: 345px;
        height: 44px;
        margin: 7px 15px;
      }
      > .area-selection-box {
        > .current-location {
          height: 60px;
          padding: 15px 20px;
          > .location-str {
            font-size: 16px;
            font-weight: 600;
            color: #333333;
            > span {
              font-size: 13px;
              font-weight: 400;
              color: #999999;
            }
          }
          > .location-fail {
            display: flex;
            justify-content: space-between;
            > .fail-str {
              font-size: 16px;
              color: #333333;
              font-weight: 600;
            }
            > .retry-text {
              font-size: 12px;
              color: #007ae6;
              font-weight: 400;
              line-height: 1.5;
            }
          }
        }
        > .selection-box {
          > .hot-container {
            > .hot-title {
              font-size: 13px;
              margin: 0;
              padding: 10px;
              background-color: #fafafa;
            }
            > .hot-item-content {
              display: flex;
              justify-content: space-around;
              flex-wrap: wrap;
              padding-right: 10px;
              > .hot-item {
                width: 25%;
                height: 30px;
                background-color: rgba(0, 122, 230, 0.05);
                border-radius: 6px;
                color: #666666;
                font-weight: 400;
                line-height: 30px;
                font-size: 12px;
                text-align: center;
                margin: 8px;
              }
            }
          }
          > .index-container {
            width: 100%;
            position: relative;
            overflow: hidden;
            // ul
            > .index-content {
              // li
              > .indexlist-item {
                // p
                > .index-item-title {
                  font-size: 13px;
                  margin: 0;
                  padding: 10px;
                  background-color: #fafafa;
                }
                // ul
                > .index-content-item {
                  // p
                  > .index-content-item-link {
                    font-size: 16px;
                    background-color: #fff;
                    box-sizing: border-box;
                    color: inherit;
                    // min-height: 48px;
                    line-height: 60px;
                    // margin: 15px;
                    margin: 0 15px;
                    height: 60px;
                    display: block;
                    overflow: hidden;
                    position: relative;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      > .index-key-box {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        text-align: center;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        > .index-key-nav {
          > .index-key-item {
            padding: 2px 6px;
            user-select: none;
            font-weight: 600;
            color: #666666;
          }
        }
      }
      > .selected-indicator {
        position: fixed;
        width: 50px;
        height: 50px;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-align: center;
        line-height: 50px;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 5px;
        color: #fff;
        font-size: 22px;
      }
    }
  }
}
</style>
