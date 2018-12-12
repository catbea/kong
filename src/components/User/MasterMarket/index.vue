<template>
  <div class="mymarket-page">
    <div class="master-market-box">
      <p class="master-recommend">大师推荐</p>
      <div class="vanSWipe-box">
       <div class="bg_img hint" v-if="!swipeShow" :style="{backgroundImage:'url('+hintImg+')'}">
        <span>您还没有任何推荐楼盘</span> 
        </div>
        <van-swipe
          :touchable="true"
          :loop="true"
          :autoplay="3000"
          v-if="swipeShow"
        >
          <van-swipe-item
            v-for="(item,index) in limitList"
            :key="index"
          >
            <div class="master-box">
              <p
                class="bg_img icon-cancel"
                :style="{backgroundImage:'url('+img+')'}"
                @click.stop="closeHandle(item.linkerId,index)"
              ></p>
              <div
                :class="{dim:item.masterRecommand==1}"
                class="bg_img master-item"
                :style="{backgroundImage:'url('+item.linkerUrl+')'}"
              >
              </div>
              <ol>
                <li>{{item.linkerName}}</li>
                <li>{{item.linkerTags | linkerTags}}</li>
                <li>{{item.city}}{{item.county}} <span>{{item.scanTimes}}</span> 人关注了它</li>
              </ol>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </div>
</template>
<script>
import userService from 'SERVICE/userService'
export default {
  created() {
    if(this.swipeList.length==0){
      this.swipeShow=false
    }else{
      this.swipeShow=true
    }
  },
  props: {
    swipeList: {
      type: Array
    }
  },
  data: () => ({
    masterSave: null,
    img: require('IMG/user/Combined Shape@2x.png'),
    swipeShow:false,
    hintImg:require('IMG/dev/timg.jpg')
  }),
  methods: {
    async closeHandle(linkerId,index){
     await userService.changeMarketData(linkerId,20,0)
     this.swipeList.splice(index,1)
    },
  },
  computed:{
    limitList(){
      if(this.swipeList.length>5){
       return this.swipeList.slice(0,5)
      }else{
        return this.swipeList
      }
    }
  }
}
</script>
<style lang="less">
.mymarket-page {
  .master-market-box {
    display: flex;
    flex-direction: column;
    width: 343px;
    height: 274px;
    .vanSWipe-box {
      width: 343px;
    height: 194px;
      .hint{
        width:100%;
        height:100%;
        font-size:15px;
      position: relative;
      opacity:0.5;
      span{
        position:absolute;
        color:#FFFFFF;
        top:50%;
        left:50%;
        margin-left:-70px;
      }
      }
      .dim{
        filter: blur(6px);
      }
      .icon-cancel {
        position: absolute;
        right: 7px;
        top: 8px;
        width: 17px;
        height: 17px;
        margin: 0;
        z-index: 11;
      }
    }
    .van-swipe {
      border-radius: 10px;
    }
    .master-recommend {
      margin: 18px 0 15px 0;
      font-size: 20px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
    }
    .master-box {
      position: relative;
      .master-item {
        width: 343px;
        height: 193px;
      }
      ol {
        position: absolute;
        left: 19px;
        bottom: 29px;
        li:nth-child(1) {
          font-size: 16px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 22px;
        }
        li:nth-child(2) {
          width: 300px;
          margin: 3px 0 4px 0;
          font-size: 24px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 33px;
        }
        li:nth-child(3) {
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 20px;
        }
      }
    }
    .img-item {
      width: 343px;
      height: 193px;
      border-radius: 10px;
      ul {
        position: absolute;
        left: 19px;
        bottom: 29px;
        li:nth-child(1) {
          font-size: 16px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 22px;
        }
        li:nth-child(2) {
          width: 300px;
          font-size: 24px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 33px;
          margin-bottom: 4px;
        }
        li:nth-child(3) {
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 20px;
          span {
            font-size: 12px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 15px;
          }
        }
      }
    }
  }
}
</style>
