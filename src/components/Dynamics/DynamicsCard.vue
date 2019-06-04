<template>
  <div class="article-container">
    <div class="shadow-box">
      <div class="dynaData-container" v-if="cardDynamicCount">
        <span class="container-total">
          <p class="container-title">名片分享</p>
          <p class="card-num">{{cardDynamicCount.cardShareCount }}</p>
        </span>
        <span class="container-card">
          <p class="container-title">名片浏览</p>
          <p class="card-num">{{cardDynamicCount.scanCardCount }}</p>
        </span>
        <span class="container-properties">
          <p class="container-title">名片访客</p>
          <p class="card-num">{{cardDynamicCount.cardVisitorCount}}</p>
        </span>
        <span calss="container-article">
          <p class="container-title">平均停留(S)</p>
          <p class="card-num">{{cardDynamicListCount}}</p>
        </span>
      </div>
    </div>
    <div class="dynamics-container" v-if="cardDynamicList.length >0">
      <div v-if="cardDynamicList" v-for="(item,key) in cardDynamicList" :key="key">
        <div class="dynamics-container-list">
          <shadow-box>
            <div slot="container">
              <div class="dynamics-list">
                <div class="dynamics-list-agent" @click="godynamicsList(item)">
                  <span class="list-agent-left">
                    <span class="agent-left-left">
                      <img :src="item.avatarUrl" class="agent-userImg">
                    </span>
                    <span class="agent-left-right">
                      <p class="left-right-name">{{item.clientName}}</p>
                      <p class="left-right-time">{{item.updateTime | dateTimeFormatter(3,'/')}}</p>
                    </span>
                  </span>
                  <span class="list-agent-right">
                    <p
                      class="agent-right-num"
                      v-bind:style="{'color':item.intentionality >70?'#007AE6':'#999999'}"
                    >{{item.intentionality}}%</p>
                    <p class="agent-right-title">意向度</p>
                  </span>
                </div>
                <div class="dynamics-list-content" @click="godynamicsList(item)">
                  <p>
                    浏览了
                    <span>你的名片</span>
                  </p>
                  <p>
                    {{item.updateTime | dateTimeFormatter(2,'/')}} 日第
                    <span>{{item.clickCount }}次</span>打开
                  </p>
                  <p>
                    浏览时长大于
                    <span>{{item.currentTime / 1000}}s</span>&nbsp;篇幅<samp v-if="item.currentArticleLength >= '100' ">游览</samp><samp v-else>小于</samp>
                    <span>{{item.currentArticleLength > 100 ? 100 : item.currentArticleLength}}%</span>
                  </p>
                  <p>
                    累计浏览
                    <span>{{item.todayClickCount}}次</span>该名片，平均停留
                    <span>{{parseInt(item.totalTime / 1000 / item.todayClickCount) || 0}}s</span>
                  </p>
                </div>
                <div class="dynamics-list-btn" v-show="item.clientDelFlag !== 2">
                  <span></span>
                  <span class="list-btn-right">
                    <button
                      class="list-btn-follow"
                      v-show="item.attentionStatus   == 1"
                      @click="getupdateCustomerInfo(item,key)"
                    >
                      <img :src="gzImg" class="agent-gzImg">
                      关注
                    </button>
                    <button
                      class="list-btn-followOK"
                      v-show="item.attentionStatus   == 0"
                      @click="getupdateCustomerInfo(item,key)"
                    >已关注</button>
                    <button class="list-btn-contact" @click="dialogHandle(item)">
                      <img :src="lxImg" class="btn-contact-userImg">
                      联系
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </shadow-box>
        </div>
      </div>
    </div>
    <dynamics-null v-else></dynamics-null>
  </div>
</template>
<script>
import DynamicsData from 'COMP/Dynamics/DynamicsData'
import DynamicsList from 'COMP/Dynamics/DynamicsList'
import ShadowBox from 'COMP/ShadowBox'
import DynamicsNull from 'COMP/Dynamics/DynamicsNull'
export default {
  components: {
    DynamicsData,
    DynamicsList,
    ShadowBox,
    DynamicsNull
  },
  props: {
    cardDynamicCount: { type: '' },
    cardDynamicList: { type: Array },
    cardDynamicListCount: { type: '' }
  },
  data() {
    return {
      info: { type: Object },
      lxImg: require('IMG/dynamics/lx@2x.png'),
      gzImg: require('IMG/dynamics/gz@2x.png')
    }
  },
  methods() {},
  methods: {
    godynamicsList(item) {
      let pram = {
        info: this.info,
        type: 'detail',
        item: item
      }
      this.$emit('click', pram)
    },
    getupdateCustomerInfo(item, key) {
      let pram = {
        item: item,
        index: key,
        type: 'guanz'
      }
      this.$emit('click', pram)
    },
    // 联系前确认
    dialogHandle (item) {
      this.goalldynamics(item)
      // if (item.h5Flag) {
      //   this.$dialog.alert({
      //     title: '提示',
      //     message: '该用户未使用小程序登录，无法收到您的消息!'
      //   })
      // } else {
      //   this.goalldynamics(item)
      // }
    },
    goalldynamics(item) {
      let pram = {
        type: 'messageList',
        item: item
      }
      this.$emit('click', pram)
    }
  }
}
</script>
<style lang="less" scoped>
.article-container {
  background: #ffffff;
  .shadow-box {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 6px 0px rgba(58, 76, 130, 0.07), 0px 2px 17px 0px rgba(34, 47, 85, 0.05);
    border-radius: 6px;
    margin: 0 16px;
    .dynaData-container {
      background: #ffffff;
      display: flex;
      padding: 20px 0 20px 20px;

      span {
        width: 80.7px;
      }
      .container-title {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 18px;
      }
      .card-num {
        font-size: 24px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 36px;
      }
    }
  }
  .dynamics-container {
    background: #ffffff;
    margin-top: 15px;
    .dynamics-time {
      font-size: 14px;
      font-weight: 500;
      color: rgba(41, 46, 51, 1);
      line-height: 20px;
      padding: 12px 0;
      margin: 0 0.42667rem;
    }
  }
  .dynamics-container-list {
    margin-bottom: 20px;
    .dynamics-list {
      padding: 20px 16px;
      > .dynamics-list-agent {
        // display: flex;
        > .list-agent-left {
          display: flex;
          > .agent-left-left {
            > .agent-userImg {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
          }
          > .agent-left-right {
            padding-left: 12px;
            > .left-right-name {
              font-size: 15px;
              font-weight: 600;
              color: rgba(41, 46, 51, 1);
              line-height: 21px;
            }
            > .left-right-time {
              font-size: 13px;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 28px;
            }
          }
        }
        > .list-agent-right {
          // position: absolute;
          // right: 16px;
          // margin-top: -6px;
          right: 0.42667rem;
          // margin-top: -55px;
          padding-right: 0;
          float: right;
          > .agent-right-num {
            font-size: 20px;
            font-weight: 500;
            color: rgba(0, 122, 230, 1);
            line-height: 30px;
          }
          > .agent-right-nums {
            font-size: 20px;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
            line-height: 30px;
          }
          > .agent-right-title {
            font-size: 11px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 16px;
            text-align: center;
          }
        }
      }
      > .dynamics-list-content {
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 21px;
        > p span {
          color: rgba(0, 122, 230, 1);
        }
      }
    }
    > .dynamics-list-btn {
      height: 40px;
      > .list-btn-right {
        // position: absolute;
        right: 32px;
        line-height: 40px;
        float: right;
        margin-top: 8px;
        // margin-top: 15px;
        > .list-btn-follow {
          width: 64px;
          height: 24px;
          border-radius: 16px;
          border: 1px solid;
          font-size: 12px;
          font-weight: 400;
          color: rgba(0, 122, 230, 1);
          line-height: 17px;
          background: #ffffff;
          margin-right: 10px;
          > .agent-gzImg {
            width: 11px;
            height: 11px;
          }
          > .list-btn-followOK {
            font-size: 12px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 17px;
            width: 64px;
            height: 24px;
            border-radius: 16px;
            border: 1px solid #999999;
            background: #ffffff;
            margin-right: 10px;
          }
          > .list-btn-contact {
            width: 64px;
            height: 24px;
            background: rgba(0, 122, 230, 1);
            border-radius: 16px;
            font-size: 12px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 17px;
            border: 0;
            // position: absolute;
            right: 0;
            top: 0.32rem;
            > .btn-contact-userImg {
              width: 11px;
              height: 11px;
            }
          }
        }
      }
    }
  }
}
</style>
