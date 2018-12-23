<template>
  <div class="updateArticles-page">
    <div class="updateArticles-content">
      <div class="updateArticles-title">
        共{{total}}文章
        <span class="updateArticles-title-right" @click="gohistory">完成</span>
      </div>
      <!-- <discover-list></discover-list> -->
      <van-list v-model="loading" :finished="finished" :finished-text="'没有更多了'" @load="onLoad">
        <!-- <checkbox-group v-model="result"> -->
          <!-- v-for="(item, index) in list" :key="index" :name="item" -->
          <checkbox v-model="item.isCheck" v-for="(item, index) in list" :key="index" :name="item.id">
            <div
              class="updateArticles-list"
              :id="item.id"
              @click="getArticleId(item)"
            >
              <span class="updateArticles-list-left">
                <p class="list-left-title">{{item.title}}</p>
                <p
                  class="list-left-time"
                >{{item.publisher}}&nbsp;&nbsp;{{item.createDate}}&nbsp;&nbsp;{{item.scanNum}}浏览</p>
              </span>
              <span class="updateArticles-list-right">
                <img :src="item.image" class="mark-icon">
              </span>
            </div>
          </checkbox>
        <!-- </checkbox-group> -->
      </van-list>
      <div class="updateArticles-fixed-btn">
        <div class="fixed-btn-check" @click="toSelectAll">
          <checkbox v-model="checked"></checkbox>
          <span class="fixed-btn-title">{{this.selectName}}</span>
        </div>
        <div class="fixed-btn" @click="deleArticles">删除</div>
      </div>
    </div>
  </div>
</template>
<script>
import nullArticles from 'COMP/Null'
import { Checkbox, CheckboxGroup } from 'vant'
import { SubmitBar } from 'vant'
import userService from 'SERVICE/userService'
import timeUtils from '@/utils/timeUtils'
export default {
  components: {
    Checkbox,
    CheckboxGroup,
    nullArticles,
    SubmitBar
  },
  data() {
    return {
      // backIcon: require('IMG/user/usercard@2x.png'),
      // list: ['a', 'b', 'c'],
      list: [],
      articleTotal: '',
      result: [],
      selectArr: [], //选择的id数组集合
      selectStr: '', //选择的id拼接字符串
      selectAll: false,
      selectName: '全选',
      checked: false,
      loading: false,
      finished: false,
      current: 1,
      total: 0
    }
  },
  created() {
    // this.getHistoryList(this.current)
    this.total = this.$route.params.total
  },
  methods: {
    //获取文章列表
    async getHistoryList(current) {
      this.isLoading == true
      const res = await userService.getBrowseHistoryList(current)

      let dataList = res.records
      this.total = res.total

      if (dataList.length > 0) {
        for (let i = 0; i < dataList.length; i++) {
          dataList[i].isCheck = false
        }
        this.list = this.list.concat(res.records)
        if (res.pages === 0 || this.page === res.pages) {
          this.finished = true
        }
        this.current++
        this.loading = false
      } else {
        this.loading = false
        this.finished = true
      }
    },

    //勾选获取文章id
    getArticleId(artcle) {
      artcle.isCheck = !artcle.isCheck
      for(let item of this.selectArr) {
        if(item.id == artcle.id) {
          this.selectArr = this.selectArr.filter(obj => {
            this.selectName = '全选'
            this.checked = false
            return obj != item 
          })
          return
        }
      }
      this.selectArr.push(artcle)
    },

    //删除操作
    async toDeleArticle() {
      console.log(this.selectArr)

      if (this.selectArr.length > 0) {
        let isCheckedArr = []
        for(let item of this.selectArr){
          isCheckedArr.push(item.id)
        }
        console.log(isCheckedArr.join())
        // const res = await userService.deleHistoryArticle(isCheckedArr.join())
        // this.selectName = '全选'
        // this.checked = false
        // this.list = []
        // this.selectArr = []
        // this.getHistoryList(1)
      } else {
        this.$toast('请先选择要删除的文章')
      }
    },

    //删除文章
    isExistElement(arr, value) {
      if (arr.indexOf && typeof arr.indexOf == 'function') {
        var index = arr.indexOf(value)
        if (index >= 0) {
          return true
        }
      }
      return false
    },

    //全选按钮
    toSelectAll() {
      let temp = ''
      let tempList = this.list
      this.selectAll = !this.selectAll

      if (this.selectAll) {
        this.selectArr = this.list
        this.selectName = '取消全选'
        this.checked = true
        for(let item of this.list){
          item.isCheck = true
          this.result.push(item.id)
        }
      }else {
        this.selectName = '全选'
        this.checked = false
        this.selectArr = []
        this.result = []
        for(let item of this.list){
          item.isCheck = false
        }
      }

      // if (this.selectAll) {
      //   this.selectArr = []
      //   this.selectArr = this.list
      //   for (let i = 0; i < tempList.length; i++) {
      //     // this.selectArr.push(tempList)
      //     tempList[i].isCheck = true
      //     this.result.push(tempList[i].id)
      //     this.selectName = '取消全选'
      //     this.checked = true
      //   }
      // } else {
      //   this.selectArr = []
      //   for (let i = 0; i < tempList.length; i++) {
      //     tempList[i].isCheck = false
      //     this.result = []
      //     this.selectName = '全选'
      //     this.list = []
      //     this.checked = false
      //   }
      //   this.list = tempList
      //   this.selectStr = ''
      // }
    },

    //删除文章
    deleArticles() {
      this.toDeleArticle()
    },

    //加载更多
    async onLoad() {
      let tempCurrent = this.current
      const res = await userService.getBrowseHistoryList(tempCurrent)
      let dataList = res.records

      if (dataList.length !== 0) {
        for (let i = 0; i < dataList.length; i++) {
          let tempTime = timeUtils.getDateTimeBefor(dataList[i].createDate)
          dataList[i].createDate = tempTime
          dataList[i].isCheck = false
        }
        this.list = this.list.concat(dataList)

        this.current = tempCurrent + 1
        this.loading = false
      } else {
        this.finished = true
      }

      if (res.pages == 0 || this.current > res.pages) {
        this.finished = true
      }
    },
    gohistory() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less">
.van-checkbox__icon--checked .van-icon {
  color: #fff;
  border-color: #ea4d2e;
  background-color: #ea4d2e;
}
// .van-checkbox{
//       margin-bottom: 16px;
// }
.van-checkbox__label {
  margin-left: 0.26667rem;
  width: 100%;
}
.van-icon-success {
  position: absolute;
  display: inline-block;
  font: normal normal normal 0.37333rem/1 vant-icon;
  font-size: inherit;
  text-rendering: auto;
  margin-left: 16px;
  margin-top: 50px;
}
.van-checkbox__icon,
.van-checkbox__label {
  display: list-item;
  vertical-align: -webkit-baseline-middle;
  line-height: 0.53333rem;
}
.updateArticles-page {
  background: #ffffff;
  > .updateArticles-content {
    margin-bottom: 80px;
    > .updateArticles-fixed-btn {
      height: 60px;
      // display: flex;
      position: fixed;
      bottom: 0;
      border-top: 1px solid #e6e6e6;
      background: #ffffff;
      width: 100%;
      > .fixed-btn-check {
        margin-top: -30px;
        > .fixed-btn-title {
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 40px;
          margin-left: 45px;
          position: absolute;
          margin-top: 20px;
        }
      }
      > .fixed-btn {
        width: 72px;
        height: 30px;
        border-radius: 22px;
        border: 1px solid;
        font-size: 14px;
        font-weight: 400;
        color: rgba(234, 77, 46, 1);
        float: right;
        margin-right: 16px;
        margin-top: 15px;
        text-align: center;
        line-height: 30px;
      }
    }
    > .updateArticles-title {
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 16px;
      margin: 17px 16px;

      > .updateArticles-title-right {
        font-size: 13px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 16px;
        float: right;
      }
    }
    .updateArticles-list {
      margin: 0 25px 0 10px;
      display: flex;
      border-bottom: 1px solid #e6e6e6;
      padding: 0 0 16px 0;
      > .updateArticles-list-left {
        height: 90px;
        position: relative;
        margin-left: 31px;
        > .list-left-title {
          font-size: 16px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 24px;
          margin-right: 60px;
          padding-right: 70px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        > .list-left-time {
          font-size: 12px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          position: absolute;
          bottom: 0;
        }
      }
      > .updateArticles-list-right {
        width: 120px;
        height: 90px;
        border-radius: 6px;
        position: absolute;
        margin-right: 0;
        padding-right: 0;
        right: 16px;
        > .mark-icon {
          width: 120px;
          height: 90px;
          background: rgba(255, 255, 255, 1);
          border-radius: 6px;
        }
      }
    }
  }
}
</style>
