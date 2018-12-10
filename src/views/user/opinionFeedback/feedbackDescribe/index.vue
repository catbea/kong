<template>
  <div class="feedback-describe-page">
    <ul>
      <li>
        <p>问题描述</p> 
        <textarea :disabled="false" v-bind:maxlength="500" @input="descArea" v-model="introduct" name="abstract" id="abstract" placeholder="请填写问题描述以便我们提供更好的帮助"></textarea>
        <span class="num-desc">{{Surplus}}</span>
      </li>
      <li>
        <p>上传图片</p>
        <p>提供问题截图（{{num}}/3）</p>
        <div class="centent">
         <div class="head-img bg_img" v-for="(item,index) in list" :style="{backgroundImage:'url('+item+')'}" :key="index">
            <span class="bg_img" :style="{backgroundImage:'url('+cancelImg+')'}" @click="taget(index)"></span>
          </div>
        <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple class="bg_img" :style="{backgroundImage:'url('+photoImg+')'}">
        </van-uploader>
        </div> 
      </li>
      <li>
        <p>联系方式</p>
        <p>请填写可以联系到您的联系方式</p>
        <form action="" method="post">
        <input type="number" placeholder="QQ号码" name="QQnumber">
        <input type="number" placeholder="手机号码" name="phoneNumber">
        <button type="button">提交</button>
        </form>
        <!-- <iframe id="id_iframe" name="nm_iframe" style="display:none;"></iframe> -->
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data: () => ({
    Surplus: 500,
    introduct: '',
    photoImg: require('IMG/user/photo@2x.png'),
    cancelImg: require('IMG/user/cancel@2x.png'),
    list: [],
    num: 0
  }),
  methods: {
    descArea() {
      var textVal = this.introduct.length
      this.Surplus = 500 - textVal
    },
    onRead(file) {
      console.log(file)
      //将原图片显示为选择的图片
      //  this.$refs.goodsImg.src = file.content;
      if (this.list.length < 3) {
        this.list.push(file.content)
        this.num = this.list.length
        console.log(this.num)
      } else {
        this.$toast('最多上传三张图片')
        return
      }
    },
    taget(index) {
      this.list.splice(index, 1)
      this.num = this.list.length
    }
  },
  computed: {}
}
</script>
<style lang="less">
.feedback-describe-page {
  ul {
    width: 343px;
    margin-left: 16px;
    margin-top: 21px;
    li {
      display: flex;
      flex-direction: column;
      p:nth-child(1) {
        font-size: 20px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;
      }
      p:nth-child(2) {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 17px;
      }
    }
    li:nth-child(1) {
      position: relative;
      textarea {
        height: 50px;
        border: none;
        margin-top: 25px;
      }
      textarea::-webkit-input-placeholder {
        color: rgba(187, 187, 187, 1);
        font-size: 14px;
      }
      textarea::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: rgba(187, 187, 187, 1);
        font-size: 14px;
      }
      textarea:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: rgba(187, 187, 187, 1);
        font-size: 14px;
      }
      textarea:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: rgba(187, 187, 187, 1);
        font-size: 14px;
      }
      .num-desc {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    li:nth-child(2) {
      .centent {
        display: flex;
        flex-wrap: wrap;
      }
      .van-uploader {
        width: 100px;
        height: 100px;
        margin-top: 18px;
      }
      .head-img {
        width: 100px;
        height: 100px;
        margin: 18px 12px 0 0;
        position: relative;
        display: flex;
        span {
          width: 18px;
          height: 18px;
          position: absolute;
          top: -7px;
          right: -7px;
        }
      }
    }
    li:nth-child(3) {
      margin-top: 39px;
      input {
        width: 100%;
        height: 62px;
        border: none;
        border-bottom: 1px solid #eeeeee;
      }
      input::-webkit-input-placeholder {
        color: rgba(187, 187, 187, 1);
        font-size: 16px;
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: rgba(187, 187, 187, 1);
        font-size: 16px;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: rgba(187, 187, 187, 1);
        font-size: 16px;
      }
      input:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: rgba(187, 187, 187, 1);
        font-size: 16px;
      }
      button {
        width: 100%;
        height: 44px;
        border: none;
        margin-top: 20px;
        background: rgba(0, 122, 230, 1);
        border-radius: 6px;
        color: rgba(255, 255, 255, 1);
        font-size: 16px;
      }
    }
  }
}
</style>
