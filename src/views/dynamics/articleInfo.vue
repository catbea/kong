<template>
  <div class="articleInfo-page">
    <shadow-box>
      <div slot="container">
        <div class="articleInfo-list">
          <span class="articleInfo-list-left">
            <p class="list-left-title">{{articleTitle}}</p>
            <p
              class="list-left-time"
              v-show="articleSource"
            >{{articleSource }}&nbsp;&nbsp;{{articleTime | dateFormatterToHuman}}</p>
          </span>
          <span class="articleInfo-list-right">
            <img :src="articleImgUrl" class="mark-icon">
          </span>
        </div>
        <div class="dynaData-container">
          <span class="container-total">
            <p class="container-title">分享次数</p>
            <p class="card-num">{{articleDynamicCount.articleShareCount }}</p>
          </span>
          <span class="container-card">
            <p class="container-title">访客数量</p>
            <p class="card-num">{{articleDynamicCount.articleVisitorCount }}</p>
          </span>
          <span class="container-properties">
            <p class="container-title">浏览数量</p>
            <p class="card-num">{{articleDynamicCount.scanArticleCount }}</p>
          </span>
          <span calss="container-article">
            <p class="container-title">平均停留(S)</p>
            <p class="card-num">{{avgStayArticleTime }}</p>
          </span>
        </div>
        <!-- <dynamics-data :totalTitle="totalTitle" :totalNum="totalNum" :cardTitle="cardTitle" :cardNum="cardNum" :propertiesTitle="propertiesTitle" :propertiesNum="propertiesNum" :articleTitle="articleTitle" :articleNum="articleNum"></dynamics-data> -->
      </div>
    </shadow-box>
    <!-- <dynamics-list></dynamics-list> -->
    <div class="dynamics-container">
      <van-list
        v-model="loading"
        @load="getSingleArticleDynamicList"
        :finished="finished"
        :finished-text="'没有更多了'"
      >
        <div v-if="articleDynamicList" v-for="(item,key) in articleDynamicList" :key="key">
          <div class="dynamics-container-list">
            <shadow-box>
              <div slot="container">
                <div class="dynamics-list">
                  <div class="dynamics-list-agent" @click="godynamicsInfo(item)">
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
                  <div class="dynamics-list-content" @click="godynamicsInfo(item)">
                    <p>
                      浏览了文章
                      <span>{{item.articleName}}</span>
                    </p>
                    <p>
                      {{item.updateTime | dateTimeFormatter(2,"/")}} 日第
                      <span>{{item.clickCount }}次</span>打开
                    </p>
                    <p>
                      浏览时长大于
                      <span>{{item.currentTime / 1000}}s</span>&nbsp;篇幅
                      <samp v-if="item.currentArticleLength >= '100' ">游览</samp>
                      <samp v-else>小于</samp>
                      <span>{{item.currentArticleLength}}%</span>
                    </p>
                    <p>
                      累计浏览
                      <span>{{item.todayClickCount}}次</span>该文章，平均停留
                      <span>{{item.avgTime / 1000}}s</span>
                    </p>
                  </div>
                  <div class="dynamics-list-btn"  v-show="item.clientDelFlag !== 2">
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
      </van-list>
    </div>
  </div>
</template>
<script>
import ShadowBox from 'COMP/ShadowBox'
import DynamicsData from 'COMP/Dynamics/DynamicsData'
import dynamicsService from 'SERVICE/dynamicsService'
export default {
  components: {
    ShadowBox,
    DynamicsData
  },
  data() {
    return {
      backIcon: require('IMG/user/usercard@2x.png'),
      lxImg: require('IMG/dynamics/lx@2x.png'),
      gzImg: require('IMG/dynamics/gz@2x.png'),
      articleDynamicCount: [],
      articleDynamicList: [],
      itemlist: this.$route.query.itemlist,
      articleTitle: '',
      articleSource: this.$route.query.articleSource,
      articleImgUrl: this.$route.query.articleImgUrl,
      articleTime: this.$route.query.articleTime,
      articleId: this.$route.query.articleId,
      avgStayArticleTime: 0,
      loading: false,
      finished: false,
      current: 1,
      size: 5
    }
  },
  created() {
    this.articleTitle = this.$route.query.articleTitle
    // this.getSingleArticleDynamicList()
  },
  methods: {
    //查询单个文章客户访问数据动态列表
    async getSingleArticleDynamicList() {
      const res = await dynamicsService.getSingleArticleList(this.current, 2, this.articleId)

      if (res.records.length > 0) {
        this.articleDynamicList = this.articleDynamicList.concat(res.records)

        if (res.pages === 0 || this.current === res.pages) {
          this.finished = true
        }
        this.current++
        this.loading = false
      } else {
        this.loading = false
        this.finished = true
      }

      this.getSingleArticleDynamicCount()
    },
    //单个文章数据动态统计
    async getSingleArticleDynamicCount() {
      const res = await dynamicsService.getSingleArticleCount(this.articleId)
      this.articleDynamicCount = res
      this.avgStayArticleTime = parseInt(this.articleDynamicCount.avgStayArticleTime / 1000)
    },
    //關注
    getupdateCustomerInfo(item) {
      if (item.attentionStatus == 1) {
        item.attentionStatus = 0
        dynamicsService.getupdateCustomerInfo(item.clientId, 0)
      } else {
        item.attentionStatus = 1
        dynamicsService.getupdateCustomerInfo(item.clientId, 1)
      }
    },
    //客服详情
    godynamicsInfo(item) {
      this.$router.push(`/custom/${item.clientId}`)
    },
    dialogHandle (item) {
      if (item.h5Flag) {
        this.$dialog.alert({
          title: '提示',
          message: '该用户未使用小程序登录，无法收到您的消息!'
        })
      } else {
        this.goalldynamics(item)
      }
    },
    //联系
    goalldynamics(item) {
      this.$router.push({
        path: '/custom/message/message',
        query: {
          clientId: item.clientId
        }
      })
    }
  }
}
</script>
<style lang="less">
.articleInfo-page {
  background: #ffffff;
  margin: 16px 0;
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
    > .container-total {
    }
  }
  .articleInfo-list {
    margin: 0 15px;
    display: flex;
    border-bottom: 1px solid #eeeeee;
    padding: 15px 0 16px 0;
    > .articleInfo-list-left {
      height: 90px;
      position: relative;
      > .list-left-title {
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
        margin-right: 60px;
        padding-right: 70px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      > .list-left-time {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        position: absolute;
        bottom: 0;
      }
      > .time-body {
        display: flex;
        flex-direction: row;
        position: absolute;
        bottom: 0;

        > .list-span {
          font-size: 12px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          margin-left: 10px;
        }
      }
    }
    > .articleInfo-list-right {
      width: 120px;
      height: 90px;
      border-radius: 6px;
      position: absolute;
      margin-right: 0;
      padding-right: 0;
      right: 32px;
      > .mark-icon {
        width: 120px;
        height: 90px;
        background: rgba(255, 255, 255, 1);
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
        //display: flex;
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
          // padding-right: 16px;
          right: 0.42667rem;
          margin-top: -55px;
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
            > .agent-gzImg {
              width: 11px;
              height: 11px;
            }
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
