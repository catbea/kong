<template>
  <div class="easy-look-body">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-if="haveData"
    >
      <div class="easy-look-list" v-for="(item, index) in this.likeArray" :key="index">
        <div class="easy-look-time">
          <span class="time-text">{{item.groupTime | dateTimeFormatter(2,'/')}}</span>
        </div>
        <div
          class="easy-look-item"
          v-for="(items, indexs) in item.infoList"
          :key="indexs"
          @click="articleDetail(items.id)"
        >
          <div class="easy-look-item-left">
            <div class="easy-look-img" :style="{backgroundImage:'url(' + items.image + ')'}"></div>  
          </div>
          <div class="easy-look-item-right">
            <span class="easy-look-title">{{items.title}}</span>
            <div class="easy-look-bottom">
              <span class="easy-look-text">{{items.likeTimes }}好看</span>
              <span class="easy-look-comment">{{items.commentNum }}个评论</span>
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
    this.userId = this.$route.query.userId
    this.userType = this.$route.query.userType
    document.title = this.$route.query.userName + '认为好看的文章'
  },

  methods: {
    async getLikeList(current, userId, userType) {
      const result = await articleService.queryLikeArticleList(current, userId, userType)

      if (result.records.length > 0) {
        this.likeArray = this.likeArray.concat(result.records)
        if (result.pages === 0 || this.current === result.pages) {
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
      
      // if (result.records.length > 0) {
      //   let parentArr = result.records
      //   let lastGrounpTime = ''

      //   if(current===1){

      //   }

      //   for (let i = 0; i < parentArr.length; i++) {
      //     lastGrounpTime = parentArr[parentArr.length - 1].groupTime
      //   }
      // } else {
      // }
    },

    onLoad() {
      this.getLikeList(this.current, this.userId, this.userType)
    },

    //进入文章详情
    articleDetail(id) {
      console.log(id)
      this.$router.push({ name: 'discover-detail', query: { agentId: this.userInfo.agentId, enterpriseId: this.userInfo.enterpriseId }, params: { id: id, city: '全国' } })
    }
  },

  watch: {
    $route(to, from) {}
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

    > .easy-look-item-left {
      float: left;
      width: 34%;
      height: 90px;
      margin-top: 16px;

      > .easy-look-img {
        width: 100%;
        height: 100%;
        border-radius: 6px;
        background-size: cover;
      }
    }

    > .easy-look-item-right {
      float: left;
      width: 60%;
      height: 90px;
      margin-top: 16px;
      position: relative;

      > .easy-look-title {
        color: #445166;
        font-size: 14px;
        position: absolute;
        top: 0;
        line-height: 20px;
      }

      > .easy-look-bottom {
        position: absolute;
        bottom: 0;

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
