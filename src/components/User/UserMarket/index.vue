<template>
  <div class="user-market-page">
    <div class="user-market-page-box" @click="skipMarketRetuen">
      <div class="user-market-page-box-top">
        <div class="user-market-page-box-top-left bg_img" :style="{backgroundImage:'url(https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=3754147596,1105498386&fm=85&s=9A7C7F878A976EDCE0B6A6270300304F)'}">
          <p class="icon-discount">9.9折</p>
          <span class="bg_img icon-play" 
          :style="{backgroundImage:'url('+imgPlay+')'}"></span>
        </div>
        <ul>
          <li>
           <div style="display:flex;"> {{dataArr.title}} 
             <span class="stick" v-if="dataArr.flag">置顶</span>
             </div>
           <span class="bg_img icon-share" @click.stop="usmarIconReturn" :style="{backgroundImage:'url('+imgShare+')'}"></span>
          </li>
          <li>
            {{dataArr.site}}
          </li>
          <li>
            <tag-group :arr="dataArr.condition"></tag-group>
          </li>
          <li>{{dataArr.open}}
            <div class="apostrophe" @click.stop="apostropheReturn">
              <span></span>
              <span></span>
              <span></span>
            </div> 
          </li>
        </ul>
      </div>
      <div class="user-market-page-box-bottom" v-if="dataArr.price">
        <img class="bg_img" :src="imgCommission" alt="" srcset="">
        {{dataArr.price}}
      </div>
    </div>
  </div>
</template>
<script>
import TagGroup from 'COMP/TagGroup/'
export default {
  components:{
    TagGroup
  },
  data:()=>({
    imgShare:require('IMG/user/rectangle.png'),
    imgPlay:require('IMG/user/Oval@2x.png'),
    imgCommission:require('IMG/user/collection/Rectangle@2x.png')
  }),
  props:{
    dataArr:{
      type:Object
    }
  },
  methods:{
    apostropheReturn(){
      this.$emit("apostropheReturn",1)
    },
    usmarIconReturn(){
      this.$emit("usmarIconReturn",1)
    },
    skipMarketRetuen(){
      this.$emit("skipMarketRetuen",1)
    }
  }
}
</script>
<style lang="less">
.user-market-page{
  margin-left:16px;
  display: flex;
 .user-market-page-box{
   margin-top:16px;
   padding: 16px 16px 0 16px;
  width:311px;
  box-shadow:0px 3px 6px 0px rgba(58,76,130,0.07),0px 2px 17px 0px rgba(34,47,85,0.05);
  border-radius:10px;
  display: flex;
  flex-direction: column;
  .user-market-page-box-top{
    display: flex;
    margin-bottom:16px;
    .user-market-page-box-top-left{
      width:120px;
      height:90px;
      margin-right:10px;
      position: relative;
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
        background:rgba(234,77,46,1);
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
        justify-content: space-between;
        .stick{
          width:30px;
          height:13px;
          border-radius:2px;
          border:1px solid;
          font-size:10px;
          // transform:scale(0.84);
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(0,122,230,1);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left:4px;
        }
        .icon-share{
          width:16px;
          height:16px;
        }
      }
      li:nth-of-type(2){
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:15px;
        margin:10px 0 10px 0;
      }
      li:nth-of-type(3){
        height:15px;
      }
      li:nth-of-type(4){
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:11px;
        margin-top:12px;
        display: flex;
        justify-content: space-between;
        .apostrophe{
          width:20px;
          display: flex;
          justify-content: space-between;
          span{
            width:4px;
            height:4px;
            border-radius:50%;
            background:rgba(158,158,158,1);
          }
        }
      }
    }
  }
  .user-market-page-box-bottom{
    width:311px;
    height:39px;
    display: flex;
    align-items: center;
    background:rgba(247,249,250,1);
    border-radius:4px;
    font-size:13px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(102,102,102,1);
    margin-bottom:16px;
    img{
      margin:0 8px;
      width:16px;
      height:16px;
    }
  }
 }
}
</style>
