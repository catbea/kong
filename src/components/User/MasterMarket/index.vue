<template>
  <div class="mymarket-page">
    <div class="master-market-box">
      <p>大师推荐</p>
      <van-swipe :touchable="true" :loop="true" :autoplay="3000">
        <van-swipe-item v-for="(item,index) in list" :key="index">
          <div class="img-item">
            <p class="bg_img icon-cancel" :style="{backgroundImage:'url('+img+')'}"></p>
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
    p{
      margin:18px 0 15px 0;
      font-size:20px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:rgba(51,51,51,1);
      line-height:28px;
    }
    .img-item{
      width:343px;
      height:193px;
      position: relative;
      border-radius:10px;
      background:red;
      position: relative;
      .icon-cancel{
        position: absolute;
        right:8px;
        top:8px;
        width:16px;
        height:16px;
        margin:0;
      }
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
