<template>
  <div class="asking-body">
    <div class="asking-header" v-if="this.noData===false">共有12个问题，300个回答</div>
    <div class="asking-center" v-if="this.noData===false">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="asking-item" @click="enterDetails">
          <div class="question-view">
            <div class="question-icon">问</div>
            <div class="question-body">
              <span class="question-title">
                #满京华#首付比例是多少呢？
                <span class="question-num">20人回复</span>
              </span>
            </div>
          </div>
          <div class="answer-view">
            <div class="answer-top">
              <div class="answer-icon">答</div>
              <img class="header-img" :src="noAskingIcon">
              <div class="user-name">李***</div>
              <div class="reply-time">2019年2月18日</div>
            </div>
            <div class="answer-bottom">时代天镜附近有挺多综合商场，星美国际嘉荣，吃的还挺多的，来个朋友也有地方可玩，未来松山湖发展号了，应会产生溢价…</div>
          </div>
        </div>
      </van-list>
    </div>
    <null :nullIcon="noAskingIcon" :nullcontent="nullcontent" v-if="this.noData===true"></null>
    <div class="asking-foot" @click="enterAskPage">立即提问</div>
  </div>
</template>


<script>
import Null from 'COMP/Null'

export default {
  components: {
    Null
  },
  data: () => ({
    loading: false,
    finished: false,
    noAskingIcon: require('IMG/market/no_asking.png'),
    nullcontent: '该楼盘没有问答哦，快来抢先一步提问吧！',
    noData: false
  }),
  created() {
    this.id = this.$route.params.id
  },
  methods: {
    onLoad() {},

    /**
     * 进入评测
     */
    enterDetails() {
      // this.$router.push({name: 'market-asking-detail', params: {id: this.id}})
      this.$router.push(`/marketDetail/askingDetail/${this.id}`)
    },

    enterAskPage() {
      this.$router.push({ name: 'market-asking-ask', params: {id: this.id}})
    }
  }
}
</script>


<style lang="less" scoped>
.asking-body {
  width: 100%;
  height: 100%;
  background: #ffffff;

  > .asking-header {
    width: 100%;
    height: 61px;
    background: #f2f5f9;
    line-height: 61px;
    font-size: 14px;
    text-align: center;
    position: fixed;
    left: 0;
    top: 0;
  }

  > .asking-foot {
    position: fixed;
    left: 0;
    bottom: 16px;
    height: 44px;
    background: rgba(0, 122, 230, 1);
    border-radius: 6px;
    width: 92%;
    margin-left: 4%;
    color: #fff;
    font-size: 16px;
    line-height: 44px;
    text-align: center;
  }

  > .asking-center {
    position: absolute;
    top: 61px;
    width: 100%;
    left: 0;
    bottom: 65px;
    overflow: auto;

    .asking-item {
      width: 92%;
      height: 163px;
      margin-left: 4%;
      margin-right: 4%;
      border-bottom: 1px solid #cccccc;

      > .question-view {
        width: 100%;
        padding-left: 16px;
        padding-top: 16px;
        display: flex;

        > .question-icon {
          width: 22px;
          height: 22px;
          background: rgba(235, 108, 82, 1);
          border-radius: 6px;
          color: #fff;
          font-size: 12px;
          line-height: 22px;
          text-align: center;
          float: left;
        }

        > .question-body {
          width: 90%;
          line-height: 20px;

          > .question-title {
            color: #333333;
            font-size: 13px;
            margin-left: 5px;
            float: left;
            width: 100%;

            > .question-num {
              color: #999999;
              font-size: 13px;
              float: right;
            }
          }
        }
      }

      > .answer-view {
        width: 100%;
        padding-left: 16px;
        padding-top: 16px;

        > .answer-top {
          display: flex;
          align-items: center;

          > .answer-icon {
            width: 22px;
            height: 22px;
            background: rgba(0, 122, 230, 1);
            border-radius: 6px;
            color: #fff;
            font-size: 12px;
            line-height: 22px;
            text-align: center;
            float: left;
          }

          .header-img {
            width: 24px;
            height: 24px;
            margin-left: 5px;
          }

          .user-name {
            font-size: 12px;
            color: #333333;
            margin-left: 5px;
          }

          .reply-time {
            font-size: 12px;
            color: #999999;
          }
        }

        > .answer-bottom {
          color: rgba(102, 102, 102, 1);
          font-size: 15px;
          margin-top: 10px;
          margin-left: 6%;
        }
      }
    }
  }
}
</style>
