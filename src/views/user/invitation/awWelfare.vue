<template>
  <div>
    <div class="bg_img awWelfare-bg" :style="{'backgroundImage':'url('+bgCombinedShapeIcon+')'}">
      <div class="awWelfare-botton">
        <div class="awWelfare-botton-item">
          <!-- <router-link to="/me/teammateList"> -->
           <img :src="awtipsIcon" @click="goteammateList">
          <!-- </router-link> -->
        </div>
        <button @click="show1 = true" class="awWelfare-botton-item">
          <img :src="awtips1Icon">
        </button>
      </div>
      <div class="awWelfare-center" :style="{'backgroundImage':'url('+awbgcardIcon+')'}">
        <!-- v-if="invitationImg" -->
        <div class="qrcode" ref="qrCodeUrl"></div>
          <div class="awWelfare-info">
            <div class="awWelfare-info-left">
              <img :src="userInfo.avatarUrl?userInfo.avatarUrl:userEditIcon" class="info-left-icon">
            </div>
             <div class="awWelfare-info-right">
              <p class="awWelfare-info-right-name">{{userInfo.name}}</p>
              <p class="awWelfare-info-right-remak">邀请你加入AW大师</p>
            </div>
          </div>
      </div>
      
      <div class="awWelfare-text">
        请长按保存邀请图片
      </div>
    </div>
   
    <popup v-model="show1" position="center"  masker-opacity="0.6" :close-on-click-overlay="false">
      <div class="register-rule-box" :style="{'backgroundImage':'url('+teammatBack+')'}">
        <div class="register-rule-box-name">活动规则</div>
        <div class="register-rule-box-content">

          <div  class="register-rule-box-title">邀请注册</div>
          <div class="register-rule-box-text">
            <div class="register-rule-box-text-item" v-if="item" v-for="(item,key) in registrationRules" :key="key"><div class="div-dian">•</div><div>{{item}}</div></div>
          </div>
          <div class="register-rule-box-title">邀请开通</div>
          <div class="register-rule-box-text">
            <div class="register-rule-box-text-item"  v-if="item" v-for="(item,key) in openRules" :key="key"><div class="div-dian">•</div><div>{{item}}</div></div>
          </div>
          <div  class="register-rule-box-footer">
            <p>本活动最终解释权归</p>
            <p>深圳尊豪网络科技股份有限公司所有</p>
          </div>
        </div>
      </div>
      <button class="register-rule-box-close" @click="show1 = false">
        <img :src="awbocloseIcon">
      </button>
    </popup>
  </div>
</template>

<script>
import QRcode from 'qrcodejs2'
import { Popup } from 'vant'
import userService from 'SERVICE/userService'
import { mapGetters } from 'vuex'
export default {
  components:{
    Popup,
  },
  data() {
    return {
      bgCombinedShapeIcon: require('IMG/user/invitation/bgCombinedShape@2x.png'),
      awtipsIcon: require('IMG/user/invitation/aw-tips@2x.png'),
      awtips1Icon: require('IMG/user/invitation/aw-tips1@2x.png'),
      awbocloseIcon: require('IMG/user/invitation/aw-box-close.png'),
      awbgcardIcon: require('IMG/user/invitation/aw-bgcard@2x.png'),
      teammatBack: require('IMG/user/invitation/aw-box-bg@2x.png'),
      // ovalIcon: require('IMG/edit/Oval@2x.png'),
      // ovalIcon: require('IMG/edit/Oval@2x.png'),
      show1: false,
      registrationRules:'',
      openRules:'',
      invitationUrl:'',
    }
  },
   computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    userInfo(v) {}
  },
  mounted() {
     this.goyInvitationUrlCode('http://jindo.dev.naver.com/collie')
    this.getrules()
   
  },
  methods: {
    goteammateList(){
       this.$router.push({name:'teammateList'})
    },
   
    async getrules(){
      const res = await userService.getrules(1);
      this.registrationRules = res.rule.split("#");
      console.log(this.registrationRules)

      const rest = await userService.getrules(2);
        this.openRules = rest.rule.split("#");
    },

    async getqueryInvitationUrl(){
    const res = await userService.getqueryInvitationUrl()
    this.invitationUrl = res.invitationUrl
    },
     async goyInvitationUrlCode (url) {
      debugger
        // let qrcode = new QRCode('qrcode', {
        //     width: 150, //图像宽度
        //     height: 150, //图像高度
        //     colorDark : "#000000", //前景色
        //     colorLight : "#ffffff", //背景色
        //     typeNumber:4, 
        //     correctLevel : QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
        // })
        // qrcode.clear() //清除二维码 
        // qrcode.makeCode(url) //生成另一个新的二维码

        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
            text: 'http://jindo.dev.naver.com/collie',
            width: 70,
            height: 70,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
      })


    }
  }
}
</script>

<style scoped lang="less">
.van-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    max-height: 100%;
    overflow-y: auto;
    -webkit-transition: .3s ease-out;
    transition: .3s ease-out;
    -webkit-overflow-scrolling: touch;
    -webkit-transform: translate3d(-50%,-50%,0);
    transform: translate3d(-50%,-50%,0);
    background-color: rgba(0,0,0,0);
     text-align: center;
}
.radius-border {
  position: relative;
}
// .radius-border:before{
//   .setBottomLine(#E6E6E6);
// }
.awWelfare-bg {
  width: 100%;
  /*height: auto;*/
  background-size: 100% 100%;
  /*min-height: 12.24rem;*/
  height: 100%;
  position: absolute;
  .awWelfare-botton {
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
    .awWelfare-botton-item {
      width: 46px;
      height: 60px;
      margin-right: 8px;
      padding: 0px;
      background-color: transparent;
      border: 0;
      img {
        width: 46px;
        height: 60px;
      }
    }
  }
  .awWelfare-center {
    width: 284px;
      height: 466px;
    margin: 0 auto;
    background-size: 284px 466px;
        position: relative;
    .awWelfare-info{
      padding: 34px 62px;
      position: absolute;
      bottom: 34px;
      display: flex;
      .awWelfare-info-left{
        .info-left-icon{
          width:40px;
          height:40px;
          border-radius: 50%;
        }
      }
      .awWelfare-info-right{
        margin-left: 12px;
        .awWelfare-info-right-name{
            font-size:14px;
            font-weight:300;
            color:rgba(251,199,172,1);
            line-height:19px;
        }
        .awWelfare-info-right-remak{
            font-size:11px;
            font-weight:300;
            color:rgba(251,199,172,1);
            line-height:15px;
        }
      }
    }
    // img {
    //   width: 284px;
    //   height: 466px;
    // }
  }
  .awWelfare-text {
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 20px;
  }
}
//弹出层
.register-rule-box {
  // background:url("../../../assets/images/aw-box-bg@2x.png");
  width: 280px;
  height: 387px;
  background-size: 280px 387px;
  color: rgba(161, 100, 78, 1);
  .register-rule-box-name {
    font-size: 18px;
    font-weight:600;
    color:rgba(244,226,191,1);
    line-height:39px;
    text-align: center;
  }
  .register-rule-box-content {
    overflow: scroll;
    // height: 7rem;
  }
  .register-rule-box-title {
    font-size:16px;
    font-weight:600;
    color:rgba(161,100,78,1);
    line-height:22px;
    text-align: left;
    padding-top: 14px;
    padding-left: 20px;
  }
  .register-rule-box-text {
    text-align: left;
    font-size:12px;
    font-weight:600;
    color:rgba(161,100,78,1);
    line-height:17px;
    padding: 0 25px;
    margin-top: 4px;
    .register-rule-box-text-item {
      display: flex;
      margin-bottom: 5px;
      .div-dian {
        margin-right: 15px;
      }
    }
  }
}
.register-rule-box-footer {
    font-size:10px;
    font-weight:400;
    color:rgba(161,100,78,1);
    line-height:16px;
    position: absolute;
    left: 15%;
    bottom: 107px;
}
.register-rule-box-close {
     background-color: transparent;
    border-radius: 0 0 0.16rem 0.16rem;
    margin-top: 40px;
    border: 0;
  img {
    width: 21px;
    height: 21px;
  }
}
.register-rule-box-close:active,
.register-rule-box-close:hover {
  background-color: transparent;
}
</style>
