<template>
  <div class="historicalArticles-page">
    <van-tabs
      v-model="activeIndex"
      color="#007AE6"
      :line-width="15"
      :swipe-threshold="6"
      @change="tabsChange"
      sticky
      animated
    >
      <van-tab :title="tabs[0].typeName">
        <keep-alive>
          <van-list
            v-model="loading"
            v-if="0 === activeIndex"
            :finished="tabs[0].finished"
            :finished-text="'没有更多了'"
            @load="onLoad"
          >
            <articles-list v-for="(item,index) in tabs[0].list" :key="index" :data="tabs[0].list"></articles-list>
          </van-list>
        </keep-alive>
      </van-tab>
      <van-tab :title="tabs[1].typeName">
        <keep-alive>
          <van-list
            v-model="loading"
            v-if="1 === activeIndex"
            :finished="tabs[1].finished"
            :finished-text="'没有更多了'"
            @load="onLoad"
          >
            <articles-list v-for="(item,index) in tabs[1].list" :key="index" :data="tabs[1].list"></articles-list>
          </van-list>
        </keep-alive>
      </van-tab>
      <van-tab :title="tabs[2].typeName">
        <keep-alive>
          <van-list
            v-model="loading"
            v-if="2 === activeIndex"
            :finished="tabs[2].finished"
            :finished-text="'没有更多了'"
            @load="onLoad"
          >
            <collection-article :data="tabs[2].list"></collection-article>
          </van-list>
        </keep-alive>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import articlesList from 'COMP/User/collection/articlesList'
import collectionArticle from 'COMP/User/collection/collectionArticle'
import nullArticles from 'COMP/Null'
import { mapGetters } from 'vuex'
import userService from 'SERVICE/userService'
import timeUtils from '@/utils/timeUtils'

export default {
  components: {
    articlesList,
    nullArticles,
    collectionArticle
  },
  data() {
    return {
      activeIndex: 0,
      tabs: [],
      loading: false,
      editAndShare: true
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    document.querySelector('.router-view').addEventListener('scroll', this.scrollHandler)
  },

  created() {
    this.initTabs()
  },
  methods: {
    // 获取当前玄宗tab的typeid
    getCurrentType() {
      for (let temp of this.tabs) {
        if (temp.index === this.activeIndex) return temp
      }
    },
    loadTabs(tabs) {
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].index = i
        tabs[i].page = 1
        tabs[i].finished = false
        tabs[i].list = []
        tabs[i].offsetHeight = 0
        this.tabs.push(tabs[i])
      }
    },
    initTabs() {
      let tabs = [{ typeName: '历史编辑', type: '0' }, { typeName: '历史分享', type: '1' }, { typeName: '收藏写一写', type: '2' }]
      this.loadTabs(tabs)
    },
    scrollHandler(e) {
      let current = this.getCurrentType()
      current.offsetHeight = e.target.scrollTop
    },
    tabsChange(e) {
      let current = this.getCurrentType()
      console.log(current.index)
      document.querySelector('.router-view').scrollTop = current.offsetHeight
    },

    async onLoad() {
      let current = this.getCurrentType()
      console.log(current)
      if (current.type == '0') {
        const result = await userService.gethistoryList('0', current.page)
        if (result.records.length > 0) {
          current.list = current.list.concat(result.records)
          if (current.page == result.page) {
            current.finished = true
          }
          current.page++
        } else {
          current.finished = true
        }
        this.loading = false
      } else if (current.type == '1') {
        const result = await userService.gethistoryList('1', current.page)
        if (result.records.length > 0) {
          current.list = current.list.concat(result.records)
          if (current.page == result.page) {
            current.finished = true
          }
          current.page++
        } else {
          current.finished = true
        }
        this.loading = false
      } else {
        const res = await userService.getqueryInfoList()
        if (res.list.records > 0) {
          current.list = current.list.concat(res.list.records)
          if (current.page == res.page) {
            current.finished = true
          }
          current.page++
        } else {
          current.finished = true
        }
        this.loading = false
      }
    },
    GOheadline(discover) {
      //跳转到房产头条
      // this.$router.push({ name: 'discover-detail', params: { id: discover.id, city: discover.city } })
      this.$router.push(`/discover/${discover.id}/${discover.city ? discover.city : '全国'}?agentId=${this.userInfo.agentId}&enterpriseId=${this.userInfo.enterpriseId}`)
    }
  }
}
</script>
<style lang="less">
.historicalArticles-page {
  background: #ffffff;
  > .historicalArticles-content {
    > .historicalArticles-title {
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 16px;
      margin: 17px 16px 0 16px;

      > .historicalArticles-title-right {
        font-size: 13px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 16px;
        float: right;
      }
    }
  }
}
</style>
