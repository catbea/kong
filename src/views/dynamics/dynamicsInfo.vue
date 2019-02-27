<template>
  <div class="dynamicsInfo-page">
    <shadow-box>
      <div slot="container" >
        <div class="dynamicsInfo-list">

          <div class="dynamicsInfo-list-top" >
            <span class="dynamicsInfo-list-left" @click="godynamicsInfo(linkerVO.linkerId)">
               <div
                  v-show="linkerVO.sale !== '' "
                  class="dynamicsInfo-left-bg_img"
                  :style="{backgroundImage:'url('+labelImg+')'}"
                >{{linkerVO.sale}}</div>
              <img :src="linkerVO.linkerHeadUrl" class="mark-icon">
              <img :src="ovalIcon" class="oval-icon" v-show="linkerVO.ifPanorama == 1">
            </span>
            <span class="dynamicsInfo-list-right">
              <div class="dynamicsInfo-list-right-title">
                 <div class="dynamicsInfo-list-right-title-div">{{linkerVO.linkerName}}</div>
                <div class="dynamicsInfo-list-right-tab-div" @click="gopay(linkerVO)">
                   <span class="left-title-right"  v-if="linkerVO.linkerOpenEndTime !=''">续费</span>
                   <span class="left-title-right-open" v-else>开通</span>
                </div>
              </div>
              <p class="dynamicsInfo-list-right-time" @click="godynamicsInfo(linkerVO.linkerId)">{{linkerVO.city}}  {{linkerVO.district}} | {{linkerVO.linkerOpenEndTime | dateTimeFormatter(0,'/')}}到期</p>
              <p class="dynamicsInfo-list-right-label" @click="godynamicsInfo(linkerVO.linkerId)">
                <button class="right-label right-label-blur" v-show="linkerVO.saleStatus == 0 ">热销中</button>
                <button class="right-label right-label-red" v-show="linkerVO.saleStatus == 1">即将发售</button>
                <button class="right-label right-label-grey" v-show="linkerVO.saleStatus == 2">售罄</button>
                <button v-show="linkerVO.linkerTags && linkerVO.linkerTags.length>0" class="right-label right-label-gray" >{{linkerVO.linkerTags ? linkerVO.linkerTags[0] : ''}}</button>
                <button v-show="linkerVO.linkerTags && linkerVO.linkerTags.length>1" class="right-label right-label-gray" >{{linkerVO.linkerTags ? linkerVO.linkerTags[1] : ''}}</button>
              </p>
              <p class="dynamicsInfo-list-right-price" @click="godynamicsInfo(linkerVO.linkerId)">
                {{linkerVO.price>0 ? linkerVO.price+linkerVO.priceUnit :'价格待定' }}
                <!-- <span class="right-price-text"></span> -->
                <span class="right-price-open">{{linkerVO.openTimes }}次开通</span>
              </p>
            </span>
          </div>

          <div class="dynamicsInfo-list-commission" v-show="linkerVO.divisionRules != ''">
            <span class="dynamicsInfo-list-commission-word">佣</span>
            <!-- 1.056%+50000元/套 -->{{linkerVO.divisionRules}}
          </div>

        </div>
        
        <div class="dynaData-container" >
        <span class="container-total">
          <p class="container-title">分享次数</p>
          <p class="card-num">{{dynamicCount.linkerShareCount }}</p>
        </span>
        <span class="container-card">
          <p class="container-title">访客数量</p>
          <p class="card-num">{{dynamicCount.linkerVisitorCount }}</p>
        </span>
        <span class="container-properties " >
          <p class="container-title">浏览数量</p>
          <p class="card-num">{{dynamicCount.scanLinkerCount }}</p>
        </span>
        <span calss="container-article">
          <p class="container-title">平均停留(S)</p>
          <p class="card-num"> {{avgStayLinkerTime}}</p>
        </span>
      </div>

        <!-- <dynamics-data :totalTitle="totalTitle" :totalNum="totalNum" :cardTitle="cardTitle" :cardNum="cardNum" :propertiesTitle="propertiesTitle" :propertiesNum="propertiesNum" :articleTitle="articleTitle" :articleNum="articleNum"></dynamics-data> -->
      </div>
    </shadow-box>
    <div class="dynamics-container">
    <div v-if="SingleHouseDynamicList" v-for="(item,key) in SingleHouseDynamicList" :key="key">
    <div class="dynamics-container-list" >
      <shadow-box>
        <div slot="container">
          <div class="dynamics-list">
            <div class="dynamics-list-agent" @click="gocustomInfo(item)">
              <span class="dynamicsInfo-list-agent-left">
                <span class="agent-left-left">
                  <img :src="item.avatarUrl" class="agent-userImg">
                </span>
                <span class="agent-left-right">
                  <p class="left-right-name">{{item.clientName}}</p>
                  <p class="left-right-time">{{item.updateTime | dateTimeFormatter(3,'/')}}</p>
                </span>
              </span>
              <span class="dynamicsInfo-list-agent-right">
                <p class="agent-right-num" v-bind:style="{'color':item.intentionality >70?'#007AE6':'#999999'}">{{item.intentionality}}%</p>
                <p class="agent-right-title">意向度</p>
              </span>
            </div>
            <div class="dynamics-list-content" @click="gocustomInfo(item)">
              <p>浏览了楼盘  <span>{{item.linkerName}}</span></p>
              <p>{{item.updateTime | dateTimeFormatter(2,"/")}} 日第<span>{{item.clickCount }}次</span>打开 </p>
              <p>浏览时长大于<span>{{item.currentTime / 1000}}s</span>&nbsp;篇幅
              <samp v-if="item.currentArticleLength >= '100' ">游览</samp><samp v-else>小于</samp>
              <span>{{item.currentArticleLength}}%</span></p>
              <p>累计浏览<span>{{item.todayClickCount}}次</span>该楼盘，平均停留<span>{{item.totalTime / 1000}}s</span></p>
            </div>

            <div class="dynamics-list-btn"  v-show="item.clientDelFlag !== 2">
              <span></span>
              <div class="dynamicsInfo-list-btn-right">
               <button class="dynamicsInfo-list-btn-follow" v-show="item.attentionStatus   == 1" @click="getupdateCustomerInfo(item,key)">
                   <img :src="gzImg" class="agent-gzImg">关注</button>
                <button class="dynamicsInfo-list-btn-followOK" v-show="item.attentionStatus   == 0" @click="getupdateCustomerInfo(item,key)">已关注</button>
                <button class="dynamicsInfo-list-btn-contact" @click="dialogHandle(item)">
                  <img :src="lxImg" class="btn-contact-userImg">
                  联系
                </button>
              </div>
            </div>
          </div>

        </div>
      </shadow-box>
    </div>
</div>
  </div>
    <!-- <dynamics-list></dynamics-list> -->
  </div>
</template>
<script>
import TagGroup from 'COMP/TagGroup'
import ShadowBox from 'COMP/ShadowBox'
import DynamicsData from 'COMP/Dynamics/DynamicsData'
import dynamicsService from 'SERVICE/dynamicsService'
export default {
  components: {
    ShadowBox,
    DynamicsData,
    TagGroup
  },
  data() {
    return {
      backIcon: require('IMG/user/usercard@2x.png'),
      lxImg: require('IMG/dynamics/lx@2x.png'),
      gzImg: require('IMG/dynamics/gz@2x.png'),
      dynamicCount: [],
      linkerVO: [],
      SingleHouseDynamicList: [],
      itemDynamiclist: this.$route.query.itemDynamiclist,
      labelImg: require('IMG/marketDetail/discount@2x.png'),
      ovalIcon: require('IMG/marketDetail/Oval@2x.png'),
      avgStayLinkerTime: 0,
      linkerByDistributor: true //是否当前所属分销商楼盘
    }
  },
  created() {
    this.getSingleHouseDynamicList()
    this.$route.params.id
  },
  methods: {
    //查询单个楼盘数据动态列表
    async getSingleHouseDynamicList() {
      const res = await dynamicsService.getSingleHouseDynamicList(1, 10, this.itemDynamiclist)
      this.SingleHouseDynamicList = res.records
      this.getSingleHouseDynamicCount()
    },
    //单个楼盘数据动态统计
    async getSingleHouseDynamicCount() {
      const res = await dynamicsService.getSingleHouseDynamicCount(this.itemDynamiclist)
      this.dynamicCount = res.houseDynamicCountReturnVO
      this.linkerVO = res.linkerVO
      console.log(res, '单个楼盘数据')

      this.linkerByDistributor = res.linkerByDistributor
      this.avgStayLinkerTime = parseInt(this.dynamicCount.avgStayLinkerTime / 1000)
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
    //楼盘详情
    godynamicsInfo(linkerId) {
      this.$router.push({ name: 'market-detail', params: { id: linkerId } })
    },
    // 联系前确认
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
    },
    //客服详情
    gocustomInfo(item) {
      this.$router.push(`/custom/${item.clientId}`)
    },
    //续费开通
    gopay(item) {
      if (this.linkerByDistributor) {
        this.$router.push({ name: 'marketDetail-open', params: { id: item.linkerId } })
      } else {
        this.$toast('非当前所属公司下楼盘无法开通或续费')
      }
    }
  }
}
</script>
<style lang="less">
.dynamicsInfo-page {
  background: #ffffff;
  margin: 20px 0;
  .dynaData-container {
    background: #ffffff;
    display: flex;
    padding: 25px 0 20px 20px;

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
  .dynamicsInfo-list {
    margin: 0 15px;
    border-bottom: 1px solid #e6e6e6;
    padding: 15px 0 10px 0;
    > .dynamicsInfo-list-top {
      display: flex;
      margin-bottom: 7px;
      > .dynamicsInfo-list-left {
        height: 90px;
        position: relative;
        border-radius: 6px;
        .dynamicsInfo-left-bg_img {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 36px;
          text-align: center;
          width: 36px;
          height: 22px;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 20px;
          background-size: cover;
          position: absolute;
          top: 4px;
          left: -4px;
        }
        > .mark-icon {
          width: 120px;
          height: 90px;
          background: rgba(255, 255, 255, 1);
          border-radius: 6px;
        }
        > .oval-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          position: absolute;
          left: 45px;
          top: 30px;
        }
      }
      > .dynamicsInfo-list-right {
        border-radius: 6px;
        margin-left: 12px;
        margin-top: 2px;
        > .dynamicsInfo-list-right-title {
          font-size: 16px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 24px;
          .dynamicsInfo-list-right-title-div {
            font-size: 16px;
            overflow: hidden; /*内容超出后隐藏*/
            text-overflow: ellipsis; /* 超出内容显示为省略号*/
            white-space: nowrap; /*文本不进行换行*/
            width: 70%;
            font-weight: 600;
            margin-top: -5px;
          }
          .dynamicsInfo-list-right-tab-div {
            // position: absolute;
            // right: 0px;
            // top: 0;
            float: right;
            margin-top: -20px;

            .left-title-right {
              font-size: 12px;
              font-weight: 400;
              color: rgba(0, 122, 230, 1);
              line-height: 24px;
              border-radius: 12px;
              border: 1px solid;
              width: 46px;
              height: 24px;
              right: 25px;
              position: absolute;
              text-align: center;
            }
            .left-title-right-open {
              font-size: 12px;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 27px;
              width: 46px;
              height: 24px;
              background: rgba(0, 122, 230, 1);
              border-radius: 12px;
              border: 1px solid;
              right: 31px;
              position: absolute;
              text-align: center;
            }
          }
        }
        > .dynamicsInfo-list-right-time {
          font-size: 12px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          margin-top: 9px;
        }
        > .dynamicsInfo-list-right-label {
          margin-right: -15px;
          // line-height: 30px;
          > .right-label {
            font-size: 10px;
            font-weight: 400;
            border: 0;
            line-height: 10px;
            padding: 2px 5px;
            border-radius: 3px;
            margin-right: 4px;
            padding: 3px 6px;
          }
          > .right-label-red {
            background: rgba(234, 77, 46, 0.1);
            color: rgba(234, 77, 46, 1);
          }
          > .right-label-blur {
            background: rgba(0, 122, 230, 1);
            color: rgba(255, 255, 255, 1);
          }
          > .right-label-grey {
            background: rgba(102, 102, 102, 0.15);
            color: rgba(255, 255, 255, 1);
          }
          > .right-label-gray {
            background: rgba(143, 159, 177, 0.15);
          }
        }
        > .dynamicsInfo-list-right-price {
          font-size: 15px;
          font-weight: 600;
          color: rgba(234, 77, 46, 1);
          margin-top: 7px;
          > .right-price-text {
            font-size: 12px;
          }
          > .right-price-open {
            font-size: 12px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 11px;
            padding-left: 12px;
          }
        }
      }
    }

    > .dynamicsInfo-list-commission {
      height: 31px;
      background: rgba(247, 249, 250, 1);
      border-radius: 4px;
      font-size: 15px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
      padding-left: 11px;
      margin: 15px 0 9px 0;

      > .dynamicsInfo-list-commission-word {
        padding: 0 2px;
        border-radius: 2px;
        border: 1px solid;
        font-size: 10px;
        font-weight: 400;
        color: rgba(255, 85, 51, 1);
        margin-right: 10px;
      }
    }
  }
  .dynamics-container {
    background: #ffffff;
    margin-top: 37px;
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
        > .dynamicsInfo-list-agent-left {
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
        > .dynamicsInfo-list-agent-right {
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
        > .dynamicsInfo-list-btn-right {
          // position: absolute;
          right: 32px;
          line-height: 40px;
          float: right;
          margin-top: 8px;
          // margin-top: 15px;
          > .dynamicsInfo-list-btn-follow {
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
          > .dynamicsInfo-list-btn-followOK {
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
          > .dynamicsInfo-list-btn-contact {
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
