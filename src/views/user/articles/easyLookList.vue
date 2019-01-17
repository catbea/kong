<template>
  <div class="easy-look-body">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-if="haveData"
    >
      <div
        class="easy-look-list"
        v-for="(index,item) in this.likeArray"
        :key="index"
        @click="articleDetail(item.id)"
      >
        <div class="easy-look-time">
          <span class="time-text">1月9日</span>
        </div>
        <div class="easy-look-item">
          <div class="easy-look-left">
            <img class="easy-look-img" :src="myImage">
          </div>
          <div class="easy-look-right">
            <span class="easy-look-title">厦门今年第二批9000套保障性商品房上午摇号</span>
            <div class="easy-look-bottom">
              <span class="easy-look-text">12好看</span>
              <span class="easy-look-comment">12好看</span>
            </div>
          </div>
        </div>
      </div>
    </van-list>
    <null :nullIcon="nullIcon" :nullcontent="nullcontent" v-if="!haveData"></null>
  </div>
</template>
<script>
import articleService from 'SERVICE/articleService'
import { mapGetters } from 'vuex'
import Null from 'COMP/Null'
export default {
  data() {
    return {
      myImage: 'http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg',
      current: 1,
      clientId: '',
      userType: '',
      likeArray: [],
      finished: false,
      loading: false,
      haveData: true,
      nullIcon: require('IMG/user/no_report.png'),
      nullcontent: '暂还信息记录'
    }
  },
  components: {
    Null
  },

  computed: {
    ...mapGetters(['userInfo'])
  },

  mounted() {
    let clientId = this.$route.query.clientId
    this.userType = this.$route.query.userType

    if (clientId) {
      this.clientId = ''
    } else {
      this.clientId = clientId
    }
  },

  methods: {
    async getLikeList(current, clientId, userType) {
      const result = await articleService.queryLikeArticleList(current, clientId, userType)

      if (result.records.length > 0) {
        this.likeArray = this.likeArray.concat(result.records)

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

    onLoad() {
      this.getLikeList(this.current, this.clientId, this.userType)
    },

    //进入文章详情
    articleDetail(id) {
      this.$router.push({ name: 'discover-detail', query: { agentId: this.userInfo.agentId, enterpriseId: this.userInfo.enterpriseId }, params: { id: id, city: '全国' } })
    }
  }
}
</script>

<style lang="less">
.easy-look-body {
  width: 100%;
  height: 100%;
  background: rgba(247, 249, 250, 1);
}

.easy-look-list {
  width: 100%;
  display: flex;
  border-bottom: #e2e2e3 1px solid;
  background: #ffffff;
  flex-direction: column;
  > .easy-look-time {
    display: flex;
    width: 100%;
    height: 47px;
    background: rgba(247, 249, 250, 1);
    align-items: flex-end;
    > .time-text {
      color: #445166;
      font-size: 16px;
      margin-left: 15px;
      margin-bottom: 7px;
    }
  }

  > .easy-look-item {
    width: 100%;
    height: 122px;
    display: flex;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 16px;

    > .easy-look-left {
      width: 150px;
      height: 122px;
      display: flex;
      align-items: center;

      > .easy-look-img {
        width: 120px;
        height: 90px;
        border-radius: 6px;
      }
    }

    > .easy-look-right {
      display: flex;
      margin-top: 16px;
      flex-direction: column;
      padding-left: 11px;

      > .easy-look-title {
        color: #445166;
        font-size: 14px;
      }

      > .easy-look-bottom {
        margin-top: 30px;

        > .easy-look-text {
          color: #445166;
          font-size: 14px;
        }

        > .easy-look-comment {
          color: #445166;
          font-size: 14px;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
