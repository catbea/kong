<template>
  <div class="dynamics-container">
    <div class="dynamics-list-body" v-if="allDynamicList.length>0">
      <div v-if="allDynamicList" v-for="(times,key) in allDynamicList" :key="key">
        <div class="dynamics-time">{{times.dynamicDate | dateTimeFormatter(2,'/')}}</div>
        <div
          class="dynamics-container-list"
          v-for="(item,key) in times.msgList"
          :key="key"
        >
          <shadow-box>
            <div slot="container">
              <div class="dynamics-list">
                <div class="dynamics-list-agent" @click="godynamicsList(item)">
                  <span class="list-agent-left">
                    <span class="agent-left-left">
                      <img :src="item.clientAvatarUrl" class="agent-userImg">
                    </span>
                    <span class="agent-left-right">
                      <p class="left-right-name">{{item.clientName }}</p>
                      <p class="left-right-time">{{item.timeStr | dateTimeFormatter(1,':')}}</p>
                    </span>
                  </span>
                  <span class="list-agent-right">
                    <p
                      class="agent-right-num"
                      v-bind:style="{'color':item.intentionality >70?'#007AE6':'#999999'}"
                    >{{item.intentionality || 0}}%</p>
                    <p class="agent-right-title">意向度</p>
                  </span>
                </div>
                <div class="dynamics-list-content" @click="godynamicsList(item)">
                  <p><span>{{item.clientName}}</span>{{item.clientName ? item.markedWords.replace(item.clientName, '') : item.markedWords}}</p>
                </div>
                <div class="dynamics-list-btn">
                  <span></span>
                  <span class="list-btn-right">
                    <div id="attentionStatusNO" class="list-btn-follow" v-show="item.attentionStatus  == 1" @click="getupdateCustomerInfo(item,key)">
                      <img :src="gzImg" class="agent-gzImg">
                      <span class="list-btn-right-gz">关注</span>
                    </div>
                    <button id="attentionStatusOK" class="list-btn-followOK" v-show="item.attentionStatus  == 0" @click="getupdateCustomerInfo(item,key)">已关注</button>
                    <div class="list-btn-contact" @click="goalldynamics(item)">
                      <img :src="lxImg" class="btn-contact-userImg">
                      联系
                    </div>
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
import ShadowBox from 'COMP/ShadowBox'
import DynamicsNull from 'COMP/Dynamics/DynamicsNull'

export default {
  components: {
    ShadowBox,
    DynamicsNull
  },
  props: {
    info: { type: Object },
    item: { type: Array },
    allDynamicList: { type: Array }
    // CardDynamicList:{ type: Array }
  },
  data() {
    return {
      lxImg: require('IMG/dynamics/lx@2x.png'),
      gzImg: require('IMG/dynamics/gz@2x.png'),
      element: ''
    }
  },
  methods() {
    // this.golist()
  },
  methods: {
    getupdateCustomerInfo(item, key) {
      let pram = {
        statusOK: 'attentionStatusOK',
        statusNO: 'attentionStatusNO',
        item: item,
        index: key,
        type: 'update'
      }
      this.$emit('click', pram)
    },
    goalldynamics(item) {
      let pram = {
        type: 'messageList',
        item: item
      }
      this.$emit('click', pram)
    },
    godynamicsList(item) {
      let pram = {
        info: this.info,
        type: 'detail',
        item: item
      }
      this.$emit('click', pram)
    }
  }
}
</script>
<style lang="less">
.dynamics-container {
  background: #ffffff;
  margin-top: 28px;
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
    padding: 20px 16px 27px;
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
      margin-top: 6px;
      > p span {
        color: rgba(0, 122, 230, 1);
      }
    }
    .dynamics-list-card {
      font-size: 14px;
      font-weight: 400;
      color: #007ae6;
      line-height: 21px;
    }
    > .dynamics-list-btn {
      height: 40px;
      > .list-btn-right {
        //position: absolute;
        right: 32px;
        line-height: 40px;
        float: right;
        margin-top: 25px;
        display: flex;
        > .list-btn-follow {
          width: 64px;
          height: 24px;
          border-radius: 16px;
          border: 1px solid;
          font-size: 12px;
          font-weight: 400;
          color: rgba(0, 122, 230, 1);
          line-height: 21px;
          background: #ffffff;
          display: flex;
          padding-left: 7px;
          > .agent-gzImg {
            width: 16px;
            height: 16px;
            padding-top: 3px;
          }
          .list-btn-right-gz {
            padding-top: -5px;
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
          right: 80px;
          top: 12px;
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
          // position: absolute;
          display: flex;
          padding: 3px 11px;
          display: flex;
          > .btn-contact-userImg {
            width: 16px;
            height: 16px;
            padding-right: 3px;
          }
        }
      }
    }
  }
}
</style>
