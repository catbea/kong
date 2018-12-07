<template>
  <div class="mymarket-page">
    <div class="master-market-box">
      <p class="master-recommend">大师推荐</p>
      <div class="vanSWipe-box">
        <p class="bg_img icon-cancel" :style="{backgroundImage:'url('+img+')'}"></p>
      <van-swipe :touchable="true" :loop="true" :autoplay="3000">
        <van-swipe-item>
          <div class="master-box">
          <div class="bg_img master-item" :style="{backgroundImage:'url(https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2868602830,597618051&fm=27&gp=0.jpg)'}">
          </div>
          <ol>
            <li>它</li>
            <li>湖景地产、品牌房企</li>
            <li>深圳市 <span>7,323</span> 人关注了它</li>
          </ol>
          </div>
        </van-swipe-item>
        <van-swipe-item v-for="(item,index) in list" :key="index">
          <div class="img-item" :style="{backgroundImage:'url(https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2868602830,597618051&fm=27&gp=0.jpg)'}">
            <ul>
              <li>新亚洲花园</li>
              <li>湖景地产、品牌房企</li>
              <li>深圳市南山区 125 人开通 <span>120000元/㎡</span></li>
            </ul>
          </div>
        </van-swipe-item>
      </van-swipe>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data:()=>({
    list:[1,2,3,4],
    img:require('IMG/user/Combined Shape@2x.png')
  }),
}
</script>
<style lang="less">
.mymarket-page{
  .master-market-box{
    display:flex;
    flex-direction: column;
    width:343px;
    height:274px;
    .vanSWipe-box{
      position: relative;
      .icon-cancel{
        position: absolute;
        right:7px;
        top:8px;
        width:17px;
        height:17px;
        margin:0;
        z-index:11;
      }
    }
    .van-swipe{
      border-radius:10px;
    }
    .master-recommend{
      margin:18px 0 15px 0;
      font-size:20px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:rgba(51,51,51,1);
      line-height:28px;
    }
    .master-box{
      position: relative;
      .master-item{
      width:343px;
      height:193px;
      filter:blur(6px);
      }
      ol{
        position:absolute;
        left:19px;
        bottom:29px;
        li:nth-child(1){
          font-size:16px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:22px;
        }
        li:nth-child(2){
          margin:3px 0 4px 0;
          font-size:24px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:rgba(255,255,255,1);
          line-height:33px;
        }
        li:nth-child(3){
          font-size:14px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:20px;
        }
      }
    }
    .img-item{
      width:343px;
      height:193px;
      border-radius:10px;
      ul{
        position:absolute;
        left:19px;
        bottom:29px;
        li:nth-child(1){
          font-size:16px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:22px;
        }
        li:nth-child(2){
          font-size:24px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:rgba(255,255,255,1);
          line-height:33px;
          margin-bottom:4px;
        }
        li:nth-child(3){
          font-size:14px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:20px;
          span{
            font-size:12px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:15px;
          }
        }
      }
    }
  }
}
</style>
