<template>
  <div class="citylist-cnt">
    <div class="search-box">
      <div class="cnt">
        <div class="info">
          <img class="search" src="../../assets/img/public/citylist/search.png" alt="">
          <input type="text" name="" id="" v-model="keywords" placeholder="请输入城市名称">
          <img class="clear" src="../../assets/img/public/citylist/clear.png" alt="" srcset="">
        </div>
        <div class="cancle">取消</div>
      </div>
    </div>
    <div class="tab-box">
      <van-tabs @click="changeTab" color="#007AE6">
        <van-tab title="城市"></van-tab>
        <van-tab title="省份"></van-tab>
      </van-tabs>
    </div>
    <div class="list-box">
      <div class="city-box">
        <div class="city-late">
          <span><b>深圳</b> <label>最近访问</label></span>
        </div>
        <div class="city-container">
          <div class="city-gps">
            <p class="tips">定位城市</p>
            <div class="gps">
              <img src="../../assets/img/public/citylist/gps.png" alt="" srcset=""> 深圳
            </div>
          </div>
          <div class="city-hot">
            <p class="tips">定位城市</p>
            <ul class="list">
              <li  class="hot-item">北京</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="province-box"></div>
      <div class="search-box"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
export default {
  components: {
  },
  data () {
    return {
      keywords: ''
    }
  },
  created () {},
  methods: {
    // tab切换
    changeTab (index, title) {}
  }
}
</script>

<style lang="less" scoped>
.citylist-cnt{
  font-size: 12px;
  .search-box{
    margin: 8px 15px;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    .cnt{
      display: flex;
      background-color: #F2F6F7;
      border-radius: 6px;
      overflow: hidden;
      .info{
        flex: 1;
        height: 30px;
        display: flex;
        img{
          vertical-align: middle;
          &.search{
            width: 24px;
            height: 24px;
            margin: 3px;
          }
          &.clear{
            width: 16px;
            height: 16px;
            margin: 7px 5px;
          }
        }
        input {
          flex: 1;
          height: 30px;
          border: none;
          padding: 0 5px;
          line-height: 30px;
          background-color: transparent;
        }
      }
      .cancle{
        width: 50px;
        text-align: center;
        background-color: #fff;
        height: 30px;
        font-size: 14px;
        color: #666;
      }
    }
    
    
  }
  .list-box{
    .city-box{
      .city-late{
        height: 50px;
        line-height: 50px;
        padding: 0 15px;
        b{
          color: #333;
          font-size: 16px;
        }
        label{
          color: #999;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .city-container{
        background-color: #F7F9FA;
        padding: 20px 16px;
        .tips{
          font-size: 12px;
          color: #666;
        }
        .gps{
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: #fff;
          text-align: center;
          width: 100px;
          height: 32px;
          line-height: 32px;
          vertical-align: middle;
          margin-top: 15px;
          img{
            width: 11px;
            height: 13px;
            vertical-align: middle;
          }
        }
        .city-hot{
          margin-top: 15px;
          .list{
            margin-top: 15px;
            .hot-item{
              width: 100px;
              border: 1px solid #ddd;
              border-radius: 4px;
              background-color: #fff;
              text-align: center;
              width: 100px;
              height: 32px;
              line-height: 32px;
              margin: 0 16px 16px 0;
            }
          }
        }
      }
    }
  }
}
</style>
