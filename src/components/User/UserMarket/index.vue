<template>
  <div class="user-market-page">
    <div class="user-market-page-box" @click="skipMarketDetail(dataArr.linkerId)">
      <div class="user-market-page-box-top">
        <div class="user-market-page-box-top-left bg_img" :style="{backgroundImage:'url('+dataArr.linkerUrl+')'}">
          <p v-show="dataArr.sale" class="icon-discount bg_img" :style="{backgroundImage:'url('+discountImg+')'}">{{dataArr.sale}}</p>
          <span class="bg_img icon-play" :style="{backgroundImage:'url('+imgPlay+')'}"></span>
        </div>
        <ul>
          <li>
            <div style="display:flex;">
             <span class="text">{{dataArr.linkerName}}</span>
              <span class="van-hairline--surround stick" v-if="dataArr.recommand==10&&pastShow">置顶</span>
              <span class="van-hairline--surround past-tag" v-if="!pastShow">已过期</span>
            </div>
            <span style="color:#999999;font-size:16px;" class="icon iconfont icon-Building_list_share" @click.stop="skipShare"></span>
          </li>
          <li>{{dataArr.city}} {{dataArr.county}} {{dataArr.price}}{{dataArr.priceUnit}}</li>
          <li>
            <div class="tag-item-statu blue" v-if="0===dataArr.saleStatus">{{status[dataArr.saleStatus]}}</div>
            <div class="tag-item-statu red" v-if="1===dataArr.saleStatus">{{status[dataArr.saleStatus]}}</div>
            <div class="tag-item-statu gary" v-if="3===dataArr.saleStatus">{{status[dataArr.saleStatus]}}</div>
            <div class="tag-item" v-for="(item,index) in dataArr.linkerTags.slice(0,2)" :key="index">{{item}}</div>
          </li>
          <li>
            {{dataArr.openTimes}}次开通 
            <span v-show="!stride">&nbsp;&nbsp;{{dataArr.subscribeInvalidTime | dateTimeFormatter(0)}}到期</span>
            <span v-show="stride">&nbsp;&nbsp;{{dataArr.subscribeInvalidTime | dateTimeFormatter(2)}}到期</span>
            <div class="apostrophe" @click.stop="popupHandle">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </li>
        </ul>
      </div>
      <div class="user-market-page-box-bottom" v-if="dataArr.divisionRules">
        <img class="bg_img" :src="imgCommission" alt srcset>
        <span>{{dataArr.divisionRules}}</span>
      </div>
    </div>
    <div style="margin-left:16px">
      <van-popup v-model="show" position="bottom" :close-on-click-overlay="false" overlay>
        <ul>
          <li @click="goRenew(dataArr.linkerId)" v-show="!stride">续费（{{dataArr.subscribeInvalidTime | dateTimeFormatter(0)}}到期）</li>
          <li @click="goRenew(dataArr.linkerId)" v-show="stride">续费（{{dataArr.subscribeInvalidTime | dateTimeFormatter(2)}}到期）</li>
          <div v-if="pastShow">
            <li class="borderDottom" @click="masterHandle(marketIndex)">
              <span v-show="!masterButtonShow">大师推荐</span>
              <span v-show="masterButtonShow">取消大师推荐</span>
            </li>
            <li @click="commonHandle(marketIndex)">
              <span v-show="!commonButtonShow">普通推荐</span>
              <span v-show="commonButtonShow">取消普通推荐</span>
            </li>
            <li class="color" @click="stickHandle(marketIndex)">
              <span v-show="dataArr.recommand==0">置顶</span>
              <span v-show="dataArr.recommand==10">取消置顶</span>
            </li>
            <li @click="exhibitionHandle">
              <span v-show="exhibitionMarketShow">关闭楼盘展示</span>
              <span v-show="!exhibitionMarketShow">开启楼盘展示</span>
            </li>
          </div>
          <li class="cancel" @click="closeHandle">取消</li>
        </ul>
      </van-popup>
    </div>
  </div>
</template>
<script>
import TagGroup from 'COMP/TagGroup/'
import { Dialog } from 'vant'
import userService from 'SERVICE/userService'
export default {
  components: {
    TagGroup
  },
  data: () => ({
    linkerId: null,
    discountImg: require('IMG/marketDetail/discount@2x.png'),
    show: false,
    stickShow: true,
    stickSwitch: null,
    exhibitionMarketShow: true,
    imgShare: require('IMG/user/rectangle.png'),
    imgPlay: require('IMG/user/Oval@2x.png'),
    imgCommission: require('IMG/user/collection/icon_commission@2x.png'),
    status: ['热销中', '即将发售', '售罄'],
    pastShow: '是否过期',
    stride: true
  }),
  props: {
    dataArr: {
      type: Object
    },
    marketIndex: {
      type: Number
    }
  },
  computed: {
    masterButtonShow: {
      get: function() {
        if (this.dataArr.masterRecommand == 1) {
          return true
        } else {
          return false
        }
      },
      set: function() {}
    },
    commonButtonShow: {
      get: function() {
        if (this.dataArr.masterRecommand == 2) {
          return true
        } else {
          return false
        }
      },
      set: function() {}
    }
  },
  created() {
    this.linkerId = this.dataArr.linkerId
    this.time()
    this.strideYear()
    console.log(this.dataArr,'展示的楼盘数据');
    
  },
  methods: {
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
      this.$router.push('/market/' + linkerId)
    },
    popupHandle() {
      //更多
      this.show = !this.show
    },
    stickHandle(index) {
      if (this.dataArr.recommand == 0) {
        this.stickSwitch = 10
        this.dataArr.recommand = 10
        //将当前点击的楼盘置顶
        let parent = this.$parent.$parent
        parent.showMarketList.unshift(parent.showMarketList[index])
        parent.showMarketList.splice(index + 1, 1)
        this.$dialog.alert({
          message: '楼盘置顶成功',
          className: 'hint-alert'
        }).then(() => {
          // on close
        })
      } else if (this.dataArr.recommand == 10) {
        this.stickSwitch = 0
        this.dataArr.recommand = 0
        //将当前点击的楼盘取消置顶
        this.$dialog.alert({
          message: '楼盘取消置顶成功',
          className: 'hint-alert'
        }).then(() => {
          // on close
        })
      }
      this.changeUserStatus(this.linkerId, 40, this.stickSwitch) //改置顶状态
      this.show = !this.show
    },
    closeHandle() {
      this.show = !this.show
    },
    async masterHandle(n) {
      if (this.masterButtonShow === false) {
        await this.changeUserStatus(this.linkerId, 20, 1) //改为大师推荐
        this.$dialog.alert({
          message: '大师推荐成功',
          className: 'hint-alert'
        }).then(() => {
          // on close
        })
        this.$emit('pushMaster', this.dataArr)
      } else {
        await this.changeUserStatus(this.linkerId, 20, 0) //改为未推荐
        this.$dialog.alert({
          message: '取消大师推荐成功',
          className: 'hint-alert'
        }).then(() => {
          // on close
        })
        this.$emit('spliceMaster', this.dataArr)
      }
      this.show = !this.show
      this.masterButtonShow = !this.masterButtonShow
    },
    commonHandle(n) {
      if (this.commonButtonShow === false) {
        this.changeUserStatus(this.linkerId, 20, 2) //改为普通推荐
        this.$dialog.alert({
          message: '普通推荐成功',
          className: 'hint-alert'
        }).then(() => {
          // on close
        })
        this.$emit('pushCommon', this.dataArr)
      } else {
        this.changeUserStatus(this.linkerId, 20, 0) //改为未推荐
        this.$dialog.alert({
          message: '取消普通推荐成功',
          className: 'hint-alert'
        }).then(() => {
          // on close
        })
        this.$emit('spliceCommon', this.dataArr)
      }
      this.show = !this.show
      this.commonButtonShow = !this.commonButtonShow
    },
    exhibitionHandle() {
      this.$dialog.confirm({
        title: '是否确定关闭该楼盘名片展示',
        message: '关闭该楼盘展示将取消推荐和置顶状态',
        className: 'show-Dialog'
      })
        .then(() => {
          // on confirm
          this.stickShow = false
          this.show = !this.show
          // this.exhibitionMarketShow = false
          this.changeUserStatus(this.linkerId, 30, 1) //改为不展示
          this.dataArr.displayFlag = 1
          // this.dataArr.displayFlag='1'
          this.$emit('closeCut', this.dataArr)
        })
        .catch(() => {
          // on cancel
        })
    },
    goRenew(linkerId) {
      //去续费
      this.$router.push({ name: 'marketDetail-open', params: { id: linkerId } })
    },
    apostropheReturn() {
      this.$emit('apostropheReturn', 1)
    },
    skipShare() {
      this.$router.push({ name: 'market-share', params: { id: this.linkerId } })
    },
    skipMarketRetuen() {
      this.$emit('skipMarketRetuen', 1)
    }
  }
}
</script>
<style lang="less">
.user-market-page {
  margin-left: 16px;
  display: flex;
  .user-market-page-box {
    margin-top: 16px;
    padding: 16px 16px 0 16px;
    width: 343px;
    box-shadow: 0px 3px 6px 0px rgba(58, 76, 130, 0.07), 0px 2px 17px 0px rgba(34, 47, 85, 0.05);
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
        .icon-discount {
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
        width: 181px;
        li:nth-of-type(1) {
          font-size: 16px;
          
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 16px;
          display: flex;
          justify-content: space-between;
          .text{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 103px;
          }
          // align-items: center;
          .stick {
            padding: 2px 4px 1px 4px;
            border: 1px solid white;
            display: inline-block;
            white-space: nowrap;
            border-radius: 2px;
            font-size: 12px;
            transform: scale(0.84);
            
            font-weight: 400;
            color: rgba(0, 122, 230, 1);
            margin-left: 4px;
            &::after {
              border-color: rgba(0, 122, 230, 1);
            }
          }
          .past-tag {
            padding: 2px 5px 1px 5px;
            border: 1px solid white;
            display: inline-block;
            white-space: nowrap;
            border-radius: 2px;
            font-size: 12px;
            transform: scale(0.84);
            
            font-weight: 400;
            color: #ea4d2e;
            margin-left:4px;
            &::after {
              border-color: #ea4d2e;
            }
          }
          .icon-share {
            display: inline-block;
            width: 16px;
            height: 16px;
          }
        }
        li:nth-of-type(2) {
          font-size: 12px;
          
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 15px;
          margin: 8px 0 8px 0;
        }
        li:nth-of-type(3) {
          display: flex;
          flex-wrap: wrap;
          .blue {
            background: rgba(0, 122, 230, 1);
            color: #ffffff;
          }
          .red {
            background: rgba(234, 77, 46, 0.1);
            color: #ea4d2e;
          }
          .gary {
            background: rgba(143, 159, 177, 0.15);
            color: #5c5f66;
          }
          .tag-item-statu,
          .tag-item {
            display: inline-block;
            white-space: nowrap;
            font-size: 12px;
            transform: scale(0.85);
            margin: 2px 4px 0px -6px;
            padding: 1px 5px;
            border-radius: 3px;
            height: 15px;
            line-height: 15px;
          }
          .tag-item {
            background: rgba(143, 159, 177, 0.15);
            color: #5c5f66;
          }
        }
        li:nth-of-type(4) {
          font-size: 12px;
          
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 13px;
          margin-top: 12px;
          display: flex;
          position: relative;
          align-items: center;
          .apostrophe {
            position:absolute;
            right:-5px;
            width: 40px;
            height:40px;
            display: flex;
            align-items: center;
            justify-content:center;
            span {
              width: 4px;
              height: 4px;
              border-radius: 50%;
              margin-right:4px;
              background: rgba(158, 158, 158, 1);
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
  }
  //弹窗
  .van-popup--bottom {
    background: rgba(255, 255, 255, 1);
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
  .van-modal {
    width: 100%;
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
  .van-dialog__confirm {
    border-top: 1px solid #ebedf0;
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
