<template>
  <div class="user-market-page" :class="{'active': (dataArr.recommand==10&&pastShow)}">
    <div class="user-market-page-box scale-1px-bottom">
      <div class="user-market-page-box-top" @click="skipMarketDetail(dataArr.linkerId)">
        <div class="user-market-page-box-top-left bg_img" :style="{backgroundImage:'url('+dataArr.linkerUrl+')'}">
          <!-- <p v-show="dataArr.sale" class="icon-discount bg_img" :style="{backgroundImage:'url('+discountImg+')'}">{{dataArr.sale}}</p> -->
          <div v-show="dataArr.cpActivityVo" class="coupon">卡券</div>
          <span class="bg_img icon-play"  v-if="dataArr.ifPanorama===1" :style="{backgroundImage:'url('+imgPlay+')'}"></span>
        </div>
        <ul >
          <li>
            <div style="display:flex; align-items:center;">
              <!-- <span class="free" v-if="+dataArr.isFree">免费</span> -->
              <span class="text">{{dataArr.linkerName}}</span>
              <!-- <span class="van-hairline--surround stick" v-if="dataArr.recommand==10&&pastShow">置顶</span> -->
              <span class="van-hairline--surround past-tag" v-if="!pastShow">已过期</span>
            </div>
            <!-- <span style="color:#999999;font-size:16px;" class="icon iconfont icon-Building_list_share iconShare" @click.stop="skipShare"></span> -->
            <span class="iconShare"  @click.stop="skipShare" v-if="pastShow">分享</span>
          </li>
          <li class="area">{{dataArr.city}} {{dataArr.county}}</li>
          <li>
            <div class="tag-item-statu blue" v-if="0===dataArr.saleStatus">{{status[dataArr.saleStatus]}}</div>
            <div class="tag-item-statu red" v-if="1===dataArr.saleStatus">{{status[dataArr.saleStatus]}}</div>
            <div class="tag-item-statu gary" v-if="3===dataArr.saleStatus">售罄</div>
            <div class="tag-item" v-for="(item,index) in dataArr.linkerTags ? dataArr.linkerTags.slice(0,2):[]" :key="index">{{item}}</div>
          </li>
          <li>
            <!-- {{dataArr.openTimes}}次开通 -->
            <!-- <span v-show="!stride">&nbsp;&nbsp;{{dataArr.subscribeInvalidTime | dateTimeFormatter(0)}}到期</span>
            <span v-show="stride">&nbsp;&nbsp;{{dataArr.subscribeInvalidTime | dateTimeFormatter(2)}}到期</span> -->
            <span v-if="dataArr.price===0">价格待定</span>
            <span v-else>{{dataArr.price}}{{dataArr.priceUnit}}</span>
            <div class="apostrophe" @click.stop="popupHandle">
              <!-- <span></span>
              <span></span>
              <span></span> -->
              <p class="icon iconfont icon-more"></p>
            </div>
          </li>
        </ul>
      </div>
      <div class="channel-box" v-if="+dataArr.isFree">
        <span @click="showChannelFn" v-if="!dataArr.channelId && dataArr.agentType <= 0">选择渠道</span>
        <span @click="goChangeChannel" v-if="dataArr.channelId && dataArr.agentType <= 0">切换渠道</span>
        <span @click="showTaskFn">任务({{dataArr.taskQuota || 0}})</span>
      </div>
      <div class="user-market-page-box-bottom" v-if="dataArr.divisionRules">
        <img class="bg_img" :src="imgCommission" alt srcset>
        <span>{{dataArr.divisionRules}}</span>
      </div>
    </div>
    <div>
      <van-popup v-model="show" position="bottom" :close-on-click-overlay="true" overlay :class="{pastStyle:!pastShow}">
        <ul>
          <li @click="goRenew(dataArr.linkerId)" v-show="!stride">续费（{{dataArr.subscribeInvalidTime | dateTimeFormatter(0)}}到期）</li>
          <li @click="goRenew(dataArr.linkerId)" v-show="stride">续费（{{dataArr.subscribeInvalidTime | dateTimeFormatter(2)}}到期）</li>
          <div v-if="pastShow">
            <!-- <li class="borderDottom" @click="masterHandle(marketIndex)">
              <span v-show="dataArr.masterRecommand != 1">大师推荐</span>
              <span v-show="dataArr.masterRecommand == 1">取消大师推荐</span>
            </li> -->
            <!-- <li @click="commonHandle(marketIndex)">
              <span v-show="dataArr.masterRecommand != 2">推荐</span>
              <span v-show="dataArr.masterRecommand == 2">取消推荐</span>
            </li> -->
            <li class="color" @click="stickHandle(marketIndex)">
              <span v-show="dataArr.recommand==0">置顶</span>
              <span v-show="dataArr.recommand==10">取消置顶</span>
            </li>
            <!-- <li @click="exhibitionHandle">
              <span v-show="dataArr.displayFlag==0">关闭楼盘展示</span>
              <span v-show="dataArr.displayFlag!=0">开启楼盘展示</span>
            </li> -->
          </div>
          <li class="cancel" @click="closeHandle">取消</li>
        </ul>
      </van-popup>
    </div>
    <div class="task">
      <van-popup v-model="showTask">
        <div class="task-box">
          <h3>今日分享任务已完成{{dataArr.taskQuota}}</h3>
          <p>任务说明：每天都需要完成至少3条以上植入该楼盘的“写一写”分享，或者楼盘相关的其他分享。</p>
          <button type="button" @click="hideTaskFn">我知道了</button>
        </div>
      </van-popup>
    </div>
    <van-actionsheet v-model="showChannel">
      <div class="channel-box">
        <div class="topbar">
          <p class="title">渠道选择</p>
          <p class="subtitle">七天只能切换一次</p>
        </div>
        
        <div class="channel-list">
         <p class="item" v-for="(item,index) in channelList" :key="index" @click="changeChannelFn(item)">{{item.channelName}} <span v-if="item.freeFlag" class="free">免费券</span></p>
        </div>
        <div class="cancle" @click="hideChannelFn">取消</div>
      </div>
    </van-actionsheet>
  </div>
</template>
<script>
import TagGroup from 'COMP/TagGroup/'
import userService from 'SERVICE/userService'
export default {
  components: {
    TagGroup
  },
  data: () => ({
    linkerId: null,
    masterButtonShow: false, //师推按钮
    commonButtonShow: false, //普推按钮
    stickNum: 0,
    recommandNum: 0,
    discountImg: require('IMG/marketDetail/discount@2x.png'),
    show: false,
    stickSwitch: null,
    exhibitionMarketShow: true,
    imgShare: require('IMG/user/rectangle.png'),
    imgPlay: require('IMG/user/Oval@2x.png'),
    imgCommission: require('IMG/user/collection/icon_commission@2x.png'),
    status: ['热销中', '即将发售', '', '售罄'],
    pastShow: '是否过期',
    stride: true,
    showTask: false,
    showChannel: false,
    channelList: [],
    currentChannel: {},
  }),
  props: {
    dataArr: {
      type: Object
    },
    marketIndex: {
      type: Number
    }
  },
  computed: {},
  created() {
    this.linkerId = this.dataArr.linkerId
    this.time()
    this.strideYear()
  },
  mounted() {
    
  },
  methods: {
    // 跳转切换渠道
    goChangeChannel () {
      this.$router.push({path: '/change/channel', query: {linkerId: this.dataArr.linkerId, channelId: this.dataArr.channelId, channelName: this.dataArr.channelName, switchable: this.dataArr.switchable}})
    },
    // 获取渠道列表
    getChannelListByLinkerId () {
      userService.getChannelListByLinkerId({linkerId: this.linkerId}).then(res => {
        this.channelList = res
        if (res.length) {
          this.showChannel = true
        } else {
          this.$toast('该楼盘没有渠道！')
        }
      }).catch()
    },

    // 选择渠道
    changeChannelFn (item){
      this.currentChannel = item
      this.switchChannel()
      this.hideChannelFn()
    },
    // 切换渠道
    switchChannel () {
      userService.switchChannel({
        linkerId:  this.linkerId,
        newChannelId: this.currentChannel.channelId,
        oldChannelId: '',
        switchingReason: ''
      }).then(res => {
        this.dataArr.switchable = 0
        this.dataArr.channelId = this.currentChannel.channelId
        this.$toast('选择渠道成功')
      }).catch()
    },
    // 显示渠道
    showChannelFn () {
      this.getChannelListByLinkerId()
    },
    // 隐藏渠道
    hideChannelFn () {
      this.showChannel = false
    },
    // 显示任务
    showTaskFn () {
      if (this.dataArr.shelfFlag == 1) {
        this.$dialog
          .alert({
            title: '非常抱歉',
            message: '该楼盘已被下架或删除',
            // className: 'renew-Dialog',
            confirmButtonText: '知道啦'
          })
          .then(() => {
            // on close
          })
      } else {
        this.showTask = true
      }
    },
    // 隐藏任务
    hideTaskFn () {
      this.showTask = false
    },
    recommendNumHandle() {
      //判断有没有超过5个推荐
      let parent = this.$parent.$parent
      for (let i = 0; i < parent.showMarketList.length; i++) {
        const element = parent.showMarketList[i]
        if (element.masterRecommand != 0) {
          this.recommandNum++
        }
      }
    },
    strideYear() {
      //判断是否跨年
      let timestamp = new Date().getTime()
      let usefulLife = this.dataArr.subscribeInvalidTime - 0 //到期时间错
      if (new Date(usefulLife).getFullYear() - new Date(timestamp).getFullYear() > 0) {
        this.stride = true
      } else {
        this.stride = false
      }
    },
    time() {
      //比较时间错判断是否过期
      let timestamp = new Date().getTime()
      if (timestamp - this.dataArr.subscribeInvalidTime > 0) {
        this.pastShow = false
      } else {
        this.pastShow = true
      }
    },
    async changeUserStatus(linkerId, operationType, status) {
      await userService.changeMarketData(linkerId, operationType, status)
    }, //修改楼盘状态
    skipMarketDetail(linkerId) {
      if (this.dataArr.shelfFlag == 1) {
        this.$dialog
          .alert({
            title: '非常抱歉',
            message: '该楼盘已被下架或删除',
            // className: 'renew-Dialog',
            confirmButtonText: '知道啦'
          })
          .then(() => {
            // on close
          })
      } else {
        this.$router.push('/market/' + linkerId)
      }
    },
    popupHandle() {
      if (this.dataArr.shelfFlag == 1) {
        this.$dialog
          .alert({
            title: '非常抱歉',
            message: '该楼盘已被下架或删除',
            className: 'renew-Dialog',
            confirmButtonText: '知道啦'
          })
          .then(() => {
            // on close
          })
      } else {
        //更多
        this.show = !this.show
      }
    },
    stickHandle(index) {
      if (this.dataArr.recommand == 0) {
        //将当前点击的楼盘置顶
        if (this.$parent.$parent.stickNum > 2) {
          this.$dialog
            .confirm({
              title: '当前置顶楼盘数量达到上限',
              message: '继续置顶将取消最初置顶楼盘置顶状态是否确定置顶当前楼盘'
            })
            .then(() => {
              this.$emit('recommandTrueHandle', this.dataArr)
              let parent = this.$parent.$parent
              debugger
              parent.showMarketList.unshift(parent.showMarketList[index])
              parent.showMarketList.splice(index + 1, 1)
              parent.showMarketList[3].recommand = 0
              // parent.showMarketList.splice(1,1)
              // this.$dialog
              //   .alert({
              //     message: '楼盘置顶成功',
              //     className: 'hint-alert'
              //   })
              //   .then(() => {})
              this.$toast({
                duration: 800,
                message: '置顶成功'
              })
              this.changeUserStatus(this.linkerId, 40, 10) //改置顶状态
              this.show = !this.show //关闭弹出层
            })
        } else {
          //将当前点击的楼盘置顶
          this.$emit('recommandTrueHandle', this.dataArr)
          let parent = this.$parent.$parent
          parent.showMarketList.unshift(parent.showMarketList[index])
          parent.showMarketList.splice(index + 1, 1)
          this.$toast({
            duration: 800,
            message: '置顶成功'
          })
          this.changeUserStatus(this.linkerId, 40, 10) //改置顶状态
          this.show = !this.show
        }
      } else if (this.dataArr.recommand == 10) {
        //将当前点击的楼盘取消置顶
        this.$emit('recommandFalseHandle', this.dataArr)
        this.$toast({
          duration: 800,
          message: '取消置顶成功'
        })
        this.changeUserStatus(this.linkerId, 40, 0) //改置顶状态
        this.show = !this.show
      }
    },
    closeHandle() {
      this.show = !this.show
    },
    async masterHandle(n) {
      if (this.dataArr.masterRecommand != 1) {
        await this.changeUserStatus(this.linkerId, 20, 1) //改为大师推荐
        this.$toast({
          duration: 800,
          message: '大师推荐成功'
        })
        this.$emit('pushMaster', this.dataArr)
      } else {
        await this.changeUserStatus(this.linkerId, 20, 0) //改为未推荐
        this.$toast({
          duration: 800,
          message: '取消大师推荐成功'
        })
        this.$emit('spliceMaster', this.dataArr)
      }
      this.show = !this.show
      this.masterButtonShow = !this.masterButtonShow
    },
    commonHandle(n) {
      if (this.dataArr.masterRecommand != 2) {
        this.changeUserStatus(this.linkerId, 20, 2) //改为普通推荐
        this.$toast({
          duration: 800,
          message: '推荐成功'
        })
        this.$emit('pushCommon', this.dataArr)
      } else {
        this.changeUserStatus(this.linkerId, 20, 0) //改为未推荐
        this.$toast({
          duration: 800,
          message: '取消推荐成功'
        })
        this.$emit('spliceCommon', this.dataArr)
      }
      this.show = !this.show
      this.commonButtonShow = !this.commonButtonShow
    },
    exhibitionHandle() {
      //关闭楼盘展示
      this.$dialog
        .confirm({
          title: '是否确定关闭该楼盘名片展示',
          message: '关闭该楼盘展示将取消推荐和置顶状态',
          className: 'show-Dialog'
        })
        .then(() => {
          // on confirm
          this.show = !this.show
          this.changeUserStatus(this.linkerId, 30, 1) //改为不展示
          this.$emit('closeCut', this.dataArr)
          this.$toast({
            duration: 800,
            message: '关闭展示成功'
          })
        })
    },
    goRenew(linkerId) {
      if (this.dataArr.saleStatus == 3) {
        this.$dialog
          .alert({
            title: '非常抱歉',
            message: '该楼盘已售罄，无法开通',
            className: 'renew-Dialog',
            confirmButtonText: '知道啦'
          })
          .then(() => {
            // on close
          })
      } else if (this.dataArr.shelfFlag == 1) {
        this.$dialog
          .alert({
            title: '非常抱歉',
            message: '该楼盘已被下架或删除',
            className: 'renew-Dialog',
            confirmButtonText: '知道啦'
          })
          .then(() => {
            // on close
          })
      } else if (this.dataArr.thisDistributor === false) {
        this.$dialog
          .alert({
            title: '该楼盘不可续费',
            message: '非当前所属公司下楼盘无法开通续费',
            className: 'renew-Dialog',
            confirmButtonText: '知道啦'
          })
          .then(() => {
            // on close
          })
      } else {
        //去续费
        this.$router.push({ name: 'marketDetail-open', params: { id: linkerId } })
      }
    },
    skipShare() {
      if (this.dataArr.shelfFlag == 1) {
        this.$dialog
          .alert({
            title: '非常抱歉',
            message: '该楼盘已被下架或删除',
            className: 'renew-Dialog',
            confirmButtonText: '知道啦'
          })
          .then(() => {
            // on close
          })
      } else {
        //去分享
        this.$router.push({ name: 'market-poster', params: { id: this.linkerId } })
      }
    }
  }
}
</script>
<style lang="less">
.user-market-page {
  padding: 0 16px;
  display: flex;
  &.active{
    background-color: #F6F6F6;
  }
  .user-market-page-box {
    flex: 1;
    margin-top: 16px;
    // padding: 16px 16px 0 16px;
    // width: 343px;
    // box-shadow: 0px 3px 6px 0px rgba(58, 76, 130, 0.07), 0px 2px 17px 0px rgba(34, 47, 85, 0.05);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    .user-market-page-box-top {
      display: flex;
      margin-bottom: 16px;
      .user-market-page-box-top-left {
        border-radius: 4px;
        width: 120px;
        height: 90px;
        margin-right: 10px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .coupon{
          position: absolute;
          left: 0;
          top: 8px;
          font-size: 12px;
          color: #fff;
          padding: 0 10px 0 5px;
          height: 20px;
          line-height: 20px;
          background-color: #CF562B;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
        .icon-discount {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 36px;
          height: 20px;
          position: absolute;
          top: 4px;
          left: -4px;
          font-size: 11px;

          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 18px;
          text-align: center;
        }
        .icon-play {
          width: 32px;
          height: 32px;
        }
      }
      ul {
        flex: 1;
        li:nth-of-type(1) {
          font-size: 16px;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 16px;
          position: relative;
          display: flex;
          .text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 140px;
            line-height: 21px;
          }
          .free{
            display: inline-block;
            font-size: 10px;
            height:14px;
            line-height: 14px;
            background:linear-gradient(90deg,rgba(255,153,51,1) 0%,rgba(230,94,46,1) 100%);
            color: #fff;
            border-radius: 2px;
            margin-right: 2px;
            margin-top: 1px;
            padding: 0 5px;
            vertical-align: middle;
            font-weight: 300;
          }
          // align-items: center;
          .stick {
            padding: 2px 4px 1px 4px;
            border: 1px solid white;
            display: inline-block;
            white-space: nowrap;
            font-size: 12px;
            transform: scale(0.84);
            font-weight: 400;
            color: rgba(0, 122, 230, 1);
            margin-left: 4px;
            &::after {
              border-color: rgba(0, 122, 230, 1);
              border-radius: 5px;
            }
          }
          .past-tag {
            padding: 2px 5px 1px 5px;
            border: 1px solid white;
            display: inline-block;
            white-space: nowrap;
            font-size: 12px;
            transform: scale(0.84);
            font-weight: 400;
            color: #ea4d2e;
            margin-left: 4px;
            &::after {
              border-color: #ea4d2e;
              border-radius: 2px;
            }
          }
          .icon-share {
            display: inline-block;
            width: 16px;
            height: 16px;
          }
          .iconShare{
            position: absolute;
            right: 0;
            top: 0;
            width: 50px;
            height:30px;
            line-height: 30px;
            background:linear-gradient(90deg,rgba(255,153,51,1) 0%,rgba(230,94,46,1) 100%);
            box-shadow:0px 2px 4px 0px rgba(230,94,46,0.35);
            border-radius:15px;
            font-size: 12px;
            color: #fff;
            text-align: center;
            font-weight: 500;
            margin-left: 10px;
          }
        }
        li:nth-of-type(2) {
          font-size: 12px;
          font-weight: 400;
          color: #9CA5B5;
          line-height: 15px;
          margin: 6px 0 6px 0;
        }
        li:nth-of-type(3) {
          display: flex;
          flex-wrap: nowrap;
          width: 181px;
          height: 20px;
          font-weight: 400;
          .blue {
            background: rgba(0,120,255,0.15);
            color: #5C5F66;
          }
          .red {
            background:rgba(250,41,41,0.15);;
            color: #5C5F66;
          }
          .gary {
            background: rgba(143,159,177,0.15);
            color: #5c5f66;
          }
          .tag-item-statu,
          .tag-item {
            display: inline-block;
            white-space: nowrap;
            font-size: 12px;
            transform: scale(0.84);
            margin: 2px 4px 0px -6px;
            padding: 1px 5px;
            border-radius: 3px;
            height: 18px;
            line-height: 17.5px;
          }
          .tag-item {
            background: rgba(143, 159, 177, 0.15);
            color: #5c5f66;
          }
        }
        li:nth-of-type(4) {
          font-size: 12px;

          font-weight: 600;
          color: #40516F;
          line-height: 13px;
          margin-top: 10px;
          display: flex;
          position: relative;
          align-items: center;
          .apostrophe {
            position: absolute;
            right: -5px;
            width: 56px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
              width: 4px;
              height: 4px;
              border-radius: 50%;
              margin-right: 4px;
              background: rgba(158, 158, 158, 1);
            }
            .icon-more{
              font-weight: 400;
              font-size: 20px;
              color: #9E9E9E;
            }
          }
        }
      }
    }
    .user-market-page-box-bottom {
      width: 311px;
      height: 39px;
      display: flex;
      align-items: center;
      background: rgba(247, 249, 250, 1);
      border-radius: 4px;
      font-size: 13px;

      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      margin-bottom: 16px;
      img {
        margin: 0 8px;
        width: 16px;
        height: 16px;
      }
      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0;
        width: 130px;
      }
    }
    .channel-box{
      font-size: 12px;
      color: #445166;
      padding: 0 0 10px 0;
      text-align: right;
      background-color: transparent;
      span{
        display: inline-block;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background:#e3e8ef;
        border-radius:4px;
        margin-left: 16px;
        padding: 0 16px;
      }
    }
  }
  //弹窗
  .van-popup--bottom {
    background: rgba(255, 255, 255, 1);
    width: 100%;
    // height: 250px;
    border-radius: 0;
    ul {
      li {
        width: 375px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .borderDottom {
        border-bottom: 1px solid #eeeeee;
      }
      .color {
        color: rgba(234, 77, 46, 1);
        border-bottom: 1px solid #eeeeee;
      }
      .cancel {
        border-top: 6px solid #e8e8e8;
      }
    }
  }
  .pastStyle{
      height: 106px;
    }
  .van-modal {
    width: 100%;
  }
  .task{
    font-size: 14px;
    .van-popup{
      border-radius: 12px;
      overflow: hidden;
    }
    .task-box{
        width: 310px;
        height: 230px;
        padding: 24px;
      h3{
        font-size: 20px;
        padding-bottom: 15px;
        font-weight: 600;
      }
      p{
        font-size: 14px;
        line-height: 1.5;
        color: #666;
      }
      button{
        width: 100%;
        height:44px;
        background:rgba(0,122,230,1);
        border-radius:6px;
        color: #fff;
        font-size: 16px;
        border:none;
        margin-top: 30px;
      }
    }
  }
  .channel-box{
    font-size: 16px;
    padding: 10px 0 0 0;
    background-color: #fff;
    .topbar{
      text-align: center;
      padding-bottom: 5px;
      .title{
        padding: 10px 0 5px;
        font-size: 18px;
        color: #13294F;
        font-weight: 600;
      }
      .subtitle{
        font-size: 12px;
        color: #999;
        z-index: 9;
        position: relative;
      }
    }
    
    .channel-list{
      max-height: 500px;
      overflow-y: scroll;
    }
    .item{
      padding: 16px 0 10px 16px;
      .free{
        display: inline-block;
        font-size: 10px;
        color: #fff;
        background-color: #EA4D2E;
        line-height: 15px;
        height: 15px;
        padding: 0 5px;
        border-radius: 2px;
        vertical-align: middle;
      }
    }
    .cancle{
      margin-top: 20px;
      height:50px;
      background:rgba(238,238,238,1);
      line-height: 50px;
      text-align: center;
    }
  }
}
//弹出确认框
.hint-alert {
  width: 280px;
  // height: 168px;
  background: rgba(255, 255, 255, 1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .van-dialog__confirm {
    border-top: 1px solid #ebedf0;
  }
}
.renew-Dialog {
  width: 235px;
  border-radius: 10px;
  .van-dialog__header,
  .van-dialog__message--has-title {
    font-size: 16px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    padding-top: 26px;
  }
}
.show-Dialog {
  width: 280px;
  height: 168px;
  background: rgba(255, 255, 255, 1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  .van-dialog__header {
    font-size: 18px;

    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    padding-top: 26px;
  }
  .van-dialog__message--has-title {
    font-size: 15px;

    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    text-align: center;
    width: 203px;
    padding: 0;
    margin: 9px 0 15px 35px;
  }
  .van-dialog__footer--buttons {
    flex: 1;
    .van-hairline--left {
      color: rgba(0, 122, 230, 1);
    }
  }
}
</style>
