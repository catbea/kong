<template>
  <div class="family-list-page">
    <classify></classify>
    <div class="family-list-page-box">
      <div class="centent">
      <div class="big-box">
      <div class="family-list-page-box-left">

      </div>
      <ul class="family-list-page-box-center">
        <li>3室2厅1卫</li>
        <li>建面 120㎡ 南北朝向</li>
        <li>
          <tag-group :arr="info"></tag-group>
        </li>
        <li>约320万/套</li>
      </ul>
      </div>
      <div class="family-list-page-box-right">
        <p class="bg_img" :style="{backgroundImage:'url('+panorama+')'}"></p>
        <span class="bg_img" :style="{backgroundImage:'url('+leave+')'}"></span>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import Classify from 'COMP/Classify/'
import TagGroup from 'COMP/TagGroup/'
import marketService from 'SERVICE/marketService'
export default {
  components: {
    Classify,
    TagGroup
  },
  created() {
    this.getMarketDescribeInfo()
  },
  data:()=>({
    num:null,
    panorama:require('IMG/marketDetail/quanj@2x.png'),
    leave:require('IMG/marketDetail/arrow2.png'),
    info:["热销中","全景看房"]
  }),
  methods:{
    async getMarketDescribeInfo () {
      const res = await marketService.getMarketDescribe()
      console.log(res.records)
    }
  }
}
</script>
<style lang="less">
.family-list-page{
      display: flex;
    flex-direction: column;
  .family-list-page-box{
    width:359px;
    height:100%;
    padding:16px 0px 0 16px;
    display: flex;
    justify-content: space-between;
    margin-top:45px;
    .centent{
      width:343px;
      height:107px;
      border-bottom:1px solid #EEEEEE;
      display: flex;
    justify-content: space-between;
    }
    .big-box{
      display: flex;
    }
    .family-list-page-box-left{
      width:120px;
      height:90px;
    }
    .family-list-page-box-center{
      margin-left:11px;
      li:nth-of-type(1){
        margin-bottom:11px;
        font-size:16px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(51,51,51,1);
        line-height:16px;
      }
      li:nth-of-type(2){
        margin-bottom:9px;
        font-size:12px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:12px;
      }
      li:nth-of-type(3){
        margin-bottom:9px;
      }
      li:nth-of-type(4){
        font-size:15px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:rgba(234,77,46,1);
        line-height:15px;
      }
    }
    .family-list-page-box-right{
      display: flex;
      margin-top:37px;
      p{
        width:28px;
        height:15px;
      }
      span{
        margin:2px 0 0 4px;
        width:12px;
        height:12px;
      }
    }
  }

}
</style>
