<template>
  <div class="dynamicsInfo-page">
    <shadow-box>
      <div slot="container">
        <div class="dynamicsInfo-list">

          <div class="dynamicsInfo-list-top" >
            <span class="dynamicsInfo-list-left" @click="godynamicsInfo(dynamicCount.linkerVO.linkerId)">
               <div
                  class="dynamicsInfo-left-bg_img"
                  v-show="dynamicCount.linkerVO.sale != '' "
                  :style="{backgroundImage:'url('+labelImg+')'}"
                >{{dynamicCount.linkerVO.sale}}</div>
              <img :src="dynamicCount.linkerVO.linkerHeadUrl" class="mark-icon">
              <img :src="ovalIcon" class="oval-icon" v-show="dynamicCount.linkerVO.ifPanorama == 1">
            </span>
            <span class="dynamicsInfo-list-right">
              <div class="list-right-title" @click="gopay(dynamicCount.linkerVO)">
                 <div class="list-right-title-div">{{dynamicCount.linkerVO.linkerName}}</div>
                <div class="list-right-tab-div">
                   <span class="left-title-right"  v-if="dynamicCount.linkerVO.linkerOpenEndTime !=''">续费</span>
                   <span class="left-title-right-open" v-else>开通</span>
                </div>
              </div>
              <p class="list-right-time" @click="godynamicsInfo(dynamicCount.linkerVO.linkerId)">{{dynamicCount.linkerVO.city}}  {{dynamicCount.linkerVO.district}} | {{dynamicCount.linkerVO.linkerOpenEndTime | dateTimeFormatter(0,'/')}}到期</p>
              <p class="list-right-label" @click="godynamicsInfo(dynamicCount.linkerVO.linkerId)">
                <button class="right-label right-label-blur" v-show="dynamicCount.linkerVO.saleStatus == 0 ">热销中</button>
                <button class="right-label right-label-red" v-show="dynamicCount.linkerVO.saleStatus == 1">即将发售</button>
                <button class="right-label right-label-grey" v-show="dynamicCount.linkerVO.saleStatus == 2">售罄</button>
                <button class="right-label right-label-gray" v-for="(linkerTags ,key) in dynamicCount.linkerVO.linkerTags " :key="key">{{linkerTags}}</button>
              </p>
              <p class="dynamicsInfo-list-right-price" @click="godynamicsInfo(dynamicCount.linkerVO.linkerId)">
                {{dynamicCount.linkerVO.price }}{{dynamicCount.linkerVO.priceUnit }}
                <span class="right-price-text">起</span>
                <span class="right-price-open">{{dynamicCount.linkerVO.openTimes }}次开通</span>
              </p>
            </span>
          </div>

          <div class="dynamicsInfo-list-commission" v-show="dynamicCount.linkerVO.divisionRules != ''">
            <span class="list-commission-word">佣</span>
            <!-- 1.056%+50000元/套 -->{{dynamicCount.linkerVO.divisionRules}}
          </div>

        </div>
        
        <div class="dynaData-container" v-if="dynamicCount">
        <span class="container-total">
          <p class="container-title">楼盘数量</p>
          <p class="card-num">{{dynamicCount.houseDynamicCountReturnVO.linkerCount  }}</p>
        </span>
        <span class="container-card">
          <p class="container-title">楼盘分享</p>
          <p class="card-num">{{dynamicCount.houseDynamicCountReturnVO.linkerShareCount  }}</p>
        </span>
        <span class="container-properties " >
          <p class="container-title">楼盘访客</p>
          <p class="card-num">{{dynamicCount.houseDynamicCountReturnVO.linkerVisitorCount }}</p>
        </span>
        <span calss="container-article">
          <p class="container-title">平均停留(S)</p>
          <p class="card-num">{{dynamicCount.houseDynamicCountReturnVO.avgStayLinkerTime /1000}}</p>
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
                <p class="agent-right-num" v-bind:style="{'color':item.intentionality >70?'#007AE6':'#999999'}">{{item.intentionality}}%</p>
                <p class="agent-right-title">意向度</p>
              </span>
            </div>
            <div class="dynamics-list-content" @click="gocustomInfo(item)">
              <p>浏览了文章 <span>{{item.articleName}}</span></p>
              <p>{{item.updateTime | dateTimeFormatter(2,"/")}} 日第<span>{{item.clickCount }}次</span>打开 </p>
              <p>浏览时长大于<span>{{item.currentTime}}</span>&nbsp;篇幅小于<span>{{item.currentArticleLength}}%</span></p>
              <p>累计浏览<span>{{item.todayClickCount}}次</span>,名片，平均停留<span>{{item.totalTime / 1000}}s</span></p>
            </div>

            <div class="dynamics-list-btn">
              <span></span>
              <div class="list-btn-right">
               <button class="list-btn-follow" v-show="item.attentionStatus   == 1" @click="getupdateCustomerInfo(item,key)">
                   <img :src="gzImg" class="agent-gzImg">关注</button>
                <button class="list-btn-followOK" v-show="item.attentionStatus   == 0" @click="getupdateCustomerInfo(item,key)">已关注</button>
                <button class="list-btn-contact" @click="goalldynamics">
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
import DynamicsList from 'COMP/Dynamics/DynamicsList'
import dynamicsService from 'SERVICE/dynamicsService'
export default {
  components: {
    ShadowBox,
    DynamicsData,
    DynamicsList,
    TagGroup
  },
  data() {
    return {
      backIcon: require('IMG/user/usercard@2x.png'),
      lxImg: require('IMG/dynamics/lx@2x.png'),
      gzImg: require('IMG/dynamics/gz@2x.png'),
      dynamicCount:[],
      SingleHouseDynamicList:[],
      itemDynamiclist:this.$route.query.itemDynamiclist,
      labelImg: require('IMG/marketDetail/discount@2x.png'),
      ovalIcon: require('IMG/marketDetail/Oval@2x.png'),
    }
  },
  created() {
    this.getSingleHouseDynamicList()
  },
  methods: {
    //单个楼盘数据动态统计
    async getSingleHouseDynamicCount() {
      const res = await dynamicsService.getSingleHouseDynamicCount(this.itemDynamiclist.linkerId)
      this.dynamicCount = res
    },
    //查询单个楼盘数据动态列表
    async getSingleHouseDynamicList() {
      const res = await dynamicsService.getSingleHouseDynamicList(1, 10, this.itemDynamiclist.linkerId)
      this.SingleHouseDynamicList = res.records
      this.getSingleHouseDynamicCount()
    },
    //關注
    getupdateCustomerInfo(item){
       if (item.attentionStatus == 1) {
        item.attentionStatus = 0;
         dynamicsService.getupdateCustomerInfo(item.clientId,0)
      } else {
       item.attentionStatus = 1;
         dynamicsService.getupdateCustomerInfo(item.clientId,1)
      }
    },
    //楼盘详情
    godynamicsInfo(linkerId) {
      this.$router.push({name:'marketDetail', params: { id: linkerId }})
    },
    //联系
    goalldynamics () {
      this.$router.push('/dynamics/message/messageList')
    },
    //客服详情
    gocustomInfo(item){
      this.$router.push(`/custom/${item.clientId}`)
    },
    //续费开通
    gopay(item){
      this.$router.push({ name: 'marketDetail-open', params: { id: item.linkerId } })
    }
  }
}
</script>
<style lang="less">
.dynamicsInfo-page {
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
  }
  .dynamicsInfo-list {
    margin: 0 15px;

    border-bottom: 1px solid #e6e6e6;
    padding: 15px 0 16px 0;
    > .dynamicsInfo-list-top {
      display: flex;
      margin-bottom: 7px;
      > .dynamicsInfo-list-left {
        height: 90px;
        position: relative;
        border-radius: 6px;
        .dynamicsInfo-left-bg_img {
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

        > .list-right-title {
          font-size: 16px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 24px;
          .list-right-title-div{
            font-size: 16px;
            overflow: hidden;/*内容超出后隐藏*/
            text-overflow: ellipsis;/* 超出内容显示为省略号*/
           white-space: nowrap;/*文本不进行换行*/
           width: 70%;
          }
          .list-right-tab-div{
                position: absolute;
            right: 0px;
            top: 12px;
            .left-title-right {
              font-size: 12px;
              font-weight: 400;
              color: rgba(0, 122, 230, 1);
              line-height: 24px;
              border-radius: 12px;
              border: 1px solid;
              width: 46px;
              height: 24px;
              right: 30px;
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
        > .list-right-time {
          font-size: 12px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
        > .list-right-label {
          // line-height: 30px;
          > .right-label {
            font-size: 10px;
            font-weight: 400;
              border: 0;
            line-height: 10px;
            padding: 2px 5px;
            border-radius: 3px;
            margin-right: 4px;
            padding: 5px 5px;
          }
          > .right-label-red {
            background: rgba(234, 77, 46, 0.1);
            color: rgba(234, 77, 46, 1);
          }
          > .right-label-blur{
            background:rgba(0,122,230,1);
            color:rgba(255,255,255,1);
          }
           > .right-label-grey{
            background:rgba(102,102,102,0.15);
            color:rgba(255,255,255,1);
          }
          > .right-label-gray {
            background: rgba(143, 159, 177, 0.15);
          }
        }
        > .dynamicsInfo-list-right-price {
          font-size: 15px;
          font-weight: 600;
          color: rgba(234, 77, 46, 1);
          line-height: 25px;
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
      > .list-commission-word {
        padding: 0 3px;
        border-radius: 2px;
        border: 1px solid;
        font-size: 10px;
        font-weight: 400;
        color: rgba(255, 85, 51, 1);
        line-height: 14px;
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
}
</style>
