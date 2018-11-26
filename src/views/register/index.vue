<template>
  <div class="register-page">
    <div class="bg_img top-container" :style="{backgroundImage:'url(' + bgImg + ')'}"></div>
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
    ]
  })
}
</script>
<style lang="less">
.register-page {
  .top-container {
    width: 101%;
    height: 600px;
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
      margin-top: -50px;
    }
    .items-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .item {
        width: 40%;
        margin-bottom: 10px;
        line-height: 1;
        > div {
          display: inline-block;
          width: 48px;
          height: 48px;
        }
        > h5 {
          font-size: 14px;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
        }
        > p {
          width: 80%;
          margin: 0 10%;
          text-align: left;
          font-size: 12px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
  }
}
</style>
