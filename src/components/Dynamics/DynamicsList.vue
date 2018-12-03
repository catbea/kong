<template>

  <div class="dynamics-container">
    <div class="dynamics-time">2018/08/07</div>
    <div class="dynamics-container-list">
      <shadow-box>
        <div slot="container">
          <div class="dynamics-list">
            <div class="dynamics-list-agent" @click="godynamicsList">
              <span class="list-agent-left">
                <span class="agent-left-left">
                  <img :src="lxImg" class="agent-userImg">
                </span>
                <span class="agent-left-right">
                  <p class="left-right-name">谢敏</p>
                  <p class="left-right-time">2018/10/22 09:13</p>
                </span>
              </span>
              <span class="list-agent-right">
                <p class="agent-right-num">90.8%</p>
                <p class="agent-right-title">意向度</p>
              </span>
            </div>
            <div class="dynamics-list-content" @click="godynamicsList">
              <p>浏览了  <span>你的名片</span></p>
              <p>2018年10月22 日第<span>3 次</span>打开 </p>
              <p>浏览市场大于<span>60s</span>&nbsp;篇幅小于<span>50%</span></p>
              <p>累计浏览<span>4次</span>,名片，平均停留<span>5.5s</span></p>
            </div>

            <div class="dynamics-list-btn">
              <span></span>
              <span class="list-btn-right">
                <button class="list-btn-follow" v-show="!show1">
                   <img :src="gzImg" class="agent-gzImg">
                   关注</button>
                <button class="list-btn-followOK" v-show="show1">已关注</button>
                <button class="list-btn-contact" @click="goalldynamics">
                  <img :src="lxImg" class="btn-contact-userImg">
                  联系
                </button>
              </span>
            </div>
          </div>

        </div>
      </shadow-box>
    </div>
    
    <div class="dynamics-container-list">
      <shadow-box>
        <div slot="container">
          <div class="dynamics-list">
            <div class="dynamics-list-agent"@click="godynamicsList">
              <span class="list-agent-left">
                <span class="agent-left-left">
                  <img :src="lxImg" class="agent-userImg">
                </span>
                <span class="agent-left-right">
                  <p class="left-right-name">谢敏</p>
                  <p class="left-right-time">2018/10/22 09:13</p>
                </span>
              </span>
              <span class="list-agent-right">
                <p class="agent-right-nums">40.8%</p>
                <p class="agent-right-title">意向度</p>
              </span>
            </div>
            <div class="dynamics-list-content"@click="godynamicsList">
              <p>查看浏览了楼盘&nbsp;<span>碧桂园凤凰国际项目</span></p>
              <p>2018年10月22 日第<span>3 次</span>打开 </p>
              <p>浏览市场大于<span>60s</span>&nbsp;篇幅小于<span>50%</span></p>
              <p>累计浏览<span>4次</span>,名片，平均停留<span>5.5s</span></p>
            </div>

            <div class="dynamics-list-btn">
              <span></span>
              <span class="list-btn-right">
                <button class="list-btn-follow" v-show="show1">
                  <img :src="gzImg" class="agent-gzImg">
                  关注</button>
                <button class="list-btn-followOK" v-show="!show1">已关注</button>
                <button class="list-btn-contact" @click="goalldynamics">
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

</template>
<script>
import { Row, Col } from 'vant'
import ShadowBox from 'COMP/ShadowBox'
export default {
  components: {
    ShadowBox
  },
  data () {
    return {
      lxImg: require('IMG/dynamics/lx@2x.png'),
      gzImg: require('IMG/dynamics/gz@2x.png'),
      show1: true,
      info:{type:Object}
    }
  },
  methods: {
    goalldynamics () {
      this.$router.push('/dynamics/message/messageList')
    },
    godynamicsList(){
      this.$emit('click', this.info)
    }
  }
}
</script>
<style lang="less">
.dynamics-container {
  background: #ffffff;
  margin-top: 15px;
  > .dynamics-time {
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
      display: flex;
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
        position: absolute;
        right: 16px;
        margin-top: -6px;
        padding-right: 16px;
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
      font-family: PingFang-SC-Regular;
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
        position: absolute;
        right: 32px;
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
          margin-left: 24px;
          > .btn-contact-userImg {
            width: 11px;
            height: 11px;
          }
        }
      }
    }
  }
}
</style>
