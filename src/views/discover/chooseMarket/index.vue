<template>
  <div class="choose-market">
    <div class="search-box">
      <div class="search-area" @click="goCity">
        <span>{{city}}</span><img src="../../../assets/img/market/list__arrow_@2x.png" alt="">
      </div>
      <div class="search-keyword">
        <img src="../../../assets/img/market/Group 3@2x.png" class="search-icon">
        <input type="search" :placeholder="placeholder" @input="changeKeyword" v-model.trim="keyword" @blur="blur">
      </div>
    </div>
    <div class="search-filter">
      <screen v-model.trim="projectFilters" :local="this.city"/>
    </div>
    <div class="history-house-box" v-if="historyHouse.length && showHistory">
      <h3 class="title"><span class="name">历史楼盘</span><span class="clear" @click="clearHistory">清除</span></h3>
      <div class="item" v-for="(item,index) in historyHouse" :key="index" v-show='index < historyCount'>
        <van-swipe-cell :right-width="80" :on-close="onClose">          
          <van-cell-group>
            <discover-item2 :data="item" @click.native="selectHandle(item)"/>
          </van-cell-group>
          <span slot="right" class="delete-btn"  @click="deleteItem(item)">删除</span>
        </van-swipe-cell>  
      </div>
      <p class="more" v-if="historyHouse.length > 3 && showHistoryMore && historyCount != historyHouse.length" @click="showMore">更多历史楼盘</p>
      <p class="more" v-if="historyCount == historyHouse.length && !showHistoryMore && historyHouse.length > 3" @click="hideHistory">收起历史楼盘</p>
    </div>
    <div class="house-box" v-if="city">
      <h3 class="title" v-if="historyHouse.length && showHistory && projectList.length">其他楼盘</h3>
      <van-list v-model="loading" :finished="finished" :finished-text="'没有更多了'" @load="getLinkerList">
        <discover-item2 v-for="(item,index) in projectList" v-model="item.isChecked" :data="item" :showRules="false" :disabled="item.disabled" :key="index" @click.native="selectHandle(item)"/>
      </van-list>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Search from 'COMP/Search/'
import Screen from 'COMP/Screen/'
import userService from 'SERVICE/userService'
import screenFilterHelper from '@/utils/screenFilterHelper'
import DiscoverItem2 from 'COMP/DiscoverItem2/'
export default { 
  components: {
    Search,
    Screen,
    DiscoverItem2
  },
  data() {
    return {
      selected: [], //已选择楼盘
      city: '',
      keyword: '',
      placeholder: '请输入楼盘名称',
      projectFilters: {},
      loading: false,
      finished: false,
      page: 1,
      pageSize: 10,
      projectList: [],
      fullPath: '',
      type: '',
      historyHouse: [],
      historyCount: 3,
      showHistoryMore: false,
      showHistory: true,
      viewpointText: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'userArea']),
    selectedIdArr() {
      let result = []
      if (this.selected.length) {
        this.selected.forEach(item => {
           result.push(item.linkerId)
        })
      } 
      return result
    }
  },
  created () {
    this.fullPath = this.$route.query.fullPath
    this.type = this.$route.query.type
    this.selected = this.$route.params && this.$route.params.selected || []
    this.viewpointText = this.$route.params && this.$route.params.viewpointText || ''
    this.getHistoryLinker()
    if (!this.$route.query.city) {
      this.getHistoryCity()
    } else {
      this.city =  this.$route.query.city
    }
  },
  methods: {
    // 获取历史城市
    getHistoryCity () {
      userService.getHistoryCity({}).then(res => {
        if (res) {
          this.city = res
        } else {
          this.city =  this.$route.query.city || this.userArea.vipSelectedCity || this.userInfo.majorCity || '深圳市'
        }
      }).catch()
    },
    // 获取历史楼盘列表
    getHistoryLinker () {
      userService.getHistoryLinker({}).then(res => {
        if (res.length) {
          let _list = []
          res.forEach(item => {
              let obj = {
                linkerId: item.linkerId,
                linkerUrl: item.linkerUrl,
                sale: item.sale,
                promotionalLanguage: item.promotionalLanguage,
                linkerName: item.linkerName,
                site: `${item.city ? item.city : ''} ${item.district ? item.district : ''}`, //'深圳 南山 120000元/㎡',
                condition: item.linkerTags,
                open: `${item.openTimes}次开通`,
                saleStatus: item.saleStatus,
                disabled: false,
                divisionRules: item.divisionRules,
                price: ` ${item.price ? item.price : '价格待定'} ${item.priceUnit&&item.price ? item.priceUnit : ''}`,
                buildArea: item.minArea !== '' && item.maxArea !== '' ? `${item.minArea}-${item.maxArea}㎡` : '',
                isFree: item.isFree || 0,
                cpActivityVo: item.cpActivityVo
              }
              _list.push(obj)
          })
          this.historyHouse = _list
          this.showHistoryMore = this.historyHouse.length > 3
        }
      }).catch()
    },
    // 删除某个历史楼盘
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
           this.$dialog.confirm({
              title: '删除提示',
              message: '是否确认删除该历史楼盘？',
              className: 'delete-dialog'
          }).then(() => {
            this.deletehistory()
            instance.close()
          }).catch(() => {
            instance.close()
          })
          break
      }
    },
    deleteItem (item) {
      this.currentDel = item
    },
    deletehistory () {
      userService.clearHistoryOne({linkerId: this.currentDel.linkerId}).then(res => {
        let index = this.historyHouse.indexOf(this.currentDel)
        this.historyHouse.splice(index, 1)
        this.$toast('删除成功')
      }).catch()
      
    },
    // 清除历史楼盘
    clearHistory () {
      this.$dialog.confirm({
        title: '删除提醒',
        message: '是否确认清空历史楼盘？'
      }).then(() => {
        this.clearHistoryAll()
      }).catch()
    },
    clearHistoryAll () {
      userService.clearHistoryAll({}).then(res => {
        this.historyHouse = []
      }).catch()
    },
    // 显示更多历史城市
    showMore () {
      this.showHistoryMore = false
      this.historyCount = this.historyHouse.length
    },
    // 隐藏更多楼盘
    hideHistory () {
      this.showHistoryMore = true
      this.historyCount = 3
    },
    // 跳转城市选择
    goCity () {
      this.$router.push({path: '/discover/chooseCity', name: 'chooseCity', params:{selected: this.selected, viewpointText: this.viewpointText}, query:{type: this.type, fullPath: this.fullPath}})  
    },
    // 改变搜索关键词
    changeKeyword () {
      this.finished = false
      this.page = 1
      this.projectName = name.trim()
      this.projectList = []
      this.getLinkerList()
      this.showHistory = false
    },
    // 搜索楼盘
    getLinkerList() {
      let mergeFilters = this.projectFilters.baseFilters ? Object.assign(this.projectFilters.baseFilters, this.projectFilters.moreFilters) : {}
      let param = screenFilterHelper(this.keyword, mergeFilters)
      param = Object.assign({}, param, { current: this.page, size: this.pageSize, city: this.city})
      userService.getMyHouses(param).then(res => {
        let _list = []
        res.records.forEach(item => {
          if (this.selectedIdArr.indexOf(item.linkerId) === -1) {
            let obj = {
              linkerId: item.linkerId,
              linkerUrl: item.linkerUrl,
              sale: item.sale,
              promotionalLanguage: item.promotionalLanguage,
              linkerName: item.linkerName,
              site: `${item.city ? item.city : ''} ${item.district ? item.district : ''} ${item.price ? item.price : '价格待定'} ${item.priceUnit&&item.price ? item.priceUnit : ''}`, //'深圳 南山 120000元/㎡',
              condition: item.linkerTags,
              open: `${item.openTimes}次开通`,
              saleStatus: item.saleStatus,
              disabled: false,
              divisionRules: item.divisionRules,
              price: `${item.price} ${item.priceUnit}`,
              buildArea: item.minArea !== '' && item.maxArea !== '' ? `${item.minArea}-${item.maxArea}㎡` : '',
              isFree: item.isFree || 0,
              cpActivityVo: item.cpActivityVo
            }
            _list.push(obj)
          }
          
        })
        this.projectList = this.page <= 1 ? _list : this.projectList.concat(_list)
        if (res.pages === 1 || this.page >= res.pages) {
          this.finished = true
        }else {
          this.page++
        }
        this.loading = false
      }).catch()
    },
    // 点击楼盘
    selectHandle(item) {
      console.log("item",item);
      // this.$emit('submit', item)
      let type = this.type
      if (type === 'multiHouse') {
        this.selected.push(item)
        window.sessionStorage.setItem(type,JSON.stringify(this.selected))
      } else {
        window.sessionStorage.setItem(type,JSON.stringify(item))
      }
      window.sessionStorage.setItem('viewpointText', this.viewpointText)
      this.$router.replace({path:this.fullPath})
    },
    // 键盘遮挡
    blur(){
      setTimeout(() => {
        document.activeElement.scrollIntoViewIfNeeded(true)
      },10)
    },
  },
  watch: {
    projectFilters: {
      handler(val) {
        this.changeKeyword()
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
.choose-market{
  position: relative !important;
  height: 100%;
  font-size: 14px;
  padding: 10px 16px;
  .search-box{
    width: 100%;
    height: 35px;
    line-height: 35px;
    border-radius: 4px;
    background-color: #f5f5f5;
    display: flex;
    vertical-align: middle;
    .search-area{
      width: 80px;
      text-align: center;
      font-size: 12px;
      span{
        display: inline-block;
        line-height: 35px;
        vertical-align: top;
        color: #666;
      }
      img{
        width: 16px;
        height: 16px;
        vertical-align: middle;
      }
    }
    .search-keyword{
      font-size: 12px;
      flex: 1;
      line-height: 35px;
      vertical-align: middle;
      img{
        width: 24px;
        height: 24px;
        vertical-align: middle;
        margin-top: -3px;
      }
      input{
        border: none;
        background-color: #f5f5f5;
        width: 90%;
      }
    }
  }
  .history-house-box{
    .title{
      margin: 5px 0 20px;
      color: #999;
      font-size: 14px;
      display: flex;
      .name{
        flex: 1
      }
      .clear{
        width: 80px;
        text-align: right;
      }
    }
    .more{
      margin: 16px 0;
      height:44px;
      background:rgba(242,248,254,1);
      border-radius:6px;
      color: #445166;
      font-size:16px;
      font-weight: 400px;
      line-height: 44px;
      text-align: center;
    }
  }
  .house-box{
    .title{
      margin: 20px 0 10px 0;
      color: #999;
      font-size: 14px;
    }
  }
  .delete-btn{
    display: block;
    height: 120px;
    width: 80px;
    line-height: 120px;
    color: #fff;
    font-size: 16px;
    background-color: #EA4D2E;
    text-align: center;
  }
}
</style>
