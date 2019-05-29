<template>
<div class="house-activity-detail-box">
  <div class="house-activity-detail" v-if="info">
    <div class="pic">
      <img :src="info.imgUrl" alt="">
    </div>
    <div class="activity-info">
      <p>活动时间：{{info.beginTime}}-{{info.endTime}} </p>
      <p>礼品数量：{{info.num}}份 </p>
      <p>礼品领取地点：{{info.province}}{{info.city}}{{info.county}}{{info.address}}</p>
    </div>
    <div class="activity-rule">
      <h3>活动规则</h3>
      <p v-for="(item,index) in remarksList" :key="index">{{index + 1}}、{{item}}</p>
      <!-- <p>1、请在结账前出示此卡； </p>
      <p>2、此卡可享受会员优惠待遇；</p> 
      <p>3、此卡不得购买产品，不得与其它优惠同时使用； </p>
      <p>4、此卡一经售出，概不兑现。如有遗失，请及时挂失；</p> 
      <p>5、本店保留此卡法律范围内的最终解释权。</p> -->
    </div>
    <div class="tips">
      <img src="../../../assets/img/market/tips.png" alt=""> 说明：如需领取该礼品，请前往AW大师小程序端进行领取！
    </div>
  </div>
  <div class="nodata" v-show="nodata">
    <img src="../../../assets/img/market/comment/nodata.png" alt="">
    <p>没有查询到相关活动！</p> 
  </div>
</div>
</template>

<script>
import marketService from 'SERVICE/marketService'
export default {
  data () {
    return {
      linkerId: '',
      info: '',
      remarksList: [],
      nodata: false
    }
  },
  created () {
    document.title = this.$route.query.name || '活动详情'
    this.linkerId = this.$route.query.linkerId
    this.getActivityDetail()
  },
  methods: {
    getActivityDetail () {
      marketService.getActivityDetail({linkerId: this.linkerId}).then(res => {
        if (res) {
          this.info = res
          this.remarksList = res.remarks.split('\n')
        } else {
          this.nodata = true
        }
      }).catch()
    }
  }
}
</script>

<style lang="less" scoped>
.house-activity-detail{
  padding: 20px 16px;
  .pic{
    max-height: 440px;
    overflow: hidden;
    border-radius: 6px;
    margin-bottom: 30px;
    img{
      width: 100%;
      border-radius: 6px;
      object-fit: contain;
    }
  }
  .activity-info{
    font-size:14px;
    font-weight:400;
    color: #666;
    line-height: 28px;
  }
  .activity-rule{
    color: #666;
    font-size:14px;
    font-weight:400;
    line-height: 24px;
    margin-top: 16px;
    h3{
      font-size:20px;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:28px;
      margin-bottom: 10px;
    }
  }
  .tips{
    margin: 26px 0;
    font-size:12px;
    font-weight:400;
    color:rgba(187,187,187,1);
    line-height:14px;
    vertical-align: middle;
    line-height:14px;
    img{
      width: 12px;
      height: 13px;
      margin-right: 2px;
      vertical-align: middle;
    }
  }
}
.nodata{
    height: 400px;
    color: #999;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 12px;
    img{
      width: 88px;
    }
  }
</style>
