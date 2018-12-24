<template>
  <div class="historicalArticles-page">
    <div class="historicalArticles-content" v-show="historyList.length != '' ">
      <div class="historicalArticles-title">
        共{{total}}文章
        <span class="historicalArticles-title-right">
          <router-link :to="{name:'updateArticles',params: {total:total }}">编辑</router-link>
        </span>
      </div>
      <discover-list :data="historyList" @click="GOheadline"></discover-list>
    </div>
    <div class="historicalArticles-null" v-show="historyList.length == '' ">
      <null-articles :nullIcon="nullIcon" :nullcontent="nullcontent"></null-articles>
    </div>
  </div>
</template>
<script>
import discoverList from 'COMP/Discover/discoverList'
import nullArticles from 'COMP/Null'
import { mapGetters } from 'vuex'
import userService from 'SERVICE/userService'
import timeUtils from '@/utils/timeUtils'

export default {
  components: {
    discoverList,
    nullArticles
  },
  data() {
    return {
      articles: '1',
      nullIcon: require('IMG/user/collection/Article@2x.png'),
      nullcontent: '暂无历史文章',
      historyList: [],
      total: 0
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.gethistoryList()
  },
  methods: {
    async gethistoryList() {
      const res = await userService.gethistoryList()

      if (res.records !== 0) {
        //  this.historyList = res.records
        for (let i = 0; i < res.records.length; i++) {
          let tempTime = timeUtils.getDateTimeBefor(res.records[i].createDate)
          res.records[i].createDate = tempTime
        }
        this.historyList = res.records
      } else {
      }
      this.total = res.total
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
  > .historicalArticles-null {
  }
}
</style>
