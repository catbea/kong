<template>
  <div class="headline-page">
    <div class="headline-title">
      <h5>背景“限竞房”销售AB面：刚需房遇冷 别墅很火爆</h5>
      <div class="headline-title-agent">
        <span class="title-agent-left">
          <span class="agent-left-img">
            <img :src="personIcon" class="left-img">
          </span>
          <span class="agent-left-introduce">
            <p class="introduce-name">李晓峰</p>
            <p class="introduce-company">深圳中原地产</p>
          </span>
        </span>
        <span class="title-agent-right">
          <button class="agent-right" @click="gopopup">+关注</button>
        </span>
      </div>
      <img :src="backIcon" class="headline-title-img">
      <div class="headline-title-content">
        在北京的限竞房项目中，承载大多数刚需客的90平方米以下住宅由于是高层，只占据少部分土地面积，而项目广大区域则是被低矮的别墅所占据。在销售中，刚需房源和别墅也呈现出不同的境遇。
        <p class="title-content-p2">
          每经记者 王佳飞 摄影报道 每经编辑 魏文艺
        </p>
        推出限竞房的目的就是为了平抑上涨的房价，实现居者有其屋。那么，北京“限竞房”是否发挥了其应有的作用？
        <p class="title-content-time">
          转载于 华尔街见闻&nbsp;&nbsp; &nbsp;2018/10/02 08:30:00
        </p>
      </div>
      <agent></agent>
      <div class="headline-title-bar">
        <span class="title-btn-left">浏览：16,983</span>
        <span class="title-btn-right">
          <span class="btn-right-img"><img :src="fabulousIcon" class="title-img"></span>
          <span class="btn-right-num">840</span>
        </span>
      </div>
    </div>
    <div class="headline-Fill"></div>
    <div class="manual-swipes">
      <title-bar :title="title" :right="right"></title-bar>
      <manual-swipes></manual-swipes>
    </div>
    <div class="headline-Fill"></div>
    <div class="headline-titlebar">
      <title-bar :title="titles" :right="rights"></title-bar>
    </div>
    <discover-list></discover-list>

    <div>
      <fixed-btn></fixed-btn>
    </div>
   <!-- <fixed-btn></fixed-btn> -->
   
     <popup-frame></popup-frame>
   
  </div>

</template>
<script>
import discoverList from 'COMP/Discover/discoverList'
import FixedBtn from 'COMP/Discover/FixedBtn'
import agent from 'COMP/Discover/agent'
import popupFrame from 'COMP/Discover/popupFrame'
import ManualSwipes from 'COMP/Swipe/ManualSwipes'
import TitleBar from 'COMP/TitleBar'
export default {
  components: {
    discoverList,
    agent,
    popupFrame,
    ManualSwipes,
    TitleBar,
    FixedBtn

  },
  data () {
    return {
      title: '推荐房源',
      right: '全部楼盘',
       titles: '推荐文章',
      rights: '查看全部',
      personIcon: require('IMG/user/person_icon.png'),
      backIcon: require('IMG/user/usercard@2x.png'),
      fabulousIcon: require('IMG/discover/fabulous@2x.png'),
      show: false,

    }
  },
  methods: {
    gopopup () {
      this.show = true
    }
  }
}
</script>
<style lang="less">
.headline-page {
  > .headline-title {
    margin: 16px;
    h5 {
      font-size: 22px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
    }
    > .headline-title-agent {
      display: flex;

       margin-top: 13px;
      > .title-agent-left {
        display: flex;
        > .agent-left-img {
          > .left-img {
            width: 36px;
            height: 36px;
          }
        }
        > .agent-left-introduce {
          margin-left: 8px;
          > .introduce-name {
            font-size: 15px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 21px;
          }
          > .introduce-company {
            font-size: 12px;
            font-weight: 400;
            color: rgba(138, 143, 153, 1);
            line-height: 17px;
          }
        }
      }
      > .title-agent-right {
        position: absolute;
        right: 90px;
        > .agent-right {
          width: 72px;
          height: 32px;
          background: rgba(0, 122, 230, 1);
          border-radius: 16px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 20px;
          border: 0;
          position: absolute;
        }
      }
    }
    > .headline-title-img {
      width: 100%;
      height: 193px;
      border-radius: 10px;
    }
    > .headline-title-content {
      font-size: 17px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
      margin-bottom: 20px;
      > .title-content-p2 {
        padding: 20px 0;
      }
      > .title-content-time {
        font-size: 12px;
        font-weight: 400;
        color: rgba(138, 143, 153, 1);
        line-height: 17px;
        margin-top: 13px;
        text-align: left;
      }
    }
    > .headline-title-bar {
      margin: 0 0 8px 0;
      > .title-btn-left {
        font-size: 13px;
        font-weight: 400;
        color: rgba(138, 143, 153, 1);
        line-height: 18px;
      }
      > .title-btn-right {
        float: right;
        font-size: 13px;
        font-weight: 400;
        color: rgba(138, 143, 153, 1);
        line-height: 18px;
        display: flex;
        vertical-align: middle;
        text-align: center;
        margin-top: 15px;
        > .btn-right-img {
          > .title-img {
            width: 24px;
            height: 24px;
            display: -webkit-inline-box;
          }
        }
        > .btn-right-num {
          line-height: 30px;
          margin-left: 4px;
        }
      }
    }
  }
  > .headline-Fill {
    height: 10px;
    background: rgba(247, 249, 250, 1);
  }
  .headline-titlebar{
    margin: 0 16px;
  }
  > .manual-swipes {
    margin: 0 16px;
  }
}
</style>
