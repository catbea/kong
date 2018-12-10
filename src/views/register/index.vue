<template>
  <div class="register-page">
    <div class="bg_img top-container" :style="{backgroundImage:'url(' + bgImg + ')'}">
      <router-link :to="params">
        <div class="reg-btn">立即注册</div>
      </router-link>
    </div>
    <div class="info-container">
      <h5>我们是AW大师</h5>
      <div class="bottom-line"></div>
      <div class="items-container">
        <div class="item" v-for="info in data" :key="info.title">
          <div class="bg_img" :style="{backgroundImage:'url(' + info.icon + ')'}" />
          <h5>{{info.title}}</h5>
          <p>{{info.desc}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data: () => ({
    bgImg: require('IMG/register/registerBg@2.png'),
    data: [
      { title: '实拍全景', desc: '高保真分享不错过任何细节', icon: require('IMG/register/regIcon1.png') },
      { title: '提高转化率', desc: '改变传统分享被踢出群的尴尬', icon: require('IMG/register/regIcon2.png') },
      { title: '实时跟进', desc: '在合适的时间合适的地点做合适的事', icon: require('IMG/register/regIcon3.png') },
      { title: '大数据分析', desc: '分析客户真实购房需求, 快速形成用户标签', icon: require('IMG/register/regIcon4.png') },
      { title: '200万用户', desc: '与200万AW大师并肩作战', icon: require('IMG/register/regIcon5.png') },
      { title: '2元试用', desc: '您与快速成交的工具 只差两元', icon: require('IMG/register/regIcon6.png') }
    ],
    params: null,
    query: null
  }),
  created() {
    this.query = this.$route.query
    console.log(this.query)
    // 10：经纪人推荐注册，20：分销商推荐注册,30:普通注册 （搜一搜跳转注册，公众号跳转注册，用户端小程序切换注册）
    if (this.query.registerType == '30') {
      this.params = `/register/step1?${qs.stringify(this.$route.query)}`
    } else {
      this.params = `/register/step3?${qs.stringify(this.$route.query)}`
    }
  }
}
</script>
<style lang="less">
.register-page {
  .top-container {
    position: relative;
    width: 101%;
    height: 600px;
    .reg-btn {
      position: absolute;
      width: 275px;
      height: 45px;
      border-radius: 6px;
      border: 1px solid #fff;
      color: #fff;
      font-size: 16px;
      line-height: 45px;
      text-align: center;
      top: 515px;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .info-container {
    padding-top: 30px;
    text-align: center;
    > h5 {
      line-height: 1;
      font-size: 24px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      margin-bottom: -20px;
      padding-left: 10px;
    }
    .bottom-line {
      display: inline-block;
      width: 40px;
      height: 3px;
      background: rgba(0, 122, 230, 1);
      border-radius: 2px;
      margin-top: 25px;
    }
    .items-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .item {
        width: 40%;
        margin-bottom: 30px;
        line-height: 1;
        > div {
          display: inline-block;
          width: 48px;
          height: 48px;
        }
        > h5 {
          font-size: 14px;
          line-height: 1.5;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
        }
        > p {
          width: 80%;
          margin: 0 10%;
          font-size: 12px;
          line-height: 1.3;
          font-weight: 400;
          color: rgba(102, 102, 102, 0.85);
        }
      }
    }
  }
}
</style>
