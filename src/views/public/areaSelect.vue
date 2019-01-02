<template>
  <div class="area-selection-page" ref="content">
    <div class="search-box van-hairline--bottom">
      <search :conf="searchInfo"></search>
    </div>
    <div class="area-selection-box">
      <div class="current-location">
        <p class="location-str" v-if="userArea.city">
          {{userArea.city}}
          <span>当前城市</span>
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
                <p class="van-hairline--bottom index-content-item-link" v-for="(item,index) in arr.city" :key="index" @click="itemClick(item)" >{{item}}</p>
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
</template>
<script>
import Search from 'COMP/Search'
import { fullArea } from '@/utils/fullArea'
import letter from '@/utils/letter'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
export default {
  components: {
    Search
  },
  data: () => ({
    fromPage: null,
    indicator: {
      show: false,
      timer: null,
      str: ''
    },
    searchInfo: {
      siteText: '',
      placeholderText: ''
    },
    navOffsetX: 0,
    moving: false
  }),
  created() {
    this.$store.dispatch('getAllCity')
    this.searchInfo.siteText = this.userArea.city
    this.fromPage = this.$route.query.fromPage
  },
  methods: {
    itemClick(val) {
      switch (this.fromPage) {
        case 'myMember':
          this.$store.commit(types['USER_AREA'], { vipSelectedCity: val })
          break
        case 'myReport':
          this.$store.commit(types['USER_AREA'], { myReportCity: val })
          break
        case 'market':
          this.$store.commit(types['USER_AREA'], { marketSelectedCity: val })
          break
        case 'myMarket':
          this.$store.commit(types['USER_AREA'], { myMarketSelectedCity: val })
          break
        default:
          this.$store.commit(types['USER_AREA'], { selectedCity: val })
          break
      }
      this.$router.go(-1)
    },
    retryLocation() {
      this.$wechatHelper.getUserArea()
    },
    keyTouchStartHandler(e) {
      if (e.target.tagName !== 'LI') return

      this.scrollHander(e.target.innerText)

      window.addEventListener('touchmove', this.handleTouchMove, false)
      window.addEventListener('touchend', this.handleTouchEnd)

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
    scrollList(y) {
      let currentItem = document.elementFromPoint(this.navOffsetX, y)
      if (!currentItem || !currentItem.classList.contains('mint-indexlist-navitem')) {
        return
      }
      this.currentIndicator = currentItem.innerText
      let targets = this.sections.filter(section => section.index === currentItem.innerText)
      let targetDOM
      if (targets.length > 0) {
        targetDOM = targets[0].$el
        this.$refs.content.scrollTop = targetDOM.getBoundingClientRect().top - this.firstSection.getBoundingClientRect().top
      }
    },
    handleTouchMove(e) {
      if (e.target.tagName !== 'LI') return

      this.scrollHander(e.target.innerText)
    },

    handleTouchEnd(e) {
      if (e.target.tagName !== 'LI') return

      this.scrollHander(e.target.innerText)
    }
  },
  computed: {
    ...mapGetters(['cityMap', 'hotCityMap', 'userArea', 'userInfo']),
    indexList() {
      let result = ['热']
      for (let temp of this.cityMap) {
        result.push(temp.character)
      }
      return result
    },
    indicatorStyle() {
      return { display: this.indicator.show ? 'block' : 'none' }
    }
  }
}
</script>
<style lang="less">
.area-selection-page {
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
          > .hot-item {
            width: 100px;
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
</style>
