<template>
  <div class="citylist-cnt">
    <div class="search-box">
      <div class="cnt">
        <div class="info">
          <img class="search" src="../../../assets/img/public/citylist/search.png" alt="">
          <input type="text" name="" id="" v-model.trim="keywords" placeholder="请输入城市名称">
          <img class="clear" src="../../../assets/img/public/citylist/clear.png" alt="" srcset="" v-show="keywords" @click="keywords=''">
        </div>
        <div class="cancle" v-show="keywords" @click="keywords=''">取消</div>
      </div>
    </div>
    <div class="list-box">
      <div class="tab-box"></div>
      <div class="city-box" v-show="!keywords">
        <div class="city-index">
          <mt-index-list>
            <mt-index-section index="热">
              <mt-cell :title="item.city" v-for="(item,i) in cityListData.hotCityList" :key="i" @click.native="chooseItem(item.city)"></mt-cell>
            </mt-index-section>
            <mt-index-section :index="item.character" v-for="(item,index) in cityListData.cityList" :key="index">
              <mt-cell :title="option" @click.native="chooseItem(option)" v-for="(option,num) in item.city" :key="num"></mt-cell>
            </mt-index-section>
          </mt-index-list>
        </div>
      </div>
      <div class="keywords-box" v-show="keywords">
        <div v-if="searchList.length">
          <mt-cell :title="option.city" @click.native="chooseItem(option.city)" v-for="(option,num) in searchList" :key="num"></mt-cell>
        </div>
        <div class="nodata" v-else>
          <img src="../../../assets/img/public/citylist/nodata.png" alt="">
          <p>抱歉，未找到相关位置</p>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import commonService from '@/services/commonService'
import marketService from 'SERVICE/marketService'
import userService from 'SERVICE/userService'
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'
import { IndexList, IndexSection, Cell } from 'mint-ui'
import 'mint-ui/lib/style.css'
export default {
  components: {
   'mt-index-list': IndexList,
   'mt-index-section': IndexSection,
   'mt-cell': Cell
  },
  data () {
    return {
      category: '',
      keywords: '',
      activeTab: 0,
      cityListData: '',
      usercity: '',
      location: '',
      fromPage: '',
      searchType: '',
      searchList: '',
      selected: [], //已选择楼盘
      type: '',
      fullPath: '',
      viewpointText: ''
    }
  },
  computed: {
    ...mapGetters(['userArea', 'userInfo']),
  },
  created () {
    this.getCityList(0)
    this.fullPath = this.$route.query.fullPath
    this.type = this.$route.query.type
    this.selected = this.$route.params && this.$route.params.selected || []
    this.viewpointText = this.$route.params && this.$route.params.viewpointText || ''
  },
  watch: {
    keywords () {
      let res = []
      if(this.keywords){
        this.cityListData.cityList.forEach(e => {
          for (let i=0,l=e.city.length; i<l; i++) {
            let item = e.city[i]
            if (item.indexOf(this.keywords) > -1) {
              if (JSON.stringify(res).indexOf(JSON.stringify({city:item,type:1}))=== -1) {
                res.push({
                  city: item,
                  type: 2
                })
              } 
            }
          }
        })
        this.searchList = res
      }
    }
  },
  methods: {
    // 查询城市列表
    async getCityList (type) {
      let res = await marketService.getCityList({type: type})
      if (res) {
        this.cityListData = res
      }
    },
    // 选择城市
    chooseItem (val) {
      userService.updateHistoryCity({
        city: val
      }).then(res => {}).catch()
      this.$router.push({path:'/discover/choosemarket', name:'chooseMarket',  params:{selected: this.selected, viewpointText: this.viewpointText}, query:{city: val, type: this.type,fullPath: this.fullPath}})
    },
  },
  directives: {
    // 指令的定义
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  mounted () {
    document.querySelector('.citylist-cnt').addEventListener('touchend', () => {
      let h = document.querySelector('.router-view').scrollTop
      if (h > 50) {
        document.querySelector('.search-box').style.position = 'fixed'
      } else {
        document.querySelector('.search-box').style.position = 'absolute'
      }
      
    })
  },
  beforeDestroy () {
  }
}
</script>

<style lang="less" scoped>
.citylist-cnt{
  font-size: 12px;
  height: 100%;
  display:flex;
  .search-box{
    padding: 8px 15px;
    height: 46px;
    line-height: 46px;
    vertical-align: middle;
    position: absolute;
    top:0;
    width: 100%;
    z-index: 9999;
    background-color: #fff;
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
          height: 16px;
          border: none;
          padding: 0 5px;
          line-height: 16px;
          background-color: transparent;
          margin-top: 7px;
        }
      }
      .cancle{
        width: 50px;
        text-align: center;
        background-color: #fff;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        color: #666;
      }
    }
    
    
  }
  .tab-box{
    margin-top: 46px;
  }
  .list-box{
    width: 100%;
    height: 100%;
    .city-box{
      .city-late{
        height: 40px;
        line-height: 40px;
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
        padding: 10px 16px 1px;
        .tips{
          font-size: 12px;
          color: #666;
        }
        .gps{
          margin-top: 5px;
          padding-bottom: 5px;
          .gps-city{
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: #fff;
            text-align: center;
            width: 100px;
            height: 32px;
            line-height: 32px;
            vertical-align: middle;
            display: inline-block;
            img{
              width: 11px;
              height: 13px;
              vertical-align: middle;
            }
          }
          .location{
            font-size: 142x;
            color: #007AE6;
            height: 32px;
            line-height: 32px;
            width: 60px;
            float: right;
            text-align: center;
            margin-right: 15px;
          }
        }
        .city-hot{
          margin-top: 10px;
          .list{
            margin-top: 5px;
            .hot-item{
              width: 100px;
              border: 1px solid #ddd;
              border-radius: 4px;
              background-color: #fff;
              text-align: center;
              width: 100px;
              height: 32px;
              line-height: 32px;
              margin: 0 16px 8px 0;
              display: inline-block;
              &:nth-child(3n+3){
                margin-right: 0;
              }
            }
          }
        }
      }
      .city-index{
      }
    }
    .province-box{}
    .keywords-box{
      margin-top: 46px;
      .nodata{
        margin-top: 120px;
        text-align: center;
        font-size: 12px;
        color: #999;
        img{
          width: 88px;
          height: 88px;
        }
      }
    }
    
  }
  
}
</style>
