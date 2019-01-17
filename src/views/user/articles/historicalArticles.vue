<template>
  <!-- 1-收藏，2-分享，3-编辑 -->
  <div class="my-write-body">
    <div class="search-body">
      <select-tab
        @clickShare="clickShare"
        @clickEdit="clickEdit"
        @clickCollection="clickCollection"
        :toSelectTap="typeCode"
      ></select-tab>
    </div>
    <div class="list-result" v-if="typeCode=='1'">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        v-if="haveData"
      >
        <write-article
          :selectType="typeCode"
          :dataArray="myWriteList"
          @cancelCollect="cancelCollect"
          @enterDetail="collectionDetail"
        ></write-article>
      </van-list>
      <null :nullIcon="nullIcon" :nullcontent="nullcontent" v-if="!haveData"></null>
    </div>
    <div class="list-result" v-if="typeCode=='2'">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        v-if="haveData"
      >
        <write-article :selectType="typeCode" :dataArray="myWriteList" @enterDetail="enterDetail"></write-article>
      </van-list>
      <null :nullIcon="nullIcon" :nullcontent="nullcontent" v-if="!haveData"></null>
    </div>
    <div class="list-result" v-if="typeCode=='3'">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        v-if="haveData"
      >
        <write-article :selectType="typeCode" :dataArray="myWriteList" @enterDetail="enterDetail"></write-article>
      </van-list>
      <null :nullIcon="nullIcon" :nullcontent="nullcontent" v-if="!haveData"></null>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import searchWrite from 'COMP/Search/searchWrite'
import writeArticle from 'COMP/User/writeArticle/index'
import selectTab from 'COMP/User/writeArticle/selectTab'
import userService from 'SERVICE/userService'
import Null from 'COMP/Null'

export default {
  components: {
    // searchWrite,
    writeArticle,
    Null,
    selectTab,
  },
  data() {
    return {
      loading: false,
      finished: false,
      current: 1,
      typeCode: '2', //选中的code
      myWriteList: [], //我的写一写列表
      nullIcon: require('IMG/user/collection/Article@2x.png'),
      nullcontent: '暂还没有文章记录',
      haveData: true
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.typeCode = this.$route.query.typeCode

    if (this.typeCode == '3') {
      this.clickEdit('3')
    }
  },
  methods: {
    clickShare(val) {
      this.typeCode = val
      this.current = 1
      this.myWriteList = []
      false
      this.onLoad()
    },

    clickEdit(val) {
      this.typeCode = val
      this.current = 1
      this.myWriteList = []
      false, this.onLoad()
    },

    clickCollection(val) {
      this.typeCode = val
      this.current = 1
      this.myWriteList = []
      false, this.onLoad()
    },

    cancelCollect(val) {
      this.$dialog
        .confirm({
          title: '取消收藏',
          message: '是否取消文章收藏'
        })
        .then(() => {
          // on close
          this.cancelClooection(val)
        })
        .catch(() => {
          // on cancel
        })
    },

    async cancelClooection(info) {
      let id = info.id
      let index = info.index

      const result = await userService.getlinkerCollection(id, 1)
      let dataArray = this.myWriteList

      dataArray.splice(index, 1)
      if (result) {
        this.$toast('取消收藏成功')
      }
    },

    getContent(val) {
      this.editContent = val
    },

    enterDetail(val) {
      // this.$router.push({ name: 'analysis'})
      this.$router.push({ name: 'easyLookChildList', query: val })
    },

    collectionDetail(val) {
      this.$router.push({ name: 'discover-detail', query: { agentId: this.userInfo.agentId, enterpriseId: this.userInfo.enterpriseId }, params: { id: val.id, city: '全国' } })
    },

    getCurrentType() {
      for (let temp of this.tabs) {
        if (temp.index === this.activeIndex) return temp
      }
    },

    async onLoad() {
      //获取选中的位置
      let selectType = this.typeCode
      const res = await userService.queryWriteArticleList(selectType, this.current, '')
      if (res.records.length > 0) {
        this.haveData = true

        this.myWriteList = this.myWriteList.concat(res.records)
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
    }
  }
}
</script>
<style lang="less">
.my-write-body {
  width: 100%;
  height: 100%;
  background-color: #f7f9fa;
  > .search-body {
    width: 100%;
    background: #ffffff;
    height: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
  }

  > .list-result {
    width: 100%;
    margin-top: 1px;
    
  }
}
</style>
