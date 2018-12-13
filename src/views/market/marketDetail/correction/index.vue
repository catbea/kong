<template>
  <div class="market-detail-correction-page">
    <p>请选择错误类型</p>
    <div class="market-detail-correction-page-top">
    <ul>
      <li v-for="(item,index) in optionList" :key="index" @click="taget(index,item.item_code)">
        {{item.item_name}} <span :class="{active:activeIndex==index}"></span>
      </li>
    </ul>
    </div>
    <p>反馈内容</p>
   <form action="">
    <textarea v-bind:maxlength="50" @input="descArea" v-model="introduct" name="abstract" id="abstract" placeholder="请具体描述错误内容"></textarea>
  
   </form>
   <p class="num-desc">{{Surplus}}/50</p>
   <div class="submit-button" @click="submitCorrectionInfo">确定提交</div>
  </div>
</template>
<script>
import { Dialog,Toast } from 'vant'
import marketService from 'SERVICE/marketService'
export default {
  created() {
    this.getCorrectionInfo()
    this.linkerId=this.$route.params.id
    console.log(this.linkerId)
  },
  data: () => ({
    activeIndex:null,
    Surplus: 50,
    introduct: '',
    backImg: require('IMG/correction/color.png'),
    optionList:['价格错误','位置错误','开盘错误','预计交房错误','其他错误'],
    linkerId:null,
    errorType:null,
    content:null,
    appType:'2'
  }),
  methods: {
    taget(index,code) {
      this.activeIndex =index
      this.errorType=code
    },
    descArea() {
      var textVal = this.introduct.length
      this.Surplus = 50 - textVal
    },
    async getCorrectionInfo() {//渲染显示的选项
      const res = await marketService.getCorrection()
      this.optionList=res
    },
    async submitCorrectionInfo() {//提交纠错内容
    console.log(this.linkerId,this.errorType,this.introduct,this.appType,2222222)
     let res= await marketService.submitCorrection(this.linkerId,this.errorType,this.introduct,this.appType)
      console.log(res,'提交数据')
      this.verify()
      this.introduct=''
    },
    verify(){//验证
    if(this.introduct===''&&this.errorType===null){
      Toast('请填写错误类型和内容')
    }else if(this.introduct===''){
      Toast('请填写内容')
    }else if(this.errorType===null){
      Toast('请填写错误类型')
    }else{
      Dialog.alert({
        message: '提交成功，我们将尽快跟进处理反馈内容',
        className:'error-correction',
        confirmButtonText:'知道了'
      }).then(() => {
        // on close
      });
    }
  }
}
}
</script>
<style lang="less">
.error-correction{
  // height:auto;
  width:270px;
  .van-dialog__content{
    text-align: center;
  }
  .van-button--default{
    border-top:1px solid #999999;
  }
}
.market-detail-correction-page {
  width: 100%;
  height: 100%;
  background: rgba(247, 249, 250, 1);
  p:nth-of-type(1),
  p:nth-of-type(2) {
    height: 45px;
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 45px;
    background: rgba(247, 249, 250, 1);
    margin-left: 15px;
  }
  .market-detail-correction-page-top {
    background: rgba(255, 255, 255, 1);
    ul {
      li {
        display: flex;
        justify-content: space-between;
        margin-left: 15px;
        width: 345px;
        height: 56px;
        padding: 17px 0;
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
        .active {
          // background: blue;
          background: url('../../../../assets/img/correction/color.png') no-repeat;
          background-size: 100% 100%;
        }
        span {
          width: 22px;
          height: 22px;
          border: 1px solid #eeeeee;
          border-radius: 50%;
        }
      }
    }
  }
  textarea {
    height: 110px;
    width: 360px;
    font-size: 14px;
    border: none;
  }
  textarea {
    padding: 10px 0 0 15px;
  }
  textarea::-webkit-input-placeholder {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(150, 158, 168, 1);
  }
  textarea:-moz-placeholder {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(150, 158, 168, 1);
  }
  textarea:-ms-input-placeholder {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(150, 158, 168, 1);
  }
  .num-desc {
    font-size: 12px;
    text-align: right;
  }
  .submit-button {
    margin-top: 45px;
    margin-left: 16px;
    width: 343px;
    height: 44px;
    background: rgba(0, 122, 230, 1);
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
