<template>
  <div class="bg_img dynamics-collect">
    <img class="modify-img" :src="bgImg">
    <div class="top-container">
      <h5>数据中心</h5>
      <div class="bg_img msg-box" :style="{backgroundImage:'url(' + msgIcon + ')'}" @click="goMessage">
        <div class="new-msg-num"  v-if="data&&data.newMsg<=99&&data.newMsg>0">{{data&&data.newMsg | countLimit}}</div>
        <div class="icon iconfont icon-more new-msg-num" style="font-size:16px;" v-if="data&&data.newMsg>99"></div>
      </div>
    </div>
    <div class="shadow_box info-box" v-if="data">
      <div class="data-container" @click="goMessageInfo(data)">
        <div class="data-item main-data">
          <div class="data-value">
            {{data.customerCount.val}}
            <span class="data-change" v-if="data.customerCount.change !== 0">{{`${parseInt(data.customerCount.change)>0 ? '+':''}${data.customerCount.change}`}}</span>
          </div>
          <span class="data-title">客户数量</span>
        </div>
        <div class="data-item">
          <div class="data-value">
            {{data.businessCardViews.val}}
            <span class="data-change" v-if="data.businessCardViews.change !== 0">{{`${parseInt(data.businessCardViews.change)>0 ? '+':''}${data.businessCardViews.change}`}}</span>
          </div>
          <span class="data-title">名片浏览</span>
        </div>
        <div class="data-item">
          <div class="data-value">
            {{data.estateViews.val}}
            <span class="data-change" v-if="data.estateViews.change !== 0">{{`${parseInt(data.estateViews.change)>0 ? '+':''}${data.estateViews.change}`}}</span>
          </div>
          <span class="data-title">楼盘浏览</span>
        </div>
      </div>
      <div class="arrow-icon">
        <van-icon name="arrow"/>
      </div>
      <!-- <div class="van-hairline--bottom bottom-line"></div> -->
      <!-- dynamicType 动态类型：1：名片 2：楼盘 3：文章 ,为了以后方便改直接if区分开 -->
      <!-- <div class="carousel-container">
        <div class="carousel-swipe">
          <van-swipe :autoplay="3000" vertical :show-indicators="false">
            <van-swipe-item v-for="(item,index) in data.simpleDynamic" :key="index">
              <img class="avatar" :src="item.avatarUrl" />
              <p class="card-tips" v-if="item.dynamicType == 1">{{item.clientName}}{{item.timeStr}}浏览了你的{{item.markedWords}}</p>
              <p class="house-tips" v-if="item.dynamicType == 2">
                {{item.clientName}}{{item.timeStr}}浏览楼盘
                <span>{{item.markedWords}}</span>
              </p>
              <p class="article-tips" v-if="item.dynamicType == 3">{{item.clientName}}{{item.timeStr}}浏览了{{item.markedWords}}</p>
            </van-swipe-item>
          </van-swipe>
        </div> -->
        
        <!-- <div class="marquee-box">
          <marquee :itemHeight="`${50/37.5}rem`" v-if="data.simpleDynamic.length>0">
            <marquee-item class="carousel-item" v-for="(item,index) in data.simpleDynamic" :key="index">
              <avatar :avatar="item.avatarUrl"></avatar> -->
              <!-- dynamicType 动态类型：1：名片 2：楼盘 3：文章 ,为了以后方便改直接if区分开 -->
              <!-- <p class="card-tips" v-if="item.dynamicType == 1">{{item.clientName | textOver(6)}}{{item.timeStr}}浏览了你的{{item.markedWords | textOver(9)}}</p>
              <p class="house-tips" v-if="item.dynamicType == 2">
                {{item.clientName | textOver(6)}}{{item.timeStr}}浏览楼盘
                <span>{{item.markedWords | textOver(9)}}</span>
              </p>
              <p class="article-tips" v-if="item.dynamicType == 3">{{item.clientName | textOver(6)}}{{item.timeStr}}浏览了{{item.markedWords | textOver(9)}}</p>
            </marquee-item>
          </marquee>
        </div> -->
      </div>
      <!-- <div v-if="data&&data.simpleDynamic.length===0" class="no-carousel-tips">体验AI拓客新模式,连接客户更简单</div> -->
    </div>
  </div>
</template>
<script>
// import Marquee from 'COMP/Marquee'
// import MarqueeItem from 'COMP/MarqueeItem'
// import Avatar from 'COMP/Avatar'
export default {
  // components: {
  //   Marquee,
  //   MarqueeItem,
  //   Avatar
  // },
  props: {
    data: { type: Object },
    info: { type: Object }
  },
  data: () => ({
    bgImg: require('IMG/dynamics/collectBottom.png'),
    msgIcon: require('IMG/dynamics/listArrowUp.png')
  }),
  created() {
      // console.log(this.data,111111111111)
    },
  methods: {
    goMessage() {
      this.$router.push('/dynamics/message/messageList')
    },
    goMessageInfo(data) {
      let parm = {
        info: this.info,
        customerCount: data.customerCount.val,
        businessCardViews: data.businessCardViews.val,
        estateViews: data.estateViews.val,
        articleCount: data.articleCount.val,
        allDynamicsNum: data.customerCount.change + data.businessCardViews.change + data.estateViews.change + data.articleCount.change
      }
      this.$emit('click', parm)
    }
  }
}
</script>
<style lang="less">
.dynamics-collect {
  background-color: #2360ad;
  margin: 0 0 40px;
  height: 149px;
  position: relative;
  > .modify-img {
    width: 100%;
    position: absolute;
    top: 149px;
  }
  > .top-container {
    position: relative;
    margin: 0 16px 0;
    color: #333333;
    font-size: 28px;
    > h5 {
      margin: 26px 0 16px;
      display: inline-block;
      font-size: 20px;
      color: #fff;
    }
    > .msg-box {
      position: absolute;
      width: 24px;
      height: 24px;
      right: 10px;
      top: 22px;
      > .new-msg-num {
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(50%, -50%);
        width: 22px;
        height: 22px;
        // padding:
        background-color: #ea4d2e;
        border-radius: 100%;
        color: #fff;
        font-size: 12px;
        text-align: center;
        line-height: 22px;
      }
    }
  }
  > .info-box {
    background: #fff;
    position: relative;
    margin: 0 15px;
    padding: 10px;
    // padding-bottom: 20px;
    line-height: 1;
    border-top:1px solid #C2C7CC;
    > .data-container {
      padding: 14px 5px 16px 5px;
      margin-right: 20px;
      display: flex;
      justify-content: space-around;
      > .data-item {
        display: inline-block;
        position: relative;
        width: 70px;
        height: 50px;
        > .data-title {
          position: absolute;
          bottom: 0;
          width: 200px;
          font-size: 12px;
          font-weight: 400;
          color: #999999;
        }
        > .data-value {
          position: absolute;
          bottom: 21px;
          font-size: 20px;
          font-weight: 500;
          color: #333333;
          font-family: PingFangSC-Semibold;
          > .data-change {
            position: absolute;
            font-size: 12px;
            top: 0;
            right: 0;
            transform: translate(100%, -50%);
            font-weight: 500;
            color: #333333;
          }
        }
        &:first-child {
          // width: 90px;
          .data-value {
            font-size: 28px;
            .data-change {
              font-size: 14px;
            }
          }
        }
      }
    }
    > .arrow-icon {
      position: absolute;
      display: inline-block;
      font-size: 16px;
      color: #8b9198;
      font-weight: bolder;
      right: 15px;
      top: 47px;
    }
    > .bottom-line {
      margin: auto;
      width: 94%;
      height: 1px;
      border-radius: 1px;
      // background: #eeeeee;
    }
    > .carousel-container {
      position: relative;
      margin: 10px 0 -20px;
      > .marquee-box {
        height: 30px;
        margin: 10px 0 20px 0;
        padding-top: 5px;
        overflow: hidden;
        .carousel-item {
          text-align: left;
          display: flex;
          height: 50px;
          justify-content: left;
          font-size: 12px;
          line-height: 24px;
          padding-left: 14px;
          font-family: PingFangSC-Regular;
          .avatar {
            margin-right: 8px;
          }
          .card-tips {
            // padding-left: 5px;
          }
          > .house-tips {
            > span {
              color: #007ae6;
            }
          }
        }
      }
      .carousel-swipe {
        height: 30px;
        overflow: hidden;
        margin: 10px 0;
        .van-swipe {
          font-size: 12px;
          height: 30px;
          padding: 0 10px;
          .van-swipe-item {
            height: 24px;
            display: flex;
            .avatar {
              width: 24px;
              height: 24px;
              border-radius: 50%;
              margin-right: 5px;
            }
            p {
              height: 24px;
              line-height: 24px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width:290px;
            }
          }
        }
      }
    }
    > .no-carousel-tips {
      width: 100%;
      background: rgba(0, 122, 230, 0.05);
      position: absolute;
      left: 0;
      bottom: 0;
      height: 50px;
      border-radius: 0px 0px 10px 10px;
      font-size: 15px;
      color: #007ae6;
      font-weight: 400;
      text-align: center;
      line-height: 50px;
    }
  }
}
</style>
