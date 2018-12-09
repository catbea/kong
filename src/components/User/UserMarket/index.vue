<template>
  <div class="user-market-page">
    <div class="user-market-page-box" @click="skipMarketDetail(dataArr.linkerId)">
      <div class="user-market-page-box-top">
        <div class="user-market-page-box-top-left bg_img" :style="{backgroundImage:'url('+dataArr.linkerUrl+')'}">
          <p class="icon-discount bg_img" :style="{backgroundImage:'url('+discountImg+')'}">{{dataArr.sale}}</p>
          <span class="bg_img icon-play" 
          :style="{backgroundImage:'url('+imgPlay+')'}"></span>
        </div>
        <ul>
          <li>
           <div style="display:flex;">{{dataArr.linkerName}} 
             <span class="stick" v-if="dataArr.recommand==0">置顶</span>
             </div>
           <span class="bg_img icon-share" @click.stop="usmarIconReturn" :style="{backgroundImage:'url('+imgShare+')'}"></span>
          </li>
          <li>
            {{dataArr.city}} {{dataArr.county}} {{dataArr.price}}{{dataArr.priceUnit}}
          </li>
          <li>
             <div class="tag-item-statu blue" v-if="0===dataArr.saleStatus">{{status[dataArr.saleStatus]}}</div>
             <div class="tag-item-statu red" v-if="1===dataArr.saleStatus">{{status[dataArr.saleStatus]}}</div>
             <div class="tag-item-statu gary" v-if="3===dataArr.saleStatus">{{status[dataArr.saleStatus]}}</div>
             <div class="tag-item" v-for="(item,index) in dataArr.linkerTags" :key="index">{{item}}</div>
          </li>
          <li>{{dataArr.openTimes}}次开通 {{dataArr.subscribeInvalidTime | dateTimeFormatter(2)}}到期
            <div class="apostrophe" @click.stop="popupHandle">
              <span></span>
              <span></span>
              <span></span>
            </div> 
          </li>
        </ul>
      </div>
      <div class="user-market-page-box-bottom" v-if="dataArr.price">
        <img class="bg_img" :src="imgCommission" alt="" srcset="">
        {{dataArr.divisionRules}}
      </div>
    </div>
    <div style="margin-left:16px">
      <van-popup
        v-model="show"
        position="bottom"
        :close-on-click-overlay="false"
        overlay
      >
        <ul>
          <li>续费（{{dataArr.subscribeInvalidTime | dateTimeFormatter(0)}}到期）</li>
          <li @click="masterHandle">大师推荐</li>
          <li @click="commonHandle">普通推荐</li>
          <li @click="stickHandle">
            <span v-show="stickShow">置顶</span>
            <span v-show="!stickShow">取消置顶</span>
          </li>
          <li @click="exhibitionHandle">
            <span v-show="exhibitionMarketShow">关闭楼盘展示</span> 
            <span v-show="!exhibitionMarketShow">开启楼盘展示</span> 
            </li>
          <li @click="closeHandle">取消</li>
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
  data:()=>({
    linkerId:null,
    discountImg:require('IMG/marketDetail/discount@2x.png'),
    show: false,
    stickSwitch:null,
    stickShow:true,
    exhibitionMarketShow:true,
    imgShare:require('IMG/user/rectangle.png'),
    imgPlay:require('IMG/user/Oval@2x.png'),
    imgCommission:require('IMG/user/collection/Rectangle@2x.png'),
    status:["热销中","即将发售","售罄"]
  }),
  props:{
    dataArr:{
      type:Object
    },
    marketIndex:{
      type:Number
    }
  },
  created() {
   this.linkerId=this.dataArr.linkerId
  },
  methods:{
    async changeUserStatus(linkerId,operationType,status){
       await userService.changeMarketData(linkerId,operationType,status)
    },//修改楼盘状态
    
    skipMarketDetail(linkerId){
      this.$router.push('/market/marketDetail/'+linkerId)
    },
    popupHandle () {//更多
      this.show = !this.show
    },
    stickHandle () {
      this.stickShow=!this.stickShow
      if(this.stickShow===true){
        this.stickSwitch=0
      }else{
        this.stickSwitch=10
      }
      this.changeUserStatus(this.linkerId,40,this.stickSwitch)//改置顶状态
    },
    closeHandle () {
      this.show = !this.show
    },
    masterHandle(){
      // this.$emit('returnMasterHandle',this.marketIndex)
      this.changeUserStatus(this.linkerId,20,1)//改为大师推荐
      console.log('已改为大师推荐')
    },
    commonHandle(){
      // this.$emit('returncommonHandle',this.marketIndex)
      this.changeUserStatus(this.linkerId,20,2)//改为普通推荐
      console.log('已改为普通推荐')
    },
    exhibitionHandle () {
      Dialog.confirm({
        title: '是否确定关闭该楼盘名片展示',
        message: '关闭该楼盘展示将取消推荐和置顶状态'
      }).then(() => {
        // on confirm
        this.stickShow=false
        this.exhibitionMarketShow=false
        this.changeUserStatus(this.linkerId,30,1)//改为不展示
        console.log(this.dataArr,111111111111)
        this.getMyMarketInfo()
        // this.dataArr.displayFlag='1'
        // this.$emit('closeCut',this.marketIndex)
      }).catch(() => {
        // on cancel
      });
    },
    apostropheReturn(){
      this.$emit("apostropheReturn",1)
    },
    usmarIconReturn() {
      this.$emit('usmarIconReturn', 1)
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
    width: 311px;
    box-shadow: 0px 3px 6px 0px rgba(58, 76, 130, 0.07), 0px 2px 17px 0px rgba(34, 47, 85, 0.05);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    .user-market-page-box-top {
      display: flex;
      justify-content:center;
      align-items:center;
      .icon-discount{
        width:36px;
        height:20px;
        position: absolute;
        top:4px;
        left:-4px;
        font-size:11px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:20px;
      }
      .icon-play{
        width:32px;
        height:32px;
      }
    }
    ul{
      width:181px;
      li:nth-of-type(1){
        font-size:16px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(51,51,51,1);
        line-height:16px;
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
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 20px;
          background: rgba(234, 77, 46, 1);
        }
        .icon-play {
          width: 32px;
          height: 32px;
        }
      }
      li:nth-of-type(2){
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:15px;
        margin:8px 0 8px 0;
      }
      li:nth-of-type(3){
        display:flex;
        flex-wrap: wrap;
        .blue{
          background:rgba(0, 122, 230, 1);
          color:#FFFFFF;
        }
        .red{
          background:rgba(234, 77, 46, 0.1);
          color:#EA4D2E;
        }
        .gary{
          background:rgba(143, 159, 177, 0.15);
          color:#5C5F66;
        }
        li:nth-of-type(2) {
          font-size: 12px;
          transform: scale(0.85);
          margin: 2px 4px 0px -6px;
          padding: 1px 5px;
          border-radius: 3px;
          height: 15px;
          line-height: 15px;
          margin: 10px 0 10px 0;
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
            margin: 0px 4px 0px -6px;
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
      }
      li:nth-of-type(4){
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:13px;
        margin-top:12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .apostrophe{
          width:20px;
          display: flex;
          justify-content: space-between;
          .apostrophe {
            width: 20px;
            display: flex;
            justify-content: space-between;
            span {
              width: 4px;
              height: 4px;
              border-radius: 50%;
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
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      margin-bottom: 16px;
      img {
        margin: 0 8px;
        width: 16px;
        height: 16px;
      }
    }
  }
 }
 //弹窗
 .van-popup--bottom {
    height: 316px;
    background: rgba(255, 255, 255, 1);
    ul {
      li {
        width: 375px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      li:nth-of-type(2) {
        border-bottom: 1px solid #eeeeee;
      }
      li:nth-of-type(4) {
        border-bottom: 1px solid #eeeeee;
        color: rgba(234, 77, 46, 1);
      }
      li:last-of-type {
        border-top: 6px solid #e8e8e8;
      }
    }
  }
  .van-modal {
    width: 100%;
  }
}
.van-dialog {
  width: 280px;
  height: 168px;
  background: rgba(255, 255, 255, 1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  .van-dialog__header {
    font-size: 18px;
    font-family: PingFangSC-Medium;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    padding-top: 26px;
  }
  .van-dialog__message--has-title {
    font-size: 15px;
    font-family: PingFangSC-Regular;
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
