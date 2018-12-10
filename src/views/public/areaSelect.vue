<template>
  <div class="area-selection-page">
    <div class="search-box van-hairline--bottom">
      <search></search>
    </div>
    <div class="area-selection-box">
      <div class="current-location">
        <p class="location-str">
          深圳
          <span>当前城市</span>
        </p>
      </div>
      <div class="selection-box" ref="content">
        <div class="index-container">
          <ul class="index-content">
            <li class="indexlist-item" v-for="arr in cityMap">
              <p class="index-item-title">{{arr.character}}</p>
              <ul class="index-content-item">
                <p class="van-hairline--bottom index-content-item-link " v-for="item in arr.city">{{item}}</p>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Search from 'COMP/Search'
import { fullArea } from '@/utils/fullArea'
import letter from '@/utils/letter'
import { mapGetters } from 'vuex'
export default {
  components: {
    Search
  },
  data: () => ({
    // pyMap: {}
  }),
  async created() {
    this.$store.dispatch('getAllCity')
  },
  computed: {
    ...mapGetters(['cityMap'])
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
    }
    > .selection-box {
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
}
</style>
