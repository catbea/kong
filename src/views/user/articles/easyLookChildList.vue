<template>
  <div class="list-body">
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
        @click="enterArticleDetail"
      >
        <div class="write-item-left">
          <span class="article-title">{{item.title}}</span>
          <span class="share-time" v-if="typeCode=='2'">分享时间 {{item.createTimeStamp}}</span>
          <span class="share-time" v-if="typeCode=='3'">编辑时间 {{item.createTimeStamp}}</span>
        </div>
        <div class="write-item-right">
          <img class="article-img" :src="item.image">
        </div>
      </div>
    </van-list>
    <null :nullIcon="nullIcon" :nullcontent="nullcontent" v-if="!haveData"></null>
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
      current: 1,
      writeList: []
    }
  },

  created() {
    this.infoId = this.$route.params.infoId
    this.typeCode = this.$route.params.type
  },

  computed: {
    ...mapGetters(['userInfo'])
  },

  methods: {
    async onLoad() {
      const res = await userService.queryWriteArticleList(this.typeCode, this.current, this.infoId)
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
        if (current == 1) {
          this.haveData = false
        }
        this.loading = false
        this.finished = true
      }
    },

    enterArticleDetail() {
      this.$router.push({ name: 'discover-detail', query: { agentId: this.userInfo.agentId, enterpriseId: this.userInfo.enterpriseId }, params: { id: this.infoId, city: '全国' } })
    }
  }
}
</script>

<style lang="less">
.list-body {
  width: 100%;
  height: 100%;
  background-color: #f7f9fa;
}

.write-item-body {
  width: 100%;
  height: 122px;
  display: flex;
  padding: 11px 15px;
  justify-content: space-between;
  background: #ffffff;
  border-top: 1px #e5e5f0 solid;

  > .write-item-left {
    display: flex;
    flex-direction: column;
    padding-right: 5px;
    justify-items: center;
    margin-top: 5px;

    > .article-title {
      font-size: 16px;
      width: 208px;
      color: #333333;
    }

    > .share-time {
      font-size: 12px;
      color: #969ea8;
      margin-top: 40px;
    }

    // > .share-bottom {
    //   display: flex;
    //   flex-direction: row;
    //   margin-top: 50px;

    //   > .share-time {
    //     font-size: 12px;
    //     color: #969ea8;
    //   }

    //   > .collection-view {
    //     display: flex;

    //     > .collection-text {
    //       color: #bbbbbb;
    //       font-size: 10px;
    //       margin-left: 5px;
    //     }

    //     > .collection-img {
    //       width: 16px;
    //       height: 16px;
    //     }
    //   }
    // }
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
</style>
