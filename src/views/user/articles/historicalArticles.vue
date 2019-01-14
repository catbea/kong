<template>
  <div class="my-write-body">
    <div class="search-body">
      <select-tab
        @clickShare="clickShare"
        @clickEdit="clickEdit"
        @clickCollection="clickCollection"
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
        <write-article></write-article>
      </van-list>
    </div>
    <div class="list-result" v-if="typeCode=='2'">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        v-if="haveData"
      >
        <div>22222222</div>
      </van-list>
    </div>
    <div class="list-result" v-if="typeCode=='3'">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        v-if="haveData"
      >
        <div>3333333</div>
      </van-list>
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
    selectTab
  },
  data() {
    return {
      loading: false,
      finished: false,
      current: 1,
      typeCode: '1', //选中的code
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
    clickShare(val) {
      this.typeCode = val
    },

    clickEdit(val) {
      this.typeCode = val
    },

    clickCollection(val) {
      this.typeCode = val
    },

    getContent(val) {
      this.editContent = val
    },

    enterDetail() {
      // this.$router.push({ name: 'easyLookList', params: { id: n } })
      this.$router.push({ name: 'easyLookList' })
    },

    async onLoad() {}

    // async onLoad() {
    //   const res = await userService.queryWriteArticleList(this.typeCode, this.current)
    //   if (res.records.length > 0) {
    //     this.haveData = true
    //     this.myWriteList = this.myWriteList.concat(res.records)
    //     if (res.pages === 0 || this.current === res.pages) {
    //       this.finished = true
    //     }
    //     this.current++
    //     this.loading = false
    //   } else {
    //     if (this.current == 1) {
    //       this.haveData = false
    //     }
    //     this.loading = false
    //     this.finished = true
    //   }
    // }
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
    border-top: 1px #E5E5F0 solid;
  }
}
</style>
