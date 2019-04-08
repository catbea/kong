<template>
  <div class="html-body">
    <div class="title-bar">
      <div class="title-text">{{this.EvaluatingInfo.title}}</div>
      <div class="evaluating-bottom">
        <span>作者：{{this.EvaluatingInfo.author}}</span>
        <span>发布时间：{{this.EvaluatingInfo.createTime|dateTimeFormatter(5)}}</span>
      </div>
    </div>
    <div class="html-style" v-html="this.EvaluatingInfo.content"></div>
    <div class="thumbs-body">
      <div
        class="thumbs-up"
        :style="{'background':backgroundColor}"
        @click="setThumbsLike(likeFlag)"
        v-if="this.showThumb===true"
      >
        <img class="thumb-img" :src="thumbImg">
        <span class="thumb-num">赞({{this.EvaluatingInfo.likeNum}})</span>
      </div>
    </div>

    <van-loading class="loading-style"  v-if="this.showThumb===false" />

  </div>
</template>

 



<script>
import marketService from 'SERVICE/marketService'
import { mapGetters } from 'vuex'


export default {
  components: {
    ...mapGetters(['userInfo'])
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  data: () => ({
    likeFlag: '', //点赞或者取消点赞
    backgroundColor: '#FABE9E',
    EvaluatingInfo: '',
    thumbImg: require('IMG/market/thumb.png'),
    showThumb: false
  }),

  created() {
    this.reviewId = this.$route.query.reviewId
    this.agentId = this.$route.query.userInfo
    this.userType = this.$route.query.userType
    this.enterpriseId = this.$route.query.enterpriseId

    this.getEvaluatingDetail(this.reviewId, this.agentId, this.userType, this.enterpriseId)
  },

  methods: {
    async getEvaluatingDetail(reviewId, userInfo, userType, enterpriseId) {
      //获取评测详情
      const result = await marketService.getEvaluatingDetail(reviewId, userInfo, userType, enterpriseId)

      var data = {}
      var arr = Object.keys(result)
      if (arr.length != 0) {
        this.EvaluatingInfo = result
        this.showThumb = true

        if (result.isLike === false) {
          this.backgroundColor = '#FABE9E'
          this.likeFlag = '0' //可以进行点赞
        } else {
          this.backgroundColor = '#FA8548'
          this.likeFlag = '1' //取消点赞
        }
      } else {
        this.showThumb = false
      }
    },

    async setThumbsLike(likeFlag) {
      //点赞和取消点赞
      const result = await marketService.thumbsLike(this.reviewId, this.agentId, this.userType, likeFlag, this.enterpriseId)
      if (result == '') {
        //表示已经请求成功
        if (likeFlag == '0') {
          this.EvaluatingInfo.likeNum = this.EvaluatingInfo.likeNum + 1
          this.backgroundColor = '#FA8548'
          this.likeFlag = '1'
        } else if (likeFlag == '1') {
          this.EvaluatingInfo.likeNum = this.EvaluatingInfo.likeNum - 1
          this.backgroundColor = '#FABE9E'
          this.likeFlag = '0'
        }
      }
    }
  }
}
</script>


<style lang="less" scoped>
.html-body {
  width: 100%;
  display: flex;
  margin-top: 32px;
  flex-direction: column;

  > .loading-style{
    display: flex;
    width: 50px;
    height: 50px;
    justify-content: center;
    align-content: center;
    margin-left: 45%;
    margin-top: 45%;
  }


  > .title-bar {
    display: flex;
    flex-direction: column;

    > .title-text {
      color: #333333;
      font-size: 24px;
      padding-left: 16px;
      padding-right: 16px;
    }

    > .evaluating-bottom {
      display: flex;
      justify-content: space-between;
      padding-left: 16px;
      padding-right: 16px;

      span {
        margin-top: 15px;
        color: #999999;
        font-size: 12px;
      }
    }
  }

  .html-style {
    padding: 16px;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 25px;
  }

  .thumbs-body {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 30px;

    .thumbs-up {
      display: flex;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      align-items: center;
      flex-direction: column;

      .thumb-img {
        margin-top: 16px;
        width: 33px;
        height: 33px;
      }

      .thumb-num {
        font-size: 12px;
        color: #ffffff;
        margin-top: 5px;
      }
    }
  }
}
</style>

