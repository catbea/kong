<template>
  <div class="list-body">
    <div class="write-item-body" @click="enterDetail(itemInfo.id)">
      <div class="write-item-left">
        <span class="article-title">{{itemInfo.title}}</span>
        <div class="label-view">
          <span class="label-text">原文章</span>
        </div>
        <span
          class="time-view"
          v-if="itemInfo.selectType=='2'"
        >分享时间 {{itemInfo.createTimeStamp | dateTimeFormatter(3,'/')}}</span>
        <span
          class="time-view"
          v-if="itemInfo.selectType=='3'"
        >编辑时间 {{itemInfo.createTimeStamp | dateTimeFormatter(3,'/')}}</span>
      </div>
      <div class="write-item-right">
        <img class="article-img" :src="itemInfo.image">
      </div>
    </div>
    <span class="totalNum" v-if="itemInfo.selectType=='2'">总计{{total}}条分享记录</span>
    <span class="totalNum" v-if="itemInfo.selectType=='3'">总计{{total}}条编辑记录</span>
    <div class="list-item-view">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        v-if="haveData"
      >
        <div
          class="write-item-body"
          v-for="(item,index) in this.writeList"
          :key="index"
          @click="enterArticleDetail(item.id)"
        >
          <div class="write-item-left">
            <span class="article-title">{{item.title}}</span>
            <span class="time-view" v-if="itemInfo.selectType=='2'">分享时间 {{item.createTimeStamp}}</span>
            <span class="time-view" v-if="itemInfo.selectType=='3'">编辑时间 {{item.createTimeStamp}}</span>
          </div>
          <div class="write-item-right">
            <img class="article-img" :src="item.image">
          </div>
        </div>
      </van-list>
    </div>
    <!-- <null :nullIcon="nullIcon" :nullcontent="nullcontent" v-if="!haveData"></null> -->
  </div>
</template>
<script>
import writeArticle from 'COMP/User/writeArticle/index'
import Null from 'COMP/Null'
import userService from 'SERVICE/userService'
import timeUtils from '@/utils/timeUtils'
import { mapGetters } from 'vuex'

export default {
  components: {
    writeArticle,
    Null
  },

  data() {
    return {
      loading: false,
      finished: false,
      haveData: true,
      nullIcon: require('IMG/user/collection/Article@2x.png'),
      nullcontent: '暂还没有文章记录',
      infoId: '',
      typeCode: '',
      itemInfo: '',
      current: 1,
      writeList: [],
      total: ''
    }
  },

  mounted() {
    this.itemInfo = this.$route.query

    if (this.itemInfo.selectType == '2') {
      this.typeCode = '4'
    } else if (this.itemInfo.selectType == '3') {
      this.typeCode = '5'
    }
  },

  created() {},

  computed: {
    ...mapGetters(['userInfo'])
  },

  methods: {
    async onLoad() {
      const res = await userService.queryWriteArticleList(this.typeCode, this.current, this.infoId)
      this.total = res.total

      if (this.current === 1) {
        this.writeList = []
      }

      if (res.records.length > 0) {
        for (let i = 0; i < res.records.length; i++) {
          let myTime = timeUtils.fmtDate(res.records[i].createTimeStamp)
          res.records[i].createTimeStamp = myTime
        }
        this.writeList = this.writeList.concat(res.records)

        if (res.pages === 0 || this.current === res.pages) {
          this.finished = true
        }
        this.current++
        this.loading = false
      } else {
        if (this.current == 1) {
          this.haveData = false
        }
        this.loading = false
        this.finished = true
      }
    },

    enterDetail(val) {
      this.$router.push({ name: 'discover-detail', query: { agentId: this.userInfo.agentId, enterpriseId: this.userInfo.enterpriseId }, params: { id: val, city: '全国' } })
    },

    enterArticleDetail(val) {
      this.$router.push({ name: 'discover-detail', query: { agentId: this.userInfo.agentId, enterpriseId: this.userInfo.enterpriseId }, params: { id: val, city: '全国' } })
    }
  }
}
</script>

<style lang="less">
.list-body {
  width: 100%;
  height: 100%;
  background-color: #f7f9fa;

  .write-item-body {
    width: 100%;
    height: 122px;
    display: flex;
    padding: 11px 15px;
    justify-content: space-between;
    background: #ffffff;
    border-top: 1px #e5e5f0 solid;

    > .write-item-left {
      padding-right: 5px;
      margin-top: 5px;
      position: relative;

      > .article-title {
        font-size: 16px;
        width: 208px;
        color: #333333;
      }

      > .label-view {
        width: 40px;
        height: 15px;
        background: rgba(0, 122, 230, 1);
        border-radius: 2px;
        color: #ffffff;
        font-size: 5px;
        margin-top: 8px;
        display: flex;
        justify-content: center;
        align-items: center;

        > .label-text {
          font-size: 10px;
          color: #ffffff;
        }
      }

      > .time-view {
        position: absolute;
        color: #445166;
        font-size: 12px;
        bottom: 0px;
      }
    }

    > .write-item-right {
      margin-top: 5px;
      width: 120px;
      height: 90px;

      > .article-img {
        width: 120px;
        height: 90px;
        border-radius: 6px;
      }
    }
  }

  .totalNum {
    color: #969ea8;
    font-size: 14px;
    margin-top: 15px;
    margin-left: 17px;
  }

  .list-item-view {
    margin-top: 5px;
  }
}

// .write-item-body {
//   width: 100%;
//   height: 122px;
//   display: flex;
//   padding: 11px 15px;
//   justify-content: space-between;
//   background: #ffffff;
//   border-top: 1px #e5e5f0 solid;

//   > .write-item-left {
//     display: flex;
//     flex-direction: column;
//     padding-right: 5px;
//     justify-items: center;
//     margin-top: 5px;

//     > .article-title {
//       font-size: 16px;
//       width: 208px;
//       color: #333333;
//     }

//     > .share-time {
//       font-size: 12px;
//       color: #969ea8;
//       margin-top: 40px;
//     }

//     // > .share-bottom {
//     //   display: flex;
//     //   flex-direction: row;
//     //   margin-top: 50px;

//     //   > .share-time {
//     //     font-size: 12px;
//     //     color: #969ea8;
//     //   }

//     //   > .collection-view {
//     //     display: flex;

//     //     > .collection-text {
//     //       color: #bbbbbb;
//     //       font-size: 10px;
//     //       margin-left: 5px;
//     //     }

//     //     > .collection-img {
//     //       width: 16px;
//     //       height: 16px;
//     //     }
//     //   }
//     // }
//   }

//   > .write-item-right {
//     margin-top: 5px;
//     width: 120px;
//     height: 90px;

//     > .article-img {
//       width: 120px;
//       height: 90px;
//       border-radius: 6px;
//     }
//   }
// }
</style>
