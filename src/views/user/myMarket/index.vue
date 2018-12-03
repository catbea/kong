<template>
  <div class="user-mymarket-page">
   <div style="margin-left:16px"><master-market></master-market></div> 
    <div style="margin-left:16px"><title-bar :conf="titleInfo" @titleBarReturn=""></title-bar></div>
    <div style="margin-left:16px"><van-search :obj="searchInfo"></van-search></div>
    <div style="margin-left:16px"><screen></screen></div>
    <div style="margin-left:16px">
      <user-market @apostropheReturn="popupHandle" @usmarIconReturn="skipShareHandle" @skipMarketRetuen="skipMarketHandle"
      v-for="(item,index) in dataArr" :key="index" :dataArr="item">
      </user-market>
      </div>
    <div style="margin-left:16px"><van-popup v-model="show" position="bottom" :close-on-click-overlay="false" overlay>
        <ul>
          <li>续费（08/17到期）</li>
          <li>大师推荐</li>
          <li>普通推荐</li>
          <li @click="stickHandle">取消置顶</li>
          <li @click="exhibitionHandle">开启楼盘展示</li>
          <li @click="closeHandle">取消</li>
        </ul>
    </van-popup></div>
  </div>
</template>
<script>
import { Dialog } from 'vant';
import MasterMarket from 'COMP/User/MasterMarket/'
import TitleBar from 'COMP/TitleBar/arrow.vue'
import VanSearch from 'COMP/VanSearch/'
import Screen from 'COMP/Screen/'
import UserMarket from 'COMP/User/UserMarket/'
export default {
  components:{
    MasterMarket,
    TitleBar,
    VanSearch,
    Screen,
    UserMarket
  },
  data:()=>({
    show:false,
   titleInfo:{
     title:"我的楼盘",
     linkText:"切换关闭展示楼盘",
     link:""
   },
   searchInfo:{
     siteText:"全国",
     placeholderText:"请输入楼盘"
   },
   dataArr:[
     {title:"龙光·久钻",site:"深圳 南山 120000元/㎡", condition:["热销中","地铁房","低密度"],open:"125次开通 11/22到期",flag:true,price:"1%+5万元/套"},
     {title:"龙光·久钻",site:"深圳 南山 120000元/㎡", condition:["热销中","地铁房","低密度"],open:"125次开通 11/22到期",flag:true,price:"1%+5万元/套"},
     {title:"龙光·久钻",site:"深圳 南山 120000元/㎡", condition:["热销中","地铁房","低密度"],open:"125次开通 11/22到期",flag:true,price:"1%+5万元/套"},
     {title:"龙光·久钻",site:"深圳 南山 120000元/㎡", condition:["热销中","地铁房","低密度"],open:"125次开通 11/22到期",flag:true,price:"1%+5万元/套"}
   ]
  }),
  methods:{
    popupHandle(){
      this.show=!this.show
    },
    closeHandle(){
      this.show=!this.show
    },
    stickHandle(){
      Dialog.confirm({
        title: '是否确定关闭该楼盘名片展示',
        message: '关闭该楼盘展示将取消推荐和置顶状态'
      }).then(() => {
        // on confirm
        console.log("确uerren")
      }).catch(() => {
        // on cancel
         console.log("取消")
      });
          },
    exhibitionHandle(){
      Dialog.confirm({
        title: '是否确定关闭该楼盘名片展示',
        message: '关闭该楼盘展示将取消推荐和置顶状态'
      }).then(() => {
        // on confirm
      }).catch(() => {
        // on cancel
      });
    },
    skipShareHandle(){
      this.$router.push('/marketDetail/share')
    },
    skipMarketHandle(){
      this.$router.push('/market/marketDetail')
    }
  }
}
</script>
<style lang="less">
.user-mymarket-page{
  height:auto !important;
      background: #ffffff;
  // > div{
  //   width:343px;
  // }
  .title-bar,.van-search-page{
    width:343px;
  }
  .van-popup--bottom{
    height:316px;
    background:rgba(255,255,255,1);
    ul{
      li{
        width:375px;
        height:50px;
        line-height:50px;
        text-align:center;
        font-size:16px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
      }
      li:nth-of-type(2){
        border-bottom:1px solid #EEEEEE;
      }
      li:nth-of-type(4){
        border-bottom:1px solid #EEEEEE;
        color:rgba(234,77,46,1);
      }
      li:last-of-type{
        border-top:6px solid #E8E8E8;
      }
    }
  }
  .van-modal{
    width:100%;
  }
  .user-mymarket-page-search{
    height:44px;
  }
}
.van-dialog{
          width:280px;
          height:168px;
          background:rgba(255,255,255,1);
          border-radius:12px;
          display: flex;
          flex-direction: column;
          .van-dialog__header{
            font-size:18px;
            font-family:PingFangSC-Medium;
            font-weight:600;
            color:rgba(51,51,51,1);
            padding-top:26px;
          }
          .van-dialog__message--has-title{
            font-size:15px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            text-align: center;
            width:203px;
            padding:0;
            margin:9px 0 15px 35px; 
          }
          .van-dialog__footer--buttons{
            flex:1;
            .van-hairline--left{
            color:rgba(0,122,230,1);
             }
          }
        }
</style>
