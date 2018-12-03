<template>
  <div>
    <div class="bg_img awWelfare-bg" :style="{'backgroundImage':'url('+bgCombinedShapeIcon+')'}">
      <div class="awWelfare-botton">
        <div class="awWelfare-botton-item">
          <!-- <router-link to="/me/teammateList"> -->
           <img :src="awtipsIcon">
          <!-- </router-link> -->
        </div>
        <yd-button @click.native="show1 = true" class="awWelfare-botton-item">
          <img :src="awtips1Icon">
        </yd-button>
      </div>
      <div class="awWelfare-center">
        <!-- v-if="invitationImg" -->
          <img  :src="awbgcardIcon">
      </div>
      <div class="awWelfare-text">
        请长按保存邀请图片
      </div>
    </div>
    <!-- <yd-popup v-model="show1" position="center"  masker-opacity="0.6" close-on-masker>
      <div class="register-rule-box" >
        <div class="register-rule-box-name">活动规则</div>
        <div class="register-rule-box-content">

          <div style="padding-top: 0.45rem" class="register-rule-box-title">邀请注册</div>
          <div class="register-rule-box-text">
            <div class="register-rule-box-text-item" v-if="item" v-for="(item,key) in registrationRules" :key="key"><div class="div-dian">•</div><div>{{item}}</div></div>
          </div>
          <div class="register-rule-box-title">邀请开通</div>
          <div class="register-rule-box-text">
            <div class="register-rule-box-text-item"  v-if="item" v-for="(item,key) in openRules" :key="key"><div class="div-dian">•</div><div>{{item}}</div></div>
          </div>
          <div style="padding-top: 0.36rem" class="register-rule-box-footer">本活动最终解释权归</div>
          <div style="padding-bottom: 0.74rem"  class="register-rule-box-footer">深圳尊豪网络科技股份有限公司所有</div>
        </div>
      </div>
      <yd-button class="register-rule-box-close" @click.native="show1 = false">
        <img :src="awbocloseIcon">
      </yd-button>
    </yd-popup> -->
  </div>
</template>

<script>

  export default {

    data(){
      return{
        bgCombinedShapeIcon: require('IMG/user/bgCombinedShape@2x.png'),
        awtipsIcon: require('IMG/user/aw-tips@2x.png'),
        awtips1Icon: require('IMG/user/aw-tips1@2x.png'),
        awbocloseIcon: require('IMG/user/aw-box-close.png'),
        awbgcardIcon: require('IMG/user/aw-bgcard@2x.png'),
        // ovalIcon: require('IMG/edit/Oval@2x.png'),
        // ovalIcon: require('IMG/edit/Oval@2x.png'),
        // ovalIcon: require('IMG/edit/Oval@2x.png'),
        show1:false,
       
      }
    },
    mounted(){

    },
    methods:{}
  }
</script>

<style scoped lang="less">
  .radius-border{
    position: relative;
  }
  // .radius-border:before{
  //   .setBottomLine(#E6E6E6);
  // }
  .awWelfare-bg{
    width: 100%;
    /*height: auto;*/
    background-size: 100% 100%;
    /*min-height: 12.24rem;*/
    height: 100%;
    position: absolute;
    .awWelfare-botton{
      display: flex;
      justify-content: flex-end;
      margin-right: 0.14rem;
      .awWelfare-botton-item{
        width: 0.92rem;
        height: 1.20rem;
        margin-right: 0.08rem;
        padding: 0px;
        background-color: transparent;
        img{
          width: 0.92rem;
          height: 1.20rem;
        }
      }
    }
    .awWelfare-center{
      width: 5.68rem;
      height: 9.32rem;
      margin: 0 auto;
      img{
        width: 5.68rem;
        height: 9.32rem;
      }
    }
    .awWelfare-text{
      text-align: center;
      font-size:0.28rem;
      font-family:'PingFangSC-Regular';
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:0.40rem;
    }
  }
  .register-rule-box{
    // background:url("../../../assets/images/aw-box-bg@2x.png");
    width: 5.60rem;
    height: 7.74rem;
    background-size:5.60rem 7.74rem;
    color:rgba(161,100,78,1);
    .register-rule-box-name{
      font-size:0.36rem;
      font-family:'PingFangSC-Semibold';
      font-weight:600;
      color:rgba(244,226,191,1);
      line-height:0.7rem;
      text-align: center;
    }
    .register-rule-box-content{
      overflow: scroll;
      height: 7rem;
    }
    .register-rule-box-title{
      font-size:0.32rem;
      font-family:'PingFangSC-Semibold';
      font-weight:600;
      line-height:0.44rem;
      text-align: left;
      padding-top: 0.28rem;
      padding-left: 0.5rem;
    }
    .register-rule-box-text{
      text-align: left;
      font-size:0.24rem;
      font-family:'PingFangSC-Semibold';
      font-weight:600;
      line-height:0.34rem;
      padding: 0rem 0.5rem;
      margin-top: 0.08rem;
      .register-rule-box-text-item{
        display: flex;
        margin-bottom: 0.05rem;
        .div-dian{
          margin-right: 0.3rem;
        }
      }
    }
  }
  .register-rule-box-footer{
    font-size:0.20rem;
    font-family:'PingFangSC-Regular';
    font-weight:400;
    color:rgba(161,100,78,1);
    line-height:0.28rem;
  }
  .register-rule-box-close{
    background-color: transparent;
    width: 0.42rem;
    height: 0.42rem;
    margin-top: 0.8rem;
    img{
      width: 0.42rem;
      height: 0.42rem;

    }
  }
  .register-rule-box-close:active,.register-rule-box-close:hover{
    background-color: transparent;
  }
</style>
