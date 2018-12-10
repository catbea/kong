<template>
  <div class="mymarket-page">
    <div class="master-market-box">
      <p class="master-recommend">大师推荐</p>
      <div class="vanSWipe-box">
        <p
          class="bg_img icon-cancel"
          :style="{backgroundImage:'url('+img+')'}"
          @click="closeHandle"
        ></p>
        <van-swipe
          :touchable="true"
          :loop="true"
          :autoplay="3000"
        >
          <van-swipe-item
            v-for="(itemMarster,indexMarster) in marster"
            :key="indexMarster"
          >
            <div class="master-box">
              <div
                class="bg_img master-item"
                :style="{backgroundImage:'url(https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2868602830,597618051&fm=27&gp=0.jpg)'}"
              >
              </div>
              <ol>
                <li>{{itemMarster.linkerName}}</li>
                <li>{{itemMarster.linkerTags}}</li>
                <li>{{itemMarster.city}}{{itemMarster.county}} <span>{{itemMarster.scanTimes}}</span> 人关注了它</li>
              </ol>
            </div>
          </van-swipe-item>
          <van-swipe-item
            v-for="(itemCommon,indexCommon) in common"
            :key="indexCommon"
          >
            <div
              class="img-item"
              :style="{backgroundImage:'url(https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2868602830,597618051&fm=27&gp=0.jpg)'}"
            >
              <ul>
                <li>{{itemCommon.linkerName}}</li>
                <li>{{itemCommon.linkerTags}}</li>
                <li>{{itemCommon.city}}{{itemCommon.county}} {{itemCommon.openTimes}} 人开通 <span>{{itemCommon.price}}{{itemCommon.priceUnit}}</span></li>
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
  created () {
    this.dataLength()
  },
  props: {
    marster: {
      type: Array
    },
    common: {
      type: Array
    }
  },
  data: () => ({
    list: [1, 2, 3, 4],
    masterSave: null,
    img: require('IMG/user/Combined Shape@2x.png')
  }),
  methods: {
    closeHandle(){
      this.$emit('returnCloseHandle',1)
      
    },
    dataLength() {
      let arrLength = this.marster.length+this.common.length
      if(arrLength>5){
        // console.log('大于5')
        // console.log(this.marster.length,this.common.length)
        if(this.common.length>0){
          const commonLength = arrLength-5
            this.common.splice(0,commonLength)
        }else{
         const spliceLength=arrLength-5
          this.marster.splice(0,spliceLength)
        }
      }
      }
  },
  watch: {
    marster: {
      handler (val) {     
        for (let i = 0; i < val.length; i++) {
          let temp = val[i]
          temp.linkerTags = temp.linkerTags === '' ? false : temp.linkerTags.join('、')
        }
        // this.masterSave = val
      },
      deep: true
    },
    common: {
      handler (val) {     
       for (let i = 0; i < val.length; i++) {
          let temp = val[i]
          temp.linkerTags = temp.linkerTags === '' ? false : temp.linkerTags.join('、')
        }
        // this.masterSave = val
      },
      deep: true
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
      position: relative;
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
        filter: blur(6px);
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
