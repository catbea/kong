<template>
  <div class="my-write-body">
    <div class="search-body">
      <search-write @goSearch="goSearch" @getContent="getContent"></search-write>
    </div>
    <div class="list-result">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <write-article @enterDetail="enterDetail"></write-article>
      </van-list>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import searchWrite from 'COMP/Search/searchWrite'
import writeArticle from 'COMP/User/writeArticle/index'
export default {
  components: {
    searchWrite,
    writeArticle
  },
  data() {
    return {
      loading: false,
      finished: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {},
  methods: {
    goSearch(val) {},

    getContent(val) {
      console.log(val);
      
    },

    enterDetail() {
      // this.$router.push({ name: 'easyLookList', params: { id: n } })
      this.$router.push({ name: 'easyLookList' })
    },

    onLoad() {}
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
