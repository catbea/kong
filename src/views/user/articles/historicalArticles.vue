<template>
  <div class="my-write-body">
    <div class="search-body">
      <search-write @goSearch="goSearch" @getContent="getContent"></search-write>
    </div>
    <div class="list-result">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        v-if="haveData"
      >
        <write-article :dataArray="myWriteList" @enterDetail='enterDetail'></write-article>
      </van-list>
      <null :nullIcon="nullIcon" :nullcontent="nullcontent" v-if="!haveData"></null>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import searchWrite from 'COMP/Search/searchWrite'
import writeArticle from 'COMP/User/writeArticle/index'
import userService from 'SERVICE/userService'
import Null from 'COMP/Null'

export default {
  components: {
    searchWrite,
    writeArticle,
    Null
  },
  data() {
    return {
      loading: false,
      finished: false,
      current: 1,
      editContent: '', //输入框的内容
      typeCode: '0', //选中的code
      myWriteList: [], //我的写一写列表
      nullIcon: require('IMG/user/collection/Article@2x.png'),
      nullcontent: '暂还没有文章记录',
      haveData: true
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {},
  methods: {
    goSearch(val) {
      this.typeCode = val.code
    },

    getContent(val) {
      this.editContent = val
    },

    enterDetail() {
      // this.$router.push({ name: 'easyLookList', params: { id: n } })
      this.$router.push({ name: 'easyLookList' })
    },

    async onLoad() {
      const res = await userService.queryWriteArticleList(this.typeCode, this.editContent, this.current)
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
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
  }

  > .list-result {
    width: 100%;
  }
}
</style>
